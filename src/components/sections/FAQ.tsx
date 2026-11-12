import React, { useState, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqData, type FAQItem } from '../../data/faq';
import { SectionLabel } from '../ui/SectionLabel';
import { Reveal } from '../ui/Reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

export const FAQ: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Items with TODO are hidden in production
  const isProd = import.meta.env.PROD;
  const visibleFaqs: FAQItem[] = faqData.filter(
    (item) => !isProd || !item.answer.includes('TODO')
  );

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % visibleFaqs.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + visibleFaqs.length) % visibleFaqs.length;
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttonRefs.current[visibleFaqs.length - 1]?.focus();
    }
  };

  // Structured Data (FAQPage JSON-LD)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: visibleFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative py-20 lg:py-28 bg-ivory border-t border-warm-border/60 overflow-hidden"
    >
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center space-y-4 mb-14">
            <SectionLabel label="— WORKING WITH ME" centered twoSided />
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-charcoal tracking-tight">
              Questions,{' '}
              <span className="italic text-burnt-orange font-normal">
                answered.
              </span>
            </h2>
            <p className="text-muted-grey text-base sm:text-lg max-w-xl mx-auto">
              Clear answers on availability, collaboration process, tech stack, and what it’s like to work with me.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3" role="presentation">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <m.div
                key={faq.id}
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={DEFAULT_VIEWPORT}
                transition={{
                  duration: 0.35,
                  delay: prefersReduced ? 0 : index * 0.05,
                  ease: EASING,
                }}
                className="bg-card-surface border border-warm-border rounded-lg overflow-hidden transition-colors hover:border-burnt-orange/50"
              >
                <button
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  id={`faq-btn-${faq.id}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 select-none"
                >
                  <span className="font-serif text-lg sm:text-xl font-normal text-charcoal group-hover:text-burnt-orange transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-warm-border text-charcoal/80 bg-ivory transition-transform duration-200"
                    style={{
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    <Plus className="w-4 h-4 stroke-[2]" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      initial={
                        prefersReduced
                          ? false
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={
                        prefersReduced
                          ? undefined
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.25, ease: EASING }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-muted-grey text-sm sm:text-base leading-relaxed border-t border-warm-border/40 mt-1 pt-3">
                        {faq.answer}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
