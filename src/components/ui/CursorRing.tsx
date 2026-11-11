import React, { useEffect, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type CursorMode = 'default' | 'hover' | 'view';

export const CursorRing: React.FC = () => {
  const isFine = useFinePointer();
  const prefersReduced = useReducedMotion();
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth following lag
  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isFine || prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        setCursorMode('view');
        return;
      }

      const interactive = target.closest('a, button, [role="button"], input, select, textarea');
      if (interactive) {
        setCursorMode('hover');
        return;
      }

      setCursorMode('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isFine, prefersReduced, isVisible, mouseX, mouseY]);

  if (!isFine || prefersReduced) {
    return null;
  }

  const isView = cursorMode === 'view';
  const isHover = cursorMode === 'hover';
  const size = isView ? 52 : isHover ? 48 : 28;

  return (
    <m.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-burnt-orange flex items-center justify-center transition-[width,height,background-color,opacity] duration-200 ease-out select-none"
      style={{
        x: smoothX,
        y: smoothY,
        width: size,
        height: size,
        opacity: isVisible ? (isHover ? 0.85 : 0.65) : 0,
        backgroundColor: isView
          ? 'rgba(201, 79, 23, 0.12)'
          : isHover
          ? 'rgba(201, 79, 23, 0.06)'
          : 'transparent',
      }}
    >
      {isView && (
        <span className="text-[10px] font-mono font-bold tracking-tight text-burnt-orange uppercase">
          View
        </span>
      )}
    </m.div>
  );
};

export default CursorRing;

