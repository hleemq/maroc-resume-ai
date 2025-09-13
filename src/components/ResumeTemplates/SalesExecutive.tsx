import { ResumeData } from "@/lib/resumeUtils";

interface SalesExecutiveProps {
  data: ResumeData;
}

export const SalesExecutive = ({ data }: SalesExecutiveProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] font-sans">
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
        
        <h1 className="text-4xl font-bold mb-3 relative z-10">{data.personal.fullName}</h1>
        <div className="grid grid-cols-2 gap-6 text-orange-100 relative z-10">
          <div className="space-y-2">
            <p className="flex items-center font-medium">
              <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
              {data.personal.email}
            </p>
            <p className="flex items-center font-medium">
              <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
              {data.personal.phone}
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center font-medium">
              <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
              {data.personal.location}
            </p>
            {data.personal.linkedin && (
              <p className="flex items-center font-medium">
                <span className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></span>
                {data.personal.linkedin}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Value Proposition */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 relative">
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                VALUE PROPOSITION
              </span>
              <div className="absolute -bottom-1 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            </h2>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-800 leading-relaxed text-base font-medium">{data.summary}</p>
            </div>
          </div>
        )}

        {/* Sales Performance */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 relative">
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                SALES PERFORMANCE
              </span>
              <div className="absolute -bottom-1 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 relative">
                <div className="bg-white border-2 border-orange-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {exp.startDate} - {exp.current ? 'CURRENT' : exp.endDate}
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-orange-600 mb-3">{exp.company}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Professional Development */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 relative">
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                PROFESSIONAL DEVELOPMENT
              </span>
              <div className="absolute -bottom-1 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                  <span className="text-orange-600 bg-white px-3 py-1 rounded-full text-sm font-bold border border-orange-200">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-orange-600 font-semibold">{edu.institution}</p>
                <p className="text-gray-700">{edu.field}</p>
              </div>
            ))}
          </div>
        )}

        {/* Core Competencies */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4 relative">
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                CORE COMPETENCIES
              </span>
              <div className="absolute -bottom-1 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.technical.map((skill, index) => (
                <div key={`tech-${index}`} className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{skill}</span>
                    <span className="bg-white text-red-600 px-3 py-1 rounded-full text-xs font-bold">TECHNICAL</span>
                  </div>
                </div>
              ))}
              {data.skills.soft.map((skill, index) => (
                <div key={`soft-${index}`} className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-300 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">{skill}</span>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">SALES SKILL</span>
                  </div>
                </div>
              ))}
              {data.skills.languages.map((lang, index) => (
                <div key={`lang-${index}`} className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">{lang.name}</span>
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">{lang.level}</span>
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