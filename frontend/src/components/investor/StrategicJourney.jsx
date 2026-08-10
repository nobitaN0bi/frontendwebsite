import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Seo } from '../Seo';
import { strategicProofs } from '../../data/journeyProofs';
import { JourneyActions, JourneyBack, ProofLegend } from './JourneyPrimitives';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const StrategicJourney = ({ onJoin }) => {
  const [active, setActive] = useState(2);
  const [mode, setMode] = useState('estate');
  const reduced = useInvestorReducedMotion();
  const proof = strategicProofs[active];
  return <div className="journey-page strategic-journey" data-testid="strategic-destination-page">
    <Seo title="Strategic Corporate Lens — Acoord" description="A platform blueprint for connecting enterprise context, governance, collaboration, and agent execution." path="/investor/strategic" />
    <section className="strategic-opening" data-testid="strategic-hero"><div className="strategic-opening-nav"><JourneyBack prefix="strategic" /><span>BLUEPRINT / REV 01</span></div><p className="persona-label">STRATEGIC CORPORATE / PLATFORM ADJACENCY</p><h1 data-testid="strategic-title">Connect to the estate.<br /><em>Do not become another silo.</em></h1><p data-testid="strategic-intro">Acoord is valuable where systems of record, identity, models, tools, and teams need a governed path into action.</p><ProofLegend prefix="strategic" /></section>
    <section className="strategic-blueprint" data-testid="strategic-blueprint-section">
      <header><div><p className="persona-label">INTEROPERABILITY BLUEPRINT</p><h2>Where the platform touches.</h2></div><div className="strategic-mode-switch" role="tablist"><button type="button" role="tab" aria-selected={mode === 'estate'} onClick={() => setMode('estate')} data-testid="strategic-mode-estate-button">Existing estate</button><button type="button" role="tab" aria-selected={mode === 'control'} onClick={() => setMode('control')} data-testid="strategic-mode-control-button">Control boundary</button></div></header>
      <div className="strategic-map"><div className="strategic-core"><span>AHI</span><strong>COORDINATION LAYER</strong></div>{strategicProofs.map((item, index) => <button key={item.id} type="button" className={`strategic-node node-${index} ${active === index ? 'active' : ''}`} onClick={() => setActive(index)} data-testid={`strategic-system-${item.id}-button`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong><small>{mode === 'estate' ? item.estate : item.boundary}</small></button>)}<i className="axis-x" /><i className="axis-y" /></div>
      <AnimatePresence mode="wait"><motion.article key={`${proof.id}-${mode}`} className="strategic-inspector" initial={reduced ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: reduced ? 0 : .32 }} data-testid={`strategic-system-${proof.id}-panel`}><span>{mode === 'estate' ? 'PLATFORM ADJACENCY' : 'GOVERNED BOUNDARY'}</span><h3>{mode === 'estate' ? proof.estate : proof.boundary}</h3><p>{proof.interface}</p></motion.article></AnimatePresence>
    </section>
    <section className="strategic-ledger" data-testid="strategic-partnership-ledger"><p className="persona-label">PARTNERSHIP SURFACE</p>{strategicProofs.map((item) => <article key={item.id}><span>{item.name}</span><strong>{item.interface}</strong><p>{item.boundary}</p></article>)}</section>
    <JourneyActions prefix="strategic" onJoin={onJoin} title="Map where your platform can enter governed agent work." />
  </div>;
};