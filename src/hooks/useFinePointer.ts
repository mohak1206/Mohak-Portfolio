import { useState, useEffect } from 'react';

/**
 * useFinePointer:
 * Returns true only when the primary input mechanism is a fine pointer (mouse, trackpad)
 * that supports hover. Returns false on touch devices (smartphones, tablets).
 */
export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handleChange = () => setIsFine(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isFine;
}

export default useFinePointer;

