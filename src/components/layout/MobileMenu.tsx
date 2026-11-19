import React from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, staggerContainerVariants, staggerItemVariants } from '../../lib/animation';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeSection: string;
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  activeSection,
  onItemClick,
}) => {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={prefersReduced ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: EASING }}
          className="md:hidden bg-ivory border-b border-warm-border px-6 py-6 shadow-lg overflow-hidden"
        >
          <m.nav
            variants={prefersReduced ? undefined : staggerContainerVariants(0.04, 0.04)}
            initial={prefersReduced ? false : "hidden"}
            animate="visible"
            className="flex flex-col space-y-4"
            aria-label="Mobile Navigation"
          >
            {navItems.map((item) => {
              const isActive = item.href.startsWith('/')
                ? location.pathname === item.href || (item.href === '/blogs' && (location.pathname.startsWith('/blogs') || location.pathname.startsWith('/notes')))
                : location.pathname === '/' && activeSection === item.id;
              return (
                <m.a
                  key={item.id}
                  variants={prefersReduced ? undefined : staggerItemVariants}
                  href={item.href}
                  onClick={(e) => onItemClick(e, item.href, item.id)}
                  className={`flex items-center justify-between py-2 text-base font-medium transition-colors ${
                    isActive ? 'text-burnt-orange font-semibold' : 'text-charcoal'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />}
                </m.a>
              );
            })}

            <m.div
              variants={prefersReduced ? undefined : staggerItemVariants}
              className="pt-2 border-t border-warm-border space-y-2"
            >
              <a
                href="/resume"
                onClick={(e) => {
                  e.preventDefault();
                  onItemClick(e, '/resume', 'resume');
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-[var(--on-accent)] bg-burnt-orange hover:bg-light-orange rounded-[4px] shadow-sm transition-transform active:scale-[0.98]"
              >
                <span>View Resume</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="/Mohak_Agrawal_Resume.pdf"
                download="Mohak_Agrawal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-mono text-charcoal/80 hover:text-burnt-orange border border-warm-border rounded-[4px] transition-transform active:scale-[0.98]"
              >
                <span>Download PDF (85 KB)</span>
              </a>
            </m.div>
          </m.nav>
        </m.div>
      )}
    </AnimatePresence>
  );
};

