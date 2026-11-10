import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { ProjectCardArt } from '../common/ProjectCardArt';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(project)}
      className="group cursor-pointer bg-white rounded-[6px] border border-warm-border overflow-hidden hover:border-burnt-orange/50 transition-all duration-300 shadow-sm hover:shadow-float flex flex-col h-full"
    >
      {/* Cover Image Container */}
      <div className="relative w-full aspect-[16/10] bg-cream overflow-hidden border-b border-warm-border">
        <ProjectCardArt slug={project.slug} title={project.title} />

        {/* Top-Right Square Arrow Button (as shown in reference) */}
        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-[4px] bg-white/95 text-charcoal flex items-center justify-center shadow-md border border-warm-border group-hover:bg-burnt-orange group-hover:text-white group-hover:border-burnt-orange transition-all duration-200">
          <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-charcoal group-hover:text-burnt-orange transition-colors duration-200">
            {project.title.replace(' using YOLOv8', '').replace(': Cross-Platform College App', '')}
          </h3>
          <p className="text-xs sm:text-sm text-muted-grey line-clamp-2 leading-relaxed">
            {project.oneLiner}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono bg-ivory text-charcoal/80 rounded-[3px] border border-warm-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
