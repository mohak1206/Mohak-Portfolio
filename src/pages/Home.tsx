import React, { Suspense } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { TechMarquee } from '../components/ui/TechMarquee';
import { Footer } from '../components/layout/Footer';

// Lazy-load below-the-fold home sections so hero paints immediately
const About = React.lazy(() =>
  import('../components/sections/About').then((m) => ({ default: m.About }))
);
const Journey = React.lazy(() =>
  import('../components/sections/Journey').then((m) => ({ default: m.Journey }))
);
const SelectedWorks = React.lazy(() =>
  import('../components/sections/SelectedWorks').then((m) => ({ default: m.SelectedWorks }))
);
const LabIdeas = React.lazy(() =>
  import('../components/sections/LabIdeas').then((m) => ({ default: m.LabIdeas }))
);
const Expertise = React.lazy(() =>
  import('../components/sections/Expertise').then((m) => ({ default: m.Expertise }))
);
const Experience = React.lazy(() =>
  import('../components/sections/Experience').then((m) => ({ default: m.Experience }))
);
const Credentials = React.lazy(() =>
  import('../components/sections/Credentials').then((m) => ({ default: m.Credentials }))
);
const Contact = React.lazy(() =>
  import('../components/sections/Contact').then((m) => ({ default: m.Contact }))
);

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

        <Suspense fallback={<section id="about" className="min-h-[300px]" />}>
          <About />
        </Suspense>

        <Suspense fallback={<section id="journey" className="min-h-[300px]" />}>
          <Journey />
        </Suspense>

        <Suspense fallback={<section id="projects" className="min-h-[400px]" />}>
          <SelectedWorks showAll={false} />
        </Suspense>

        <Suspense fallback={<section id="lab-ideas" className="min-h-[300px]" />}>
          <LabIdeas />
        </Suspense>

        <Suspense fallback={<section id="skills" className="min-h-[300px]" />}>
          <Expertise />
        </Suspense>

        <Suspense fallback={<section id="experience" className="min-h-[400px]" />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<section id="credentials" className="min-h-[300px]" />}>
          <Credentials />
        </Suspense>

        <Suspense fallback={<section id="contact" className="min-h-[300px]" />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
