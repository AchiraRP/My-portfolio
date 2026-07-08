import React, { useEffect } from 'react';
import { portfolioData, skillGroups, allCerts } from '../constants/portfolio';

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
  .ats-resume .text-body-main { font-size: 11px; line-height: 18px; font-weight: 400; }

  .ats-resume .mb-section-gap { margin-bottom: 24px; }
  .ats-resume .mb-stack-space { margin-bottom: 4px; }
  .ats-resume .mb-entry-gap { margin-bottom: 16px; }
  .ats-resume .pl-bullet-indent { padding-left: 12px; }
  .ats-resume .px-page-margin-x { padding-left: 0.75in; padding-right: 0.75in; }
  .ats-resume .py-page-margin-y { padding-top: 0.75in; padding-bottom: 0.75in; }
`;

export default function Resume() {
  useEffect(() => {
    document.title = 'Achira_Pathiraja_Resume';
    // Remove dark mode classes from HTML tag to ensure print is white
    document.documentElement.classList.remove('dark', 'monochrome');
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="ats-resume bg-surface-container-low text-on-surface min-h-screen py-8">
      <style>{resumeStyles}</style>
      
      {/* Top Navigation (Header) */}
      <header className="bg-surface-container-lowest print:hidden full-width top-0 border-b border-outline-variant flex justify-between items-center w-full px-[0.75in] py-4 max-w-[8.5in] mx-auto z-50 mb-8">
        <div className="font-name-lg text-name-lg text-primary">Resume Builder</div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleDownload}
            className="text-primary cursor-pointer active:opacity-80 hover:bg-gray-100 transition-colors p-2 rounded-full border border-gray-300" 
            title="Download PDF"
          >
            Print / Save as PDF
          </button>
        </div>
      </header>

      {/* Main Resume Canvas */}
      <main className="bg-surface-container-lowest max-w-[8.5in] mx-auto shadow-sm px-page-margin-x py-page-margin-y print:shadow-none print:m-0 print:p-0">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-section-gap">
          <h1 className="font-name-lg text-name-lg text-primary mb-stack-space uppercase">Achira Pathiraja</h1>
          <div className="font-job-title text-job-title text-primary mb-stack-space">Cybersecurity Professional</div>
          <div className="font-body-meta text-body-meta text-on-surface-variant flex flex-wrap justify-center gap-2">
            <span>Colombo, Sri Lanka</span>
            <span>|</span>
            <span>+94 7X XXXXXXX</span>
            <span>|</span>
            <span>achira.p@example.com</span>
            <span>|</span>
            <span>linkedin.com/in/achirapathiraja</span>
            <span>|</span>
            <span>github.com/achirapathiraja</span>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="mb-section-gap">
          <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Summary</h2>
          <div className="border-b border-outline-variant mb-stack-space"></div>
          <p className="font-body-main text-body-main text-on-surface">
            Dedicated Cybersecurity Professional and tech enthusiast with hands-on experience in SOC operations, incident response, and threat detection. Proficient in leveraging tools like Splunk, Wireshark, and Python to investigate and mitigate security risks. Looking to apply analytical skills and continuous learning mindset to a challenging Blue Team role.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-section-gap">
          <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Skills</h2>
          <div className="border-b border-outline-variant mb-stack-space"></div>
          <div className="space-y-1 font-body-main text-body-main text-on-surface">
            {skillGroups.map((group, index) => (
              <div key={index}>
                <strong className="font-semibold text-primary">{group.title}:</strong> {group.skills.map(s => s.name).join(', ')}
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience / Labs */}
        <section className="mb-section-gap">
          <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Experience & Labs</h2>
          <div className="border-b border-outline-variant mb-stack-space"></div>
          
          {/* @ts-ignore */}
          {portfolioData.labs.filter(l => !l.isMoreLink).slice(0, 3).map((lab, index) => (
            <div key={index} className="mb-entry-gap">
              <div className="flex justify-between items-baseline mb-stack-space">
                <div>
                  <span className="font-job-title text-job-title text-primary">{lab.title || 'Cybersecurity Lab'}</span>
                  <span className="font-body-main text-body-main text-on-surface ml-2">| {lab.tags?.join(', ') || ''}</span>
                </div>
                <div className="font-body-meta text-body-meta text-on-surface-variant">2023 – Present</div>
              </div>
              <ul className="list-disc pl-bullet-indent font-body-main text-body-main text-on-surface space-y-1">
                <li>{lab.description}</li>
                <li>Executed practical investigations into simulated attacks and system vulnerabilities.</li>
                <li>Demonstrated capability to analyze artifacts and produce actionable security recommendations.</li>
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-section-gap">
          <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Projects</h2>
          <div className="border-b border-outline-variant mb-stack-space"></div>
          
          {portfolioData.projects.filter(p => !p.isMoreLink).slice(0, 2).map((project, index) => (
            <div key={index} className="mb-entry-gap">
              <div className="flex justify-between items-baseline mb-stack-space">
                <div>
                  <span className="font-job-title text-job-title text-primary">{project.title}</span>
                  <span className="font-body-main text-body-main text-on-surface ml-2">| {project.tags?.join(', ') || ''}</span>
                </div>
                <div className="font-body-meta text-body-meta text-on-surface-variant">2023 – 2024</div>
              </div>
              <ul className="list-disc pl-bullet-indent font-body-main text-body-main text-on-surface space-y-1">
                <li>{project.description}</li>
                <li>Leveraged standard methodologies to design and implement effective solutions.</li>
                <li>Integrated multiple technologies to achieve desired technical outcomes.</li>
              </ul>
            </div>
          ))}
        </section>

        {/* Awards & Certifications */}
        <section className="mb-section-gap">
          <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Certifications</h2>
          <div className="border-b border-outline-variant mb-stack-space"></div>
          <ul className="list-disc pl-bullet-indent font-body-main text-body-main text-on-surface space-y-1">
            {allCerts.filter(c => !c.isMoreLink).map((cert, index) => (
              <li key={index}>
                <strong className="text-primary">{cert.title}</strong> — {cert.issuer} {cert.date ? `(${cert.date})` : ''} 
                {cert.status === 'IN PROGRESS' ? ' [In Progress]' : ''}
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mb-section-gap">
          <h2 className="font-section-title text-section-title text-primary uppercase mb-stack-space">Education</h2>
          <div className="border-b border-outline-variant mb-stack-space"></div>
          <div className="mb-entry-gap">
            <div className="flex justify-between items-baseline mb-stack-space">
              <div>
                <span className="font-job-title text-job-title text-primary">Bachelor of Science in Information Technology</span>
                <span className="font-body-main text-body-main text-on-surface ml-2">— University Name, Sri Lanka</span>
              </div>
              <div className="font-body-meta text-body-meta text-on-surface-variant">Graduated: 2024</div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
