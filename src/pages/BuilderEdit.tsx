import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Download, Share2, Eye, Settings, ArrowLeft } from 'lucide-react';
import { PersonalInfoStep } from '@/components/builder/PersonalInfoStep';
import { ExperienceStep } from '@/components/builder/ExperienceStep';
import { EducationStep } from '@/components/builder/EducationStep';
import { SkillsStep } from '@/components/builder/SkillsStep';
import { SummaryStep } from '@/components/builder/SummaryStep';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { TemplatePicker } from '@/components/builder/TemplatePicker';
import { updateResume } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: Array<{
      name: string;
      level: string;
    }>;
  };
  summary: string;
}

export default function BuilderEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading, subscribed } = useAuth();
  
  const [resume, setResume] = useState<any>(null);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
    summary: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

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
          title: "خطأ",
          description: "فشل في تحميل السيرة الذاتية",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      setResume(data);
      
      // Populate form data
      if (data.content && typeof data.content === 'object') {
        setResumeData((data.content as unknown) as ResumeData);
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      navigate('/dashboard');
    }
  };

  const handleSave = async () => {
    if (!resume) return;

    setIsSaving(true);
    
    try {
      const { error } = await updateResume(resume.id, {
        content: resumeData,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في حفظ التغييرات",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "تم الحفظ",
        description: "تم حفظ تغييراتك بنجاح",
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحفظ",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateResumeData = (step: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleTemplateChange = async (templateId: string) => {
    if (!resume) return;

    try {
      const { error } = await updateResume(resume.id, {
        template_id: templateId,
      });

      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في تغيير النموذج",
          variant: "destructive",
        });
        return;
      }

      // Reload to get updated template info
      loadResume();
      setShowTemplateSelector(false);
      
      toast({
        title: "تم التحديث",
        description: "تم تغيير نموذج السيرة الذاتية",
      });
    } catch (error) {
      console.error('Error changing template:', error);
    }
  };

  if (loading || !resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary">{resume.title}</h1>
                <p className="text-sm text-muted-foreground">
                  النموذج: {resume.resume_templates?.name || 'افتراضي'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplateSelector(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                تغيير النموذج
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // TODO: Implement PDF download
                  toast({
                    title: "قريباً",
                    description: "ستتوفر ميزة تحميل PDF قريباً",
                  });
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                تحميل PDF
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'جار الحفظ...' : 'حفظ'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="personal">شخصي</TabsTrigger>
                    <TabsTrigger value="experience">خبرة</TabsTrigger>
                    <TabsTrigger value="education">تعليم</TabsTrigger>
                    <TabsTrigger value="skills">مهارات</TabsTrigger>
                    <TabsTrigger value="summary">ملخص</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="mt-6">
                    <PersonalInfoStep
                      data={resumeData.personal}
                      onChange={(data) => updateResumeData('personal', data)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="experience" className="mt-6">
                    <ExperienceStep
                      data={resumeData.experience}
                      onChange={(data) => updateResumeData('experience', data)}
                      subscribed={subscribed}
                    />
                  </TabsContent>
                  
                  <TabsContent value="education" className="mt-6">
                    <EducationStep
                      data={resumeData.education}
                      onChange={(data) => updateResumeData('education', data)}
                      subscribed={subscribed}
                    />
                  </TabsContent>
                  
                  <TabsContent value="skills" className="mt-6">
                    <SkillsStep
                      data={resumeData.skills}
                      onChange={(data) => updateResumeData('skills', data)}
                      subscribed={subscribed}
                    />
                  </TabsContent>
                  
                  <TabsContent value="summary" className="mt-6">
                    <SummaryStep
                      data={resumeData.summary}
                      onChange={(data) => updateResumeData('summary', data)}
                      subscribed={subscribed}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">معاينة السيرة الذاتية</h3>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    معاينة كاملة
                  </Button>
                </div>
                <ResumePreview 
                  data={resumeData} 
                  template={resume.resume_templates}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      <TemplatePicker
        open={showTemplateSelector}
        onOpenChange={setShowTemplateSelector}
        currentTemplateId={resume.template_id}
        onSelectTemplate={handleTemplateChange}
        subscribed={subscribed}
      />
    </div>
  );
}