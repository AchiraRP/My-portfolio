import { client } from '../lib/sanity';
import type { PortfolioItem } from '../types';
import type { Post, CertItem, BadgeItem } from '../constants/portfolio';

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
