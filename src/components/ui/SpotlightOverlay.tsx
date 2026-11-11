import React from 'react';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SpotlightOverlayProps {
  isHovered: boolean;
  className?: string;
}

export const SpotlightOverlay: React.FC<SpotlightOverlayProps> = ({ isHovered, className = '' }) => {
  const isFine = useFinePointer();
  const prefersReduced = useReducedMotion();

  if (!isFine || prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-200 select-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {/* Soft spotlight fill */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background:
            'radial-gradient(260px circle at var(--sx, -999px) var(--sy, -999px), var(--spot-fill, rgba(228, 123, 67, 0.12)), transparent 65%)',
        }}
      />
      {/* Border glow via CSS mask */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          border: '1px solid var(--color-accent)',
          opacity: 0.6,
          WebkitMask:
            'radial-gradient(140px circle at var(--sx, -999px) var(--sy, -999px), black 0%, transparent 100%)',
          mask:
            'radial-gradient(140px circle at var(--sx, -999px) var(--sy, -999px), black 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default SpotlightOverlay;

