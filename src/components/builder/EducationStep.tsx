import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface EducationStepProps {
  data: Education[];
  onChange: (data: Education[]) => void;
  subscribed: boolean;
}

export function EducationStep({ data, onChange, subscribed }: EducationStepProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>التعليم والمؤهلات</CardTitle>
        <CardDescription>
          أضف مؤهلاتك التعليمية والشهادات الحاصل عليها
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">لم تضف أي مؤهل تعليمي بعد</p>
            <Button onClick={addEducation}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة مؤهل تعليمي
            </Button>
          </div>
        )}

        {data.map((education, index) => (
          <Card key={education.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">مؤهل تعليمي #{index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم المؤسسة التعليمية</Label>
                  <Input
                    placeholder="جامعة محمد الخامس"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>نوع الشهادة</Label>
                  <Input
                    placeholder="بكالوريوس، ماجستير، دكتوراه..."
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>التخصص</Label>
                  <Input
                    placeholder="علوم الحاسوب، الهندسة، إدارة الأعمال..."
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>تاريخ البداية</Label>
                  <Input
                    type="month"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>تاريخ التخرج</Label>
                  <Input
                    type="month"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    disabled={education.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-edu-${education.id}`}
                  checked={education.current}
                  onCheckedChange={(checked) => updateEducation(education.id, 'current', checked)}
                />
                <Label htmlFor={`current-edu-${education.id}`}>أدرس حالياً في هذه المؤسسة</Label>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.length > 0 && (
          <Button onClick={addEducation} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            إضافة مؤهل تعليمي آخر
          </Button>
        )}
      </CardContent>
    </Card>
  );
}