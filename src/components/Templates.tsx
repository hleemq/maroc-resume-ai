import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Eye, FileText, Filter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { templates } from "@/components/ResumeTemplates";

export const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const categories = ["All", "Technology", "Executive", "Creative", "Academic", "Startup", "General", "Healthcare", "Finance", "Engineering", "Sales"];

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleUseTemplate = (templateId: string, isPremium: boolean) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (isPremium && profile?.subscription_tier === 'free') {
      navigate('/pricing');
      return;
    }

    navigate(`/builder/new?template=${templateId}`);
  };

  const handlePreviewTemplate = (templateId: string) => {
    // Open template preview in new tab or modal
    window.open(`/template-preview/${templateId}`, '_blank');
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Choose Your Perfect Template
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional templates designed for the Moroccan job market, optimized for ATS systems.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-1"
            >
              <Filter className="w-3 h-3" />
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="group relative overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer"
            >
              {template.isPremium && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-gold text-gold-foreground px-2 py-1 rounded-full flex items-center text-xs font-semibold shadow-gold">
                  <Crown className="w-3 h-3 mr-1" />
                  PRO
                </div>
              )}
              
              <CardHeader className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="heroSecondary" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewTemplate(template.id);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant={template.isPremium ? "premium" : "hero"}
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseTemplate(template.id, template.isPremium);
                        }}
                      >
                        {template.isPremium && profile?.subscription_tier === 'free' ? "Upgrade" : "Use Template"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">{template.category}</span>
                </div>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need access to all premium templates?
          </p>
          <Button variant="premium" size="lg">
            <Crown className="w-5 h-5 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </section>
  );
};