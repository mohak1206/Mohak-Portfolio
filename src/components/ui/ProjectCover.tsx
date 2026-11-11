import React, { useState } from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';
import { Skeleton } from './Skeleton';

interface ProjectCoverProps {
  slug: string;
  title: string;
  className?: string;
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({ slug, title, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const localImg = `/projects/${slug}.webp`;
  const prefersReducedMotion = useReducedMotion();

  if (!imgError) {
    return (
      <div
        aria-busy={!isLoaded}
        className={cn('relative w-full h-full overflow-hidden bg-cream project-cover-container', className)}
      >
        {!isLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        )}
        <img
          src={localImg}
          alt={title}
          width={800}
          height={480}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setImgError(true)}
          className={cn(
            'w-full h-full object-cover transition-all duration-[400ms] ease-out group-hover:scale-[1.06]',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    );
  }

  const lineTransition = (delay = 0) => ({
    duration: 0.8,
    delay: prefersReducedMotion ? 0 : delay,
    ease: EASING,
  });

  const circleTransition = (delay = 0.2) => ({
    duration: 0.6,
    delay: prefersReducedMotion ? 0 : delay,
    ease: EASING,
  });

  // Generative Editorial Abstract Covers with Framer Motion draw-on lines and fading circles
  return (
    <div
      className={cn(
        'w-full h-full relative overflow-hidden bg-cream project-cover-container flex items-center justify-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]',
        className
      )}
    >
      {slug === 'signature-detection' && (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EFE8DD" />
          <line x1="40" y1="0" x2="40" y2="240" stroke="#DDD4C8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="0" x2="200" y2="240" stroke="#DDD4C8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="360" y1="0" x2="360" y2="240" stroke="#DDD4C8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#DDD4C8" strokeWidth="1" strokeDasharray="3 3" />

          <m.circle
            cx="280"
            cy="110"
            r="50"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.1)}
          />
          <m.circle
            cx="280"
            cy="110"
            r="28"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.85, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.25)}
          />

          <rect x="70" y="45" width="170" height="150" rx="4" fill="#FFFFFF" stroke="#DDD4C8" strokeWidth="1.5" />
          <line x1="90" y1="75" x2="160" y2="75" stroke="#DDD4C8" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="95" x2="210" y2="95" stroke="#E6DFD5" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="110" x2="185" y2="110" stroke="#E6DFD5" strokeWidth="2" strokeLinecap="round" />

          <rect x="85" y="130" width="120" height="48" rx="2" fill="none" stroke="#C94F17" strokeWidth="1.5" strokeDasharray="4 2" />
          <rect x="85" y="120" width="56" height="12" rx="2" fill="#C94F17" />
          <text x="88" y="129" fill="#FFFFFF" fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">SIG 0.92</text>
          
          <m.path
            d="M95,155 Q115,135 125,160 T150,148 T175,162 T190,145"
            fill="none"
            stroke="#191919"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.2)}
          />
          <text x="24" y="222" fill="#77716B" fontSize="9" fontFamily="'JetBrains Mono', monospace">19.9975° N · YOLOv8-SIG</text>
        </svg>
      )}

      {slug === 'fire-smoke-detection' && (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#24201D" />
          <line x1="0" y1="60" x2="400" y2="60" stroke="#3A332E" strokeWidth="1" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#3A332E" strokeWidth="1" />
          <line x1="0" y1="180" x2="400" y2="180" stroke="#3A332E" strokeWidth="1" />
          <line x1="100" y1="0" x2="100" y2="240" stroke="#3A332E" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="240" stroke="#3A332E" strokeWidth="1" />
          <line x1="300" y1="0" x2="300" y2="240" stroke="#3A332E" strokeWidth="1" />

          <m.path
            d="M120,180 Q100,120 160,90 T240,60"
            fill="none"
            stroke="#77716B"
            strokeWidth="36"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.25 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.1)}
          />
          <m.path
            d="M140,160 Q180,100 220,70"
            fill="none"
            stroke="#DDD4C8"
            strokeWidth="20"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.2)}
          />

          <polygon points="120,195 105,165 125,130 145,155 160,115 175,170 155,195" fill="#E47B43" />
          <polygon points="125,195 115,175 130,150 145,165 155,140 162,175 150,195" fill="#F7C844" />

          <rect x="95" y="105" width="85" height="95" rx="3" fill="none" stroke="#C94F17" strokeWidth="1.5" />
          <rect x="95" y="93" width="52" height="13" rx="2" fill="#C94F17" />
          <text x="98" y="103" fill="#FFFFFF" fontSize="8" fontFamily="'JetBrains Mono', monospace">FIRE 91.2%</text>

          <rect x="140" y="45" width="130" height="85" rx="3" fill="none" stroke="#77716B" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="140" y="33" width="60" height="13" rx="2" fill="#77716B" />
          <text x="143" y="43" fill="#FFFFFF" fontSize="8" fontFamily="'JetBrains Mono', monospace">SMOKE 41.5%</text>

          <text x="24" y="222" fill="#C94F17" fontSize="9" fontFamily="'JetBrains Mono', monospace">INFER: 4.4ms · YOLOv8n</text>
        </svg>
      )}

      {slug === 'inventory-management' && (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EFE8DD" />
          <m.circle
            cx="90"
            cy="80"
            r="45"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.15)}
          />

          <rect x="40" y="40" width="320" height="155" rx="6" fill="#FFFFFF" stroke="#DDD4C8" strokeWidth="1.5" />
          <line x1="40" y1="75" x2="360" y2="75" stroke="#DDD4C8" strokeWidth="1" />
          <m.circle
            cx="58"
            cy="58"
            r="4"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.2)}
          />
          <circle cx="72" cy="58" r="4" fill="#E47B43" />
          <circle cx="86" cy="58" r="4" fill="#DDD4C8" />

          <rect x="60" y="95" width="70" height="65" rx="4" fill="#F7F3EC" stroke="#DDD4C8" strokeWidth="1" />
          <rect x="75" y="125" width="15" height="30" fill="#C94F17" rx="2" />
          <rect x="100" y="110" width="15" height="45" fill="#191919" rx="2" />

          <rect x="145" y="95" width="195" height="18" rx="3" fill="#F7F3EC" />
          <m.line
            x1="155"
            y1="104"
            x2="220"
            y2="104"
            stroke="#77716B"
            strokeWidth="2"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.1)}
          />
          <m.line
            x1="280"
            y1="104"
            x2="325"
            y2="104"
            stroke="#C94F17"
            strokeWidth="2"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.2)}
          />

          <rect x="145" y="120" width="195" height="18" rx="3" fill="#F7F3EC" />
          <m.line
            x1="155"
            y1="129"
            x2="240"
            y2="129"
            stroke="#77716B"
            strokeWidth="2"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.15)}
          />
          <m.circle
            cx="315"
            cy="129"
            r="4"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.3)}
          />

          <rect x="145" y="145" width="195" height="18" rx="3" fill="#F7F3EC" />
          <m.line
            x1="155"
            y1="154"
            x2="210"
            y2="154"
            stroke="#77716B"
            strokeWidth="2"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.25)}
          />
          <m.line
            x1="270"
            y1="154"
            x2="320"
            y2="154"
            stroke="#191919"
            strokeWidth="2"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.3)}
          />

          <text x="24" y="222" fill="#77716B" fontSize="9" fontFamily="'JetBrains Mono', monospace">REACT 19 · FLASK · MYSQL</text>
        </svg>
      )}

      {slug === 'alumni-connect' && (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EFE8DD" />
          <m.circle
            cx="200"
            cy="120"
            r="85"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.15)}
          />

          <rect x="145" y="30" width="110" height="180" rx="14" fill="#FFFFFF" stroke="#191919" strokeWidth="2" />
          <rect x="180" y="36" width="40" height="5" rx="2" fill="#DDD4C8" />

          <rect x="155" y="52" width="90" height="24" rx="4" fill="#C94F17" />
          <line x1="162" y1="64" x2="210" y2="64" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

          <circle cx="170" cy="95" r="9" fill="#EFE8DD" stroke="#DDD4C8" strokeWidth="1" />
          <rect x="186" y="89" width="50" height="6" rx="2" fill="#191919" />
          <rect x="186" y="98" width="35" height="4" rx="2" fill="#77716B" />

          <circle cx="170" cy="125" r="9" fill="#EFE8DD" stroke="#DDD4C8" strokeWidth="1" />
          <rect x="186" y="119" width="45" height="6" rx="2" fill="#191919" />
          <rect x="186" y="128" width="30" height="4" rx="2" fill="#77716B" />

          <circle cx="170" cy="155" r="9" fill="#EFE8DD" stroke="#DDD4C8" strokeWidth="1" />
          <rect x="186" y="149" width="48" height="6" rx="2" fill="#191919" />
          <rect x="186" y="158" width="32" height="4" rx="2" fill="#77716B" />

          <m.path
            d="M70,120 C100,80 120,95 145,95"
            fill="none"
            stroke="#C94F17"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.1)}
          />
          <m.path
            d="M255,125 C280,125 300,150 330,130"
            fill="none"
            stroke="#C94F17"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.2)}
          />
          <m.circle
            cx="70"
            cy="120"
            r="5"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.25)}
          />
          <m.circle
            cx="330"
            cy="130"
            r="5"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.3)}
          />

          <text x="24" y="222" fill="#77716B" fontSize="9" fontFamily="'JetBrains Mono', monospace">FLUTTER · FIREBASE · CROSS-PLATFORM</text>
        </svg>
      )}

      {slug === 'civic-i' && (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EFE8DD" />
          <m.path
            d="M40,40 L360,200"
            stroke="#DDD4C8"
            strokeWidth="8"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.05)}
          />
          <m.path
            d="M340,30 L60,210"
            stroke="#DDD4C8"
            strokeWidth="6"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.15)}
          />
          <m.path
            d="M20,130 L380,110"
            stroke="#E6DFD5"
            strokeWidth="5"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.25)}
          />

          <m.circle
            cx="195"
            cy="125"
            r="28"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.1)}
          />
          <m.circle
            cx="195"
            cy="125"
            r="16"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.2)}
          />
          <m.circle
            cx="195"
            cy="125"
            r="7"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.3)}
          />

          <rect x="235" y="60" width="130" height="55" rx="4" fill="#FFFFFF" stroke="#DDD4C8" strokeWidth="1" />
          <text x="245" y="78" fill="#191919" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">PALGHAR SECTOR</text>
          <text x="245" y="93" fill="#77716B" fontSize="8" fontFamily="'JetBrains Mono', monospace">19.6967° N, 72.7655° E</text>
          <text x="245" y="105" fill="#C94F17" fontSize="8" fontFamily="'JetBrains Mono', monospace">STATUS: DETECTING</text>

          <text x="24" y="222" fill="#77716B" fontSize="9" fontFamily="'JetBrains Mono', monospace">FASTAPI · POSTGIS · LEAFLET · YOLO</text>
        </svg>
      )}

      {slug === 'healmaps' && (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EFE8DD" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#DDD4C8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="200" y1="0" x2="200" y2="240" stroke="#DDD4C8" strokeWidth="1" strokeDasharray="4 4" />

          <m.circle
            cx="200"
            cy="110"
            r="65"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.12, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.15)}
          />

          <rect x="70" y="45" width="260" height="135" rx="6" fill="#FFFFFF" stroke="#DDD4C8" strokeWidth="1.5" />
          
          <m.path
            d="M85,115 L140,115 L150,90 L160,140 L170,105 L180,125 L190,115 L315,115"
            fill="none"
            stroke="#C94F17"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.1)}
          />

          <rect x="90" y="60" width="80" height="22" rx="4" fill="#F7F3EC" stroke="#DDD4C8" strokeWidth="1" />
          <text x="100" y="75" fill="#191919" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">ICU: LIVE</text>
          
          <rect x="180" y="60" width="90" height="22" rx="4" fill="#F7F3EC" stroke="#DDD4C8" strokeWidth="1" />
          <text x="190" y="75" fill="#C94F17" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">BEDS: 82%</text>

          <circle cx="280" cy="148" r="14" fill="#EFE8DD" stroke="#DDD4C8" strokeWidth="1.5" />
          <m.path
            d="M280,140 V156 M272,148 H288"
            stroke="#C94F17"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={lineTransition(0.25)}
          />

          <text x="24" y="222" fill="#77716B" fontSize="9" fontFamily="'JetBrains Mono', monospace">HEALTHCARE · RESOURCE DASHBOARD · GEOSPATIAL</text>
        </svg>
      )}

      {!['signature-detection', 'fire-smoke-detection', 'inventory-management', 'alumni-connect', 'civic-i', 'healmaps'].includes(slug) && (
        <svg viewBox="0 0 400 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="240" fill="#EFE8DD" />
          <m.circle
            cx="200"
            cy="120"
            r="60"
            fill="#C94F17"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={DEFAULT_VIEWPORT}
            transition={circleTransition(0.15)}
          />
          <rect x="100" y="60" width="200" height="120" rx="6" fill="#FFFFFF" stroke="#DDD4C8" strokeWidth="1" />
          <text x="200" y="125" textAnchor="middle" fill="#191919" fontSize="13" fontFamily="'Playfair Display', serif">{title}</text>
        </svg>
      )}
    </div>
  );
};

export default ProjectCover;
