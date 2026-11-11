import React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Base Skeleton block:
 * - Soft cream background #EFE8DD
 * - 4px radius
 * - Soft diagonal shimmer highlight #F7F3EC (~70% opacity) sweeping every 1.4s
 * - Pure transform CSS animation
 * - Disabled under prefers-reduced-motion
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      aria-hidden="true"
      className={cn('skeleton-shimmer bg-[#EFE8DD] rounded-[4px]', className)}
      {...props}
    />
  );
};

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
}

/**
 * SkeletonText variant:
 * Supports 1 to 4 lines, with the last line rendered at 60% width.
 */
export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
  lineClassName = '',
}) => {
  const lineCount = Math.min(Math.max(1, lines), 4);

  return (
    <div aria-hidden="true" className={cn('space-y-2.5 w-full', className)}>
      {Array.from({ length: lineCount }).map((_, index) => {
        const isLast = index === lineCount - 1 && lineCount > 1;
        return (
          <Skeleton
            key={index}
            className={cn(
              'h-3.5 sm:h-4',
              isLast ? 'w-3/5' : 'w-full',
              lineClassName
            )}
          />
        );
      })}
    </div>
  );
};

export interface SkeletonCircleProps extends SkeletonProps {
  size?: number | string;
}

/**
 * SkeletonCircle variant:
 * Rounded-full circular skeleton block.
 */
export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({
  size,
  className,
  style,
  ...props
}) => {
  const sizeStyle = size
    ? {
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        ...style,
      }
    : style;

  return (
    <Skeleton
      className={cn('rounded-full shrink-0', className)}
      style={sizeStyle}
      {...props}
    />
  );
};

export interface SkeletonImageProps extends SkeletonProps {
  aspectRatio?: string;
}

/**
 * SkeletonImage variant:
 * Keeps a specified aspect ratio (default: aspect-[16/10]).
 */
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  aspectRatio = 'aspect-[16/10]',
  className,
  ...props
}) => {
  return (
    <Skeleton
      className={cn('w-full h-full', aspectRatio, className)}
      {...props}
    />
  );
};

export default Skeleton;

