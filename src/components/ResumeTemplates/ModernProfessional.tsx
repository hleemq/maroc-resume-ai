import { ResumeData } from "@/lib/resumeUtils";

interface ModernProfessionalProps {
  data: ResumeData;
}

export const ModernProfessional = ({ data }: ModernProfessionalProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black p-8 min-h-[297mm] font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.personal.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <div>
            <p>{data.personal.email}</p>
            <p>{data.personal.phone}</p>
          </div>
          <div>
            <p>{data.personal.location}</p>
            {data.personal.linkedin && <p>{data.personal.linkedin}</p>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="font-medium text-blue-600 mb-2">{exp.company}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <span className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <p className="font-medium text-blue-600">{edu.institution}</p>
              <p className="text-gray-700">{edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1">Skills</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.skills.technical.map((skill, index) => (
              <div key={`tech-${index}`} className="flex justify-between">
                <span className="text-gray-800">{skill}</span>
                <span className="text-blue-600 font-medium">Technical</span>
              </div>
            ))}
            {data.skills.soft.map((skill, index) => (
              <div key={`soft-${index}`} className="flex justify-between">
                <span className="text-gray-800">{skill}</span>
                <span className="text-blue-600 font-medium">Soft Skill</span>
              </div>
            ))}
            {data.skills.languages.map((lang, index) => (
              <div key={`lang-${index}`} className="flex justify-between">
                <span className="text-gray-800">{lang.name}</span>
                <span className="text-blue-600 font-medium">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};