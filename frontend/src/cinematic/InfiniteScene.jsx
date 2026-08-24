import { useEffect, useRef, useState } from 'react';
import { FilmScene } from './FilmScene';

const stages = [
  { key: 'magic', word: 'Agents should feel like magic.', note: 'AHI makes consequential agent actions visible before they affect the real world.' },
  { key: 'authority', word: 'Authority should not.', note: 'Evidence, ownership, blast radius, and the human decision stay attached.' },
  { key: 'fleet', word: 'One person can direct a fleet.', note: 'Agent work, memory, permissions, and organizational context share one command surface.' },
  { key: 'leverage', word: 'Every member gets leverage.', note: 'The organization learns as one coordinated system without erasing human judgment.' }
];

export const InfiniteScene = () => {
  const sceneRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return undefined;
    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      const index = Math.min(stages.length - 1, Math.floor(progress * stages.length * 1.02));
      setActive((current) => (current === index ? current : index));
    };
    const request = () => { if (!frame) frame = window.requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, []);

  return (
    <FilmScene id="trust" tone="light" className="scene-infinite" slate="SCENES 02—03" meta="TRUST / COORDINATION" testId="film-scene-infinite" innerRef={sceneRef}>
      <div className="infinite-stack" data-testid="infinite-stack">
        {stages.map((stage, index) => (
          <div
            key={stage.key}
            className={`infinite-line ${index === active ? 'is-active' : ''} ${index < active ? 'is-past' : ''}`}
            style={{ '--i': index }}
            data-testid={`infinite-line-${stage.key}`}
          >
            <h2>{stage.word}</h2>
            <p>{stage.note}</p>
          </div>
        ))}
      </div>
      <div className="infinite-rail" aria-hidden="true">
        {stages.map((stage, index) => <i key={stage.key} className={index <= active ? 'is-on' : ''} />)}
      </div>
    </FilmScene>
  );
};
