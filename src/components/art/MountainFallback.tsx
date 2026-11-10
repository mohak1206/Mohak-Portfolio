import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface MountainFallbackProps {
  type: 'hero-sunrise' | 'about-bw';
  className?: string;
  alt: string;
}

export const MountainFallback: React.FC<MountainFallbackProps> = ({ type, className, alt }) => {
  const [imgError, setImgError] = useState(false);
  const src = type === 'hero-sunrise' ? '/images/hero-mountain.webp' : '/images/about-mountain-bw.webp';

  if (!imgError) {
    if (type === 'hero-sunrise') {
      return (
        <img
          src={src}
          alt={alt}
          width={600}
          height={750}
          fetchPriority="high"
          decoding="async"
          className={cn('w-full h-full object-cover', className)}
          onError={() => setImgError(true)}
        />
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        width={800}
        height={500}
        loading="lazy"
        decoding="async"
        className={cn('w-full h-full object-cover', className)}
        onError={() => setImgError(true)}
      />
    );
  }

  if (type === 'hero-sunrise') {
    return (
      <div className={cn('w-full h-full relative overflow-hidden bg-gradient-to-b from-[#E7D6C4] via-[#DECBBC] to-[#C9BAAE]', className)}>
        <svg
          viewBox="0 0 600 900"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DFC3AF" />
              <stop offset="40%" stopColor="#ECCDB8" />
              <stop offset="75%" stopColor="#E9B796" />
              <stop offset="100%" stopColor="#C97A52" />
            </linearGradient>
            <linearGradient id="sunGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C94F17" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E47B43" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="peakLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5EFE6" />
              <stop offset="100%" stopColor="#D9C5B2" />
            </linearGradient>
            <linearGradient id="peakShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#322E2B" />
              <stop offset="100%" stopColor="#191919" />
            </linearGradient>
            <linearGradient id="fog" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F7F3EC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#EFE8DD" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <rect width="600" height="900" fill="url(#skyGrad)" />
          <circle cx="240" cy="380" r="160" fill="url(#sunGlow)" opacity="0.8" />

          <polygon points="40,680 180,480 320,680" fill="#58453A" opacity="0.35" />
          <polygon points="260,680 420,440 580,680" fill="#4B3B32" opacity="0.4" />

          <polygon points="300,240 180,560 300,560" fill="url(#peakLight)" />
          <polygon points="300,240 300,560 460,560" fill="url(#peakShadow)" />
          <polygon points="190,420 120,580 260,580" fill="#E4D3C2" />
          <polygon points="380,360 330,550 490,550" fill="#24211E" />

          <polygon points="-50,900 150,620 400,900" fill="#24201D" />
          <polygon points="220,900 450,590 650,900" fill="#1C1816" />

          <path
            d="M-20,680 Q100,650 250,670 T550,660 T700,680 L700,900 L-20,900 Z"
            fill="url(#fog)"
          />
          <path
            d="M-20,740 Q150,710 320,730 T650,720 L650,900 L-20,900 Z"
            fill="#F7F3EC"
            opacity="0.9"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn('w-full h-full relative overflow-hidden bg-[#242424]', className)}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bwSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A4A4A" />
            <stop offset="50%" stopColor="#7A7A7A" />
            <stop offset="100%" stopColor="#BDBDBD" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill="url(#bwSky)" />

        <polygon points="100,380 260,200 420,380" fill="#5E5E5E" />
        <polygon points="350,400 520,180 690,400" fill="#474747" />

        <polygon points="380,110 200,420 380,420" fill="#EAEAEA" />
        <polygon points="380,110 380,420 580,420" fill="#1A1A1A" />
        <polygon points="380,110 360,280 380,420" fill="#C4C4C4" />

        <polygon points="-50,500 180,340 450,500" fill="#141414" />
        <polygon points="320,500 580,310 850,500" fill="#0D0D0D" />

        <path
          d="M0,420 Q200,390 400,410 T800,400 L800,500 L0,500 Z"
          fill="#EEEEEE"
          opacity="0.35"
        />
      </svg>
    </div>
  );
};
