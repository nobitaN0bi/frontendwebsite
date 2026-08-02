import { useEffect, useState } from 'react';
import { Gauge, Minus } from 'lucide-react';

const getInitialMode = () => {
  const saved = window.localStorage.getItem('acoord-motion');
  if (saved === 'cinematic' || saved === 'reduced') return saved;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'cinematic';
};

export const MotionControl = () => {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.dataset.motion = mode;
    window.localStorage.setItem('acoord-motion', mode);
    window.dispatchEvent(new CustomEvent('acoord:motion', { detail: { mode } }));
  }, [mode]);

  const toggle = () => setMode((current) => current === 'cinematic' ? 'reduced' : 'cinematic');
  const Icon = mode === 'cinematic' ? Gauge : Minus;

  return (
    <button className="motion-control" type="button" onClick={toggle} aria-pressed={mode === 'reduced'} data-testid="motion-intensity-toggle">
      <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
      <span>Motion: {mode}</span>
    </button>
  );
};