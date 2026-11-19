import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, m, LazyMotion, domAnimation, MotionConfig, type Variants } from 'framer-motion';
import { Home } from './pages/Home';
import { EASING } from './lib/animation';
import { useReducedMotion } from './hooks/useReducedMotion';
import { DelayedFallback } from './components/ui/DelayedFallback';
import { ProjectsPageSkeleton, ProjectDetailSkeleton } from './components/ui/SectionSkeletons';
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
const CursorRing = React.lazy(() =>
  import('./components/ui/CursorRing').then((module) => ({ default: module.CursorRing }))
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

  const activeVariants: Variants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { opacity: 0, y: 12 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.35,
            ease: EASING,
          },
        },
        exit: {
          opacity: 0,
          y: -8,
          transition: {
            duration: 0.2,
            ease: EASING,
          },
        },
      };

  return (
    <CurtainTransition>
      {(renderedLocation) => (
        <AnimatePresence mode="wait">
          <m.div
            key={renderedLocation.pathname}
            variants={activeVariants}
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
                path="/blogs"
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
                path="/blogs/:slug"
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
      )}
    </CurtainTransition>
  );
};

const AppContent: React.FC = () => {
  const { isReducedMotion } = useMotionPreference();
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showDeferredOverlays, setShowDeferredOverlays] = useState(false);

  useEffect(() => {
    const handleOpenTour = () => setIsTourOpen(true);
    const handleOpenPalette = () => setIsCommandPaletteOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('open-quick-tour', handleOpenTour);
    window.addEventListener('open-command-palette', handleOpenPalette);
    window.addEventListener('keydown', handleKeyDown);

    // Defer non-critical interactive overlays (cursor ring, analytics) until after first paint
    const timer = setTimeout(() => setShowDeferredOverlays(true), 300);

    return () => {
      window.removeEventListener('open-quick-tour', handleOpenTour);
      window.removeEventListener('open-command-palette', handleOpenPalette);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
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
            {showDeferredOverlays && (
              <Suspense fallback={null}>
                <CursorRing />
              </Suspense>
            )}
            <SectionDots />
            <AnimatedRoutes />
            <BackToTop />
            <Suspense fallback={null}>
              {isCommandPaletteOpen && (
                <CommandPaletteModal
                  isOpen={isCommandPaletteOpen}
                  onClose={() => setIsCommandPaletteOpen(false)}
                />
              )}
              {isTourOpen && (
                <QuickTourModal
                  isOpen={isTourOpen}
                  onClose={() => setIsTourOpen(false)}
                />
              )}
              {showDeferredOverlays && <VercelAnalytics />}
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
