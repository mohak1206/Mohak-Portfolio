import React from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT, DURATION } from '../../lib/animation';

interface SplitLinesProps {
  lines: (React.ReactNode | string)[];
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  lineClassName?: string;
}

export const SplitLines: React.FC<SplitLinesProps> = ({
  lines,
  delay = 0,
  staggerDelay = 0.12,
  duration = DURATION.reveal + 0.05,
  className = '',
  lineClassName = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden">
          <m.span
            className={`block ${lineClassName}`}
            initial={{ y: '108%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{
              duration,
              delay: delay + idx * staggerDelay,
              ease: EASING,
            }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
};

export default SplitLines;
