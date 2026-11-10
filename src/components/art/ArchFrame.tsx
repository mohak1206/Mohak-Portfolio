import React from 'react';
import { cn } from '../../lib/utils';

interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
  outlineOffset?: boolean;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({
  children,
  className,
  outlineOffset = true,
}) => {
  return (
    <div className={cn('relative w-full h-full', className)}>
      {outlineOffset && (
        <div
          className="absolute -inset-2.5 sm:-inset-3 border border-burnt-orange/50 pointer-events-none arch-outline z-10"
          aria-hidden="true"
        />
      )}
      <div className="relative w-full h-full overflow-hidden arch-mask shadow-float z-10 bg-cream">
        {children}
      </div>
    </div>
  );
};

