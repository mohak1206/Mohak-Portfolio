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

    const checkHash = () => {
      if (id && typeof window !== 'undefined' && window.location.hash === `#${id}`) {
        setShouldRender(true);
      }
    };

    const handleRenderSection = (e: Event) => {
      const custom = e as CustomEvent<{ id: string }>;
      if (custom.detail && custom.detail.id === id) {
        setShouldRender(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('render-section', handleRenderSection);

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
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('render-section', handleRenderSection);
      observer.disconnect();
      if (idleId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shouldRender, rootMargin, id]);

  return (
    <div ref={containerRef} data-section-fallback={!shouldRender ? id : undefined} style={{ minHeight }} className="relative">
      {shouldRender ? children : fallback}
    </div>
  );
};

export default InViewSection;
