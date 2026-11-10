import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = useScrollSpy(
    navItems.map((n) => n.id),
    160
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + href);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md border-warm-border shadow-sm py-3.5'
          : 'bg-ivory/80 backdrop-blur-sm border-warm-border/80 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: MA Monogram */}
        <a
          href="/#home"
          onClick={(e) => handleNavClick(e, '#home', 'home')}
          className="group flex items-baseline text-2xl font-serif font-bold text-charcoal tracking-tight transition-transform hover:opacity-90"
          aria-label="Mohak Agrawal Home"
        >
          <span>MA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange inline-block ml-0.5" />
        </a>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === '/' && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.id)}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-burnt-orange' : 'text-charcoal/80 hover:text-charcoal'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-burnt-orange"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Resume CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="/Mohak_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-burnt-orange hover:bg-light-orange transition-all duration-200 rounded-[5px] shadow-sm hover:shadow"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="/Mohak_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-burnt-orange hover:bg-light-orange rounded-[4px]"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal hover:text-burnt-orange transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        onItemClick={handleNavClick}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
