import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAcoordReducedMotion } from '../hooks/useAcoordReducedMotion';
import { AsciiArt } from './AsciiArt';
import { FilmScene } from './FilmScene';

const drawOcean = (context, width, height, time, drift) => {
  context.clearRect(0, 0, width, height);
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = 'rgba(255,255,255,.22)';
  context.lineWidth = 1;
  const horizon = height * .48;
  for (let line = 0; line < 18; line += 1) {
    const depth = line / 17;
    const y = horizon + depth * depth * height * .52;
    const amplitude = 2 + depth * 24;
    context.beginPath();
    for (let x = 0; x <= width; x += 10) {
      const wave = Math.sin(x * (.012 + depth * .014) + time * (.0005 + depth * .0007) + line) * amplitude;
      const perspective = (x - width / 2) * drift * depth * .02;
      if (x === 0) context.moveTo(x, y + wave + perspective);
      else context.lineTo(x, y + wave + perspective);
    }
    context.stroke();
  }
  context.strokeStyle = 'rgba(255,255,255,.08)';
  for (let ray = -8; ray <= 8; ray += 1) {
    context.beginPath();
    context.moveTo(width / 2, horizon);
    context.lineTo(width / 2 + ray * width * .11, height);
    context.stroke();
  }
};

export const FounderOceanScene = ({ onJoin }) => {
  const canvasRef = useRef(null);
  const reduced = useAcoordReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    let frame = 0;
    let drift = 0;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawOcean(context, canvas.clientWidth, canvas.clientHeight, 0, drift);
    };
    const move = (event) => { drift = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2; };
    const render = (time) => {
      drawOcean(context, canvas.clientWidth, canvas.clientHeight, time, drift);
      if (!reduced) frame = window.requestAnimationFrame(render);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    if (!reduced) frame = window.requestAnimationFrame(render);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); };
  }, [reduced]);

  return <FilmScene id="finale" tone="dark" className="founder-ocean-scene" slate="FINAL SCENE" meta="FOUNDER / OPEN WATER" testId="founder-ocean-section">
    <canvas ref={canvasRef} className="founder-ocean-canvas" aria-hidden="true" data-testid="founder-ocean-canvas" />
    <AsciiArt src="/ascii/portrait-ascii.txt" className="founder-ocean-portrait" testId="founder-ocean-portrait" />
    <div className="founder-ocean-copy"><p>FOUNDER SIGNAL / ACOORD</p><h2 data-testid="founder-ocean-title">The interface is new.<br />Human authority isn&rsquo;t.</h2><span data-testid="founder-ocean-description">Acoord is building the operating surface for organizations where people and agents act as one accountable system.</span><div><button type="button" onClick={onJoin} data-testid="founder-ocean-waitlist-button">Join the waitlist</button><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="founder-ocean-book-link">Talk to the founder <ArrowRight size={15} /></a></div></div>
  </FilmScene>;
};