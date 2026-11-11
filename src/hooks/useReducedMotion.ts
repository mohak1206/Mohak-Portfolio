import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { useMotionPreference } from '../context/MotionContext';

export function useReducedMotion(): boolean {
  const framerPref = useFramerReducedMotion();
  const { isReducedMotion } = useMotionPreference();

  // If user explicitly toggled reduced motion, or system prefers reduced motion, or framer detected it
  return Boolean(isReducedMotion || framerPref);
}

export default useReducedMotion;
