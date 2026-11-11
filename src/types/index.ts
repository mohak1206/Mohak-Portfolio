export interface Metric {
  label: string;
  value: string;
  numericValue?: number;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  category: string;
  categories: string[];
  highlight?: string;
  status: 'Completed' | 'In progress' | 'Concept' | 'Early prototype';
  badge?: string;
  tags: string[];
  githubUrl?: string;
  image?: string;
  problem: string;
  solution: string;
  context?: string;
  features?: string[];
  dataset?: string;
  training?: string;
  metrics?: Metric[];
  limitations?: string;
  accuracyNote?: string;
  stack: string[];
  contribution: string;
  challengesAndLearnings: string;
  isFeatured: boolean;
  order: number;
}

export interface LabIdea {
  title: string;
  badge: 'Concept' | 'Early prototype' | 'Completed';
  description: string;
  stack?: string[];
  githubUrl?: string;
  secondaryGithubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department?: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  projectLink?: {
    text: string;
    slug: string;
  };
  // TODO(Mohak): add approved responsibilities after joining in the data file as a comment only (not visible).
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  type: 'Certification' | 'Leadership';
  description?: string;
  period?: string;
  image?: string;
  verificationUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  monogram: string;
  roleTitle: string;
  tagline: string;
  heroHeadline: {
    line1: string;
    line2Regular: string;
    line2Italic: string;
  };
  heroSubheadline: string;
  heroBio: string;
  nowBuilding?: string[];
  location: string;
  currentStatus: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  stats: {
    projectsCount: string;
    projectsLabel: string;
    internshipsCount: string;
    internshipsLabel: string;
    eventsCount: string;
    eventsLabel: string;
    cgpaScore: string;
    cgpaLabel: string;
  };
  aboutIntro: string;
  education: {
    degree: string;
    institution: string;
    expectedGraduation: string;
    cgpa: string;
    openTo: string[];
    coursework: string[];
  };
}

