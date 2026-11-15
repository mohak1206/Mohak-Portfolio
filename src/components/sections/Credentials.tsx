import React, { useRef, useState, useMemo, Suspense } from 'react';
import { m, AnimatePresence, type Variants } from 'framer-motion';
import { Eye, ArrowUpRight, ChevronDown } from 'lucide-react';
import { credentials, type Credential } from '../../data/credentials';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionNumeral } from '../ui/SectionNumeral';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SkeletonImage } from '../ui/SkeletonImage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';
import { cn } from '../../lib/utils';

// Lazy-load the CertificateViewer lightbox modal
const CertificateViewer = React.lazy(() => import('../ui/CertificateViewer'));

const CATEGORIES = ['All', 'AI & LLM', 'Data', 'Security', 'Activities'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const formatCredentialDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length >= 2) {
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${months[monthIdx]} ${year}`;
    }
  }
  return dateStr;
};

const typeLabelMap: Record<string, string> = {
  'job-simulation': 'Job simulation',
  participation: 'Participation',
  badge: 'Badge',
};

export const Credentials: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [showActivities, setShowActivities] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [activeViewerList, setActiveViewerList] = useState<Credential[]>(credentials);

  // Group credentials by tiers
  const featuredCredentials = useMemo(
    () => credentials.filter((c) => c.tier === 'featured'),
    []
  );

  const standardCredentials = useMemo(
    () => credentials.filter((c) => c.tier === 'standard'),
    []
  );

  const activityCredentials = useMemo(
    () => credentials.filter((c) => c.tier === 'activity'),
    []
  );

  // Filtered list under the chips
  const filteredGridCredentials = useMemo(() => {
    if (activeCategory === 'All') {
      return standardCredentials;
    }
    if (activeCategory === 'Activities') {
      return activityCredentials;
    }
    // Specific category: show both standard and featured from that category
    return credentials.filter((c) => c.category === activeCategory && c.tier !== 'activity');
  }, [activeCategory, standardCredentials, activityCredentials]);

  const openViewer = (cred: Credential, list: Credential[]) => {
    setSelectedCredential(cred);
    setActiveViewerList(list);
  };

  const closeViewer = () => {
    setSelectedCredential(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="credentials"
      aria-label="Credentials"
      className="relative py-20 lg:py-28 bg-ivory border-b border-warm-border overflow-hidden"
    >
      {/* Giant Outlined Section Numeral 06 */}
      <SectionNumeral numeral="06" sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="space-y-3">
            <SectionLabel label="— CREDENTIALS" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              Learning, <span className="italic text-burnt-orange font-normal">verified.</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-muted-grey uppercase tracking-wider">
              {credentials.length} certificates
            </p>
          </div>
        </Reveal>

        {/* 1) FEATURED ROW: 4 cards (2 cols tablet, 4 cols desktop, 1 col mobile) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-charcoal/70 font-medium">
              Featured Credentials
            </span>
          </div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredCredentials.map((cred) => {
              const formattedDate = formatCredentialDate(cred.date);
              const typeLabel = typeLabelMap[cred.type];

              return (
                <m.div key={cred.id} variants={cardVariants} className="h-full">
                  <Card className="group p-5 flex flex-col justify-between h-full border border-warm-border hover:border-burnt-orange transition-colors duration-200">
                    <div className="space-y-3">
                      {/* Certificate Thumbnail with hover zoom */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => openViewer(cred, featuredCredentials)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openViewer(cred, featuredCredentials);
                          }
                        }}
                        className="relative aspect-[4/3] rounded overflow-hidden bg-cream cursor-pointer group/thumb border border-warm-border/60"
                        aria-label={`View ${cred.title} certificate`}
                      >
                        <SkeletonImage
                          src={cred.thumb}
                          alt={`${cred.title} certificate`}
                          aspectRatio="aspect-[4/3]"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-charcoal/0 group-hover/thumb:bg-charcoal/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                          <span className="px-2.5 py-1 text-xs font-mono font-medium text-white bg-charcoal/80 backdrop-blur-xs rounded shadow-xs">
                            Preview
                          </span>
                        </div>
                      </div>

                      {/* Header tags: Type tag if applicable */}
                      {typeLabel && (
                        <div>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-cream border border-warm-border text-charcoal/80">
                            {typeLabel}
                          </span>
                        </div>
                      )}

                      {/* Title & Issuer */}
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-charcoal leading-snug line-clamp-2">
                          {cred.title}
                        </h3>
                        <div className="text-xs font-mono text-muted-grey mt-1">
                          {cred.issuer}
                        </div>
                      </div>

                      {/* Extra info line if present */}
                      {cred.extra && (
                        <div className="font-mono text-xs text-burnt-orange font-medium">
                          {cred.extra}
                        </div>
                      )}

                      {/* Date in mono */}
                      {formattedDate && (
                        <div className="text-xs font-mono text-charcoal/60">
                          {formattedDate}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 mt-3 border-t border-warm-border/60 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => openViewer(cred, featuredCredentials)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-burnt-orange hover:text-light-orange transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View certificate</span>
                      </button>

                      {cred.verifyUrl && (
                        <a
                          href={cred.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-muted-grey hover:text-burnt-orange transition-colors"
                          aria-label={`Verify ${cred.title} on official site`}
                        >
                          <span>Verify</span>
                          <ArrowUpRight className="w-3 h-3 stroke-[2.2]" />
                        </a>
                      )}
                    </div>
                  </Card>
                </m.div>
              );
            })}
          </m.div>
        </div>

        {/* 2) FILTER CHIPS & STANDARD/FILTERED GRID */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-warm-border">
            {/* Filter Chips with sliding orange pill */}
            <div
              role="group"
              aria-label="Filter credentials by category"
              className="flex flex-wrap items-center gap-2"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 cursor-pointer ${
                      isSelected
                        ? 'text-[var(--on-accent)]'
                        : 'text-charcoal/80 bg-card-surface hover:bg-cream border border-warm-border'
                    }`}
                  >
                    {isSelected && (
                      <m.span
                        layoutId="activeCredentialsFilterPill"
                        className="absolute inset-0 bg-burnt-orange rounded-full -z-10"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 28 }
                        }
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono text-muted-grey uppercase tracking-wider">
              {filteredGridCredentials.length}{' '}
              {filteredGridCredentials.length === 1 ? 'credential' : 'credentials'}
            </span>
          </div>

          {/* Grid below the filter chips */}
          <m.div layout className="relative">
            <AnimatePresence mode="popLayout">
              <m.div
                key={activeCategory}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: EASING }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredGridCredentials.map((cred) => {
                  const formattedDate = formatCredentialDate(cred.date);
                  const typeLabel = typeLabelMap[cred.type];

                  return (
                    <Card
                      key={cred.id}
                      className="group p-4 flex flex-col justify-between h-full border border-warm-border hover:border-burnt-orange transition-colors duration-200"
                    >
                      <div className="space-y-3">
                        {/* Compact thumbnail on top */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => openViewer(cred, filteredGridCredentials)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openViewer(cred, filteredGridCredentials);
                            }
                          }}
                          className="relative aspect-[4/3] rounded overflow-hidden bg-cream cursor-pointer group/thumb border border-warm-border/60"
                          aria-label={`View ${cred.title} certificate`}
                        >
                          <SkeletonImage
                            src={cred.thumb}
                            alt={`${cred.title} certificate`}
                            aspectRatio="aspect-[4/3]"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-charcoal/0 group-hover/thumb:bg-charcoal/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                            <span className="px-2.5 py-1 text-xs font-mono font-medium text-white bg-charcoal/80 backdrop-blur-xs rounded shadow-xs">
                              Preview
                            </span>
                          </div>
                        </div>

                        {/* Title, Badge (Cisco), Type Tag & Issuer */}
                        <div className="space-y-1.5">
                          <div className="flex items-start gap-2.5">
                            {/* Cisco Introduction to Data Science badge (56px) */}
                            {cred.badge && (
                              <img
                                src={cred.badge}
                                alt={`${cred.title} badge`}
                                width={56}
                                height={56}
                                className="w-14 h-14 object-contain rounded shrink-0 border border-warm-border bg-cream/40 p-1"
                                loading="lazy"
                                decoding="async"
                              />
                            )}

                            <div className="space-y-1 flex-1">
                              {typeLabel && (
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cream border border-warm-border text-charcoal/80 inline-block mb-0.5">
                                  {typeLabel}
                                </span>
                              )}
                              <h4 className="font-serif text-base font-semibold text-charcoal leading-snug">
                                {cred.title}
                              </h4>
                            </div>
                          </div>

                          <div className="text-xs font-mono text-muted-grey">
                            {cred.issuer}
                          </div>

                          {cred.extra && (
                            <div className="font-mono text-xs text-burnt-orange font-medium">
                              {cred.extra}
                            </div>
                          )}

                          {formattedDate && (
                            <div className="text-xs font-mono text-charcoal/60">
                              {formattedDate}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 mt-3 border-t border-warm-border/60 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => openViewer(cred, filteredGridCredentials)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-burnt-orange hover:text-light-orange transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View certificate</span>
                        </button>

                        {cred.verifyUrl && (
                          <a
                            href={cred.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-muted-grey hover:text-burnt-orange transition-colors"
                            aria-label={`Verify ${cred.title} on official site`}
                          >
                            <span>Verify</span>
                            <ArrowUpRight className="w-3 h-3 stroke-[2.2]" />
                          </a>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </m.div>
            </AnimatePresence>
          </m.div>
        </div>

        {/* 3) ACTIVITIES: Hidden behind quiet text button when not viewing "Activities" filter */}
        {activeCategory !== 'Activities' && (
          <div className="pt-6 border-t border-warm-border/60 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowActivities(!showActivities)}
              className="inline-flex items-center gap-2 text-xs font-mono text-muted-grey hover:text-burnt-orange transition-colors py-2 px-3 rounded hover:bg-cream/60 cursor-pointer"
              aria-expanded={showActivities}
            >
              <span>
                {showActivities
                  ? 'Hide activities and participation'
                  : `Show activities and participation (${activityCredentials.length})`}
              </span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  showActivities && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {showActivities && (
                <m.div
                  initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: EASING }}
                  className="w-full mt-6 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 opacity-90">
                    {activityCredentials.map((cred) => {
                      const formattedDate = formatCredentialDate(cred.date);
                      const typeLabel = typeLabelMap[cred.type] || 'Participation';

                      return (
                        <Card
                          key={cred.id}
                          className="group p-4 flex flex-col justify-between h-full border border-warm-border/80 hover:border-burnt-orange/70 transition-colors duration-200 bg-card-surface/60"
                        >
                          <div className="space-y-3">
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={() => openViewer(cred, activityCredentials)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  openViewer(cred, activityCredentials);
                                }
                              }}
                              className="relative aspect-[4/3] rounded overflow-hidden bg-cream cursor-pointer group/thumb border border-warm-border/60"
                              aria-label={`View ${cred.title} certificate`}
                            >
                              <SkeletonImage
                                src={cred.thumb}
                                alt={`${cred.title} certificate`}
                                aspectRatio="aspect-[4/3]"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              />
                            </div>

                            <div className="space-y-1">
                              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cream border border-warm-border text-charcoal/70 inline-block">
                                {typeLabel}
                              </span>
                              <h4 className="font-serif text-sm font-semibold text-charcoal leading-snug">
                                {cred.title}
                              </h4>
                              <div className="text-xs font-mono text-muted-grey">
                                {cred.issuer}
                              </div>
                              {formattedDate && (
                                <div className="text-[11px] font-mono text-charcoal/60">
                                  {formattedDate}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 mt-2 border-t border-warm-border/40">
                            <button
                              type="button"
                              onClick={() => openViewer(cred, activityCredentials)}
                              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-burnt-orange hover:text-light-orange transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View certificate</span>
                            </button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox Viewer modal (lazy-loaded in Suspense) */}
      <Suspense fallback={null}>
        {selectedCredential && (
          <CertificateViewer
            isOpen={Boolean(selectedCredential)}
            credential={selectedCredential}
            credentialsList={activeViewerList}
            onClose={closeViewer}
            onNavigate={(next) => setSelectedCredential(next)}
          />
        )}
      </Suspense>
    </section>
  );
};

export default Credentials;
