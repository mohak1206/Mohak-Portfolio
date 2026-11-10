import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, Github, AlertCircle, CheckCircle2, Cpu, Wrench } from 'lucide-react';
import { Project } from '../../types';
import { ProjectCardArt } from '../common/ProjectCardArt';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-ivory/95 backdrop-blur-md border-b border-warm-border">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-mono font-medium ${
                project.status === 'Completed'
                  ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-300/60'
                  : 'bg-amber-100/80 text-amber-800 border border-amber-300/60'
              }`}
            >
              {project.status} {project.badge ? `(${project.badge})` : ''}
            </span>
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

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Title & Cover */}
          <div className="space-y-4">
            <h3 id="modal-title" className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-muted-grey font-normal">
              {project.oneLiner}
            </p>

            <div className="w-full aspect-[16/9] rounded-[6px] overflow-hidden border border-warm-border shadow-sm">
              <ProjectCardArt slug={project.slug} title={project.title} />
            </div>
          </div>

          {/* Metrics Strip (if available) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="bg-white border border-warm-border rounded-[6px] p-4 sm:p-5 shadow-sm">
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
            </div>
          )}

          {/* Honest Note / Limitations (e.g. for Fire & Smoke) */}
          {project.limitations && (
            <div className="flex items-start gap-3 bg-amber-50/70 border border-amber-200/80 rounded-[6px] p-4 text-xs sm:text-sm text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Honest Assessment & Limitations: </span>
                <span>{project.limitations}</span>
              </div>
            </div>
          )}

          {/* Accuracy Note (e.g. for Inventory) */}
          {project.accuracyNote && (
            <div className="flex items-start gap-3 bg-stone-100/90 border border-stone-300/80 rounded-[6px] p-4 text-xs sm:text-sm text-charcoal">
              <AlertCircle className="w-4 h-4 text-muted-grey shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Technical Architecture Note: </span>
                <span>{project.accuracyNote}</span>
              </div>
            </div>
          )}

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 border border-warm-border rounded-[6px] p-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Problem Statement
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.problem}</p>
            </div>

            <div className="bg-white/70 border border-warm-border rounded-[6px] p-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Solution Approach
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Features (if present) */}
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

          {/* Dataset & Training Specs (if present) */}
          {project.dataset && (
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
                Dataset & Experimentation Workflow
              </div>
              <p className="text-sm text-muted-grey leading-relaxed">{project.dataset}</p>
            </div>
          )}

          {/* My Contribution */}
          <div className="space-y-2 bg-cream/50 border border-warm-border rounded-[6px] p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              My Contribution
            </div>
            <p className="text-sm text-charcoal/90 font-medium">{project.contribution}</p>
          </div>

          {/* Challenges & Learnings */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              Challenge & Learning
            </div>
            <p className="text-sm text-muted-grey leading-relaxed">
              {project.challengesAndLearnings}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-white border border-warm-border text-charcoal rounded-[4px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshot Gallery Placeholder */}
          <div className="p-6 border border-dashed border-warm-border rounded-[6px] text-center bg-cream/30">
            <p className="text-xs sm:text-sm text-muted-grey font-mono">
              Screenshots coming soon · High-resolution outputs will be populated here
            </p>
          </div>

          {/* GitHub CTA (Rule: No live demo exists yet, so do NOT show a "Live demo" button. Show "GitHub" only.) */}
          {project.githubUrl && (
            <div className="pt-2 flex justify-end">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-burnt-orange hover:bg-light-orange text-white text-sm font-medium rounded-[5px] shadow-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
