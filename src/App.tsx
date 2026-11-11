import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, m, LazyMotion, domAnimation, MotionConfig, type Variants } from 'framer-motion';
import { Home } from './pages/Home';
import { EASING } from './lib/animation';
import { useReducedMotion } from './hooks/useReducedMotion';
import { DelayedFallback } from './components/ui/DelayedFallback';
import { ProjectsPageSkeleton, ProjectDetailSkeleton } from './components/ui/SectionSkeletons';
import { CursorRing } from './components/ui/CursorRing';
import { SectionDots } from './components/ui/SectionDots';

// Route-level and feature code splitting
const ProjectsPage = React.lazy(() =>
  import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage }))
);
const ProjectDetail = React.lazy(() =>
  import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail }))
);
const CommandPaletteModal = React.lazy(() =>
  import('./components/ui/CommandPalette').then((module) => ({ default: module.CommandPaletteModal }))
);

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const pageVariants: Variants = {
    initial: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 16,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASING },
    },
    exit: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : -8,
      transition: { duration: 0.2, ease: EASING },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects"
            element={
              <Suspense
                fallback={
                  <DelayedFallback delay={150}>
                    <ProjectsPageSkeleton />
                  </DelayedFallback>
                }
              >
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <Suspense
                fallback={
                  <DelayedFallback delay={150}>
                    <ProjectDetailSkeleton />
                  </DelayedFallback>
                }
              >
                <ProjectDetail />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </m.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <ScrollToTop />
          <CursorRing />
          <SectionDots />
          <AnimatedRoutes />
          <Suspense fallback={null}>
            <CommandPaletteModal />
          </Suspense>
        </BrowserRouter>
      </LazyMotion>
    </MotionConfig>
  );
};

export default App;
