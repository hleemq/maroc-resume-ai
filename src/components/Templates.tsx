import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Eye, FileText } from "lucide-react";

export const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech roles",
      isPremium: false,
      image: "/api/placeholder/300/400",
    },
    {
      id: 2,
      name: "Executive Elite",
      description: "Sophisticated layout for senior management positions",
      isPremium: true,
      image: "/api/placeholder/300/400",
    },
    {
      id: 3,
      name: "Creative Portfolio",
      description: "Vibrant design for creative and marketing professionals",
      isPremium: true,
      image: "/api/placeholder/300/400",
    },
    {
      id: 4,
      name: "Academic Scholar",
      description: "Traditional format ideal for academic positions",
      isPremium: false,
      image: "/api/placeholder/300/400",
    },
    {
      id: 5,
      name: "Startup Innovator",
      description: "Dynamic layout for entrepreneurs and startup professionals",
      isPremium: true,
      image: "/api/placeholder/300/400",
    },
    {
      id: 6,
      name: "Classic Professional",
      description: "Timeless design suitable for all industries",
      isPremium: false,
      image: "/api/placeholder/300/400",
    },
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <Button size="sm" variant="heroSecondary" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        variant={template.isPremium ? "premium" : "hero"}
                        className="flex-1"
                      >
                        {template.isPremium ? "Upgrade" : "Use Template"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
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