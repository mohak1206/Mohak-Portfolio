import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import { Reveal } from '../ui/Reveal';
import { profileData } from '../../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-warm-border bg-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Brand Logo */}
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

            {/* Quick links with draw-and-retract underline */}
            <div className="flex items-center space-x-6 text-xs font-medium text-muted-grey">
              <a href="/#home" className="draw-underline-link hover:text-burnt-orange transition-colors py-0.5">
                Home
              </a>
              <a href="/#about" className="draw-underline-link hover:text-burnt-orange transition-colors py-0.5">
                About
              </a>
              <a href="/#projects" className="draw-underline-link hover:text-burnt-orange transition-colors py-0.5">
                Projects
              </a>
              <a href="/#experience" className="draw-underline-link hover:text-burnt-orange transition-colors py-0.5">
                Experience
              </a>
              <a href="/#contact" className="draw-underline-link hover:text-burnt-orange transition-colors py-0.5">
                Contact
              </a>
            </div>

            {/* Social links with 4px arrow travel on hover */}
            <div className="flex items-center space-x-4 text-xs font-medium text-charcoal/80">
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
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
