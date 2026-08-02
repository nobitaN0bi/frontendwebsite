import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Braces, Cable, Check, GitBranch, LockKeyhole, Network, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AsciiBackdrop } from '../components/AsciiBackdrop';
import { AsciiNarrative } from '../components/AsciiNarrative';
import { DemoWorkspace } from '../components/DemoWorkspace';
import { NewsletterForm } from '../components/NewsletterForm';
import { Seo } from '../components/Seo';
import { ChapterScene } from '../cinematic/ChapterScene';
import { EyeScene } from '../cinematic/EyeScene';
import { FilmHud } from '../cinematic/FilmHud';
import { HandsScene } from '../cinematic/HandsScene';
import { IndustryScene } from '../cinematic/IndustryScene';
import { InfiniteScene } from '../cinematic/InfiniteScene';
import { PortraitScene } from '../cinematic/PortraitScene';
import { buildFilm } from '../cinematic/filmScript';
import { useScenarios } from '../cinematic/useScenarios';
import { agentRoles, capabilities, faqs, operatingSteps, trustLayers } from '../data/marketingContent';
import { resources } from '../data/resources';
import { useCases } from '../data/useCases';

const iconSet = [GitBranch, Search, Users, LockKeyhole, Cable, Braces, Network];
const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'SoftwareApplication', name: 'Acoord Ahi', applicationCategory: 'BusinessApplication', operatingSystem: 'Web and desktop', description: 'An agentic operating system for orchestrating AI agents, enterprise knowledge, tools, human checkpoints, and auditable decisions.', url: process.env.REACT_APP_SITE_URL },
    { '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }
  ]
};

