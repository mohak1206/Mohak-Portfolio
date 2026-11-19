import type { Variants, Transition } from 'framer-motion';

/**
 * Unified Motion Language for Mohak Agrawal Portfolio
 * Easing: cubic-bezier(0.22, 1, 0.36, 1)
 * Durations: hover 0.2 to 0.3s, reveals 0.6 to 0.9s, stagger 0.08 to 0.12s
 * Distance for standard rise reveals: 24px
 */

export const EASING = [0.22, 1, 0.36, 1] as const;

export const DEFAULT_VIEWPORT = {
  once: true,
  margin: '0px 0px -60px 0px',
} as const;

export const DURATION = {
  hover: 0.25,
  reveal: 0.7,
  slowReveal: 0.9,
  fast: 0.35,
  stagger: 0.08,
} as const;

export const standardTransition: Transition = {
  duration: DURATION.reveal,
  ease: EASING,
};

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
};

export const staggerContainerVariants = (
  staggerDelay = 0.08,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASING,
    },
  },
};

export const routeVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: EASING,
    },
  },
};

export const modalVariants: Variants = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: EASING,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: EASING,
    },
  },
};
