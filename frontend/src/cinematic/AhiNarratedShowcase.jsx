import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pause, Play, RotateCcw, Square } from 'lucide-react';
import { DemoWorkspace } from '../components/DemoWorkspace';
import { ahiProductScenario, ahiStoryChapters } from '../data/ahiStory';
import { useAcoordReducedMotion } from '../hooks/useAcoordReducedMotion';
import { useBrowserNarration } from '../hooks/useBrowserNarration';
import { AhiModePanel } from './AhiModePanel';

export const AhiNarratedShowcase = () => {
  const reduced = useAcoordReducedMotion();
  const sectionRef = useRef(null);
  const chapterRefs = useRef([]);
  const manualLockRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const visible = useInView(sectionRef, { amount: 0.08, once: true });
  const activeChapter = ahiStoryChapters[activeIndex];

  const goToChapter = useCallback((index) => {
    manualLockRef.current = Date.now() + 1200;
    setActiveIndex(index);
    chapterRefs.current[index]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  }, [reduced]);

  const narration = useBrowserNarration({ chapters: ahiStoryChapters, activeIndex, onAdvance: goToChapter });

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
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let frame = 0;
    const sync = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      document.body.classList.toggle('ahi-story-active', rect.top < window.innerHeight && rect.bottom > 0);
    };
    const request = () => { if (!frame) frame = window.requestAnimationFrame(sync); };
    sync();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      document.body.classList.remove('ahi-story-active');
    };
  }, []);

  const selectMode = (index) => {
    const continueNarration = narration.status === 'playing' || narration.status === 'paused';
    goToChapter(index);
    if (continueNarration) window.setTimeout(() => narration.speak(index, true), reduced ? 0 : 180);
  };

  return (
    <section ref={sectionRef} className="ahi-story" id="ahi-live" data-testid="ahi-live-story">
      <div className="ahi-proof-column" data-testid="ahi-sticky-product">
        <header className="ahi-proof-header">
          <div><span>AHI / LIVE PRODUCT</span><strong data-testid="ahi-active-mode">{activeChapter.label}</strong></div>
          <div className="ahi-narration-controls" data-testid="ahi-narration-controls">
            <button type="button" onClick={narration.play} disabled={!narration.supported} aria-label={narration.status === 'idle' ? 'Start AHI narration' : 'Restart AHI narration'} data-testid="ahi-narration-play-button">{narration.status === 'idle' ? <Play size={14} fill="currentColor" /> : <RotateCcw size={14} />}<b>{narration.status === 'idle' ? 'Narrate' : 'Restart'}</b></button>
            <button type="button" onClick={narration.pause} disabled={narration.status !== 'playing'} aria-label="Pause AHI narration" data-testid="ahi-narration-pause-button"><Pause size={14} fill="currentColor" /></button>
            <button type="button" onClick={narration.stop} disabled={narration.status === 'idle'} aria-label="Stop AHI narration" data-testid="ahi-narration-stop-button"><Square size={12} fill="currentColor" /></button>
            <span aria-live="polite" data-testid="ahi-narration-status">{narration.supported ? narration.status : 'unavailable'}</span>
          </div>
        </header>

        <nav className="ahi-mode-rail" aria-label="AHI product modes" data-testid="ahi-mode-controls">
          {ahiStoryChapters.map((chapter, index) => <button type="button" key={chapter.id} className={activeIndex === index ? 'is-active' : ''} onClick={() => selectMode(index)} data-testid={`ahi-mode-${chapter.id}-button`}>{chapter.label}</button>)}
        </nav>

        <div className="ahi-macbook-wrap">
          <motion.div className="ahi-macbook-lid" initial={reduced ? false : { rotateX: -78, opacity: .72 }} animate={{ rotateX: reduced || visible ? 0 : -78, opacity: 1 }} transition={{ duration: reduced ? 0 : 1.05, ease: [0.645, 0.045, 0.355, 1] }} data-testid="ahi-macbook-opening">
            <div className="ahi-macbook-camera" aria-hidden="true" />
            <div className="ahi-live-screen" data-testid="ahi-live-product-screen">
              <DemoWorkspace compact showcase autoPlaySimulation scenarioOverride={ahiProductScenario} activeSceneIndex={activeChapter.scene} />
              <AhiModePanel chapter={activeChapter} />
            </div>
          </motion.div>
          <div className="ahi-macbook-base" aria-hidden="true"><i /></div>
        </div>
        <p className="ahi-proof-note" data-testid="ahi-product-proof-note">INTERACTIVE PRODUCT SIMULATION · NO CUSTOMER DATA · HUMAN AUTHORITY VISIBLE</p>
      </div>

      <div className="ahi-narrative-column" data-testid="ahi-chapter-narration">
        {ahiStoryChapters.map((chapter, index) => (
          <article ref={(node) => { chapterRefs.current[index] = node; }} className={activeIndex === index ? 'is-active' : ''} key={chapter.id} data-testid={`ahi-chapter-${chapter.id}`}>
            <span>{String(index + 1).padStart(2, '0')} / 06 · {chapter.label.toUpperCase()}</span>
            <h2 data-testid={`ahi-chapter-${chapter.id}-title`}>{chapter.headline}</h2>
            <p data-testid={`ahi-chapter-${chapter.id}-copy`}>{chapter.copy}</p>
            <button type="button" onClick={() => { goToChapter(index); narration.speak(index, false); }} data-testid={`ahi-chapter-${chapter.id}-narrate-button`}><Play size={12} fill="currentColor" /> Narrate chapter</button>
          </article>
        ))}
      </div>
    </section>
  );
};