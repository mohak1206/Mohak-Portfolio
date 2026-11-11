import React, { useState, useEffect } from 'react';

interface DelayedFallbackProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * DelayedFallback:
 * Renders null for the first `delay` ms (default 150ms),
 * and only displays children if loading takes longer.
 * This completely avoids jarring skeleton flickers on fast connections or cached visits.
 */
export const DelayedFallback: React.FC<DelayedFallbackProps> = ({
  children,
  delay = 150,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) {
    return null;
  }

  return <>{children}</>;
};

export default DelayedFallback;

