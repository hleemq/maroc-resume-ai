import { ResumeData } from "@/lib/resumeUtils";
import { ModernProfessional } from "./ModernProfessional";
import { ExecutiveElite } from "./ExecutiveElite";
import { CreativePortfolio } from "./CreativePortfolio";
import { AcademicScholar } from "./AcademicScholar";
import { StartupInnovator } from "./StartupInnovator";
import { ClassicProfessional } from "./ClassicProfessional";
import { MedicalProfessional } from "./MedicalProfessional";
import { FinanceExpert } from "./FinanceExpert";
import { EngineeringProfessional } from "./EngineeringProfessional";
import { SalesExecutive } from "./SalesExecutive";

// Import template images
import modernProfessionalImg from "@/assets/templates/modern-professional.jpg";
import executiveEliteImg from "@/assets/templates/executive-elite.jpg";
import creativePortfolioImg from "@/assets/templates/creative-portfolio.jpg";
import academicScholarImg from "@/assets/templates/academic-scholar.jpg";
import startupInnovatorImg from "@/assets/templates/startup-innovator.jpg";
import classicProfessionalImg from "@/assets/templates/classic-professional.jpg";
import medicalProfessionalImg from "@/assets/templates/medical-professional.jpg";
import financeExpertImg from "@/assets/templates/finance-expert.jpg";
import engineeringProfessionalImg from "@/assets/templates/engineering-professional.jpg";
import salesExecutiveImg from "@/assets/templates/sales-executive.jpg";

export interface Template {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  image: string;
  component: React.ComponentType<{ data: ResumeData }>;
  category: string;
}

export const templates: Template[] = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech roles",
    isPremium: false,
    image: modernProfessionalImg,
    component: ModernProfessional,
    category: "Technology"
  },
  {
    id: "executive-elite",
    name: "Executive Elite",
    description: "Sophisticated layout for senior management positions",
    isPremium: true,
    image: executiveEliteImg,
    component: ExecutiveElite,
    category: "Executive"
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Vibrant design for creative and marketing professionals",
    isPremium: true,
    image: creativePortfolioImg,
    component: CreativePortfolio,
    category: "Creative"
  },
  {
    id: "academic-scholar",
    name: "Academic Scholar",
    description: "Traditional format ideal for academic positions",
    isPremium: false,
    image: academicScholarImg,
    component: AcademicScholar,
    category: "Academic"
  },
  {
    id: "startup-innovator",
    name: "Startup Innovator",
    description: "Dynamic layout for entrepreneurs and startup professionals",
    isPremium: true,
    image: startupInnovatorImg,
    component: StartupInnovator,
    category: "Startup"
  },
  {
    id: "classic-professional",
    name: "Classic Professional",
    description: "Timeless design suitable for all industries",
    isPremium: false,
    image: classicProfessionalImg,
    component: ClassicProfessional,
    category: "General"
  },
  {
    id: "medical-professional",
    name: "Medical Professional",
    description: "Healthcare-focused layout for medical professionals",
    isPremium: true,
    image: medicalProfessionalImg,
    component: MedicalProfessional,
    category: "Healthcare"
  },
  {
    id: "finance-expert",
    name: "Finance Expert",
    description: "Sophisticated design for financial industry professionals",
    isPremium: true,
    image: financeExpertImg,
    component: FinanceExpert,
    category: "Finance"
  },
  {
    id: "engineering-professional",
    name: "Engineering Professional",
    description: "Technical layout for engineering professionals",
    isPremium: true,
    image: engineeringProfessionalImg,
    component: EngineeringProfessional,
    category: "Engineering"
  },
  {
    id: "sales-executive",
    name: "Sales Executive",
    description: "Dynamic design for sales and business development",
    isPremium: true,
    image: salesExecutiveImg,
    component: SalesExecutive,
    category: "Sales"
  }
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return templates.filter(template => template.category === category);
};

export const getFreeTemplates = (): Template[] => {
  return templates.filter(template => !template.isPremium);
};

export const getPremiumTemplates = (): Template[] => {
  return templates.filter(template => template.isPremium);
};