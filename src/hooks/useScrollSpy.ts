import { useActiveSection } from './useActiveSection';

/**
 * useScrollSpy:
 * Delegated to useActiveSection for unified active-section tracking across the site.
 */
export function useScrollSpy(sectionIds: string[], _offset = 160): string {
  return useActiveSection(sectionIds);
}

export default useScrollSpy;
