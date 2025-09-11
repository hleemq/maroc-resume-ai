export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  website?: string;
  linkedin?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: Array<{
    name: string;
    level: string;
  }>;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  summary: string;
  language: string;
}

export const createEmptyResumeData = (): ResumeData => ({
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    website: '',
    linkedin: ''
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    languages: []
  },
  summary: '',
  language: 'ar'
});

export const validatePersonalInfo = (personal: PersonalInfo): string[] => {
  const errors: string[] = [];
  
  if (!personal.fullName.trim()) {
    errors.push('الاسم الكامل مطلوب');
  }
  
  if (!personal.email.trim()) {
    errors.push('البريد الإلكتروني مطلوب');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) {
    errors.push('البريد الإلكتروني غير صحيح');
  }
  
  if (!personal.phone.trim()) {
    errors.push('رقم الهاتف مطلوب');
  }
  
  return errors;
};

export const validateExperience = (experience: Experience[]): string[] => {
  const errors: string[] = [];
  
  experience.forEach((exp, index) => {
    if (!exp.company.trim()) {
      errors.push(`اسم الشركة مطلوب في الخبرة ${index + 1}`);
    }
    if (!exp.position.trim()) {
      errors.push(`المنصب مطلوب في الخبرة ${index + 1}`);
    }
    if (!exp.startDate) {
      errors.push(`تاريخ البداية مطلوب في الخبرة ${index + 1}`);
    }
    if (!exp.current && !exp.endDate) {
      errors.push(`تاريخ النهاية مطلوب في الخبرة ${index + 1}`);
    }
  });
  
  return errors;
};

export const validateEducation = (education: Education[]): string[] => {
  const errors: string[] = [];
  
  education.forEach((edu, index) => {
    if (!edu.institution.trim()) {
      errors.push(`اسم المؤسسة مطلوب في التعليم ${index + 1}`);
    }
    if (!edu.degree.trim()) {
      errors.push(`الدرجة العلمية مطلوبة في التعليم ${index + 1}`);
    }
    if (!edu.field.trim()) {
      errors.push(`مجال الدراسة مطلوب في التعليم ${index + 1}`);
    }
  });
  
  return errors;
};