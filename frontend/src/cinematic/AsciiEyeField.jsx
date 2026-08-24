import { useEffect, useRef } from 'react';

const glyphs = ['·', ':', '+', '*', '#', '%', '@'];
const hash = (x, y) => Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
const shouldReduce = () => document.documentElement.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;

const drawEye = (context, width, height, time, gaze, reduced) => {
  context.clearRect(0, 0, width, height);
  const cell = width < 620 ? 8 : 11;
  const phase = reduced ? 1.4 : time * .00022;
  const gazeX = gaze.x * width * .055;
  const gazeY = gaze.y * height * .065;
  context.font = `500 ${Math.max(6, cell - 2)}px "JetBrains Mono", monospace`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  for (let y = cell / 2; y < height; y += cell) {
    for (let x = cell / 2; x < width; x += cell) {
      const nx = (x - width / 2) / (width * .5);
      const ny = (y - height / 2) / (height * .5);
      const lid = Math.sqrt(Math.max(0, 1 - nx * nx)) * .82;
      if (Math.abs(ny) > lid) continue;
      const irisX = (x - width / 2 - gazeX) / (height * .43);
      const irisY = (y - height / 2 - gazeY) / (height * .43);
      const iris = Math.max(0, 1 - Math.hypot(irisX, irisY));
      const edge = Math.max(0, 1 - Math.abs(Math.abs(ny) - lid) * 11);
      const interior = Math.max(0, 1 - Math.abs(ny) / Math.max(lid, .01));
      const current = (Math.sin(nx * 10 + phase * 3) + Math.cos(ny * 13 - phase * 2)) * .07;
      const density = Math.max(.055, iris * .82 + edge * .46 + interior * .17 + current);
      if (hash(x, y) > Math.min(1, density * 1.45)) continue;
      const glyph = glyphs[Math.min(glyphs.length - 1, Math.floor(density * glyphs.length))];
      context.fillStyle = `rgba(255,255,255,${Math.min(.82, .1 + density * .72)})`;
      context.fillText(glyph, x, y);
    }
  }
};

export const AsciiEyeField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    const gaze = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let frame = 0;
    let runId = 0;
    let visible = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawEye(context, canvas.clientWidth, canvas.clientHeight, 0, gaze, true);
    };
    const render = (time, activeRun) => {
      if (activeRun !== runId) return;
      const reduced = shouldReduce();
      canvas.dataset.motionState = reduced ? 'reduced' : 'cinematic';
      gaze.x += (gaze.targetX - gaze.x) * .075;
      gaze.y += (gaze.targetY - gaze.y) * .075;
      if (visible) drawEye(context, canvas.clientWidth, canvas.clientHeight, time, gaze, reduced);
      frame = reduced ? 0 : window.requestAnimationFrame((next) => render(next, activeRun));
    };
    const restart = () => {
      runId += 1;
      window.cancelAnimationFrame(frame);
      const activeRun = runId;
      if (shouldReduce()) drawEye(context, canvas.clientWidth, canvas.clientHeight, 0, gaze, true);
      else frame = window.requestAnimationFrame((time) => render(time, activeRun));
    };
    const move = (event) => {
      gaze.targetX = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2;
      gaze.targetY = (event.clientY / Math.max(window.innerHeight, 1) - .5) * 2;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
      else { runId += 1; window.cancelAnimationFrame(frame); }
    }, { threshold: .02 });
    observer.observe(canvas);
    resize();
    restart();
    canvas.dataset.ready = 'true';
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('acoord:motion', restart);
    return () => {
      observer.disconnect();
      runId += 1;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('acoord:motion', restart);
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-eye-field" aria-hidden="true" data-testid="ascii-eye-field" />;
};