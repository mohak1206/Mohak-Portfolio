export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  goodFor: string;
  stack: string[];
  icon: 'Layers' | 'Eye' | 'Smartphone';
  examples: { title: string; href: string }[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  confirmedProcess: boolean; // hide "How we work" row until confirmed is true
  availabilityNote: string; // hidden if contains "TODO" or empty
  services: ServiceItem[];
  processSteps: ProcessStep[];
}

export const servicesData: ServicesConfig = {
  confirmedProcess: true,
  availabilityNote: "Currently accepting selective freelance projects & engineering consultations.",
  services: [
    {
      id: 'full-stack-web',
      title: 'Full-stack web applications',
      description:
        'Dashboards, admin tools and data-driven apps with real-time updates.',
      goodFor: 'inventory and admin systems, internal tools',
      stack: ['React', 'TypeScript', 'Flask', 'MySQL', 'REST APIs'],
      icon: 'Layers',
      examples: [
        {
          title: 'Inventory Management System',
          href: '/projects/inventory-management',
        },
      ],
    },
    {
      id: 'ai-computer-vision',
      title: 'AI and computer-vision features',
      description:
        'Object-detection models from dataset preparation to training, evaluation and integration.',
      goodFor: 'document and signature detection, safety monitoring',
      stack: ['Python', 'YOLOv8', 'PyTorch', 'OpenCV', 'Roboflow'],
      icon: 'Eye',
      examples: [
        {
          title: 'Signature Detection',
          href: '/projects/signature-detection',
        },
        {
          title: 'Fire & Smoke Detection',
          href: '/projects/fire-smoke-detection',
        },
      ],
    },
    {
      id: 'cross-platform-mobile',
      title: 'Cross-platform mobile apps',
      description:
        'One codebase for Android, iOS, Web and Windows with a Firebase backend.',
      goodFor: 'community, directory and notice-board apps',
      stack: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Storage'],
      icon: 'Smartphone',
      examples: [
        {
          title: 'Alumni Connect',
          href: '/projects/alumni-connect',
        },
      ],
    },
  ],
  processSteps: [
    {
      step: '01',
      title: 'Talk',
      description: 'We discuss your goal, users and deadline.',
    },
    {
      step: '02',
      title: 'Plan',
      description: 'I propose a scope, a stack and a simple timeline.',
    },
    {
      step: '03',
      title: 'Build',
      description: 'I build in small steps and show progress regularly.',
    },
    {
      step: '04',
      title: 'Deliver',
      description: 'You get the code, documentation and support for questions.',
    },
  ],
};

