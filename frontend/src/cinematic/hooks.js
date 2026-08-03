import { useEffect, useRef } from 'react';

const clamp = (value) => Math.min(1, Math.max(0, value));

export const useSceneMotion = (ref) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    let frame = 0;

    const write = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const view = window.innerHeight || 1;
      element.style.setProperty('--p', clamp((view - rect.top) / (view + rect.height)).toFixed(4));
      element.style.setProperty('--s', clamp(-rect.top / Math.max(1, rect.height - view)).toFixed(4));
    };

    const request = () => { if (!frame) frame = window.requestAnimationFrame(write); };
    write();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, [ref]);
};

export const useSceneLive = (ref, onEnter) => {
  const callback = useRef(onEnter);
  callback.current = onEnter;

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reveal = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) element.classList.add('is-live');
    }, { threshold: 0.14 });

    const focus = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && callback.current) callback.current();
    }, { threshold: 0.55 });

    reveal.observe(element);
    focus.observe(element);
    return () => { reveal.disconnect(); focus.disconnect(); };
  }, [ref]);
};
