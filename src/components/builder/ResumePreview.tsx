import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: Array<{
      name: string;
      level: string;
    }>;
  };
  summary: string;
}

interface ResumePreviewProps {
  data: ResumeData;
  template?: any;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden" style={{ minHeight: '297mm', transform: 'scale(0.6)', transformOrigin: 'top center' }}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.personal.fullName || 'الاسم الكامل'}
          </h1>
          {data.personal.title && (
            <p className="text-xl text-gray-600 mb-4">{data.personal.title}</p>
          )}
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {data.personal.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {data.personal.email}
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {data.personal.phone}
              </div>
            )}
            {data.personal.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {data.personal.location}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">الملخص المهني</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">الخبرة المهنية</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary pl-4">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <Calendar className="h-3 w-3" />
                    {formatDate(exp.startDate)} - {exp.current ? 'حالياً' : formatDate(exp.endDate)}
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">التعليم</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-secondary pl-4">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-secondary font-medium">{edu.institution}</p>
                  {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {formatDate(edu.startDate)} - {edu.current ? 'حالياً' : formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">المهارات</h2>
            
            {data.skills.technical.length > 0 && (
              <div className="mb-3">
                <h3 className="font-medium text-gray-900 mb-2">المهارات التقنية</h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.technical.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {data.skills.soft.length > 0 && (
              <div className="mb-3">
                <h3 className="font-medium text-gray-900 mb-2">المهارات الشخصية</h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {data.skills.languages.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">اللغات</h3>
                <div className="grid grid-cols-2 gap-2">
                  {data.skills.languages.map((lang, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-gray-600"> - {lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}