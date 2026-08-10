import { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { Seo } from '../Seo';
import { executiveProofs } from '../../data/journeyProofs';
import { JourneyActions, JourneyBack, ProofLegend } from './JourneyPrimitives';

const phases = [['FRAME', 'Choose one consequential decision, its owner, and its stop conditions.'], ['CONNECT', 'Attach only the systems, evidence, and specialists that decision requires.'], ['GOVERN', 'Measure the workflow by authority retained, evidence quality, and reconstructability.']];

export const ExecutiveJourney = ({ department, industry, onJoin }) => {
  const [phase, setPhase] = useState(0);
  const [decision, setDecision] = useState('prepared');
  const context = `${department.label} / ${industry.label}`;
  const advance = () => setDecision((value) => value === 'prepared' ? 'review' : value === 'review' ? 'recorded' : 'prepared');
  return <div className="journey-page executive-journey" data-testid="executive-destination-page">
    <Seo title={`Executive Buyer — ${context} — Acoord`} description="A governed operating view for enterprise buyers." path={`/investor/customer/executive/${department.slug}/${industry.slug}`} />
    <section className="executive-opening" data-testid="executive-hero"><div className="executive-context"><JourneyBack customer prefix="executive" /><span data-testid="executive-context-label">{context.toUpperCase()}</span></div><p className="persona-label">EXECUTIVE BUYER / OPERATING AUTHORITY</p><h1 data-testid="executive-title">One workflow.<br />One owner.<br />One boundary.</h1><div className="executive-brief"><span>MODELED OPERATING BRIEF</span><p data-testid="executive-context-brief">{department.label} teams need to {department.objective}. In {industry.label}, {industry.pressure}.</p></div><ProofLegend prefix="executive" modeled /></section>
    <section className="executive-system" data-testid="executive-system-section"><header><p className="persona-label">THE EXECUTIVE SYSTEM</p><h2>What changes when the work is governed end to end.</h2></header><div className="executive-system-table">{executiveProofs.map((item, index) => <article key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong><p>{item.outcome}</p><small>{item.authority}</small></article>)}</div></section>
    <section className="executive-rollout" data-testid="executive-rollout-section"><div><p className="persona-label">ROLLOUT / THREE DECISIONS</p><h2>Start narrow.<br />Keep authority visible.</h2><nav>{phases.map(([label], index) => <button key={label} type="button" className={phase === index ? 'active' : ''} onClick={() => setPhase(index)} data-testid={`executive-phase-${label.toLowerCase()}-button`}>{String(index + 1).padStart(2, '0')} {label}</button>)}</nav></div><article data-testid="executive-phase-panel"><span>PHASE {String(phase + 1).padStart(2, '0')}</span><h3>{phases[phase][0]}</h3><p>{phases[phase][1]}</p></article></section>
    <section className="executive-approval" data-testid="executive-approval-simulator"><div><p className="persona-label">MODELED AUTHORITY CHECK</p><h2>The system proposes.<br />The owner decides.</h2></div><div className={`approval-state state-${decision}`}><span>CURRENT STATE</span><strong>{decision === 'prepared' ? 'PROPOSAL PREPARED' : decision === 'review' ? 'HUMAN REVIEW REQUIRED' : 'DECISION RECORDED'}</strong><p>{decision === 'prepared' ? 'Evidence and a bounded action are ready.' : decision === 'review' ? 'Execution is paused at the declared human line.' : 'Rationale, evidence, and approval now share one record.'}</p><button type="button" onClick={advance} data-testid="executive-approval-action-button">{decision === 'recorded' ? <RotateCcw size={15} /> : <Check size={15} />}{decision === 'prepared' ? 'Request approval' : decision === 'review' ? 'Approve and record' : 'Reset modeled run'}</button></div></section>
    <JourneyActions prefix="executive" onJoin={onJoin} title="Map the first decision where speed matters and authority cannot disappear." />
  </div>;
};