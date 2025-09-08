import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { generateAIContent } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceStepProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
  subscribed: boolean;
}

export function ExperienceStep({ data, onChange, subscribed }: ExperienceStepProps) {
  const [generatingAI, setGeneratingAI] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const generateExperienceDescription = async (experienceId: string) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (!experience || !experience.position || !experience.company) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى إدخال اسم الشركة والمنصب أولاً",
        variant: "destructive",
      });
      return;
    }

    if (!subscribed) {
      toast({
        title: "ميزة مميزة",
        description: "هذه الميزة متاحة للأعضاء المميزين فقط",
        variant: "destructive",
      });
      return;
    }

    setGeneratingAI(experienceId);
    
    try {
      const { data: result, error } = await generateAIContent(
        'experience_description',
        {
          position: experience.position,
          company: experience.company,
          current: experience.current,
        },
        'ar'
      );

      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في توليد الوصف",
          variant: "destructive",
        });
        return;
      }

      updateExperience(experienceId, 'description', result.content);
      toast({
        title: "تم التوليد بنجاح",
        description: "تم إنشاء وصف للخبرة المهنية",
      });
    } catch (error) {
      console.error('Error generating experience description:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setGeneratingAI(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>الخبرة المهنية</CardTitle>
        <CardDescription>
          أضف خبراتك المهنية والوظائف التي شغلتها سابقاً
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">لم تضف أي خبرة مهنية بعد</p>
            <Button onClick={addExperience}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة خبرة مهنية
            </Button>
          </div>
        )}

        {data.map((experience, index) => (
          <Card key={experience.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">خبرة مهنية #{index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم الشركة</Label>
                  <Input
                    placeholder="شركة التكنولوجيا المتقدمة"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>المنصب</Label>
                  <Input
                    placeholder="مطور ويب أول"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>تاريخ البداية</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>تاريخ النهاية</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
                />
                <Label htmlFor={`current-${experience.id}`}>أعمل حالياً في هذا المنصب</Label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>وصف المهام والإنجازات</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateExperienceDescription(experience.id)}
                    disabled={generatingAI === experience.id || !subscribed}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {generatingAI === experience.id ? 'جار التوليد...' : 'توليد بالذكاء الاصطناعي'}
                  </Button>
                </div>
                <Textarea
                  placeholder="صف مهامك وإنجازاتك في هذا المنصب..."
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {data.length > 0 && (
          <Button onClick={addExperience} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            إضافة خبرة مهنية أخرى
          </Button>
        )}
      </CardContent>
    </Card>
  );
}