import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, m, LazyMotion, domAnimation, MotionConfig, type Variants } from 'framer-motion';
import { Home } from './pages/Home';
import { EASING } from './lib/animation';
import { useReducedMotion } from './hooks/useReducedMotion';
import { DelayedFallback } from './components/ui/DelayedFallback';
import { ProjectsPageSkeleton, ProjectDetailSkeleton } from './components/ui/SectionSkeletons';
import { CursorRing } from './components/ui/CursorRing';
import { SectionDots } from './components/ui/SectionDots';
import { BackToTop } from './components/ui/BackToTop';
import { ThemeProvider } from './context/ThemeContext';
import { MotionProvider, useMotionPreference } from './context/MotionContext';
import { SmoothScrollProvider } from './components/providers/SmoothScrollProvider';
import { CurtainTransition } from './components/ui/CurtainTransition';

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
const QuickTourModal = React.lazy(() =>
  import('./components/ui/QuickTourModal').then((module) => ({ default: module.QuickTourModal }))
);
const ResumePage = React.lazy(() =>
  import('./pages/ResumePage').then((module) => ({ default: module.ResumePage }))
);
const NotesPage = React.lazy(() =>
  import('./pages/NotesPage').then((module) => ({ default: module.NotesPage }))
);
const NoteDetailPage = React.lazy(() =>
  import('./pages/NoteDetailPage').then((module) => ({ default: module.NoteDetailPage }))
);
const NotFoundPage = React.lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);
const VercelAnalytics = React.lazy(() =>
  import('./components/analytics/VercelAnalytics').then((module) => ({ default: module.VercelAnalytics }))
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
  const prefersReducedMotion = useReducedMotion();

  const reducedMotionVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <CurtainTransition>
      {(renderedLocation) =>
        prefersReducedMotion ? (
          <AnimatePresence mode="wait">
            <m.div
              key={renderedLocation.pathname}
              variants={reducedMotionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Routes location={renderedLocation} key={renderedLocation.pathname}>
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
                <Route
                  path="/resume"
                  element={
                    <Suspense
                      fallback={
                        <DelayedFallback delay={150}>
                          <ProjectsPageSkeleton />
                        </DelayedFallback>
                      }
                    >
                      <ResumePage />
                    </Suspense>
                  }
                />
                <Route
                  path="/notes"
                  element={
                    <Suspense
                      fallback={
                        <DelayedFallback delay={150}>
                          <ProjectsPageSkeleton />
                        </DelayedFallback>
                      }
                    >
                      <NotesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/notes/:slug"
                  element={
                    <Suspense
                      fallback={
                        <DelayedFallback delay={150}>
                          <ProjectDetailSkeleton />
                        </DelayedFallback>
                      }
                    >
                      <NoteDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense
                      fallback={
                        <DelayedFallback delay={150}>
                          <ProjectsPageSkeleton />
                        </DelayedFallback>
                      }
                    >
                      <NotFoundPage />
                    </Suspense>
                  }
                />
              </Routes>
            </m.div>
          </AnimatePresence>
        ) : (
          <Routes location={renderedLocation} key={renderedLocation.pathname}>
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
            <Route
              path="/resume"
              element={
                <Suspense
                  fallback={
                    <DelayedFallback delay={150}>
                      <ProjectsPageSkeleton />
                    </DelayedFallback>
                  }
                >
                  <ResumePage />
                </Suspense>
              }
            />
            <Route
              path="/notes"
              element={
                <Suspense
                  fallback={
                    <DelayedFallback delay={150}>
                      <ProjectsPageSkeleton />
                    </DelayedFallback>
                  }
                >
                  <NotesPage />
                </Suspense>
              }
            />
            <Route
              path="/notes/:slug"
              element={
                <Suspense
                  fallback={
                    <DelayedFallback delay={150}>
                      <ProjectDetailSkeleton />
                    </DelayedFallback>
                  }
                >
                  <NoteDetailPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <DelayedFallback delay={150}>
                      <ProjectsPageSkeleton />
                    </DelayedFallback>
                  }
                >
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Routes>
        )
      }
    </CurtainTransition>
  );
};

const AppContent: React.FC = () => {
  const { isReducedMotion } = useMotionPreference();
  const [isTourOpen, setIsTourOpen] = useState(false);

  useEffect(() => {
    const handleOpenTour = () => setIsTourOpen(true);
    window.addEventListener('open-quick-tour', handleOpenTour);
    return () => window.removeEventListener('open-quick-tour', handleOpenTour);
  }, []);

  // Tab Title Fun: when visitor switches tabs, display playful title, restore on return
  useEffect(() => {
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Come back! Mohak Agrawal';
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);

  return (
    <MotionConfig reducedMotion={isReducedMotion ? 'always' : 'user'}>
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <SmoothScrollProvider>
            <ScrollToTop />
            <CursorRing />
            <SectionDots />
            <AnimatedRoutes />
            <BackToTop />
            <Suspense fallback={null}>
              <CommandPaletteModal />
              <QuickTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
              <VercelAnalytics />
            </Suspense>
          </SmoothScrollProvider>
        </BrowserRouter>
      </LazyMotion>
    </MotionConfig>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MotionProvider>
        <AppContent />
      </MotionProvider>
    </ThemeProvider>
  );
};

export default App;
