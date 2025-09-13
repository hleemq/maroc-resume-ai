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
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Choose Your Resume Template</CardTitle>
        <CardDescription className="text-center">
          Select a professional template for your resume. Premium templates require a subscription.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-elegant group ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary shadow-elegant scale-[1.02]' 
                  : 'hover:shadow-soft hover:scale-[1.01]'
              }`}
              onClick={() => handleSelectTemplate(template.id, template.isPremium)}
            >
              {/* Premium Badge */}
              {template.isPremium && (
                <div className="absolute top-3 right-3 z-20 bg-gradient-gold text-gold-foreground px-3 py-1 rounded-full flex items-center text-xs font-bold shadow-gold">
                  <Crown className="w-3 h-3 mr-1" />
                  PRO
                </div>
              )}
              
              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 left-3 z-20 bg-primary text-primary-foreground p-2 rounded-full shadow-soft">
                  <Check className="w-4 h-4" />
                </div>
              )}

              {/* Template Preview */}
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="w-full h-56 bg-gradient-to-br from-muted to-secondary/50 flex items-center justify-center">
                  <div className="w-full h-full bg-white shadow-soft mx-2 my-2 rounded overflow-hidden">
                    <div className="transform scale-[0.15] origin-top-left w-[667%] h-[667%]">
                      {renderPreview(template)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Template Info */}
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-sm font-semibold">{template.name}</CardTitle>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full font-medium">{template.category}</span>
                </div>
                <CardDescription className="text-xs mb-3 line-clamp-2">
                  {template.description}
                </CardDescription>
                
                {/* Premium Upgrade Button */}
                {template.isPremium && subscriptionTier === 'free' && (
                  <Button 
                    size="sm" 
                    variant="premium" 
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to pricing or trigger upgrade flow
                    }}
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    Upgrade to Use
                  </Button>
                )}
                
                {/* Selected Indicator */}
                {selectedTemplate === template.id && (
                  <div className="w-full text-center text-xs text-primary font-semibold mt-2">
                    ✓ Selected
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Selection Info */}
        {selectedTemplate && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 text-primary">
              <Check className="w-4 h-4" />
              <span className="font-medium">Template Selected!</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Click "Create Resume" to continue with your selected template.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};