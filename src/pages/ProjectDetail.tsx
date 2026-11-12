import React, { Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github, AlertCircle, CheckCircle2 } from 'lucide-react';
import { m } from 'framer-motion';
import { projectsData } from '../data/projects';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProjectCover } from '../components/ui/ProjectCover';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { SplitLines } from '../components/ui/SplitLines';
import { CountUp } from '../components/ui/CountUp';
import { Reveal } from '../components/ui/Reveal';
import { GlossaryTooltip } from '../components/ui/GlossaryTooltip';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePageMeta } from '../hooks/usePageMeta';
import { EASING, DEFAULT_VIEWPORT } from '../lib/animation';

const ThresholdDemo = React.lazy(
  () => import('../components/projects/ThresholdDemo').then((m) => ({ default: m.ThresholdDemo }))
);

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const project = projectsData.find((p) => p.slug === slug);
  const hasNumericMetrics = !!(project?.metrics && project.metrics.some((m) => m.numericValue !== undefined));

  usePageMeta({
    title: project?.title || 'Project',
    description: project?.oneLiner || '',
    path: `/projects/${slug || ''}`,
  });

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
              className="group draw-underline-link inline-flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-burnt-orange transition-colors py-0.5"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to projects</span>
            </button>
          </div>

          <Reveal delay={0.05}>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Tag variant="badge" status={project.status}>
                  {project.status} {project.badge ? `(${project.badge})` : ''}
                </Tag>
                <span className="text-xs font-mono text-muted-grey uppercase tracking-wider">
                  {project.category}
                </span>
              </div>

              {/* Title uses SplitLines */}
              <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-medium">
                <SplitLines lines={[project.title]} />
              </h1>

              <p className="text-lg text-muted-grey leading-relaxed">
                {project.oneLiner}
              </p>
            </div>
          </Reveal>

          {/* Cover image with slow clip-path mask reveal and 1.04 to 1 scale settle */}
          <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden border border-warm-border shadow-float">
            <m.div
              className="w-full h-full origin-center"
              initial={prefersReducedMotion ? false : { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.04 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
              transition={{ duration: 0.9, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
            >
              <ProjectCover slug={project.slug} title={project.title} />
            </m.div>
          </div>

          {hasNumericMetrics && project.metrics && (
            <Reveal delay={0.25}>
              <Card elevated className="p-6 sm:p-8 space-y-6 bg-card-surface">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-border pb-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
                      VERIFIED TEST RESULTS & BENCHMARKS
                    </div>
                    <h2 className="font-serif text-2xl text-charcoal font-medium mt-1">
                      Empirical Model Performance
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-muted-grey">
                    Independent Validation & Test Evaluation
                  </span>
                </div>

                {/* Horizontal Result Bars: charcoal track on cream, burnt-orange fill animated from 0 on view */}
                <div className="space-y-4 pt-1">
                  {project.metrics.map((metricItem, idx) => {
                    const valNum = metricItem.numericValue ?? parseFloat(metricItem.value.replace(/[^0-9.]/g, ''));
                    const isNumeric = !isNaN(valNum) && valNum > 0;

                    return (
                      <div
                        key={idx}
                        tabIndex={0}
                        aria-label={`${metricItem.label}: ${metricItem.value}`}
                        className="group/bar relative space-y-1.5 focus:outline-none focus:ring-1 focus:ring-burnt-orange rounded p-1 transition-colors"
                      >
                        {/* Hover/focus tooltip */}
                        <div
                          role="tooltip"
                          className="absolute -top-7 right-0 opacity-0 group-hover/bar:opacity-100 group-focus/bar:opacity-100 group-focus-within/bar:opacity-100 transition-opacity duration-200 bg-charcoal text-ivory border border-warm-border text-[11px] font-mono px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20"
                        >
                          {metricItem.label}: {metricItem.value}
                        </div>

                        <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                          <span className="text-charcoal font-medium">
                            <GlossaryTooltip term={metricItem.label}>{metricItem.label}</GlossaryTooltip>
                          </span>
                          <span className="text-burnt-orange font-semibold">
                            <CountUp value={metricItem.value} />
                          </span>
                        </div>

                        {/* Charcoal track on cream */}
                        <div className="h-3 w-full bg-[var(--surface-2)] rounded-full overflow-hidden p-0.5 border border-warm-border">
                          {isNumeric ? (
                            <m.div
                              className="h-full bg-burnt-orange rounded-full group-hover/bar:bg-light-orange transition-colors"
                              initial={prefersReducedMotion ? false : { width: '0%' }}
                              whileInView={{ width: `${Math.min(valNum, 100)}%` }}
                              viewport={DEFAULT_VIEWPORT}
                              transition={{
                                duration: 0.85,
                                delay: prefersReducedMotion ? 0 : 0.15 + idx * 0.1,
                                ease: EASING,
                              }}
                            />
                          ) : (
                            <div className="h-full bg-muted-grey/30 rounded-full w-full" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Reveal>
          )}

          {/* Interactive Confidence Threshold Playground (Signature & Fire/Smoke Detection) */}
          {(project.slug === 'signature-detection' || project.slug === 'fire-smoke-detection') && (
            <Reveal delay={0.28}>
              <Suspense
                fallback={
                  <div className="h-64 rounded-[8px] bg-card-surface border border-warm-border flex items-center justify-center font-mono text-xs text-muted-grey">
                    Loading confidence threshold playground...
                  </div>
                }
              >
                <ThresholdDemo slug={project.slug} />
              </Suspense>
            </Reveal>
          )}

          {project.limitations && (
            <Reveal delay={0.2}>
              <div className="flex items-start gap-3 bg-amber-50/80 border border-amber-200 rounded-[6px] p-4 text-sm text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Honest Assessment & Limitations: </span>
                  <span>{project.limitations}</span>
                </div>
              </div>
            </Reveal>
          )}

          {project.accuracyNote && (
            <Reveal delay={0.22}>
              <div className="flex items-start gap-3 bg-stone-100 border border-stone-300 rounded-[6px] p-4 text-sm text-charcoal">
                <AlertCircle className="w-4 h-4 text-muted-grey shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Technical Architecture Note: </span>
                  <span>{project.accuracyNote}</span>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.25}>
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
          </Reveal>

          {project.features && project.features.length > 0 && (
            <Reveal delay={0.3}>
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
            </Reveal>
          )}

          {project.dataset && (
            <Reveal delay={0.35}>
              <Card elevated className="p-6 space-y-3">
                <h2 className="font-serif text-xl text-charcoal font-medium">Dataset & Experimentation Workflow</h2>
                <p className="text-sm text-muted-grey leading-relaxed">{project.dataset}</p>
              </Card>
            </Reveal>
          )}

          <Reveal delay={0.4}>
            <div className="space-y-2 bg-cream/60 border border-warm-border rounded-[8px] p-5">
              <div className="text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
                My Contribution
              </div>
              <p className="text-sm text-charcoal/90 font-medium">{project.contribution}</p>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-charcoal font-medium">Challenge & Learnings</h2>
              <p className="text-sm text-muted-grey leading-relaxed">{project.challengesAndLearnings}</p>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-charcoal font-medium">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech} variant="mono" className="px-3 py-1.5 text-xs bg-card-surface">
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Slim bordered note replacing any screenshot coming-soon placeholders */}
          {project.githubUrl && (
            <Reveal delay={0.55}>
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
            </Reveal>
          )}

          {project.githubUrl && (
            <Reveal delay={0.6}>
              <div className="pt-6 border-t border-warm-border flex justify-between items-center">
                <Link
                  to="/#projects"
                  className="draw-underline-link text-sm font-semibold text-charcoal hover:text-burnt-orange py-0.5"
                >
                  ← Back to overview
                </Link>

                <Button asAnchor href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
