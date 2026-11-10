import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, MapPin, Github, Linkedin } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SectionLabel } from '../ui/SectionLabel';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

export const Contact: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" aria-label="Contact" className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <SectionLabel label="CONTACT" centered twoSided />

            {/* Headline reveals with SplitLines, italic words get soft fade-in */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.15] text-charcoal tracking-[-0.01em]">
              <SplitLines
                lines={[
                  'Let’s build something',
                  <span key="contact-italic-word" className="inline-block">
                    <motion.span
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={DEFAULT_VIEWPORT}
                      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.35, ease: EASING }}
                      className="italic text-burnt-orange font-normal"
                    >
                      useful together.
                    </motion.span>
                  </span>,
                ]}
              />
            </h2>

            <p className="text-muted-grey text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              I'm open to internships, full-time roles and freelance projects. If you have an idea or an opportunity, I'd love to hear about it.
            </p>

            {/* CTA Button: background fill sweep on hover + arrow nudges right/up */}
            <div className="pt-2">
              <a
                href={`mailto:${profileData.email}`}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-medium text-white bg-burnt-orange rounded-[5px] shadow-sm hover:shadow overflow-hidden transition-all duration-200 select-none"
              >
                {/* Orange sweep layer scaling from the left */}
                <span
                  className="absolute inset-0 bg-light-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none"
                  aria-hidden="true"
                />
                <Mail className="relative z-10 w-5 h-5 stroke-[2]" />
                <span className="relative z-10">Email me</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Bottom info & social links */}
            <div className="pt-8 border-t border-warm-border flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-charcoal/80">
              <div className="flex items-center gap-1.5 text-muted-grey">
                <MapPin className="w-4 h-4 text-burnt-orange" />
                <span>{profileData.location}</span>
              </div>

              <span className="hidden sm:inline text-warm-border">|</span>

              {/* Social links get an underline that draws on hover */}
              <div className="flex items-center gap-6">
                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 font-medium hover:text-burnt-orange transition-colors py-0.5"
                >
                  <Linkedin className="w-4 h-4 text-burnt-orange" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-burnt-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 pointer-events-none"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 font-medium hover:text-burnt-orange transition-colors py-0.5"
                >
                  <Github className="w-4 h-4 text-burnt-orange" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-burnt-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 pointer-events-none"
                    aria-hidden="true"
                  />
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
