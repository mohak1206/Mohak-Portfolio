import React, { useState, useId } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GlossaryTooltip } from '../ui/GlossaryTooltip';
import { EASING } from '../../lib/animation';

interface CandidateBox {
  id: string;
  label: string;
  confidence: number;
  isTrue: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ThresholdDemoProps {
  slug: string; // 'signature-detection' or 'fire-smoke-detection'
}

const SIGNATURE_CANDIDATES: CandidateBox[] = [
  { id: 'sig-1', label: 'SIG', confidence: 0.94, isTrue: true, x: 280, y: 190, w: 160, h: 65 },
  { id: 'sig-2', label: 'SIG', confidence: 0.88, isTrue: true, x: 80, y: 185, w: 150, h: 60 },
  { id: 'note-1', label: 'NOTE', confidence: 0.61, isTrue: false, x: 320, y: 40, w: 130, h: 70 },
  { id: 'stamp-1', label: 'STAMP', confidence: 0.47, isTrue: false, x: 50, y: 40, w: 80, h: 80 },
  { id: 'logo-1', label: 'LOGO', confidence: 0.29, isTrue: false, x: 210, y: 35, w: 60, h: 60 },
  { id: 'faint-sig', label: 'SIG', confidence: 0.38, isTrue: true, x: 190, y: 120, w: 110, h: 45 },
];

const FIRE_SMOKE_CANDIDATES: CandidateBox[] = [
  { id: 'fire-1', label: 'FIRE', confidence: 0.93, isTrue: true, x: 180, y: 160, w: 100, h: 100 },
  { id: 'fire-2', label: 'FIRE', confidence: 0.81, isTrue: true, x: 130, y: 180, w: 70, h: 80 },
  { id: 'smoke-1', label: 'SMOKE', confidence: 0.57, isTrue: true, x: 170, y: 50, w: 150, h: 110 },
  { id: 'smoke-2', label: 'SMOKE', confidence: 0.34, isTrue: true, x: 80, y: 30, w: 110, h: 90 },
  { id: 'cloud-1', label: 'CLOUD', confidence: 0.28, isTrue: false, x: 310, y: 30, w: 130, h: 80 },
];

export const ThresholdDemo: React.FC<ThresholdDemoProps> = ({ slug }) => {
  const [threshold, setThreshold] = useState<number>(0.5);
  const sliderId = useId();
  const prefersReduced = useReducedMotion();

  const isFireSmoke = slug === 'fire-smoke-detection';
  const candidates = isFireSmoke ? FIRE_SMOKE_CANDIDATES : SIGNATURE_CANDIDATES;

  // Compute metrics based on candidate detections at current threshold
  const detections = candidates.filter((c) => c.confidence >= threshold);
  const truePositives = detections.filter((c) => c.isTrue).length;
  const falsePositives = detections.filter((c) => !c.isTrue).length;
  const missed = candidates.filter((c) => c.isTrue && c.confidence < threshold).length;

  return (
    <div className="bg-card-surface border border-warm-border rounded-[8px] p-5 sm:p-6 space-y-6">
      {/* Header and Mandatory Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-border pb-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-burnt-orange font-semibold">
            Interactive Exploration
          </div>
          <h3 className="font-serif text-xl text-charcoal font-medium mt-0.5">
            Detection <GlossaryTooltip term="Confidence threshold">Confidence Threshold</GlossaryTooltip> Playground
          </h3>
        </div>
        <span className="text-[11px] font-mono text-muted-grey bg-cream px-2 py-1 rounded border border-warm-border">
          Illustrative example, not actual model output.
        </span>
      </div>

      {/* SVG Hand-drawn Scene with Dynamic Bounding Boxes */}
      <div className="w-full aspect-[16/9] max-h-[340px] bg-cream/70 border border-warm-border rounded-[6px] overflow-hidden relative select-none">
        <svg
          viewBox="0 0 500 280"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isFireSmoke ? (
            /* Fire & Smoke Illustration */
            <g className="illustration-scene opacity-65">
              {/* Sky / background landscape */}
              <path d="M0,240 Q150,220 300,240 T500,230 L500,280 L0,280 Z" fill="var(--color-border)" opacity="0.3" />
              {/* Tree / forest outline */}
              <path d="M40,240 L55,180 L70,240 Z M80,240 L95,190 L110,240 Z M380,240 L395,170 L410,240 Z" fill="var(--color-border)" opacity="0.5" />
              {/* Smoke plume */}
              <path
                d="M190,160 Q140,110 170,60 Q210,20 260,50 Q310,80 270,120 Q240,150 220,165 Z"
                fill="var(--color-border)"
                opacity="0.4"
              />
              <path
                d="M100,100 Q70,60 110,40 Q150,20 160,70 Z"
                fill="var(--color-border)"
                opacity="0.3"
              />
              {/* Cloud in background (potential FP) */}
              <ellipse cx="370" cy="70" rx="60" ry="30" fill="var(--color-border)" opacity="0.3" />
              {/* Flames */}
              <path
                d="M180,250 Q160,200 190,170 Q210,210 230,160 Q260,200 240,250 Z"
                fill="var(--color-accent)"
                opacity="0.35"
              />
              <path
                d="M140,250 Q130,220 150,190 Q170,220 160,250 Z"
                fill="var(--color-accent)"
                opacity="0.3"
              />
            </g>
          ) : (
            /* Document Signature Illustration */
            <g className="illustration-scene opacity-60">
              {/* Document Sheet */}
              <rect x="25" y="15" width="450" height="250" rx="4" fill="var(--color-card-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
              {/* Text lines */}
              <line x1="50" y1="40" x2="160" y2="40" stroke="var(--color-border)" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="60" x2="280" y2="60" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="50" y1="75" x2="270" y2="75" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="50" y1="90" x2="300" y2="90" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="50" y1="105" x2="260" y2="105" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />

              {/* Company Logo in header */}
              <rect x="220" y="45" width="40" height="40" rx="3" fill="none" stroke="var(--color-border)" strokeWidth="2" />
              <circle cx="240" cy="65" r="12" fill="var(--color-border)" opacity="0.5" />

              {/* Official Stamp */}
              <circle cx="90" cy="80" r="30" fill="none" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="4 2" />
              <text x="90" y="83" textAnchor="middle" className="text-[8px] font-mono fill-muted-grey font-bold">APPROVED</text>

              {/* Handwritten Note */}
              <path d="M330,55 Q360,45 390,60 T440,55" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M335,75 Q370,68 400,80 T430,72" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" />

              {/* Section Divider */}
              <line x1="50" y1="130" x2="450" y2="130" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 2" />

              {/* Signature lines */}
              <line x1="80" y1="240" x2="230" y2="240" stroke="var(--color-border)" strokeWidth="1.5" />
              <text x="80" y="255" className="text-[9px] font-mono fill-muted-grey">Signer A</text>

              <line x1="280" y1="240" x2="430" y2="240" stroke="var(--color-border)" strokeWidth="1.5" />
              <text x="280" y="255" className="text-[9px] font-mono fill-muted-grey">Signer B</text>

              {/* Signature squiggles */}
              <path
                d="M90,230 Q110,195 130,225 T160,205 T190,230 T220,210"
                fill="none"
                stroke="var(--color-charcoal)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M290,225 Q320,190 340,230 T380,200 T410,235"
                fill="none"
                stroke="var(--color-charcoal)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Faint signature squiggle */}
              <path
                d="M200,140 Q220,125 240,145 T280,135"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Render Candidate Bounding Boxes */}
          {candidates.map((box) => {
            const isDetected = box.confidence >= threshold;
            const isMissed = box.isTrue && !isDetected;

            if (!isDetected && !isMissed) return null;

            const strokeColor = isDetected
              ? box.isTrue
                ? 'var(--color-accent)'
                : '#D97706' // Amber for false positive
              : 'var(--color-border)'; // Missed true object

            const badgeBg = isDetected
              ? box.isTrue
                ? 'var(--color-accent)'
                : '#D97706'
              : 'var(--color-border)';

            const labelText = isDetected
              ? `${box.label} ${box.confidence.toFixed(2)}${!box.isTrue ? ' (FP)' : ''}`
              : 'missed';

            return (
              <g key={box.id}>
                {/* Bounding Box Rect */}
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  fill={isDetected ? (box.isTrue ? 'rgba(201, 79, 23, 0.08)' : 'rgba(217, 119, 6, 0.08)') : 'none'}
                  stroke={strokeColor}
                  strokeWidth={isDetected ? 2 : 1.5}
                  strokeDasharray={isDetected ? (box.isTrue ? '5 3' : '4 2') : '3 3'}
                  className="transition-all duration-200"
                />

                {/* Tag Badge */}
                <g transform={`translate(${box.x}, ${box.y - 18})`}>
                  <rect
                    x="0"
                    y="0"
                    width={labelText.length * 6.5 + 10}
                    height="16"
                    rx="3"
                    fill={badgeBg}
                  />
                  <text
                    x="5"
                    y="11"
                    fill="#FFFFFF"
                    className="text-[9px] font-mono font-bold uppercase tracking-tight pointer-events-none"
                  >
                    {labelText}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Controls & Range Slider */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
          <label htmlFor={sliderId} className="font-semibold text-charcoal">
            Confidence Threshold: <span className="text-burnt-orange font-bold">{threshold.toFixed(2)}</span>
          </label>
          <span className="text-muted-grey text-xs">
            Range: 0.10 &ndash; 0.95
          </span>
        </div>

        <input
          id={sliderId}
          type="range"
          min="0.10"
          max="0.95"
          step="0.01"
          value={threshold}
          aria-valuetext={`Threshold ${threshold.toFixed(2)}`}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full accent-burnt-orange cursor-pointer h-2 bg-cream rounded-lg border border-warm-border"
        />

        <div className="flex justify-between text-[11px] font-mono text-muted-grey">
          <span>0.10 (High <GlossaryTooltip term="Recall">Recall</GlossaryTooltip>)</span>
          <span>0.50 (Balanced)</span>
          <span>0.95 (High <GlossaryTooltip term="Precision">Precision</GlossaryTooltip>)</span>
        </div>
      </div>

      {/* Readout Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-warm-border text-center font-mono">
        <div className="p-2.5 rounded bg-cream/60 border border-warm-border">
          <div className="text-[11px] uppercase tracking-wider text-muted-grey">Detections</div>
          <div className="text-lg font-bold text-charcoal mt-0.5">{detections.length}</div>
        </div>

        <div className="p-2.5 rounded bg-cream/60 border border-warm-border">
          <div className="text-[11px] uppercase tracking-wider text-burnt-orange">True Positives</div>
          <div className="text-lg font-bold text-burnt-orange mt-0.5">{truePositives}</div>
        </div>

        <div className="p-2.5 rounded bg-cream/60 border border-warm-border">
          <div className="text-[11px] uppercase tracking-wider text-amber-600">False Positives</div>
          <div className="text-lg font-bold text-amber-600 mt-0.5">{falsePositives}</div>
        </div>

        <div className="p-2.5 rounded bg-cream/60 border border-warm-border">
          <div className="text-[11px] uppercase tracking-wider text-muted-grey">Missed Objects</div>
          <div className="text-lg font-bold text-muted-grey mt-0.5">{missed}</div>
        </div>
      </div>

      {/* Dynamic Summary Sentence */}
      <p className="text-xs sm:text-sm text-charcoal/90 text-center font-medium leading-relaxed bg-cream/40 p-3 rounded border border-warm-border">
        {threshold >= 0.7
          ? 'Raising the threshold removes false alarms (higher precision) but can miss real objects (lower recall).'
          : threshold <= 0.35
          ? 'Lowering the threshold captures faint objects (higher recall) but admits false alarms (lower precision).'
          : 'Raising the threshold removes false alarms (higher precision) but can miss real objects (lower recall).'}
      </p>

      {/* Fire & Smoke specific domain insight note */}
      {isFireSmoke && (
        <p className="text-xs font-mono text-muted-grey text-center pt-1 border-t border-warm-border/60">
          Smoke has lower confidence scores because its shape and density vary, which matches its lower{' '}
          <GlossaryTooltip term="mAP@50">mAP@50</GlossaryTooltip> (41.5%).
        </p>
      )}
    </div>
  );
};

export default ThresholdDemo;
