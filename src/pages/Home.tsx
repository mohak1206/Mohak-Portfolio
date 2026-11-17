import React, { Suspense } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/sections/Hero';
import { TechMarquee } from '../components/ui/TechMarquee';
import { Footer } from '../components/layout/Footer';
import { InViewSection } from '../components/ui/InViewSection';
import { DelayedFallback } from '../components/ui/DelayedFallback';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  AboutSkeleton,
  JourneySkeleton,
  SelectedWorksSkeleton,
  LabIdeasSkeleton,
  ExpertiseSkeleton,
  ExperienceSkeleton,
  CredentialsSkeleton,
  ContactSkeleton,
} from '../components/ui/SectionSkeletons';

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
const FromNotes = React.lazy(() =>
  import('../components/sections/FromNotes').then((m) => ({ default: m.FromNotes }))
);
const Services = React.lazy(() =>
  import('../components/sections/Services').then((m) => ({ default: m.Services }))
);
const FAQ = React.lazy(() =>
  import('../components/sections/FAQ').then((m) => ({ default: m.FAQ }))
);
const Contact = React.lazy(() =>
  import('../components/sections/Contact').then((m) => ({ default: m.Contact }))
);

export const Home: React.FC = () => {
  usePageMeta({
    title: 'Mohak Agrawal — AI/ML & Full-Stack Developer',
    description:
      'Mohak Agrawal: AI/ML & Full-Stack Developer. Computer vision with YOLOv8, React, Flask and Flutter projects.',
    path: '/',
  });

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col selection:bg-burnt-orange selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-burnt-orange text-[var(--on-accent)] rounded font-mono text-xs"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-grow">
        <Hero />
        <TechMarquee />

        <InViewSection id="about" fallback={<AboutSkeleton />}>
          <Suspense fallback={<AboutSkeleton />}>
            <About />
          </Suspense>
        </InViewSection>

        <InViewSection id="journey" fallback={<JourneySkeleton />}>
          <Suspense fallback={<JourneySkeleton />}>
            <Journey />
          </Suspense>
        </InViewSection>

        <InViewSection id="projects" fallback={<SelectedWorksSkeleton showAll={false} />}>
          <Suspense fallback={<SelectedWorksSkeleton showAll={false} />}>
            <SelectedWorks showAll={false} />
          </Suspense>
        </InViewSection>

        <InViewSection id="lab-ideas" fallback={<LabIdeasSkeleton />}>
          <Suspense fallback={<LabIdeasSkeleton />}>
            <LabIdeas />
          </Suspense>
        </InViewSection>

        <InViewSection id="expertise" fallback={<ExpertiseSkeleton />}>
          <Suspense fallback={<ExpertiseSkeleton />}>
            <Expertise />
          </Suspense>
        </InViewSection>

        <InViewSection id="experience" fallback={<ExperienceSkeleton />}>
          <Suspense fallback={<ExperienceSkeleton />}>
            <Experience />
          </Suspense>
        </InViewSection>

        <InViewSection id="credentials" fallback={<CredentialsSkeleton />}>
          <Suspense fallback={<CredentialsSkeleton />}>
            <Credentials />
          </Suspense>
        </InViewSection>

        <InViewSection id="blogs" fallback={<div className="h-48" />}>
          <Suspense fallback={null}>
            <FromNotes />
          </Suspense>
        </InViewSection>

        <InViewSection id="services" fallback={<div className="h-48" />}>
          <Suspense fallback={null}>
            <Services />
          </Suspense>
        </InViewSection>

        <InViewSection id="faq" fallback={<div className="h-48" />}>
          <Suspense fallback={null}>
            <FAQ />
          </Suspense>
        </InViewSection>

        <InViewSection id="contact" fallback={<ContactSkeleton />}>
          <Suspense fallback={<ContactSkeleton />}>
            <Contact />
          </Suspense>
        </InViewSection>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
