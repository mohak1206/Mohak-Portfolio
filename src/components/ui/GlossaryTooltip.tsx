import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const GLOSSARY_DEFINITIONS: Record<string, string> = {
  'Precision': 'of everything the model flagged, how much was correct.',
  'Recall': 'of everything that was really there, how much the model found.',
  'IoU': 'how much a predicted box overlaps the true box.',
  'mAP@50': 'average precision when a detection counts as correct if its IoU is at least 0.5.',
  'mAP@50-95': 'the same, averaged over stricter IoU thresholds from 0.5 to 0.95.',
  'confidence threshold': 'the minimum score a detection needs to be shown.',
  'Confidence threshold': 'the minimum score a detection needs to be shown.',
  'Confidence Threshold': 'the minimum score a detection needs to be shown.',
};

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ term, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  const definition = GLOSSARY_DEFINITIONS[term] || GLOSSARY_DEFINITIONS[term.trim()];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  if (!definition) {
    return <span>{children || term}</span>;
  }

  return (
    <span ref={containerRef} className="relative inline-block align-baseline">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-label={`Definition of ${term}`}
        aria-expanded={isOpen}
        className="underline decoration-dotted decoration-charcoal/40 hover:decoration-burnt-orange hover:text-burnt-orange focus:outline-none focus-visible:ring-1 focus-visible:ring-burnt-orange rounded px-0.5 transition-colors cursor-help inline-flex items-center text-inherit font-inherit"
      >
        {children || term}
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.span
            role="tooltip"
            initial={prefersReduced ? false : { opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 max-w-[85vw] p-2.5 rounded-[6px] bg-card-surface text-charcoal text-xs font-sans font-normal normal-case leading-relaxed shadow-lg border border-warm-border pointer-events-none"
          >
            <span className="block font-semibold font-mono text-[11px] text-burnt-orange mb-1">
              {term}
            </span>
            <span className="text-muted-grey text-[11px] block">{definition}</span>
            {/* Arrow */}
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card-surface border-r border-b border-warm-border"
              aria-hidden="true"
            />
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default GlossaryTooltip;

