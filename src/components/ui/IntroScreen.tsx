import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { EASING } from '../../lib/animation';

export const IntroScreen: React.FC = () => {
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    // Skip entirely under reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

    try {
      const alreadySeen = sessionStorage.getItem('mohak_intro_seen');
      if (alreadySeen) return false;
      sessionStorage.setItem('mohak_intro_seen', 'true');
      return true;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!show) return;

    // Must never block interaction after 1.2s
    const timer = setTimeout(() => {
      setShow(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-splash"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28, transition: { duration: 0.35, ease: EASING } }}
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center cursor-pointer select-none"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <Logo className="h-16 sm:h-20 w-auto text-charcoal" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;

