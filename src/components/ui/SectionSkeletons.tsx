import React from 'react';
import { Skeleton, SkeletonText } from './Skeleton';

// --- ABOUT SKELETON ---
export const AboutSkeleton: React.FC = () => {
  return (
    <section
      aria-busy="true"
      aria-label="Loading About section"
      className="py-20 lg:py-28 bg-ivory border-b border-warm-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Mountain cover image */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <div className="w-full max-w-[360px] aspect-[16/11] rounded-[10px] overflow-hidden border border-warm-border bg-cream">
              <Skeleton className="w-full h-full" />
            </div>
          </div>

          {/* Centre Column: Heading & Text */}
          <div className="lg:col-span-5 space-y-5">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-4/5 h-10" />
            <Skeleton className="w-3/5 h-10" />
            <SkeletonText lines={3} />
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Skeleton className="w-20 h-8 rounded-full" />
              <Skeleton className="w-32 h-8 rounded-full" />
              <Skeleton className="w-24 h-8 rounded-full" />
              <Skeleton className="w-28 h-8 rounded-full" />
            </div>
          </div>

          {/* Right Column: Currently Exploring */}
          <div className="lg:col-span-3 lg:border-l lg:border-warm-border lg:pl-8 pt-4 lg:pt-0 space-y-4">
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="w-36 h-5" />
            </div>
            <div className="space-y-3">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-4/5 h-5" />
              <Skeleton className="w-3/4 h-5" />
            </div>
          </div>
        </div>

        {/* Bottom Card Summary */}
        <div className="pt-10 border-t border-warm-border">
          <div className="p-6 sm:p-8 bg-card-surface border border-warm-border rounded-[6px]">
            <Skeleton className="w-48 h-4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-3.5">
                <Skeleton className="w-3/5 h-4" />
                <Skeleton className="w-4/5 h-4" />
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
              <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-warm-border lg:pl-8">
                <Skeleton className="w-24 h-4" />
                <div className="flex gap-2">
                  <Skeleton className="w-20 h-6 rounded" />
                  <Skeleton className="w-24 h-6 rounded" />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <Skeleton className="w-16 h-5 rounded" />
                  <Skeleton className="w-20 h-5 rounded" />
                  <Skeleton className="w-24 h-5 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- JOURNEY SKELETON ---
export const JourneySkeleton: React.FC = () => {
  return (
    <section
      aria-busy="true"
      aria-label="Loading Journey section"
      className="py-20 lg:py-28 bg-cream border-b border-warm-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-4">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-72 sm:w-96 h-10" />
          <SkeletonText lines={2} className="max-w-[60ch]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="bg-card-surface rounded-[6px] border border-warm-border p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="w-12 h-14" />
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>
              <Skeleton className="w-28 h-3" />
              <Skeleton className="w-48 h-6" />
              <SkeletonText lines={3} />
              <div className="border-t border-warm-border/80 pt-4 flex justify-between">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SELECTED WORKS SKELETON ---
export const SelectedWorksSkeleton: React.FC<{ showAll?: boolean }> = ({ showAll = false }) => {
  const cardCount = showAll ? 6 : 6;

  return (
    <section
      aria-busy="true"
      aria-label="Loading Projects section"
      className="py-20 lg:py-28 bg-ivory border-b border-warm-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-64 h-10" />
          </div>
          {!showAll && <Skeleton className="w-32 h-5" />}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: cardCount }).map((_, idx) => (
            <div
              key={idx}
              className="bg-card-surface rounded-[6px] border border-warm-border overflow-hidden flex flex-col h-full"
            >
              <div className="w-full aspect-[16/10] bg-cream">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <Skeleton className="w-20 h-4 rounded-full" />
                  <Skeleton className="w-4/5 h-6" />
                  <SkeletonText lines={2} />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Skeleton className="w-14 h-5 rounded" />
                  <Skeleton className="w-16 h-5 rounded" />
                  <Skeleton className="w-20 h-5 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- LAB & IDEAS SKELETON ---
export const LabIdeasSkeleton: React.FC = () => {
  return (
    <section
      aria-busy="true"
      aria-label="Loading Lab & Ideas section"
      className="py-20 lg:py-28 bg-ivory border-b border-warm-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <Skeleton className="w-36 h-4" />
          <Skeleton className="w-56 h-10" />
          <SkeletonText lines={2} className="max-w-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="bg-card-surface rounded-[6px] border border-warm-border p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="w-24 h-5 rounded" />
                <Skeleton className="w-5 h-5 rounded" />
              </div>
              <Skeleton className="w-3/4 h-7" />
              <SkeletonText lines={2} />
              <div className="flex gap-2 pt-2">
                <Skeleton className="w-16 h-5 rounded" />
                <Skeleton className="w-20 h-5 rounded" />
                <Skeleton className="w-16 h-5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- EXPERTISE SKELETON ---
export const ExpertiseSkeleton: React.FC = () => {
  return (
    <section
      aria-busy="true"
      aria-label="Loading Expertise section"
      className="py-20 lg:py-28 bg-ivory border-b border-warm-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-3">
          <Skeleton className="w-36 h-4" />
          <Skeleton className="w-72 h-10" />
          <SkeletonText lines={2} className="max-w-2xl" />
        </div>

        <div className="space-y-4">
          <Skeleton className="w-56 h-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="bg-card-surface rounded-[6px] border border-warm-border p-5 space-y-4 h-full"
              >
                <Skeleton className="w-28 h-4" />
                <div className="h-[1px] bg-warm-border w-full" />
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="w-16 h-6 rounded" />
                  <Skeleton className="w-20 h-6 rounded" />
                  <Skeleton className="w-14 h-6 rounded" />
                  <Skeleton className="w-18 h-6 rounded" />
                  <Skeleton className="w-16 h-6 rounded" />
                  <Skeleton className="w-22 h-6 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exploring Box */}
        <div className="bg-cream/40 border border-warm-border rounded-[8px] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-64 h-6" />
          </div>
          <SkeletonText lines={2} className="max-w-2xl" />
          <div className="flex flex-wrap gap-2.5 pt-2">
            <Skeleton className="w-28 h-7 rounded-full" />
            <Skeleton className="w-36 h-7 rounded-full" />
            <Skeleton className="w-32 h-7 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- EXPERIENCE SKELETON ---
export const ExperienceSkeleton: React.FC = () => {
  return (
    <section
      aria-busy="true"
      aria-label="Loading Experience section"
      className="py-20 lg:py-28 bg-ivory border-b border-warm-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-3">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-64 h-10" />
          <SkeletonText lines={2} className="max-w-xl" />
        </div>

        <div className="relative ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10 sm:space-y-12 border-l border-warm-border">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="relative">
              <Skeleton className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full" />
              <div className="bg-card-surface rounded-[6px] border border-warm-border p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="space-y-1">
                    <Skeleton className="w-48 h-6" />
                    <Skeleton className="w-36 h-4" />
                  </div>
                  <Skeleton className="w-28 h-6 rounded" />
                </div>
                <SkeletonText lines={3} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CREDENTIALS SKELETON ---
export const CredentialsSkeleton: React.FC = () => {
  return (
    <section
      aria-busy="true"
      aria-label="Loading Credentials section"
      className="py-20 lg:py-28 bg-ivory border-b border-warm-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-3">
          <Skeleton className="w-44 h-4" />
          <Skeleton className="w-72 h-10" />
          <SkeletonText lines={2} className="max-w-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="bg-card-surface rounded-[6px] border border-warm-border p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Skeleton className="w-full aspect-[4/3] rounded" />
                <Skeleton className="w-4/5 h-5" />
                <Skeleton className="w-1/2 h-3" />
                <Skeleton className="w-1/3 h-3" />
              </div>
              <div className="pt-3 border-t border-warm-border/60 flex justify-between">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CONTACT SKELETON ---
export const ContactSkeleton: React.FC = () => {
  return (
    <section
      aria-busy="true"
      aria-label="Loading Contact section"
      className="py-20 lg:py-28 bg-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8 flex flex-col items-center">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-3/4 sm:w-2/3 h-12" />
          <SkeletonText lines={2} className="max-w-xl mx-auto" />
          <Skeleton className="w-44 h-12 rounded-[5px]" />
          <div className="pt-8 border-t border-warm-border w-full flex flex-col sm:flex-row items-center justify-center gap-6">
            <Skeleton className="w-36 h-4" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PROJECTS PAGE SKELETON (/projects) ---
export const ProjectsPageSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading projects catalog"
      className="min-h-screen bg-ivory text-charcoal flex flex-col"
    >
      <div className="pt-24 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          <Skeleton className="w-32 h-5" />
          <div className="space-y-3">
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-64 h-10" />
            <Skeleton className="w-96 max-w-full h-5" />
          </div>

          {/* Grid of 6 project card skeletons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-card-surface rounded-[6px] border border-warm-border overflow-hidden flex flex-col"
              >
                <div className="w-full aspect-[16/10] bg-cream">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="w-20 h-4 rounded-full" />
                    <Skeleton className="w-4/5 h-6" />
                    <SkeletonText lines={2} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Skeleton className="w-14 h-5 rounded" />
                    <Skeleton className="w-16 h-5 rounded" />
                    <Skeleton className="w-20 h-5 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PROJECT DETAIL SKELETON (/projects/:slug) ---
export const ProjectDetailSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-label="Loading project details"
      className="min-h-screen bg-ivory text-charcoal flex flex-col"
    >
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Skeleton className="w-36 h-5" />

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-24 h-5 rounded-full" />
              <Skeleton className="w-32 h-4" />
            </div>
            <Skeleton className="w-3/4 sm:w-2/3 h-12" />
            <Skeleton className="w-full h-6" />
          </div>

          {/* Large cover block */}
          <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden border border-warm-border bg-cream">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Metrics row */}
          <div className="p-6 bg-card-surface border border-warm-border rounded-[6px]">
            <Skeleton className="w-36 h-4 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="w-20 h-8" />
                  <Skeleton className="w-24 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Problem & Solution cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card-surface border border-warm-border rounded-[6px] space-y-3">
              <Skeleton className="w-32 h-4" />
              <SkeletonText lines={3} />
            </div>
            <div className="p-6 bg-card-surface border border-warm-border rounded-[6px] space-y-3">
              <Skeleton className="w-32 h-4" />
              <SkeletonText lines={3} />
            </div>
          </div>

          {/* 3 Text Paragraphs */}
          <div className="space-y-4">
            <Skeleton className="w-40 h-6" />
            <SkeletonText lines={3} />
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <Skeleton className="w-28 h-5" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-20 h-7 rounded" />
              <Skeleton className="w-24 h-7 rounded" />
              <Skeleton className="w-18 h-7 rounded" />
              <Skeleton className="w-22 h-7 rounded" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

