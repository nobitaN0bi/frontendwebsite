import { ArrowRight } from 'lucide-react';
import { DemoWorkspace } from '../components/DemoWorkspace';
import { Seo } from '../components/Seo';
import { AsciiNarrative } from '../components/AsciiNarrative';

export default function DemoPage({ onJoin }) {
  return (
    <div className="page-shell demo-page" data-testid="demo-page">
      <Seo title="Interactive Agent Canvas Demo" description="Explore the Acoord Ahi workspace: coordinate human intent, AI agents, tools, retrieval, guardrails, and approvals." path="/demo" />
      <section className="page-hero compact-hero ascii-stage" data-testid="demo-page-hero">
        <AsciiNarrative mode="compile" label="INTENT / EXECUTION" />
        <p className="eyebrow" data-testid="demo-page-eyebrow">Interactive product preview / Ahi workspace</p>
        <h1 data-testid="demo-page-title">Coordinate the work,<br /><em>not just the model.</em></h1>
        <p data-testid="demo-page-description">Switch scenarios, execute the graph, and watch human intent become an auditable coordination plan.</p>
      </section>
      <section className="full-demo" data-testid="full-demo-section"><DemoWorkspace /></section>
      <section className="demo-page-cta" data-testid="demo-page-cta">
        <div><span className="mono-kicker">READY / PRIVATE ALPHA</span><h2>Bring this system to your workflow.</h2></div>
        <div className="inline-cta-actions"><a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="demo-page-book-link">Book a live demo <ArrowRight size={16} /></a><button className="text-button" onClick={onJoin} data-testid="demo-page-access-button">Request private access</button></div>
      </section>
    </div>
  );
}