import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Eye, Zap } from 'lucide-react';
import { profileData } from '../../data/profile';
import { SectionLabel } from '../common/SectionLabel';
import { ContourBackground } from '../common/ContourBackground';
import { MountainIllustration } from '../common/MountainIllustration';

export const Hero: React.FC = () => {
  const { stats } = profileData;

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-warm-border bg-ivory"
    >
      {/* Topographic contour background lines radiating across the right */}
      <ContourBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-4">
            {/* Top Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionLabel label="MOHAK AGRAWAL" twoSided />
            </motion.div>

            {/* Huge Serif Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-[70px] xl:text-[76px] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal"
            >
              Ideas deserve <br />
              <span className="font-serif italic text-burnt-orange font-normal">to be built.</span>
            </motion.h1>

            {/* Subheadline with small separators */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium text-charcoal/90"
            >
              <span>AI/ML Developer</span>
              <span className="text-burnt-orange font-bold">·</span>
              <span>Full Stack Engineer</span>
              <span className="text-burnt-orange font-bold">·</span>
              <span>Problem Solver</span>
            </motion.div>

            {/* Body Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-muted-grey text-base sm:text-lg max-w-xl font-normal leading-relaxed"
            >
              {profileData.heroBio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-medium text-white bg-burnt-orange hover:bg-light-orange transition-all duration-200 rounded-[5px] shadow-sm hover:shadow"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm sm:text-base font-medium text-charcoal bg-white/80 hover:bg-white border border-warm-border hover:border-charcoal/40 transition-all duration-200 rounded-[5px] shadow-sm"
              >
                {/* Minimal GitHub Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            </motion.div>

            {/* True Stats Row with thin vertical dividers */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="pt-6 sm:pt-8"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-warm-border pt-4 border-t border-warm-border">
                <div className="sm:pr-6 pb-2 sm:pb-0">
                  <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                    {stats.projectsCount}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                    {stats.projectsLabel}
                  </div>
                </div>

                <div className="sm:px-6 pt-2 sm:pt-0 pb-2 sm:pb-0">
                  <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                    {stats.internshipsCount}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                    {stats.internshipsLabel}
                  </div>
                </div>

                <div className="sm:px-6 pt-2 sm:pt-0 pb-2 sm:pb-0">
                  <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                    {stats.eventsCount}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                    {stats.eventsLabel}
                  </div>
                </div>

                <div className="sm:pl-6 pt-2 sm:pt-0">
                  <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                    {stats.cgpaScore}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                    {stats.cgpaLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Signature Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] mx-auto">
              {/* Plus (+) Crosshair marker near top right of arch */}
              <div
                className="absolute -top-3 right-4 sm:-right-2 z-20 text-charcoal/60 font-mono text-2xl select-none"
                aria-hidden="true"
              >
                +
              </div>

              {/* Large Soft Burnt-Orange Sun Circle overlapping left edge of the arch */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-[28%] -left-8 sm:-left-14 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-burnt-orange shadow-lg z-0"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #E47B43, #C94F17)',
                }}
                aria-hidden="true"
              />

              {/* Thin Burnt-Orange Arch Outline offset slightly outside the image */}
              <div
                className="absolute -inset-2.5 sm:-inset-3 border border-burnt-orange/50 pointer-events-none arch-outline z-10"
                aria-hidden="true"
              />

              {/* Tall Arch-Shaped Image Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full overflow-hidden arch-mask shadow-float z-10 bg-cream"
              >
                <MountainIllustration
                  type="hero-sunrise"
                  alt="Mountain peak at sunrise framed by an architectural arch"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Dark Terminal Card (overlaps bottom-left of the arch) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="animate-float-slow absolute -bottom-5 sm:-bottom-7 -left-4 sm:-left-8 z-30 bg-[#1E1E1E] text-white/90 rounded-[8px] p-4 sm:p-5 shadow-2xl border border-white/10 w-[240px] sm:w-[270px] backdrop-blur-md"
              >
                {/* 3 Window Dots */}
                <div className="flex items-center space-x-1.5 mb-3" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                </div>

                {/* Terminal Code Text matching exact prompt instructions */}
                <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#D4D4D4] space-y-0.5">
                  <p className="text-[#6A9955] italic"># building...</p>
                  <p>
                    <span className="text-burnt-orange font-semibold">from</span> ideas{' '}
                    <span className="text-burnt-orange font-semibold">import</span> impact
                  </p>
                  <p className="pt-1.5">
                    <span className="text-burnt-orange font-semibold">while</span> True:
                  </p>
                  <p className="pl-4 text-[#9CDCFE]">build()</p>
                  <p className="pl-4 text-[#9CDCFE]">learn()</p>
                  <p className="pl-4 text-[#9CDCFE]">improve()</p>
                </div>
              </motion.div>

              {/* Floating White Skills Card (on right edge) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="animate-float-opposite absolute top-12 sm:top-16 -right-4 sm:-right-10 z-30 bg-white/95 backdrop-blur-md rounded-[8px] py-3 px-4 shadow-float border border-warm-border min-w-[170px] sm:min-w-[190px]"
              >
                <div className="divide-y divide-warm-border/70 text-xs sm:text-sm font-medium text-charcoal">
                  <div className="flex items-center gap-2.5 py-2">
                    <Cpu className="w-4 h-4 text-burnt-orange stroke-[2]" />
                    <span>AI / ML</span>
                  </div>
                  <div className="flex items-center gap-2.5 py-2">
                    <Layers className="w-4 h-4 text-burnt-orange stroke-[2]" />
                    <span>Full Stack</span>
                  </div>
                  <div className="flex items-center gap-2.5 py-2">
                    <Eye className="w-4 h-4 text-burnt-orange stroke-[2]" />
                    <span>Computer Vision</span>
                  </div>
                  <div className="flex items-center gap-2.5 py-2">
                    <Zap className="w-4 h-4 text-burnt-orange stroke-[2]" />
                    <span>Product Development</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
