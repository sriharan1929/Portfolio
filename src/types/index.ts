export interface Profile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  about_paragraphs: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  stack: string[];
  features: string[];
  period: string;
  github: string;
  featured: boolean;
  sort_order: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  sort_order: number;
}

export interface Education {
  id: string;
  degree: string;
  place: string;
  year: string;
  score: string;
  sort_order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  project_name: string;
  period: string;
  points: string[];
  tags: string[];
  sort_order: number;
}
