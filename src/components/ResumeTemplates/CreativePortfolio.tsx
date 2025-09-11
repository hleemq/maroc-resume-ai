import { ResumeData } from "@/lib/resumeUtils";

interface CreativePortfolioProps {
  data: ResumeData;
}

export const CreativePortfolio = ({ data }: CreativePortfolioProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full transform -translate-x-12 translate-y-12"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{data.personal.fullName}</h1>
          <div className="grid grid-cols-2 gap-4 text-sm opacity-90">
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
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">Creative Vision</h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-500">
              <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
                <div className="ml-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-purple-600 mb-3">{exp.company}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-l-4 border-orange-400">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-gray-600 text-sm">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-orange-600 font-semibold">{edu.institution}</p>
                  <p className="text-gray-700">{edu.field}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">Skills</h2>
              <div className="space-y-3">
                {data.skills.technical.map((skill, index) => (
                  <div key={`tech-${index}`} className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{skill}</span>
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Technical
                      </span>
                    </div>
                  </div>
                ))}
                {data.skills.soft.map((skill, index) => (
                  <div key={`soft-${index}`} className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{skill}</span>
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Soft Skill
                      </span>
                    </div>
                  </div>
                ))}
                {data.skills.languages.map((lang, index) => (
                  <div key={`lang-${index}`} className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">{lang.name}</span>
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
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