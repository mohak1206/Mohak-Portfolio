import React from 'react';
import { Sparkles } from 'lucide-react';
import { handsOnSkills, exploringSkills } from '../../data/skills';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';

export const Expertise: React.FC = () => {
  return (
    <section id="expertise" aria-label="Expertise" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-3">
          <SectionLabel label="EXPERTISE & TOOLING" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
            Technical Capabilities
          </h2>
          <p className="text-muted-grey text-base max-w-2xl">
            A comprehensive look at languages, production frameworks, and AI workflows I build with daily, alongside cutting-edge systems currently in research.
          </p>
        </div>

        {/* Hands-on Skills Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
            <span className="w-2 h-2 rounded-full bg-burnt-orange inline-block" />
            <span>Hands-on & Applied Competencies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {handsOnSkills.map((group, idx) => (
              <Card
                key={idx}
                className="p-5 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold border-b border-warm-border pb-2 mb-3">
                    {group.category}
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs font-medium bg-ivory text-charcoal/90 rounded-[3px] border border-warm-border hover:bg-cream transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Exploring Group */}
        <div className="bg-cream/40 border border-warm-border rounded-[8px] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-burnt-orange" />
            <h3 className="font-serif text-2xl font-medium text-charcoal">
              Currently Exploring & Experimenting
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-grey max-w-2xl leading-relaxed">
            Active lab explorations in next-generation autonomous agent architectures, local open-weight inference, and multi-modal intelligence.
          </p>

          <div className="flex flex-wrap gap-2.5">
            {exploringSkills.map((tech) => (
              <div
                key={tech}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-charcoal border border-warm-border shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
