import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const useInvestorReducedMotion = () => {
  const systemReduced = useReducedMotion();
  const [siteReduced, setSiteReduced] = useState(document.documentElement.dataset.motion === 'reduced');

  useEffect(() => {
    const sync = () => setSiteReduced(document.documentElement.dataset.motion === 'reduced');
    window.addEventListener('acoord:motion', sync);
    return () => window.removeEventListener('acoord:motion', sync);
  }, []);

  return Boolean(systemReduced || siteReduced);
};