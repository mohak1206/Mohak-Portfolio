import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';

export const Experience: React.FC = () => {
  return (
    <section id="experience" aria-label="Experience & Journey" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Reveal>
          <div className="space-y-3">
            <SectionLabel label="EXPERIENCE & JOURNEY" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              Path & Milestones
            </h2>
            <p className="text-muted-grey text-base max-w-xl">
              A chronological timeline of software engineering internships, technical leadership, and academic education.
            </p>
          </div>
        </Reveal>

        {/* Vertical Timeline */}
        <div className="relative border-l border-warm-border/80 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          {experienceData.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.1}>
              <div className="relative group">
                {/* Timeline Circular Marker */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                    item.isCurrent
                      ? 'bg-burnt-orange border-burnt-orange ring-4 ring-burnt-orange/20'
                      : 'bg-ivory border-warm-border group-hover:border-burnt-orange'
                  }`}
                  aria-hidden="true"
                />

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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

