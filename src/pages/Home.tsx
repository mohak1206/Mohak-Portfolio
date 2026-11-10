import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { TechMarquee } from '../components/ui/TechMarquee';
import { About } from '../components/sections/About';
import { Journey } from '../components/sections/Journey';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { LabIdeas } from '../components/sections/LabIdeas';
import { Expertise } from '../components/sections/Expertise';
import { Experience } from '../components/sections/Experience';
import { Credentials } from '../components/sections/Credentials';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col selection:bg-burnt-orange selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-burnt-orange text-white rounded font-mono text-xs"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-grow">
        <Hero />
        <TechMarquee />
        <About />
        <Journey />
        <SelectedWorks showAll={false} />
        <LabIdeas />
        <Expertise />
        <Experience />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

