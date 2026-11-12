import React, { useEffect, useState } from 'react';

export const VercelAnalytics: React.FC = () => {
  const [Components, setComponents] = useState<{
    Analytics?: React.ComponentType;
    SpeedInsights?: React.ComponentType;
  }>({});

  useEffect(() => {
    // Lazy-load analytics and speed insights after initial paint
    const timer = setTimeout(() => {
      Promise.all([
        import('@vercel/analytics/react').then((m) => m.Analytics),
        import('@vercel/speed-insights/react').then((m) => m.SpeedInsights),
      ])
        .then(([Analytics, SpeedInsights]) => {
          setComponents({ Analytics, SpeedInsights });
        })
        .catch(() => {
          // Gracefully ignore loading failure
        });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const { Analytics, SpeedInsights } = Components;
  return (
    <>
      {Analytics && <Analytics />}
      {SpeedInsights && <SpeedInsights />}
    </>
  );
};

export default VercelAnalytics;

