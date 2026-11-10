import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const framerPref = useFramerReducedMotion();
  const [systemPref, setSystemPref] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setSystemPref(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return Boolean(framerPref ?? systemPref);
}

export default useReducedMotion;
