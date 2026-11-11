import { getLenis } from './lenis';

let lockCount = 0;
let savedScrollY = 0;
let originalHtmlOverflow = '';
let originalHtmlPaddingRight = '';
let originalBodyPosition = '';
let originalBodyTop = '';
let originalBodyWidth = '';

export function lockScroll(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (lockCount === 0) {
    savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    originalHtmlOverflow = document.documentElement.style.overflow;
    originalHtmlPaddingRight = document.documentElement.style.paddingRight;
    originalBodyPosition = document.body.style.position;
    originalBodyTop = document.body.style.top;
    originalBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Handle iOS Safari and touch devices where overflow: hidden on html alone does not prevent rubber-banding
    const isTouchOrIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isTouchOrIOS) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.width = '100%';
    }

    // Stop Lenis smooth scroll while overlay is active
    getLenis()?.stop();
  }

  lockCount++;
}

export function unlockScroll(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (lockCount > 0) {
    lockCount--;
  }

  if (lockCount === 0) {
    document.documentElement.style.overflow = originalHtmlOverflow;
    document.documentElement.style.paddingRight = originalHtmlPaddingRight;
    document.body.style.position = originalBodyPosition;
    document.body.style.top = originalBodyTop;
    document.body.style.width = originalBodyWidth;

    window.scrollTo(0, savedScrollY);
    getLenis()?.scrollTo(savedScrollY, { immediate: true });
    getLenis()?.start();
  }
}

