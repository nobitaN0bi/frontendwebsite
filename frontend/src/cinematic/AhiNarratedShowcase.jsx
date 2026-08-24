import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pause, Play, RotateCcw, Square } from 'lucide-react';
import { DemoWorkspace } from '../components/DemoWorkspace';
import { useAcoordReducedMotion } from '../hooks/useAcoordReducedMotion';
import { useBrowserNarration } from '../hooks/useBrowserNarration';
import { buildFilm } from './filmScript';

const sceneIndexByKind = {
  dispatch: 0,
  ontology: 1,
  builder: 2,
  docs: 3,
  knowledge: 4,
  collaboration: 5,
  code: 6,
  browser: 7,
  decision: 8
};

export const AhiNarratedShowcase = ({ scenarios, activeId, onScenarioSelect }) => {
  const reduced = useAcoordReducedMotion();
  const sectionRef = useRef(null);
  const chapterRefs = useRef([]);
  const manualLockRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const visible = useInView(sectionRef, { amount: 0.05, once: true });
  const scenario = useMemo(() => scenarios.find((item) => item.id === activeId) || scenarios[0], [activeId, scenarios]);
  const chapters = useMemo(() => buildFilm(scenario).map((chapter) => ({
    ...chapter,
    narration: `${chapter.surface}. ${chapter.title} ${chapter.story} ${chapter.caption}`
  })), [scenario]);
  const activeChapter = chapters[activeIndex] || chapters[0];

  const goToChapter = useCallback((index) => {
    manualLockRef.current = Date.now() + 1100;
    setActiveIndex(index);
    chapterRefs.current[index]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  }, [reduced]);

  const narration = useBrowserNarration({ chapters, activeIndex, onAdvance: goToChapter });

  useEffect(() => {
    const observers = chapterRefs.current.map((node, index) => {
      if (!node) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && Date.now() >= manualLockRef.current) setActiveIndex(index);
      }, { rootMargin: '-28% 0px -42% 0px', threshold: 0.2 });
      observer.observe(node);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [chapters.length]);

  const selectIndustry = (id) => {
    narration.stop();
    onScenarioSelect(id);
    manualLockRef.current = Date.now() + 1100;
    setActiveIndex(0);
    window.requestAnimationFrame(() => chapterRefs.current[0]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }));
  };

  const selectChapter = (index) => {
    const continueNarration = narration.status === 'playing' || narration.status === 'paused';
    goToChapter(index);
    if (continueNarration) window.setTimeout(() => narration.speak(index, true), reduced ? 0 : 180);
  };

  return (
    <section ref={sectionRef} className="ahi-story ahi-industry-story" id="ahi-live" data-testid="ahi-live-story">
      <div className="ahi-proof-column" data-testid="ahi-sticky-product">
        <header className="ahi-proof-header">
          <div><span>AHI / {scenario.label.toUpperCase()}</span><strong data-testid="ahi-active-mode">{activeChapter.surface}</strong></div>
          <div className="ahi-narration-controls" data-testid="ahi-narration-controls">
            <button type="button" onClick={narration.play} disabled={!narration.supported} aria-label={narration.status === 'idle' ? 'Start AHI narration' : 'Restart AHI narration'} data-testid="ahi-narration-play-button">{narration.status === 'idle' ? <Play size={14} fill="currentColor" /> : <RotateCcw size={14} />}<b>{narration.status === 'idle' ? 'Narrate' : 'Restart'}</b></button>
            <button type="button" onClick={narration.pause} disabled={narration.status !== 'playing'} aria-label="Pause AHI narration" data-testid="ahi-narration-pause-button"><Pause size={14} fill="currentColor" /></button>
            <button type="button" onClick={narration.stop} disabled={narration.status === 'idle'} aria-label="Stop AHI narration" data-testid="ahi-narration-stop-button"><Square size={12} fill="currentColor" /></button>
            <span aria-live="polite" data-testid="ahi-narration-status">{narration.supported ? narration.status : 'unavailable'}</span>
          </div>
        </header>

        <nav className="ahi-industry-rail" aria-label="Choose industry scenario" data-testid="ahi-industry-controls">
          {scenarios.map((item) => <button type="button" key={item.id} className={scenario.id === item.id ? 'is-active' : ''} onClick={() => selectIndustry(item.id)} data-testid={`ahi-industry-${item.id}-button`}>{item.label}</button>)}
        </nav>

        <nav className="ahi-mode-rail" aria-label="AHI product surfaces" data-testid="ahi-mode-controls">
          {chapters.map((chapter, index) => <button type="button" key={chapter.id} className={activeIndex === index ? 'is-active' : ''} onClick={() => selectChapter(index)} data-testid={`ahi-scene-${chapter.id}-button`}>{String(index + 1).padStart(2, '0')} {chapter.surface}</button>)}
        </nav>

        <div className="ahi-macbook-wrap">
          <motion.div className="ahi-macbook-lid" initial={reduced ? false : { rotateX: -78, opacity: .72 }} animate={{ rotateX: reduced || visible ? 0 : -78, opacity: 1 }} transition={{ duration: reduced ? 0 : 1.05, ease: [0.645, 0.045, 0.355, 1] }} data-testid="ahi-macbook-opening">
            <div className="ahi-macbook-camera" aria-hidden="true" />
            <div className="ahi-live-screen" data-testid="ahi-live-product-screen">
              <DemoWorkspace compact showcase autoPlaySimulation theme="dark" scenarioOverride={scenario} activeSceneIndex={sceneIndexByKind[activeChapter.kind]} />
            </div>
          </motion.div>
          <div className="ahi-macbook-base" aria-hidden="true"><i /></div>
        </div>
        <p className="ahi-proof-note" data-testid="ahi-product-proof-note">MODELED {scenario.label.toUpperCase()} RUN · NINE CONNECTED SURFACES · HUMAN AUTHORITY VISIBLE</p>
      </div>

      <div className="ahi-narrative-column" data-testid="ahi-chapter-narration">
        {chapters.map((chapter, index) => (
          <article ref={(node) => { chapterRefs.current[index] = node; }} className={activeIndex === index ? 'is-active' : ''} key={`${scenario.id}-${chapter.id}`} data-testid={`ahi-chapter-${chapter.id}`}>
            <span>{String(index + 1).padStart(2, '0')} / 09 · {scenario.label.toUpperCase()} · {chapter.surface.toUpperCase()}</span>
            <small>{chapter.act}</small>
            <h2 data-testid={`ahi-chapter-${chapter.id}-title`}>{chapter.title}</h2>
            <p data-testid={`ahi-chapter-${chapter.id}-story`}>{chapter.story}</p>
            <p className="ahi-chapter-caption" data-testid={`ahi-chapter-${chapter.id}-copy`}>{chapter.caption}</p>
            <strong data-testid={`ahi-chapter-${chapter.id}-state`}>{chapter.state}</strong>
            <button type="button" onClick={() => { goToChapter(index); narration.speak(index, false); }} data-testid={`ahi-chapter-${chapter.id}-narrate-button`}><Play size={12} fill="currentColor" /> Narrate chapter</button>
          </article>
        ))}
      </div>
    </section>
  );
};