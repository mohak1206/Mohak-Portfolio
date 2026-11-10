import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { journeyData } from '../../data/journey';
import { SectionLabel } from '../ui/SectionLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Journey: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="journey"
      aria-label="My Journey"
      className="py-20 lg:py-28 bg-cream border-t border-b border-warm-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <SectionLabel label={journeyData.heading.label} />

          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal leading-[1.15]"
          >
            {journeyData.heading.titleRegular}
            <span className="font-serif italic text-burnt-orange font-normal">
              {journeyData.heading.titleItalic}
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-grey text-base sm:text-lg max-w-[60ch] leading-relaxed"
          >
            {journeyData.intro}
          </motion.p>
        </div>

        {/* 3 Journey Cards Composition with Connecting Line */}
        <div className="relative">
          {/* Connecting Line - Desktop (Horizontal) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] z-0 pointer-events-none">
            <motion.div
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full h-full bg-warm-border origin-left"
            />
          </div>

          {/* Connecting Line - Mobile (Vertical) */}
          <div className="md:hidden absolute top-8 bottom-8 left-8 w-[2px] z-0 pointer-events-none">
            <motion.div
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
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: prefersReducedMotion ? 0 : idx * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group bg-white rounded-[6px] border border-warm-border p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-light-orange shadow-sm"
              >
                <div>
                  {/* Step Number & Circle Marker */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
                      whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.12 + 0.1 }}
                      className="font-serif text-4xl sm:text-[56px] leading-none font-semibold text-burnt-orange transition-transform duration-300 group-hover:-translate-y-1"
                    >
                      {step.number}
                    </motion.div>

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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Paragraph and Large Editorial Quote */}
        <div className="pt-6 space-y-8 text-center">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-muted-grey text-base sm:text-lg max-w-[65ch] mx-auto leading-relaxed"
          >
            {journeyData.closing}
          </motion.p>

          <motion.blockquote
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] text-charcoal max-w-4xl mx-auto px-4 [text-wrap:balance]"
          >
            <span>{journeyData.quote.prefix}</span>
            <span
              className="relative inline-block font-serif italic text-charcoal"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(201, 79, 23, 0.28), rgba(201, 79, 23, 0.28))',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 88%',
                backgroundSize: prefersReducedMotion ? '100% 40%' : '100% 40%',
                paddingLeft: '4px',
                paddingRight: '4px',
              }}
            >
              {journeyData.quote.highlight}
            </span>
            <span>{journeyData.quote.suffix}</span>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
};
