// Centralized Portfolio Content Configuration
// You can edit all your projects, blogs, skills, and certifications here!

import { BookOpen, FileText, Shield, Brain, Code, Network, Terminal, Database } from 'lucide-react';

// --- TYPES ---
export type PostType = 'blog' | 'writeup' | 'documentation';

export interface Post {
  id: string;
  type: PostType;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  link?: string;
  content: string;
  isMoreLink?: boolean;
}

export interface CertItem {
  title: string;
  issuer: string;
  date: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'VIEW MORE';
  credentialUrl?: string;
  image?: string;
  tags: string[];
  isMoreLink?: boolean;
}

export interface BadgeItem {
  platform: string;
  name: string;
  description: string;
  status: 'EARNED' | 'IN PROGRESS' | 'VIEW MORE';
  icon: string;
  credentialUrl?: string;
  image?: string;
  isMoreLink?: boolean;
  linkUrl?: string;
}

// ==========================================
// 1. PROJECTS & LABS
// ==========================================
export const portfolioData = {
  projects: [
    {
      id: 'project-1',
      title: 'Wildfire Detection System',
      description: 'Deep learning image classification model trained to identify wildfire images with high accuracy.',
      image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&auto=format&fit=crop&q=60',
      tags: ['Machine Learning', 'TensorFlow', 'Computer Vision'],
      type: 'projects' as const,
    },
    {
      id: 'project-2',
      title: 'FocusLearn Extension',
      description: 'Chrome extension designed to improve learning productivity by removing distractions from YouTube.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
      tags: ['JavaScript', 'Productivity', 'Web Extension'],
      type: 'projects' as const,
    },
    {
      id: 'project-3',
      title: 'Healthcare Monitoring System',
      description: 'IoT-based monitoring solution for collecting and displaying patient health information.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
      tags: ['Arduino', 'IoT', 'Embedded Systems'],
      type: 'projects' as const,
    },
    {
      id: 'project-4',
      title: 'Cybersecurity Portfolio',
      description: 'Interactive terminal-inspired portfolio built to showcase cybersecurity projects and skills.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
      tags: ['React', 'TypeScript', 'Portfolio'],
      type: 'projects' as const,
    },
    {
      id: '5',
      title: 'Personal Cybersecurity Portfolio',
      description: 'Interactive terminal-style portfolio built with React and Tailwind CSS to showcase cybersecurity projects, technical skills, and learning progress.',
      image: '/images/portfolio-preview.jpg',
      tags: ['React', 'TypeScript', 'Portfolio'],
      type: 'projects' as const,
      links: {
        github: 'https://github.com/'
      }
    },
    {
      id: 'extra1',
      title: 'Dark Web Scraper',
      description: 'Python script utilizing Tor proxies to scrape and index threat actor forums for leaked credentials and IOCs.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
      tags: ['Python', 'OSINT', 'Tor'],
      type: 'projects' as const,
      links: {
        github: 'https://github.com/',
        live: 'https://github.com/'
      }
    },
    {
      id: 'extra2',
      title: 'Vulnerability Scanner UI',
      description: 'Frontend dashboard for an open-source vulnerability scanner, displaying real-time metrics and exportable PDF reports.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60',
      tags: ['React', 'Dashboard', 'Security'],
      type: 'projects' as const,
      links: {
        github: 'https://github.com/'
      }
    },
    // --- VIEW ALL PROJECTS LINK ---
    {
      id: '6',
      title: 'View All Projects',
      description: 'Check out my GitHub for more open-source tools, scripts, and personal projects.',
      image: '',
      tags: ['GitHub', 'Open Source'],
      type: 'projects' as const,
      isMoreLink: true,
      links: {
        live: 'https://github.com/'
      }
    }
    // -----------------------------
  ],
  labs: [
    {
      id: 'lab-1',
      title: 'TryHackMe SOC Learning',
      description: 'Exploring real-world SOC concepts and analyst workflows.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
      tags: ['SOC', 'Blue Team', 'Detection'],
      type: 'labs' as const,
    },
    {
      id: 'lab-2',
      title: 'BTLO Investigations',
      description: 'Security investigations focused on incident response and threat analysis.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
      tags: ['Incident Response', 'Forensics'],
      type: 'labs' as const,
    },
    {
      id: 'lab-3',
      title: 'Network Traffic Analysis',
      description: 'Analyzing network captures using Wireshark.',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&auto=format&fit=crop&q=60',
      tags: ['Network Security', 'Wireshark'],
      type: 'labs' as const,
    },
    {
      id: 'lab-4',
      title: 'Log Analysis Practice',
      description: 'Investigating logs to identify suspicious activities and security events.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60',
      tags: ['Splunk', 'Log Analysis'],
      type: 'labs' as const,
    }
  ]
};
// ==========================================
// 2. BLOGS & WRITEUPS
// ==========================================
export const posts: Post[] = [
  {
    id: 'post-1',
    type: 'writeup',
    title: 'TryHackMe — SOC Level 1 Walkthrough',
    summary: 'A detailed walkthrough of the SOC Level 1 learning path on TryHackMe, covering log analysis, threat detection, and SIEM fundamentals.',
    date: '2026-06-15',
    readTime: '8 min read',
    tags: ['SOC', 'TryHackMe', 'Blue Team', 'SIEM'],
    content: 'Full writeup covering the complete SOC Level 1 path including network fundamentals, endpoint security, and SIEM tools.',
    link: 'https://medium.com/'
  },
  {
    id: 'post-2',
    type: 'blog',
    title: 'Understanding Cyber Kill Chain for Blue Teamers',
    summary: 'Breaking down the Cyber Kill Chain framework from a defensive perspective — how to detect and disrupt each stage of an attack.',
    date: '2026-05-28',
    readTime: '6 min read',
    tags: ['Threat Detection', 'Kill Chain', 'Blue Team', 'Defense'],
    content: 'A comprehensive guide to the Cyber Kill Chain with detection strategies at each phase.',
    link: 'https://medium.com/'
  },
  {
    id: 'post-3',
    type: 'documentation',
    title: 'Wildfire Detection ML Model — Technical Docs',
    summary: 'Technical documentation for the TensorFlow-based wildfire image classification system, including architecture, training pipeline, and evaluation metrics.',
    date: '2026-05-10',
    readTime: '12 min read',
    tags: ['Machine Learning', 'TensorFlow', 'Documentation', 'Computer Vision'],
    content: 'Full technical documentation with dataset description, model architecture diagrams, hyperparameter configs, and performance benchmarks.',
    link: 'https://drive.google.com/'
  },
  {
    id: 'post-4',
    type: 'writeup',
    title: 'BTLO — Phishing Analysis Challenge',
    summary: 'Blue Team Labs Online phishing investigation — examining email headers, malicious links, and IOC extraction from a real-world phishing scenario.',
    date: '2026-04-22',
    readTime: '5 min read',
    tags: ['BTLO', 'Phishing', 'Email Analysis', 'IOC'],
    content: 'Step-by-step phishing analysis writeup using email header analysis, URL investigation, and threat intelligence lookups.',
    link: 'https://medium.com/'
  },
  {
    id: 'post-5',
    type: 'blog',
    title: 'Getting Started with Splunk for Log Analysis',
    summary: 'A beginner-friendly guide to using Splunk for cybersecurity log analysis — from installing to writing your first SPL queries.',
    date: '2026-04-05',
    readTime: '7 min read',
    tags: ['Splunk', 'Log Analysis', 'SIEM', 'Tutorial'],
    content: 'Practical guide covering Splunk setup, data ingestion, field extraction, and building security-focused dashboards.',
    link: 'https://medium.com/'
  },
  {
    id: 'post-6',
    type: 'documentation',
    title: 'FocusLearn Chrome Extension — Developer Docs',
    summary: 'Full developer documentation for the FocusLearn browser extension, including architecture overview, content scripts, and API usage.',
    date: '2026-03-18',
    readTime: '10 min read',
    tags: ['JavaScript', 'Chrome Extension', 'Documentation', 'Web'],
    content: 'Complete developer guide with component breakdown, message passing architecture, and contribution guidelines.',
    link: 'https://drive.google.com/'
  },
  {
    id: 'post-7',
    type: 'blog',
    title: 'Zero Trust Architecture Basics',
    summary: 'An introduction to Zero Trust principles, covering identity verification, micro-segmentation, and least privilege access.',
    date: '2026-02-12',
    readTime: '6 min read',
    tags: ['Zero Trust', 'Architecture', 'Security'],
    content: 'A comprehensive overview of how to transition from perimeter-based security to a Zero Trust model.',
    link: 'https://medium.com/'
  },
  {
    id: 'post-8',
    type: 'writeup',
    title: 'HackTheBox — Active Directory Exploitation',
    summary: 'A complete walkthrough of an AD-focused HTB machine, demonstrating Kerberoasting, AS-REP Roasting, and Golden Ticket attacks.',
    date: '2026-01-25',
    readTime: '15 min read',
    tags: ['HTB', 'Active Directory', 'Red Team', 'Pentesting'],
    content: 'Detailed red team walkthrough covering enumeration and exploitation of common AD misconfigurations.',
    link: 'https://medium.com/'
  },
  // --- VIEW ALL PUBLICATIONS LINK ---
  {
    id: 'post-view-more',
    type: 'blog',
    title: 'View All Publications',
    summary: 'Explore my complete archive of technical blogs, lab writeups, and project documentation.',
    date: '',
    readTime: '',
    tags: [],
    content: '',
    isMoreLink: true,
  },
  // ----------------------------------
];
// ==========================================
// 3. SKILLS & TECHNOLOGIES
// ==========================================
export const skillGroups = [
  {
    icon: Shield,
    title: 'Blue Team & SOC',
    skills: [
      { name: 'SIEM / Log Analysis', level: 70 },
      { name: 'Incident Response', level: 65 },
      { name: 'Threat Detection', level: 70 },
      { name: 'Digital Forensics', level: 60 },
      { name: 'Threat Hunting', level: 55 },
    ],
  },
  {
    icon: Code,
    title: 'Programming',
    skills: [
      { name: 'Python', level: 80 },
      { name: 'JavaScript', level: 70 },
      { name: 'Bash / Shell', level: 60 },
      { name: 'SQL', level: 65 },
      { name: 'HTML / CSS', level: 75 },
    ],
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow / Keras', level: 65 },
      { name: 'Scikit-learn', level: 70 },
      { name: 'Data Analysis', level: 72 },
      { name: 'Computer Vision', level: 60 },
      { name: 'Model Training', level: 65 },
    ],
  },
  {
    icon: Network,
    title: 'Networking',
    skills: [
      { name: 'TCP/IP Protocols', level: 70 },
      { name: 'Wireshark', level: 65 },
      { name: 'Network Scanning', level: 60 },
      { name: 'Firewall Concepts', level: 55 },
      { name: 'VPN / Tunnelling', level: 50 },
    ],
  },
  {
    icon: Terminal,
    title: 'Tools & Platforms',
    skills: [
      { name: 'TryHackMe', level: 75 },
      { name: 'Blue Team Labs Online', level: 70 },
      { name: 'Kali Linux', level: 65 },
      { name: 'Splunk', level: 60 },
      { name: 'Metasploit', level: 50 },
    ],
  },
  {
    icon: Database,
    title: 'Development',
    skills: [
      { name: 'React / TypeScript', level: 72 },
      { name: 'Node.js', level: 60 },
      { name: 'Git / GitHub', level: 78 },
      { name: 'Docker Basics', level: 45 },
      { name: 'REST APIs', level: 65 },
    ],
  },
];
// ==========================================
// 4. QUICK CERTIFICATION BADGES
// ==========================================
export const certBadges = [
  { name: 'TryHackMe — SOC Level 1', status: 'IN PROGRESS' },
  { name: 'Google Cybersecurity Cert', status: 'COMPLETED' },
  { name: 'BTLO — Security Analyst', status: 'IN PROGRESS' },
  { name: 'Python for Cybersecurity', status: 'COMPLETED' },
];
// ==========================================
// 5. DETAILED CERTIFICATIONS
// ==========================================
export const certs: CertItem[] = [
  {
    title: 'Google Cybersecurity Certificate',
    issuer: 'Google / Coursera',
    date: '2024',
    status: 'COMPLETED',
    credentialUrl: 'https://coursera.org/verify',
    image: 'https://images.credly.com/size/340x340/images/e7e97495-2592-498c-8517-73d82f254b0f/google-cybersecurity-certificate.png',
    tags: ['Cybersecurity', 'SOC', 'Networking'],
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    date: '2024',
    status: 'COMPLETED',
    credentialUrl: 'https://coursera.org/verify',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~3M2YZX86X4G2/CERTIFICATE_LANDING_PAGE~3M2YZX86X4G2.jpeg',
    tags: ['AI', 'Machine Learning'],
  },
  {
    title: 'Cisco Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    status: 'COMPLETED',
    credentialUrl: 'https://www.credly.com/',
    image: 'https://images.credly.com/size/340x340/images/28331da2-0994-4d81-807d-5a9e3e3b3334/image.png',
    tags: ['Networking', 'Cybersecurity'],
  },
  {
    title: 'Python for Everybody',
    issuer: 'Coursera',
    date: '2023',
    status: 'COMPLETED',
    credentialUrl: 'https://coursera.org/verify',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~3M2YZX86X4G2/CERTIFICATE_LANDING_PAGE~3M2YZX86X4G2.jpeg',
    tags: ['Python', 'Programming'],
  },
  {
    title: 'SOC Level 1 Learning Path',
    issuer: 'TryHackMe',
    date: '2025',
    status: 'IN PROGRESS',
    credentialUrl: 'https://tryhackme.com/path/outline/soclevel1',
    image: 'https://tryhackme-images.s3.amazonaws.com/paths/soclevel1.svg',
    tags: ['SOC', 'Blue Team', 'SIEM'],
  },
  // --- VIEW ALL CERTIFICATIONS LINK ---
  {
    title: 'View all 10+ Certifications',
    issuer: 'Internal Database',
    date: 'Current',
    status: 'VIEW MORE',
    tags: ['Expand'],
    isMoreLink: true,
  },
  // ------------------------------------
];
export const allCerts: CertItem[] = [
  ...certs.slice(0, 5),
  {
    title: 'Security Analyst Path',
    issuer: 'Blue Team Labs Online',
    date: '2025',
    status: 'IN PROGRESS',
    credentialUrl: 'https://blueteamlabs.online/',
    // using a generated placeholder image since the original BTLO link is dead
    image: '/btlo-logo.png',
    tags: ['Incident Response', 'Forensics'],
  },
  {
    title: 'CompTIA Security+ (Planned)',
    issuer: 'CompTIA',
    date: '2026',
    status: 'IN PROGRESS',
    credentialUrl: 'https://www.comptia.org/certifications/security',
    image: 'https://images.credly.com/size/340x340/images/d37311ce-1960-4927-a0ea-73db6ee77626/image.png',
    tags: ['Certification', 'Core'],
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    date: '2023',
    status: 'COMPLETED',
    credentialUrl: 'https://coursera.org/verify',
    image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~3M2YZX86X4G2/CERTIFICATE_LANDING_PAGE~3M2YZX86X4G2.jpeg',
    tags: ['AI', 'Python'],
  },
];
// ==========================================
// 6. PLATFORM BADGES (TryHackMe, BTLO)
// ==========================================
export const platformBadges: BadgeItem[] = [
  {
    platform: 'TryHackMe',
    name: 'Pre-Security Path',
    description: 'Completed foundational cybersecurity concepts and networking basics.',
    status: 'EARNED',
    icon: '🛡️',
    credentialUrl: 'https://tryhackme.com/',
  },
  {
    platform: 'TryHackMe',
    name: 'Introduction to Cybersecurity',
    description: 'Completed introductory offensive and defensive security modules.',
    status: 'EARNED',
    icon: '🔐',
    credentialUrl: 'https://tryhackme.com/',
  },
  {
    platform: 'TryHackMe',
    name: 'SOC Level 1',
    description: 'Hands-on SOC analyst training — log analysis, SIEM, threat detection.',
    status: 'IN PROGRESS',
    icon: '🖥️',
    credentialUrl: 'https://tryhackme.com/',
    image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/06385dfd7cd057b539b56f2f9c5a2789.jpeg',
  },
  {
    platform: 'BTLO',
    name: 'Phishing Analysis',
    description: 'Investigated phishing emails, extracted IOCs, and performed header analysis.',
    status: 'EARNED',
    icon: '📧',
    credentialUrl: 'https://blueteamlabs.online/',
    // using a generated placeholder image since the original BTLO link is dead
    image: '/btlo-logo.png',
  },
  {
    platform: 'BTLO',
    name: 'Log Analysis',
    description: 'Identified suspicious activity by analyzing server and auth logs.',
    status: 'EARNED',
    icon: '📋',
    credentialUrl: 'https://blueteamlabs.online/',
    // using a generated placeholder image since the original BTLO link is dead
    image: '/btlo-logo.png',
  },
  // --- VIEW ALL BADGES LINK ---
  {
    platform: 'Internal',
    name: 'View All Badges',
    description: 'Open full platform badge inventory and achievements.',
    status: 'VIEW MORE',
    icon: '📂',
    isMoreLink: true,
  },
  // ----------------------------
];
export const allBadges: BadgeItem[] = [
  ...platformBadges.slice(0, 5),
  {
    platform: 'TryHackMe',
    name: 'Web Fundamentals',
    description: 'Learned how web applications work and how to exploit common vulnerabilities.',
    status: 'EARNED',
    icon: '🌐',
    credentialUrl: 'https://tryhackme.com/',
    image: 'https://tryhackme-images.s3.amazonaws.com/room-icons/06385dfd7cd057b539b56f2f9c5a2789.jpeg',
  },
  {
    platform: 'BTLO',
    name: 'Incident Response',
    description: 'Responded to ransomware and malware infections in simulated enterprise environments.',
    status: 'IN PROGRESS',
    icon: '🚨',
    credentialUrl: 'https://blueteamlabs.online/',
    // using a generated placeholder image since the original BTLO link is dead
    image: '/btlo-logo.png',
  },
];
