export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: 'projects' | 'labs';
  isMoreLink?: boolean;
  links?: {
    live?: string;
    github?: string;
    behance?: string;
  };
}
