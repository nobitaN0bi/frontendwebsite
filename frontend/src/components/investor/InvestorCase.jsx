import { ArrowUpRight, Download } from 'lucide-react';
import { businessModel, moatLayers, roadmap } from '../../data/investorContent';
import { InvestorReveal } from './InvestorReveal';

export const InvestorCase = ({ onJoin }) => (
  <>
    <section className="investor-section investor-business" data-testid="investor-business-model-section">
      <InvestorReveal className="investor-section-head" testId="investor-business-heading">
        <p className="investor-kicker">05 / COMMERCIAL THESIS</p>
        <h2>Land on friction.<br />Expand on context.</h2>
        <p>This is the current commercial design—not reported revenue or a forecast. Acoord begins where coordination failure already has an owner, a consequence, and a human approval line.</p>
      </InvestorReveal>
      <div className="investor-business-steps" data-testid="investor-business-steps">
        {businessModel.map(([label, text], index) => (
          <InvestorReveal as="article" key={label} delay={index * 0.08} testId={`investor-business-step-${index + 1}`}>
            <span>0{index + 1}</span><h3>{label}</h3><p>{text}</p>
          </InvestorReveal>
        ))}
      </div>
      <InvestorReveal className="investor-wedge" testId="investor-market-wedge">
        <span>INITIAL WEDGE</span>
        <strong>Approval-heavy work where context crosses teams, systems, and policy.</strong>
        <p>Examples include financial crime operations, legal review, manufacturing quality, service exceptions, logistics disruption, and strategic account work.</p>
      </InvestorReveal>
    </section>

    <section className="investor-section investor-moat" data-testid="investor-moat-section">
      <InvestorReveal className="investor-section-head" testId="investor-moat-heading">
        <p className="investor-kicker">06 / THE COMPOUNDING LAYER</p>
        <h2>The moat is not the model.</h2>
        <p>Models can be swapped. The hard asset is the governed coordination state that accumulates around how an organisation thinks, acts, approves, and remembers.</p>
      </InvestorReveal>
      <div className="investor-moat-list" data-testid="investor-moat-layer-list">
        {moatLayers.map(([code, title, text], index) => (
          <InvestorReveal as="article" key={code} delay={index * 0.06} testId={`investor-moat-layer-${code}`}>
            <span>{code}</span><h3>{title}</h3><p>{text}</p><b>COMPOUNDS</b>
          </InvestorReveal>
        ))}
      </div>
    </section>

    <section className="investor-section investor-evidence" data-testid="investor-evidence-roadmap-section">
      <InvestorReveal className="investor-section-head" testId="investor-evidence-heading">
        <p className="investor-kicker">07 / EVIDENCE, NOT THEATRE</p>
        <h2>What exists.<br />What comes next.</h2>
        <p>We separate working product, modeled demonstrations, and forward-looking milestones so the investment discussion starts from the same evidence boundary as the product.</p>
      </InvestorReveal>
      <div className="investor-proof-split" data-testid="investor-proof-boundary">
        <InvestorReveal as="article" testId="investor-proof-working-product">
          <span>WORKING PRODUCT</span><h3>Inspectable today</h3><p>Nine connected desktop surfaces, scenario switching, guided runs, isolated demo execution, decision-map sharing, stored waitlist flows, and explainable human checkpoints.</p>
        </InvestorReveal>
        <InvestorReveal as="article" delay={0.08} testId="investor-proof-modeled-scenarios">
          <span>MODELED / NOT CUSTOMER PROOF</span><h3>Storytelling layer</h3><p>The enterprise companies, run volumes, quotations, outcomes, and operational metrics in the product film are illustrative simulations until approved customer evidence replaces them.</p>
        </InvestorReveal>
      </div>
      <div className="investor-roadmap" data-testid="investor-roadmap">
        {roadmap.map(([phase, title, text], index) => (
          <InvestorReveal as="article" key={phase} delay={index * 0.08} testId={`investor-roadmap-${phase.toLowerCase()}`}>
            <span>{phase}</span><h3>{title}</h3><p>{text}</p>
          </InvestorReveal>
        ))}
      </div>
    </section>

    <section className="investor-closing" data-testid="investor-closing-section">
      <InvestorReveal className="investor-closing-copy" testId="investor-closing-copy">
        <p className="investor-kicker">08 / THE INVITATION</p>
        <h2>Intelligence is arriving.<br />Give it somewhere to coordinate.</h2>
        <p>For investors exploring the operating layer between models and consequential enterprise work, we would value the conversation.</p>
        <div className="investor-closing-actions">
          <a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" className="investor-button investor-button-light" data-testid="investor-closing-meeting-link">Start a conversation <ArrowUpRight size={16} /></a>
          <button type="button" className="investor-text-link" onClick={onJoin} data-testid="investor-closing-download-button"><Download size={15} /> Join the desktop waitlist</button>
        </div>
      </InvestorReveal>
    </section>
  </>
);