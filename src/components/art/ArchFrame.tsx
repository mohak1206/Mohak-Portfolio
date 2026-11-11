import React from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';
import { cn } from '../../lib/utils';

interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
  outlineOffset?: boolean;
  outlineStyle?: any;
  imageStyle?: any;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({
  children,
  className,
  outlineOffset = true,
  outlineStyle,
  imageStyle,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('relative w-full h-full', className)}>
      {outlineOffset && (
        <m.div
          style={outlineStyle}
          className="absolute -inset-2.5 sm:-inset-3 w-[calc(100%+20px)] sm:w-[calc(100%+24px)] h-[calc(100%+20px)] sm:h-[calc(100%+24px)] pointer-events-none z-10"
        >
          <svg
            className="w-full h-full pointer-events-none"
            viewBox="0 0 100 125"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <m.path
              d="M 1 50 A 49 49 0 0 1 99 50 L 99 121 A 3 3 0 0 1 96 124 L 4 124 A 3 3 0 0 1 1 121 Z"
              fill="none"
              stroke="var(--color-accent)"
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
        </m.div>
      )}
      <m.div
        style={imageStyle}
        className="relative w-full h-full overflow-hidden arch-mask shadow-float z-10 bg-cream"
      >
        {children}
      </m.div>
    </div>
  );
};

export default ArchFrame;
