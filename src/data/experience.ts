import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: "rigai-tech",
    role: "Software Intern",
    organization: "RigAI Tech Pvt. Ltd.",
    department: "AI Platforms Engineering",
    period: "Nov 2026 – Present",
    isCurrent: true,
    description: "Working on real-world AI products and technology.",
    // TODO(Mohak): add approved responsibilities after joining in the data file as a comment only (not visible).
  },
  {
    id: "vision-tech-internship",
    role: "Vision Technology Internship (UC17)",
    organization: "Vision Technology Program",
    period: "Internship Project",
    isCurrent: false,
    description: "Built the Fire & Smoke Detection computer-vision project using YOLOv8 for early hazard identification.",
    projectLink: {
      text: "View Fire & Smoke Detection Project",
      slug: "fire-smoke-detection",
    },
  },
  {
    id: "nss-head",
    role: "NSS Head and College Student Representative",
    organization: "St. John College of Engineering and Management",
    period: "Academic Year 2026 – 2027",
    isCurrent: false,
    description: "Led the college NSS unit and organised 10+ events, most with 50+ volunteers across community impact, blood donation drives, and literacy campaigns.",
  },
  {
    id: "btech-aiml",
    role: "B.Tech in Artificial Intelligence & Machine Learning",
    organization: "St. John College of Engineering and Management",
    period: "2024 – 2028 (Expected)",
    isCurrent: false,
    description: "Pursuing specialized undergraduate degree in AI & Machine Learning. Maintaining an 8.6 / 10 CGPA through Semester 5 with rigorous coursework across systems and algorithms.",
  },
];

