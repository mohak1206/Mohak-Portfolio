import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { m, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Copy,
  Check,
  Calendar,
  Clock,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getAllNotes, getNoteBySlug, type NoteItem } from '../lib/notes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SplitLines } from '../components/ui/SplitLines';
import { EASING, DEFAULT_VIEWPORT } from '../lib/animation';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const NoteDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const note = useMemo(() => (slug ? getNoteBySlug(slug) : undefined), [slug]);
  const allNotes = useMemo(() => getAllNotes(), []);

  // Previous & next notes navigation
  const { prevNote, nextNote } = useMemo(() => {
    if (!note) return { prevNote: undefined, nextNote: undefined };
    const idx = allNotes.findIndex((n) => n.slug === note.slug);
    return {
      prevNote: idx > 0 ? allNotes[idx - 1] : undefined,
      nextNote: idx < allNotes.length - 1 ? allNotes[idx + 1] : undefined,
    };
  }, [note, allNotes]);

  // Page meta & SEO
  usePageMeta({
    title: note?.title || 'Blog Post',
    description: note?.summary || '',
    path: `/blogs/${slug || ''}`,
  });

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [htmlContent, setHtmlContent] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract table of contents headings
  const tocItems: TocItem[] = useMemo(() => {
    if (!note?.content) return [];
    const headings: TocItem[] = [];
    const lines = note.content.split('\n');
    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);
      if (h2Match) {
        const text = h2Match[1].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        headings.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        headings.push({ id, text, level: 3 });
      }
    }
    return headings;
  }, [note?.content]);

  // Convert Markdown to HTML via dynamically imported marked
  useEffect(() => {
    if (!note?.content) return;
    let isMounted = true;

    import('marked').then(({ marked }) => {
      if (!isMounted) return;
      // Add id attributes to headings so TOC links jump to them
      let rawHtml = marked.parse(note.content, { async: false }) as string;

      // Inject IDs into h2 and h3 tags
      rawHtml = rawHtml.replace(/<h([23])>(.*?)<\/h\1>/gi, (match, level, text) => {
        const plainText = text.replace(/<[^>]+>/g, '').trim();
        const id = plainText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        return `<h${level} id="${id}">${text}</h${level}>`;
      });

      setHtmlContent(rawHtml);
    });

    return () => {
      isMounted = false;
    };
  }, [note?.content]);

  // Add Copy button to pre/code blocks and enhance tables
  useEffect(() => {
    if (!contentRef.current || !htmlContent) return;

    const preElements = contentRef.current.querySelectorAll('pre');
    preElements.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return;

      pre.style.position = 'relative';
      const btn = document.createElement('button');
      btn.className =
        'code-copy-btn absolute top-2.5 right-2.5 px-2 py-1 text-[11px] font-mono rounded bg-card-surface/90 hover:bg-card-surface border border-warm-border text-charcoal/80 transition-colors shadow-2xs cursor-pointer select-none';
      btn.innerText = 'Copy';
      btn.setAttribute('aria-label', 'Copy code snippet');

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          btn.innerText = 'Copied';
          setTimeout(() => {
            btn.innerText = 'Copy';
          }, 1500);
        } catch {
          // fallback
        }
      });

      pre.appendChild(btn);
    });

    // Wrap tables for horizontal scroll
    const tables = contentRef.current.querySelectorAll('table');
    tables.forEach((table) => {
      if (table.parentElement?.classList.contains('table-scroll-wrapper')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll-wrapper overflow-x-auto my-6 border border-warm-border rounded-lg';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // Subtle fade up for headings, paragraphs, and code blocks
    if (!prefersReduced && contentRef.current) {
      const blocks = contentRef.current.querySelectorAll('h2, h3, p, pre, blockquote');
      const blockObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.style.opacity = '1';
              target.style.transform = 'translateY(0px)';
              blockObserver.unobserve(target);
            }
          });
        },
        { rootMargin: '-40px 0px -40px 0px' }
      );

      blocks.forEach((el) => {
        const h = el as HTMLElement;
        h.style.opacity = '0';
        h.style.transform = 'translateY(12px)';
        h.style.transition =
          'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        blockObserver.observe(h);
      });

      return () => blockObserver.disconnect();
    }
  }, [htmlContent, prefersReduced]);

  // IntersectionObserver for TOC highlight
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
      }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems, htmlContent]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-ivory text-charcoal flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-3xl text-charcoal">Blog post not found</h1>
            <p className="text-muted-grey text-sm">
              The article you are looking for doesn't exist or is still being written.
            </p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-burnt-orange hover:text-light-orange"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all blogs</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // BlogPosting JSON-LD
  const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://mohakagrawal.dev').replace(/\/$/, '');
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    author: {
      '@type': 'Person',
      name: 'Mohak Agrawal',
      url: siteUrl,
    },
    url: `${siteUrl}/blogs/${note.slug}`,
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col selection:bg-burnt-orange selection:text-white">
      {/* BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Reading Progress Bar */}
      <m.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-burnt-orange origin-left z-50 pointer-events-none"
        style={{ scaleX: prefersReduced ? 1 : scaleX }}
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8 max-w-[68ch] mx-auto">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-grey hover:text-burnt-orange transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All blogs</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            {/* Article Content Column (68ch) */}
            <article className="xl:col-span-8 max-w-[68ch] mx-auto w-full">
              {/* Header */}
              <header className="mb-10 space-y-4 pb-8 border-b border-warm-border/60">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-grey">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-burnt-orange" />
                    <span>{note.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-burnt-orange" />
                    <span>{note.readingTime}</span>
                  </span>
                  {note.draft && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold">
                      DRAFT
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.2] text-charcoal tracking-tight">
                  <SplitLines lines={[note.title]} />
                </h1>

                <p className="text-muted-grey text-base sm:text-lg leading-relaxed italic">
                  {note.summary}
                </p>

                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {note.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-card-surface border border-warm-border text-charcoal/80"
                      >
                        <Tag className="w-3 h-3 text-burnt-orange" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Editorial Markdown Body */}
              <div
                ref={contentRef}
                className="prose-editorial text-base sm:text-[18px] leading-[1.75] font-sans text-charcoal/90 space-y-6"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Share Row */}
              <div className="mt-12 pt-8 border-t border-warm-border/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-mono border border-warm-border hover:border-burnt-orange bg-card-surface text-charcoal/80 hover:text-burnt-orange transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied URL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-xs font-mono border border-warm-border hover:border-burnt-orange bg-card-surface text-charcoal/80 hover:text-burnt-orange transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share on LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-muted-grey" />
                  </a>
                </div>

                <Link
                  to="/blogs"
                  className="text-xs font-mono font-medium text-burnt-orange hover:text-light-orange underline underline-offset-4"
                >
                  Back to all blogs
                </Link>
              </div>

              {/* Prev / Next Note Cards */}
              {/* Previous / Next Note Navigation: slide in */}
              <m.div
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={DEFAULT_VIEWPORT}
                transition={{ duration: 0.5, ease: EASING }}
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {prevNote ? (
                  <Link
                    to={`/blogs/${prevNote.slug}`}
                    className="p-4 rounded-lg border border-warm-border hover:border-burnt-orange/60 bg-card-surface transition-all group flex flex-col justify-between hover:-translate-y-1 hover:shadow-sm"
                  >
                    <span className="text-[10px] font-mono text-muted-grey uppercase tracking-wider flex items-center gap-1 mb-1">
                      <ArrowLeft className="w-3 h-3" />
                      <span>Previous</span>
                    </span>
                    <span className="font-serif text-sm sm:text-base font-normal text-charcoal group-hover:text-burnt-orange transition-colors line-clamp-1">
                      {prevNote.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextNote && (
                  <Link
                    to={`/blogs/${nextNote.slug}`}
                    className="p-4 rounded-lg border border-warm-border hover:border-burnt-orange/60 bg-card-surface transition-all group flex flex-col justify-between text-right hover:-translate-y-1 hover:shadow-sm"
                  >
                    <span className="text-[10px] font-mono text-muted-grey uppercase tracking-wider flex items-center justify-end gap-1 mb-1">
                      <span>Next</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="font-serif text-sm sm:text-base font-normal text-charcoal group-hover:text-burnt-orange transition-colors line-clamp-1">
                      {nextNote.title}
                    </span>
                  </Link>
                )}
              </m.div>
            </article>

            {/* Desktop Sticky Table of Contents (>= 1100px) with smooth active marker */}
            {tocItems.length > 0 && (
              <aside className="hidden xl:block xl:col-span-4 sticky top-32 pl-6 border-l border-warm-border/60">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-grey block">
                    On this page
                  </span>
                  <nav className="space-y-1.5 relative" aria-label="Table of contents">
                    {tocItems.map((item) => {
                      const isActive = activeTocId === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`relative block text-xs font-mono leading-relaxed transition-colors ${
                            item.level === 3 ? 'pl-3' : ''
                          } ${
                            isActive
                              ? 'text-burnt-orange font-bold'
                              : 'text-charcoal/70 hover:text-burnt-orange'
                          }`}
                        >
                          {isActive && (
                            <m.span
                              layoutId="activeTocMarker"
                              className="absolute -left-[25px] top-1 bottom-1 w-[2px] bg-burnt-orange rounded-full"
                              transition={
                                prefersReduced
                                  ? { duration: 0 }
                                  : { type: 'spring', stiffness: 350, damping: 30 }
                              }
                            />
                          )}
                          {item.text}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NoteDetailPage;

