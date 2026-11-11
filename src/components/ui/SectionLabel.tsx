import React, { useState, useEffect, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

interface SectionLabelProps {
  label: string;
  centered?: boolean;
  twoSided?: boolean;
  className?: string;
}

const DECODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_';
const DECODE_DURATION_MS = 600;

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  centered = false,
  twoSided = false,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [displayText, setDisplayText] = useState(label);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplayText(label);
      return;
    }

    let startTime: number | null = null;
    const len = label.length;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / DECODE_DURATION_MS);

      // Characters up to resolvedIndex show the real letter
      const resolvedIndex = Math.floor(progress * len);

      let current = '';
      for (let i = 0; i < len; i++) {
        if (label[i] === ' ' || label[i] === '—' || label[i] === '-') {
          current += label[i];
        } else if (i < resolvedIndex) {
          current += label[i];
        } else {
          // Pick a pseudo-random character from DECODE_CHARS
          const randChar = DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
          current += randChar;
        }
      }

      setDisplayText(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(label);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInView, label, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-charcoal/80 font-medium select-none',
        centered && 'justify-center',
        className
      )}
    >
      <m.span
        className="w-5 h-[1.5px] bg-burnt-orange inline-block origin-left"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={DEFAULT_VIEWPORT}
        transition={{ duration: 0.5, ease: EASING }}
        aria-hidden="true"
      />
      <m.span
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={DEFAULT_VIEWPORT}
        transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.25, ease: EASING }}
      >
        {displayText}
      </m.span>
      {twoSided && (
        <m.span
          className="w-5 h-[1.5px] bg-burnt-orange inline-block origin-right"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={DEFAULT_VIEWPORT}
          transition={{ duration: 0.5, ease: EASING }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default SectionLabel;
