import { useCallback, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useAcoordReducedMotion } from '../../hooks/useAcoordReducedMotion';

export const useCinematicScenes = (count) => {
  const reduced = useAcoordReducedMotion();
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(count - 1, Math.floor(value * count));
    setActive((current) => current === next ? current : next);
  });

  const goTo = useCallback((index) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const travel = Math.max(0, ref.current.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + (travel * index / Math.max(1, count - 1)), behavior: reduced ? 'auto' : 'smooth' });
  }, [count, reduced]);

  return { ref, active, goTo };
};