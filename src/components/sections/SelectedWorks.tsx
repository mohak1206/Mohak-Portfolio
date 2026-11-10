import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Github, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';
import { SectionLabel } from '../ui/SectionLabel';
import { ProjectCover } from '../ui/ProjectCover';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';

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
                <Tag key={tech} variant="mono" className="px-2.5 py-1 text-xs bg-white">
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
                className="text-burnt-orange font-semibold hover:text-light-orange inline-flex items-center gap-1.5 shrink-0"
              >
                <span>View on GitHub &rarr;</span>
              </a>
            </div>
          )}

          {project.githubUrl && (
            <div className="pt-2 flex justify-end">
              <Button asAnchor href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SelectedWorksProps {
  showAll?: boolean;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 5 featured projects
  const featuredProjects = projectsData.filter((p) => p.isFeatured);
  const displayProjects = showAll ? projectsData : featuredProjects;

  return (
    <section id="projects" aria-label="Projects" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <SectionLabel label="PROJECTS" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              Selected Works
            </h2>
          </div>

          {!showAll && (
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-burnt-orange hover:text-light-orange transition-colors"
            >
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* 3-column grid on desktop, 2 columns on tablet, 1 column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project) => (
            <article
              key={project.slug}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white rounded-[6px] border border-warm-border overflow-hidden hover:border-burnt-orange/50 transition-all duration-300 shadow-sm hover:shadow-float flex flex-col h-full"
            >
              <div className="relative w-full aspect-[16/10] bg-cream overflow-hidden border-b border-warm-border">
                <ProjectCover slug={project.slug} title={project.title} />

                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-[4px] bg-white/95 text-charcoal flex items-center justify-center shadow-md border border-warm-border group-hover:bg-burnt-orange group-hover:text-white group-hover:border-burnt-orange transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-charcoal group-hover:text-burnt-orange transition-colors duration-200">
                    {project.title.replace(' using YOLOv8', '').replace(': Cross-Platform College App', '')}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-grey line-clamp-2 leading-relaxed">
                    {project.oneLiner}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <Tag key={tag} variant="mono">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {/* 6th tile at the end: a cream (#EFE8DD) card linking to /projects */}
          {!showAll && (
            <Link
              to="/projects"
              className="group flex flex-col items-center justify-center p-8 bg-[#EFE8DD] rounded-[6px] border border-warm-border hover:border-burnt-orange/50 transition-all duration-300 shadow-sm hover:shadow-float text-center min-h-[300px]"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-warm-border flex items-center justify-center text-burnt-orange mb-4 group-hover:bg-burnt-orange group-hover:text-white group-hover:border-burnt-orange transition-all duration-200">
                <ArrowRight className="w-5 h-5 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-serif text-2xl font-semibold text-charcoal group-hover:text-burnt-orange transition-colors">
                View all projects
              </span>
              <span className="text-xs font-mono text-muted-grey mt-2">
                Explore all prototypes & lab ideas &rarr;
              </span>
            </Link>
          )}
        </div>

        {showAll && (
          <div className="pt-8 space-y-6">
            <h3 className="font-serif text-2xl text-charcoal font-medium">In-Progress Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData
                .filter((p) => !p.isFeatured)
                .map((project) => (
                  <Card
                    key={project.slug}
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer p-6 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Tag variant="badge" status="In progress">
                          In progress ({project.badge})
                        </Tag>
                        <div className="w-7 h-7 rounded bg-ivory border border-warm-border flex items-center justify-center text-charcoal">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="font-serif text-xl font-semibold text-charcoal">{project.title}</h4>
                      <p className="text-sm text-muted-grey leading-relaxed">{project.oneLiner}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {project.tags.map((t) => (
                        <Tag key={t} variant="mono">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
