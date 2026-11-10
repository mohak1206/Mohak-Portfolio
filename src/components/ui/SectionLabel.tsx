import React from 'react';
import { cn } from '../../lib/utils';

interface SectionLabelProps {
  label: string;
  centered?: boolean;
  twoSided?: boolean;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  centered = false,
  twoSided = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-charcoal/80 font-medium',
        centered && 'justify-center',
        className
      )}
    >
      <span className="w-5 h-[1.5px] bg-burnt-orange inline-block" aria-hidden="true" />
      <span>{label}</span>
      {twoSided && <span className="w-5 h-[1.5px] bg-burnt-orange inline-block" aria-hidden="true" />}
    </div>
  );
};

