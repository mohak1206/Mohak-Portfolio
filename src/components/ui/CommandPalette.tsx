import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, FileText, ArrowUpRight, FolderGit2, Compass, Mail, Check, CornerDownLeft, Play } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { profileData } from '../../data/profile';
import { scrollToTarget } from '../../lib/lenis';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'SECTIONS' | 'PROJECTS' | 'ACTIONS & LINKS';
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profileData.email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = profileData.email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
        onClose();
      }, 900);
    } catch {
      onClose();
    }
  };

  const scrollToSection = (id: string) => {
    onClose();
    if (location.pathname !== '/') {
      navigate('/#' + id);
      setTimeout(() => {
        scrollToTarget(id, -80);
      }, 100);
    } else {
      scrollToTarget(id, -80);
    }
  };

  const allItems: CommandItem[] = useMemo(() => {
    const sections: CommandItem[] = [
      { id: 'sec-home', title: 'Home', subtitle: 'Hero section and introduction', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('home') },
      { id: 'sec-about', title: 'About', subtitle: 'Background, education and profile', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('about') },
      { id: 'sec-journey', title: 'My Journey', subtitle: 'From curiosity to creation narrative', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('journey') },
      { id: 'sec-projects', title: 'Selected Works', subtitle: 'Core featured engineering projects', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('projects') },
      { id: 'sec-lab', title: 'Lab & Ideas', subtitle: 'Explorations, concepts and prototypes', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('lab-ideas') },
      { id: 'sec-expertise', title: 'Technical Capabilities', subtitle: 'Languages, tooling and AI competencies', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('expertise') },
      { id: 'sec-experience', title: 'Experience', subtitle: 'Internships and engineering leadership', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('experience') },
      { id: 'sec-credentials', title: 'Credentials', subtitle: 'Certifications and honors', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('credentials') },
      { id: 'sec-services', title: 'Services', subtitle: 'What I can build for you', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('services') },
      { id: 'sec-faq', title: 'FAQ', subtitle: 'Working with me questions & answers', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('faq') },
      { id: 'sec-contact', title: 'Contact', subtitle: 'Email, location and direct outreach', category: 'SECTIONS', icon: <Compass className="w-4 h-4 text-burnt-orange" />, action: () => scrollToSection('contact') },
    ];

    const projects: CommandItem[] = projectsData.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.title,
      subtitle: p.oneLiner,
      category: 'PROJECTS',
      icon: <FolderGit2 className="w-4 h-4 text-burnt-orange" />,
      action: () => {
        onClose();
        navigate(`/projects/${p.slug}`);
      },
    }));

    const actions: CommandItem[] = [
      {
        id: 'act-view-resume',
        title: 'View Resume (Web & Printable)',
        subtitle: 'Interactive and printable curriculum vitae',
        category: 'ACTIONS & LINKS',
        icon: <FileText className="w-4 h-4 text-burnt-orange" />,
        action: () => {
          onClose();
          navigate('/resume');
        },
      },
      {
        id: 'act-notes',
        title: 'Notes & Articles',
        subtitle: 'Read write-ups and technical learnings',
        category: 'ACTIONS & LINKS',
        icon: <FileText className="w-4 h-4 text-burnt-orange" />,
        action: () => {
          onClose();
          navigate('/notes');
        },
      },
      {
        id: 'act-resume',
        title: 'Open Resume (PDF)',
        subtitle: 'View curriculum vitae in a new tab',
        category: 'ACTIONS & LINKS',
        icon: <FileText className="w-4 h-4 text-burnt-orange" />,
        action: () => {
          onClose();
          window.open('/Mohak_Agrawal_Resume.pdf', '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'act-all-projects',
        title: 'View All Projects Directory',
        subtitle: 'Explore full catalog with filters',
        category: 'ACTIONS & LINKS',
        icon: <FolderGit2 className="w-4 h-4 text-burnt-orange" />,
        action: () => {
          onClose();
          navigate('/projects');
        },
      },
      {
        id: 'act-tour',
        title: '60-Second Tour',
        subtitle: 'Quick 5-slide portfolio overview for busy recruiters',
        category: 'ACTIONS & LINKS',
        icon: <Play className="w-4 h-4 text-burnt-orange" />,
        action: () => {
          onClose();
          window.dispatchEvent(new CustomEvent('open-quick-tour'));
        },
      },
      {
        id: 'act-github',
        title: 'GitHub Profile',
        subtitle: profileData.github,
        category: 'ACTIONS & LINKS',
        icon: <ArrowUpRight className="w-4 h-4 text-burnt-orange" />,
        action: () => {
          onClose();
          window.open(profileData.github, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'act-linkedin',
        title: 'LinkedIn Profile',
        subtitle: profileData.linkedin,
        category: 'ACTIONS & LINKS',
        icon: <ArrowUpRight className="w-4 h-4 text-burnt-orange" />,
        action: () => {
          onClose();
          window.open(profileData.linkedin, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'act-copy-email',
        title: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
        subtitle: profileData.email,
        category: 'ACTIONS & LINKS',
        icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Mail className="w-4 h-4 text-burnt-orange" />,
        action: handleCopyEmail,
      },
    ];

    return [...sections, ...projects, ...actions];
  }, [location.pathname, copiedEmail]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Group items by category while preserving overall flat indexing
  const groupedItems = useMemo(() => {
    const groups: { [cat: string]: { item: CommandItem; index: number }[] } = {};
    filteredItems.forEach((item, index) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push({ item, index });
    });
    return groups;
  }, [filteredItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const el = document.getElementById(`cmd-item-${selectedIndex}`);
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-ivory border border-warm-border rounded-[8px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-warm-border bg-card-surface/60">
          <Search className="w-5 h-5 text-burnt-orange shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, projects, links (or press Esc)..."
            className="flex-grow bg-transparent text-charcoal placeholder-muted-grey text-sm sm:text-base focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-muted-grey hover:text-charcoal rounded"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-muted-grey bg-cream border border-warm-border rounded">
              ESC to exit
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-4 flex-grow divide-y divide-warm-border/40">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm font-mono text-muted-grey">
              No results found for "{query}".
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="pt-2 first:pt-0 space-y-1">
                <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-grey font-semibold">
                  {category}
                </div>
                <div className="space-y-0.5">
                  {items.map(({ item, index }) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <div
                        key={item.id}
                        id={`cmd-item-${index}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[5px] cursor-pointer transition-colors duration-150 select-none ${
                          isSelected
                            ? 'bg-burnt-orange text-[var(--on-accent)]'
                            : 'hover:bg-cream text-charcoal'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={isSelected ? 'text-[var(--on-accent)]' : ''}>{item.icon}</span>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate">{item.title}</div>
                            {item.subtitle && (
                              <div
                                className={`text-xs truncate ${
                                  isSelected ? 'text-[var(--on-accent)] opacity-80' : 'text-muted-grey'
                                }`}
                              >
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <CornerDownLeft className="w-4 h-4 text-[var(--on-accent)] opacity-80 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 border-t border-warm-border bg-cream/50 flex items-center justify-between text-[11px] font-mono text-muted-grey">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>{filteredItems.length} results</span>
        </div>
      </div>
    </div>
  );
};

export const CommandPaletteModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  return <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export default CommandPaletteModal;
