import React from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionNumeralProps {
  numeral: string;
  sectionRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export const SectionNumeral: React.FC<SectionNumeralProps> = ({
  numeral,
  sectionRef,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Moves up to 40px as section scrolls through viewport
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div
      aria-hidden="true"
      className={`hidden sm:block absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-8 lg:right-14 z-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      <m.span
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="section-numeral block font-serif tracking-tighter"
      >
        {numeral}
      </m.span>
    </div>
  );
};

export default SectionNumeral;

