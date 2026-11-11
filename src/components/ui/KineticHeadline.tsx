import React, { useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';

interface KineticHeadlineProps {
  className?: string;
}

interface CharData {
  char: string;
  isItalicOrange?: boolean;
}

const LINE1 = 'Ideas deserve';
const LINE2_REGULAR = 'to be ';
const LINE2_ITALIC = 'built.';

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({ className = '' }) => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();

  const isInteractive = isFinePointer && !prefersReducedMotion;

  // Refs for each character span
  const charElementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Physics state per character
  const physicsRef = useRef<{
    currY: number;
    targetY: number;
    vy: number;
    currR: number;
    targetR: number;
    vr: number;
  }[]>([]);

  const rafIdRef = useRef<number | null>(null);

  // Split into structured character list
  const characters: CharData[] = [];
  LINE1.split('').forEach((c) => characters.push({ char: c }));
  // Marker for line break
  characters.push({ char: '\n' });
  LINE2_REGULAR.split('').forEach((c) => characters.push({ char: c }));
  LINE2_ITALIC.split('').forEach((c) => characters.push({ char: c, isItalicOrange: true }));

  // Initialize physics state
  useEffect(() => {
    physicsRef.current = characters.map(() => ({
      currY: 0,
      targetY: 0,
      vy: 0,
      currR: 0,
      targetR: 0,
      vr: 0,
    }));
  }, [characters.length]);

  const updatePhysics = () => {
    const k = 0.16; // spring stiffness
    const damping = 0.78; // damping factor
    let hasMovement = false;

    for (let i = 0; i < physicsRef.current.length; i++) {
      const p = physicsRef.current[i];
      const el = charElementsRef.current[i];
      if (!el) continue;

      // Y spring
      const forceY = (p.targetY - p.currY) * k;
      p.vy = (p.vy + forceY) * damping;
      p.currY += p.vy;

      // Rotation spring
      const forceR = (p.targetR - p.currR) * k;
      p.vr = (p.vr + forceR) * damping;
      p.currR += p.vr;

      const moving =
        Math.abs(p.currY - p.targetY) > 0.05 ||
        Math.abs(p.vy) > 0.05 ||
        Math.abs(p.currR - p.targetR) > 0.05 ||
        Math.abs(p.vr) > 0.05;

      if (moving) {
        hasMovement = true;
        el.style.transform = `translateY(${p.currY.toFixed(2)}px) rotate(${p.currR.toFixed(2)}deg)`;
      } else if (p.currY !== 0 || p.currR !== 0) {
        p.currY = 0;
        p.currR = 0;
        p.vy = 0;
        p.vr = 0;
        el.style.transform = '';
      }
    }

    if (hasMovement) {
      rafIdRef.current = requestAnimationFrame(updatePhysics);
    } else {
      rafIdRef.current = null;
    }
  };

  const startAnimationLoop = () => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(updatePhysics);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLHeadingElement>) => {
    if (!isInteractive) return;

    const pointerX = e.clientX;
    const pointerY = e.clientY;
    const radius = 90; // 90px threshold

    charElementsRef.current.forEach((el, index) => {
      const p = physicsRef.current[index];
      if (!el || !p) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = pointerX - centerX;
      const dy = pointerY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const factor = 1 - dist / radius; // 0 to 1
        // Characters within 90px lift up to 8px
        p.targetY = -8 * factor;
        // Characters tilt up to 3 degrees following pointer offset
        const dir = dx > 0 ? -1 : 1;
        p.targetR = dir * 3 * factor;
      } else {
        p.targetY = 0;
        p.targetR = 0;
      }
    });

    startAnimationLoop();
  };

  const handlePointerLeave = () => {
    if (!isInteractive) return;

    physicsRef.current.forEach((p) => {
      p.targetY = 0;
      p.targetR = 0;
    });

    startAnimationLoop();
  };

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  let globalCharIdx = 0;

  return (
    <h1
      ref={headlineRef}
      aria-label="Ideas deserve to be built."
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`font-serif text-4xl sm:text-6xl lg:text-[70px] xl:text-[76px] font-normal leading-[1.08] tracking-[-0.02em] text-charcoal select-none ${className}`}
    >
      <span aria-hidden="true" className="inline-block">
        {/* Line 1: Ideas deserve */}
        <span className="block">
          {LINE1.split('').map((char, i) => {
            const idx = globalCharIdx++;
            return (
              <span
                key={`l1-${i}`}
                ref={(el) => {
                  charElementsRef.current[idx] = el;
                }}
                className="inline-block will-change-transform"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            );
          })}
        </span>

        {/* Line 2: to be built. */}
        <span className="block">
          {LINE2_REGULAR.split('').map((char, i) => {
            const idx = globalCharIdx++;
            return (
              <span
                key={`l2-reg-${i}`}
                ref={(el) => {
                  charElementsRef.current[idx] = el;
                }}
                className="inline-block will-change-transform"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            );
          })}

          <span className="relative inline-block">
            <span className="font-serif italic text-burnt-orange font-normal">
              {LINE2_ITALIC.split('').map((char, i) => {
                const idx = globalCharIdx++;
                return (
                  <span
                    key={`l2-ita-${i}`}
                    ref={(el) => {
                      charElementsRef.current[idx] = el;
                    }}
                    className="inline-block will-change-transform"
                  >
                    {char}
                  </span>
                );
              })}
            </span>

            {/* Drawing orange underline under "built." */}
            <m.span
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-burnt-orange origin-left pointer-events-none"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : 0.45,
                ease: EASING,
              }}
              aria-hidden="true"
            />
          </span>
        </span>
      </span>
    </h1>
  );
};

export default KineticHeadline;

