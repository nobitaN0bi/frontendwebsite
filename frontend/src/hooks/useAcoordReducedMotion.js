import { useEffect, useState } from 'react';

export const useAcoordReducedMotion = () => {
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [siteReduced, setSiteReduced] = useState(() => document.documentElement.dataset.motion === 'reduced' || window.localStorage.getItem('acoord-motion') === 'reduced');

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncSystem = (event) => setSystemReduced(event.matches);
    const syncSite = () => setSiteReduced(document.documentElement.dataset.motion === 'reduced');
    media.addEventListener('change', syncSystem);
    window.addEventListener('acoord:motion', syncSite);
    return () => {
      media.removeEventListener('change', syncSystem);
      window.removeEventListener('acoord:motion', syncSite);
    };
  }, []);

  return systemReduced || siteReduced;
};