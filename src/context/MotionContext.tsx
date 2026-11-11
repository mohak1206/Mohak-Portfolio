import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface MotionContextType {
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
  setReducedMotion: (value: boolean) => void;
}

const MotionContext = createContext<MotionContextType>({
  isReducedMotion: false,
  toggleReducedMotion: () => {},
  setReducedMotion: () => {},
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReducedMotion, setIsReducedMotionState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('motion_preference');
      if (saved !== null) {
        return saved === 'reduced';
      }
    } catch {
      // Ignore localStorage access issues
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const applyMotionAttribute = useCallback((reduced: boolean) => {
    if (typeof document !== 'undefined') {
      if (reduced) {
        document.documentElement.setAttribute('data-motion', 'reduced');
      } else {
        document.documentElement.removeAttribute('data-motion');
      }
    }
  }, []);

  useEffect(() => {
    applyMotionAttribute(isReducedMotion);
  }, [isReducedMotion, applyMotionAttribute]);

  // Listen for system media query changes if user hasn't explicitly set a preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem('motion_preference');
        if (saved === null) {
          setIsReducedMotionState(e.matches);
        }
      } catch {
        setIsReducedMotionState(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const setReducedMotion = useCallback(
    (value: boolean) => {
      setIsReducedMotionState(value);
      try {
        localStorage.setItem('motion_preference', value ? 'reduced' : 'full');
      } catch (err) {
        console.warn('Failed to save motion preference to localStorage:', err);
      }
      applyMotionAttribute(value);
    },
    [applyMotionAttribute]
  );

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion(!isReducedMotion);
  }, [isReducedMotion, setReducedMotion]);

  return (
    <MotionContext.Provider value={{ isReducedMotion, toggleReducedMotion, setReducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotionPreference = () => useContext(MotionContext);

