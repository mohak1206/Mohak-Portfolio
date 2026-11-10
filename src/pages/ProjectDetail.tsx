import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, AlertCircle, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projects';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProjectCover } from '../components/ui/ProjectCover';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6 pt-32 text-center">
          <div className="space-y-4">
            <h1 className="font-serif text-3xl font-semibold">Project Not Found</h1>
            <p className="text-muted-grey text-sm">The project you are looking for does not exist.</p>
            <Button asAnchor href="/#projects" variant="primary">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-burnt-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to projects</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Tag variant="badge" status={project.status}>
                {project.status} {project.badge ? `(${project.badge})` : ''}
              </Tag>
              <span className="text-xs font-mono text-muted-grey uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-medium">
              {project.title}
            </h1>

            <p className="text-lg text-muted-grey leading-relaxed">
              {project.oneLiner}
            </p>
          </div>

          <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden border border-warm-border shadow-float">
            <ProjectCover slug={project.slug} title={project.title} />
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <Card elevated className="p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-grey mb-4 font-semibold">
                Verified Test Results
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-warm-border">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className={`${idx > 0 ? 'sm:pl-6 pt-3 sm:pt-0' : ''}`}>
                    <div className="font-serif text-3xl text-charcoal font-semibold">
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-grey mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {project.limitations && (
            <div className="flex items-start gap-3 bg-amber-50/80 border border-amber-200 rounded-[6px] p-4 text-sm text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Honest Assessment & Limitations: </span>
                <span>{project.limitations}</span>
              </div>
            </div>
          )}

          {project.accuracyNote && (
            <div className="flex items-start gap-3 bg-stone-100 border border-stone-300 rounded-[6px] p-4 text-sm text-charcoal">
              <AlertCircle className="w-4 h-4 text-muted-grey shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Technical Architecture Note: </span>
                <span>{project.accuracyNote}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card elevated className="p-6 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Problem Statement
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.problem}</p>
            </Card>

            <Card elevated className="p-6 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                Solution Approach
              </div>
              <p className="text-sm text-charcoal/90 leading-relaxed">{project.solution}</p>
            </Card>
          </div>

          {project.features && project.features.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-charcoal font-medium">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-charcoal/90">
                    <CheckCircle2 className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.dataset && (
            <Card elevated className="p-6 space-y-3">
              <h2 className="font-serif text-xl text-charcoal font-medium">Dataset & Experimentation Workflow</h2>
              <p className="text-sm text-muted-grey leading-relaxed">{project.dataset}</p>
            </Card>
          )}

          <div className="space-y-2 bg-cream/60 border border-warm-border rounded-[8px] p-5">
            <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              My Contribution
            </div>
            <p className="text-sm text-charcoal/90 font-medium">{project.contribution}</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">Challenge & Learnings</h2>
            <p className="text-sm text-muted-grey leading-relaxed">{project.challengesAndLearnings}</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech} variant="mono" className="px-3 py-1.5 text-xs bg-white">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          {/* Slim bordered note replacing any screenshot coming-soon placeholders */}
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
            <div className="pt-6 border-t border-warm-border flex justify-between items-center">
              <Link
                to="/#projects"
                className="text-sm font-semibold text-charcoal hover:text-burnt-orange"
              >
                ← Back to overview
              </Link>

              <Button asAnchor href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
