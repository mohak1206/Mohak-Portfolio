import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Github, FlaskConical, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData, labIdeasData } from '../../data/projects';
import { Project } from '../../types';
import { SectionLabel } from '../common/SectionLabel';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  showAll?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Home page shows the 4 featured projects strictly in order
  const featuredProjects = projectsData.filter((p) => p.isFeatured).slice(0, 4);
  const displayProjects = showAll ? projectsData : featuredProjects;

  return (
    <section id="projects" aria-label="Projects" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching reference */}
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

        {/* 4 Cards Grid (as in reference: 4 cols on desktop, 2 cols on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Civic-I & Additional Projects if on full /projects or view more */}
        {showAll && (
          <div className="pt-8 space-y-6">
            <h3 className="font-serif text-2xl text-charcoal font-medium">In-Progress Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData
                .filter((p) => !p.isFeatured)
                .map((project) => (
                  <div
                    key={project.slug}
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer bg-white border border-warm-border rounded-[6px] p-6 hover:border-burnt-orange/50 transition-all shadow-sm hover:shadow-float flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-amber-100 text-amber-800 border border-amber-300">
                          {project.status} {project.badge ? `(${project.badge})` : ''}
                        </span>
                        <div className="w-7 h-7 rounded bg-ivory border border-warm-border flex items-center justify-center text-charcoal">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="font-serif text-xl font-semibold text-charcoal">{project.title}</h4>
                      <p className="text-sm text-muted-grey leading-relaxed">{project.oneLiner}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {project.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[11px] font-mono bg-ivory text-charcoal/80 rounded border border-warm-border">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Lab & Ideas Sub-section (Ideas & Prototypes) */}
        <div className="pt-12 border-t border-warm-border space-y-8">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-burnt-orange" />
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              Lab & Ideas
            </h3>
            <span className="text-xs font-mono px-2.5 py-0.5 bg-cream rounded-full text-muted-grey border border-warm-border">
              Concepts & Explorations
            </span>
          </div>

          <p className="text-sm text-muted-grey max-w-2xl">
            Early-stage architectural explorations, system designs, and proof-of-concept repositories exploring intelligent workflows and healthcare access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {labIdeasData.map((idea, idx) => (
              <div
                key={idx}
                className="bg-white/80 border border-warm-border rounded-[6px] p-5 space-y-4 flex flex-col justify-between hover:border-burnt-orange/40 transition-colors shadow-sm"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
                        idea.badge === 'Concept'
                          ? 'bg-cream text-charcoal/80 border border-warm-border'
                          : 'bg-orange-50 text-burnt-orange border border-burnt-orange/30'
                      }`}
                    >
                      {idea.badge}
                    </span>

                    {idea.githubUrl && (
                      <a
                        href={idea.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-grey hover:text-burnt-orange transition-colors"
                        aria-label={`View ${idea.title} on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-charcoal">{idea.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-grey leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                {idea.stack && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-warm-border/60">
                    {idea.stack.map((s) => (
                      <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 bg-ivory text-charcoal/70 rounded border border-warm-border/60">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
