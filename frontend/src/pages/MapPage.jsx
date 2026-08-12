import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Download, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { buildFilm } from '../cinematic/filmScript';
import { useScenarios } from '../cinematic/useScenarios';

const decisionMapIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const dateLabel = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  } catch (error) {
    return '';
  }
};

export default function MapPage({ onJoin }) {
  const { id } = useParams();
  const scenarios = useScenarios();
  const [record, setRecord] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let live = true;
    if (!decisionMapIdPattern.test(id || '')) {
      setRecord(null);
      setState('missing');
      return () => { live = false; };
    }
    setState('loading');
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/decision-maps/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('missing');
        return response.json();
      })
      .then((data) => { if (live) { setRecord(data); setState('ready'); } })
      .catch(() => { if (live) setState('missing'); });
    return () => { live = false; };
  }, [id]);

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === record?.industry) || scenarios[0],
    [scenarios, record]
  );
  const film = useMemo(() => buildFilm(scenario), [scenario]);

  if (state === 'loading') {
    return (
      <div className="map-page map-loading" data-testid="map-loading">
        <p className="map-kicker">ACOORD / DECISION MAP</p>
        <p className="map-loading-text"><i />THREADING THE REEL</p>
      </div>
    );
  }

  if (state === 'missing') {
    return (
      <div className="map-page map-missing-page" data-testid="map-missing">
        <Seo title="Decision map not found | Acoord" description="This Acoord decision map does not exist." path={`/map/${id}`} />
        <p className="map-kicker">ACOORD / DECISION MAP</p>
        <h1 data-testid="map-missing-title">This reel was never cut.</h1>
        <p className="map-missing-copy" data-testid="map-missing-description">The decision map you are looking for does not exist. Watch the film and cut your own.</p>
        <Link className="button button-ink" to="/" data-testid="map-missing-home-link">Watch the film <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="map-page" data-testid="map-page">
      <Seo title={`${scenario.label} decision map | Acoord`} description={`How ${scenario.company} took one ${scenario.label.toLowerCase()} problem from a sentence to a signed, provable decision — a modeled run of the Ahi agentic operating system.`} path={`/map/${id}`} type="article" />

      <header className="map-masthead" data-testid="map-masthead">
        <span className="map-brand"><b>a:</b> ACOORD / DECISION MAP</span>
        <span data-testid="map-industry">{scenario.label.toUpperCase()}</span>
        <span data-testid="map-meta-line">REEL {id?.slice(0, 6).toUpperCase()} · {record ? dateLabel(record.created_at) : ''} · VIEWING {record?.views ?? 1}</span>
      </header>

      <section className="map-opening">
        <p className="map-kicker" data-testid="map-kicker">A FILM ABOUT WORK, RETOLD AS A RECORD</p>
        <h1 data-testid="map-title">One decision at {scenario.company},<br />told end to end.</h1>
        <p className="map-intro" data-testid="map-intro">
          Someone on your team watched this run and wanted you to see it. What follows is the whole story —
          a modeled simulation of the Ahi agentic operating system working a real-shaped {scenario.label.toLowerCase()} problem:
          nine chapters, one human line, and an outcome you can trace back to its evidence.
        </p>
        <blockquote className="map-quote" data-testid="map-quote">
          <span>IT BEGAN AS A SENTENCE</span>
          <p>&ldquo;{scenario.intent}&rdquo;</p>
          <cite>— {scenario.owner}, {scenario.company}</cite>
        </blockquote>
      </section>

      <section className="map-ledger" data-testid="map-ledger">
        {film.map((entry, index) => (
          <article className="map-beat" style={{ '--i': index }} key={entry.id} data-testid={`map-beat-${entry.id}`}>
            <div className="map-beat-rail"><i /><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="map-beat-body">
              <p className="map-beat-act">{entry.act} — {entry.surface.toUpperCase()}</p>
              <h2>{entry.title}</h2>
              <p className="map-beat-story">{entry.story}</p>
              <p className="map-beat-caption">{entry.caption}</p>
              <p className="map-beat-state">{entry.state}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="map-outcome" data-testid="map-outcome">
        <div>
          <span>THE HUMAN LINE</span>
          <p data-testid="map-checkpoint">{scenario.checkpoint}</p>
        </div>
        <div>
          <span>THE RECORD THAT OUTLIVED THE RUN</span>
          <p data-testid="map-outcome-text">{scenario.outcome}</p>
          <strong data-testid="map-metric">{scenario.metric}</strong>
        </div>
      </section>

      <p className="map-disclaimer" data-testid="map-disclaimer">
        Modeled simulation for product storytelling. {scenario.company}, its people, and all metrics are
        illustrative and not presented as verified customer claims.
      </p>

      <section className="map-cta" data-testid="map-cta">
        <h2>Now watch it move.</h2>
        <div className="map-cta-actions">
          <Link className="film-button film-button-solid" to="/" data-testid="map-watch-film-link"><Play size={13} fill="currentColor" /> Watch the film</Link>
          <button className="film-button" type="button" onClick={onJoin} data-testid="map-download-button"><Download size={14} /> Download the desktop app <em className="cta-tag">waitlist</em></button>
          <a className="film-button" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="map-book-demo-link">Book a demo <ArrowRight size={14} /></a>
        </div>
      </section>
    </div>
  );
}
