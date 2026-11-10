import React from 'react';

interface ContourProps {
  className?: string;
}

export const ContourBackground: React.FC<ContourProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1200 900"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#C94F17"
      >
        <g opacity="0.14" strokeWidth="1">
          {/* Gentle topographic contours radiating from the right composition */}
          <path d="M600,100 C720,110 880,180 960,300 C1040,420 1100,600 1180,850" />
          <path d="M520,160 C660,180 820,260 900,390 C980,520 1020,700 1100,900" />
          <path d="M450,230 C600,260 760,340 840,480 C920,620 960,780 1040,940" />
          <path d="M380,310 C540,340 700,430 780,580 C860,730 890,860 960,980" />
          <path d="M320,400 C480,440 640,540 710,690 C780,840 810,950 880,1050" />

          {/* Sweeping left arcs extending across the viewport */}
          <path d="M-100,550 C120,530 300,570 480,680 C660,790 740,880 820,1000" />
          <path d="M-80,630 C150,600 340,650 510,760 C680,870 760,950 840,1060" />
          <path d="M-60,710 C180,680 380,730 550,840 C720,950 800,1020 870,1120" />

          {/* Subtle closed topographic loops */}
          <ellipse cx="880" cy="380" rx="220" ry="160" transform="rotate(-15 880 380)" />
          <ellipse cx="890" cy="390" rx="170" ry="120" transform="rotate(-15 890 390)" />
          <ellipse cx="900" cy="400" rx="120" ry="80" transform="rotate(-15 900 400)" />
        </g>
      </svg>
    </div>
  );
};
