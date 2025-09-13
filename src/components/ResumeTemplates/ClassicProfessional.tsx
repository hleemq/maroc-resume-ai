import { ResumeData } from "@/lib/resumeUtils";

interface ClassicProfessionalProps {
  data: ResumeData;
}

export const ClassicProfessional = ({ data }: ClassicProfessionalProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black p-8 min-h-[297mm] font-serif text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center pb-6 mb-6 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.personal.fullName}</h1>
        <div className="text-gray-700 space-y-1">
          <p>{data.personal.email} • {data.personal.phone}</p>
          <p>{data.personal.location}</p>
          {data.personal.linkedin && <p>{data.personal.linkedin}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Professional Summary</h2>
          <p className="text-gray-800 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Professional Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold text-gray-800">{exp.position}</h3>
                <span className="text-gray-600 text-sm font-medium">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="font-semibold text-gray-700 mb-2">{exp.company}</p>
              <p className="text-gray-700 text-justify">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <span className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <p className="font-semibold text-gray-700">{edu.institution}</p>
              <p className="text-gray-600">{edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-400 pb-1">Skills</h2>
          <div className="space-y-3">
            {data.skills.technical.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Technical Skills</h3>
                <p className="text-gray-700">{data.skills.technical.join(', ')}</p>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Soft Skills</h3>
                <p className="text-gray-700">{data.skills.soft.join(', ')}</p>
              </div>
            )}
            {data.skills.languages.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Languages</h3>
                <p className="text-gray-700">
                  {data.skills.languages.map(lang => `${lang.name} (${lang.level})`).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};