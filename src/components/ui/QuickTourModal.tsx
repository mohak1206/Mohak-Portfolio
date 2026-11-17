import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  FileText,
  Mail,
  Check,
  Award,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { CountUp } from './CountUp';
import { Button } from './Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollLock } from '../../hooks/useScrollLock';
import { EASING } from '../../lib/animation';

const SLIDE_DURATION = 7000; // 7 seconds per slide

interface QuickTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickTourModal: React.FC<QuickTourModalProps> = ({ isOpen, onClose }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100 for current slide
  const [isPaused, setIsPaused] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const totalSlides = 5;

  // Handle slide advance
  const nextSlide = useCallback(() => {
    setProgress(0);
    setSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setProgress(0);
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const goToSlide = (idx: number) => {
    setProgress(0);
    setSlideIndex(idx);
  };

  useScrollLock(isOpen);

  // Focus management & accessibility attributes on #root
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('aria-hidden', 'true');
      rootEl.setAttribute('inert', '');
    }

    // Reset to first slide
    setSlideIndex(0);
    setProgress(0);

    return () => {
      if (rootEl) {
        rootEl.removeAttribute('aria-hidden');
        rootEl.removeAttribute('inert');
      }
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen]);

  // Story Progress auto-advance timer
  useEffect(() => {
    if (!isOpen || prefersReduced || isPaused) return;

    const stepMs = 50;
    const increment = (stepMs / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (slideIndex < totalSlides - 1) {
            setSlideIndex((s) => s + 1);
            return 0;
          } else {
            return 100;
          }
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isOpen, prefersReduced, isPaused, slideIndex, totalSlides]);

  // Visibility change pause
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const elements = Array.from(focusable).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );
        if (elements.length === 0) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalRef.current) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, nextSlide, prevSlide]);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profileData.email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = profileData.email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${profileData.email}`;
    }
  };

  if (!isOpen || typeof document === 'undefined') return null;

  // Slide content renderers
  const renderSlideContent = () => {
    switch (slideIndex) {
      case 0: // Slide 1: "Who"
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold">
                01 · WHO I AM
              </div>
              <h3 id="tour-slide-title" className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                {profileData.name}
              </h3>
            </div>

            <p className="font-serif text-lg sm:text-xl text-charcoal/90 leading-relaxed italic">
              &ldquo;{profileData.roleTitle} building intelligent software and end-to-end vision systems.&rdquo;
            </p>

            <div className="space-y-3 p-4 bg-cream/70 border border-warm-border rounded-[6px] text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-2 text-charcoal/90">
                <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange mt-2 shrink-0" />
                <span>
                  <strong>Education:</strong> {profileData.education.degree} (expected {profileData.education.expectedGraduation}),{' '}
                  {profileData.education.institution}, {profileData.location}.
                </span>
              </div>
              <div className="flex items-start gap-2 text-charcoal/90">
                <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange mt-2 shrink-0" />
                <span>
                  <strong>Availability:</strong> Open to internships, full-time engineering positions, and collaborative prototypes.
                </span>
              </div>
            </div>
          </div>
        );

      case 1: // Slide 2: "What I build"
        return (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold">
                02 · WHAT I BUILD
              </div>
              <h3 id="tour-slide-title" className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                Flagship Systems
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-grey">
              Production-tested computer vision models and reactive full-stack web platforms.
            </p>

            <div className="space-y-3">
              {projectsData.slice(0, 3).map((p) => (
                <div
                  key={p.slug}
                  className="p-3.5 bg-card-surface border border-warm-border rounded-[6px] flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="min-w-0">
                    <h4 className="font-serif text-base sm:text-lg font-semibold text-charcoal truncate">
                      {p.title.replace(' using YOLOv8', '')}
                    </h4>
                    <p className="text-xs text-muted-grey truncate">{p.oneLiner}</p>
                  </div>
                  {p.highlight && (
                    <span className="shrink-0 px-2.5 py-1 text-[11px] font-mono bg-cream text-burnt-orange font-semibold rounded border border-warm-border">
                      {p.highlight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2: // Slide 3: "Proof"
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold">
                03 · EMPIRICAL PROOF
              </div>
              <h3 id="tour-slide-title" className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                Verified Benchmarks
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-muted-grey">
              Quantitative model evaluations, documented validation metrics, and tested software deployments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-cream/70 border border-warm-border rounded-[6px] text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-burnt-orange">
                  <CountUp value="92.4%" />
                </div>
                <div className="text-xs font-mono text-charcoal font-semibold mt-1">mAP@50</div>
                <div className="text-[11px] text-muted-grey mt-0.5">Signature Detection</div>
              </div>

              <div className="p-4 bg-cream/70 border border-warm-border rounded-[6px] text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-burnt-orange">
                  <CountUp value="66.3%" />
                </div>
                <div className="text-xs font-mono text-charcoal font-semibold mt-1">mAP@50</div>
                <div className="text-[11px] text-muted-grey mt-0.5">Fire & Smoke Detection</div>
              </div>

              <div className="p-4 bg-cream/70 border border-warm-border rounded-[6px] text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                  <CountUp value="5+" />
                </div>
                <div className="text-xs font-mono text-charcoal font-semibold mt-1">Completed</div>
                <div className="text-[11px] text-muted-grey mt-0.5">Projects & Prototypes</div>
              </div>
            </div>
          </div>
        );

      case 3: // Slide 4: "Experience"
        return (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold">
                04 · EXPERIENCE & ROLES
              </div>
              <h3 id="tour-slide-title" className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                Hands-on Impact
              </h3>
            </div>

            <div className="space-y-3 pt-1">
              <div className="p-3.5 bg-card-surface border border-warm-border rounded-[6px] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-burnt-orange">RigAI Software</span>
                  <span className="text-muted-grey">Internship</span>
                </div>
                <h4 className="font-serif text-base font-semibold text-charcoal">
                  AI Platforms Engineering Intern
                </h4>
                <p className="text-xs text-muted-grey leading-relaxed">
                  Engineered agentic tool integrations, LLM workflows, and platform prototypes.
                </p>
              </div>

              <div className="p-3.5 bg-card-surface border border-warm-border rounded-[6px] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-charcoal">Vision Technology (UC17)</span>
                  <span className="text-muted-grey">Apprenticeship</span>
                </div>
                <h4 className="font-serif text-base font-semibold text-charcoal">
                  Computer Vision & Full-Stack Systems
                </h4>
                <p className="text-xs text-muted-grey leading-relaxed">
                  Delivered cross-platform applications, data pipelines, and responsive web portals.
                </p>
              </div>

              <div className="p-3.5 bg-cream/60 border border-warm-border rounded-[6px] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-burnt-orange shrink-0" />
                  <span className="font-semibold text-charcoal">NSS Head</span>
                </div>
                <span className="text-muted-grey">10+ Campus & Community Events</span>
              </div>
            </div>
          </div>
        );

      case 4: // Slide 5: "Say hello"
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold">
                05 · SAY HELLO
              </div>
              <h3 id="tour-slide-title" className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                Let&apos;s Build Together
              </h3>
            </div>

            <p className="text-sm text-muted-grey leading-relaxed">
              Available for software engineering roles, computer-vision prototyping, and full-stack projects. Let&apos;s connect.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                asAnchor
                href={`mailto:${profileData.email}`}
                variant="primary"
                className="w-full justify-center"
              >
                <Mail className="w-4 h-4" />
                <span>Email me directly</span>
              </Button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] border border-warm-border bg-card-surface text-charcoal hover:border-burnt-orange transition-colors text-xs sm:text-sm font-mono cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Copied {profileData.email}!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-muted-grey" />
                    <span>Copy email address</span>
                  </>
                )}
              </button>

              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] border border-warm-border bg-cream hover:bg-cream/80 text-charcoal text-xs sm:text-sm font-mono font-medium transition-colors"
              >
                <FileText className="w-4 h-4 text-burnt-orange" />
                <span>View Resume (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[4px] border border-warm-border bg-card-surface hover:text-burnt-orange text-xs sm:text-sm font-mono transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[4px] border border-warm-border bg-card-surface hover:text-burnt-orange text-xs sm:text-sm font-mono transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center sm:p-4 overflow-hidden pointer-events-auto"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-charcoal/65 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Main Tour Card Container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-slide-title"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        className="relative z-10 w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-[720px] bg-ivory border sm:border-warm-border sm:rounded-[8px] shadow-modal flex flex-col overflow-hidden"
      >
        {/* Top Header: 5 Story Progress Segments & Close Button */}
        <div className="p-4 sm:p-5 border-b border-warm-border/80 bg-ivory shrink-0 space-y-3">
          {/* Progress Segments */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const isPast = idx < slideIndex;
              const isCurrent = idx === slideIndex;
              const segmentFill = isPast ? 100 : isCurrent ? progress : 0;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Jump to slide ${idx + 1} of ${totalSlides}`}
                  className="flex-1 h-1.5 rounded-full bg-warm-border/60 overflow-hidden relative cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-burnt-orange"
                >
                  <div
                    className="h-full bg-burnt-orange transition-all duration-75 ease-linear rounded-full"
                    style={{
                      width: prefersReduced ? (idx <= slideIndex ? '100%' : '0%') : `${segmentFill}%`,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Top Bar with Slide Counter & Close */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-grey">
            <span className="font-semibold text-charcoal">
              {slideIndex + 1} / {totalSlides} · 60s Tour
            </span>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] text-muted-grey">
                {isPaused ? 'Paused' : 'Hover to pause'}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close tour"
                className="p-1 rounded-full text-charcoal hover:bg-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Slide Content Area */}
        <div
          tabIndex={0}
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
          className="p-6 sm:p-8 focus:outline-none scrollbar-gutter-stable"
        >
          <AnimatePresence mode="wait">
            <m.div
              key={slideIndex}
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASING }}
              className="h-full flex flex-col justify-center"
            >
              {renderSlideContent()}
            </m.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="px-5 py-3.5 border-t border-warm-border bg-cream/40 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={prevSlide}
            disabled={slideIndex === 0}
            aria-label="Previous slide"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-medium rounded border border-warm-border bg-card-surface text-charcoal disabled:opacity-40 disabled:cursor-not-allowed hover:border-burnt-orange transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === slideIndex ? 'bg-burnt-orange w-3' : 'bg-warm-border'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>

          {slideIndex < totalSlides - 1 ? (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-medium rounded border border-burnt-orange bg-burnt-orange text-[var(--on-accent)] hover:bg-light-orange transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              aria-label="Finish tour"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-medium rounded border border-burnt-orange bg-burnt-orange text-[var(--on-accent)] hover:bg-light-orange transition-colors cursor-pointer"
            >
              <span>Done</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuickTourModal;
