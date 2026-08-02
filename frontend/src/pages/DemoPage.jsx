import { ArrowRight } from 'lucide-react';
import { DemoWorkspace } from '../components/DemoWorkspace';

export default function DemoPage({ onJoin }) {
  return (
    <div className="page-shell demo-page" data-testid="demo-page">
      <section className="page-hero compact-hero" data-testid="demo-page-hero">
        <p className="eyebrow" data-testid="demo-page-eyebrow">Interactive product preview / Ahi workspace</p>
        <h1 data-testid="demo-page-title">Coordinate the work,<br /><em>not just the model.</em></h1>
        <p data-testid="demo-page-description">Switch scenarios, execute the graph, and watch human intent become an auditable coordination plan.</p>
      </section>
      <section className="full-demo" data-testid="full-demo-section"><DemoWorkspace /></section>
      <section className="demo-page-cta" data-testid="demo-page-cta">
        <div><span className="mono-kicker">READY / PRIVATE ALPHA</span><h2>Bring this system to your workflow.</h2></div>
        <button className="button button-ink" onClick={onJoin} data-testid="demo-page-access-button">Request access <ArrowRight size={16} /></button>
      </section>
    </div>
  );
}