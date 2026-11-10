import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Code, Layers, Users, Sparkles, ArrowRight, MapPin, GraduationCap, Calendar, Award } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SectionLabel } from '../ui/SectionLabel';
import { Tag } from '../ui/Tag';
import { Card } from '../ui/Card';
import { MountainFallback } from '../art/MountainFallback';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

export const About: React.FC = () => {
  const { aboutIntro, education } = profileData;
  const prefersReducedMotion = useReducedMotion();

  const pillContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const pillItemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: EASING },
    },
  };

  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -16 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: EASING },
    },
  };

  return (
    <section id="about" aria-label="About Me" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* ROW 1: Signature Reference Layout (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Landscape B&W mountain with burnt-orange sun circle behind peak */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="relative w-full max-w-[360px] aspect-[16/11]">
              {/* Orange sun circle scales in from 0.8 with a 0.2s delay */}
              <motion.div
                className="absolute -top-6 right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-burnt-orange z-0 shadow-md"
                initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={DEFAULT_VIEWPORT}
                transition={{ duration: 0.65, delay: prefersReducedMotion ? 0 : 0.2, ease: EASING }}
                aria-hidden="true"
              />

              {/* Image reveals with clip-path wipe from left to right */}
              <motion.div
                className="relative w-full h-full rounded-[10px] overflow-hidden border border-warm-border shadow-float z-10 bg-cream"
                initial={prefersReducedMotion ? false : { clipPath: 'inset(0% 100% 0% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={DEFAULT_VIEWPORT}
                transition={{ duration: 0.85, ease: EASING }}
              >
                <MountainFallback
                  type="about-bw"
                  alt="Dramatic black and white mountain peak"
                />
              </motion.div>
            </div>
          </div>

          {/* Centre Column: Heading, Paragraph, and 4 Pill Tags */}
          <div className="lg:col-span-5 space-y-5">
            <SectionLabel label="ABOUT ME" />

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-charcoal font-normal tracking-[-0.01em]">
              <SplitLines
                lines={[
                  'A Developer who',
                  <span key="about-italic-part" className="inline-block">
                    <motion.span
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={DEFAULT_VIEWPORT}
                      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.35, ease: EASING }}
                      className="italic text-burnt-orange font-normal"
                    >
                      Builds, Learns and Leads.
                    </motion.span>
                  </span>,
                ]}
              />
            </h2>

            {/* Paragraph fades up */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={DEFAULT_VIEWPORT}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
              className="text-muted-grey text-base leading-relaxed"
            >
              {aboutIntro}
            </motion.p>

            {/* 4 Pill Tags stagger in (0.06s), on hover lift 2px and icon turns burnt orange */}
            <motion.div
              variants={pillContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={DEFAULT_VIEWPORT}
              className="flex flex-wrap gap-2.5 pt-2"
            >
              <motion.div
                variants={pillItemVariants}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Tag variant="pill" className="group-hover:border-burnt-orange/50 transition-colors">
                  <Code className="w-3.5 h-3.5 text-muted-grey group-hover:text-burnt-orange stroke-[2] transition-colors duration-200" />
                  <span>AI/ML</span>
                </Tag>
              </motion.div>

              <motion.div
                variants={pillItemVariants}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Tag variant="pill" className="group-hover:border-burnt-orange/50 transition-colors">
                  <Layers className="w-3.5 h-3.5 text-muted-grey group-hover:text-burnt-orange stroke-[2] transition-colors duration-200" />
                  <span>Web Development</span>
                </Tag>
              </motion.div>

              <motion.div
                variants={pillItemVariants}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Tag variant="pill" className="group-hover:border-burnt-orange/50 transition-colors">
                  <Users className="w-3.5 h-3.5 text-muted-grey group-hover:text-burnt-orange stroke-[2] transition-colors duration-200" />
                  <span>Leadership</span>
                </Tag>
              </motion.div>

              <motion.div
                variants={pillItemVariants}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Tag variant="pill" className="group-hover:border-burnt-orange/50 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-muted-grey group-hover:text-burnt-orange stroke-[2] transition-colors duration-200" />
                  <span>Social Impact</span>
                </Tag>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Thin vertical divider + Currently Exploring */}
          <div className="lg:col-span-3 lg:border-l lg:border-warm-border lg:pl-8 pt-4 lg:pt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-charcoal">
                {/* Orange dot pulses once (scale 1 -> 1.6 -> 1 with fading ring) and loops slowly every 3s */}
                <span className="w-2.5 h-2.5 rounded-full bg-burnt-orange dot-pulse-slow inline-block shrink-0" aria-hidden="true" />
                <span>Currently exploring</span>
              </div>

              {/* Three list items slide in from the left, staggered. On hover each arrow moves 4px right */}
              <motion.ul
                variants={listContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={DEFAULT_VIEWPORT}
                className="space-y-3 font-medium text-sm text-charcoal/90"
              >
                <motion.li variants={listItemVariants} className="flex items-start gap-2 group cursor-default">
                  <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform duration-200" />
                  <span>Agentic AI & LLM Applications</span>
                </motion.li>
                <motion.li variants={listItemVariants} className="flex items-start gap-2 group cursor-default">
                  <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform duration-200" />
                  <span>Scalable Full-Stack Systems</span>
                </motion.li>
                <motion.li variants={listItemVariants} className="flex items-start gap-2 group cursor-default">
                  <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform duration-200" />
                  <span>AI for Real-World Impact</span>
                </motion.li>
              </motion.ul>
            </div>
          </div>
        </div>

        {/* Academic Details, Coursework & Information Column */}
        <div className="pt-10 border-t border-warm-border">
          <Reveal delay={0.15}>
            <Card elevated className="p-6 sm:p-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-charcoal/80 font-semibold border-b border-warm-border pb-3 mb-6">
              Academic & Profile Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              {/* Core Information */}
              <div className="lg:col-span-7 space-y-3.5 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-grey">Location: </span>
                    <span className="font-medium text-charcoal">{profileData.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-grey">Degree: </span>
                    <span className="font-medium text-charcoal">{education.degree}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-4 h-4 flex items-center justify-center font-mono text-xs text-burnt-orange font-bold mt-0.5 shrink-0">🏛</span>
                  <div>
                    <span className="text-muted-grey">Institution: </span>
                    <span className="font-medium text-charcoal">{education.institution}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-grey">Expected Graduation: </span>
                    <span className="font-medium text-charcoal">{education.expectedGraduation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                  <div>
                    <span className="text-muted-grey">Academic Performance: </span>
                    <span className="font-semibold text-burnt-orange">{education.cgpa}</span>
                  </div>
                </div>
              </div>

              {/* Open to Badges & Coursework */}
              <div className="lg:col-span-5 space-y-5 lg:border-l lg:border-warm-border/80 lg:pl-8">
                <div>
                  <div className="text-xs text-muted-grey mb-2 font-medium">Open to:</div>
                  <div className="flex flex-wrap gap-2">
                    {education.openTo.map((item) => (
                      <Tag key={item} variant="mono">
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-warm-border/60">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-grey mb-2.5 font-medium">
                    Relevant Coursework:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {education.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 font-mono text-[11px] bg-ivory text-charcoal/80 rounded border border-warm-border"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
      </div>
    </section>
  );
};
