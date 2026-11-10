import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, m, LazyMotion, domAnimation, MotionConfig, type Variants } from 'framer-motion';
import { Home } from './pages/Home';
import { EASING } from './lib/animation';
import { useReducedMotion } from './hooks/useReducedMotion';

// Route-level code splitting
const ProjectsPage = React.lazy(() =>
  import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage }))
);
const ProjectDetail = React.lazy(() =>
  import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail }))
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
        <Suspense
          fallback={
            <div className="min-h-screen bg-ivory flex items-center justify-center">
              <span className="w-6 h-6 border-2 border-burnt-orange border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
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
          <AnimatedRoutes />
        </BrowserRouter>
      </LazyMotion>
    </MotionConfig>
  );
};

export default App;
