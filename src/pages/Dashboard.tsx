import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Upload, Edit, Download, Trash2, FileText } from 'lucide-react';
import { getUserResumes, deleteResume } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Resume {
  id: string;
  title: string;
  updated_at: string;
  template_id: string | null;
  is_public: boolean;
  resume_templates?: {
    name: string;
    is_premium: boolean;
  } | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, subscribed, signOut } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      loadResumes();
    }
  }, [user, loading, navigate]);

  const loadResumes = async () => {
    try {
      const { data, error } = await getUserResumes();
      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحميل السير الذاتية",
          variant: "destructive",
        });
        return;
      }
      setResumes(data || []);
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoadingResumes(false);
    }
  };

  const handleDeleteResume = async (id: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف "${title}"؟`)) {
      return;
    }

    try {
      const { error } = await deleteResume(id);
      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في حذف السيرة الذاتية",
          variant: "destructive",
        });
        return;
      }

      setResumes(prev => prev.filter(resume => resume.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف السيرة الذاتية بنجاح",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  if (loading || loadingResumes) {
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
              <h1 className="text-2xl font-bold text-primary">لوحة التحكم</h1>
              {subscribed && (
                <Badge variant="default" className="bg-gradient-to-r from-primary to-primary/80">
                  عضو مميز
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                مرحباً، {user?.user_metadata?.full_name || user?.email}
              </span>
              <Button variant="outline" onClick={signOut}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-primary/20 hover:border-primary/40">
            <CardContent className="p-6" onClick={() => navigate('/builder/new')}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">إنشاء سيرة ذاتية جديدة</CardTitle>
                  <CardDescription>
                    ابدأ في إنشاء سيرتك الذاتية باستخدام نماذجنا المهنية
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-secondary/20 hover:border-secondary/40">
            <CardContent className="p-6" onClick={() => navigate('/upload')}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Upload className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg mb-2">رفع سيرة ذاتية موجودة</CardTitle>
                  <CardDescription>
                    ارفع ملف PDF أو Word لتحويله إلى سيرة ذاتية تفاعلية
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumes List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">سيرك الذاتية ({resumes.length})</h2>
            <Button variant="outline" onClick={() => navigate('/pricing')}>
              عرض الباقات
            </Button>
          </div>

          {resumes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <CardTitle className="mb-2">لا توجد سير ذاتية</CardTitle>
                <CardDescription className="mb-6">
                  ابدأ في إنشاء سيرتك الذاتية الأولى الآن
                </CardDescription>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/builder/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    إنشاء سيرة ذاتية
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/upload')}>
                    <Upload className="h-4 w-4 mr-2" />
                    رفع ملف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1">{resume.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {resume.resume_templates?.name || 'نموذج افتراضي'}
                        </CardDescription>
                      </div>
                      {resume.resume_templates?.is_premium && (
                        <Badge variant="secondary" className="mr-2">مميز</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        آخر تحديث: {formatDistanceToNow(new Date(resume.updated_at), { 
                          addSuffix: true, 
                          locale: ar 
                        })}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => navigate(`/builder/${resume.id}`)}
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          تعديل
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            // TODO: Implement PDF download
                            toast({
                              title: "قريباً",
                              description: "ستتوفر ميزة تحميل PDF قريباً",
                            });
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteResume(resume.id, resume.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}