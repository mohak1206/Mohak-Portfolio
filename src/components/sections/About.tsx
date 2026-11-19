import React, { useRef } from 'react';
import { m } from 'framer-motion';
import {
  FolderCheck,
  Briefcase,
  Users,
  GraduationCap,
  MapPin,
  ArrowRight,
  Play,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionNumeral } from '../ui/SectionNumeral';
import { Button } from '../ui/Button';
import { Magnetic } from '../ui/Magnetic';
import { AvailabilityBadge } from '../ui/AvailabilityBadge';
import { CountUp } from '../ui/CountUp';
import { SplitLines } from '../ui/SplitLines';
import { scrollToTarget } from '../../lib/lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT, staggerContainerVariants } from '../../lib/animation';

export const About: React.FC = () => {
  const { aboutIntro, stats } = profileData;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const completedProjectsCount =
    projectsData.filter((p) => p.status === 'Completed').length.toString() || stats.projectsCount;

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget('projects', -80);
  };

  const statsCards = [
    {
      id: 'projects',
      value: completedProjectsCount,
      label: stats.projectsLabel,
      icon: FolderCheck,
      isFilledOrange: true,
      decimals: 0,
    },
    {
      id: 'internships',
      value: stats.internshipsCount,
      label: stats.internshipsLabel,
      icon: Briefcase,
      isFilledOrange: false,
      decimals: 0,
    },
    {
      id: 'events',
      value: stats.eventsCount,
      label: stats.eventsLabel,
      icon: Users,
      isFilledOrange: false,
      decimals: 0,
    },
    {
      id: 'cgpa',
      value: stats.cgpaScore,
      label: stats.cgpaLabel,
      icon: GraduationCap,
      isCharcoal: true,
      decimals: 1,
    },
  ];

  const renderStatsGrid = () => (
    <div className="grid grid-cols-2 gap-4 w-full">
      {statsCards.map((card, idx) => {
        const IconComponent = card.icon;

        let cardBgClass = 'bg-card-surface border border-warm-border text-charcoal';
        let numColorClass = 'text-burnt-orange';
        let iconBoxClass =
          'bg-cream/70 border border-warm-border text-burnt-orange group-hover:bg-burnt-orange group-hover:text-white group-hover:border-burnt-orange';
        let labelClass = 'text-muted-grey';
        let lineClass = 'bg-burnt-orange/60';

        if (card.isFilledOrange) {
          cardBgClass = 'bg-burnt-orange text-white border border-burnt-orange';
          numColorClass = 'text-white';
          iconBoxClass =
            'bg-white/20 text-white border border-white/20 group-hover:bg-white group-hover:text-burnt-orange';
          labelClass = 'text-white/90';
          lineClass = 'bg-white/60';
        } else if (card.isCharcoal) {
          cardBgClass =
            'bg-charcoal text-ivory border border-charcoal dark:bg-[var(--surface-2)] dark:border-warm-border dark:text-charcoal';
          numColorClass = 'text-ivory dark:text-charcoal';
          iconBoxClass =
            'bg-white/10 text-burnt-orange border border-white/15 dark:bg-cream/60 dark:border-warm-border group-hover:bg-burnt-orange group-hover:text-white group-hover:border-burnt-orange';
          labelClass = 'text-ivory/80 dark:text-muted-grey';
          lineClass = 'bg-burnt-orange';
        }

        return (
          <m.div
            key={card.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{
              duration: 0.45,
              delay: prefersReducedMotion ? 0 : idx * 0.08,
              ease: EASING,
            }}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            className={`group relative p-5 sm:p-6 rounded-xl flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md cursor-default select-none ${cardBgClass}`}
          >
            {/* Top row: Icon in rounded square */}
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 ${iconBoxClass}`}
              >
                <IconComponent className="w-4 h-4 stroke-[2]" />
              </div>
            </div>

            {/* Middle: Large number with count-up & animated underline */}
            <div className="space-y-1">
              <div
                className={`font-serif text-[clamp(38px,4.5vw,56px)] leading-none font-normal tracking-tight ${numColorClass}`}
              >
                <CountUp value={card.value} decimals={card.decimals} />
              </div>

              {/* Animated thin orange line under number */}
              <m.div
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={DEFAULT_VIEWPORT}
                transition={{
                  duration: 0.55,
                  delay: prefersReducedMotion ? 0 : 0.2 + idx * 0.08,
                  ease: EASING,
                }}
                className={`w-12 h-[2px] rounded-full origin-left ${lineClass}`}
                aria-hidden="true"
              />
            </div>

            {/* Bottom: Small mono uppercase label */}
            <div className={`mt-3 text-[11px] font-mono uppercase tracking-wider font-medium ${labelClass}`}>
              {card.label}
            </div>
          </m.div>
        );
      })}
    </div>
  );

  const renderFactChips = () => (
    <m.div
      variants={staggerContainerVariants(0.08, 0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      className="flex flex-wrap gap-2.5 w-full pt-1"
    >
      {[
        { icon: MapPin, text: 'Maharashtra, India' },
        { icon: GraduationCap, text: 'B.Tech AIML, 2028' },
        { icon: Briefcase, text: 'Software Intern, RigAI' },
      ].map((chip) => {
        const IconComponent = chip.icon;
        return (
          <m.div
            key={chip.text}
            variants={
              prefersReducedMotion
                ? undefined
                : {
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASING } },
                  }
            }
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono text-charcoal/90 bg-card-surface hover:bg-cream border border-warm-border rounded-full shadow-2xs transition-colors"
          >
            <IconComponent className="w-3.5 h-3.5 text-burnt-orange shrink-0" />
            <span>{chip.text}</span>
          </m.div>
        );
      })}
    </m.div>
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Me"
      className="relative py-20 lg:py-28 bg-ivory border-b border-warm-border overflow-hidden"
    >
      {/* Giant Outlined Section Numeral 01 behind heading at low opacity */}
      <SectionNumeral numeral="01" sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* DESKTOP LAYOUT (from 1024px): Two balanced columns with ~56px gap */}
        <div className="hidden lg:grid grid-cols-12 gap-14 items-start">
          
          {/* LEFT COLUMN (~5/12): 1) Stats Bento Grid, 2) Three Fact Chips */}
          <div className="col-span-5 space-y-4">
            {renderStatsGrid()}
            {renderFactChips()}
          </div>

          {/* RIGHT COLUMN (~7/12): Label, Heading, Kept Paragraph, Currently Exploring, Pill, Buttons + Tour */}
          <div className="col-span-7 space-y-6">
            <SectionLabel label="— ABOUT ME" />

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-charcoal font-normal tracking-tight">
              A Developer who{' '}
              <span className="italic text-burnt-orange font-normal">
                Builds, Learns and Leads.
              </span>
            </h2>

            {/* Kept aboutIntro paragraph with fade-up */}
            <m.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={DEFAULT_VIEWPORT}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
              className="text-muted-grey text-base sm:text-lg leading-relaxed"
            >
              {aboutIntro}
            </m.p>

            {/* "Currently exploring" card: items slide in from left */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={DEFAULT_VIEWPORT}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.2, ease: EASING }}
              className="p-5 rounded-xl border border-warm-border bg-card-surface shadow-2xs space-y-3.5"
            >
              <div className="flex items-center gap-2.5 text-sm font-semibold text-charcoal">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-burnt-orange dot-pulse-slow inline-block shrink-0"
                  aria-hidden="true"
                />
                <span>Currently exploring</span>
              </div>

              <ul className="space-y-2.5 font-medium text-sm text-charcoal/90">
                {[
                  'Agentic AI & LLM Applications',
                  'Scalable Full-Stack Systems',
                  'AI for Real-World Impact',
                ].map((item, idx) => (
                  <m.li
                    key={item}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={DEFAULT_VIEWPORT}
                    transition={{
                      duration: 0.4,
                      delay: prefersReducedMotion ? 0 : 0.25 + idx * 0.1,
                      ease: EASING,
                    }}
                    className="flex items-center gap-2 group cursor-default"
                  >
                    <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    <span>{item}</span>
                  </m.li>
                ))}
              </ul>
            </m.div>

            {/* Availability pill */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={DEFAULT_VIEWPORT}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.25, ease: EASING }}
            >
              <AvailabilityBadge />
            </m.div>

            {/* CTAs & 60-Second Tour: buttons fade up */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={DEFAULT_VIEWPORT}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.3, ease: EASING }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <Magnetic>
                <Button asAnchor href="#projects" onClick={scrollToProjects} variant="primary" size="md">
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  asAnchor
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </Button>
              </Magnetic>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-quick-tour'))}
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-grey hover:text-burnt-orange transition-colors cursor-pointer select-none group focus:outline-none focus-visible:ring-1 focus-visible:ring-burnt-orange rounded py-0.5 px-1 ml-1"
                aria-label="Start 60-second portfolio tour"
              >
                <span className="w-5 h-5 rounded-full bg-cream border border-warm-border group-hover:border-burnt-orange flex items-center justify-center transition-colors shadow-2xs">
                  <Play className="w-2.5 h-2.5 fill-current text-burnt-orange ml-0.5" />
                </span>
                <span className="draw-underline-link py-0.5">60-second tour</span>
              </button>
            </m.div>
          </div>

        </div>

        {/* TABLET AND MOBILE LAYOUT (<1024px): Single column stack */}
        {/* Order: label, heading, paragraph, stats grid (2x2), chips, Currently exploring, pill, buttons, tour */}
        <div className="lg:hidden space-y-6">
          <SectionLabel label="— ABOUT ME" />

          <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-charcoal font-normal tracking-tight">
            A Developer who{' '}
            <span className="italic text-burnt-orange font-normal">
              Builds, Learns and Leads.
            </span>
          </h2>

          <m.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
            className="text-muted-grey text-base leading-relaxed"
          >
            {aboutIntro}
          </m.p>

          {/* Stats grid (2x2) */}
          <div className="pt-2">
            {renderStatsGrid()}
          </div>

          {/* Fact chips */}
          {renderFactChips()}

          {/* Currently exploring card */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.2, ease: EASING }}
            className="p-5 rounded-xl border border-warm-border bg-card-surface shadow-2xs space-y-3.5"
          >
            <div className="flex items-center gap-2.5 text-sm font-semibold text-charcoal">
              <span
                className="w-2.5 h-2.5 rounded-full bg-burnt-orange dot-pulse-slow inline-block shrink-0"
                aria-hidden="true"
              />
              <span>Currently exploring</span>
            </div>

            <ul className="space-y-2.5 font-medium text-sm text-charcoal/90">
              {[
                'Agentic AI & LLM Applications',
                'Scalable Full-Stack Systems',
                'AI for Real-World Impact',
              ].map((item, idx) => (
                <m.li
                  key={item}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={DEFAULT_VIEWPORT}
                  transition={{
                    duration: 0.4,
                    delay: prefersReducedMotion ? 0 : 0.25 + idx * 0.1,
                    ease: EASING,
                  }}
                  className="flex items-center gap-2 group cursor-default"
                >
                  <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                  <span>{item}</span>
                </m.li>
              ))}
            </ul>
          </m.div>

          {/* Availability pill */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.25, ease: EASING }}
          >
            <AvailabilityBadge />
          </m.div>

          {/* Buttons and tour */}
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.3, ease: EASING }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <Button asAnchor href="#projects" onClick={scrollToProjects} variant="primary" size="md">
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </Button>

            <Button
              asAnchor
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </Button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-quick-tour'))}
              className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-grey hover:text-burnt-orange transition-colors cursor-pointer select-none group focus:outline-none focus-visible:ring-1 focus-visible:ring-burnt-orange rounded py-0.5 px-1 ml-1"
              aria-label="Start 60-second portfolio tour"
            >
              <span className="w-5 h-5 rounded-full bg-cream border border-warm-border group-hover:border-burnt-orange flex items-center justify-center transition-colors shadow-2xs">
                <Play className="w-2.5 h-2.5 fill-current text-burnt-orange ml-0.5" />
              </span>
              <span className="draw-underline-link py-0.5">60-second tour</span>
            </button>
          </m.div>
        </div>

      </div>
    </section>
  );
};

export default About;
