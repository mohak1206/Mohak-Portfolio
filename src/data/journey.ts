export interface JourneyStep {
  number: string;
  label: string;
  subtitle: string;
  tag: string;
  body: string;
}

export interface JourneyData {
  heading: {
    label: string;
    titleRegular: string;
    titleItalic: string;
  };
  intro: string;
  steps: JourneyStep[];
  closing: string;
  quote: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
}

export const journeyData: JourneyData = {
  heading: {
    label: "MY JOURNEY",
    titleRegular: "From Curiosity to ",
    titleItalic: "Creation.",
  },
  intro:
    "I chose AI & Machine Learning because I’ve always been fascinated by how machines learn, think and solve real-world problems. What started as curiosity gradually turned into a passion for building technology that makes a difference.",
  steps: [
    {
      number: "01",
      label: "THE CURIOSITY",
      subtitle: "Python & First Experiments",
      tag: "Discover",
      body: "My coding journey started with Python and small experiments. As I explored programming, I became interested in building complete applications rather than just writing code. That’s when I started turning my ideas into practical projects.",
    },
    {
      number: "02",
      label: "THE REALITY CHECK",
      subtitle: "Learning from Setbacks",
      tag: "Improve",
      body: "My first-year academic performance wasn’t what I had hoped for. Instead of letting it discourage me, I took it as a wake-up call. I changed my approach, focused on consistency and started learning beyond textbooks. It taught me that setbacks don’t define potential; how you respond to them does.",
    },
    {
      number: "03",
      label: "THE BUILDER",
      subtitle: "Building Real Products",
      tag: "Create",
      body: "Today, as an AIML undergraduate, I build full-stack applications, cross-platform solutions and computer vision models. I actively explore Generative AI, LLMs and emerging technologies while participating in projects, hackathons and collaborative initiatives.",
    },
  ],
  closing:
    "I’m continuously learning, experimenting and looking for opportunities to contribute, collaborate and build meaningful solutions.",
  quote: {
    prefix: "“My first-year results taught me where I stood. My projects taught me ",
    highlight: "where I could go.",
    suffix: "”",
  },
};
