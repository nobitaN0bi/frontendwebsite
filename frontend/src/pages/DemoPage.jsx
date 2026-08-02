import { ArrowRight } from 'lucide-react';
import { DemoWorkspace } from '../components/DemoWorkspace';
import { Seo } from '../components/Seo';
import { AsciiNarrative } from '../components/AsciiNarrative';

export default function DemoPage({ onJoin }) {
  return (
    <div className="page-shell demo-page" data-testid="demo-page">
      <Seo title="Enterprise Ahi Agentic Operating System Simulations" description="Choose Finance, Legal, Manufacturing, Customer Support, Logistics, E-commerce, SaaS, or Fashion and follow one modeled enterprise decision across all nine Ahi product surfaces." path="/demo" />
      <section className="page-hero compact-hero ascii-stage" data-testid="demo-page-hero">
        <AsciiNarrative mode="compile" label="INTENT / EXECUTION" />
        <p className="eyebrow" data-testid="demo-page-eyebrow">Eight enterprise channels / nine connected surfaces</p>
        <h1 data-testid="demo-page-title">Choose the enterprise.<br /><em>Follow the work.</em></h1>
        <p data-testid="demo-page-description">Enter the exported Ahi desktop interface through Finance, Legal, Manufacturing, Customer Support, Logistics, E-commerce, SaaS, or Fashion. Every working run is a clearly labeled modeled simulation.</p>
      </section>
      <section className="full-demo" data-testid="full-demo-section"><DemoWorkspace /></section>
      <section className="demo-page-cta" data-testid="demo-page-cta">
        <div><span className="mono-kicker">READY / PRIVATE ALPHA</span><h2 data-testid="demo-page-cta-title">Bring this operating context to your workflow.</h2></div>
        <div className="inline-cta-actions"><a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="demo-page-book-link">Book a working session <ArrowRight size={16} /></a><button className="text-button" onClick={onJoin} data-testid="demo-page-access-button">Join the waitlist</button></div>
      </section>
    </div>
  );
}