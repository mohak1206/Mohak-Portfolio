import React, { useRef } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { ProjectCover } from './ProjectCover';
import { Tag } from './Tag';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, className = '' }) => {
  const cardRef = useRef<HTMLElement>(null);
  const isFine = useFinePointer();
  const prefersReduced = useReducedMotion();

  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);

  // Subtle 3D tilt: max 4 degrees on both axes following the pointer (perspective 900px)
  const springConfig = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(useTransform(yPct, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(xPct, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFine || prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    xPct.set(x);
    yPct.set(y);
  };

  const handleMouseLeave = () => {
    xPct.set(0);
    yPct.set(0);
  };

  return (
    <div style={{ perspective: '900px' }} className={`h-full ${className}`}>
      <m.article
        ref={cardRef}
        data-cursor="view"
        tabIndex={0}
        role="button"
        aria-label={`View details for ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isFine && !prefersReduced ? rotateX : 0,
          rotateY: isFine && !prefersReduced ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="group cursor-pointer bg-card-surface rounded-[6px] border border-warm-border overflow-hidden hover:border-burnt-orange hover:-translate-y-1.5 hover:shadow-float focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 transition-all duration-300 shadow-sm flex flex-col h-full select-none"
      >
        <div className="relative w-full aspect-[16/10] bg-cream overflow-hidden border-b border-warm-border">
          <ProjectCover slug={project.slug} title={project.title} />

          {/* Highlight chip slides up over bottom of cover on hover & keyboard focus */}
          {project.highlight && (
            <div className="absolute bottom-3 left-3 z-10 transition-all duration-300 ease-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-ivory/95 backdrop-blur-sm text-charcoal border border-warm-border rounded-[4px] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange shrink-0" aria-hidden="true" />
                <span>{project.highlight}</span>
              </span>
            </div>
          )}

          {/* Top-right arrow button with diagonal swap */}
          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-[4px] bg-card-surface text-charcoal flex items-center justify-center shadow-md border border-warm-border group-hover:bg-burnt-orange group-hover:text-[var(--on-accent)] group-hover:border-burnt-orange transition-all duration-200 overflow-hidden">
            <ArrowUpRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" />
            <ArrowUpRight className="w-4 h-4 stroke-[2.2] absolute transition-transform duration-300 ease-out -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-1.5">
            {project.status !== 'Completed' && (
              <div className="pb-1">
                <Tag variant="badge" status="In progress">
                  In progress ({project.badge})
                </Tag>
              </div>
            )}
            <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-charcoal group-hover:text-burnt-orange transition-colors duration-200">
              {project.title.replace(' using YOLOv8', '').replace(': Cross-Platform College App', '')}
            </h3>
            <p className="text-xs sm:text-sm text-muted-grey line-clamp-2 leading-relaxed">
              {project.oneLiner}
            </p>
          </div>

          {/* Tags fade slightly up on card hover */}
          <div className="flex flex-wrap gap-1.5 pt-1 transition-all duration-300 group-hover:-translate-y-0.5">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="mono">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </m.article>
    </div>
  );
};

