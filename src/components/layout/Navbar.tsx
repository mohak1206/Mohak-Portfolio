import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { m, useScroll } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTheme } from '../../context/ThemeContext';
import { scrollToTarget } from '../../lib/lenis';
import { MobileMenu } from './MobileMenu';
import Logo from '../ui/Logo';
import { Magnetic } from '../ui/Magnetic';
import { EASING } from '../../lib/animation';

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Notes', href: '/notes', id: 'notes' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
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

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/' + href);
      setTimeout(() => {
        scrollToTarget(id, -80);
      }, 100);
    } else {
      scrollToTarget(id, -80);
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
            <Logo className="h-8 w-auto text-charcoal" />
          </a>

          {/* Center: Desktop Navigation */}
          <nav className="group/nav hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = item.href.startsWith('/')
                ? location.pathname === item.href
                : location.pathname === '/' && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`relative py-1 text-sm font-medium transition-all duration-200 group-hover/nav:opacity-55 hover:!opacity-100 ${
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

          {/* Right: Theme Toggle, Search trigger & Resume CTA Button */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 text-charcoal/80 hover:text-burnt-orange bg-card-surface hover:bg-cream border border-warm-border hover:border-burnt-orange rounded-[5px] transition-colors shadow-2xs select-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-burnt-orange"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-burnt-orange" />
              ) : (
                <Moon className="w-4 h-4 text-charcoal/80" />
              )}
            </button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              aria-label="Search site and commands (Ctrl+K)"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono text-charcoal/80 bg-card-surface hover:bg-cream border border-warm-border hover:border-burnt-orange rounded-[5px] transition-colors shadow-2xs select-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-burnt-orange"
            >
              <Search className="w-3.5 h-3.5 text-burnt-orange" />
              <span className="hidden lg:inline text-muted-grey">Search</span>
              <kbd className="text-[10px] bg-ivory px-1.5 py-0.5 rounded border border-warm-border font-sans text-muted-grey font-medium">
                ⌘K
              </kbd>
            </button>

            <Magnetic>
              <Link
                to="/resume"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--on-accent)] bg-burnt-orange hover:bg-light-orange transition-all duration-200 rounded-[5px] shadow-sm hover:shadow"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile menu trigger & Theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-1.5 text-charcoal/80 hover:text-burnt-orange rounded-[4px] border border-warm-border bg-card-surface"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-burnt-orange" />
              ) : (
                <Moon className="w-4 h-4 text-charcoal/80" />
              )}
            </button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              aria-label="Search site and commands"
              className="p-1.5 text-charcoal/80 hover:text-burnt-orange rounded-[4px] border border-warm-border bg-card-surface"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/resume"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[var(--on-accent)] bg-burnt-orange hover:bg-light-orange rounded-[4px]"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
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
