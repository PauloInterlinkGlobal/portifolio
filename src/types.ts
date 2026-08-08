/**
 * @file types.ts
 * @description Definições de tipos TypeScript para o portfólio 3D de Paulo Bunga.
 */

export type Language = 'pt' | 'en';

export interface Project {
  id: string;
  title: string;
  subtitle: { pt: string; en: string };
  description: { pt: string; en: string };
  longDescription: { pt: string; en: string };
  category: 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'wordpress';
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  metrics?: { pt: string; en: string };
  architectureDiagram?: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: { pt: string; en: string };
  period: string;
  location: string;
  description: { pt: string; en: string };
  highlights: { pt: string[]; en: string[] };
  technologies: string[];
  type: 'fulltime' | 'contract' | 'freelance';
}

export interface TechSkill {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools';
  icon: string;
  level: number; // 0 to 100
  color: string;
  experienceYears: number;
}

export interface ServiceItem {
  id: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  icon: string;
  features: { pt: string[]; en: string[] };
  techList: string[];
}

export interface CertificateItem {
  id: string;
  title: { pt: string; en: string };
  institution: string;
  period: string;
  type: 'education' | 'course' | 'certification';
  details?: { pt: string; en: string };
  badgeColor: string;
}

export interface AchievementItem {
  id: string;
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  metric: string;
  metricLabel: { pt: string; en: string };
  icon: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updatedAt: string;
}

export type Theme3DMode = 'cyber-cyan' | 'matrix-green' | 'neon-purple' | 'deep-void';
