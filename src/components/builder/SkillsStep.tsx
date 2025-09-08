import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Sparkles } from 'lucide-react';
import { generateAIContent } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface Skills {
  technical: string[];
  soft: string[];
  languages: Array<{
    name: string;
    level: string;
  }>;
}

interface SkillsStepProps {
  data: Skills;
  onChange: (data: Skills) => void;
  subscribed: boolean;
}

const LANGUAGE_LEVELS = [
  { value: 'beginner', label: 'مبتدئ' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'متقدم' },
  { value: 'native', label: 'لغة أم' },
];

export function SkillsStep({ data, onChange, subscribed }: SkillsStepProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState({ name: '', level: '' });
  const [generatingAI, setGeneratingAI] = useState<string | null>(null);

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()],
      });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...data,
      technical: data.technical.filter((_, i) => i !== index),
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()],
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      soft: data.soft.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    if (newLanguage.name.trim() && newLanguage.level) {
      onChange({
        ...data,
        languages: [...data.languages, { ...newLanguage, name: newLanguage.name.trim() }],
      });
      setNewLanguage({ name: '', level: '' });
    }
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index),
    });
  };

  const generateSkills = async (type: 'technical' | 'soft') => {
    if (!subscribed) {
      toast({
        title: "ميزة مميزة",
        description: "هذه الميزة متاحة للأعضاء المميزين فقط",
        variant: "destructive",
      });
      return;
    }

    setGeneratingAI(type);
    
    try {
      const { data: result, error } = await generateAIContent(
        `${type}_skills`,
        {
          current_skills: type === 'technical' ? data.technical : data.soft,
        },
        'ar'
      );

      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في توليد المهارات",
          variant: "destructive",
        });
        return;
      }

      // Parse the generated skills (assuming they come as comma-separated)
      const newSkills = result.content.split(',').map((skill: string) => skill.trim()).filter(Boolean);
      
      onChange({
        ...data,
        [type]: [...(type === 'technical' ? data.technical : data.soft), ...newSkills],
      });

      toast({
        title: "تم التوليد بنجاح",
        description: `تم إضافة ${newSkills.length} مهارة جديدة`,
      });
    } catch (error) {
      console.error('Error generating skills:', error);
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
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>المهارات التقنية</CardTitle>
              <CardDescription>
                أضف المهارات التقنية والبرمجية التي تتقنها
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateSkills('technical')}
              disabled={generatingAI === 'technical' || !subscribed}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generatingAI === 'technical' ? 'جار التوليد...' : 'اقتراح مهارات'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="مثال: JavaScript, React, Python..."
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
            />
            <Button onClick={addTechnicalSkill} disabled={!newTechnicalSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="gap-2">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTechnicalSkill(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>المهارات الشخصية</CardTitle>
              <CardDescription>
                أضف المهارات الشخصية والقيادية
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateSkills('soft')}
              disabled={generatingAI === 'soft' || !subscribed}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {generatingAI === 'soft' ? 'جار التوليد...' : 'اقتراح مهارات'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="مثال: القيادة، التواصل، حل المشاكل..."
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            />
            <Button onClick={addSoftSkill} disabled={!newSoftSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill, index) => (
              <Badge key={index} variant="outline" className="gap-2">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSoftSkill(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>اللغات</CardTitle>
          <CardDescription>
            أضف اللغات التي تتحدثها ومستوى إتقانك لها
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="اسم اللغة"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1"
            />
            <Select
              value={newLanguage.level}
              onValueChange={(value) => setNewLanguage(prev => ({ ...prev, level: value }))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={addLanguage} 
              disabled={!newLanguage.name.trim() || !newLanguage.level}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {data.languages.map((language, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{language.name}</span>
                  <span className="mx-2">-</span>
                  <span className="text-muted-foreground">
                    {LANGUAGE_LEVELS.find(l => l.value === language.level)?.label}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLanguage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}