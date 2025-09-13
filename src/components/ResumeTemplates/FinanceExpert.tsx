import { ResumeData } from "@/lib/resumeUtils";

interface FinanceExpertProps {
  data: ResumeData;
}

export const FinanceExpert = ({ data }: FinanceExpertProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] font-sans">
      {/* Elegant Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-3">{data.personal.fullName}</h1>
        <div className="grid grid-cols-2 gap-6 text-gray-200">
          <div className="space-y-1">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              {data.personal.email}
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              {data.personal.phone}
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              {data.personal.location}
            </p>
            {data.personal.linkedin && (
              <p className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                {data.personal.linkedin}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Executive Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              <span className="border-b-4 border-yellow-500 pb-1">Executive Summary</span>
            </h2>
            <div className="bg-gray-50 p-6 border-l-4 border-yellow-500 rounded-r">
              <p className="text-gray-800 leading-relaxed text-base italic">{data.summary}</p>
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              <span className="border-b-4 border-yellow-500 pb-1">Professional Experience</span>
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-yellow-500"></div>
                <div className="pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    <div className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-yellow-600 mb-3">{exp.company}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              <span className="border-b-4 border-yellow-500 pb-1">Education & Qualifications</span>
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 bg-gray-50 p-4 rounded border-l-4 border-yellow-500">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                  <span className="text-gray-600 bg-white px-3 py-1 rounded">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-yellow-600 font-semibold">{edu.institution}</p>
                <p className="text-gray-700">{edu.field}</p>
              </div>
            ))}
          </div>
        )}

        {/* Financial Expertise */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative">
              <span className="border-b-4 border-yellow-500 pb-1">Financial Expertise</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.technical.map((skill, index) => (
                <div key={`tech-${index}`} className="bg-gray-900 text-white p-4 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{skill}</span>
                    <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold">Technical</span>
                  </div>
                </div>
              ))}
              {data.skills.soft.map((skill, index) => (
                <div key={`soft-${index}`} className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{skill}</span>
                    <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold">Leadership</span>
                  </div>
                </div>
              ))}
              {data.skills.languages.map((lang, index) => (
                <div key={`lang-${index}`} className="bg-gray-100 border-2 border-gray-300 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{lang.name}</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-bold">{lang.level}</span>
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