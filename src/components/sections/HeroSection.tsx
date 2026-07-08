import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import { ChevronDown, Code, Camera, Video, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {

  // Interactive terminal states
  const [startupLogs, setStartupLogs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(true);
  const [history, setHistory] = useState<string[]>(["welcome"]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [pointer, setPointer] = useState(-1);

  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const handleStartTour = () => {
      setTimeout(() => setShowTour(true), 600);
    };

    window.addEventListener('start-terminal-tour', handleStartTour);

    const hasSeenThemeTour = localStorage.getItem('theme-tour-seen');
    const hasSeenTerminalTour = localStorage.getItem('terminal-tour-seen');
    if (hasSeenThemeTour && !hasSeenTerminalTour) {
      handleStartTour();
    }

    return () => window.removeEventListener('start-terminal-tour', handleStartTour);
  }, []);

  const dismissTour = () => {
    setShowTour(false);
    localStorage.setItem('terminal-tour-seen', 'true');
  };

  useEffect(() => {
    if (showTour) {
      const handleInteraction = () => dismissTour();
      const handleScroll = () => {
        if (scrollIndicatorRef.current) {
          const rect = scrollIndicatorRef.current.getBoundingClientRect();
          // Dismiss when scroll_down() reaches near the top of the screen
          if (rect.top <= 150) {
            dismissTour();
          }
        }
      };

      window.addEventListener('click', handleInteraction);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showTour]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [history, startupLogs, inputVal]);

  const handleTerminalClick = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputVal.trim();
    if (!cleanInput) return;

    if (cleanInput.toLowerCase() === "clear") {
      setHistory([]);
      setStartupLogs([]);
    } else {
      setHistory(prev => [...prev, cleanInput]);
    }

    setCmdHistory(prev => [cleanInput, ...prev]);
    setInputVal("");
    setPointer(-1);
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pointer + 1 < cmdHistory.length) {
        const nextPointer = pointer + 1;
        setPointer(nextPointer);
        setInputVal(cmdHistory[nextPointer]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (pointer > 0) {
        const nextPointer = pointer - 1;
        setPointer(nextPointer);
        setInputVal(cmdHistory[nextPointer]);
      } else if (pointer === 0) {
        setPointer(-1);
        setInputVal("");
      }
    }
  };

  const renderCommandOutput = (commandLine: string) => {
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
  };

  // Maps command names → portfolio section IDs
  const cmdSectionMap: Record<string, string> = {
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

  // Maps [SECTION HEADER] text → portfolio section ID
  const headerSectionMap: Record<string, string> = {
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

  // Parse plain-text command output into highlighted, linked JSX
  const renderTerminalText = (text: string, cmd: string) => {
    const targetSection = cmdSectionMap[cmd.trim().toLowerCase()];
    const lines = text.split('\n');
    return (
      <>
        {lines.map((line, i) => {
          // [SECTION HEADER] — bright primary + bold, clickable if section known
          if (/^\[.+\]$/.test(line.trim())) {
            const dest = headerSectionMap[line.trim()];
            if (dest) {
              return (
                <button
                  key={i}
                  onClick={() => onSectionChange(dest)}
                  className="block text-left text-primary font-bold tracking-wider mt-1 hover:brightness-125 transition-all cursor-pointer"
                >
                  {line} <span className="text-primary/50 text-[10px] font-normal no-underline ml-1">↗ go to section</span>
                </button>
              );
            }
            return (
              <div key={i} className="text-primary font-bold tracking-wider mt-1">{line}</div>
            );
          }
          // Numbered list items: "1. Title" — link to command's target section
          if (/^\d+\.\s/.test(line.trim())) {
            const match = line.match(/^(\d+\.\s)(.+)$/);
            if (targetSection) {
              return (
                <button
                  key={i}
                  onClick={() => onSectionChange(targetSection)}
                  className="flex items-baseline gap-0.5 mt-2 group cursor-pointer w-full text-left"
                >
                  <span className="text-primary font-bold">{match?.[1]}</span>
                  <span className="text-primary font-semibold group-hover:brightness-125 transition-all">
                    {match?.[2]}
                  </span>
                  <span className="text-primary/40 text-[10px] ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </button>
              );
            }
            return (
              <div key={i} className="mt-2">
                <span className="text-primary font-bold">{match?.[1]}</span>
                <span className="text-primary font-semibold">{match?.[2]}</span>
              </div>
            );
          }
          // Category headings ending with colon: "Cybersecurity:", "TryHackMe:"
          if (/^[A-Za-z][\w\s&\/()]+:$/.test(line.trim()) && !line.trim().startsWith('•')) {
            return (
              <div key={i} className="text-primary font-semibold mt-3">{line}</div>
            );
          }
          // Tool/key-value lines like "Network Analysis: Wireshark"
          if (/^[A-Za-z][\w\s&\/()]+:\s.+/.test(line.trim()) && !line.trim().startsWith('•')) {
            const colonIdx = line.indexOf(':');
            return (
              <div key={i} className="mt-1">
                <span className="text-primary font-semibold">{line.slice(0, colonIdx + 1)}</span>
                <span className="text-green-dark">{line.slice(colonIdx + 1)}</span>
              </div>
            );
          }
          // Bullet points
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return <div key={i} className="text-green-dark pl-2">{line}</div>;
          }
          // Status keyword highlights
          if (/COMPLETED|IN PROGRESS|ACTIVE|LOADED|CLEAN|LOW|AUTHORIZED/.test(line)) {
            const parts = line.split(/(COMPLETED|IN PROGRESS|ACTIVE|LOADED|CLEAN|LOW|AUTHORIZED)/);
            return (
              <div key={i} className="text-green-dark">
                {parts.map((part, pi) =>
                  /COMPLETED|IN PROGRESS|ACTIVE|LOADED|CLEAN|LOW|AUTHORIZED/.test(part)
                    ? <span key={pi} className="text-primary font-bold">{part}</span>
                    : part
                )}
              </div>
            );
          }
          // Empty spacer
          if (line.trim() === '') return <div key={i} className="h-2" />;
          // Default body text
          return <div key={i} className="text-green-dark">{line}</div>;
        })}
      </>
    );
  };



  return (
    <section className="min-h-screen flex flex-col justify-center relative matrix-bg pt-28 pb-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          {showTour && (
            <div className="absolute inset-0 z-40 bg-background/60 backdrop-blur-sm transition-all" />
          )}
          <div className={`relative mb-12 group transition-all duration-500 ${showTour ? 'z-50 ring-2 ring-primary ring-offset-4 ring-offset-background rounded-lg' : 'z-10'}`}>
            
            {/* Terminal Tour Overlay */}
            {showTour && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black-deep border border-primary/50 p-5 rounded shadow-2xl z-50 w-[90%] max-w-[340px] animate-fade-in pointer-events-auto">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary/50" />
                <div className="flex items-center gap-2 mb-2 text-primary font-bold text-lg">
                  <Terminal className="w-5 h-5" />
                  <span>TERMINAL.APP</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Type commands like <span className="text-primary font-bold">help</span>, <span className="text-primary font-bold">about</span>, or <span className="text-primary font-bold">projects</span> to navigate the site like a real geek, or simply scroll down to navigate like a normal website.
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); dismissTour(); }}
                  className="w-full text-center text-primary hover:text-primary/80 border border-primary/40 rounded px-3 py-2 transition-all hover:bg-primary/10 font-bold text-sm tracking-wide"
                >
                  Start ✓
                </button>
              </div>
            )}

            <div className="cyber-border bg-black-light/50 rounded-lg p-8">
              <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="ml-4 font-mono text-sm text-muted-foreground">terminal.app</span>
              </div>

              <div 
                onClick={handleTerminalClick}
                className="text-left space-y-2 font-mono h-80 overflow-y-auto custom-scrollbar select-text cursor-text relative"
                ref={terminalEndRef}
              >
                {/* Startup logs */}
                {startupLogs.map((log, i) => (
                  <div key={i} className="text-green-dark">{log}</div>
                ))}
              
              {/* Command History */}
              {isReady && history.map((cmd, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-primary">
                    <span className="text-muted-foreground">$</span> {cmd}
                  </div>
                  <div className="mb-3 leading-relaxed">
                    {renderTerminalText(renderCommandOutput(cmd), cmd)}
                  </div>
                </div>
              ))}
              
              {/* Active Input Line */}
              {isReady && (
                <form onSubmit={handleCommandSubmit} className="flex items-center text-primary mt-1">
                  <span className="text-muted-foreground mr-2">$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={handleTerminalKeyDown}
                    className="flex-grow bg-transparent border-none outline-none text-primary font-mono select-text"
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                  />
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <Button
              onClick={() => onSectionChange('about')}
              className="cyber-border bg-black-light hover:bg-primary/10 text-primary border-primary p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              variant="outline"
            >
              <Code className="w-8 h-8" />
              <span>./about.sys</span>
              <span className="text-xs text-muted-foreground">Analyst Background</span>
            </Button>

            <Button
              onClick={() => onSectionChange('projects')}
              className="cyber-border bg-black-light hover:bg-primary/10 text-primary border-primary p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              variant="outline"
            >
              <Code className="w-8 h-8" />
              <span>./projects.log</span>
              <span className="text-xs text-muted-foreground">Portfolio Projects</span>
            </Button>

            <Button
              onClick={() => onSectionChange('blogs')}
              className="cyber-border bg-black-light hover:bg-primary/10 text-primary border-primary p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              variant="outline"
            >
              <Code className="w-8 h-8" />
              <span>./blogs.md</span>
              <span className="text-xs text-muted-foreground">Blogs & Writeups</span>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div ref={scrollIndicatorRef} className="flex flex-col items-center space-y-2 text-primary animate-bounce">
            <span className="font-mono text-sm">scroll_down()</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

    </section>
  );
}