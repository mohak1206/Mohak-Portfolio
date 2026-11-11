import React, { useState, useRef } from 'react';
import { m, AnimatePresence, type Variants } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { handsOnSkills, exploringSkills } from '../../data/skills';
import { projectsData } from '../../data/projects';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionNumeral } from '../ui/SectionNumeral';
import { Card } from '../ui/Card';
import { Reveal } from '../ui/Reveal';
import { SplitLines } from '../ui/SplitLines';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

const SKILL_ALIASES: Record<string, string[]> = {
  'python': ['python'],
  'react 19': ['react', 'react 19', 'react (vite)'],
  'react': ['react', 'react 19', 'react (vite)'],
  'tailwind css': ['tailwind', 'tailwind css'],
  'framer motion': ['framer motion'],
  'recharts': ['recharts'],
  'flask': ['flask', 'flask-cors'],
  'flask-socketio (socket.io)': ['flask-socketio', 'socket.io', 'flask-socketio / socket.io'],
  'rest apis': ['flask', 'fastapi', 'rest'],
  'mysql': ['mysql', 'mysql-connector-python'],
  'firebase firestore': ['firestore', 'firebase'],
  'firebase authentication': ['authentication', 'firebase'],
  'firebase storage': ['storage', 'firebase'],
  'yolov8': ['yolov8', 'yolov8n', 'yolo', 'ultralytics'],
  'object detection': ['yolov8', 'yolov8n', 'yolo'],
  'machine learning': ['yolov8', 'pytorch', 'colab'],
  'dataset preparation': ['roboflow', 'google colab'],
  'image augmentation': ['roboflow', 'yolov8'],
  'model training & evaluation': ['google colab', 'yolov8', 'pytorch'],
  'pytorch': ['pytorch'],
  'ultralytics': ['ultralytics', 'yolov8'],
  'opencv': ['cv', 'opencv'],
  'pandas': ['pandas', 'sheetjs'],
  'flutter / dart': ['flutter', 'dart'],
  'git': ['git', 'github'],
  'github': ['github'],
  'google colab': ['google colab', 'colab'],
  'roboflow': ['roboflow'],
  'mysql workbench': ['mysql'],
  'node.js': ['node.js', 'react (vite)'],
  'express': ['express', 'flask'],
  'sqlite': ['sqlite', 'mysql', 'postgresql'],
};

const getProjectsForSkill = (skillName: string) => {
  const normalized = skillName.toLowerCase().trim();
  const aliases = SKILL_ALIASES[normalized] || [normalized];
  return projectsData.filter((project) => {
    const stackLower = project.stack.map((s) => s.toLowerCase());
    const tagsLower = project.tags.map((t) => t.toLowerCase());
    return aliases.some((alias) =>
      stackLower.some((s) => s.includes(alias)) ||
      tagsLower.some((t) => t.includes(alias))
    );
  });
};

