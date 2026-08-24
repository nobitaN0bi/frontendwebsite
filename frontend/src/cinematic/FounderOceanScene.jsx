import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAcoordReducedMotion } from '../hooks/useAcoordReducedMotion';
import { AsciiArt } from './AsciiArt';
import { FilmScene } from './FilmScene';

const clamp = (value) => Math.max(0, Math.min(1, value));

const drawComet = (context, width, height, time, horizon, reduced) => {
  for (let index = 0; index < 78; index += 1) {
    const x = ((index * 83) % 997) / 997 * width;
    const y = ((index * 47) % 991) / 991 * horizon * .92;
    const shimmer = reduced ? .22 : .12 + Math.abs(Math.sin(time * .001 + index)) * .25;
    context.fillStyle = `rgba(255,255,255,${shimmer})`;
    context.fillRect(Math.round(x), Math.round(y), index % 11 === 0 ? 2 : 1, 1);
  }

  const cycle = reduced ? .38 : (time % 12800) / 12800;
  if (!reduced && (cycle < .12 || cycle > .62)) return;
  const flight = reduced ? .58 : clamp((cycle - .12) / .5);
  const x = width * (1.08 - flight * 1.28);
  const y = height * (.13 + flight * .22);
  const visibility = reduced ? 1 : Math.min(1, flight * 6, (1 - flight) * 5);

  for (let segment = 1; segment < 70; segment += 1) {
    const fade = (1 - segment / 70) * visibility;
    const scatter = Math.sin(segment * 7.1) * segment * .05;
    const size = segment % 5 === 0 ? 2 : 1;
    context.fillStyle = `rgba(255,255,255,${fade * .65})`;
    context.fillRect(x + segment * 6.2, y - segment * 1.95 + scatter, size, size);
  }
  context.fillStyle = `rgba(255,255,255,${visibility})`;
  context.fillRect(x - 3, y - 3, 7, 7);

  const reflectionDepth = Math.max(0, (x / width) * .75 + .2);
  for (let row = 0; row < 24; row += 1) {
    const depth = row / 23;
    const reflectionY = horizon + 12 + depth * height * .45;
    const spread = (10 + depth * 82) * reflectionDepth;
    const offset = Math.sin(time * .0014 + row * 1.7) * (3 + depth * 13);
    context.fillStyle = `rgba(255,255,255,${visibility * (1 - depth) * .32})`;
    context.fillRect(x - spread / 2 + offset, reflectionY, spread, row % 4 === 0 ? 2 : 1);
  }
};

const drawOcean = (context, width, height, time, drift, reduced = false) => {
  context.clearRect(0, 0, width, height);
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = 'rgba(255,255,255,.22)';
  context.lineWidth = 1;
  const horizon = height * .48;
  drawComet(context, width, height, time, horizon, reduced);
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
    let runId = 0;
    let drift = 0;
    let visible = true;
    const shouldReduce = () => reduced || document.documentElement.dataset.motion === 'reduced' || navigator.connection?.saveData;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawOcean(context, canvas.clientWidth, canvas.clientHeight, 0, drift, shouldReduce());
    };
    const move = (event) => { drift = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2; };
    const render = (time, activeRun) => {
      if (activeRun !== runId) return;
      if (shouldReduce()) {
        canvas.dataset.motionState = 'reduced';
        drawOcean(context, canvas.clientWidth, canvas.clientHeight, 0, drift, true);
        return;
      }
      canvas.dataset.motionState = 'cinematic';
      if (visible) drawOcean(context, canvas.clientWidth, canvas.clientHeight, time, drift, false);
      frame = window.requestAnimationFrame((next) => render(next, activeRun));
    };
    const restart = () => {
      runId += 1;
      window.cancelAnimationFrame(frame);
      const activeRun = runId;
      if (shouldReduce()) render(0, activeRun);
      else frame = window.requestAnimationFrame((time) => render(time, activeRun));
    };
    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
      else { runId += 1; window.cancelAnimationFrame(frame); }
    }, { threshold: .02 });
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('acoord:motion', restart);
    restart();
    canvas.dataset.ready = 'true';
    return () => { observer.disconnect(); runId += 1; window.cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); window.removeEventListener('acoord:motion', restart); };
  }, [reduced]);

  return <FilmScene id="finale" tone="dark" className="founder-ocean-scene" slate="FINAL SCENE" meta="FOUNDER / OPEN WATER" testId="founder-ocean-section">
    <canvas ref={canvasRef} className="founder-ocean-canvas" aria-hidden="true" data-testid="founder-ocean-canvas" />
    <AsciiArt src="/ascii/portrait-ascii.txt" className="founder-ocean-portrait" testId="founder-ocean-portrait" />
    <div className="founder-ocean-copy"><p>FOUNDER SIGNAL / ACOORD</p><h2 data-testid="founder-ocean-title">The interface is new.<br />Human authority isn&rsquo;t.</h2><span data-testid="founder-ocean-description">Acoord is building the operating surface for organizations where people and agents act as one accountable system.</span><div><button type="button" onClick={onJoin} data-testid="founder-ocean-waitlist-button">Join the waitlist</button><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="founder-ocean-book-link">Talk to the founder <ArrowRight size={15} /></a></div></div>
  </FilmScene>;
};