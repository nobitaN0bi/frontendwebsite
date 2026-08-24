import { useEffect, useState } from 'react';

export const useAcoordReducedMotion = () => {
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncSystem = (event) => setSystemReduced(event.matches);
    media.addEventListener('change', syncSystem);
    return () => {
      media.removeEventListener('change', syncSystem);
    };
  }, []);

  return systemReduced;
};