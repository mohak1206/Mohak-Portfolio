import React from 'react';
import { cn } from '../../lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'mono' | 'pill' | 'badge';
  status?: 'Completed' | 'In progress' | 'Concept' | 'Early prototype';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'mono',
  status,
  className,
}) => {
  if (variant === 'pill') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-card-surface border border-warm-border text-charcoal shadow-sm',
          className
        )}
      >
        {children}
      </span>
    );
  }

  if (variant === 'badge' && status) {
    const statusStyles = {
      Completed: 'bg-emerald-100/90 [data-theme=dark]_&:bg-emerald-950/60 text-emerald-800 [data-theme=dark]_&:text-emerald-300 border-emerald-300/70 [data-theme=dark]_&:border-emerald-700/60',
      'In progress': 'bg-amber-100/90 [data-theme=dark]_&:bg-amber-950/60 text-amber-800 [data-theme=dark]_&:text-amber-300 border-amber-300/70 [data-theme=dark]_&:border-amber-700/60',
      Concept: 'bg-cream text-charcoal/80 border-warm-border',
      'Early prototype': 'bg-burnt-orange/15 text-burnt-orange border-burnt-orange/30',
    };

    return (
      <span
        className={cn(
          'px-2.5 py-0.5 rounded text-xs font-mono font-medium border',
          statusStyles[status],
          className
        )}
      >
        {children || status}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'px-2 py-0.5 text-[11px] font-mono bg-ivory text-charcoal/80 rounded-[3px] border border-warm-border',
        className
      )}
    >
      {children}
    </span>
  );
};