export default function HomePage({ onJoin }) {
  const scenarios = useScenarios();
  const [industryId, setIndustryId] = useState('finance');
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(false);
  const chapterRefs = useRef([]);

  const scenario = useMemo(() => scenarios.find((item) => item.id === industryId) || scenarios[0], [scenarios, industryId]);
  const film = useMemo(() => buildFilm(scenario), [scenario]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setChapter((current) => {
        const next = current + 1;
        if (next >= film.length) {
          setPlaying(false);
          return current;
        }
        chapterRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return next;
      });
    }, 7000);
    return () => window.clearInterval(timer);
  }, [playing, film.length]);

  const selectIndustry = (id) => {
    setIndustryId(id);
    setChapter(0);
    window.requestAnimationFrame(() => chapterRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const toggleFilm = () => {
    setPlaying((current) => {
      if (!current) chapterRefs.current[chapter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !current;
    });
  };

  return (
    <>
      <Seo title="Acoord Ahi — Solving Artificial Coordination" description="Ahi is the agentic operating system where human intent becomes coordinated, inspectable work across AI agents, enterprise knowledge, tools, sandboxes, and human checkpoints." path="/" schema={homeSchema} />

      <div className="film" data-testid="cinematic-film">
        <HandsScene onJoin={onJoin} />
        <InfiniteScene />
        <EyeScene />
        <IndustryScene scenarios={scenarios} activeId={industryId} onSelect={selectIndustry} />
        {film.map((entry, index) => (
          <ChapterScene
            key={`${scenario.id}-${entry.id}`}
            chapter={entry}
            index={index}
            total={film.length}
            scenario={scenario}
            innerRef={(node) => { chapterRefs.current[index] = node; }}
            onEnter={() => setChapter(index)}
          />
        ))}
        <FilmHud industry={scenario.label} chapter={chapter + 1} total={film.length} playing={playing} onToggle={toggleFilm} />
      </div>

      <section className="watch-demo-section scene-demo scene-snap" id="watch-demo" data-testid="watch-demo-section">
        <div className="demo-story-head">
          <div>
            <p className="section-number">14 / THE REAL PRODUCT</p>
            <h2 data-testid="watch-demo-title">Now open the interface<br />you just watched.</h2>
          </div>
          <p data-testid="watch-demo-description">The same nine surfaces, running as the exported Ahi desktop application. Scenario data and runs are explicitly modeled simulations.</p>
        </div>
        <DemoWorkspace compact scenarioId={industryId} onScenarioChange={setIndustryId} />
        <Link className="demo-deep-link" to="/demo" data-testid="watch-demo-page-link">Open the full product walkthrough <ArrowRight size={17} /></Link>
      </section>

      <section className="story-problem editorial-section inverted-section ascii-stage scene-snap" data-testid="problem-solution-section">
        <AsciiNarrative mode="signal" tone="dark" label="PROTOTYPE / PRODUCTION" />
        <p className="section-number" data-testid="problem-section-number">15 / THE COORDINATION GAP</p>
        <div className="editorial-split">
          <h2 data-testid="problem-title">More agents create<br /><em>more motion.</em><br />Not more progress.</h2>
          <div className="problem-copy" data-testid="problem-copy">
            <p>Enterprise AI rarely fails because the model cannot answer. It fails when context fragments, permissions drift, generated code escapes its boundary, and the human decision disappears into another tool.</p>
            <strong>Acoord is the missing coordination plane between fluid intent and reliable execution.</strong>
          </div>
        </div>
      </section>

      <section className="editorial-section operating-section scene-snap" id="system" data-testid="how-it-works-section">
        <div className="section-lead">
          <p className="section-number" data-testid="how-section-number">16 / HOW AHI WORKS</p>
          <h2 data-testid="how-title">Fluid above.<br />Strict beneath.</h2>
          <p data-testid="how-description">A four-stage contract for turning ambiguous work into accountable agent execution.</p>
        </div>
        <div className="operating-grid" data-testid="operating-step-grid">
          {operatingSteps.map((step) => <article key={step.number} data-testid={`operating-step-${step.number}`}><span>{step.number} / {step.label}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
      </section>

      <section className="editorial-section capability-section ascii-stage scene-snap" id="capabilities" data-testid="capabilities-section">
        <AsciiNarrative mode="compile" label="CAPABILITY / SYSTEM" />
        <div className="section-lead wide-lead"><p className="section-number">17 / THE PLATFORM</p><h2 data-testid="capabilities-title">One system.<br />Seven hard problems.</h2><p data-testid="capabilities-description">Build the differentiated product—not the orchestration, retrieval, collaboration, and security substrate beneath it.</p></div>
        <div className="capability-grid" data-testid="capability-grid">
          {capabilities.map((item, index) => { const Icon = iconSet[index]; return <article className={index === 0 || index === 4 ? 'capability-wide' : ''} key={item.code} data-testid={`capability-${index + 1}`}><Icon size={23} strokeWidth={1.25} /><span>{item.code}</span><h3>{item.title}</h3><p>{item.text}</p></article>; })}
        </div>
      </section>

      <section className="editorial-section agent-section inverted-section scene-snap" id="agents" data-testid="agent-ecosystem-section">
        <div className="agent-intro"><p className="section-number">18 / ROLE-BASED INTELLIGENCE</p><h2 data-testid="agents-title">The right specialist.<br />One governing intent.</h2><p data-testid="agents-description">A lead orchestrator assembles specialists around the work while policies, evidence, and approval state remain shared.</p></div>
        <div className="agent-role-list" data-testid="agent-role-list">
          {agentRoles.map((role, index) => <article key={role.code} data-testid={`agent-role-${index + 1}`}><span>0{index + 1}</span><strong>{role.code}</strong><h3>{role.title}</h3><p>{role.text}</p></article>)}
        </div>
      </section>

      <section className="editorial-section story-section scene-snap" id="use-cases" data-testid="use-cases-section">
        <div className="section-lead wide-lead"><p className="section-number">19 / COORDINATION IN THE WILD</p><h2 data-testid="use-cases-title">Different stakes.<br />The same missing layer.</h2><p data-testid="use-cases-description">Explore modeled implementation narratives across regulated, operational, and AI-native teams.</p></div>
        <p className="scenario-disclaimer" data-testid="scenario-disclaimer">Illustrative scenarios for product storytelling. Company names, quotations, and metrics are not presented as verified customer claims.</p>
        <div className="editorial-story-grid" data-testid="use-case-card-grid">
          {useCases.slice(0, 6).map((story) => <Link to={`/use-cases/${story.slug}`} key={story.slug} data-testid={`use-case-${story.slug}-link`}><span>{story.number} / {story.industry}</span><h3>{story.headline}</h3><p>{story.problem}</p><strong>{story.metrics[0][0]} <small>{story.metrics[0][1]}</small></strong><ArrowRight size={18} /></Link>)}
        </div>
      </section>

      <section className="editorial-section trust-architecture inverted-section ascii-stage scene-snap" data-testid="trust-architecture-section">
        <AsciiNarrative mode="trust" tone="dark" label="GUARDRAILS / PROOF" />
        <div className="trust-head"><p className="section-number">20 / MAGIC YOU CAN TRUST</p><h2 data-testid="trust-title">Every action leaves<br />a reconstructable line.</h2><p data-testid="trust-description">Trust is not a disclaimer after the model responds. It is the architecture through which the work must pass.</p></div>
        <div className="trust-layer-list" data-testid="trust-layer-list">{trustLayers.map(([number, title, text]) => <article key={number} data-testid={`trust-layer-${number}`}><span>{number}</span><h3>{title}</h3><p>{text}</p><Check size={18} /></article>)}</div>
        <div className="architecture-ledger" data-testid="architecture-ledger"><pre>{`HUMAN::INTENT\n  ↓\nAST::COMPILE ── POLICY::VALIDATE\n  ↓\nLANGGRAPH::CHECKPOINT\n  ├── MCP::SCOPED_TOOL\n  ├── RAG::HYBRID_CONTEXT\n  └── SANDBOX::ISOLATED_RUN\n  ↓\nAUDIT::PERSISTED`}</pre></div>
      </section>

      <section className="editorial-section knowledge-section scene-snap" data-testid="knowledge-section">
        <div className="section-lead wide-lead"><p className="section-number">21 / BUILT FOR DISCOVERY</p><h2 data-testid="resources-title">Architecture without<br />the hand-waving.</h2><p data-testid="resources-description">Technical field notes answer the production questions platform teams ask before agent systems earn trust.</p></div>
        <div className="knowledge-list" data-testid="home-resource-grid">{resources.slice(0, 3).map((resource, index) => <Link to={`/resources/${resource.slug}`} key={resource.slug} data-testid={`home-resource-${resource.slug}-link`}><span>0{index + 1} / {resource.category}</span><h3>{resource.title}</h3><p>{resource.description}</p><ArrowRight size={17} /></Link>)}</div>
        <div className="faq-list" data-testid="home-faq-list">{faqs.map((item, index) => <details key={item.question} data-testid={`faq-item-${index + 1}`}><summary data-testid={`faq-question-${index + 1}`}>{item.question}<span>+</span></summary><p data-testid={`faq-answer-${index + 1}`}>{item.answer}</p></details>)}</div>
        <Link className="text-rule-link" to="/resources" data-testid="home-all-resources-link">Explore all field notes <ArrowRight size={16} /></Link>
      </section>

      <section className="newsletter-section editorial-section inverted-section scene-snap" data-testid="newsletter-section">
        <div><p className="section-number">22 / FIELD NOTES</p><h2 data-testid="newsletter-title">One useful architecture note.<br />No content machine.</h2><p data-testid="newsletter-description">Join the technical dispatch for original thinking on agent orchestration, hybrid RAG, collaborative systems, and trustworthy execution.</p></div>
        <NewsletterForm />
      </section>

      <section className="book-call-section editorial-section scene-snap" data-testid="book-call-section">
        <p className="section-number">23 / TRY IT ON YOUR SYSTEM</p>
        <h2 data-testid="book-call-title">Bring the workflow<br />that refuses to coordinate.</h2>
        <p data-testid="book-call-description">In thirty minutes, map the people, agents, knowledge, tools, risk, and approval points that shape your highest-friction work.</p>
        <a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="book-call-primary-link">Book a working session <ArrowRight size={17} /></a>
      </section>

      <section className="join-section editorial-section scene-snap" data-testid="join-waitlist-section">
        <AsciiBackdrop variant="footer" art="eye" />
        <div><p className="section-number">24 / PRIVATE ALPHA</p><h2 data-testid="join-title">The work is already multi-agent.<br />Give it somewhere to come together.</h2></div>
        <div className="join-actions"><button className="button button-white" onClick={onJoin} data-testid="join-waitlist-primary-button">Join the waitlist <ArrowRight size={17} /></button><a href="#watch-demo" data-testid="join-watch-demo-link">Watch demo</a><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="join-book-call-link">Book a call</a></div>
      </section>

      <PortraitScene onJoin={onJoin} />
    </>
  );
}
