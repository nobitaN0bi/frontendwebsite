import { useEffect, useRef } from 'react';

const clamp = (value) => Math.max(0, Math.min(1, value));
const easeOut = (value) => value === 1 ? 1 : 1 - (2 ** (-10 * value));
const mix = (from, to, amount) => from + (to - from) * amount;

const makeParticles = (source, limit) => {
  const lines = source.split('\n');
  const columns = Math.max(...lines.map((line) => line.length), 1);
  const raw = [];
  lines.forEach((line, row) => {
    [...line].forEach((character, column) => {
      if (character.trim()) raw.push({ column, row });
    });
  });
  const stride = Math.max(1, Math.ceil(raw.length / limit));
  return raw.filter((point) => ((point.column * 17 + point.row * 29) % stride) === 0).map((point, index) => ({
    x: point.column / columns,
    y: point.row / Math.max(lines.length - 1, 1),
    seed: ((point.column * 41 + point.row * 73 + index * 17) % 997) / 997,
    glyph: (point.column + point.row + index) % 3 === 0 ? '0' : '1'
  }));
};

const particleProgress = (cycle, seed) => {
  if (cycle < .48) return easeOut(clamp((cycle - seed * .18) / .28));
  if (cycle < .74) return 1;
  return 1 - easeOut(clamp((cycle - .74 - seed * .1) / .18));
};

const drawFrame = (context, particles, width, height, time, pointer, reduced) => {
  context.clearRect(0, 0, width, height);
  const cycle = reduced ? .62 : (time % 11200) / 11200;
  const artWidth = Math.min(width * 1.08, height * 2.12);
  const artHeight = artWidth / 2.02;
  const originX = width * .47 - artWidth * .42;
  const originY = height * .53 - artHeight * .5;
  const glyphSize = Math.max(4, Math.min(9, width / 220));
  context.font = `500 ${glyphSize}px "JetBrains Mono", monospace`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  particles.forEach((particle) => {
    const progress = reduced ? 1 : particleProgress(cycle, particle.seed);
    if (progress <= .015) return;
    const finalX = originX + particle.x * artWidth + pointer.x * 10 * (particle.x - .5);
    const finalY = originY + particle.y * artHeight + pointer.y * 8 * (particle.y - .5);
    const side = particle.x < .53 ? -1 : 1;
    const startX = side < 0 ? -width * (.08 + particle.seed * .22) : width * (1.08 + particle.seed * .22);
    const startY = height * (.08 + particle.seed * .84);
    const noise = Math.sin(time * .0012 + particle.seed * 37) * (1 - progress) * 22;
    const x = mix(startX, finalX, progress) + noise;
    const y = mix(startY, finalY, progress) + Math.cos(time * .001 + particle.seed * 51) * (1 - progress) * 15;
    const edgeFade = Math.min(1, progress * 3.5) * (cycle > .93 ? (1 - cycle) / .07 : 1);
    context.fillStyle = `rgba(255,255,255,${(.1 + progress * .72) * edgeFade})`;
    context.fillText(particle.glyph, x, y);
  });

  const resolved = reduced || (cycle > .38 && cycle < .9);
  if (resolved) {
    const pulse = reduced ? .45 : .45 + Math.sin(time * .004) * .2;
    const tipX = originX + artWidth * .71 + pointer.x * 5;
    const tipY = originY + artHeight * .49 + pointer.y * 4;
    const glow = context.createRadialGradient(tipX, tipY, 0, tipX, tipY, 64);
    glow.addColorStop(0, `rgba(255,255,255,${pulse})`);
    glow.addColorStop(.12, 'rgba(255,255,255,.18)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = glow;
    context.fillRect(tipX - 64, tipY - 64, 128, 128);
    context.strokeStyle = `rgba(255,255,255,${pulse * .34})`;
    context.beginPath();
    context.arc(tipX, tipY, 17 + pulse * 10, 0, Math.PI * 2);
    context.stroke();
  }
};

export const BinaryHandsCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    let animationFrame = 0;
    let runId = 0;
    let particles = [];
    let visible = true;
    let active = true;
    const shouldReduce = () => document.documentElement.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;
    let reduced = shouldReduce();
    const pointer = { x: 0, y: 0 };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (visible) drawFrame(context, particles, width, height, 0, pointer, reduced);
    };
    const render = (time, activeRun) => {
      if (!active || activeRun !== runId || !visible) {
        animationFrame = 0;
        return;
      }
      if (shouldReduce()) {
        reduced = true;
        canvas.dataset.motionState = 'reduced';
        drawFrame(context, particles, canvas.clientWidth, canvas.clientHeight, 0, pointer, true);
        animationFrame = 0;
        return;
      }
      canvas.dataset.motionState = 'cinematic';
      if (visible) drawFrame(context, particles, canvas.clientWidth, canvas.clientHeight, time, pointer, reduced);
      animationFrame = reduced ? 0 : window.requestAnimationFrame((nextTime) => render(nextTime, activeRun));
    };
    const start = () => {
      runId += 1;
      window.cancelAnimationFrame(animationFrame);
      reduced = shouldReduce();
      if (!visible) {
        animationFrame = 0;
        return;
      }
      const activeRun = runId;
      canvas.dataset.motionState = reduced ? 'reduced' : 'cinematic';
      animationFrame = reduced ? 0 : window.requestAnimationFrame((time) => render(time, activeRun));
      if (reduced) drawFrame(context, particles, canvas.clientWidth, canvas.clientHeight, 0, pointer, true);
    };
    const updateMotion = () => {
      start();
    };
    const move = (event) => {
      pointer.x = (event.clientX / Math.max(window.innerWidth, 1) - .5) * 2;
      pointer.y = (event.clientY / Math.max(window.innerHeight, 1) - .5) * 2;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && particles.length) start();
      else { runId += 1; window.cancelAnimationFrame(animationFrame); }
    }, { threshold: .02 });

    fetch('/ascii/hands-ascii.txt').then((response) => response.text()).then((source) => {
      if (!active) return;
      const limit = window.innerWidth < 700 ? 1150 : 2300;
      particles = makeParticles(source, limit);
      canvas.dataset.ready = 'true';
      resize();
      if (visible) start();
    }).catch(() => { canvas.dataset.ready = 'fallback'; });

    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('acoord:motion', updateMotion);
    return () => {
      active = false;
      observer.disconnect();
      runId += 1;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('acoord:motion', updateMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="binary-hands-canvas" aria-hidden="true" data-testid="binary-hands-canvas" />;
};