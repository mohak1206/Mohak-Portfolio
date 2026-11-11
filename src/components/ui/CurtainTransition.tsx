import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CurtainTransitionProps {
  children: (renderedLocation: ReturnType<typeof useLocation>) => React.ReactNode;
}

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export const CurtainTransition: React.FC<CurtainTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const isFirstMount = useRef(true);
  const prevPathname = useRef(location.pathname);

  // The location actually rendered behind or on the page
  const [renderedLocation, setRenderedLocation] = useState(location);
  const [phase, setPhase] = useState<'idle' | 'covering' | 'covered' | 'revealing'>('idle');
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    // Skip very first page load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPathname.current = location.pathname;
      return;
    }

    // Ignore hash changes on same route
    if (location.pathname === prevPathname.current) {
      return;
    }

    prevPathname.current = location.pathname;
    clearTimers();

    if (prefersReduced) {
      // Reduced motion: instantaneous / simple 150ms crossfade, no curtain panel
      window.scrollTo(0, 0);
      setRenderedLocation(location);

      const headingTimer = window.setTimeout(() => {
        const heading = document.querySelector('h1');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus();
        }
        setLiveAnnouncement(`Navigated to ${document.title || 'page'}`);
      }, 150);

      timersRef.current.push(headingTimer);
      return;
    }

    // Phase 1: Panel slides up to cover the screen (350ms)
    setPhase('covering');

    // At 350ms: Fully covered
    const tCovered = window.setTimeout(() => {
      setPhase('covered');
      window.scrollTo(0, 0);
      setRenderedLocation(location);

      // Brief hold for logo (250ms)
      const tRevealing = window.setTimeout(() => {
        setPhase('revealing');

        // At 350ms after revealing starts: Fully revealed
        const tIdle = window.setTimeout(() => {
          setPhase('idle');

          // Move focus to main heading and announce to screen readers
          const heading = document.querySelector('h1');
          if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus();
          }
          setLiveAnnouncement(`Navigated to ${document.title || 'page'}`);
        }, 350);

        timersRef.current.push(tIdle);
      }, 250);

      timersRef.current.push(tRevealing);
    }, 350);

    timersRef.current.push(tCovered);
  }, [location, prefersReduced]);

  const isPanelActive = phase !== 'idle';
  const showLogo = phase === 'covered';

  return (
    <>
      {/* Screen Reader Navigation Live Region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* Route Content Container */}
      <div className="w-full">
        {children(renderedLocation)}
      </div>

      {/* Full-screen Burnt-Orange Curtain Panel */}
      {!prefersReduced && (
        <div
          aria-hidden={!isPanelActive}
          className={`fixed inset-0 z-[90] flex items-center justify-center transition-transform duration-350 select-none ${
            isPanelActive ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            backgroundColor: '#C94F17',
            transform:
              phase === 'covering'
                ? 'translateY(0%)'
                : phase === 'covered'
                ? 'translateY(0%)'
                : phase === 'revealing'
                ? 'translateY(-100%)'
                : 'translateY(100%)',
            transitionProperty: phase === 'idle' ? 'none' : 'transform',
            transitionDuration: '350ms',
            transitionTimingFunction: `cubic-bezier(${CURTAIN_EASE.join(',')})`,
          }}
        >
          {/* Centered Ivory MA Logo */}
          <div
            className={`transition-all duration-250 transform ${
              showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Logo className="h-14 sm:h-16 w-auto text-ivory" />
          </div>
        </div>
      )}
    </>
  );
};

export default CurtainTransition;
