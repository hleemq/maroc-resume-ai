import { ResumeData } from "@/lib/resumeUtils";

interface EngineeringProfessionalProps {
  data: ResumeData;
}

export const EngineeringProfessional = ({ data }: EngineeringProfessionalProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] font-mono text-sm">
      {/* Technical Header */}
      <div className="bg-slate-800 text-white p-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 border-4 border-green-400 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-2 border-green-400 opacity-30"></div>
        
        <h1 className="text-3xl font-bold mb-3 text-green-400">{data.personal.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-slate-200 text-sm">
          <div className="space-y-1">
            <p className="flex items-center">
              <span className="text-green-400 mr-2">›</span> {data.personal.email}
            </p>
            <p className="flex items-center">
              <span className="text-green-400 mr-2">›</span> {data.personal.phone}
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center">
              <span className="text-green-400 mr-2">›</span> {data.personal.location}
            </p>
            {data.personal.linkedin && (
              <p className="flex items-center">
                <span className="text-green-400 mr-2">›</span> {data.personal.linkedin}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* System Overview */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3 border-l-4 border-green-500 pl-3">
              // SYSTEM_OVERVIEW
            </h2>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded font-sans">
              <p className="text-slate-700 leading-relaxed">{data.summary}</p>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3 border-l-4 border-green-500 pl-3">
              // WORK_EXPERIENCE
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-5 border border-slate-200 rounded p-4 bg-slate-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-800 font-sans">{exp.position}</h3>
                  <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold">
                    {exp.startDate} - {exp.current ? 'ACTIVE' : exp.endDate}
                  </span>
                </div>
                <p className="text-green-600 font-bold mb-2">{exp.company}</p>
                <div className="font-sans">
                  <p className="text-slate-700 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3 border-l-4 border-green-500 pl-3">
              // EDUCATION_MODULES
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 bg-green-50 p-4 border border-green-200 rounded">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-800 font-sans">{edu.degree}</h3>
                  <span className="text-green-600 text-sm font-bold">
                    {edu.startDate} - {edu.current ? 'CURRENT' : edu.endDate}
                  </span>
                </div>
                <p className="text-green-700 font-semibold">{edu.institution}</p>
                <p className="text-slate-600">{edu.field}</p>
              </div>
            ))}
          </div>
        )}

        {/* Technical Stack */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-3 border-l-4 border-green-500 pl-3">
              // TECHNICAL_STACK
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.skills.technical.map((skill, index) => (
                <div key={`tech-${index}`} className="bg-slate-800 text-green-400 p-3 rounded font-mono">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{skill}</span>
                    <span className="text-xs bg-green-400 text-slate-800 px-2 py-1 rounded">.tech</span>
                  </div>
                </div>
              ))}
              {data.skills.soft.map((skill, index) => (
                <div key={`soft-${index}`} className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <div className="flex justify-between items-center font-sans">
                    <span className="font-semibold text-slate-800">{skill}</span>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">.soft</span>
                  </div>
                </div>
              ))}
              {data.skills.languages.map((lang, index) => (
                <div key={`lang-${index}`} className="bg-purple-50 border border-purple-200 p-3 rounded">
                  <div className="flex justify-between items-center font-sans">
                    <span className="font-semibold text-slate-800">{lang.name}</span>
                    <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">{lang.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};