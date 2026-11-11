import React, { useRef, useEffect } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  radius?: number;
  maxDistance?: number;
}

/**
 * Magnetic button wrapper:
 * Pulls the button up to 8px towards the pointer when within 80px.
 * The inner child moves ~40% further for a subtle, layered depth effect.
 * Springs smoothly back on pointer leave.
 * Inactive on touch devices and under prefers-reduced-motion.
 * Uses useMotionValue / useSpring / useTransform: ZERO re-renders on pointermove.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  innerClassName = '',
  radius = 80,
  maxDistance = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();

  const isEnabled = isFinePointer && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Inner element moves 40% extra (1.4x)
  const innerX = useTransform(springX, (val) => val * 1.4);
  const innerY = useTransform(springY, (val) => val * 1.4);

  useEffect(() => {
    if (!isEnabled) return;

    const handlePointerMove = (e: PointerEvent) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      const effectiveRadius = Math.max(rect.width, rect.height) / 2 + radius;

      if (distance < effectiveRadius) {
        const pullProgress = Math.min(1, distance / effectiveRadius);
        // Normalized direction vector scaled by maxDistance
        const pullX = (distanceX / effectiveRadius) * maxDistance * (1 - pullProgress * 0.3);
        const pullY = (distanceY / effectiveRadius) * maxDistance * (1 - pullProgress * 0.3);
        x.set(pullX);
        y.set(pullY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handlePointerLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, [isEnabled, maxDistance, radius, x, y]);

  if (!isEnabled) {
    return <div className={cn('inline-block', className)}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={cn('inline-block', className)}
    >
      <m.div style={{ x: innerX, y: innerY }} className={cn('inline-block w-full h-full', innerClassName)}>
        {children}
      </m.div>
    </m.div>
  );
};

export default Magnetic;

