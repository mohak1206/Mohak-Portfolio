import React from 'react';
import { FlaskConical, Github } from 'lucide-react';
import { labIdeasData } from '../../data/projects';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { Reveal } from '../ui/Reveal';

export const LabIdeas: React.FC = () => {
  return (
    <section aria-label="Lab & Ideas" className="py-16 lg:py-24 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Reveal>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-burnt-orange" />
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
                Lab & Ideas
              </h3>
              <span className="text-xs font-mono px-2.5 py-0.5 bg-cream rounded-full text-muted-grey border border-warm-border">
                Concepts & Explorations
              </span>
            </div>

            <p className="text-sm text-muted-grey max-w-2xl leading-relaxed">
              Early-stage architectural explorations, system designs, and proof-of-concept repositories exploring intelligent workflows and healthcare access.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {labIdeasData.map((idea, idx) => (
            <Reveal key={idx} delay={idx * 0.08} className="h-full">
              <Card
                className="p-5 space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Tag variant="badge" status={idea.badge}>
                      {idea.badge}
                    </Tag>

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
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

