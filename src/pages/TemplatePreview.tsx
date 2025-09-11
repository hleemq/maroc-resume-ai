import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit } from "lucide-react";
import { getTemplateById } from "@/components/ResumeTemplates";
import { createEmptyResumeData } from "@/lib/resumeUtils";
import { useAuth } from "@/contexts/AuthContext";

export default function TemplatePreview() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const template = templateId ? getTemplateById(templateId) : undefined;

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const sampleData = {
    ...createEmptyResumeData(),
    personal: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+212 6 12 34 56 78",
      location: "Casablanca, Morocco",
      title: "Senior Manager",
      website: "www.johndoe.com",
      linkedin: "linkedin.com/in/johndoe"
    },
    summary: "Experienced professional with a proven track record of success in driving business growth and leading high-performing teams. Passionate about innovation and delivering exceptional results.",
    experience: [
      {
        id: "1",
        company: "Tech Solutions Inc.",
        position: "Senior Manager",
        startDate: "2020",
        endDate: "2024",
        current: true,
        description: "Led a team of 15+ professionals, increased department efficiency by 40%, and implemented strategic initiatives that resulted in $2M revenue growth."
      },
      {
        id: "2",
        company: "Digital Innovations Ltd.",
        position: "Project Manager",
        startDate: "2018",
        endDate: "2020",
        current: false,
        description: "Managed multiple high-stakes projects simultaneously, coordinated cross-functional teams, and delivered projects 20% ahead of schedule."
      }
    ],
    education: [
      {
        id: "1",
        institution: "Hassan II University",
        degree: "Master's in Business Administration",
        field: "Strategic Management",
        startDate: "2016",
        endDate: "2018",
        current: false,
        description: "Graduated with distinction, specializing in strategic management and business development."
      }
    ],
    skills: {
      technical: ["Data Analysis", "Project Management Software", "CRM Systems"],
      soft: ["Leadership", "Strategic Planning", "Team Management"],
      languages: [
        { name: "English", level: "Native" },
        { name: "French", level: "Advanced" },
        { name: "Arabic", level: "Intermediate" }
      ]
    }
  };

  const TemplateComponent = template.component;

  const handleUseTemplate = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (template.isPremium && profile?.subscription_tier === 'free') {
      navigate('/pricing');
      return;
    }

    navigate(`/builder/new?template=${template.id}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">{template.name}</h1>
                <p className="text-muted-foreground text-sm">{template.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Sample
              </Button>
              <Button onClick={handleUseTemplate}>
                <Edit className="w-4 h-4 mr-2" />
                {template.isPremium && profile?.subscription_tier === 'free' ? "Upgrade to Use" : "Use This Template"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <TemplateComponent data={sampleData} />
        </div>
      </div>
    </div>
  );
}