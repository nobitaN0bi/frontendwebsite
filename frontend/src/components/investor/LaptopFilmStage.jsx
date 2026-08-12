import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, Minus } from 'lucide-react';
import { DemoWorkspace } from '../DemoWorkspace';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const LaptopFilmStage = ({ film, active, onSceneChange }) => {
  const reduced = useInvestorReducedMotion();
  const [calloutMinimized, setCalloutMinimized] = useState(true);
  const current = film.scenes[active];
  const chooseProductScene = (productIndex) => {
    const next = film.scenes.findIndex((item) => item.productScene === productIndex);
    if (next >= 0) onSceneChange(next);
  };

  return <div className="laptop-film-stage" data-testid={`${film.id}-laptop-stage`}>
    <div className="laptop-capability-rail" data-testid={`${film.id}-capability-rail`}>{film.scenes.map((item, index) => <button key={item.verb} type="button" className={index === active ? 'active' : index < active ? 'passed' : ''} onClick={() => onSceneChange(index)} data-testid={`${film.id}-capability-${item.verb.toLowerCase()}-button`}><span>{String(index + 1).padStart(2, '0')}</span><b>{item.verb}</b></button>)}</div>
    <motion.div className="laptop-film-shell" animate={{ scale: reduced ? 1 : .965 + active * .009, rotateX: reduced ? 0 : Math.max(0, 3 - active * .75), y: reduced ? 0 : active === 0 ? 12 : 0 }} transition={{ duration: reduced ? 0 : .26, ease: [0.645, 0.045, 0.355, 1] }}>
      <div className="laptop-film-lid" data-testid={`${film.id}-macbook-frame`}><div className="laptop-film-camera" /><div className="laptop-film-screen" data-testid={`${film.id}-live-product-screen`}><DemoWorkspace compact showcase scenarioId={film.scenarioId} activeSceneIndex={current.productScene} onActiveSceneChange={chooseProductScene} /></div></div><div className="laptop-film-base"><i /></div>
    </motion.div>
    <AnimatePresence mode="wait"><motion.article key={`${active}-action`} className={`laptop-action-callout callout-${current.position} ${calloutMinimized ? 'minimized' : ''}`} initial={reduced ? false : { opacity: 0, y: 10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduced ? 0 : .2, ease: [0.215, 0.61, 0.355, 1] }} data-testid={`${film.id}-action-callout`}><span>AHI DOES / {String(active + 1).padStart(2, '0')}</span><h3>{current.verb}</h3><p>{current.action}</p><button type="button" onClick={() => setCalloutMinimized((value) => !value)} aria-label={calloutMinimized ? 'Expand capability note' : 'Minimize capability note'} data-testid={`${film.id}-action-callout-toggle`}>{calloutMinimized ? <Maximize2 size={12} /> : <Minus size={12} />}</button><i /></motion.article></AnimatePresence>
    <AnimatePresence mode="wait"><motion.aside key={`${active}-human`} className="laptop-human-callout" initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: reduced ? 0 : .2, delay: reduced ? 0 : .04, ease: [0.215, 0.61, 0.355, 1] }} data-testid={`${film.id}-human-checkpoint`}><span><i /> HUMAN LINE</span><p>{current.human}</p></motion.aside></AnimatePresence>
    <p className="laptop-modeled-label" data-testid={`${film.id}-modeled-label`}>MODELED ENTERPRISE SCENARIO / LIVE PRODUCT SURFACE</p>
  </div>;
};