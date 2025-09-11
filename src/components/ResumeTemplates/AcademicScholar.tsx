import { ResumeData } from "@/lib/resumeUtils";

interface AcademicScholarProps {
  data: ResumeData;
}

export const AcademicScholar = ({ data }: AcademicScholarProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black p-8 min-h-[297mm] font-serif text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-navy-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-3">{data.personal.fullName}</h1>
        <div className="flex justify-center gap-8 text-gray-700">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          <span>{data.personal.location}</span>
        </div>
        {data.personal.linkedin && (
          <p className="text-navy-700 mt-2">{data.personal.linkedin}</p>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4 text-center border-b border-gray-300 pb-2">ACADEMIC PROFILE</h2>
          <p className="text-gray-800 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4 text-center border-b border-gray-300 pb-2">EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-navy-800">{edu.degree}</h3>
                <span className="text-gray-600 font-medium">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <p className="text-navy-700 font-semibold text-base mb-1">{edu.institution}</p>
              <p className="text-gray-700 italic">{edu.field}</p>
              {edu.description && (
                <p className="text-gray-700 mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4 text-center border-b border-gray-300 pb-2">PROFESSIONAL EXPERIENCE</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-navy-800">{exp.position}</h3>
                <span className="text-gray-600 font-medium">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-navy-700 font-semibold text-base mb-2">{exp.company}</p>
              <p className="text-gray-700 text-justify">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
        <div>
          <h2 className="text-xl font-bold text-navy-900 mb-4 text-center border-b border-gray-300 pb-2">SKILLS & COMPETENCIES</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {data.skills.technical.map((skill, index) => (
              <div key={`tech-${index}`} className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-800 font-medium">{skill}</span>
                <span className="text-navy-700 font-semibold">Technical</span>
              </div>
            ))}
            {data.skills.soft.map((skill, index) => (
              <div key={`soft-${index}`} className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-800 font-medium">{skill}</span>
                <span className="text-navy-700 font-semibold">Soft Skill</span>
              </div>
            ))}
            {data.skills.languages.map((lang, index) => (
              <div key={`lang-${index}`} className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-800 font-medium">{lang.name}</span>
                <span className="text-navy-700 font-semibold">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};