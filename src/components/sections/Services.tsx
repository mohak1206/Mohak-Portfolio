import React from 'react';
import { m } from 'framer-motion';
import { Layers, Eye, Smartphone, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData, type ServiceItem } from '../../data/services';
import { profileData } from '../../data/profile';
import { SectionLabel } from '../ui/SectionLabel';
import { Reveal } from '../ui/Reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

const ICON_MAP = {
  Layers,
  Eye,
  Smartphone,
};

export const Services: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const { services, processSteps, confirmedProcess, availabilityNote } = servicesData;

  const showAvailabilityNote =
    availabilityNote && !availabilityNote.includes('TODO');

  const handleStartProject = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactForm = document.getElementById('form-name');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      contactForm.focus();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `mailto:${profileData.email}?subject=${encodeURIComponent(
          'Project inquiry'
        )}`;
      }
    }
  };

  return (
    <section
      id="services"
      aria-label="Freelance Services"
      className="relative py-20 lg:py-28 bg-ivory border-t border-warm-border/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center space-y-4 mb-16">
            <SectionLabel label="— SERVICES" centered twoSided />
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-charcoal tracking-tight">
              What I can{' '}
              <span className="italic text-burnt-orange font-normal">
                build
              </span>{' '}
              for you.
            </h2>
            <p className="text-muted-grey text-base sm:text-lg max-w-2xl mx-auto">
              Production-focused engineering across AI models, modern full-stack web platforms, and unified mobile apps.
            </p>
          </div>
        </Reveal>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] || Layers;
            return (
              <m.div
                key={service.id}
                initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={DEFAULT_VIEWPORT}
                transition={{
                  duration: 0.45,
                  delay: prefersReduced ? 0 : index * 0.1,
                  ease: EASING,
                }}
                className="group relative bg-card-surface border border-warm-border hover:border-burnt-orange/60 rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Icon square */}
                  <div className="w-12 h-12 rounded-[6px] border border-burnt-orange/30 flex items-center justify-center text-burnt-orange bg-ivory group-hover:bg-burnt-orange group-hover:text-white transition-all duration-200">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal tracking-tight group-hover:text-burnt-orange transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-grey text-sm leading-relaxed min-h-[40px]">
                    {service.description}
                  </p>

                  {/* "Good for" line */}
                  <div className="pt-2 pb-1 border-t border-warm-border/60">
                    <span className="text-xs font-mono text-charcoal/80 leading-snug block">
                      <span className="text-muted-grey font-medium">Good for: </span>
                      {service.goodFor}
                    </span>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.stack.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-cream/70 border border-warm-border text-charcoal/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Example Proof Links */}
                <div className="pt-6 mt-4 border-t border-warm-border/60 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-muted-grey uppercase tracking-wider">
                    See proof:
                  </span>
                  {service.examples.map((ex) => (
                    <Link
                      key={ex.title}
                      to={ex.href}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-burnt-orange hover:text-light-orange transition-colors group/link"
                    >
                      <span className="underline-offset-4 group-hover/link:underline">
                        {ex.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Process Row: "How we work" (hidden until confirmed) */}
        {confirmedProcess && (
          <div className="mt-20 pt-16 border-t border-warm-border/70">
            <div className="text-center mb-12">
              <span className="text-xs font-mono text-burnt-orange tracking-wider uppercase block mb-1">
                Workflow
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
                How we work
              </h3>
            </div>

            <div className="relative">
              {/* Process steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-burnt-orange text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <h4 className="font-serif text-lg font-medium text-charcoal">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-muted-grey text-xs sm:text-sm leading-relaxed pl-0 md:pl-11">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to action & availability note */}
        <div className="mt-16 text-center space-y-3">
          <button
            type="button"
            onClick={handleStartProject}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[var(--on-accent)] bg-burnt-orange hover:bg-light-orange rounded-[5px] shadow-sm hover:shadow transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 active:scale-[0.98]"
          >
            <span>Start a project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {showAvailabilityNote && (
            <p className="text-xs font-mono text-muted-grey">
              {availabilityNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;

