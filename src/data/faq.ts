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
      "Yes, I'm open to internships, full-time roles and freelance projects. Alongside my internship, I can dedicate about 12 hours per week to freelance work, and I aim to complete projects as quickly as possible.",
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
    answer: 'I usually reply within a few hours, and always within 24 hours at the most.',
  },
  {
    id: 'time-zone',
    question: 'Which time zone do you work in?',
    answer:
      "I'm based in Maharashtra, India (IST). I don't need fixed overlap hours. I'm flexible and can work at whatever time suits the client.",
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

