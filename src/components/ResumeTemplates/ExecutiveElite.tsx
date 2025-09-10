import { ResumeData } from "@/lib/resumeUtils";

interface ExecutiveEliteProps {
  data: ResumeData;
}

export const ExecutiveElite = ({ data }: ExecutiveEliteProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] font-serif">
      {/* Header */}
      <div className="bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.personal.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm">
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

      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">Professional Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 border-l-4 border-yellow-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-lg font-semibold text-yellow-600 mb-3">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 border-l-4 border-yellow-500 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-yellow-600 font-semibold">{edu.institution}</p>
                <p className="text-gray-700">{edu.field}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-500 pb-2">Core Competencies</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded border-l-4 border-yellow-500">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">{skill.name}</span>
                    <span className="text-yellow-600 font-bold">{skill.level}</span>
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