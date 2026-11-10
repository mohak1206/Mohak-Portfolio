import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';
import { cn } from '../../lib/utils';

interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
  outlineOffset?: boolean;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({
  children,
  className,
  outlineOffset = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('relative w-full h-full', className)}>
      {outlineOffset && (
        <svg
          className="absolute -inset-2.5 sm:-inset-3 w-[calc(100%+20px)] sm:w-[calc(100%+24px)] h-[calc(100%+20px)] sm:h-[calc(100%+24px)] pointer-events-none z-10"
          viewBox="0 0 100 125"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M 1 50 A 49 49 0 0 1 99 50 L 99 121 A 3 3 0 0 1 96 124 L 4 124 A 3 3 0 0 1 1 121 Z"
            fill="none"
            stroke="#C94F17"
            strokeWidth="1.2"
            strokeOpacity="0.5"
            vectorEffect="non-scaling-stroke"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.0,
              delay: prefersReducedMotion ? 0 : 0.35,
              ease: EASING,
            }}
          />
        </svg>
      )}
      <div className="relative w-full h-full overflow-hidden arch-mask shadow-float z-10 bg-cream">
        {children}
      </div>
    </div>
  );
};

export default ArchFrame;
