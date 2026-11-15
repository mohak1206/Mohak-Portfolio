// src/data/credentials.ts
// Images live in /public/certificates/ (full size + "-thumb" version, both .webp).
export type CredentialType = "course" | "job-simulation" | "badge" | "participation";
export type CredentialTier = "featured" | "standard" | "activity";
export type CredentialCategory = "AI & LLM" | "Data" | "Security" | "Activities";

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  category: CredentialCategory;
  tier: CredentialTier;
  type: CredentialType;
  date?: string;         // "YYYY-MM-DD", or "YYYY-MM" when only the month is known; omit if the certificate shows no date
  summary: string;       // only facts printed on the certificate
  image: string;
  thumb: string;
  verifyUrl?: string;    // add only real, public verification links
  extra?: string;        // small mono line, e.g. "90 hours · Score 86.36"
  badge?: string;        // optional small badge image
}

export const credentials: Credential[] = [
  {
    id: "generative-ai-llm-application",
    title: "Generative AI With LLM Application (with project work)",
    issuer: "St. John College of Engineering and Management, with Blessed IT Solution and MillionMinds",
    category: "AI & LLM", tier: "featured", type: "course", date: "2025-11-21",
    summary: "A 90-hour course on building applications with large language models, completed with project work.",
    extra: "90 hours · Score 86.36",
    image: "/certificates/generative-ai-llm-application.webp", thumb: "/certificates/generative-ai-llm-application-thumb.webp",
  },
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    issuer: "Google, through Coursera",
    category: "AI & LLM", tier: "featured", type: "course", date: "2025-09-23",
    summary: "Online non-credit course authorized by Google and offered through Coursera.",
    verifyUrl: "https://coursera.org/verify/0TOY4QR1RUKE",
    image: "/certificates/google-ai-essentials.webp", thumb: "/certificates/google-ai-essentials-thumb.webp",
  },
  {
    id: "llm-for-young-developers",
    title: "LLM for Young Developers: Foundational Course",
    issuer: "INDIAai and Meta, with nasscom FutureSkills Prime",
    category: "AI & LLM", tier: "featured", type: "course", date: "2026-02-12",
    summary: "Certificate of participation for completing the foundational course on large language models.",
    image: "/certificates/llm-for-young-developers.webp", thumb: "/certificates/llm-for-young-developers-thumb.webp",
  },
  {
    id: "ai-skills-passport",
    title: "AI Skills Passport",
    issuer: "EY and Microsoft",
    category: "AI & LLM", tier: "featured", type: "course", // the certificate shows no date; add one only if you know it
    summary: "Completed both the general and employability sections, plus at least one employability section.",
    image: "/certificates/ai-skills-passport.webp", thumb: "/certificates/ai-skills-passport-thumb.webp",
  },
  {
    id: "ibm-data-fundamentals",
    title: "Data Fundamentals",
    issuer: "IBM SkillsBuild",
    category: "Data", tier: "standard", type: "badge", date: "2025-09-08",
    summary: "IBM SkillsBuild credential for satisfying the requirements of the Data Fundamentals course.",
    verifyUrl: "https://www.credly.com/badges/366f45aa-2776-441a-abba-0fef297b0b39",
    image: "/certificates/ibm-data-fundamentals.webp", thumb: "/certificates/ibm-data-fundamentals-thumb.webp",
  },
  {
    id: "cisco-intro-data-science",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    category: "Data", tier: "standard", type: "course", date: "2025-12-07",
    summary: "Student-level credential: promises and challenges of data analytics, the role of data in AI and Machine Learning, and career options in data analytics.",
    badge: "/certificates/cisco-data-science-badge-thumb.webp",
    image: "/certificates/cisco-intro-data-science.webp", thumb: "/certificates/cisco-intro-data-science-thumb.webp",
  },
  {
    id: "deloitte-data-analytics-simulation",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte, via Forage",
    category: "Data", tier: "standard", type: "job-simulation", date: "2025-12-06",
    summary: "Virtual job simulation: practical tasks in data analysis and forensic technology.",
    image: "/certificates/deloitte-data-analytics-simulation.webp", thumb: "/certificates/deloitte-data-analytics-simulation-thumb.webp",
  },
  {
    id: "tata-data-visualisation",
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata, via Forage",
    category: "Data", tier: "standard", type: "job-simulation", date: "2025-12-06",
    summary: "Virtual job simulation: framing the business scenario, choosing the right visuals, creating effective visuals and communicating insights.",
    image: "/certificates/tata-data-visualisation.webp", thumb: "/certificates/tata-data-visualisation-thumb.webp",
  },
  {
    id: "cisco-intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    category: "Security", tier: "standard", type: "course", date: "2025-12-14",
    summary: "Student-level credential: staying safe online, common threats and attacks, and how organisations protect their operations.",
    image: "/certificates/cisco-intro-cybersecurity.webp", thumb: "/certificates/cisco-intro-cybersecurity-thumb.webp",
  },
  {
    id: "har-ghar-tiranga-2025",
    title: "Har Ghar Tiranga Campaign 2025: Certificate of Appreciation",
    issuer: "Ministry of Culture, Government of India",
    category: "Activities", tier: "activity", type: "participation", date: "2025-08",
    summary: "Certificate of appreciation for successfully participating in the Har Ghar Tiranga Campaign, 2025.",
    image: "/certificates/har-ghar-tiranga-2025.webp", thumb: "/certificates/har-ghar-tiranga-2025-thumb.webp",
  },
  {
    id: "competition-colourful-creation-2024",
    title: "Colourful Creation competition (participation)",
    issuer: "St. John College of Engineering and Management",
    category: "Activities", tier: "activity", type: "participation", date: "2024-08-13",
    summary: "Certificate of participation.",
    image: "/certificates/competition-colourful-creation-2024.webp", thumb: "/certificates/competition-colourful-creation-2024-thumb.webp",
  },
  {
    id: "competition-reel-it-feel-it-2024",
    title: "Reel it Feel it competition (participation)",
    issuer: "St. John College of Engineering and Management",
    category: "Activities", tier: "activity", type: "participation", date: "2024-08-13",
    summary: "Certificate of participation.",
    image: "/certificates/competition-reel-it-feel-it-2024.webp", thumb: "/certificates/competition-reel-it-feel-it-2024-thumb.webp",
  },
];

export const credentialsData = credentials;

