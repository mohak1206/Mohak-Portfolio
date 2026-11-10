import { m } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';

type LogoProps = { className?: string };

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="6 6 100 52"
      className={className}
      role="img"
      aria-label="MA, Mohak Agrawal"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* Stroke 1: Left 'M' */}
        <m.path
          d="M12 52 V14 L32 38 L52 14 V52"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.7,
            delay: 0,
            ease: EASING,
          }}
        />

        {/* Stroke 2: Right 'A' arch */}
        <m.path
          d="M66 52 V32 A18 18 0 0 1 102 32 V52"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: EASING,
          }}
        />

        {/* Stroke 3: Right 'A' crossbar */}
        <m.path
          d="M66 40 H102"
          strokeWidth="2.4"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: EASING,
          }}
        />
      </g>
    </svg>
  );
}
