const fs = require('fs');

const projects = Array.from({ length: 12 }).map((_, i) => ({
  _id: `demo-bulk-project-${i}`,
  _type: "project",
  title: `Advanced Analytics Platform v${i + 1}`,
  description: `A full-stack application built to process and visualize large datasets in real-time. Project number ${i + 1}.`,
  image: i % 2 === 0 ? "/images/projects/demo1.png" : "/images/projects/demo2.png",
  tags: ["React", "TypeScript", "Node.js", "Docker"],
  githubLink: "https://github.com",
  liveLink: "https://example.com"
}));

const posts = Array.from({ length: 12 }).map((_, i) => ({
  _id: `demo-bulk-post-${i}`,
  _type: "post",
  title: `Deep Dive into Security Protocols - Part ${i + 1}`,
  summary: `An extensive writeup analyzing modern security architectures and vulnerabilities, case study ${i + 1}.`,
  date: `2024-02-${(i + 1).toString().padStart(2, '0')}`,
  readTime: `${(i % 5) + 3} min read`,
  tags: ["Security", "Networking", "Architecture"],
  type: i % 3 === 0 ? "writeup" : "blog",
  link: "https://medium.com"
}));

const certs = Array.from({ length: 12 }).map((_, i) => ({
  _id: `demo-bulk-cert-${i}`,
  _type: "certification",
  title: `Cloud Security Professional ${i + 1}`,
  issuer: i % 2 === 0 ? "AWS" : "CompTIA",
  date: `2023-11-${(i + 1).toString().padStart(2, '0')}`,
  status: "completed",
  tags: ["Cloud", "Security", "Infrastructure"],
  credentialUrl: "https://credly.com"
}));

const badges = Array.from({ length: 12 }).map((_, i) => ({
  _id: `demo-bulk-badge-${i}`,
  _type: "badge",
  platform: i % 2 === 0 ? "TryHackMe" : "HackTheBox",
  name: `Advanced Exploitation Room ${i + 1}`,
  description: `Successfully compromised the target machine using custom scripts and chained vulnerabilities.`,
  status: "earned",
  credentialUrl: "https://tryhackme.com"
}));

const allData = [...projects, ...posts, ...certs, ...badges];

const ndjson = allData.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync('demo-data-bulk.ndjson', ndjson);
console.log('demo-data-bulk.ndjson generated with ' + allData.length + ' documents.');
