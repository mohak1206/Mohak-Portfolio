import React from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import { Reveal } from '../ui/Reveal';
import { profileData } from '../../data/profile';
import { useMotionPreference } from '../../context/MotionContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT, staggerContainerVariants } from '../../lib/animation';

export const Footer: React.FC = () => {
  const { isReducedMotion, toggleReducedMotion } = useMotionPreference();
  const prefersReduced = useReducedMotion();

  const footerLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Services', href: '/#services' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="border-t border-warm-border bg-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.1}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Brand Logo & Copyright */}
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="transition-opacity duration-200 hover:opacity-70"
                aria-label="Home"
              >
                <Logo className="h-7 w-auto text-charcoal" />
              </a>
              <span className="text-xs font-mono text-muted-grey ml-1">
                © 2026 Mohak Agrawal
              </span>
            </div>

            {/* Quick links with staggered fade up and draw-and-retract underline */}
            <m.div
              variants={staggerContainerVariants(0.05, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={DEFAULT_VIEWPORT}
              className="flex items-center space-x-5 text-xs font-medium text-muted-grey"
            >
              {footerLinks.map((link) => (
                <m.a
                  key={link.label}
                  href={link.href}
                  variants={
                    prefersReduced
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASING } },
                        }
                  }
                  className="draw-underline-link hover:text-burnt-orange transition-colors py-0.5"
                >
                  {link.label}
                </m.a>
              ))}
            </m.div>

            {/* Right side: Social links & Reduce Motion switch */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-charcoal/80">
              <div className="flex items-center space-x-4">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group draw-underline-link inline-flex items-center gap-1 hover:text-burnt-orange transition-colors py-0.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group draw-underline-link inline-flex items-center gap-1 hover:text-burnt-orange transition-colors py-0.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              {/* Thin separator */}
              <div className="h-3 w-px bg-warm-border hidden sm:block" aria-hidden="true" />

              {/* Reduce motion accessible switch */}
              <div className="flex items-center gap-2">
                <span id="reduce-motion-label" className="text-xs font-mono text-muted-grey select-none">
                  Reduce motion
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isReducedMotion}
                  aria-labelledby="reduce-motion-label"
                  onClick={toggleReducedMotion}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleReducedMotion();
                    }
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-warm-border p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange ${
                    isReducedMotion ? 'bg-burnt-orange border-burnt-orange' : 'bg-cream-surface'
                  }`}
                >
                  <span className="sr-only">Toggle reduced motion</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-ivory shadow-sm transition-transform duration-200 ease-in-out ${
                      isReducedMotion ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
