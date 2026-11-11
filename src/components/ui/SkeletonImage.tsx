import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from './Skeleton';

export interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  containerClassName?: string;
  fallback?: React.ReactNode;
}

/**
 * SkeletonImage:
 * - Displays a shimmer skeleton in the exact aspect ratio while downloading.
 * - Fades the image in smoothly over 400ms (opacity only) upon load.
 * - In case of network error, gracefully displays the flat cream block or custom fallback.
 * - Preserves fetchPriority, decoding, width, height, and loading attributes.
 */
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  className = '',
  containerClassName = '',
  aspectRatio = '',
  fallback,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div
      aria-busy={!isLoaded && !hasError}
      className={cn(
        'relative overflow-hidden bg-[#EFE8DD]',
        aspectRatio,
        containerClassName
      )}
    >
      {/* Shimmer skeleton until loaded or on error */}
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-[inherit] pointer-events-none z-10" />
      )}

      {/* If error occurred and custom fallback provided */}
      {hasError && fallback ? (
        fallback
      ) : hasError ? (
        <div
          className="absolute inset-0 w-full h-full bg-[#EFE8DD]"
          aria-hidden="true"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding={decoding}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-[400ms] ease-out',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default SkeletonImage;

