import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { availabilityData } from '../../data/availability';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AvailabilityBadgeProps {
  inline?: boolean;
  className?: string;
}

const STATUS_COLORS: Record<'open' | 'limited' | 'closed', { dot: string; pulse: string }> = {
  open: { dot: '#2E9E5B', pulse: 'rgba(46, 158, 91, 0.4)' },
  limited: { dot: '#E47B43', pulse: 'rgba(228, 123, 67, 0.4)' },
  closed: { dot: '#77716B', pulse: 'rgba(119, 113, 107, 0.4)' },
};

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  inline = false,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '20px' });
  const prefersReduced = useReducedMotion();
  const { status, text } = availabilityData;
  const colors = STATUS_COLORS[status] || STATUS_COLORS.open;

  const isPulseActive = status === 'open' && !prefersReduced && isInView;

  if (inline) {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={`Availability status: ${text}`}
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-warm-border bg-card-surface/90 text-charcoal/90 font-mono text-[11px] leading-tight shadow-2xs backdrop-blur-xs select-none ${className}`}
      >
        <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
          {isPulseActive && (
            <span
              className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75"
              style={{
                backgroundColor: colors.pulse,
                animationDuration: '2.4s',
              }}
            />
          )}
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: colors.dot }}
          />
        </span>
        <span className="truncate">{text}</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="status"
      aria-label={`Availability status: ${text}`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-warm-border bg-card-surface/90 text-charcoal/90 font-mono text-xs leading-normal shadow-2xs backdrop-blur-xs select-none ${className}`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
        {isPulseActive && (
          <span
            className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-75"
            style={{
              backgroundColor: colors.pulse,
              animationDuration: '2.4s',
            }}
          />
        )}
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: colors.dot }}
        />
      </span>
      <span>{text}</span>
    </div>
  );
};

