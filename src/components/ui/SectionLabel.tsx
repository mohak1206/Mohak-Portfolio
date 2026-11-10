import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

interface SectionLabelProps {
  label: string;
  centered?: boolean;
  twoSided?: boolean;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  centered = false,
  twoSided = false,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-charcoal/80 font-medium',
        centered && 'justify-center',
        className
      )}
    >
      <motion.span
        className="w-5 h-[1.5px] bg-burnt-orange inline-block origin-left"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={DEFAULT_VIEWPORT}
        transition={{ duration: 0.5, ease: EASING }}
        aria-hidden="true"
      />
      <motion.span
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={DEFAULT_VIEWPORT}
        transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.25, ease: EASING }}
      >
        {label}
      </motion.span>
      {twoSided && (
        <motion.span
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
