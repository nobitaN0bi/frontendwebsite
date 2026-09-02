import { useEffect, useRef, useState } from 'react';
import { useAcoordReducedMotion } from '../hooks/useAcoordReducedMotion';
import { AsciiEyeField } from './AsciiEyeField';
import { FilmScene } from './FilmScene';

const letters = [['A', 'gent'], ['H', 'uman'], ['I', 'nterface']];

export const EyeScene = () => {
  const eyeRef = useRef(null);
  const sceneRef = useRef(null);
  const reduced = useAcoordReducedMotion();
  const [entered, setEntered] = useState(reduced);

  useEffect(() => {
    if (reduced) { setEntered(true); return undefined; }
    const node = sceneRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setEntered(true); observer.disconnect(); } }, { threshold: .18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const eye = eyeRef.current;
    if (!eye || reduced) return undefined;
    let frame = 0;
    let blinkTimer = 0;
    let blinkReset = 0;
    const move = (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = (event.clientX / Math.max(1, window.innerWidth) - .5) * 2;
        const y = (event.clientY / Math.max(1, window.innerHeight) - .5) * 2;
        eye.style.setProperty('--gaze-x', `${(x * 22).toFixed(2)}px`);
        eye.style.setProperty('--gaze-y', `${(y * 14).toFixed(2)}px`);
        eye.style.setProperty('--dilate', (1 + Math.max(0, .14 - Math.hypot(x, y) * .08)).toFixed(3));
      });
    };
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        eye.dataset.blink = 'true';
        blinkReset = window.setTimeout(() => { eye.dataset.blink = 'false'; scheduleBlink(); }, 170);
      }, 2800 + Math.random() * 4200);
    };
    scheduleBlink();
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(blinkTimer);
      window.clearTimeout(blinkReset);
      window.removeEventListener('pointermove', move);
    };
  }, [reduced]);

  return <FilmScene id="ahi" tone="dark" className={`scene-eye is-compact ${entered ? 'is-entered' : ''}`} slate="02 / THE INTERFACE" meta="INTRODUCING AHI" testId="film-scene-eye">
    <div ref={sceneRef} className="eye-column">
      <div ref={eyeRef} className="eye-shape" style={{ '--s': entered ? 1 : 0 }} aria-hidden="true" data-testid="ahi-living-eye">
        <AsciiEyeField />
        <div className="eye-iris">
          <span className="eye-pupil" />
        </div>
        <div className="eye-telemetry"><span>GAZE / LIVE</span><span>AUTHORITY / HUMAN</span><span>TRACE / ON</span></div>
      </div>
      <div className="eye-copy">
        <p className="film-eyebrow" data-testid="eye-eyebrow"><i />THE SYSTEM OPENS ITS EYES</p>
        <h2 className="eye-title" data-testid="eye-title">AHI</h2>
        <div className="eye-expand" data-testid="eye-expansion">
          {letters.map(([letter, rest], index) => (
            <span key={letter} style={{ '--i': index }}><b>{letter}</b>{rest}</span>
          ))}
        </div>
        <p className="eye-line" data-testid="eye-description">
          Not another assistant. A live operating surface between every human and every agent in the organization.
        </p>
      </div>
    </div>
  </FilmScene>;
};
