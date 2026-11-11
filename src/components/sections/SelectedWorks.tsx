import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Github, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';
import { SectionLabel } from '../ui/SectionLabel';
import { ProjectCover } from '../ui/ProjectCover';
import { ProjectCard } from '../ui/ProjectCard';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { m, AnimatePresence, type Variants } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-charcoal/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-ivory border border-warm-border rounded-[8px] shadow-modal overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-ivory/95 backdrop-blur-md border-b border-warm-border">
          <div className="flex items-center gap-3">
            <Tag variant="badge" status={project.status}>
              {project.status} {project.badge ? `(${project.badge})` : ''}
            </Tag>
            <span className="text-xs font-mono text-muted-grey uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal hover:bg-cream transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          <div className="space-y-4">
            <h3 id="modal-title" className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-muted-grey font-normal">
              {project.oneLiner}
            </p>

            <div className="w-full aspect-[16/9] rounded-[6px] overflow-hidden border border-warm-border shadow-sm">
              <ProjectCover slug={project.slug} title={project.title} />
            </div>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <Card elevated className="p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-grey mb-3 font-semibold">
                Verified Test Results
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-warm-border">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className={`${idx > 0 ? 'sm:pl-4 pt-2 sm:pt-0' : ''}`}>
                    <div className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-grey mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {project.limitations && (
            <div className="flex items-start gap-3 bg-amber-50/70 border border-amber-200/80 rounded-[6px] p-4 text-xs sm:text-sm text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Honest Assessment & Limitations: </span>
                <span>{project.limitations}</span>
              </div>
            </div>
          )}

          {project.accuracyNote && (
            <div className="flex items-start gap-3 bg-stone-100/90 border border-stone-300/80 rounded-[6px] p-4 text-xs sm:text-sm text-charcoal">
              <AlertCircle className="w-4 h-4 text-muted-grey shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Technical Architecture Note: </span>
                <span>{project.accuracyNote}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevated className="p-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Problem Statement
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.problem}</p>
            </Card>

            <Card elevated className="p-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Solution Approach
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.solution}</p>
            </Card>
          </div>

          {project.features && project.features.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
                Key Features
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-charcoal/90">
                    <CheckCircle2 className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.dataset && (
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
                Dataset & Experimentation Workflow
              </div>
              <p className="text-sm text-muted-grey leading-relaxed">{project.dataset}</p>
            </div>
          )}

          <div className="space-y-2 bg-cream/50 border border-warm-border rounded-[6px] p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              My Contribution
            </div>
            <p className="text-sm text-charcoal/90 font-medium">{project.contribution}</p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              Challenge & Learning
            </div>
            <p className="text-sm text-muted-grey leading-relaxed">
              {project.challengesAndLearnings}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech} variant="mono" className="px-2.5 py-1 text-xs bg-card-surface">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          {/* Replaced coming-soon placeholder with GitHub link note */}
          {project.githubUrl && (
            <div className="p-4 bg-cream border border-warm-border rounded-[6px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-2.5 text-charcoal/90">
                <Github className="w-4 h-4 text-burnt-orange shrink-0" />
                <span>For more details, code and documentation, visit the GitHub repository</span>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-underline-link text-burnt-orange font-semibold hover:text-light-orange inline-flex items-center gap-1.5 shrink-0 py-0.5"
              >
                <span>View on GitHub &rarr;</span>
              </a>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-warm-border pt-4">
            <Link
              to={`/projects/${project.slug}`}
              onClick={onClose}
              className="draw-underline-link text-xs sm:text-sm font-semibold text-charcoal hover:text-burnt-orange inline-flex items-center gap-1.5 py-0.5"
            >
              <span>Open dedicated project page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {project.githubUrl && (
              <Button asAnchor href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FILTER_CATEGORIES = ['All', 'AI / ML', 'Full-Stack', 'Mobile'];

interface SelectedWorksProps {
  showAll?: boolean;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const prefersReducedMotion = useReducedMotion();

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
    <section id="projects" aria-label="Projects" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
                <Link
                  to="/projects"
                  className="group flex flex-col items-center justify-center p-8 bg-cream hover:bg-cream/80 rounded-[6px] border border-warm-border hover:border-burnt-orange hover:-translate-y-1.5 hover:shadow-float transition-all duration-300 shadow-sm text-center min-h-[300px] h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-card-surface border border-warm-border flex items-center justify-center text-burnt-orange mb-4 group-hover:bg-burnt-orange group-hover:text-[var(--on-accent)] group-hover:border-burnt-orange transition-all duration-200">
                    <ArrowRight className="w-5 h-5 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-[6px]" />
                  </div>
                  <span className="font-serif text-2xl font-semibold text-charcoal group-hover:text-burnt-orange transition-colors">
                    View all projects
                  </span>
                  <span className="text-xs font-mono text-muted-grey mt-2">
                    Explore all prototypes & lab ideas &rarr;
                  </span>
                </Link>
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
