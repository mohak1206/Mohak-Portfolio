import React from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';
import { cn } from '../../lib/utils';

interface ContourLinesProps {
  className?: string;
  style?: React.CSSProperties | any;
}

export const ContourLines: React.FC<ContourLinesProps> = ({ className, style }) => {
  const prefersReducedMotion = useReducedMotion();

  // Decorative SVG contour lines animate after hero text
  const pathTransition = (delay = 0) => ({
    duration: 1.6,
    delay: prefersReducedMotion ? 0 : 0.5 + delay,
    ease: EASING,
  });

  return (
    <m.div
      aria-hidden="true"
      style={style}
      className={cn('pointer-events-none select-none absolute inset-0 overflow-hidden', className)}
    >
      <m.svg
        viewBox="0 0 1200 900"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#C94F17"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: prefersReducedMotion ? 0 : 0.5, ease: EASING }}
      >
        <g opacity="0.14" strokeWidth="1">
          <m.path
            d="M600,100 C720,110 880,180 960,300 C1040,420 1100,600 1180,850"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.05)}
          />
          <m.path
            d="M520,160 C660,180 820,260 900,390 C980,520 1020,700 1100,900"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.12)}
          />
          <m.path
            d="M450,230 C600,260 760,340 840,480 C920,620 960,780 1040,940"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.18)}
          />
          <m.path
            d="M380,310 C540,340 700,430 780,580 C860,730 890,860 960,980"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.24)}
          />
          <m.path
            d="M320,400 C480,440 640,540 710,690 C780,840 810,950 880,1050"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.3)}
          />

          <m.path
            d="M-100,550 C120,530 300,570 480,680 C660,790 740,880 820,1000"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.15)}
          />
          <m.path
            d="M-80,630 C150,600 340,650 510,760 C680,870 760,950 840,1060"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.22)}
          />
          <m.path
            d="M-60,710 C180,680 380,730 550,840 C720,950 800,1020 870,1120"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.28)}
          />

          <m.ellipse
            cx="880"
            cy="380"
            rx="220"
            ry="160"
            transform="rotate(-15 880 380)"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.2)}
          />
          <m.ellipse
            cx="890"
            cy="390"
            rx="170"
            ry="120"
            transform="rotate(-15 890 390)"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.26)}
          />
          <m.ellipse
            cx="900"
            cy="400"
            rx="120"
            ry="80"
            transform="rotate(-15 900 400)"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition(0.32)}
          />
        </g>
      </m.svg>
    </m.div>
  );
};

export default ContourLines;
