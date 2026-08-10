import { useState } from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../Seo';
import { ventureProofs } from '../../data/journeyProofs';
import { JourneyActions, JourneyBack, ProofLegend } from './JourneyPrimitives';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const VentureJourney = ({ onJoin }) => {
  const [active, setActive] = useState(0);
  const reduced = useInvestorReducedMotion();
  const proof = ventureProofs[active];
  return <div className="journey-page venture-journey" data-testid="venture-destination-page">
    <Seo title="Venture Fund Lens — Acoord" description="The category, timing, wedge, compounding system, and proof boundary behind Acoord." path="/investor/venture" />
    <section className="venture-opening" data-testid="venture-hero"><JourneyBack prefix="venture" /><p className="persona-label">VENTURE FUND / CATEGORY MEMO</p><h1 data-testid="venture-title">The model is<br />not the moat.</h1><p data-testid="venture-intro">Models become abundant. The system that binds context, state, execution, people, and authority becomes scarce.</p><ProofLegend prefix="venture" /></section>
    <section className="venture-category" data-testid="venture-category-shift"><div><span>01 / SUPPLY</span><strong>Intelligence</strong><p>More capable, specialized, and interchangeable.</p></div><div><span>02 / PRESSURE</span><strong>Operations</strong><p>More agents, tools, permissions, handoffs, and state.</p></div><div><span>03 / CATEGORY</span><strong>Coordination</strong><p>The governed interface where the work stays coherent.</p></div></section>
    <section className="venture-compounding" data-testid="venture-compounding-system">
      <div className="venture-compounding-head"><p className="persona-label">THE COMPOUNDING SYSTEM</p><h2>Five architectures.<br />One category argument.</h2><p>The thesis is not five adjacent features. Each system removes a different constraint on governed agent work.</p></div>
      <div className="venture-proof-grid"><nav aria-label="Venture system proofs">{ventureProofs.map((item, index) => <button key={item.id} type="button" className={index === active ? 'active' : ''} onClick={() => setActive(index)} data-testid={`venture-system-${item.id}-button`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong><small>{item.role}</small></button>)}</nav><motion.article key={proof.id} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .4 }} data-testid={`venture-system-${proof.id}-panel`}><span>{proof.role}</span><h3>{proof.claim}</h3><div><small>WHY IT CAN COMPOUND</small><p>{proof.compounding}</p></div></motion.article></div>
    </section>
    <section className="venture-evidence" data-testid="venture-evidence-room"><div><p className="persona-label">INVESTMENT DISCIPLINE</p><h2>What the public page proves—and what it does not.</h2></div><div><article><span>BUILT</span><p>A connected Ahi interface, guided product surfaces, visible checkpoints, and decision maps.</p></article><article><span>ARCHITECTURE</span><p>Five supplied technical systems describing retrieval, connectors, state, collaboration, and execution.</p></article><article><span>NOT ASSERTED</span><p>No TAM, ARR, customer, traction, or fundraising figures are presented here.</p></article></div></section>
    <JourneyActions prefix="venture" onJoin={onJoin} title="Evaluate the category where model capability meets enterprise authority." />
  </div>;
};