import React from 'react';

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

export const TechMarquee: React.FC = () => {
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
      className="w-full bg-cream border-t border-b border-warm-border py-3.5 overflow-hidden select-none"
    >
      <div className="tech-marquee-content">
        {renderItemSet('set1')}
        {renderItemSet('set2')}
      </div>
    </section>
  );
};

export default TechMarquee;

