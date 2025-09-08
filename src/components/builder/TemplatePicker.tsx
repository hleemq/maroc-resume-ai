import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown } from 'lucide-react';
import { getResumeTemplates } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  description: string | null;
  is_premium: boolean;
  preview_image: string | null;
}

interface TemplatePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTemplateId: string | null;
  onSelectTemplate: (templateId: string) => void;
  subscribed: boolean;
}

export function TemplatePicker({ 
  open, 
  onOpenChange, 
  currentTemplateId, 
  onSelectTemplate, 
  subscribed 
}: TemplatePickerProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      loadTemplates();
    }
  }, [open]);

  const loadTemplates = async () => {
    try {
      const { data, error } = await getResumeTemplates();
      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحميل النماذج",
          variant: "destructive",
        });
        return;
      }
      setTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template: Template) => {
    if (template.is_premium && !subscribed) {
      toast({
        title: "نموذج مميز",
        description: "هذا النموذج متاح للأعضاء المميزين فقط",
        variant: "destructive",
      });
      return;
    }

    onSelectTemplate(template.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>اختيار نموذج السيرة الذاتية</DialogTitle>
          <DialogDescription>
            اختر النموذج الذي يناسب مجالك المهني
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  currentTemplateId === template.id ? 'ring-2 ring-primary' : ''
                } ${
                  template.is_premium && !subscribed ? 'opacity-60' : ''
                }`}
                onClick={() => handleSelectTemplate(template)}
              >
                <CardContent className="p-4">
                  <div className="relative">
                    {/* Template Preview */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded border mb-3 flex items-center justify-center">
                      {template.preview_image ? (
                        <img 
                          src={template.preview_image} 
                          alt={template.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">معاينة النموذج</span>
                      )}
                    </div>

                    {/* Current Selection Indicator */}
                    {currentTemplateId === template.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}

                    {/* Premium Badge */}
                    {template.is_premium && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="default" className="gap-1">
                          <Crown className="h-3 w-3" />
                          مميز
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                    {template.description && (
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    )}
                  </div>

                  {template.is_premium && !subscribed && (
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        يتطلب عضوية مميزة
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!subscribed && (
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">
              احصل على وصول لجميع النماذج المميزة
            </p>
            <Button variant="outline" size="sm">
              ترقية لعضوية مميزة
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}