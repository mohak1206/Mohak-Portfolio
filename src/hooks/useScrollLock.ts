import { useEffect } from 'react';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

/**
 * useScrollLock:
 * Shared hook that locks page scroll when an overlay is open.
 * Uses reference counting so multiple overlays (or rapid open/close) do not conflict.
 * Stops Lenis smooth scroll on open and restarts on close, preserving window scroll position.
 */
export function useScrollLock(open: boolean): void {
  useEffect(() => {
    if (!open) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [open]);
}

export default useScrollLock;
