import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AsciiBackdrop } from '../components/AsciiBackdrop';
import { Seo } from '../components/Seo';
import { useCases } from '../data/useCases';

const headlineStats = [
  ['100%', 'regulatory filings on time', 'Meridian Global Bank'],
  ['80%', 'faster incident diagnosis', 'PipelineOps'],
  ['75%', 'fewer adverse drug events', 'VitalSync Health'],
  ['97%', 'faster content propagation', 'Lumina Goods']
];

const recurring = [
  ['01', 'Checkpointed judgment', 'Every decisive moment pauses for a human who can approve, modify, or overrule — then resumes with the decision written into the record.'],
  ['02', 'Retrieval with citations', 'Hybrid search across millions of documents returns answers with their sources attached, so nothing is asserted without provenance.'],
  ['03', 'Immutable audit trails', 'Every inference, annotation, and sign-off is timestamped and replayable — satisfying auditors, regulators, and attorneys.'],
  ['04', 'Real-time collaboration', 'People on three continents review the same artifact simultaneously, with changes merged deterministically instead of last-write-wins.']
];

export default function UseCasesPage({ onJoin }) {
  const [featured, ...rest] = useCases;

  return (
    <article className="stories-page" data-testid="use-cases-page">
      <AsciiBackdrop variant="case" art="field" fixed />
      <Seo
        title="Use Cases — Agentic Operating System"
        description="Ten operating realities across regulated, operational, and AI-native teams — and the same missing coordination layer. Modeled implementation narratives for the Acoord agentic OS."
        path="/usecases"
        type="article"
      />

      <section className="stories-hero" data-testid="stories-hero">
        <AsciiBackdrop variant="case" art="field" />
        <div className="stories-hero-copy">
          <p className="eyebrow" data-testid="stories-eyebrow">Coordination in the wild / The field manual</p>
          <h1 data-testid="stories-title">Different stakes.<br />The same missing layer.</h1>
          <p data-testid="stories-description">Ten modeled implementation narratives — a global bank, a telehealth platform, a legal-tech startup, a DevOps platform, and more. Different industries, different stakes, one repeated discovery: the hard part was never intelligence. It was making intelligence operate as a system people could trust.</p>
        </div>
        <div className="stories-hero-meta" data-testid="stories-meta">
          <span>10 stories</span><i />
          <span>8 industries</span><i />
          <span>1 missing layer</span>
        </div>
      </section>

      <section className="stories-stats section-pad ascii-stage" data-testid="stories-stats">
        {headlineStats.map(([value, label, source], index) => (
          <div key={label} data-testid={`stories-stat-${index + 1}`}><strong>{value}</strong><span>{label}</span><cite>{source}</cite></div>
        ))}
      </section>

      <section className="stories-intro section-pad" data-testid="stories-intro">
        <p className="section-number" data-testid="stories-intro-number">HOW TO READ THIS FILE</p>
        <h2 data-testid="stories-intro-title">Every story follows the same shape.</h2>
        <div className="stories-intro-copy">
          <p data-testid="stories-intro-copy">A promising AI initiative stalls. A trigger event makes the cost of fragmentation impossible to ignore. Acoord gives the work a spine — retrieval with citations, checkpoints for judgment, an audit trail that survives discovery, and collaboration that works across continents. What differs is only the industry.</p>
          <p className="stories-disclaimer" data-testid="stories-disclaimer">Illustrative scenarios for product storytelling. Company names, quotations, and metrics are not presented as verified customer claims.</p>
        </div>
      </section>

      <section className="stories-list section-pad ascii-stage" data-testid="stories-list">
        <div className="stories-list-head">
          <p className="section-number" data-testid="stories-list-number">THE STORIES</p>
          <span data-testid="stories-list-count">01 — 10</span>
        </div>

        <Link className="story-card story-card-featured" to={`/use-cases/${featured.slug}`} style={{ '--accent': featured.accent }} data-testid={`story-featured-${featured.slug}`}>
          <div className="story-card-top"><span>{featured.number} / {featured.industry}</span><ArrowUpRight size={18} /></div>
          <div className="story-card-featured-body">
            <div className="story-card-featured-main">
              <h3>{featured.company}</h3>
              <h4>{featured.headline}</h4>
              <p>{featured.problem}</p>
            </div>
            <div className="story-card-featured-side">
              <div className="story-card-trigger"><span>TRIGGER</span><p>{featured.trigger}</p></div>
              <div className="story-card-foot"><strong>{featured.metrics[0][0]}</strong><span>{featured.metrics[0][1]}</span><em>Read the story <ArrowRight size={14} /></em></div>
            </div>
          </div>
        </Link>

        <div className="stories-grid" data-testid="stories-grid">
          {rest.map((story) => (
            <Link className="story-card" to={`/use-cases/${story.slug}`} style={{ '--accent': story.accent }} key={story.slug} data-testid={`story-${story.slug}`}>
              <div className="story-card-top"><span>{story.number} / {story.industry}</span><ArrowUpRight size={17} /></div>
              <h3>{story.company}</h3>
              <h4>{story.headline}</h4>
              <p>{story.problem}</p>
              <div className="story-card-trigger"><span>TRIGGER</span><p>{story.trigger}</p></div>
              <div className="story-card-foot"><strong>{story.metrics[0][0]}</strong><span>{story.metrics[0][1]}</span><em>Read the story <ArrowRight size={14} /></em></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="stories-theme section-pad" data-testid="stories-theme">
        <div className="stories-theme-lead">
          <p className="section-number" data-testid="stories-theme-number">THE RECURRING ARCHITECTURE</p>
          <h2 data-testid="stories-theme-title">Four capabilities kept<br />showing up in every story.</h2>
        </div>
        <div className="stories-theme-grid" data-testid="stories-theme-grid">
          {recurring.map(([number, title, copy]) => (
            <article key={number} data-testid={`stories-theme-${number}`}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="stories-cta section-pad" data-testid="stories-cta">
        <div><p className="eyebrow">Your operating reality is specific</p><h2>Let’s map the coordination layer.</h2></div>
        <div className="inline-cta-actions">
          <a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="stories-book-link">Book a working session <ArrowRight size={16} /></a>
          <button className="text-button" onClick={onJoin} data-testid="stories-access-button">Request private access</button>
        </div>
      </section>
    </article>
  );
}
