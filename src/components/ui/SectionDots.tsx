import React from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'My Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab-ideas', label: 'Lab & Ideas' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export const SectionDots: React.FC = () => {
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const activeSection = useScrollSpy(sections.map((s) => s.id), 200);

  // Render on desktop on home page only
  if (location.pathname !== '/') return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Section quick navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden min-[1100px]:flex flex-col items-center gap-2.5 p-2 bg-ivory/85 backdrop-blur-sm border border-warm-border/80 rounded-full shadow-2xs"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            aria-label={`Navigate to ${label} section`}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex items-center justify-center p-1 focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 rounded-full cursor-pointer"
          >
            {/* Hover/focus tooltip to the left */}
            <span
              role="tooltip"
              className="absolute right-full mr-3.5 px-2.5 py-1 text-[11px] font-mono whitespace-nowrap bg-charcoal text-white rounded shadow-md pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus:opacity-100 group-focus:translate-x-0 transition-all duration-200"
            >
              {label}
            </span>

            {/* Active section shows a burnt-orange bar; inactive shows small dot */}
            <span
              className={`block transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-1.5 h-6 bg-burnt-orange shadow-xs'
                  : 'w-1.5 h-1.5 bg-charcoal/30 group-hover:bg-burnt-orange group-hover:scale-125'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default SectionDots;

