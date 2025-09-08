import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload as UploadIcon, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { uploadCV } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export default function Upload() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
  }, [user, loading, navigate]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "نوع ملف غير مدعوم",
        description: "يرجى رفع ملف PDF أو Word فقط",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "حجم الملف كبير جداً",
        description: "يرجى رفع ملف بحجم أقل من 10 ميجابايت",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setUploading(true);
    
    try {
      const { data, error } = await uploadCV(uploadedFile);
      
      if (error) {
        toast({
          title: "خطأ في الرفع",
          description: "فشل في رفع الملف، يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "تم الرفع بنجاح!",
        description: "تم رفع ملفك وسيتم تحليله قريباً",
      });

      // TODO: Navigate to mapping/confirmation page
      // For now, show a placeholder
      toast({
        title: "قريباً",
        description: "ستتوفر ميزة تحليل الملفات قريباً",
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ أثناء رفع الملف",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
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
            <h1 className="text-2xl font-bold text-primary">رفع سيرة ذاتية موجودة</h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للوحة التحكم
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>كيف يعمل الرفع والتحليل؟</CardTitle>
              <CardDescription>
                ارفع سيرتك الذاتية الحالية وسنقوم بتحليلها وتحويلها إلى نموذج تفاعلي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UploadIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">1. ارفع الملف</h3>
                  <p className="text-sm text-muted-foreground">PDF أو Word</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">2. تحليل تلقائي</h3>
                  <p className="text-sm text-muted-foreground">استخراج البيانات</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ArrowRight className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">3. تحرير وتحسين</h3>
                  <p className="text-sm text-muted-foreground">في المحرر التفاعلي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card>
            <CardContent className="p-6">
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <UploadIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">اسحب وأفلت ملفك هنا</h3>
                  <p className="text-muted-foreground mb-6">أو انقر لاختيار ملف</p>
                  
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                  />
                  <Button asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      اختيار ملف
                    </label>
                  </Button>
                  
                  <div className="mt-4 text-sm text-muted-foreground">
                    الأنواع المدعومة: PDF, Word (DOC, DOCX)
                    <br />
                    الحد الأقصى: 10 ميجابايت
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <FileText className="h-12 w-12 mx-auto text-primary mb-2" />
                    <h3 className="font-semibold">{uploadedFile.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} ميجابايت
                    </p>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="min-w-32"
                    >
                      {uploading ? 'جار الرفع...' : 'رفع وتحليل'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setUploadedFile(null)}
                      disabled={uploading}
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">نصائح للحصول على أفضل النتائج</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• تأكد من أن النص في الملف واضح وقابل للقراءة</li>
                <li>• استخدم ملفات PDF أو Word حديثة</li>
                <li>• تجنب الملفات الممسوحة ضوئياً (Scanned) قدر الإمكان</li>
                <li>• تأكد من تنظيم المعلومات بشكل منطقي في الملف الأصلي</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}