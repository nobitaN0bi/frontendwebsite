import { useEffect, useState } from 'react';
import { Calculator, Cable, GitBranch, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConnectorDirectory } from './ConnectorDirectory';
import { RoiEstimator } from './RoiEstimator';

const tabs = [
  { id: 'workflows', label: 'Workflows', icon: GitBranch },
  { id: 'connectors', label: '49 connectors', icon: Cable },
  { id: 'roi', label: 'ROI', icon: Calculator }
];

const workflowSteps = [
  ['01', 'Frame', 'A person defines intent, constraints, and the decision boundary.'],
  ['02', 'Ground', 'Specialists retrieve permitted evidence and expose their sources.'],
  ['03', 'Review', 'The accountable owner approves, redirects, or denies the proposed action.'],
  ['04', 'Record', 'Ahi preserves the evidence, authority, execution, and outcome as one line.']
];

const WorkflowProof = () => <div className="proof-workflow" data-testid="proof-workflows-panel">
  <header><span>ONE CONTROLLED DECISION LINE</span><h3 data-testid="proof-workflows-title">From intent to durable record.</h3><p>Every pattern keeps evidence and human authority visible before execution.</p></header>
  <div className="proof-workflow-grid">{workflowSteps.map(([number, title, copy]) => <article key={number} data-testid={`proof-workflow-step-${number}`}><span>{number}</span><ShieldCheck size={17} /><h4>{title}</h4><p>{copy}</p></article>)}</div>
  <nav aria-label="Detailed workflow libraries"><Link to="/use-cases/healthcare" data-testid="proof-healthcare-link">Healthcare workflows</Link><Link to="/use-cases/cfo" data-testid="proof-cfo-link">CFO workflows</Link></nav>
</div>;

export const ProofTabs = () => {
  const [active, setActive] = useState(() => window.location.hash === '#connectors' ? 'connectors' : 'workflows');
  const [roi, setRoi] = useState({ employees: 100, cost: 75, hours: 6, recoverable: 25 });

  useEffect(() => {
    const syncHash = () => { if (window.location.hash === '#connectors') setActive('connectors'); };
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  return <section className="proof-hub" id="connectors" aria-labelledby="proof-hub-title" data-testid="proof-hub-section">
    <header className="proof-hub-head"><div><span>04 / OPERATIONAL PROOF</span><h2 id="proof-hub-title" data-testid="proof-hub-title">Inspect the system.<br />Skip the repetition.</h2></div><p data-testid="proof-hub-summary">One compact evidence surface for workflow control, enterprise connections, and directional value. Detailed implementation libraries remain on their dedicated routes.</p></header>
    <div className="proof-tab-list" role="tablist" aria-label="AHI proof views" data-testid="proof-tab-list">
      {tabs.map(({ id, label, icon: Icon }) => <button type="button" role="tab" aria-selected={active === id} aria-controls={`proof-panel-${id}`} className={active === id ? 'is-active' : ''} onClick={() => setActive(id)} key={id} data-testid={`proof-${id}-tab`}><Icon size={15} />{label}</button>)}
    </div>
    <div className="proof-panel" id={`proof-panel-${active}`} role="tabpanel" key={active} data-testid={`proof-${active}-content`}>
      {active === 'workflows' && <WorkflowProof />}
      {active === 'connectors' && <ConnectorDirectory compact />}
      {active === 'roi' && <RoiEstimator compact values={roi} onChange={(key, value) => setRoi((current) => ({ ...current, [key]: value }))} />}
    </div>
    <nav className="proof-route-index" aria-label="Explore Acoord routes" data-testid="proof-route-index">
      <span>DEEPER ROUTES</span><Link to="/pricing" data-testid="proof-pricing-link">Pricing</Link><Link to="/partners" data-testid="proof-partners-link">Partners</Link><Link to="/roi" data-testid="proof-roi-link">Full ROI model</Link><Link to="/resources" data-testid="proof-resources-link">Architecture notes</Link>
    </nav>
    <p className="proof-disclaimer" data-testid="proof-modeled-disclaimer">MODELED PRODUCT WORKFLOWS AND DIRECTIONAL ESTIMATES — NOT VERIFIED CUSTOMER OUTCOMES</p>
  </section>;
};