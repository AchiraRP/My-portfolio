export const cmdSectionMap: Record<string, string> = {
  projects: 'projects',
  blogs: 'blogs',
  docs: 'blogs',
  labs: 'blogs',
  skills: 'skills',
  about: 'about',
  whoami: 'about',
  contact: 'contact',
  socials: 'contact',
  certifications: 'skills',
  certificates: 'skills',
  badges: 'skills',
  experience: 'about',
  tools: 'skills',
};

export const headerSectionMap: Record<string, string> = {
  '[FEATURED PROJECTS]': 'projects',
  '[TECHNICAL SKILLS]': 'skills',
  '[SECURITY TOOLKIT]': 'skills',
  '[BLOGS & WRITEUPS]': 'blogs',
  '[PROJECT DOCUMENTATION]': 'blogs',
  '[CYBERSECURITY LABS]': 'blogs',
  '[SECURE HANDSHAKE]': 'contact',
  '[NETWORK CONNECTIONS]': 'contact',
  '[PLATFORM BADGES & ACHIEVEMENTS]': 'skills',
  '[TRAINING & LEARNING]': 'skills',
  '[EXPERIENCE & ACTIVITIES]': 'about',
  '[RESUME DATABASE]': 'about',
};

export function renderCommandOutput(commandLine: string): string {
  const cmdClean = commandLine.trim().toLowerCase();
  const parts = cmdClean.split(" ");
  const cmd = parts[0];

  switch (cmd) {
    case "welcome":
      return `Welcome to Achira Pathiraja's Cybersecurity Portfolio.

Explore projects, skills, blogs, and professional information using terminal commands.

Type "help" to view available commands.`;

    case "help":
      return `Available commands:
  whoami          - Display active analyst status
  about           - Short background & mission overview
  skills          - List specialized technical skills
  projects        - Overview of cybersecurity & AI projects
  experience      - Work & volunteering experience
  certifications  - View professional credentials
  badges          - Platform badges & achievements
  tools           - Threat hunting & monitoring toolsets
  blogs           - Technical blog posts & writeups
  docs            - Project documentation list
  contact         - Secure connection email & details
  socials         - GitHub and LinkedIn profiles
  resume          - Instructions to fetch resume PDF
  clear           - Reset terminal screen
  help            - Show this help menu`;
      
    case "whoami":
      return `Analyst ID: Achira Pathiraja

Role:
Cybersecurity Student | Aspiring SOC Analyst

Current Status:
Learning • Investigating • Building

Focus Areas:
Security Operations Center (SOC)
Threat Detection & Monitoring
Incident Response
Digital Forensics
Artificial Intelligence & Machine Learning

Location:
Sri Lanka

Connection:
ESTABLISHED (127.0.0.1)`;

    case "about":
      return `I am an Information Technology undergraduate with a strong interest in Cybersecurity, Security Operations, Digital Forensics, and Artificial Intelligence.

My current learning journey focuses on understanding how security teams detect, investigate, and respond to cyber threats in real-world environments.

Through platforms such as TryHackMe and Blue Team Labs Online, I continuously develop practical skills in log analysis, incident response, threat hunting, and security monitoring.

In addition to cybersecurity, I enjoy building software solutions and machine learning projects that solve real-world problems.

My long-term goal is to become a Security Operations Center (SOC) Analyst and contribute to protecting organizations against evolving cyber threats.`;

    case "skills":
      return `[TECHNICAL SKILLS]

Cybersecurity:
• Security Operations Center (SOC)
• Threat Detection
• Log Analysis
• Threat Intelligence
• Incident Response Fundamentals
• Digital Forensics Fundamentals
• Network Security

Programming:
• Python
• Java
• C/C++
• JavaScript

Artificial Intelligence:
• Machine Learning
• Deep Learning
• TensorFlow
• Keras
• Computer Vision

Tools & Platforms:
• Wireshark, Nmap, Burp Suite, Splunk, Autopsy
• Linux, Git & GitHub

Web Development:
• HTML, CSS, JavaScript, React (Learning)

Database Technologies:
• MySQL, SQL Fundamentals`;

    case "projects":
      return `[FEATURED PROJECTS]

1. Wildfire Detection Using Deep Learning
Developed a machine learning system using TensorFlow and EfficientNet to classify wildfire images with high accuracy.

2. FocusLearn Chrome Extension
A productivity-focused browser extension designed to transform YouTube into a distraction-free learning platform.

3. Security Lab Investigations
Collection of cybersecurity investigations completed through TryHackMe and Blue Team Labs Online.

4. Healthcare Monitoring System
Academic IoT project focused on collecting and monitoring patient health data using sensors and microcontrollers.

5. Personal Cybersecurity Portfolio
Interactive terminal-style portfolio showcasing cybersecurity projects, technical skills, and learning progress.`;

    case "experience":
      return `[EXPERIENCE & ACTIVITIES]

Volunteer Work:
• IEEE Student Branch — Volunteer Member
  Participated in tech workshops, events, and community initiatives.

• University IT Society — Member
  Collaborated on technical projects and knowledge-sharing sessions.

Self-Directed Learning:
• Completed 100+ hours of hands-on cybersecurity labs
• Active participant in CTF (Capture The Flag) challenges
• Continuous self-study in Blue Team operations and AI/ML

Current Focus:
• Building a strong foundation as an aspiring SOC Analyst
• Developing a cybersecurity project portfolio`;

    case "badges":
      return `[PLATFORM BADGES & ACHIEVEMENTS]

TryHackMe:
• [IN PROGRESS] SOC Level 1 Path
• Completed: Pre-Security Path
• Completed: Introduction to Cybersecurity
• Rank: Active Learner

Blue Team Labs Online:
• Completed: Phishing Analysis investigations
• Completed: Log Analysis challenges
• Completed: Threat Intelligence exercises

Google:
• Google Cybersecurity Certificate — COMPLETED
• Google AI Essentials — COMPLETED

Other:
• Cisco Intro to Cybersecurity — COMPLETED
• Python for Everybody (Coursera) — COMPLETED`;

    case "blogs":
      return `[BLOGS & WRITEUPS]

1. TryHackMe — SOC Level 1 Walkthrough
   A detailed walkthrough of the SOC Level 1 learning path.
   Tags: SOC, TryHackMe, Blue Team, SIEM

2. Understanding Cyber Kill Chain for Blue Teamers
   Breaking down the Kill Chain framework from a defensive perspective.
   Tags: Threat Detection, Kill Chain, Blue Team

3. Getting Started with Splunk for Log Analysis
   Beginner-friendly guide to writing SPL queries for security.
   Tags: Splunk, Log Analysis, SIEM, Tutorial

4. BTLO — Phishing Analysis Challenge Writeup
   IOC extraction and email header investigation walkthrough.
   Tags: BTLO, Phishing, Email Analysis

View all posts in the BLOGS.MD section of this portfolio.`;

    case "docs":
      return `[PROJECT DOCUMENTATION]

1. Wildfire Detection ML Model — Technical Docs
   Architecture, training pipeline, dataset description, and benchmarks.
   Stack: TensorFlow, EfficientNet, Python

2. FocusLearn Chrome Extension — Developer Docs
   Component breakdown, message passing architecture, contribution guide.
   Stack: JavaScript, Chrome Extension API

3. Healthcare Monitoring System — System Docs
   Sensor integration, data flow diagrams, and hardware specifications.
   Stack: Arduino, C++, IoT Sensors

Full documentation available in the BLOGS.MD section.`;

    case "certificates":
    case "certifications":
      return `[TRAINING & LEARNING]

• TryHackMe Learning Paths
• SOC Level 1 Training
• Blue Team Labs Online Investigations
• Cisco Networking Academy Courses
• Google AI & Machine Learning Learning Programs
• Self-Directed Cybersecurity Research

Current Goal: Preparing for future industry cybersecurity certifications.`;

    case "tools":
      return `[SECURITY TOOLKIT]

Network Analysis: Wireshark, TCPDump
Enumeration: Nmap, Netcat
Web Security: Burp Suite, OWASP ZAP
Digital Forensics: Autopsy, Volatility (Learning)
Monitoring & SIEM: Splunk, Elastic Security (Learning)
Operating Systems: Kali Linux, Ubuntu Linux, Windows
Development: VS Code, Git, GitHub`;

    case "labs":
      return `[CYBERSECURITY LABS]

TryHackMe
Hands-on learning focused on SOC Operations, Network Security, Digital Forensics, and Incident Response.

Blue Team Labs Online
Practical investigations involving Threat Analysis, Security Monitoring, Log Analysis, and Real-world Security Scenarios.

Learning Philosophy:
"Understanding how attacks happen is the first step toward learning how to defend against them."`;

    case "contact":
      return `[SECURE HANDSHAKE]
- Email: ${import.meta.env.VITE_CONTACT_EMAIL || 'YOUR_EMAIL'}
- Location: Sri Lanka
- Handshake status: ACTIVE. Please send a message below to establish connection.`;

    case "socials":
      return `[NETWORK CONNECTIONS]
- GitHub: https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'YOUR_USERNAME'}
- LinkedIn: https://linkedin.com/in/${import.meta.env.VITE_LINKEDIN_USERNAME || 'YOUR_PROFILE'}
- TryHackMe: https://tryhackme.com/p/${import.meta.env.VITE_TRYHACKME_USERNAME || 'YOUR_USERNAME'}`;

    case "resume":
      return `[RESUME DATABASE]
Document: Achira_Pathiraja_CV.pdf
Contents: Education, Technical Skills, Cybersecurity Training, Projects, Certifications, Activities
Status: Available for Download`;

    default:
      return `Command not found: '${cmd}'. Type 'help' to view available operations.`;
  }
}
