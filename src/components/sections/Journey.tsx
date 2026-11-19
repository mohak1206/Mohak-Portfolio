import React, { useRef } from 'react';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { journeyData } from '../../data/journey';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionNumeral } from '../ui/SectionNumeral';
import { SplitLines } from '../ui/SplitLines';
import { SpotlightOverlay } from '../ui/SpotlightOverlay';
import { useSpotlight } from '../../hooks/useSpotlight';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DEFAULT_VIEWPORT, EASING } from '../../lib/animation';

interface JourneyStepCardProps {
  step: (typeof journeyData.steps)[0];
  idx: number;
  prefersReducedMotion: boolean;
}

const JourneyStepCard: React.FC<JourneyStepCardProps> = ({ step, idx, prefersReducedMotion }) => {
  const { ref, isHovered, bind } = useSpotlight<HTMLDivElement>();

  return (
    <m.div
      ref={ref}
      onPointerEnter={bind.onPointerEnter}
      onPointerMove={bind.onPointerMove}
      onPointerLeave={bind.onPointerLeave}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : idx * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative overflow-hidden bg-card-surface rounded-[6px] border border-warm-border p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-burnt-orange shadow-sm"
    >
      <SpotlightOverlay isHovered={isHovered} />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Step Number & Circle Marker */}
          <div className="flex items-center justify-between mb-4">
            <m.div
              initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.12 + 0.1 }}
              className="font-serif text-4xl sm:text-[56px] leading-none font-semibold text-burnt-orange transition-transform duration-300 group-hover:-translate-y-1"
            >
              {step.number}
            </m.div>

            <div
              className="w-3.5 h-3.5 rounded-full bg-ivory border-2 border-burnt-orange shadow-sm"
              aria-hidden="true"
            />
          </div>

          {/* Uppercase Mono Label */}
          <div className="font-mono text-xs uppercase tracking-wider text-muted-grey font-semibold">
            {step.label}
          </div>

          {/* Serif Subtitle */}
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal mt-1.5 mb-3">
            {step.subtitle}
          </h3>

          {/* Body Text */}
          <p className="text-sm text-muted-grey leading-relaxed">
            {step.body}
          </p>
        </div>

        {/* Bottom Tag & Arrow */}
        <div className="border-t border-warm-border/80 pt-4 mt-6 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-charcoal/80">
          <span className="font-semibold text-charcoal">{step.tag}</span>
          <ArrowRight className="w-4 h-4 text-burnt-orange transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </m.div>
  );
};

export const Journey: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-label="My Journey"
      className="py-20 lg:py-28 bg-cream border-b border-warm-border relative overflow-hidden"
    >
      {/* Giant Outlined Section Numeral 02 */}
      <SectionNumeral numeral="02" sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <SectionLabel label={journeyData.heading.label} />

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal leading-[1.15]">
            <SplitLines
              lines={[
                <span key="journey-heading">
                  {journeyData.heading.titleRegular}{' '}
                  <m.span
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={DEFAULT_VIEWPORT}
                    transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.35, ease: EASING }}
                    className="font-serif italic text-burnt-orange font-normal"
                  >
                    {journeyData.heading.titleItalic}
                  </m.span>
                </span>,
              ]}
            />
          </h2>

          <m.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={DEFAULT_VIEWPORT}
            transition={{ duration: 0.5, delay: 0.1, ease: EASING }}
            className="text-muted-grey text-base sm:text-lg max-w-[60ch] leading-relaxed"
          >
            {journeyData.intro}
          </m.p>
        </div>

        {/* 3 Journey Cards Composition with Connecting Line */}
        <div className="relative">
          {/* Connecting Line - Desktop (Horizontal) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] z-0 pointer-events-none">
            <m.div
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full h-full bg-warm-border origin-left"
            />
          </div>

          {/* Connecting Line - Mobile (Vertical) */}
          <div className="md:hidden absolute top-8 bottom-8 left-8 w-[2px] z-0 pointer-events-none">
            <m.div
              initial={prefersReducedMotion ? false : { scaleY: 0 }}
              whileInView={prefersReducedMotion ? undefined : { scaleY: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full h-full bg-warm-border origin-top"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {journeyData.steps.map((step, idx) => (
              <JourneyStepCard
                key={step.number}
                step={step}
                idx={idx}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Closing Paragraph and Large Editorial Quote */}
        <div className="pt-6 space-y-8 text-center">
          <m.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-muted-grey text-base sm:text-lg max-w-[65ch] mx-auto leading-relaxed"
          >
            {journeyData.closing}
          </m.p>

          <m.blockquote
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] text-charcoal max-w-4xl mx-auto px-4 [text-wrap:balance]"
          >
            <span>{journeyData.quote.prefix}</span>
            <m.span
              className="relative inline-block font-serif italic text-charcoal"
              initial={prefersReducedMotion ? false : { backgroundSize: '0% 40%' }}
              whileInView={{ backgroundSize: '100% 40%' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.4, ease: EASING }}
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(201, 79, 23, 0.28), rgba(201, 79, 23, 0.28))',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 88%',
                paddingLeft: '4px',
                paddingRight: '4px',
              }}
            >
              {journeyData.quote.highlight}
            </m.span>
            <span>{journeyData.quote.suffix}</span>
          </m.blockquote>
        </div>
      </div>
    </section>
  );
};

