import React from 'react';
import { m, type Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { handsOnSkills, exploringSkills } from '../../data/skills';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

export const Expertise: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const blocksContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const blockItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASING },
    },
  };

  const chipsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const chipItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: EASING },
    },
  };

  return (
    <section id="expertise" aria-label="Expertise" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Reveal>
          <div className="space-y-3">
            <SectionLabel label="EXPERTISE & TOOLING" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              <SplitLines lines={['Technical Capabilities']} />
            </h2>
            <p className="text-muted-grey text-base max-w-2xl">
              A comprehensive look at languages, production frameworks, and AI workflows I build with daily, alongside cutting-edge systems currently in research.
            </p>
          </div>
        </Reveal>

        {/* Hands-on Skills Grid */}
        <div className="space-y-4">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              <span className="w-2 h-2 rounded-full bg-burnt-orange inline-block" />
              <span>Hands-on & Applied Competencies</span>
            </div>
          </Reveal>

          {/* Category blocks stagger up */}
          <m.div
            variants={blocksContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {handsOnSkills.map((group, idx) => (
              <m.div key={idx} variants={blockItemVariants} className="h-full">
                <Card className="p-5 space-y-3 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold pb-2">
                      {group.category}
                    </h3>

                    {/* Thin separator lines grow from left to right */}
                    <m.div
                      className="h-[1px] bg-warm-border origin-left w-full mb-3"
                      initial={prefersReducedMotion ? false : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={DEFAULT_VIEWPORT}
                      transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
                    />

                    {/* Skill chips fade in with small stagger; on hover gets orange border and small orange dot scales in */}
                    <m.div
                      variants={chipsContainerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={DEFAULT_VIEWPORT}
                      className="flex flex-wrap gap-1.5"
                    >
                      {group.skills.map((skill) => (
                        <m.span
                          key={skill}
                          variants={chipItemVariants}
                          className="group/chip relative inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium bg-ivory text-charcoal/90 rounded-[3px] border border-warm-border hover:border-burnt-orange hover:bg-cream transition-all duration-200 cursor-default"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-burnt-orange scale-0 group-hover/chip:scale-100 transition-transform duration-200 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{skill}</span>
                        </m.span>
                      ))}
                    </m.div>
                  </div>
                </Card>
              </m.div>
            ))}
          </m.div>
        </div>

        {/* Exploring Group */}
        <Reveal delay={0.2}>
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
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white text-charcoal border border-warm-border shadow-sm hover:border-burnt-orange transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Expertise;
