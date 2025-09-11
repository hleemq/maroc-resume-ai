import { ResumeData } from "@/lib/resumeUtils";

interface StartupInnovatorProps {
  data: ResumeData;
}

export const StartupInnovator = ({ data }: StartupInnovatorProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-8 relative">
        <div className="absolute top-0 right-0 w-64 h-64 border-4 border-white opacity-20 rounded-full transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 transform -translate-x-16 translate-y-16" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">{data.personal.fullName}</h1>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="flex items-center"><span className="mr-2">📧</span>{data.personal.email}</p>
              <p className="flex items-center"><span className="mr-2">📱</span>{data.personal.phone}</p>
            </div>
            <div>
              <p className="flex items-center"><span className="mr-2">📍</span>{data.personal.location}</p>
              {data.personal.linkedin && <p className="flex items-center"><span className="mr-2">💼</span>{data.personal.linkedin}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-4 flex items-center">
              <span className="mr-3">🚀</span>Innovation Drive
            </h2>
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-xl border-l-4 border-orange-500 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200 to-pink-200 opacity-30 rounded-full transform translate-x-10 -translate-y-10"></div>
              <p className="text-gray-700 leading-relaxed text-base relative z-10">{data.summary}</p>
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-4 flex items-center">
              <span className="mr-3">💼</span>Experience Journey
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-pink-500 rounded"></div>
              {data.experience.map((exp, index) => (
                <div key={index} className="relative ml-10 mb-8">
                  <div className="absolute -left-8 top-2 w-4 h-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full border-4 border-white shadow"></div>
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {exp.startDate} - {exp.current ? 'Now' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-orange-600 mb-3">{exp.company}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-4 flex items-center">
                <span className="mr-2">🎓</span>Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-400">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-gray-600 text-sm bg-white px-2 py-1 rounded">
                      {edu.startDate} - {edu.current ? 'Now' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-blue-600 font-semibold">{edu.institution}</p>
                  <p className="text-gray-700">{edu.field}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-4 flex items-center">
                <span className="mr-2">⚡</span>Skills
              </h2>
              <div className="space-y-3">
                {data.skills.technical.map((skill, index) => (
                  <div key={`tech-${index}`} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 opacity-20 rounded-full transform translate-x-8 -translate-y-8"></div>
                    <div className="flex justify-between items-center relative z-10">
                      <span className="font-bold text-gray-800">{skill}</span>
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Technical
                      </span>
                    </div>
                  </div>
                ))}
                {data.skills.soft.map((skill, index) => (
                  <div key={`soft-${index}`} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 opacity-20 rounded-full transform translate-x-8 -translate-y-8"></div>
                    <div className="flex justify-between items-center relative z-10">
                      <span className="font-bold text-gray-800">{skill}</span>
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Soft Skill
                      </span>
                    </div>
                  </div>
                ))}
                {data.skills.languages.map((lang, index) => (
                  <div key={`lang-${index}`} className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 opacity-20 rounded-full transform translate-x-8 -translate-y-8"></div>
                    <div className="flex justify-between items-center relative z-10">
                      <span className="font-bold text-gray-800">{lang.name}</span>
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {lang.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};