import { useRef, useState, useCallback } from 'react';
import { useFinePointer } from './useFinePointer';
import { useReducedMotion } from './useReducedMotion';

export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const isFine = useFinePointer();
  const prefersReduced = useReducedMotion();

  const handlePointerEnter = useCallback(() => {
    if (!isFine || prefersReduced) return;
    setIsHovered(true);
  }, [isFine, prefersReduced]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<T> | React.MouseEvent<T>) => {
      if (!isFine || prefersReduced || !ref.current) return;
      if (!isHovered) setIsHovered(true);

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        ref.current.style.setProperty('--sx', `${x.toFixed(1)}px`);
        ref.current.style.setProperty('--sy', `${y.toFixed(1)}px`);
      });
    },
    [isFine, prefersReduced, isHovered]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsHovered(false);
  }, []);

  return {
    ref,
    isHovered,
    handlePointerMove,
    bind: {
      onPointerEnter: handlePointerEnter,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
    },
  };
}

export default useSpotlight;
