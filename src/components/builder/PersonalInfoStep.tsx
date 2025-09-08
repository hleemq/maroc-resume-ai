import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>المعلومات الشخصية</CardTitle>
        <CardDescription>
          أدخل معلوماتك الشخصية الأساسية التي ستظهر في رأس السيرة الذاتية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">الاسم الكامل *</Label>
            <Input
              id="fullName"
              placeholder="محمد أحمد علي"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">المسمى الوظيفي</Label>
            <Input
              id="title"
              placeholder="مطور ويب، مهندس برمجيات، محاسب..."
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input
              id="email"
              type="email"
              placeholder="mohammed@example.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+212 6 12 34 56 78"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              dir="ltr"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="location">الموقع</Label>
            <Input
              id="location"
              placeholder="الدار البيضاء، المغرب"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}