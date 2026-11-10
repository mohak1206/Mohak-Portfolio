import React from 'react';
import { Code, Layers, Users, Sparkles, ArrowRight, MapPin, GraduationCap, Calendar, Award } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SectionLabel } from '../ui/SectionLabel';
import { Tag } from '../ui/Tag';
import { Card } from '../ui/Card';
import { MountainFallback } from '../art/MountainFallback';

export const About: React.FC = () => {
  const { aboutStory, education } = profileData;

  return (
    <section id="about" aria-label="About Me" className="py-20 lg:py-28 bg-ivory border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ROW 1: Signature Reference Layout (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Landscape B&W mountain with burnt-orange sun circle behind peak */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="relative w-full max-w-[360px] aspect-[16/11]">
              <div
                className="absolute -top-6 right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-burnt-orange z-0 shadow-md"
                aria-hidden="true"
              />

              <div className="relative w-full h-full rounded-[10px] overflow-hidden border border-warm-border shadow-float z-10 bg-cream">
                <MountainFallback
                  type="about-bw"
                  alt="Dramatic black and white mountain peak"
                />
              </div>
            </div>
          </div>

          {/* Centre Column: Heading, Paragraph, and 4 Pill Tags */}
          <div className="lg:col-span-5 space-y-5">
            <SectionLabel label="ABOUT ME" />

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-charcoal font-normal tracking-[-0.01em]">
              A Developer who <br />
              <span className="italic text-burnt-orange font-normal">Builds, Learns and Leads.</span>
            </h2>

            <p className="text-muted-grey text-base leading-relaxed">
              {aboutStory.leadParagraph}
            </p>

            {/* 4 Pill Tags with small orange icons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Tag variant="pill">
                <Code className="w-3.5 h-3.5 text-burnt-orange stroke-[2]" />
                AI/ML
              </Tag>
              <Tag variant="pill">
                <Layers className="w-3.5 h-3.5 text-burnt-orange stroke-[2]" />
                Web Development
              </Tag>
              <Tag variant="pill">
                <Users className="w-3.5 h-3.5 text-burnt-orange stroke-[2]" />
                Leadership
              </Tag>
              <Tag variant="pill">
                <Sparkles className="w-3.5 h-3.5 text-burnt-orange stroke-[2]" />
                Social Impact
              </Tag>
            </div>
          </div>

          {/* Right Column: Thin vertical divider + Currently Exploring */}
          <div className="lg:col-span-3 lg:border-l lg:border-warm-border lg:pl-8 pt-4 lg:pt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-charcoal">
                <span className="w-2.5 h-2.5 rounded-full bg-burnt-orange inline-block" />
                <span>Currently exploring</span>
              </div>

              <ul className="space-y-3 font-medium text-sm text-charcoal/90">
                <li className="flex items-start gap-2 group">
                  <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Agentic AI & LLM Applications</span>
                </li>
                <li className="flex items-start gap-2 group">
                  <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Scalable Full-Stack Systems</span>
                </li>
                <li className="flex items-start gap-2 group">
                  <ArrowRight className="w-4 h-4 text-burnt-orange shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>AI for Real-World Impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ROW 2: Extended Story, Academic Details & Coursework (Part B2) */}
        <div className="pt-12 border-t border-warm-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: "My story" Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-serif text-2xl text-charcoal font-medium">My Story</h3>
              <div className="space-y-4 text-muted-grey text-base leading-relaxed">
                {aboutStory.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Secondary Info & Coursework */}
            <div className="lg:col-span-5">
              <Card elevated className="p-6 space-y-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-charcoal/80 font-semibold border-b border-warm-border pb-3">
                  Academic & Profile Summary
                </h4>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-grey">Location: </span>
                      <span className="font-medium text-charcoal">{profileData.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-grey">Degree: </span>
                      <span className="font-medium text-charcoal">{education.degree}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-4 h-4 flex items-center justify-center font-mono text-xs text-burnt-orange font-bold mt-0.5 shrink-0">🏛</span>
                    <div>
                      <span className="text-muted-grey">Institution: </span>
                      <span className="font-medium text-charcoal">{education.institution}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-grey">Expected Graduation: </span>
                      <span className="font-medium text-charcoal">{education.expectedGraduation}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-burnt-orange mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-grey">Academic Performance: </span>
                      <span className="font-semibold text-burnt-orange">{education.cgpa}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs text-muted-grey mb-2">Open to:</div>
                    <div className="flex flex-wrap gap-2">
                      {education.openTo.map((item) => (
                        <Tag key={item} variant="mono">
                          {item}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-warm-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-grey mb-2.5">
                    Relevant Coursework:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {education.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 font-mono text-[11px] bg-ivory text-charcoal/80 rounded border border-warm-border"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

