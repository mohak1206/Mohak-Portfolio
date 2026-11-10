import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Vertical line draws downward as the user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 85%'],
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience & Journey"
      className="py-20 lg:py-28 bg-ivory border-b border-warm-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Reveal>
          <div className="space-y-3">
            <SectionLabel label="EXPERIENCE & JOURNEY" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              <SplitLines lines={['Path & Milestones']} />
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
            <motion.div
              className="w-full h-full bg-burnt-orange origin-top"
              style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
            />
          </div>

          {experienceData.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Circular Marker: pops in (scale 0 -> 1 with small overshoot) when in view */}
              <motion.div
                className={`absolute -left-[30.5px] sm:-left-[46.5px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 z-10 ${
                  item.isCurrent
                    ? 'bg-burnt-orange border-burnt-orange marker-pulse-ring'
                    : 'bg-ivory border-warm-border group-hover:border-burnt-orange'
                }`}
                initial={prefersReducedMotion ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={DEFAULT_VIEWPORT}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 16, delay: idx * 0.08 }
                }
                aria-hidden="true"
              />

              {/* Entries slide in alternately a few pixels from the side */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: idx % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={DEFAULT_VIEWPORT}
                transition={{ duration: 0.65, delay: prefersReducedMotion ? 0 : idx * 0.08, ease: EASING }}
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
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-burnt-orange hover:text-light-orange transition-colors"
                      >
                        <span>{item.projectLink.text}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
