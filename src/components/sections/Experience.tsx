import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionNumeral } from '../ui/SectionNumeral';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(experienceData[0]?.id || '');

  // Vertical line draws downward as the user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 85%'],
  });

  // Track entry nearest the vertical center of the viewport
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Use IntersectionObserver with -45% rootMargin to detect the center 10% slice of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setActiveId(id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    entryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Fallback scroll listener to smoothly find nearest when fast scrolling
    const handleScroll = () => {
      const centerY = window.innerHeight / 2;
      let minDistance = Infinity;
      let closestId = activeId;

      entryRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          const id = el.getAttribute('data-id');
          if (id) closestId = id;
        }
      });

      if (closestId && closestId !== activeId) {
        setActiveId(closestId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion, activeId]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience & Journey"
      className="relative py-20 lg:py-28 bg-ivory border-b border-warm-border overflow-hidden"
    >
      {/* Giant Outlined Section Numeral 05 */}
      <SectionNumeral numeral="05" sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <Reveal>
          <div className="space-y-3">
            <SectionLabel label="EXPERIENCE & JOURNEY" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              Path &{' '}
              <span className="italic text-burnt-orange font-normal">Milestones.</span>
            </h2>
            <p className="text-muted-grey text-base max-w-xl">
              A chronological timeline of software engineering internships, technical leadership, and academic education.
            </p>
          </div>
        </Reveal>

        {/* Vertical Timeline */}
        <div className="relative ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          {/* Background track line */}
          <div className="absolute top-2 bottom-2 left-0 w-[2px] bg-warm-border/50" aria-hidden="true">
            {/* The vertical line draws downward as user scrolls with scaleY, origin top */}
            <m.div
              className="w-full h-full bg-burnt-orange origin-top"
              style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
            />
          </div>

          {experienceData.map((item, idx) => {
            const isActive = !prefersReducedMotion ? item.id === activeId : true;

            return (
              <div
                key={item.id}
                data-id={item.id}
                ref={(el) => {
                  entryRefs.current[idx] = el;
                }}
                className="relative group"
              >
                {/* Timeline Circular Marker */}
                <m.div
                  className={`absolute -left-[30.5px] sm:-left-[46.5px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10 ${
                    isActive
                      ? 'bg-burnt-orange border-burnt-orange ring-4 ring-burnt-orange/25 scale-110'
                      : 'bg-ivory border-warm-border scale-95 opacity-60'
                  } ${item.isCurrent && isActive ? 'marker-pulse-ring' : ''}`}
                  initial={prefersReducedMotion ? false : { scale: 0 }}
                  whileInView={{ scale: isActive ? 1.1 : 0.95 }}
                  viewport={DEFAULT_VIEWPORT}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 16, delay: idx * 0.08 }
                  }
                  aria-hidden="true"
                />

                {/* Timeline Entry Card with Scroll-Linked Focus Effect */}
                <div
                  className={`transition-all duration-300 ease-out origin-left ${
                    isActive
                      ? 'opacity-100 scale-100'
                      : 'opacity-55 scale-[0.98]'
                  }`}
                >
                  <Card className="p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal">
                          {item.role}
                        </h3>
                        <div className="text-sm font-medium text-charcoal/80">
                          <span>{item.organization}</span>
                          {item.department && (
                            <span className="text-muted-grey"> · {item.department}</span>
                          )}
                        </div>
                      </div>

                      <span className="font-mono text-xs text-muted-grey bg-ivory px-2.5 py-1 rounded border border-warm-border self-start sm:self-auto mt-1 sm:mt-0">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm text-muted-grey leading-relaxed">
                      {item.description}
                    </p>

                    {item.projectLink && (
                      <div className="pt-1">
                        <a
                          href="#projects"
                          className="draw-underline-link inline-flex items-center gap-1.5 text-xs font-semibold text-burnt-orange hover:text-light-orange transition-colors py-0.5"
                        >
                          <span>{item.projectLink.text}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
