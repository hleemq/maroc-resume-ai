import { ResumeData } from "@/lib/resumeUtils";

interface MedicalProfessionalProps {
  data: ResumeData;
}

export const MedicalProfessional = ({ data }: MedicalProfessionalProps) => {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black min-h-[297mm] font-sans">
      {/* Header with Medical Theme */}
      <div className="bg-blue-50 border-l-8 border-blue-600 p-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{data.personal.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-blue-800 text-sm">
          <div>
            <p className="flex items-center gap-2">
              <span className="font-medium">Email:</span> {data.personal.email}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Phone:</span> {data.personal.phone}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-2">
              <span className="font-medium">Location:</span> {data.personal.location}
            </p>
            {data.personal.linkedin && (
              <p className="flex items-center gap-2">
                <span className="font-medium">LinkedIn:</span> {data.personal.linkedin}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-6">
        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-blue-600 mr-3"></span>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded border-l-4 border-blue-600">{data.summary}</p>
          </div>
        )}

        {/* Clinical Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-blue-600 mr-3"></span>
              Clinical Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-5 bg-gray-50 p-4 rounded border-l-4 border-blue-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-blue-800">{exp.position}</h3>
                  <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-blue-700 font-semibold mb-2">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education & Credentials */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-blue-600 mr-3"></span>
              Education & Credentials
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 bg-blue-50 p-4 rounded border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-blue-800">{edu.degree}</h3>
                  <span className="text-blue-600 text-sm font-medium">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-blue-700 font-semibold">{edu.institution}</p>
                <p className="text-gray-700">{edu.field}</p>
              </div>
            ))}
          </div>
        )}

        {/* Clinical Skills & Competencies */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-blue-600 mr-3"></span>
              Clinical Skills & Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.technical.map((skill, index) => (
                <div key={`tech-${index}`} className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-800">{skill}</span>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Clinical</span>
                  </div>
                </div>
              ))}
              {data.skills.soft.map((skill, index) => (
                <div key={`soft-${index}`} className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-800">{skill}</span>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Interpersonal</span>
                  </div>
                </div>
              ))}
              {data.skills.languages.map((lang, index) => (
                <div key={`lang-${index}`} className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-purple-800">{lang.name}</span>
                    <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">{lang.level}</span>
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