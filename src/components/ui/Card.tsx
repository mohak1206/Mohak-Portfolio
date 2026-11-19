import React from 'react';
import { cn } from '../../lib/utils';
import { useSpotlight } from '../../hooks/useSpotlight';
import { SpotlightOverlay } from './SpotlightOverlay';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
  hoverEffect?: boolean;
  spotlight?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  hoverEffect = true,
  spotlight = true,
  className,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}) => {
  const { ref, isHovered, bind } = useSpotlight<HTMLDivElement>();

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (spotlight) bind.onPointerEnter();
    onPointerEnter?.(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (spotlight) bind.onPointerMove(e);
    onPointerMove?.(e);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (spotlight) bind.onPointerLeave();
    onPointerLeave?.(e);
  };

  return (
    <div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative overflow-hidden rounded-[6px] border border-warm-border transition-all duration-300',
        elevated ? 'bg-card-surface shadow-soft' : 'bg-card-surface/80',
        hoverEffect && 'hover:border-burnt-orange/50 hover:shadow-float hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {spotlight && <SpotlightOverlay isHovered={isHovered} />}
      {children}
    </div>
  );
};

export default Card;
