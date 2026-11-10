import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-warm-border bg-ivory py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Monogram */}
          <div className="flex items-center gap-2">
            <a
              href="/#home"
              className="font-serif text-2xl font-bold text-charcoal tracking-tight"
            >
              <span>MA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange inline-block ml-0.5" />
            </a>
            <span className="text-xs font-mono text-muted-grey ml-2">
              © 2026 Mohak Agrawal
            </span>
          </div>

          {/* Quick links */}
          <div className="flex items-center space-x-6 text-xs font-medium text-muted-grey">
            <a href="/#home" className="hover:text-burnt-orange transition-colors">
              Home
            </a>
            <a href="/#about" className="hover:text-burnt-orange transition-colors">
              About
            </a>
            <a href="/#projects" className="hover:text-burnt-orange transition-colors">
              Projects
            </a>
            <a href="/#experience" className="hover:text-burnt-orange transition-colors">
              Experience
            </a>
            <a href="/#contact" className="hover:text-burnt-orange transition-colors">
              Contact
            </a>
          </div>

          {/* Attribution */}
          <div className="text-xs text-muted-grey font-mono">
            Designed & built by Mohak Agrawal.
          </div>
        </div>
      </div>
    </footer>
  );
};