export const Expertise: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeSkills, setActiveSkills] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLElement>(null);

  const blocksContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const blockItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASING },
    },
  };

  const chipsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const chipItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: EASING },
    },
  };

  const projectsStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const projectItemVariants: Variants = {
    hidden: { opacity: 0, x: -6 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: EASING },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-label="Expertise"
      className="relative py-20 lg:py-28 bg-ivory border-b border-warm-border overflow-hidden"
    >
      {/* Giant Outlined Section Numeral 04 */}
      <SectionNumeral numeral="04" sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <Reveal>
          <div className="space-y-3">
            <SectionLabel label="EXPERTISE & TOOLING" />
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-charcoal">
              <SplitLines lines={['Technical Capabilities']} />
            </h2>
            <p className="text-muted-grey text-base max-w-2xl">
              A comprehensive look at languages, production frameworks, and AI workflows I build with daily, alongside cutting-edge systems currently in research.
            </p>
          </div>
        </Reveal>

        {/* Hands-on Skills Grid */}
        <div className="space-y-4">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal/80 font-semibold">
              <span className="w-2 h-2 rounded-full bg-burnt-orange inline-block" />
              <span>Hands-on & Applied Competencies</span>
            </div>
          </Reveal>

          {/* Category blocks stagger up */}
          <m.div
            variants={blocksContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={DEFAULT_VIEWPORT}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {handsOnSkills.map((group, idx) => {
              const currentSkill = activeSkills[group.category];
              const matchedProjects = currentSkill ? getProjectsForSkill(currentSkill) : [];

              return (
                <m.div key={idx} variants={blockItemVariants} className="h-full">
                  <Card className="p-5 flex flex-col justify-between h-full space-y-3">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider text-burnt-orange font-semibold pb-2">
                        {group.category}
                      </h3>

                      {/* Thin separator lines grow from left to right */}
                      <m.div
                        className="h-[1px] bg-warm-border origin-left w-full mb-3"
                        initial={prefersReducedMotion ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={DEFAULT_VIEWPORT}
                        transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
                      />

                      {/* Interactive skill chip buttons */}
                      <m.div
                        variants={chipsContainerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={DEFAULT_VIEWPORT}
                        className="flex flex-wrap gap-1.5"
                      >
                        {group.skills.map((skill) => {
                          const isSelected = currentSkill === skill;

                          return (
                            <m.button
                              key={skill}
                              type="button"
                              variants={chipItemVariants}
                              onClick={() => {
                                setActiveSkills((prev) => ({
                                  ...prev,
                                  [group.category]: prev[group.category] === skill ? '' : skill,
                                }));
                              }}
                              onMouseEnter={() => {
                                setActiveSkills((prev) => ({ ...prev, [group.category]: skill }));
                              }}
                              onFocus={() => {
                                setActiveSkills((prev) => ({ ...prev, [group.category]: skill }));
                              }}
                              className={`group/chip relative inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-[3px] border transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-burnt-orange ${
                                isSelected
                                  ? 'border-burnt-orange bg-cream text-charcoal font-semibold ring-1 ring-burnt-orange'
                                  : 'bg-ivory text-charcoal/90 border-warm-border hover:border-burnt-orange hover:bg-cream'
                              }`}
                              aria-pressed={isSelected}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full bg-burnt-orange transition-transform duration-200 shrink-0 ${
                                  isSelected ? 'scale-100' : 'scale-0 group-hover/chip:scale-100'
                                }`}
                                aria-hidden="true"
                              />
                              <span>{skill}</span>
                            </m.button>
                          );
                        })}
                      </m.div>
                    </div>

                    {/* "Used in" line under this skill group */}
                    <div className="pt-3 mt-3 border-t border-warm-border min-h-[46px] flex items-center">
                      <AnimatePresence mode="wait">
                        {currentSkill ? (
                          <m.div
                            key={currentSkill}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="w-full flex flex-wrap items-center gap-1.5 text-xs font-mono"
                          >
                            <span className="text-muted-grey font-medium">Used in:</span>
                            {matchedProjects.length > 0 ? (
                              <m.span
                                variants={projectsStaggerVariants}
                                initial="hidden"
                                animate="show"
                                className="inline-flex flex-wrap items-center gap-1.5"
                              >
                                {matchedProjects.map((p) => (
                                  <m.span key={p.slug} variants={projectItemVariants}>
                                    <Link
                                      to={`/projects/${p.slug}`}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cream hover:bg-burnt-orange text-charcoal hover:text-[var(--on-accent)] transition-colors duration-200 border border-warm-border hover:border-burnt-orange shadow-2xs"
                                    >
                                      <span className="font-sans font-medium text-[11px]">
                                        {p.title.replace(' using YOLOv8', '').replace(': Cross-Platform College App', '').replace(': AI-Assisted Civic Issue Reporting', '')}
                                      </span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </Link>
                                  </m.span>
                                ))}
                              </m.span>
                            ) : (
                              <span className="text-muted-grey text-[11px] italic">Coursework & prototypes</span>
                            )}
                          </m.div>
                        ) : (
                          <span className="text-[11px] font-mono text-muted-grey/60">
                            Hover or tap skill to view linked projects &rarr;
                          </span>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </m.div>
              );
            })}
          </m.div>
        </div>

        {/* Exploring Group */}
        <Reveal delay={0.2}>
          <div className="bg-cream/40 border border-warm-border rounded-[8px] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-burnt-orange" />
              <h3 className="font-serif text-2xl font-medium text-charcoal">
                Currently Exploring & Experimenting
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-grey max-w-2xl leading-relaxed">
              Active lab explorations in next-generation autonomous agent architectures, local open-weight inference, and multi-modal intelligence.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {exploringSkills.map((tech) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-card-surface text-charcoal border border-warm-border shadow-sm hover:border-burnt-orange transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Expertise;
