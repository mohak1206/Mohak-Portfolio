import React, { useState, useEffect } from 'react';
import { m, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';

// Radius = 18, circumference = 2 * PI * 18 = 113.1
const CIRCLE_CIRCUMFERENCE = 113.1;

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 600);
  });

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [CIRCLE_CIRCUMFERENCE, 0]
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: EASING }}
          style={{
            marginBottom: 'max(0px, env(safe-area-inset-bottom))',
            marginRight: 'max(0px, env(safe-area-inset-right))',
          }}
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-11 h-11 rounded-full bg-card-surface border border-warm-border hover:border-burnt-orange text-charcoal hover:text-burnt-orange shadow-lg flex items-center justify-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange active:scale-95 transition-colors"
        >
          {/* SVG Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            {/* Background track circle */}
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1.5"
              opacity="0.35"
            />
            {/* Animated progress circle */}
            <m.circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              style={{ strokeDashoffset: prefersReducedMotion ? 0 : strokeDashoffset }}
            />
          </svg>

          <ArrowUp className="w-4 h-4 stroke-[2.2] relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </m.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;

