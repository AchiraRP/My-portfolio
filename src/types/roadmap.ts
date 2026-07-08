export interface SanityRoadmap {
  _id: string;
  title: string;
  slug: { current: string };
  icon?: string;
  description?: string;
  coverImage?: any;
  order?: number;
  estimatedDuration?: string;
  featured?: boolean;
}

export interface SanityPhase {
  _id: string;
  roadmap: { _ref: string };
  phaseNumber: number;
  title: string;
  slug?: { current: string };
  description?: string;
  order?: number;
  estimatedDuration?: string;
  icon?: string;
}

export interface RoadmapWithPhases extends SanityRoadmap {
  phases: SanityPhase[];
}
