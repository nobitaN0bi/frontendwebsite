import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { architectureSystems } from '../../data/personaJourneys';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const ArchitectureProof = ({ contextLabel }) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = useInvestorReducedMotion();
  const system = architectureSystems[active];

  useEffect(() => {
    if (!playing || reduced) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % architectureSystems.length), 2200);
    return () => window.clearInterval(timer);
  }, [playing, reduced]);

  return (
    <section className="architecture-proof" data-testid="architecture-proof-section">
      <div className="architecture-proof-head">
        <div><p className="persona-label">OPERATIONAL PROOF / FIVE SYSTEMS</p><h2 data-testid="architecture-proof-title">The answer is not<br />the work.</h2></div>
        <div><p data-testid="architecture-proof-description">A request becomes useful only when context, state, collaboration, tools, authority, and record stay connected.</p><button type="button" onClick={() => setPlaying((value) => !value)} data-testid="architecture-proof-play-button">{playing ? <Pause size={14} /> : <Play size={14} />}{playing ? 'Pause system' : 'Watch the system form'}</button></div>
      </div>

      <div className="architecture-workbench">
        <div className="architecture-tabs" role="tablist" aria-label="Architecture systems" data-testid="architecture-system-tabs">
          {architectureSystems.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => { setActive(index); setPlaying(false); }} data-testid={`architecture-${item.id}-tab`}><span>{item.index}</span><div><strong>{item.name}</strong><small>{item.action}</small></div></button>)}
        </div>
        <div className="architecture-stage" data-testid="architecture-stage">
          <div className="architecture-window-bar"><span>AHI / OPERATING LINE</span><b>{contextLabel}</b></div>
          <div className="architecture-loop" aria-hidden="true">
            {architectureSystems.map((item, index) => <motion.div key={item.id} className={index === active ? 'active' : index < active ? 'passed' : ''} animate={{ opacity: index <= active ? 1 : .28, y: index === active ? -8 : 0 }} transition={{ duration: reduced ? 0 : .42, ease: [0.16, 1, 0.3, 1] }}><span>{item.index}</span><strong>{item.action}</strong></motion.div>)}
            <i />
          </div>
          <motion.article key={system.id} className="architecture-detail" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .48, ease: [0.16, 1, 0.3, 1] }} data-testid={`architecture-${system.id}-panel`}>
            <div className="proof-state"><span>{system.proof}</span><b>SUPPLIED TECHNICAL DESIGN</b></div>
            <h3>{system.headline}</h3><p>{system.summary}</p>
            <ul>{system.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          </motion.article>
          <div className="architecture-human-line" data-testid="architecture-human-line"><span>HUMAN AUTHORITY</span><p>Policy, approval, intervention, and final judgment remain explicit.</p></div>
        </div>
      </div>
    </section>
  );
};