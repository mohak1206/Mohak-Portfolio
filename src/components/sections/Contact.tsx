import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, MapPin, Github, Linkedin, Copy, Check, ExternalLink, X, Calendar } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionNumeral } from '../ui/SectionNumeral';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { Magnetic } from '../ui/Magnetic';
import { AvailabilityBadge } from '../ui/AvailabilityBadge';
import { ContactForm } from '../ui/ContactForm';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

const EMAIL_SUBJECT = 'Hello Mohak, saw your portfolio';
const EMAIL_BODY = 'Hi Mohak,\n\n';

export const Contact: React.FC = () => {
  const calUrl = import.meta.env.VITE_CAL_URL;
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mailtoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emailButtonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const hiddenMailtoRef = useRef<HTMLAnchorElement | null>(null);

  const [currentTime, setCurrentTime] = useState<string>(() => {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  });

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };

    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, []);

  const handleCopyEmail = () => {
    copyToClipboard(profileData.email);
  };

  const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(
    EMAIL_SUBJECT
  )}&body=${encodeURIComponent(EMAIL_BODY)}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profileData.email
  )}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    profileData.email
  )}&subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

  const handleEmailClick = () => {
    // 1. Trigger the mailto link
    if (hiddenMailtoRef.current) {
      hiddenMailtoRef.current.click();
    } else {
      window.location.href = mailtoUrl;
    }

    // 2. Start 1200ms fallback timer
    if (mailtoTimerRef.current) clearTimeout(mailtoTimerRef.current);

    let clientHandled = false;

    const onBlurOrHidden = () => {
      clientHandled = true;
      if (mailtoTimerRef.current) {
        clearTimeout(mailtoTimerRef.current);
        mailtoTimerRef.current = null;
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('blur', onBlurOrHidden);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        onBlurOrHidden();
      }
    };

    window.addEventListener('blur', onBlurOrHidden);
    document.addEventListener('visibilitychange', onVisibilityChange);

    mailtoTimerRef.current = setTimeout(() => {
      cleanup();
      if (!clientHandled && !document.hidden && document.hasFocus()) {
        // Assume mail client didn't handle it
        setPopoverOpen(true);
      }
    }, 1200);
  };

  const closePopover = useCallback(() => {
    setPopoverOpen(false);
    emailButtonRef.current?.focus();
  }, []);

  // Auto focus first option when popover opens
  useEffect(() => {
    if (popoverOpen) {
      const firstFocusable = popoverRef.current?.querySelector<HTMLElement>(
        'a, button[role="menuitem"]'
      );
      firstFocusable?.focus();
    }
  }, [popoverOpen]);

  // Handle outside click & Esc key for Popover
  useEffect(() => {
    if (!popoverOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePopover();
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        emailButtonRef.current &&
        !emailButtonRef.current.contains(e.target as Node)
      ) {
        closePopover();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [popoverOpen, closePopover]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (mailtoTimerRef.current) clearTimeout(mailtoTimerRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact"
      className="relative py-20 lg:py-28 bg-ivory overflow-hidden"
    >
      {/* Giant Outlined Section Numeral 07 */}
      <SectionNumeral numeral="07" sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex justify-center -mb-2">
              <AvailabilityBadge inline />
            </div>

            <SectionLabel label="CONTACT" centered twoSided />

            {/* Headline reveals with SplitLines, italic words get soft fade-in */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.15] text-charcoal tracking-[-0.01em]">
              <SplitLines
                lines={[
                  'Let’s build something',
                  <span key="contact-italic-word" className="inline-block">
                    <m.span
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={DEFAULT_VIEWPORT}
                      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.35, ease: EASING }}
                      className="italic text-burnt-orange font-normal"
                    >
                      useful together.
                    </m.span>
                  </span>,
                ]}
              />
            </h2>

            <p className="text-muted-grey text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              I'm open to internships, full-time roles and freelance projects. If you have an idea or an opportunity, I'd love to hear about it.
            </p>

            {/* CTA Buttons with Magnetic effect and Copy-Email micro-interaction */}
            <div className="pt-2 flex items-center justify-center gap-3 relative flex-wrap sm:flex-nowrap">
              {/* Hidden mailto anchor for standard browser handling */}
              <a
                ref={hiddenMailtoRef}
                href={mailtoUrl}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              >
                Email {profileData.name}
              </a>

              <Magnetic>
                <button
                  ref={emailButtonRef}
                  type="button"
                  onClick={handleEmailClick}
                  aria-haspopup="dialog"
                  aria-expanded={popoverOpen}
                  aria-label="Email Mohak"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-medium text-[var(--on-accent)] bg-burnt-orange hover:bg-light-orange rounded-[5px] shadow-sm hover:shadow overflow-hidden transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 active:scale-[0.98]"
                >
                  {/* Orange sweep layer scaling from the left */}
                  <span
                    className="absolute inset-0 bg-light-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none"
                    aria-hidden="true"
                  />
                  <Mail className="relative z-10 w-5 h-5 stroke-[2]" />
                  <span className="relative z-10">Email me</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                  title="Copy email address"
                  className="relative inline-flex items-center justify-center p-3.5 text-charcoal bg-cream hover:bg-[var(--surface-2)] border border-warm-border hover:border-burnt-orange rounded-[5px] shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 active:scale-95"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-5 h-5 text-charcoal/80 stroke-[2]" />
                  )}
                </button>
              </Magnetic>

              {/* Toast for copy status */}
              {copied && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-charcoal text-ivory border border-warm-border text-xs font-mono rounded shadow-lg flex items-center gap-1.5 pointer-events-none z-20 whitespace-nowrap"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                  <span>{profileData.email} copied</span>
                </div>
              )}

              {/* Popover Fallback Dialog */}
              <AnimatePresence>
                {popoverOpen && (
                  <m.div
                    ref={popoverRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Email options"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: EASING }}
                    className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[320px] bg-[var(--color-card-surface)] border border-warm-border rounded-lg shadow-xl p-3 z-30 text-left"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-warm-border">
                      <span className="text-xs font-mono text-muted-grey uppercase tracking-wider">
                        Choose email option
                      </span>
                      <button
                        type="button"
                        onClick={closePopover}
                        aria-label="Close email options"
                        className="p-1 rounded text-muted-grey hover:text-charcoal hover:bg-cream transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-1.5" role="menu">
                      <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closePopover}
                        role="menuitem"
                        className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-charcoal hover:bg-cream hover:text-burnt-orange rounded transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-burnt-orange" />
                          <span>Open in Gmail</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-grey group-hover:text-burnt-orange transition-colors" />
                      </a>

                      <a
                        href={outlookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closePopover}
                        role="menuitem"
                        className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-charcoal hover:bg-cream hover:text-burnt-orange rounded transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-burnt-orange" />
                          <span>Open in Outlook</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-grey group-hover:text-burnt-orange transition-colors" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          handleCopyEmail();
                          closePopover();
                        }}
                        role="menuitem"
                        className="group flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-charcoal hover:bg-cream hover:text-burnt-orange rounded transition-colors text-left"
                      >
                        <span className="flex items-center gap-2">
                          <Copy className="w-4 h-4 text-burnt-orange" />
                          <span>Copy address</span>
                        </span>
                        <span className="text-xs font-mono text-muted-grey group-hover:text-burnt-orange transition-colors">
                          {profileData.email}
                        </span>
                      </button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book a chat button (when VITE_CAL_URL is provided) */}
            {calUrl && (
              <div className="pt-3 flex justify-center">
                <Magnetic>
                  <a
                    href={calUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal bg-cream hover:bg-[var(--surface-2)] border border-warm-border hover:border-burnt-orange rounded-[5px] shadow-sm transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 active:scale-[0.98]"
                  >
                    <Calendar className="w-4 h-4 text-burnt-orange" />
                    <span>Book a 15-minute chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-grey" />
                  </a>
                </Magnetic>
              </div>
            )}

            {/* Contact Form Card (when VITE_FORMSPREE_ID is configured) */}
            <ContactForm />

            {/* Bottom info & social links */}
            <div className="pt-8 border-t border-warm-border flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-charcoal/80">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-muted-grey">
                <MapPin className="w-4 h-4 text-burnt-orange shrink-0" />
                <span>Maharashtra, India · {currentTime} IST</span>
              </div>

              <span className="hidden sm:inline text-warm-border">|</span>

              {/* Social links with draw-and-retract underline and 4px arrow travel on hover */}
              <div className="flex items-center gap-6">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group draw-underline-link relative inline-flex items-center gap-1.5 font-medium hover:text-burnt-orange transition-colors py-0.5"
                >
                  <Linkedin className="w-4 h-4 text-burnt-orange" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group draw-underline-link relative inline-flex items-center gap-1.5 font-medium hover:text-burnt-orange transition-colors py-0.5"
                >
                  <Github className="w-4 h-4 text-burnt-orange" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
