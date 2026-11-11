import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { setLenis, scrollToTarget } from '../../lib/lenis';

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isFinePointer = useFinePointer();
  const prefersReduced = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    // Only enable on desktop with fine pointer, never on touch devices or under reduced motion
    if (!isFinePointer || prefersReduced) {
      setLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    setLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Keep Framer Motion whileInView & useScroll fully updated
    const handleLenisScroll = () => {
      window.dispatchEvent(new Event('scroll'));
    };
    lenis.on('scroll', handleLenisScroll);

    // Intercept native in-page anchor clicks to route through lenis.scrollTo with sticky-nav offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Matches #section or /#section when on root
      if (href.startsWith('#') && href.length > 1) {
        const id = href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          scrollToTarget(element, -80);
        }
      } else if (href.startsWith('/#') && window.location.pathname === '/') {
        const id = href.slice(2);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          scrollToTarget(element, -80);
        }
      }
    };

    window.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('click', handleAnchorClick, { capture: true });
      lenis.destroy();
      setLenis(null);
    };
  }, [isFinePointer, prefersReduced]);

  // Handle route changes with hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          scrollToTarget(el, -80);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

export default SmoothScrollProvider;

