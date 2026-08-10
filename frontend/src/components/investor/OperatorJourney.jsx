import { useState } from 'react';
import { Code2, Eye } from 'lucide-react';
import { Seo } from '../Seo';
import { operatorProofs } from '../../data/journeyProofs';
import { JourneyActions, JourneyBack, ProofLegend } from './JourneyPrimitives';

export const OperatorJourney = ({ onJoin }) => {
  const [active, setActive] = useState(0);
  const [raw, setRaw] = useState(false);
  const step = operatorProofs[active];
  return <div className="journey-page operator-journey" data-testid="operator-destination-page">
    <Seo title="Operator or Angel Lens — Acoord" description="An assembly manual for the mechanism, human boundary, and product choices behind Acoord." path="/investor/operator" />
    <section className="operator-opening" data-testid="operator-hero"><div><JourneyBack prefix="operator" /><p className="persona-label">OPERATOR OR ANGEL / ASSEMBLY MANUAL</p><h1 data-testid="operator-title">Show me<br />the mechanism.</h1></div><aside><span>PRODUCT BET</span><p data-testid="operator-intro">A request becomes permission-safe context, a checkpointed plan, shared state, bounded execution, and a durable record.</p><ProofLegend prefix="operator" /></aside></section>
    <section className="operator-manual" data-testid="operator-assembly-manual"><header><p className="persona-label">BUILD SEQUENCE / 01—05</p><button type="button" onClick={() => setRaw((value) => !value)} data-testid="operator-raw-toggle-button">{raw ? <Eye size={15} /> : <Code2 size={15} />}{raw ? 'Product view' : 'Runtime view'}</button></header><div className="operator-steps">{operatorProofs.map((item, index) => <button key={item.id} type="button" className={index === active ? 'active' : ''} onClick={() => setActive(index)} data-testid={`operator-step-${item.id}-button`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.name}</strong></button>)}</div><div className="operator-workbench"><div className="operator-block"><span>INPUT</span><p>{step.input}</p></div><div className="operator-arrow">→</div><div className="operator-block active"><span>MECHANISM</span><p>{step.operation}</p></div><div className="operator-arrow">→</div><div className="operator-block"><span>EMITS</span><p>{step.output}</p></div>{raw && <pre data-testid={`operator-step-${step.id}-runtime`}>{step.raw}</pre>}</div></section>
    <section className="operator-decisions" data-testid="operator-product-decisions"><div><p className="persona-label">PRODUCT CHOICES</p><h2>Fluid above.<br />Strict beneath.</h2></div><div><article><span>RETRIEVAL</span><strong>Permissions before generation.</strong><p>ACLs are part of candidate selection, not a cleanup pass.</p></article><article><span>ORCHESTRATION</span><strong>Stateful graphs over brittle chains.</strong><p>Checkpoint, pause, resume, inspect, and replay.</p></article><article><span>COLLABORATION</span><strong>One shared state over parallel chats.</strong><p>CRDT changes converge without losing the current decision.</p></article><article><span>EXECUTION</span><strong>Bounded tools over invisible autonomy.</strong><p>MCP scopes, middleware, and sandboxes keep action inspectable.</p></article></div></section>
    <JourneyActions prefix="operator" onJoin={onJoin} title="Inspect the choices that make agent work operable." />
  </div>;
};