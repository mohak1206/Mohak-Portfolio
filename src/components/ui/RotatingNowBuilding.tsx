import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';

interface RotatingNowBuildingProps {
  phrases?: string[];
  isHeroInView?: boolean;
}

const DEFAULT_PHRASES = [
  'Civic-I, an AI-assisted civic issue reporting prototype',
  'Healmaps, a hospital resource mapping project',
  'computer-vision models with YOLOv8',
  'full-stack and cross-platform apps',
];

export const RotatingNowBuilding: React.FC<RotatingNowBuildingProps> = ({
  phrases = DEFAULT_PHRASES,
  isHeroInView = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !isHeroInView || phrases.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHeroInView, phrases.length]);

  const currentPhrase = phrases[currentIndex] || phrases[0];

  return (
    <div className="h-6 sm:h-7 flex items-center text-xs sm:text-[13px] font-mono overflow-hidden select-none">
      {/* Screen reader only persistent text */}
      <span className="sr-only">
        Currently building: {phrases[0]}
      </span>

      <div
        aria-hidden="true"
        aria-live="off"
        className="flex items-center gap-2 h-full w-full min-w-0"
      >
        {/* Pulsing small orange dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange shrink-0" />

        <span className="text-charcoal/70 uppercase tracking-wider font-semibold shrink-0">
          Currently building:
        </span>

        {/* Clipped container for vertical slide */}
        <div className="relative h-full flex-1 min-w-0 overflow-hidden flex items-center">
          {prefersReducedMotion ? (
            <span className="truncate text-charcoal font-medium">
              {phrases[0]}
            </span>
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={currentIndex}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.38, ease: EASING }}
                className="absolute inset-0 flex items-center truncate text-charcoal font-medium"
              >
                {currentPhrase}
              </m.span>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default RotatingNowBuilding;

