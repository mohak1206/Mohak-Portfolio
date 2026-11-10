import React from 'react';
import { Mail, ArrowUpRight, MapPin, Github, Linkedin } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';

export const Contact: React.FC = () => {
  return (
    <section id="contact" aria-label="Contact" className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <SectionLabel label="CONTACT" centered twoSided />

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.15] text-charcoal tracking-[-0.01em]">
            Let’s build something <br />
            <span className="italic text-burnt-orange font-normal">useful together.</span>
          </h2>

          <p className="text-muted-grey text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            I'm open to internships, full-time roles and freelance projects. If you have an idea or an opportunity, I'd love to hear about it.
          </p>

          <div className="pt-2">
            <Button
              asAnchor
              href={`mailto:${profileData.email}`}
              variant="primary"
              size="lg"
              className="gap-2.5"
            >
              <Mail className="w-5 h-5 stroke-[2]" />
              <span>Email me</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
            </Button>
          </div>

          <div className="pt-8 border-t border-warm-border flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-charcoal/80">
            <div className="flex items-center gap-1.5 text-muted-grey">
              <MapPin className="w-4 h-4 text-burnt-orange" />
              <span>{profileData.location}</span>
            </div>

            <span className="hidden sm:inline text-warm-border">|</span>

            <div className="flex items-center gap-6">
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium hover:text-burnt-orange transition-colors"
              >
                <Linkedin className="w-4 h-4 text-burnt-orange" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium hover:text-burnt-orange transition-colors"
              >
                <Github className="w-4 h-4 text-burnt-orange" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

