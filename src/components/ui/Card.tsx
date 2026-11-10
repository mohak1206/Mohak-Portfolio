import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  hoverEffect = true,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-[6px] border border-warm-border transition-all duration-300',
        elevated ? 'bg-white shadow-soft' : 'bg-white/80',
        hoverEffect && 'hover:border-burnt-orange/50 hover:shadow-float',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

