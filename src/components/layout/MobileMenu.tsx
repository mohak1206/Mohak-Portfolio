import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-ivory border-b border-warm-border px-6 py-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
      <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => onItemClick(e, item.href, item.id)}
              className={`flex items-center justify-between py-2 text-base font-medium transition-colors ${
                isActive ? 'text-burnt-orange font-semibold' : 'text-charcoal'
              }`}
            >
              <span>{item.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />}
            </a>
          );
        })}

        <div className="pt-2 border-t border-warm-border space-y-2">
          <a
            href="/resume"
            onClick={(e) => {
              e.preventDefault();
              onItemClick(e, '/resume', 'resume');
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-[var(--on-accent)] bg-burnt-orange hover:bg-light-orange rounded-[4px] shadow-sm"
          >
            <span>View Resume</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="/Mohak_Agrawal_Resume.pdf"
            download="Mohak_Agrawal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-mono text-charcoal/80 hover:text-burnt-orange border border-warm-border rounded-[4px]"
          >
            <span>Download PDF (85 KB)</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

