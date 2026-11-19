import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Reveal } from '../components/ui/Reveal';
import { SplitLines } from '../components/ui/SplitLines';
import { getAllNotes, type NoteItem } from '../lib/notes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../lib/animation';

export const NotesPage: React.FC = () => {
  usePageMeta({
    title: 'Blogs',
    description:
      'Short write-ups and deep-dives about the AI/ML and software projects I build and lessons learned.',
    path: '/blogs',
  });

  const prefersReduced = useReducedMotion();
  const allNotes = useMemo(() => getAllNotes(), []);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Compute unique tags from loaded notes
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const note of allNotes) {
      for (const t of note.tags) {
        set.add(t);
      }
    }
    return ['All', ...Array.from(set)];
  }, [allNotes]);

  const filteredNotes = useMemo(() => {
    if (selectedTag === 'All') return allNotes;
    return allNotes.filter((n) => n.tags.includes(selectedTag));
  }, [allNotes, selectedTag]);

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col selection:bg-burnt-orange selection:text-white">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <Reveal>
            <div className="mb-12 space-y-4">
              <SectionLabel label="— BLOGS" />
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-charcoal tracking-tight">
                <SplitLines
                  lines={[
                    <span key="notes-h1">
                      Things I’ve{' '}
                      <m.span
                        initial={prefersReduced ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={DEFAULT_VIEWPORT}
                        transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.35, ease: EASING }}
                        className="italic text-burnt-orange font-normal"
                      >
                        learned
                      </m.span>{' '}
                      building.
                    </span>,
                  ]}
                />
              </h1>
              <m.p
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={DEFAULT_VIEWPORT}
                transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.15, ease: EASING }}
                className="text-muted-grey text-base sm:text-lg max-w-2xl leading-relaxed"
              >
                Technical articles and write-ups about the projects I build and what went wrong on the way.
              </m.p>
            </div>
          </Reveal>

          {/* Tag Filter Chips: slide in */}
          {tags.length > 2 && (
            <m.div
              initial={prefersReduced ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.15, ease: EASING }}
              className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none select-none"
              role="tablist"
              aria-label="Filter blogs by tag"
            >
              {tags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedTag(tag)}
                    className={`relative px-3.5 py-1.5 text-xs font-mono rounded-full border transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white border-burnt-orange'
                        : 'text-charcoal/80 border-warm-border hover:border-burnt-orange/50 bg-card-surface'
                    }`}
                  >
                    {isActive && (
                      <m.span
                        layoutId="activeNotesTag"
                        className="absolute inset-0 bg-burnt-orange rounded-full -z-10"
                        transition={
                          prefersReduced
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 400, damping: 30 }
                        }
                      />
                    )}
                    <span className="relative z-10">{tag}</span>
                  </button>
                );
              })}
            </m.div>
          )}

          {/* Notes Grid / List */}
          {filteredNotes.length === 0 ? (
            <div className="py-20 text-center space-y-4 border border-dashed border-warm-border rounded-lg bg-card-surface/40">
              <p className="font-serif text-xl sm:text-2xl text-charcoal">
                First blogs coming soon.
              </p>
              <p className="text-muted-grey text-sm max-w-md mx-auto">
                I’m currently writing up deep dives on YOLOv8 computer vision models and full-stack architecture.
              </p>
              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-burnt-orange hover:text-light-orange"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to homepage</span>
                </Link>
              </div>
            </div>
          ) : (
            <m.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredNotes.map((note) => (
                  <m.article
                    key={note.slug}
                    layout
                    initial={prefersReduced ? false : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: EASING }}
                    className="group relative bg-card-surface border border-warm-border hover:border-burnt-orange/60 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      {/* Meta header: Date + Reading Time + Draft Badge */}
                      <div className="flex items-center justify-between text-xs font-mono text-muted-grey">
                        <span>{note.date}</span>
                        <div className="flex items-center gap-2">
                          {note.draft && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold">
                              DRAFT
                            </span>
                          )}
                          <span>{note.readingTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-charcoal group-hover:text-burnt-orange transition-colors">
                        <Link to={`/blogs/${note.slug}`} className="focus:outline-none">
                          <span className="absolute inset-0" aria-hidden="true" />
                          {note.title}
                        </Link>
                      </h2>

                      {/* Summary */}
                      <p className="text-muted-grey text-sm leading-relaxed line-clamp-2">
                        {note.summary}
                      </p>
                    </div>

                    {/* Footer: Tags + Arrow */}
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
              </AnimatePresence>
            </m.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotesPage;

