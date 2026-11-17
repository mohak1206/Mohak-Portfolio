import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
  if (typeof window !== 'undefined') {
    (window as any).__lenis = instance;
  }
}

/**
 * Smoothly scrolls to target element or selector using Lenis when available,
 * with standard browser smooth scroll as fallback. Uses sticky-nav offset (-80px).
 */
export function scrollToTarget(target: string | HTMLElement, offset = -80) {
  let elementToScroll: HTMLElement | null = null;

  if (typeof target === 'string') {
    const rawId = target.replace('#', '');
    elementToScroll = document.getElementById(rawId);

    // If section hasn't rendered yet (lazy InViewSection), dispatch render event and find placeholder
    if (!elementToScroll && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('render-section', { detail: { id: rawId } }));
      elementToScroll = document.querySelector(`[data-section-fallback="${rawId}"]`) as HTMLElement | null;
    }
  } else {
    elementToScroll = target;
  }

  if (lenisInstance) {
    if (elementToScroll) {
      lenisInstance.scrollTo(elementToScroll, {
        offset,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      lenisInstance.scrollTo(target, {
        offset,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  } else {
    if (elementToScroll) {
      const top = elementToScroll.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

