import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Hero } from '../components/hero/Hero';
import { About } from '../components/about/About';
import { Expertise } from '../components/skills/Expertise';
import { ProjectsSection } from '../components/projects/Projects';
import { Experience } from '../components/experience/Experience';
import { Credentials } from '../components/credentials/Credentials';
import { Contact } from '../components/contact/Contact';
import { Footer } from '../components/common/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col selection:bg-burnt-orange selection:text-white">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-burnt-orange text-white rounded font-mono text-xs"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <ProjectsSection showAll={false} />
        <Expertise />
        <Experience />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};
