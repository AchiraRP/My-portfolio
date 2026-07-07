const fs = require('fs');

function extractBlock(filePath, regex) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(regex);
  return match ? match[0] : null;
}

const portfolioData = extractBlock('src/App.tsx', /const portfolioData = \{[\s\S]+?\n\};/);
const posts = extractBlock('src/components/BlogsSection.tsx', /const posts: Post\[\] = \[[\s\S]+?\n\];/);
const skillGroups = extractBlock('src/components/SkillsSection.tsx', /const skillGroups = \[[\s\S]+?\n\];/);
const certBadges = extractBlock('src/components/SkillsSection.tsx', /const certBadges = \[[\s\S]+?\n\];/);
const certs = extractBlock('src/components/ProofSection.tsx', /const certs: CertItem\[\] = \[[\s\S]+?\n\];/);
const allCerts = extractBlock('src/components/ProofSection.tsx', /const allCerts: CertItem\[\] = \[[\s\S]+?\n\];/);
const platformBadges = extractBlock('src/components/ProofSection.tsx', /const platformBadges: BadgeItem\[\] = \[[\s\S]+?\n\];/);
const allBadges = extractBlock('src/components/ProofSection.tsx', /const allBadges: BadgeItem\[\] = \[[\s\S]+?\n\];/);

let finalFile = `// Centralized Portfolio Content Configuration
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

// --- DATA ---
export ${portfolioData}
export ${posts}
export ${skillGroups}
export ${certBadges}
export ${certs}
export ${allCerts}
export ${platformBadges}
export ${allBadges}
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/portfolio.ts', finalFile);
console.log('Successfully created portfolio.ts');
