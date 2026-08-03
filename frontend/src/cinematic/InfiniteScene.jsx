import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FilmScene } from './FilmScene';

const stages = [
  { key: 'trust', word: 'magic that you can trust.', note: 'Not a demo trick. An architecture.' },
  { key: 'time', word: 'infinite time', note: 'Work continues while your team sleeps, and resumes exactly where it paused.' },
  { key: 'intelligence', word: 'infinite intelligence', note: 'Every specialist you need, assembled around one governing intent.' },
  { key: 'quality', word: 'infinite quality', note: 'Compiled, cited, checkpointed, and reconstructable — every single run.' }
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
    <FilmScene id="trust" tone="light" className="scene-infinite" slate="SCENE 02" meta="THE PROMISE" testId="film-scene-infinite" innerRef={sceneRef}>
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
      <a
        className={`infinite-product-link ${active >= 2 ? 'is-visible' : ''}`}
        href="#ahi"
        data-testid="infinite-product-link"
      >
        Open the product <ArrowRight size={15} />
      </a>
    </FilmScene>
  );
};
