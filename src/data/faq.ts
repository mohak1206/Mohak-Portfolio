export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'freelance-availability',
    question: 'Are you available for freelance work?',
    answer:
      "Yes. I'm open to internships, full-time roles and freelance projects. TODO(Mohak): confirm freelance availability alongside your internship, e.g. weekends or about X hours per week.",
  },
  {
    id: 'project-types',
    question: 'What kind of projects do you take on?',
    answer:
      'Full-stack web apps (React, TypeScript, Flask, MySQL), AI and computer-vision features with YOLOv8, and cross-platform mobile apps with Flutter and Firebase.',
  },
  {
    id: 'getting-started',
    question: 'How do we get started?',
    answer:
      "Send me an email or book a short call. Tell me the goal, who it's for and your deadline, and I'll reply with a simple plan and next steps.",
  },
  {
    id: 'reply-time',
    question: 'How quickly do you reply?',
    answer: 'TODO(Mohak): your real response time.',
  },
  {
    id: 'time-zone',
    question: 'Which time zone do you work in?',
    answer: "I'm based in Maharashtra, India (IST). TODO(Mohak): add overlap hours if you want.",
  },
  {
    id: 'teamwork',
    question: 'Do you work in a team?',
    answer:
      "Yes. I've led college NSS events with 50+ volunteers and worked in a team of 9 on the Civic-I prototype, and I'm comfortable working with Git and GitHub.",
  },
  {
    id: 'tools-used',
    question: 'Which tools do you use?',
    answer:
      'VS Code, Git and GitHub, Postman and Google Colab, plus Roboflow for computer-vision datasets.',
  },
];

