import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Check } from "lucide-react";
import { templates } from "@/components/ResumeTemplates";
import { ResumeData } from "@/lib/resumeUtils";

interface TemplateSelectionStepProps {
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
  resumeData: ResumeData;
  subscriptionTier?: string;
}

export const TemplateSelectionStep = ({ 
  selectedTemplate, 
  onSelectTemplate, 
  resumeData,
  subscriptionTier = 'free'
}: TemplateSelectionStepProps) => {
  
  const handleSelectTemplate = (templateId: string, isPremium: boolean) => {
    if (isPremium && subscriptionTier === 'free') {
      // Could trigger upgrade flow here
      return;
    }
    onSelectTemplate(templateId);
  };

  const renderPreview = (template: any) => {
    const TemplateComponent = template.component;
    return (
      <div className="w-full h-48 overflow-hidden rounded-md bg-white shadow-sm">
        <div className="transform scale-[0.2] origin-top-left w-[500%] h-[500%]">
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Resume Template</CardTitle>
        <CardDescription>
          Select a professional template for your resume. Premium templates require a subscription.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleSelectTemplate(template.id, template.isPremium)}
            >
              {template.isPremium && (
                <div className="absolute top-2 right-2 z-10 bg-gradient-gold text-gold-foreground px-2 py-1 rounded-full flex items-center text-xs font-semibold">
                  <Crown className="w-3 h-3 mr-1" />
                  PRO
                </div>
              )}
              
              {selectedTemplate === template.id && (
                <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <CardHeader className="p-0">
                {renderPreview(template)}
              </CardHeader>
              
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <CardTitle className="text-sm">{template.name}</CardTitle>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">{template.category}</span>
                </div>
                <CardDescription className="text-xs">
                  {template.description}
                </CardDescription>
                
                {template.isPremium && subscriptionTier === 'free' && (
                  <Button 
                    size="sm" 
                    variant="premium" 
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to pricing or trigger upgrade flow
                    }}
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    Upgrade to Use
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};