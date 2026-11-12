import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { getPublishedNotes } from '../../lib/notes';
import { SectionLabel } from '../ui/SectionLabel';
import { Reveal } from '../ui/Reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

export const FromNotes: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const publishedNotes = useMemo(() => getPublishedNotes().slice(0, 2), []);

  // If there are no published notes, render nothing
  if (publishedNotes.length === 0) {
    return null;
  }

  return (
    <section
      id="from-notes"
      aria-label="Recent Notes"
      className="relative py-20 lg:py-24 bg-ivory border-t border-warm-border/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel label="— FROM THE NOTES" />
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-charcoal tracking-tight mt-2">
                Recent{' '}
                <span className="italic text-burnt-orange font-normal">
                  write-ups.
                </span>
              </h2>
            </div>
            <Link
              to="/notes"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-burnt-orange hover:text-light-orange transition-colors"
            >
              <span>All notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedNotes.map((note, index) => (
            <m.article
              key={note.slug}
              initial={prefersReduced ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={DEFAULT_VIEWPORT}
              transition={{
                duration: 0.35,
                delay: prefersReduced ? 0 : index * 0.1,
                ease: EASING,
              }}
              className="group relative bg-card-surface border border-warm-border hover:border-burnt-orange/60 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-grey">
                  <span>{note.date}</span>
                  <span>{note.readingTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal group-hover:text-burnt-orange transition-colors">
                  <Link to={`/notes/${note.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {note.title}
                  </Link>
                </h3>

                <p className="text-muted-grey text-sm leading-relaxed line-clamp-2">
                  {note.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-warm-border/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream/70 border border-warm-border text-charcoal/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-muted-grey group-hover:text-burnt-orange transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FromNotes;

