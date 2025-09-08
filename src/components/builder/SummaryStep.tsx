import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { generateAIContent } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface SummaryStepProps {
  data: string;
  onChange: (data: string) => void;
  subscribed: boolean;
}

export function SummaryStep({ data, onChange, subscribed }: SummaryStepProps) {
  const [generatingAI, setGeneratingAI] = useState(false);

  const generateSummary = async () => {
    if (!subscribed) {
      toast({
        title: "ميزة مميزة",
        description: "هذه الميزة متاحة للأعضاء المميزين فقط",
        variant: "destructive",
      });
      return;
    }

    setGeneratingAI(true);
    
    try {
      const { data: result, error } = await generateAIContent(
        'professional_summary',
        {
          current_summary: data,
        },
        'ar'
      );

      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في توليد الملخص المهني",
          variant: "destructive",
        });
        return;
      }

      onChange(result.content);
      toast({
        title: "تم التوليد بنجاح",
        description: "تم إنشاء ملخص مهني مخصص لك",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setGeneratingAI(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>الملخص المهني</CardTitle>
            <CardDescription>
              اكتب ملخصاً مهنياً يبرز خبراتك وأهدافك المهنية (اختياري)
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={generateSummary}
            disabled={generatingAI || !subscribed}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {generatingAI ? 'جار التوليد...' : 'توليد بالذكاء الاصطناعي'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">الملخص المهني</Label>
          <Textarea
            id="summary"
            placeholder="مثال: مطور ويب متخصص في تقنيات الواجهة الأمامية مع خبرة 5 سنوات في تطوير تطبيقات الويب التفاعلية. أمتلك خبرة واسعة في JavaScript وReact وأسعى لتطوير حلول تقنية مبتكرة تلبي احتياجات المستخدمين..."
            value={data}
            onChange={(e) => onChange(e.target.value)}
            rows={6}
          />
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">نصائح لكتابة ملخص مهني فعال:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• اذكر سنوات خبرتك ومجال تخصصك</li>
            <li>• أبرز أهم إنجازاتك ومهاراتك الرئيسية</li>
            <li>• وضح أهدافك المهنية وما تسعى إليه</li>
            <li>• استخدم كلمات مفتاحية متعلقة بمجالك</li>
            <li>• اجعل النص مختصراً ومؤثراً (50-100 كلمة)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}