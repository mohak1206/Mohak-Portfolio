import React, { useState, useRef } from 'react';
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TECH_ITEMS = [
  'PYTHON',
  'YOLOV8',
  'PYTORCH',
  'OPENCV',
  'REACT',
  'TYPESCRIPT',
  'FLASK',
  'MYSQL',
  'FLUTTER',
  'FIREBASE',
  'TAILWIND',
];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export const TechMarquee: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 350,
  });

  // Maps scroll velocity to a speed multiplier between -3 and 3 (base is 1)
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-3, 1, 3], {
    clamp: false,
  });

  // Base speed: moves about -0.015% per millisecond (~15% per second)
  const baseSpeed = 0.012;

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || isHovered) return;

    const factor = velocityFactor.get();
    // Normal scroll down / idle moves left (negative x)
    const moveBy = -baseSpeed * delta * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const renderItemSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {TECH_ITEMS.map((item, idx) => (
        <span key={`${keyPrefix}-${idx}`} className="inline-flex items-center">
          <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.2em] font-medium text-charcoal/80 hover:text-burnt-orange transition-colors">
            {item}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-burnt-orange inline-block mx-4 sm:mx-6 shrink-0"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Technologies Marquee"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-cream border-t border-b border-warm-border py-3.5 overflow-hidden select-none"
    >
      {prefersReducedMotion ? (
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-center">
          {TECH_ITEMS.map((item, idx) => (
            <span key={`static-${idx}`} className="inline-flex items-center">
              <span className="font-mono text-xs uppercase tracking-[0.2em] font-medium text-charcoal/80">
                {item}
              </span>
              {idx < TECH_ITEMS.length - 1 && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-burnt-orange inline-block ml-6 shrink-0"
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      ) : (
        <m.div style={{ x }} className="flex w-max will-change-transform">
          {renderItemSet('set1')}
          {renderItemSet('set2')}
          {renderItemSet('set3')}
          {renderItemSet('set4')}
        </m.div>
      )}
    </section>
  );
};

export default TechMarquee;
