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
          'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-warm-border text-charcoal shadow-sm',
          className
        )}
      >
        {children}
      </span>
    );
  }

  if (variant === 'badge' && status) {
    const statusStyles = {
      Completed: 'bg-emerald-100/90 text-emerald-800 border-emerald-300/70',
      'In progress': 'bg-amber-100/90 text-amber-800 border-amber-300/70',
      Concept: 'bg-cream text-charcoal/80 border-warm-border',
      'Early prototype': 'bg-orange-50 text-burnt-orange border-burnt-orange/30',
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

