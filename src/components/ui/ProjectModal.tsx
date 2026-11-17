import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { X, Github, ArrowRight, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { ProjectCover } from './ProjectCover';
import { Card } from './Card';
import { Tag } from './Tag';
import { Button } from './Button';
import { GlossaryTooltip } from './GlossaryTooltip';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollLock } from '../../hooks/useScrollLock';
import { EASING } from '../../lib/animation';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

interface ProjectModalInnerProps {
  project: Project;
  onClose: () => void;
}

const ProjectModalInner: React.FC<ProjectModalInnerProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentScrollerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Scroll locking & Lenis stop
  useScrollLock(true);

  // Background inert & aria-hidden on #root
  useEffect(() => {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('aria-hidden', 'true');
      rootEl.setAttribute('inert', '');
    }
    return () => {
      if (rootEl) {
        rootEl.removeAttribute('aria-hidden');
        rootEl.removeAttribute('inert');
      }
    };
  }, []);

  // Focus management: remember trigger, move focus to content scroller, restore on close
  useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

    // Move focus to content scroller so arrow keys / PageUp / PageDown / Space scroll it immediately
    const rafId = requestAnimationFrame(() => {
      contentScrollerRef.current?.focus({ preventScroll: true });
    });

    return () => {
      cancelAnimationFrame(rafId);
      previouslyFocusedElementRef.current?.focus();
    };
  }, []);

  // Keyboard navigation: Escape to close, Tab / Shift+Tab focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden pointer-events-none"
      role="presentation"
    >
      {/* Backdrop */}
      <m.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm pointer-events-auto"
        aria-hidden="true"
      />

      {/* Panel */}
      <m.div
        key="panel"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: EASING }}
        className="project-modal-panel relative z-10 w-full max-w-3xl bg-ivory border border-warm-border rounded-[8px] shadow-modal overflow-hidden flex flex-col my-auto pointer-events-auto"
      >
        {/* Sticky/non-scrolling Header */}
        <div className="sticky top-0 z-20 shrink-0 flex items-center justify-between px-6 py-4 bg-ivory/95 backdrop-blur-md border-b border-warm-border">
          <div className="flex items-center gap-3">
            <Tag variant="badge" status={project.status}>
              {project.status} {project.badge ? `(${project.badge})` : ''}
            </Tag>
            <span className="text-xs font-mono text-muted-grey uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal hover:bg-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area - THIS is the scroller */}
        <div
          ref={contentScrollerRef}
          tabIndex={0}
          role="region"
          aria-label="Project details"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            scrollbarGutter: 'stable',
          }}
          className="p-6 sm:p-8 space-y-8 focus:outline-none focus-visible:ring-1 focus-visible:ring-burnt-orange/30 scrollbar-gutter-stable"
        >
          <div className="space-y-4">
            <h3 id="modal-title" className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-muted-grey font-normal">
              {project.oneLiner}
            </p>

            <div className="w-full aspect-[16/9] rounded-[6px] overflow-hidden border border-warm-border shadow-sm">
              <ProjectCover slug={project.slug} title={project.title} />
            </div>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <Card elevated className="p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-grey mb-3 font-semibold">
                Verified Test Results
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-warm-border">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className={`${idx > 0 ? 'sm:pl-4 pt-2 sm:pt-0' : ''}`}>
                    <div className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-grey mt-0.5">
                      <GlossaryTooltip term={m.label}>{m.label}</GlossaryTooltip>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {project.limitations && (
            <div className="flex items-start gap-3 bg-amber-50/70 border border-amber-200/80 rounded-[6px] p-4 text-xs sm:text-sm text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Honest Assessment & Limitations: </span>
                <span>{project.limitations}</span>
              </div>
            </div>
          )}

          {project.accuracyNote && (
            <div className="flex items-start gap-3 bg-stone-100/90 border border-stone-300/80 rounded-[6px] p-4 text-xs sm:text-sm text-charcoal">
              <AlertCircle className="w-4 h-4 text-muted-grey shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Technical Architecture Note: </span>
                <span>{project.accuracyNote}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevated className="p-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Problem Statement
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.problem}</p>
            </Card>

            <Card elevated className="p-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Solution Approach
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.solution}</p>
            </Card>
          </div>

          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
                Key Features
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-charcoal/90">
                    <CheckCircle2 className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.dataset && (
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
                Dataset & Experimentation Workflow
              </div>
              <p className="text-sm text-muted-grey leading-relaxed">{project.dataset}</p>
            </div>
          )}

          <div className="space-y-2 bg-cream/50 border border-warm-border rounded-[6px] p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              My Contribution
            </div>
            <p className="text-sm text-charcoal/90 font-medium">{project.contribution}</p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              Challenge & Learning
            </div>
            <p className="text-sm text-muted-grey leading-relaxed">
              {project.challengesAndLearnings}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech} variant="mono" className="px-2.5 py-1 text-xs bg-card-surface">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          {project.githubUrl && (
            <div className="p-4 bg-cream border border-warm-border rounded-[6px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-2.5 text-charcoal/90">
                <Github className="w-4 h-4 text-burnt-orange shrink-0" />
                <span>For more details, code and documentation, visit the GitHub repository</span>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-underline-link text-burnt-orange font-semibold hover:text-light-orange inline-flex items-center gap-1.5 shrink-0 py-0.5"
              >
                <span>View on GitHub &rarr;</span>
              </a>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-warm-border pt-4">
            <Link
              to={`/projects/${project.slug}`}
              onClick={onClose}
              className="draw-underline-link text-xs sm:text-sm font-semibold text-charcoal hover:text-burnt-orange inline-flex items-center gap-1.5 py-0.5"
            >
              <span>Open dedicated project page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {project.githubUrl && (
              <Button asAnchor href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </m.div>
    </div>
  );
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {project && (
        <ProjectModalInner project={project} onClose={onClose} />
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
