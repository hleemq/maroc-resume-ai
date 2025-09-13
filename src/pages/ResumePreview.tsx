import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Share2, Edit3, FileText } from 'lucide-react';
import { getTemplateById } from '@/components/ResumeTemplates';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ResumeData } from '@/lib/resumeUtils';

export default function ResumePreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  const [resume, setResume] = useState<any>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    
    if (user && id) {
      loadResume();
    }
  }, [user, loading, navigate, id]);

  const loadResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select(`
          *,
          resume_templates (
            name,
            category,
            is_premium
          )
        `)
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load resume",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      setResume(data);
      
      if (data.content && typeof data.content === 'object') {
        setResumeData(data.content as unknown as ResumeData);
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      navigate('/dashboard');
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    try {
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Popup blocked');
      }

      const template = getTemplateById(resume.template_id);
      if (!template || !resumeData) {
        throw new Error('Template or data not found');
      }

      // Render the template component to HTML
      const TemplateComponent = template.component;
      
      // Create a temporary div to render the component
      const tempDiv = document.createElement('div');
      document.body.appendChild(tempDiv);
      
      // Import React and ReactDOM for rendering
      const { createRoot } = await import('react-dom/client');
      const React = await import('react');
      
      const root = createRoot(tempDiv);
      root.render(React.createElement(TemplateComponent, { data: resumeData }));
      
      // Wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the HTML content
      const htmlContent = tempDiv.innerHTML;
      
      // Clean up
      root.unmount();
      document.body.removeChild(tempDiv);

      // Write to print window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${resume.title} - Resume</title>
          <style>
            body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
            @media print {
              body { margin: 0; }
              @page { margin: 0; size: A4; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      
      toast({
        title: "Success",
        description: "Resume opened for printing/download",
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: resume.title,
          text: 'Check out my resume',
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Resume link copied to clipboard",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy link",
          variant: "destructive",
        });
      }
    }
  };

  if (loading || !resume || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/5">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const template = getTemplateById(resume.template_id);
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/5">
        <Card className="p-8 text-center">
          <CardTitle className="text-destructive mb-4">Template Not Found</CardTitle>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const TemplateComponent = template.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary">{resume.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Template: {template.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/builder/${resume.id}`)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Resume
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="h-4 w-4 mr-2" />
                {isDownloading ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5" />
                Resume Preview
              </CardTitle>
              <p className="text-muted-foreground">
                This is how your resume will appear when downloaded or printed
              </p>
            </CardHeader>
            <CardContent className="p-0">
              {/* A4 Preview Container */}
              <div className="bg-gray-100 p-8 rounded-b-lg">
                <div className="bg-white shadow-lg mx-auto rounded-lg overflow-hidden" style={{ 
                  width: '210mm', 
                  minHeight: '297mm',
                  transform: 'scale(0.7)',
                  transformOrigin: 'top center',
                  marginBottom: '-100px'
                }}>
                  <TemplateComponent data={resumeData} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}