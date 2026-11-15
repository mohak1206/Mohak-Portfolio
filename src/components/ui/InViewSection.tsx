import React, { useState, useEffect, useRef } from 'react';

interface InViewSectionProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  rootMargin?: string;
  minHeight?: string;
  id?: string;
}

/**
 * InViewSection:
 * Defers loading and rendering of below-the-fold lazy sections until the user scrolls near them,
 * or when the browser is idle. Displays the exact section skeleton as fallback to guarantee CLS = 0.
 */
export const InViewSection: React.FC<InViewSectionProps> = ({
  children,
  fallback,
  rootMargin = '450px 0px',
  minHeight,
  id,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    // If an anchor links directly to this section (e.g. #projects or #contact), mount immediately
    if (id && typeof window !== 'undefined' && window.location.hash === `#${id}`) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    // Idle fallback: render after page load when browser is idle (deep links / fast scrolls)
    let idleId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number })
        .requestIdleCallback(() => setShouldRender(true), { timeout: 3500 });
    } else {
      timeoutId = setTimeout(() => setShouldRender(true), 3500);
    }

    return () => {
      observer.disconnect();
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shouldRender, rootMargin, id]);

  return (
    <div ref={containerRef} style={{ minHeight }} className="relative">
      {shouldRender ? children : fallback}
    </div>
  );
};

export default InViewSection;
