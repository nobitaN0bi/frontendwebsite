import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Braces, Cable, Download, GitBranch, LockKeyhole, Network, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AsciiBackdrop } from '../components/AsciiBackdrop';
import { AsciiNarrative } from '../components/AsciiNarrative';
import { NewsletterForm } from '../components/NewsletterForm';
import { Seo } from '../components/Seo';
import { AsciiArt } from '../cinematic/AsciiArt';
import { ChapterScene } from '../cinematic/ChapterScene';
import { EyeScene } from '../cinematic/EyeScene';
import { FilmHud } from '../cinematic/FilmHud';
import { HandsScene } from '../cinematic/HandsScene';
import { IndustryScene } from '../cinematic/IndustryScene';
import { InfiniteScene } from '../cinematic/InfiniteScene';
import { PortraitScene } from '../cinematic/PortraitScene';
import { ShareScene } from '../cinematic/ShareScene';
import { MacBookDemoHero } from '../cinematic/MacBookDemoHero';
import { buildFilm } from '../cinematic/filmScript';
import { useScenarios } from '../cinematic/useScenarios';
import { capabilities, faqs, operatingSteps } from '../data/marketingContent';
import { resources } from '../data/resources';
import { useCases } from '../data/useCases';

const iconSet = [GitBranch, Search, Users, LockKeyhole, Cable, Braces, Network];
const connectorTicker = 'SLACK · SALESFORCE · JIRA · GITHUB · SAP · GMAIL · NOTION · HUBSPOT · ZENDESK · SNOWFLAKE · STRIPE · WORKDAY · SERVICENOW · TEAMS · CONFLUENCE · LINEAR · SHOPIFY · NETSUITE · FIGMA · ASANA — 1,000+ CONNECTORS — ';
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
  const shareRef = useRef(null);

  const scenario = useMemo(() => scenarios.find((item) => item.id === industryId) || scenarios[0], [scenarios, industryId]);
  const film = useMemo(() => buildFilm(scenario), [scenario]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setChapter((current) => {
        const next = current + 1;
        if (next >= film.length) {
          setPlaying(false);
          shareRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <ShareScene scenario={scenario} innerRef={shareRef} />
        <FilmHud industry={scenario.label} chapter={chapter + 1} total={film.length} playing={playing} onToggle={toggleFilm} />
      </div>

      <MacBookDemoHero scenarioId={industryId} onScenarioChange={setIndustryId} />

      <section className="story-problem editorial-section inverted-section ascii-stage scene-snap" data-testid="problem-solution-section">
        <AsciiNarrative mode="signal" tone="dark" label="HUMAN / AGENT / ONE TEAM" />
        <p className="section-number" data-testid="problem-section-number">15 / THE INTERFACE</p>
        <div className="editorial-split">
          <h2 data-testid="problem-title">The interface for<br /><em>AI and human</em><br />team collaboration.</h2>
          <div className="problem-copy" data-testid="problem-copy">
            <p>Enterprise AI rarely fails because the model cannot answer. It fails when context fragments, permissions drift, and the human decision disappears into another tool.</p>
            <strong>Acoord is the shared surface where your people and their agents finally work as one team.</strong>
          </div>
        </div>
      </section>

      <section className="editorial-section inverted-section pillar-section scene-snap" id="system" data-testid="how-it-works-section">
        <AsciiBackdrop variant="pillars" art="eye" />
        <div className="pillar-backdrop" aria-hidden="true" data-testid="pillar-eye-backdrop">
          <div className="pillar-eye">
            <div className="pillar-eye-iris">
              <AsciiArt src="/ascii/iris-ascii.txt" className="pillar-eye-art" />
              <span className="pillar-eye-pupil" />
            </div>
          </div>
        </div>
        <div className="section-lead">
          <p className="section-number" data-testid="how-section-number">16 / HOW AHI WORKS</p>
          <h2 data-testid="how-title">Fluid above.<br />Strict beneath.</h2>
          <p data-testid="how-description">Four moves. One operating system between your team and every system it works in.</p>
        </div>
        <div className="pillar-grid" data-testid="operating-step-grid">
          {operatingSteps.map((step, index) => (
            <article key={step.label} style={{ '--i': index }} data-testid={`pillar-${step.label.toLowerCase()}`}>
              <span>{step.number} /</span>
              <strong className="pillar-word">{step.label}</strong>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="pillar-marquee" aria-hidden="true" data-testid="connector-marquee">
          <div><span>{connectorTicker}</span><span>{connectorTicker}</span></div>
        </div>
      </section>

      <section className="editorial-section capability-section ascii-stage scene-snap" id="capabilities" data-testid="capabilities-section">
        <AsciiNarrative mode="compile" label="CAPABILITY / SYSTEM" />
        <div className="section-lead wide-lead"><p className="section-number">17 / THE PLATFORM</p><h2 data-testid="capabilities-title">One system.<br />Seven hard problems.</h2><p data-testid="capabilities-description">Build the differentiated product—not the orchestration, retrieval, collaboration, and security substrate beneath it.</p></div>
        <div className="capability-grid" data-testid="capability-grid">
          {capabilities.map((item, index) => { const Icon = iconSet[index]; return <article className={index === 0 || index === 4 ? 'capability-wide' : ''} key={item.code} data-testid={`capability-${index + 1}`}><Icon size={23} strokeWidth={1.25} /><span>{item.code}</span><h3>{item.title}</h3><p>{item.text}</p></article>; })}
        </div>
      </section>

      <section className="editorial-section story-section scene-snap" id="use-cases" data-testid="use-cases-section">
        <div className="section-lead wide-lead"><p className="section-number">18 / COORDINATION IN THE WILD</p><h2 data-testid="use-cases-title">Different stakes.<br />The same missing layer.</h2><p data-testid="use-cases-description">Explore modeled implementation narratives across regulated, operational, and AI-native teams.</p></div>
        <p className="scenario-disclaimer" data-testid="scenario-disclaimer">Illustrative scenarios for product storytelling. Company names, quotations, and metrics are not presented as verified customer claims.</p>
        <div className="editorial-story-grid" data-testid="use-case-card-grid">
          {useCases.slice(0, 6).map((story) => <Link to={`/use-cases/${story.slug}`} key={story.slug} data-testid={`use-case-${story.slug}-link`}><span>{story.number} / {story.industry}</span><h3>{story.headline}</h3><p>{story.problem}</p><strong>{story.metrics[0][0]} <small>{story.metrics[0][1]}</small></strong><ArrowRight size={18} /></Link>)}
        </div>
      </section>

      <section className="editorial-section knowledge-section scene-snap" data-testid="knowledge-section">
        <div className="section-lead wide-lead"><p className="section-number">19 / BUILT FOR DISCOVERY</p><h2 data-testid="resources-title">Architecture without<br />the hand-waving.</h2><p data-testid="resources-description">Technical field notes answer the production questions platform teams ask before agent systems earn trust.</p></div>
        <div className="knowledge-list" data-testid="home-resource-grid">{resources.slice(0, 3).map((resource, index) => <Link to={`/resources/${resource.slug}`} key={resource.slug} data-testid={`home-resource-${resource.slug}-link`}><span>0{index + 1} / {resource.category}</span><h3>{resource.title}</h3><p>{resource.description}</p><ArrowRight size={17} /></Link>)}</div>
        <div className="faq-list" data-testid="home-faq-list">{faqs.map((item, index) => <details key={item.question} data-testid={`faq-item-${index + 1}`}><summary data-testid={`faq-question-${index + 1}`}>{item.question}<span>+</span></summary><p data-testid={`faq-answer-${index + 1}`}>{item.answer}</p></details>)}</div>
        <Link className="text-rule-link" to="/resources" data-testid="home-all-resources-link">Explore all field notes <ArrowRight size={16} /></Link>
        <div className="blog-dispatch" data-testid="newsletter-section">
          <div>
            <span>ARCHITECTURE &amp; UPDATES</span>
            <h3 data-testid="newsletter-title">One useful architecture note.<br />No content machine.</h3>
            <p data-testid="newsletter-description">The only list we run. Original thinking on agent orchestration, hybrid RAG, collaborative systems, and trustworthy execution — plus product updates when they matter.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="book-call-section editorial-section scene-snap" data-testid="book-call-section">
        <p className="section-number">20 / SEE IT ON YOUR WORK</p>
        <h2 data-testid="book-call-title">Bring the workflow<br />that refuses to coordinate.</h2>
        <p data-testid="book-call-description">In thirty minutes, map the people, agents, knowledge, tools, risk, and approval points that shape your highest-friction work.</p>
        <a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="book-call-primary-link">Book a demo <ArrowRight size={17} /></a>
      </section>

      <section className="join-section editorial-section scene-snap" data-testid="join-waitlist-section">
        <AsciiBackdrop variant="footer" art="eye" />
        <div><p className="section-number">21 / THE DESKTOP APP</p><h2 data-testid="join-title">Saving billions of dollars.<br />Freeing centuries by 2029.</h2></div>
        <div className="join-actions">
          <button className="button button-white" onClick={onJoin} data-testid="join-waitlist-primary-button"><Download size={16} /> Download the desktop app</button>
          <p className="join-note" data-testid="join-waitlist-note">PRIVATE WAITLIST — ACCESS OPENS IN COHORTS</p>
          <a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="join-book-call-link">Book a demo</a>
          <a href="#watch-demo" data-testid="join-watch-demo-link">Watch demo</a>
        </div>
      </section>

      <PortraitScene onJoin={onJoin} />
    </>
  );
}
