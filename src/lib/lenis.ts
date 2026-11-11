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
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const el =
      typeof target === 'string'
        ? document.getElementById(target.replace('#', ''))
        : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

