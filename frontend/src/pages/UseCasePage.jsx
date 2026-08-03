import { ArrowLeft, ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AsciiBackdrop } from '../components/AsciiBackdrop';
import { getUseCase, useCases } from '../data/useCases';
import { Seo } from '../components/Seo';
import { AsciiNarrative } from '../components/AsciiNarrative';

export default function UseCasePage({ onJoin }) {
  const { slug } = useParams();
  const story = getUseCase(slug) || useCases[0];
  const current = useCases.findIndex((item) => item.slug === story.slug);
  const next = useCases[(current + 1) % useCases.length];

  return (
    <article className="case-page" style={{ '--case-accent': story.accent }} data-testid={`use-case-page-${story.slug}`}>
      <AsciiBackdrop variant="case" art="field" fixed />
      <Seo title={`${story.industry} Agentic OS Use Case`} description={`${story.company}: ${story.headline} Explore how Acoord coordinates agents, people, tools, and trusted decisions.`} path={`/use-cases/${story.slug}`} type="article" />
      <section className="case-hero" data-testid="use-case-hero">
        <AsciiBackdrop variant="case" art="field" />
        <Link className="back-link" to="/usecases" data-testid="use-case-back-link"><ArrowLeft size={16} /> All stories</Link>
        <div className="case-hero-copy">
          <div className="case-index" data-testid="use-case-index">ICP / {story.number} — {story.industry}</div>
          <h1 data-testid="use-case-headline">{story.headline}</h1>
          <p data-testid="use-case-company">{story.company} · {story.persona}</p>
        </div>
        <div className="case-hero-metric" data-testid="use-case-primary-metric"><strong>{story.metrics[0][0]}</strong><span>{story.metrics[0][1]}</span></div>
      </section>

      <section className="case-narrative section-pad ascii-stage" data-testid="use-case-narrative">
        <AsciiNarrative mode="signal" label="PROBLEM / TRIGGER" />
        <div className="case-label"><span>01</span> Before Acoord</div>
        <div><h2>Intelligence was present.<br />Coordination was not.</h2><p>{story.problem}</p></div>
        <aside><span className="mono-kicker">TRIGGER EVENT</span><p>{story.trigger}</p></aside>
      </section>

      <section className="case-system section-pad ascii-stage" data-testid="use-case-solution">
        <AsciiNarrative mode="compile" tone="dark" label="SOLUTION / GRAPH" />
        <div className="case-label"><span>02</span> The system</div>
        <div className="case-pillar-grid">
          {story.pillars.map((pillar, index) => <article key={pillar} data-testid={`use-case-pillar-${index + 1}`}><span>0{index + 1}</span><CheckCircle2 size={21} /><h3>{pillar}</h3></article>)}
        </div>
      </section>

      <section className="case-results section-pad ascii-stage" data-testid="use-case-results">
        <AsciiNarrative mode="ledger" label="RESULT / PROOF" />
        <div className="case-label"><span>03</span> Measured change</div>
        <div className="case-metrics">
          {story.metrics.map(([value, label], index) => <div key={label} data-testid={`use-case-metric-${index + 1}`}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
        <blockquote data-testid="use-case-quote"><Quote size={28} /><p>{story.quote}</p><cite>{story.persona} / {story.company}</cite></blockquote>
      </section>

      <section className="case-next" data-testid="use-case-next-section">
        <div><p className="eyebrow">Next coordination story</p><h2>{next.company}</h2><p>{next.headline}</p></div>
        <Link to={`/use-cases/${next.slug}`} data-testid="use-case-next-link">Read story {next.number} <ArrowRight size={18} /></Link>
      </section>

      <section className="case-cta section-pad" data-testid="use-case-cta">
        <div><p className="eyebrow">Your operating reality is specific</p><h2>Let’s map the coordination layer.</h2></div>
        <div className="inline-cta-actions"><a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="use-case-book-link">Book a working session <ArrowRight size={16} /></a><button className="text-button" onClick={onJoin} data-testid="use-case-access-button">Request private access</button></div>
      </section>
    </article>
  );
}