import { useState, useEffect, useRef } from 'react';

/**
 * useActiveSection:
 * Tracks the active section on the page for both the navbar and the right-edge section dots.
 * - Filters to elements in DOM order from ids, skipping non-existent or 0-height sections.
 * - Computes the active section as the LAST section whose top edge is at or above 35% viewport height.
 * - Before the first section reaches that line, the active section is the first one ("home").
 * - Special case: at the very bottom (scrollY + innerHeight >= scrollHeight - 4), active is the last section.
 * - Throttled with requestAnimationFrame; updates on scroll, resize, and DOM mutations (lazy section mount).
 */
export function useActiveSection(ids: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(ids[0] || 'home');
  const idsRef = useRef(ids);
  idsRef.current = ids;

  useEffect(() => {
    let rafId: number | null = null;

    const computeActive = () => {
      const currentIds = idsRef.current;
      if (!currentIds.length) return;

      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Special case: scrolled to the very bottom
      if (scrollY + innerHeight >= scrollHeight - 4) {
        // Return the last id from currentIds that exists in the DOM with height > 0
        for (let i = currentIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(currentIds[i]);
          if (el && el.getBoundingClientRect().height > 0) {
            setActiveSection(currentIds[i]);
            return;
          }
        }
      }

      // Build the list of section elements in DOM order from the ids,
      // skipping any that do not exist yet (sections are lazy-loaded) or have a height of 0.
      const elements: { id: string; el: HTMLElement; top: number }[] = [];
      for (const id of currentIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.height > 0) {
            elements.push({ id, el, top: rect.top });
          }
        }
      }

      if (elements.length === 0) return;

      // Ensure DOM order
      elements.sort((a, b) => {
        const pos = a.el.compareDocumentPosition(b.el);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });

      const refLine = innerHeight * 0.35;
      let matched = '';

      // The LAST section whose top edge is at or above the reference line (top <= refLine)
      for (const item of elements) {
        if (item.top <= refLine) {
          matched = item.id;
        }
      }

      // Before the first section reaches that line, the active section is the first one ("home")
      if (!matched) {
        matched = elements[0].id;
      }

      setActiveSection(matched);
    };

    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        computeActive();
      });
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // Detect lazy-loaded section mounts
    const mutationObserver = new MutationObserver(() => {
      handleScrollOrResize();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Initial evaluation
    computeActive();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      mutationObserver.disconnect();
    };
  }, [ids.join(',')]);

  return activeSection;
}
