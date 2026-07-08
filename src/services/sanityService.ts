import { client } from '../lib/sanity';
import type { PortfolioItem } from '../types';
import type { Post, CertItem, BadgeItem } from '../constants/portfolio';
import type { SanityRoadmap, SanityPhase } from '../types/roadmap';

export async function getProjects(): Promise<PortfolioItem[]> {
  const data = await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
    "id": _id,
    title,
    description,
    image,
    tags,
    isMoreLink,
    "links": {
      "github": githubLink,
      "live": liveLink
    }
  }`);
  
  return data.map((item: any) => ({
    ...item,
    type: 'projects'
  }));
}

export async function getLabs(): Promise<PortfolioItem[]> {
  const data = await client.fetch(`*[_type == "lab"] | order(_createdAt desc) {
    "id": _id,
    title,
    description,
    image,
    tags,
    isMoreLink,
    "links": {
      "github": githubLink,
      "live": liveLink
    }
  }`);

  return data.map((item: any) => ({
    ...item,
    type: 'labs'
  }));
}

export async function getPosts(): Promise<Post[]> {
  return await client.fetch(`*[_type == "post"] | order(date desc) {
    "id": _id,
    type,
    title,
    summary,
    date,
    readTime,
    tags,
    link,
    content,
    isMoreLink
  }`);
}

export async function getCertifications(): Promise<CertItem[]> {
  return await client.fetch(`*[_type == "certification"] | order(date desc) {
    title,
    issuer,
    date,
    status,
    credentialUrl,
    image,
    tags,
    isMoreLink
  }`);
}

export async function getBadges(): Promise<BadgeItem[]> {
  return await client.fetch(`*[_type == "badge"] | order(_createdAt desc) {
    platform,
    name,
    description,
    status,
    icon,
    credentialUrl,
    image,
    isMoreLink
  }`);
}

export async function getRoadmaps(): Promise<SanityRoadmap[]> {
  try {
    const query = `*[_type == "roadmap"] | order(order asc) {
      _id,
      title,
      slug,
      icon,
      description,
      coverImage,
      order,
      estimatedDuration,
      featured
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    return [];
  }
}

export async function getRoadmapBySlug(slug: string): Promise<{ roadmap: SanityRoadmap | null, phases: SanityPhase[] }> {
  try {
    const roadmapQuery = `*[_type == "roadmap" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      icon,
      description,
      coverImage,
      order,
      estimatedDuration,
      featured
    }`;
    const roadmap = await client.fetch(roadmapQuery, { slug });
    
    if (!roadmap) return { roadmap: null, phases: [] };

    const phasesQuery = `*[_type == "phase" && roadmap._ref == $roadmapId] | order(phaseNumber asc) {
      _id,
      roadmap,
      phaseNumber,
      title,
      slug,
      description,
      order,
      estimatedDuration,
      icon
    }`;
    const phases = await client.fetch(phasesQuery, { roadmapId: roadmap._id });

    return { roadmap, phases };
  } catch (error) {
    console.error(`Error fetching roadmap ${slug}:`, error);
    return { roadmap: null, phases: [] };
  }
}

export async function getResumeData(): Promise<any> {
  const query = `*[_type == "resume"][0] {
    name,
    jobTitle,
    email,
    phone,
    linkedin,
    github,
    summary,
    skills,
    experience,
    projects[]->{
      title,
      description,
      "links": {
        "github": githubLink,
        "live": liveLink
      }
    },
    certifications[]->{
      title,
      issuer,
      date,
      credentialUrl
    },
    education
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching resume data:", error);
    return null;
  }
}
