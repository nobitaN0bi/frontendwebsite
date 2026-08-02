import { ArrowRight, Braces, Cable, CheckCircle2, GitBranch, LockKeyhole, MousePointer2, Network, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AsciiBackdrop } from '../components/AsciiBackdrop';
import { DemoWorkspace } from '../components/DemoWorkspace';
import { useCases } from '../data/useCases';
import { Seo } from '../components/Seo';
import { resources } from '../data/resources';
import { AsciiNarrative } from '../components/AsciiNarrative';

const systemLayers = [
  { icon: MousePointer2, code: '01 / INTENT', title: 'Humans describe outcomes.', text: 'Start with a conversation, not a brittle workflow specification.' },
  { icon: GitBranch, code: '02 / COMPILE', title: 'Acoord builds the graph.', text: 'Visual topologies compile into strict, versioned execution contracts.' },
  { icon: Network, code: '03 / ORCHESTRATE', title: 'Agents coordinate work.', text: 'Lead agents route specialized workers, tools, knowledge, and approvals.' },
  { icon: LockKeyhole, code: '04 / TRUST', title: 'You stay in control.', text: 'Checkpoints, isolated execution, and audit lineage make magic accountable.' }
];

export default function HomePage({ onJoin }) {
  return (
    <>
      <Seo title="Acoord — The Agentic Operating System" description="Acoord coordinates people, AI agents, enterprise tools, and trusted decisions in one collaborative operating system." path="/" schema={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Acoord', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: 'An agent-human coordination operating system for collaborative, auditable AI workflows.', url: process.env.REACT_APP_SITE_URL }} />
      <section className="hero" data-testid="home-hero">
        <AsciiBackdrop art="space" />
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-content">
          <div className="hero-status" data-testid="hero-status"><span /> AH-I / AGENT HUMAN INTERFACE / ALPHA</div>
          <h1 data-testid="hero-title">Artificial intelligence<br />has a <em>coordination</em> problem.</h1>
          <p className="hero-copy" data-testid="hero-description">Acoord is the operating system where people, agents, tools, and trusted decisions move together—without losing the thread.</p>
          <div className="hero-actions" data-testid="hero-actions">
            <Link className="button button-white" to="/demo" data-testid="hero-demo-button">Enter the live canvas <ArrowRight size={17} /></Link>
            <a className="button button-ghost" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="hero-book-demo-link">Book a 30-minute demo</a>
            <button className="hero-text-action" onClick={onJoin} data-testid="hero-access-button">Request private access</button>
          </div>
        </div>
        <div className="hero-coordinates" data-testid="hero-coordinates">51.5072° N / 0.1276° W<br />TRUST GRAPH ONLINE</div>
        <div className="scroll-marker" data-testid="hero-scroll-marker"><span>SCROLL TO COORDINATE</span><i /></div>
      </section>

      <section className="manifesto-band ascii-stage" data-testid="manifesto-band">
        <AsciiNarrative mode="signal" label="INTENT / SIGNAL" />
        <p><span>10× agents.</span> More tools. More context. More motion.</p>
        <strong>Without coordination, intelligence becomes noise.</strong>
      </section>

      <section className="system-section section-pad ascii-stage" id="system" data-testid="system-section">
        <AsciiNarrative mode="compile" label="VISUAL / COMPILE" />
        <div className="section-heading split-heading">
          <div><p className="eyebrow" data-testid="system-eyebrow">The coordination layer</p><h2 data-testid="system-title">One surface for<br />intent and execution.</h2></div>
          <p data-testid="system-description">Acoord connects the warm ambiguity of human work to the deterministic machinery required for reliable agent execution.</p>
        </div>
        <div className="system-grid" data-testid="system-layer-grid">
          {systemLayers.map(({ icon: Icon, code, title, text }, index) => (
            <article className="system-card reveal-card" style={{ '--stagger': `${index * 110}ms` }} key={code} data-testid={`system-layer-${index + 1}`}>
              <div className={`system-motion motion-${index + 1}`}><i /><i /><i /></div><div className="system-icon"><Icon size={21} strokeWidth={1.5} /></div><span className="mono-kicker">{code}</span>
              <h3>{title}</h3><p>{text}</p><i className="card-axis" />
            </article>
          ))}
        </div>
      </section>

      <section className="demo-section ascii-stage" data-testid="home-demo-section">
        <AsciiNarrative mode="collaborate" tone="dark" label="MULTIPLAYER / CONVERGE" />
        <div className="demo-intro section-pad">
          <div><p className="eyebrow" data-testid="demo-eyebrow">The Ahi workspace</p><h2 data-testid="demo-title">Conversation on the left.<br />Architecture on the right.</h2></div>
          <div className="demo-caption" data-testid="demo-description"><Sparkles size={18} /><p>Try a scenario. Watch intent compile into a trustworthy agent graph.</p></div>
        </div>
        <DemoWorkspace />
      </section>

      <section className="trust-section section-pad ascii-stage" data-testid="trust-section">
        <AsciiNarrative mode="trust" label="GUARDRAILS / PROOF" />
        <div className="trust-visual" data-testid="trust-visual">
          <div className="trust-ring ring-a"><span>HUMAN</span></div><div className="trust-ring ring-b"><span>AGENT</span></div>
          <div className="trust-core"><Cable size={26} /><strong>TRUST<br />GRAPH</strong></div>
          <div className="trust-packet packet-a">checkpoint.write</div><div className="trust-packet packet-b">policy.validate</div>
        </div>
        <div className="trust-copy">
          <p className="eyebrow" data-testid="trust-eyebrow">Magic you can trust</p>
          <h2 data-testid="trust-title">Move fast.<br />Keep the proof.</h2>
          <p data-testid="trust-description">Acoord treats trust as architecture—not a disclaimer after the model responds.</p>
          <ul data-testid="trust-feature-list">
            <li><CheckCircle2 /> Every workflow compiles through structural topology guards.</li>
            <li><CheckCircle2 /> Every consequential action can pause for human judgment.</li>
            <li><CheckCircle2 /> Every tool call stays tenant-scoped, observable, and reversible.</li>
            <li><CheckCircle2 /> Every untrusted script runs outside your production surface.</li>
          </ul>
        </div>
      </section>

      <section className="usecase-section section-pad ascii-stage" id="use-cases" data-testid="use-cases-section">
        <AsciiNarrative mode="stories" label="TEN STORIES / ONE LAYER" />
        <div className="section-heading split-heading">
          <div><p className="eyebrow" data-testid="use-cases-eyebrow">Coordination in the wild / 10 stories</p><h2 data-testid="use-cases-title">Different stakes.<br />The same missing layer.</h2></div>
          <p data-testid="use-cases-description">From regulated banks to five-person startups, the hard part is not intelligence. It is making intelligence operate as a system.</p>
        </div>
        <div className="story-grid" data-testid="use-case-card-grid">
          {useCases.map((story, index) => (
            <Link to={`/use-cases/${story.slug}`} className={`story-card ${index < 2 ? 'story-featured' : ''}`} style={{ '--accent': story.accent }} key={story.slug} data-testid={`use-case-${story.slug}-link`}>
              <div className="story-top"><span>{story.number}</span><span>{story.industry}</span></div>
              <div><p className="story-company">{story.company}</p><h3>{story.headline}</h3></div>
              <div className="story-metric"><strong>{story.metrics[0][0]}</strong><span>{story.metrics[0][1]}</span></div>
              <ArrowRight className="story-arrow" size={20} />
            </Link>
          ))}
        </div>
      </section>

      <section className="architecture-strip ascii-stage" data-testid="architecture-strip">
        <AsciiNarrative mode="ledger" tone="dark" label="AST / LEDGER" />
        <div className="architecture-marquee">CRDT_SYNC · AST_COMPILER · LANGGRAPH_RUNTIME · HYBRID_RAG · MCP_ROUTER · SECURE_SANDBOX · HUMAN_CHECKPOINT · </div>
        <div className="architecture-content section-pad">
          <Braces size={34} strokeWidth={1.2} /><h2 data-testid="architecture-title">Strict beneath.<br />Fluid above.</h2>
          <pre data-testid="architecture-code">{`{\n  "intent": "coordinate",\n  "guardrails": true,\n  "human_checkpoint": "required",\n  "result": "accountable_magic"\n}`}</pre>
        </div>
      </section>

      <section className="home-resources section-pad ascii-stage" data-testid="home-resources-section">
        <AsciiNarrative mode="knowledge" label="RETRIEVAL / FUSION" />
        <div className="section-heading split-heading"><div><p className="eyebrow">Field notes / built for citation</p><h2 data-testid="home-resources-title">Architecture without<br />the hand-waving.</h2></div><p>Direct answers to the questions platform teams ask before an agent system earns production trust.</p></div>
        <div className="home-resource-grid">{resources.slice(0, 3).map((resource, index) => <Link to={`/resources/${resource.slug}`} key={resource.slug} data-testid={`home-resource-${resource.slug}-link`}><span>0{index + 1} / {resource.category}</span><h3>{resource.title}</h3><p>{resource.description}</p><div>{resource.readingTime}<ArrowRight size={16} /></div></Link>)}</div>
        <Link className="all-resources-link" to="/resources" data-testid="home-all-resources-link">Explore all field notes <ArrowRight size={17} /></Link>
      </section>

      <section className="final-cta section-pad" data-testid="final-cta-section">
        <AsciiBackdrop variant="footer" art="eye" />
        <div><p className="eyebrow" data-testid="final-cta-eyebrow">The work is already multi-agent</p><h2 data-testid="final-cta-title">Give it somewhere<br />to come together.</h2></div>
        <div className="final-actions"><a className="button button-white" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="final-book-demo-link">Book a working session <ArrowRight size={17} /></a><button className="final-text-button" onClick={onJoin} data-testid="final-access-button">Request private access</button><Link to="/demo" data-testid="final-demo-link">Explore the workspace</Link></div>
      </section>
    </>
  );
}