import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionNumeral } from '../ui/SectionNumeral';
import { ProjectCard } from '../ui/ProjectCard';
import { ProjectModal } from '../ui/ProjectModal';
import { SpotlightOverlay } from '../ui/SpotlightOverlay';
import { useSpotlight } from '../../hooks/useSpotlight';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { m, AnimatePresence, type Variants } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

const FILTER_CATEGORIES = ['All', 'AI / ML', 'Full-Stack', 'Mobile'];

interface SelectedWorksProps {
  showAll?: boolean;
}

const ViewAllProjectsTile: React.FC = () => {
  const { ref, isHovered, bind } = useSpotlight<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      to="/projects"
      onPointerEnter={bind.onPointerEnter}
      onPointerMove={bind.onPointerMove}
      onPointerLeave={bind.onPointerLeave}
      className="group relative overflow-hidden flex flex-col items-center justify-center p-8 bg-cream hover:bg-cream/80 rounded-[6px] border border-warm-border hover:border-burnt-orange hover:-translate-y-1.5 hover:shadow-float transition-all duration-300 shadow-sm text-center min-h-[300px] h-full"
    >
      <SpotlightOverlay isHovered={isHovered} />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-card-surface border border-warm-border flex items-center justify-center text-burnt-orange mb-4 group-hover:bg-burnt-orange group-hover:text-[var(--on-accent)] group-hover:border-burnt-orange transition-all duration-200">
          <ArrowRight className="w-5 h-5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-[6px]" />
        </div>
        <span className="font-serif text-2xl font-semibold text-charcoal group-hover:text-burnt-orange transition-colors">
          View all projects
        </span>
        <span className="text-xs font-mono text-muted-grey mt-2">
          Explore all prototypes & lab ideas &rarr;
        </span>
      </div>
    </Link>
  );
};

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // 5 featured projects on Home, or filterable full list on /projects
  const featuredProjects = projectsData.filter((p) => p.isFeatured);
  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.categories && p.categories.includes(activeFilter));

  const displayProjects = showAll ? filteredProjects : featuredProjects;

  const cardsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects"
      className="relative py-20 lg:py-28 bg-ivory border-b border-warm-border overflow-hidden"
    >
      {/* Giant Outlined Section Numeral 03 */}
      <SectionNumeral numeral="03" sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <SectionLabel label="PROJECTS" />
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
                <SplitLines lines={showAll ? ['All Systems & Works'] : ['Selected Works']} />
              </h2>
            </div>

            {!showAll && (
              <Link
                to="/projects"
                className="draw-underline-link inline-flex items-center gap-1.5 text-sm font-semibold text-burnt-orange hover:text-light-orange transition-colors py-0.5"
              >
                <span>View all projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </Reveal>

        {/* Filter chips at top - /projects page only */}
        {showAll && (
          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-warm-border">
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap items-center gap-2"
              >
                {FILTER_CATEGORIES.map((cat) => {
                  const isSelected = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setActiveFilter(cat)}
                      className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 ${
                        isSelected
                          ? 'text-[var(--on-accent)]'
                          : 'text-charcoal/80 bg-card-surface hover:bg-cream border border-warm-border'
                      }`}
                    >
                      {isSelected && (
                        <m.span
                          layoutId="activeFilterPill"
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

              {/* Small mono count */}
              <span className="text-xs font-mono text-muted-grey uppercase tracking-wider">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>
          </Reveal>
        )}

        {/* 3-column grid on desktop, 2 columns on tablet, 1 column on mobile */}
        <AnimatePresence mode="popLayout">
          <m.div
            layout
            key={showAll ? activeFilter : 'featured-grid'}
            variants={cardsContainerVariants}
            initial="hidden"
            animate="show"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayProjects.map((project) => (
              <m.div
                key={project.slug}
                layout
                variants={cardItemVariants}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: EASING }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </m.div>
            ))}

            {/* 6th tile at the end on Home page: a cream card linking to /projects */}
            {!showAll && (
              <m.div variants={cardItemVariants} className="h-full">
                <ViewAllProjectsTile />
              </m.div>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
