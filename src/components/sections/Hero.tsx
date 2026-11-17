import React, { useState, useRef } from 'react';
import { m, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ContourLines } from '../art/ContourLines';
import { MountainFallback } from '../art/MountainFallback';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { EASING } from '../../lib/animation';

export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { margin: '-20px' });
  const rafPointerRef = useRef<number | null>(null);

  // Background detail: topographic contour lines shift by at most 16px vertically as page scrolls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contourScrollY = useTransform(scrollYProgress, [0, 1], [0, 16]);

  // 4px Pointer Depth on sun circle and contour lines only (fine pointers only)
  const isPointerDepthActive = isFinePointer && !prefersReducedMotion;
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const springNormX = useSpring(normX, { stiffness: 120, damping: 18 });
  const springNormY = useSpring(normY, { stiffness: 120, damping: 18 });

  const sunX = useTransform(springNormX, (v) => -v * 4);
  const sunY = useTransform(springNormY, (v) => -v * 4);
  const contourPointerX = useTransform(springNormX, (v) => -v * 4);
  const contourPointerY = useTransform(springNormY, (v) => -v * 4);

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

        heroRef.current.style.setProperty('--mx', `${px.toFixed(1)}px`);
        heroRef.current.style.setProperty('--my', `${py.toFixed(1)}px`);

        const x = (px / rect.width) * 2 - 1;
        const y = (py / rect.height) * 2 - 1;
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

  // Reusable Arch Frame Component
  const renderArchFrame = (isDesktop: boolean) => (
    <div
      className={`frame relative aspect-[5/7] ${
        isDesktop
          ? 'h-[clamp(440px,64vh,660px)] w-auto max-w-full'
          : 'w-[72vw] max-w-[340px] h-auto'
      } mx-auto overflow-visible select-none`}
    >
      {/* Orange sun circle: partly hidden behind LEFT side of arch at shoulder level */}
      <m.div
        style={{
          x: isPointerDepthActive ? sunX : 0,
          y: isPointerDepthActive ? sunY : 0,
        }}
        className={`absolute top-[32%] ${
          isDesktop ? '-left-12 lg:-left-16 w-44 h-44 lg:w-56 lg:h-56' : '-left-8 sm:-left-10 w-32 h-32 sm:w-40 sm:h-40'
        } z-0 pointer-events-none`}
      >
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2, ease: EASING }}
          className="w-full h-full rounded-full shadow-md"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #E47B43, #C94F17)',
          }}
          aria-hidden="true"
        />
      </m.div>

      {/* Arch Frame Body (Layer 1 + Layer 3) clipped strictly to arch shape */}
      <div
        className="absolute inset-0 z-10 overflow-hidden border border-transparent dark:border-[var(--color-border)] shadow-sm"
        style={{
          borderRadius: '9999px 9999px 0 0',
        }}
      >
        {/* Layer 1: Arch background: light soft vertical gradient #F6E8DA -> #F0C4A0 */}
        <m.div
          initial={prefersReducedMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.65, delay: prefersReducedMotion ? 0 : 0.15, ease: EASING }}
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #F6E8DA 0%, #F0C4A0 100%)',
          }}
          aria-hidden="true"
        >
          {/* Mountain fallback if portrait fails to load */}
          {imgError && (
            <MountainFallback
              type="hero-sunrise"
              alt="Mountain peak at sunrise framed by an architectural arch"
            />
          )}

          {/* Shimmer pulse while loading */}
          {!imgLoaded && !imgError && (
            <div className="absolute inset-0 bg-cream/40 animate-pulse pointer-events-none" />
          )}
        </m.div>

        {/* Layer 3: Portrait cutout: centered inside the frame, anchored flush at bottom */}
        {!imgError && (
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: prefersReducedMotion ? 0 : 0.45,
              ease: EASING,
            }}
            className="absolute bottom-0 left-0 right-0 mx-auto w-[88%] sm:w-[90%] z-10 flex items-end justify-center pointer-events-none select-none"
          >
            <img
              src="/profile-cutout.webp"
              width={482}
              height={667}
              alt="Portrait of Mohak Agrawal"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-auto object-contain transition-opacity duration-300 block ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: 'drop-shadow(0 12px 28px rgba(0, 0, 0, 0.08))',
              }}
            />
          </m.div>
        )}
      </div>

      {/* Layer 2: Orange outline arch, perfectly concentric with the arch body */}
      {/* Inset: -14px on top, left and right, and 0 at the bottom */}
      <div
        className="absolute pointer-events-none z-20"
        style={{ top: -14, left: -14, right: -14, bottom: 0 }}
      >
        <svg
          className="w-full h-full pointer-events-none"
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <m.path
            d="M 1 140 L 1 50 A 49 49 0 0 1 99 50 L 99 140"
            fill="none"
            stroke="var(--color-accent, #C94F17)"
            strokeWidth="1.4"
            strokeOpacity="0.75"
            vectorEffect="non-scaling-stroke"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.9,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: EASING,
            }}
          />
        </svg>
      </div>
    </div>
  );

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Hero"
      data-in-view={isHeroInView}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[calc(100dvh-76px)] flex flex-col justify-center items-center py-8 lg:py-0 bg-ivory overflow-hidden border-b border-warm-border"
    >
      {/* Living background: Soft spotlight follows pointer (fine pointers only) */}
      {isFinePointer && !prefersReducedMotion && (
        <div className="hero-spotlight absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      )}

      {/* Living background: Faint dot grid revealed around spotlight */}
      {isFinePointer && !prefersReducedMotion && (
        <div className="hero-dot-grid absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      )}

      {/* Contour lines with spring pointer depth (4px) + scroll parallax */}
      <m.div
        style={{
          x: isPointerDepthActive ? contourPointerX : 0,
          y: isPointerDepthActive ? contourPointerY : 0,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <ContourLines style={{ y: prefersReducedMotion ? 0 : contourScrollY }} />
      </m.div>

      {/* DESKTOP LAYOUT (from 1024px width): 12-column grid, three zones */}
      <div className="hidden lg:grid grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-8 min-h-[calc(100dvh-76px)]">
        
        {/* LEFT COLUMN: Name at top, headline at BOTTOM LEFT */}
        <div className="col-span-4 flex flex-col justify-between self-stretch pt-2 lg:pt-4 pb-6 text-left select-none">
          <div>
            {/* Short orange line */}
            <m.div
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.6, ease: EASING }}
              className="w-8 h-[2px] bg-burnt-orange rounded-full origin-left mb-4 lg:mb-5"
              aria-hidden="true"
            />

            {/* 1) NAME: clean charcoal text (ivory in dark mode), Mohak on line 1, Agrawal on line 2 */}
            <m.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.65, ease: EASING }}
              className="font-serif font-medium text-charcoal tracking-tight text-[clamp(36px,3.8vw,60px)] leading-[1.04]"
            >
              <span className="block">Mohak</span>
              <span className="block">Agrawal</span>
            </m.h1>
          </div>

          {/* 2) HEADLINE: at bottom left, left-aligned, exactly two lines nowrap */}
          <m.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.75, ease: EASING }}
            className="font-serif font-normal text-charcoal/90 tracking-tight text-[clamp(36px,3.6vw,54px)] leading-[1.15] mt-8"
          >
            <span className="block whitespace-nowrap">Ideas deserve</span>
            <span className="block whitespace-nowrap">
              to be{' '}
              <span className="relative inline-block text-burnt-orange italic font-normal">
                built.
                <m.span
                  className="absolute left-0 -bottom-1 sm:-bottom-1.5 w-full h-[3px] sm:h-[3.5px] bg-burnt-orange rounded-full origin-left"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.95, ease: EASING }}
                  aria-hidden="true"
                />
              </span>
            </span>
          </m.h2>
        </div>

        {/* CENTRE: the arch frame, centred horizontally and vertically in the hero */}
        <div className="col-span-4 flex justify-center items-center relative">
          {renderArchFrame(true)}
        </div>

        {/* RIGHT COLUMN: top stays empty, roles at BOTTOM RIGHT aligned to frame bottom */}
        <div className="col-span-4 flex flex-col justify-end self-stretch pb-6 select-none text-left">
          <m.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.9, ease: EASING }}
            className="flex flex-col gap-[10px] text-charcoal font-medium font-sans"
            style={{ fontSize: 'clamp(16px, 1.3vw, 20px)' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-burnt-orange shrink-0" aria-hidden="true" />
              <span>AI/ML Developer</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-burnt-orange shrink-0" aria-hidden="true" />
              <span>Full Stack Engineer</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-burnt-orange shrink-0" aria-hidden="true" />
              <span>Problem Solver</span>
            </div>
          </m.div>
        </div>

      </div>

      {/* TABLET AND MOBILE LAYOUT (below 1024px): centred stack */}
      {/* Sequence: frame, then name, then headline on two lines, then three roles one below other (centred with dots on left) */}
      <div className="lg:hidden w-full max-w-md mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5">
        
        {/* Frame */}
        <div className="w-full flex justify-center pt-2">
          {renderArchFrame(false)}
        </div>

        {/* Name: Mohak / Agrawal */}
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.6, ease: EASING }}
          className="flex flex-col items-center justify-center gap-1 pt-1"
        >
          <span className="w-7 h-[1.5px] bg-burnt-orange rounded-full opacity-80 mb-0.5" aria-hidden="true" />
          <h1 className="font-serif font-medium text-charcoal tracking-tight text-[clamp(28px,6.5vw,38px)] leading-[1.08] text-center">
            <span className="block">Mohak</span>
            <span className="block">Agrawal</span>
          </h1>
        </m.div>

        {/* Headline on two lines */}
        <m.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.75, ease: EASING }}
          className="font-serif font-normal text-charcoal/90 tracking-tight text-center text-[clamp(26px,5.8vw,34px)] leading-[1.2] mt-4 sm:mt-5"
        >
          <span className="block whitespace-nowrap">Ideas deserve</span>
          <span className="block whitespace-nowrap">
            to be{' '}
            <span className="relative inline-block text-burnt-orange italic font-normal">
              built.
              <m.span
                className="absolute left-0 -bottom-1 w-full h-[2.5px] bg-burnt-orange rounded-full origin-left"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.95, ease: EASING }}
                aria-hidden="true"
              />
            </span>
          </span>
        </m.h2>

        {/* Three roles one below the other: centred, dots on the left of each line */}
        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.9, ease: EASING }}
          className="flex flex-col items-center gap-2 text-xs sm:text-sm font-medium text-charcoal/85 text-center font-sans pt-1"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange shrink-0" aria-hidden="true" />
            <span>AI/ML Developer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange shrink-0" aria-hidden="true" />
            <span>Full Stack Engineer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-burnt-orange shrink-0" aria-hidden="true" />
            <span>Problem Solver</span>
          </div>
        </m.div>

      </div>
    </section>
  );
};

export default Hero;
