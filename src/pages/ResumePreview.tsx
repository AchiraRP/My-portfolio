import React, { useEffect, useState } from 'react';
import { getResumeData } from '../services/sanityService';
import { Share2, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const resumeStyles = `
  .ats-resume {
    font-family: 'Inter', sans-serif;
  }
  .ats-resume .bg-surface-container-low { background-color: #f2f4f6; }
  .ats-resume .text-on-surface { color: #191c1e; }
  .ats-resume .bg-surface-container-lowest { background-color: #ffffff; }
  .ats-resume .border-outline-variant { border-color: #c6c6cd; }
  .ats-resume .text-primary { color: #000000; }
  .ats-resume .text-secondary { color: #505f76; }
  .ats-resume .text-on-surface-variant { color: #45464d; }

  .ats-resume .font-name-lg { font-family: 'Inter', sans-serif; }
  .ats-resume .text-name-lg { font-size: 24px; line-height: 32px; letter-spacing: -0.02em; font-weight: 700; }

  .ats-resume .font-job-title { font-family: 'Inter', sans-serif; }
  .ats-resume .text-job-title { font-size: 16px; line-height: 24px; font-weight: 600; }

  .ats-resume .font-body-meta { font-family: 'Inter', sans-serif; }
  .ats-resume .text-body-meta { font-size: 10px; line-height: 16px; font-weight: 400; }

  .ats-resume .font-section-title { font-family: 'Inter', sans-serif; }
  .ats-resume .text-section-title { font-size: 14px; line-height: 20px; letter-spacing: 0.05em; font-weight: 700; }

  .ats-resume .font-body-main { font-family: 'Inter', sans-serif; }
  .ats-resume .text-body-main { font-size: 11px; line-height: 16px; font-weight: 400; }

  .ats-resume .mb-section-gap { margin-bottom: 12px; }
  .ats-resume .mb-stack-space { margin-bottom: 2px; }
  .ats-resume .mb-entry-gap { margin-bottom: 8px; }
  
  /* Prevent individual entries from breaking across pages in PDF */
  .print-avoid-break { break-inside: avoid; page-break-inside: avoid; }
  
  .ats-resume .pl-bullet-indent { padding-left: 12px; }
  .ats-resume .px-page-margin-x { padding-left: 0.75in; padding-right: 0.75in; }
  .ats-resume .py-page-margin-y { padding-top: 0.75in; padding-bottom: 0.75in; }

  @media print {
    @page {
      margin: 0.75in;
    }
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background: white !important;
    }
    .ats-resume {
      background: white !important;
    }
    /* Disable screen padding when printing, let @page margin handle it perfectly */
    .ats-resume .px-page-margin-x { padding-left: 0 !important; padding-right: 0 !important; }
    .ats-resume .py-page-margin-y { padding-top: 0 !important; padding-bottom: 0 !important; }
    .ats-resume main { max-width: none !important; }
  }
`;

export default function ResumePreview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Achira_Pathiraja_Resume';
    // Ensure dark mode isn't applied to the HTML element while viewing resume for printing
    document.documentElement.classList.remove('dark', 'monochrome');

    getResumeData()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load resume:", err);
        setLoading(false);
      });
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Achira Pathiraja - Resume',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f4f6] flex flex-col items-center justify-center font-mono text-black gap-4">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p>Loading Resume Data from Sanity...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f2f4f6] flex flex-col items-center justify-center font-mono text-black gap-4">
        <p>No resume data found in Sanity. Please create a Resume document in Sanity Studio.</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-black text-white rounded">Go Back</button>
      </div>
    );
  }

  return (
    <div className="ats-resume bg-surface-container-low text-on-surface min-h-screen py-8">
      <style>{resumeStyles}</style>
      
      {/* Header Toolbar (Hidden on print) */}
      <header className="bg-surface-container-lowest print:hidden full-width top-0 border-b border-outline-variant flex justify-between items-center w-full px-[0.75in] py-4 max-w-[8.5in] mx-auto z-50 mb-8 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-primary hover:bg-gray-100 p-2 rounded flex items-center" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="font-name-lg text-lg text-primary hidden sm:block">
            Resume Preview
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="text-primary cursor-pointer active:opacity-80 hover:bg-gray-100 transition-colors p-2 rounded-full border border-gray-300 flex items-center" onClick={handleShare}>
            <Share2 className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button className="text-white bg-black cursor-pointer active:opacity-80 hover:bg-gray-800 transition-colors p-2 px-4 rounded-full border border-gray-300 flex items-center" onClick={handleDownload}>
            <Download className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Print / Save PDF</span>
          </button>
        </div>
      </header>

      {/* Main Resume Canvas (This is what prints) */}
      <main className="bg-surface-container-lowest max-w-[8.5in] mx-auto shadow-sm px-page-margin-x py-page-margin-y print:shadow-none print:m-0 print:p-0">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-section-gap">
          <h1 className="font-name-lg text-name-lg text-primary mb-stack-space uppercase">{data.name || 'Your Name'}</h1>
          <div className="font-job-title text-job-title text-primary mb-stack-space">{data.jobTitle || 'Your Title'}</div>
          <div className="font-body-meta text-body-meta text-on-surface-variant flex flex-wrap justify-center gap-2">
            {data.phone && <><span>{data.phone}</span><span>|</span></>}
            {data.email && <><span>{data.email}</span><span>|</span></>}
            {data.linkedin && <><span>{data.linkedin.replace('https://www.', '').replace('https://', '')}</span><span>|</span></>}
            {data.github && <span>{data.github.replace('https://www.', '').replace('https://', '')}</span>}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <section className="mb-section-gap">
            <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Summary</h2>
            <div className="border-b border-outline-variant mb-stack-space"></div>
            <p className="font-body-main text-body-main text-on-surface">
              {data.summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-section-gap">
            <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Skills</h2>
            <div className="border-b border-outline-variant mb-stack-space"></div>
            <div className="space-y-1 font-body-main text-body-main text-on-surface">
              {data.skills.map((group: any, index: number) => (
                <div key={index}>
                  <strong className="font-semibold text-primary">{group.category}:</strong> {group.items}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-section-gap">
            <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Experience</h2>
            <div className="border-b border-outline-variant mb-stack-space"></div>
            
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="print-avoid-break mb-entry-gap">
                <div className="flex justify-between items-baseline mb-stack-space">
                  <div>
                    <span className="font-job-title text-job-title text-primary">{exp.role}</span>
                    <span className="font-body-main text-body-main text-on-surface ml-2">— {exp.company}</span>
                  </div>
                  <div className="font-body-meta text-body-meta text-on-surface-variant">{exp.dateRange}</div>
                </div>
                {exp.tools && (
                  <div className="font-body-meta text-body-meta text-on-surface-variant mb-stack-space italic">
                    Tools Used: {exp.tools}
                  </div>
                )}
                <ul className="list-disc pl-bullet-indent font-body-main text-body-main text-on-surface space-y-1">
                  {exp.description?.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-section-gap">
            <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Projects</h2>
            <div className="border-b border-outline-variant mb-stack-space"></div>
            
            {data.projects.map((project: any, index: number) => {
              if (!project) return null;
              const mainLink = project.links?.live || project.links?.github;
              return (
              <div key={index} className="print-avoid-break mb-entry-gap">
                <div className="flex justify-between items-baseline mb-stack-space">
                  <div>
                    <span className="font-job-title text-job-title text-primary">{project.title}</span>
                  </div>
                  <div className="font-body-meta text-body-meta text-on-surface-variant">
                    {project.links?.github && <a href={project.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                    {project.links?.github && project.links?.live && ' | '}
                    {project.links?.live && <a href={project.links.live} target="_blank" rel="noreferrer">Live</a>}
                  </div>
                </div>
                <ul className="list-disc pl-bullet-indent font-body-main text-body-main text-on-surface space-y-1">
                  <li>{project.description}</li>
                </ul>
              </div>
              );
            })}
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-section-gap">
            <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Certifications</h2>
            <div className="border-b border-outline-variant mb-stack-space"></div>
            <ul className="list-disc pl-bullet-indent font-body-main text-body-main text-on-surface space-y-1">
              {data.certifications.map((cert: any, index: number) => {
                if (!cert) return null;
                return (
                <li key={index}>
                  <strong className="text-primary">{cert.title}</strong> — {cert.issuer} {cert.date ? `(${cert.date})` : ''} 
                </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-section-gap">
            <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Education</h2>
            <div className="border-b border-outline-variant mb-stack-space"></div>
            
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="print-avoid-break mb-entry-gap">
                <div className="flex justify-between items-baseline mb-stack-space">
                  <div>
                    <span className="font-job-title text-job-title text-primary">{edu.degree}</span>
                    <span className="font-body-main text-body-main text-on-surface ml-2">— {edu.school}</span>
                  </div>
                  <div className="font-body-meta text-body-meta text-on-surface-variant">{edu.graduation}</div>
                </div>
                {edu.cgpa && (
                  <div className="font-body-main text-body-main text-on-surface">CGPA: {edu.cgpa}</div>
                )}
              </div>
            ))}
          </section>
        )}

      </main>
    </div>
  );
}
