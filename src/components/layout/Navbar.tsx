import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { m, useScroll } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MobileMenu } from './MobileMenu';
import Logo from '../ui/Logo';
import { Magnetic } from '../ui/Magnetic';
import { EASING } from '../../lib/animation';

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
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

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
    <>
      {/* 2px burnt-orange scroll-progress bar fixed at the very top */}
      <m.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-burnt-orange z-[60] origin-left pointer-events-none"
        style={{ scaleX: prefersReducedMotion ? 0 : scrollYProgress }}
        aria-hidden="true"
      />

      <m.header
        initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASING }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md border-warm-border shadow-sm py-3.5'
            : 'bg-ivory/80 backdrop-blur-sm border-warm-border/80 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            className="transition-opacity duration-200 hover:opacity-70"
            aria-label="Home"
          >
            <Logo className="h-8 w-auto text-[#191919]" />
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
                    <m.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-burnt-orange"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 30 }
                      }
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Resume CTA Button with Magnetic effect */}
          <div className="hidden md:flex items-center">
            <Magnetic>
              <a
                href="/Mohak_Agrawal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-burnt-orange hover:bg-light-orange transition-all duration-200 rounded-[5px] shadow-sm hover:shadow"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>
            </Magnetic>
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
      </m.header>
    </>
  );
};
