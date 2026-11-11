import React, { useEffect, useState, useRef, Suspense } from 'react';
import { m, useScroll, useTransform, useMotionValue, useSpring, useInView, type Variants } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Eye, Zap } from 'lucide-react';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { Button } from '../ui/Button';
import { ContourLines } from '../art/ContourLines';
import { ArchFrame } from '../art/ArchFrame';
import { MountainFallback } from '../art/MountainFallback';
import { SectionLabel } from '../ui/SectionLabel';
import { KineticHeadline } from '../ui/KineticHeadline';
import { RotatingNowBuilding } from '../ui/RotatingNowBuilding';
import { CountUp } from '../ui/CountUp';
import { Magnetic } from '../ui/Magnetic';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { EASING } from '../../lib/animation';

// Lazily load the interactive terminal logic
const InteractiveTerminal = React.lazy(
  () => import('../terminal/InteractiveTerminal').then((m) => ({ default: m.InteractiveTerminal }))
);

const CODE_LINES = [
  '# building...',
  'from ideas import impact',
  'while True:',
  '    build()',
  '    learn()',
  '    improve()',
];

interface TerminalTypewriterProps {
  startDelay?: number;
  onFinished?: () => void;
}

const TerminalTypewriter: React.FC<TerminalTypewriterProps> = ({
  startDelay = 400,
  onFinished,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [lineIdx, setLineIdx] = useState<number>(() =>
    prefersReducedMotion ? CODE_LINES.length : 0
  );
  const [charIdx, setCharIdx] = useState<number>(() =>
    prefersReducedMotion ? CODE_LINES[CODE_LINES.length - 1].length : 0
  );
  const [hasStarted, setHasStarted] = useState<boolean>(Boolean(prefersReducedMotion));
  const hasCalledFinished = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasStarted(true);
      setLineIdx(CODE_LINES.length);
      if (!hasCalledFinished.current) {
        hasCalledFinished.current = true;
        onFinished?.();
      }
      return;
    }

    const timer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, startDelay, onFinished]);

  useEffect(() => {
    if (prefersReducedMotion || !hasStarted) return;
    if (lineIdx >= CODE_LINES.length) {
      if (!hasCalledFinished.current) {
        hasCalledFinished.current = true;
        onFinished?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setCharIdx((prevChar) => {
        const currentLine = CODE_LINES[lineIdx];
        if (prevChar < currentLine.length) {
          return prevChar + 1;
        } else {
          setLineIdx((prevLine) => {
            const nextLine = prevLine + 1;
            if (nextLine >= CODE_LINES.length && !hasCalledFinished.current) {
              hasCalledFinished.current = true;
              onFinished?.();
            }
            return nextLine;
          });
          return 0;
        }
      });
    }, 30); // 30ms per character typing

    return () => clearInterval(interval);
  }, [hasStarted, lineIdx, prefersReducedMotion, onFinished]);

  const renderLineContent = (text: string, idx: number, showCursor: boolean) => {
    let content: React.ReactNode;
    if (idx === 0) {
      content = <span className="text-[#6A9955] italic">{text}</span>;
    } else if (idx === 1) {
      content = (
        <span>
          <span className="text-burnt-orange font-semibold">{text.slice(0, 5)}</span>
          <span>{text.slice(5, 11)}</span>
          <span className="text-burnt-orange font-semibold">{text.slice(11, 18)}</span>
          <span>{text.slice(18)}</span>
        </span>
      );
    } else if (idx === 2) {
      content = (
        <span className="pt-1.5 block">
          <span className="text-burnt-orange font-semibold">{text.slice(0, 6)}</span>
          <span>{text.slice(6)}</span>
        </span>
      );
    } else {
      content = <span className="text-[#9CDCFE]">{text}</span>;
    }

    return (
      <div key={idx} className={idx >= 3 ? 'pl-4' : ''}>
        {content}
        {showCursor && <span className="terminal-blinking-cursor" aria-hidden="true" />}
      </div>
    );
  };

  return (
    <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#D4D4D4] space-y-0.5">
      {CODE_LINES.map((line, idx) => {
        if (prefersReducedMotion) {
          const isLast = idx === CODE_LINES.length - 1;
          return renderLineContent(line, idx, isLast);
        }

        if (idx < lineIdx) {
          return renderLineContent(line, idx, false);
        }

        if (idx === lineIdx) {
          const visiblePart = line.slice(0, charIdx);
          return renderLineContent(visiblePart, idx, true);
        }

        if (lineIdx >= CODE_LINES.length && idx === CODE_LINES.length - 1) {
          return renderLineContent(line, idx, false);
        }

        return null;
      })}
    </div>
  );
};

