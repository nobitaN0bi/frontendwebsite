import { useEffect, useRef } from 'react';

const glyphs = ['·', ':', '-', '+', '*', '#', '%', '@'];
const shouldReduce = () => document.documentElement.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;

const drawBlob = (context, width, height, time, pointer, reduced) => {
  context.clearRect(0, 0, width, height);
  const cell = width < 620 ? 10 : 14;
  const phase = reduced ? .8 : time * .00018;
  const centers = [
    [.3 + Math.sin(phase) * .08, .46 + Math.cos(phase * .7) * .1, .19],
    [.63 + Math.cos(phase * .8) * .1, .42 + Math.sin(phase * 1.15) * .08, .23],
    [.5 + pointer.x * .16, .56 + pointer.y * .12, .17]
  ];
  context.font = `500 ${Math.max(7, cell - 3)}px "JetBrains Mono", monospace`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  for (let y = cell / 2; y < height; y += cell) {
    for (let x = cell / 2; x < width; x += cell) {
      const px = x / width;
      const py = y / height;
      let field = 0;
      centers.forEach(([cx, cy, radius]) => {
        const distance = Math.hypot((px - cx) * 1.25, py - cy);
        field += (radius * radius) / Math.max(distance * distance, .008);
      });
      const wave = (Math.sin(px * 18 + phase * 4) + Math.cos(py * 15 - phase * 3)) * .05;
      const density = Math.max(0, Math.min(1, (field - 1.15) * .42 + wave));
      const noise = Math.abs(Math.sin(x * 9.13 + y * 4.71)) % 1;
      if (density < .08 || noise > density * 1.35) continue;
      const index = Math.min(glyphs.length - 1, Math.floor(density * glyphs.length));
      context.fillStyle = `rgba(255,255,255,${.08 + density * .45})`;
      context.fillText(glyphs[index], x, y);
    }
  }
};

export const AsciiBlobField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let frame = 0;
    let runId = 0;
    let visible = true;
    let previous = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drawBlob(context, canvas.clientWidth, canvas.clientHeight, 0, pointer, true);
    };
    const render = (time, activeRun) => {
      if (activeRun !== runId) return;
      const reduced = shouldReduce();
      canvas.dataset.motionState = reduced ? 'reduced' : 'cinematic';
      pointer.x += (pointer.targetX - pointer.x) * .06;
      pointer.y += (pointer.targetY - pointer.y) * .06;
      if (visible && time - previous > 40) {
        drawBlob(context, canvas.clientWidth, canvas.clientHeight, time, pointer, reduced);
        previous = time;
      }
      frame = reduced ? 0 : window.requestAnimationFrame((next) => render(next, activeRun));
    };
    const restart = () => {
      runId += 1;
      window.cancelAnimationFrame(frame);
      const activeRun = runId;
      if (shouldReduce()) drawBlob(context, canvas.clientWidth, canvas.clientHeight, 0, pointer, true);
      else frame = window.requestAnimationFrame((time) => render(time, activeRun));
    };
    const move = (event) => {
      pointer.targetX = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2;
      pointer.targetY = (event.clientY / Math.max(window.innerHeight, 1) - .5) * 2;
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

  return <canvas ref={canvasRef} className="ascii-blob-field" aria-hidden="true" data-testid="ascii-blob-field" />;
};