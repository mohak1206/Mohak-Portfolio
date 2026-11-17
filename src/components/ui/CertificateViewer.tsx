import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { m, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import type { Credential } from '../../data/credentials';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollLock } from '../../hooks/useScrollLock';
import { EASING } from '../../lib/animation';

export interface CertificateViewerProps {
  isOpen: boolean;
  credential: Credential | null;
  credentialsList: Credential[];
  onClose: () => void;
  onNavigate: (credential: Credential) => void;
}

const formatCredentialDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length >= 2) {
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${months[monthIdx]} ${year}`;
    }
  }
  return dateStr;
};

const typeLabels: Record<string, string> = {
  'job-simulation': 'Job simulation',
  participation: 'Participation',
  badge: 'Badge',
};

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  isOpen,
  credential,
  credentialsList,
  onClose,
  onNavigate,
}) => {
  const prefersReduced = useReducedMotion();
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentIndex = credential ? credentialsList.findIndex((c) => c.id === credential.id) : -1;
  const hasMultiple = credentialsList.length > 1;
  const nextCredential = currentIndex >= 0 && currentIndex < credentialsList.length - 1
    ? credentialsList[currentIndex + 1]
    : credentialsList[0];
  const prevCredential = currentIndex > 0
    ? credentialsList[currentIndex - 1]
    : credentialsList[credentialsList.length - 1];

  // Preload next certificate full image
  useEffect(() => {
    if (isOpen && nextCredential?.image) {
      const img = new Image();
      img.src = nextCredential.image;
    }
  }, [isOpen, nextCredential]);

  // Scroll lock & Lenis pause
  useScrollLock(isOpen);

  // #root inert and aria-hidden management
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      // Focus close button on open
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      previouslyFocusedElementRef.current?.focus();
    }
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    if (prevCredential) {
      onNavigate(prevCredential);
    }
  }, [prevCredential, onNavigate]);

  const handleNext = useCallback(() => {
    if (nextCredential) {
      onNavigate(nextCredential);
    }
  }, [nextCredential, onNavigate]);

  // Keyboard navigation: Esc, Left, Right & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (typeof document === 'undefined') return null;

  const dateText = credential?.date ? formatCredentialDate(credential.date) : '';
  const typeTag = credential?.type ? typeLabels[credential.type] : undefined;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && credential && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate details: ${credential.title}`}
          ref={modalRef}
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        >
          {/* Backdrop with theme-aware blur */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/80 dark:bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <m.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: prefersReduced ? 0 : 0.25, ease: EASING }}
            className="relative z-10 w-full max-w-4xl max-h-[92dvh] sm:max-h-[88dvh] bg-ivory dark:bg-[#1a1816] rounded-lg border border-warm-border shadow-2xl flex flex-col overflow-hidden text-charcoal overscroll-contain select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-warm-border bg-cream/60 dark:bg-charcoal/30 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-grey">
                <Award className="w-4 h-4 text-burnt-orange" />
                <span className="uppercase tracking-wider">Verified Credential</span>
                {hasMultiple && (
                  <span className="px-1.5 py-0.5 rounded bg-warm-border/40 text-[11px]">
                    {currentIndex + 1} / {credentialsList.length}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {credential.verifyUrl && (
                  <a
                    href={credential.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-burnt-orange hover:text-light-orange transition-colors rounded border border-burnt-orange/30 hover:border-burnt-orange"
                    aria-label={`Verify ${credential.title} certificate on official portal`}
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate viewer (Esc)"
                  className="p-1.5 rounded text-charcoal/70 hover:text-burnt-orange hover:bg-cream dark:hover:bg-charcoal/60 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable image and caption container */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 flex flex-col items-center justify-center space-y-4"
            >
              {/* Image with navigation arrows */}
              <div className="relative w-full flex items-center justify-center group/viewer">
                {hasMultiple && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous certificate (Left arrow)"
                    className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-ivory/90 dark:bg-charcoal/90 text-charcoal border border-warm-border shadow-md hover:bg-burnt-orange hover:text-white transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <div className="relative max-h-[64dvh] sm:max-h-[68dvh] overflow-hidden rounded border border-warm-border/60 bg-cream/40 flex items-center justify-center">
                  <img
                    src={credential.image}
                    alt={`${credential.title} certificate`}
                    className="max-h-[64dvh] sm:max-h-[68dvh] w-auto max-w-full object-contain block mx-auto"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {hasMultiple && (
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next certificate (Right arrow)"
                    className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-ivory/90 dark:bg-charcoal/90 text-charcoal border border-warm-border shadow-md hover:bg-burnt-orange hover:text-white transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Caption */}
              <div className="w-full max-w-3xl pt-2 border-t border-warm-border/60 space-y-2 select-text">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-charcoal">
                      {credential.title}
                    </h3>
                    {typeTag && (
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-cream border border-warm-border text-charcoal/80">
                        {typeTag}
                      </span>
                    )}
                  </div>
                  {dateText && (
                    <span className="font-mono text-xs text-muted-grey shrink-0">
                      {dateText}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted-grey">
                  <span>Issued by: {credential.issuer}</span>
                  {credential.extra && (
                    <span className="text-burnt-orange font-medium">{credential.extra}</span>
                  )}
                </div>

                {credential.summary && (
                  <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed pt-1">
                    {credential.summary}
                  </p>
                )}
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CertificateViewer;
