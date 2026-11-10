import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING, DEFAULT_VIEWPORT } from '../../lib/animation';

interface CountUpProps {
  value: string | number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  suffix: propSuffix,
  prefix: propPrefix,
  decimals: propDecimals,
  duration = 1.3,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, DEFAULT_VIEWPORT);
  const prefersReducedMotion = useReducedMotion();

  // Parse numeric value and suffix if passed as string (e.g. "4+", "10+", "8.6")
  const rawString = String(value).trim();
  const match = rawString.match(/^([^0-9.-]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  
  const parsedPrefix = propPrefix ?? (match ? match[1] : '');
  const targetNum = match ? parseFloat(match[2]) : (typeof value === 'number' ? value : 0);
  const parsedSuffix = propSuffix !== undefined ? propSuffix : (match ? match[3] : '');
  
  const autoDecimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;
  const decimals = propDecimals !== undefined ? propDecimals : autoDecimals;

  const [currentVal, setCurrentVal] = useState<number>(() => (prefersReducedMotion ? targetNum : 0));

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentVal(targetNum);
      return;
    }

    if (isInView) {
      const controls = animate(0, targetNum, {
        duration,
        ease: EASING,
        onUpdate: (latest) => {
          setCurrentVal(latest);
        },
      });

      return () => controls.stop();
    }
  }, [isInView, targetNum, duration, prefersReducedMotion]);

  const formattedNumber = currentVal.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {parsedPrefix}
      {formattedNumber}
      {parsedSuffix}
    </span>
  );
};

export default CountUp;