export const Hero: React.FC = () => {
  const { stats } = profileData;
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const [terminalFinished, setTerminalFinished] = useState(() => Boolean(prefersReducedMotion));
  const completedProjectsCount = projectsData.filter((p) => p.status === 'Completed').length.toString();
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { margin: '-20px' });
  const rafPointerRef = useRef<number | null>(null);

  // Background detail: topographic contour lines shift by at most 16px vertically as page scrolls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contourScrollY = useTransform(scrollYProgress, [0, 1], [0, 16]);

  // Pointer Depth (fine pointers only, stiffness 120, damping 18)
  const isPointerDepthActive = isFinePointer && !prefersReducedMotion;
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const springNormX = useSpring(normX, { stiffness: 120, damping: 18 });
  const springNormY = useSpring(normY, { stiffness: 120, damping: 18 });

  // Layers move slightly opposite to pointer
  // Sun circle up to 14px
  const sunX = useTransform(springNormX, (v) => -v * 14);
  const sunY = useTransform(springNormY, (v) => -v * 14);

  // Arch image up to 6px
  const archImgX = useTransform(springNormX, (v) => -v * 6);
  const archImgY = useTransform(springNormY, (v) => -v * 6);

  // Arch outline up to 8px
  const archOutlineX = useTransform(springNormX, (v) => -v * 8);
  const archOutlineY = useTransform(springNormY, (v) => -v * 8);

  // Contour lines up to 4px
  const contourPointerX = useTransform(springNormX, (v) => -v * 4);
  const contourPointerY = useTransform(springNormY, (v) => -v * 4);

  // Terminal card up to 10px
  const terminalX = useTransform(springNormX, (v) => -v * 10);
  const terminalY = useTransform(springNormY, (v) => -v * 10);

  // Tags card up to 12px
  const tagsX = useTransform(springNormX, (v) => -v * 12);
  const tagsY = useTransform(springNormY, (v) => -v * 12);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isPointerDepthActive || !heroRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafPointerRef.current === null) {
      rafPointerRef.current = requestAnimationFrame(() => {
        rafPointerRef.current = null;
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const px = clientX - rect.left;
        const py = clientY - rect.top;

        // Set CSS variables for spotlight & dot grid
        heroRef.current.style.setProperty('--mx', `${px.toFixed(1)}px`);
        heroRef.current.style.setProperty('--my', `${py.toFixed(1)}px`);

        const x = (px / rect.width) * 2 - 1; // -1 to 1
        const y = (py / rect.height) * 2 - 1; // -1 to 1
        normX.set(Math.max(-1, Math.min(1, x)));
        normY.set(Math.max(-1, Math.min(1, y)));
      });
    }
  };

  const handlePointerLeave = () => {
    normX.set(0);
    normY.set(0);
    if (heroRef.current) {
      heroRef.current.style.setProperty('--mx', '-500px');
      heroRef.current.style.setProperty('--my', '-500px');
    }
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tagContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: prefersReducedMotion ? 0 : 0.45,
      },
    },
  };

  const tagRowVariants: Variants = {
    hidden: { opacity: 0, x: 12 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: EASING,
      },
    },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Hero"
      data-in-view={isHeroInView}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-warm-border bg-ivory"
    >
      {/* Living background: Soft spotlight follows pointer (fine pointers only) */}
      {isFinePointer && !prefersReducedMotion && (
        <div className="hero-spotlight absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      )}

      {/* Living background: Faint dot grid revealed around spotlight */}
      {isFinePointer && !prefersReducedMotion && (
        <div className="hero-dot-grid absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      )}

      {/* Contour lines with spring pointer depth + scroll parallax */}
      <m.div
        style={{
          x: isPointerDepthActive ? contourPointerX : 0,
          y: isPointerDepthActive ? contourPointerY : 0,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <ContourLines style={{ y: prefersReducedMotion ? 0 : contourScrollY }} />
      </m.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-4">
            {/* Section label with decode effect */}
            <SectionLabel label="MOHAK AGRAWAL" twoSided />

            {/* Kinetic Headline with character-level pointer lifting and tilting */}
            <KineticHeadline />

            {/* Subline with 0.08s stagger */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.35, ease: EASING }}
              className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium text-charcoal/90"
            >
              <span>AI/ML Developer</span>
              <span className="text-burnt-orange font-bold">·</span>
              <span>Full Stack Engineer</span>
              <span className="text-burnt-orange font-bold">·</span>
              <span>Problem Solver</span>
            </m.div>

            {/* Paragraph with 0.08s stagger */}
            <m.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.42, ease: EASING }}
              className="text-muted-grey text-base sm:text-lg max-w-xl font-normal leading-relaxed"
            >
              {profileData.heroBio}
            </m.p>

            {/* Rotating "Now Building" Line */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.46, ease: EASING }}
            >
              <RotatingNowBuilding
                phrases={profileData.nowBuilding}
                isHeroInView={isHeroInView}
              />
            </m.div>

            {/* CTAs with Magnetic Effect */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.5, ease: EASING }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Magnetic>
                <Button asAnchor href="#projects" onClick={scrollToProjects} variant="primary" size="lg">
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  asAnchor
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </Button>
              </Magnetic>
            </m.div>

            {/* True Stats Row with CountUp and growing dividers */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.58, ease: EASING }}
              className="pt-6 sm:pt-8"
            >
              <div className="relative pt-4">
                {/* Horizontal top border growing from 0 */}
                <m.div
                  className="absolute top-0 left-0 right-0 h-[1px] bg-warm-border origin-left"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.6, ease: EASING }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 relative">
                  {/* Stat 1 */}
                  <div className="sm:pr-6 pb-2 sm:pb-0 relative">
                    <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                      <CountUp value={completedProjectsCount} />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                      {stats.projectsLabel}
                    </div>
                    {/* Divider 1 growing in height */}
                    <m.div
                      className="hidden sm:block absolute top-1 bottom-1 right-0 w-[1px] bg-warm-border origin-top"
                      initial={prefersReducedMotion ? false : { scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.68, ease: EASING }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Stat 2 */}
                  <div className="sm:px-6 pt-2 sm:pt-0 pb-2 sm:pb-0 relative">
                    <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                      <CountUp value={stats.internshipsCount} />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                      {stats.internshipsLabel}
                    </div>
                    {/* Divider 2 growing in height */}
                    <m.div
                      className="hidden sm:block absolute top-1 bottom-1 right-0 w-[1px] bg-warm-border origin-top"
                      initial={prefersReducedMotion ? false : { scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.72, ease: EASING }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Stat 3 */}
                  <div className="sm:px-6 pt-2 sm:pt-0 pb-2 sm:pb-0 relative">
                    <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                      <CountUp value={stats.eventsCount} />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                      {stats.eventsLabel}
                    </div>
                    {/* Divider 3 growing in height */}
                    <m.div
                      className="hidden sm:block absolute top-1 bottom-1 right-0 w-[1px] bg-warm-border origin-top"
                      initial={prefersReducedMotion ? false : { scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.76, ease: EASING }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Stat 4 */}
                  <div className="sm:pl-6 pt-2 sm:pt-0">
                    <div className="font-serif text-3xl sm:text-4xl text-charcoal font-semibold">
                      <CountUp value={stats.cgpaScore} decimals={1} />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-grey font-medium mt-1">
                      {stats.cgpaLabel}
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>

          {/* Right Column: Signature Visual Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] mx-auto">
              {/* Plus (+) Crosshair marker fades in */}
              <m.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.4, ease: EASING }}
                className="absolute -top-3 right-4 sm:-right-2 z-20 text-charcoal/60 font-mono text-2xl select-none"
                aria-hidden="true"
              >
                +
              </m.div>

              {/* Sun circle: spring pointer depth wrapper (-14px) */}
              <m.div
                style={{
                  x: isPointerDepthActive ? sunX : 0,
                  y: isPointerDepthActive ? sunY : 0,
                }}
                className="absolute top-[28%] -left-8 sm:-left-14 z-0 pointer-events-none"
              >
                {/* Sun circle entrance animation */}
                <m.div
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: EASING }}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-burnt-orange shadow-lg arch-sun-breathe"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #E47B43, #C94F17)',
                  }}
                  aria-hidden="true"
                />
              </m.div>

              {/* Arch image & outline: separate spring pointer depths (outline -8px, image -6px) */}
              <m.div
                initial={prefersReducedMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
                className="w-full h-full"
              >
                <ArchFrame
                  outlineStyle={{
                    x: isPointerDepthActive ? archOutlineX : 0,
                    y: isPointerDepthActive ? archOutlineY : 0,
                  }}
                  imageStyle={{
                    x: isPointerDepthActive ? archImgX : 0,
                    y: isPointerDepthActive ? archImgY : 0,
                  }}
                >
                  <MountainFallback
                    type="hero-sunrise"
                    alt="Mountain peak at sunrise framed by an architectural arch"
                  />
                </ArchFrame>
              </m.div>

              {/* Floating Dark Terminal Card: spring pointer depth wrapper (-10px) */}
              <m.div
                style={{
                  x: isPointerDepthActive ? terminalX : 0,
                  y: isPointerDepthActive ? terminalY : 0,
                }}
                className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-8 z-30 pointer-events-auto"
              >
                <m.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : 0.3, ease: EASING }}
                  className="hero-idle-float-terminal bg-[#1E1E1E] text-white/90 rounded-[8px] p-4 sm:p-5 shadow-2xl border border-white/10 w-[260px] sm:w-[320px] backdrop-blur-md"
                >
                  <div className="flex items-center space-x-1.5 mb-3 select-none" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                  </div>

                  <TerminalTypewriter
                    startDelay={450}
                    onFinished={() => setTerminalFinished(true)}
                  />

                  {terminalFinished && (
                    <Suspense fallback={null}>
                      <InteractiveTerminal />
                    </Suspense>
                  )}
                </m.div>
              </m.div>

              {/* Floating White Tags Card: spring pointer depth wrapper (-12px) */}
              <m.div
                style={{
                  x: isPointerDepthActive ? tagsX : 0,
                  y: isPointerDepthActive ? tagsY : 0,
                }}
                className="absolute top-12 sm:top-16 -right-4 sm:-right-10 z-30 pointer-events-none"
              >
                <m.div
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : 0.4, ease: EASING }}
                  className="hero-idle-float-tags bg-card-surface/95 backdrop-blur-md rounded-[8px] py-3 px-4 shadow-float border border-warm-border min-w-[170px] sm:min-w-[190px]"
                >
                  <m.div
                    variants={tagContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="divide-y divide-warm-border/70 text-xs sm:text-sm font-medium text-charcoal"
                  >
                    <m.div variants={tagRowVariants} className="flex items-center gap-2.5 py-2">
                      <Cpu className="w-4 h-4 text-burnt-orange stroke-[2]" />
                      <span>AI / ML</span>
                    </m.div>
                    <m.div variants={tagRowVariants} className="flex items-center gap-2.5 py-2">
                      <Layers className="w-4 h-4 text-burnt-orange stroke-[2]" />
                      <span>Full Stack</span>
                    </m.div>
                    <m.div variants={tagRowVariants} className="flex items-center gap-2.5 py-2">
                      <Eye className="w-4 h-4 text-burnt-orange stroke-[2]" />
                      <span>Computer Vision</span>
                    </m.div>
                    <m.div variants={tagRowVariants} className="flex items-center gap-2.5 py-2">
                      <Zap className="w-4 h-4 text-burnt-orange stroke-[2]" />
                      <span>Product Development</span>
                    </m.div>
                  </m.div>
                </m.div>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
