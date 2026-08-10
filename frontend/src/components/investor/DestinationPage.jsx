import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Seo } from '../Seo';
import { ArchitectureProof } from './ArchitectureProof';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const DestinationPage = ({ content, audience, department, industry, onJoin }) => {
  const reduced = useInvestorReducedMotion();
  const isCustomer = audience === 'customer';
  const contextLabel = isCustomer ? `${department.label.toUpperCase()} / ${industry.label.toUpperCase()}` : content.label.toUpperCase();
  const pagePath = isCustomer ? `/investor/customer/${content.id}/${department.slug}/${industry.slug}` : `/investor/${content.id}`;
  const contextualIntro = isCustomer ? `${department.label} teams need to ${department.objective}. In ${industry.label}, ${industry.pressure}.` : content.intro;

  return (
    <div className="persona-destination" data-testid={`${audience}-${content.id}-destination-page`}>
      <Seo title={`${content.label} — Acoord Ahi`} description={content.intro} path={pagePath} />
      <section className="destination-hero" data-testid="destination-hero">
        <div className="destination-hero-image" aria-hidden="true" />
        <div className="destination-hero-top">
          <Link to={isCustomer ? '/investor/customer' : '/investor?intent=investor'} data-testid="destination-back-link"><ArrowLeft size={15} /> Change lens</Link>
          <span data-testid="destination-context-label">{contextLabel}</span>
        </div>
        <motion.div className="destination-hero-copy" initial={reduced ? false : { opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .85, ease: [0.16, 1, 0.3, 1] }}>
          <p className="persona-label" data-testid="destination-kicker">{content.kicker} / AHI</p>
          <h1 data-testid="destination-title">{content.title}</h1>
          <p data-testid="destination-intro">{content.intro}</p>
        </motion.div>
        <div className="destination-hero-index" data-testid="destination-proof-key"><span>BUILT / PRODUCT SHELL</span><span>ARCHITECTURE / SUPPLIED DESIGNS</span><span>MODELED / CONTEXT BELOW</span></div>
      </section>

      {isCustomer && <section className="context-brief" data-testid="customer-context-brief"><div><span>DEPARTMENT</span><strong>{department.label}</strong><p>{department.objective}.</p></div><div><span>INDUSTRY</span><strong>{industry.label}</strong><p>{industry.pressure}.</p></div><aside><span>MODELED OPERATING THESIS</span><p>{contextualIntro}</p></aside></section>}

      <section className="destination-thesis" data-testid="destination-thesis-section">
        <div className="destination-thesis-head"><p className="persona-label">THE THESIS / IN FOUR MOVES</p><h2 data-testid="destination-thesis-title">From capability<br />to accountable work.</h2></div>
        <div className="destination-thesis-grid">
          {content.thesis.map(([label, title], index) => <motion.article key={label} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .55, delay: reduced ? 0 : index * .08, ease: [0.16, 1, 0.3, 1] }} data-testid={`destination-thesis-${index + 1}`}><span>{String(index + 1).padStart(2, '0')} / {label}</span><h3>{title}</h3></motion.article>)}
        </div>
      </section>

      <ArchitectureProof contextLabel={contextLabel} />

      <section className="destination-boundary" data-testid="destination-boundary-section">
        <div><p className="persona-label">PROOF BOUNDARY</p><h2 data-testid="destination-boundary-title">Architecture,<br />without theatre.</h2></div>
        <div className="boundary-ledger" data-testid="destination-boundary-ledger">
          <article><span>BUILT</span><strong>Public Ahi product shell</strong><p>Nine connected interface surfaces, guided runs, decision maps, and visible human checkpoints.</p></article>
          <article><span>ARCHITECTURE</span><strong>Five supplied system designs</strong><p>Search, connectors, orchestration, collaborative state, and agent execution are represented from their technical documents.</p></article>
          <article><span>MODELED</span><strong>Persona and operating context</strong><p>Companies, workflows, volumes, outcomes, and contextual scenarios are not presented as verified customer proof.</p></article>
        </div>
      </section>

      <section className="destination-close" data-testid="destination-close-section">
        <p className="persona-label">NEXT / HUMAN CONVERSATION</p><h2 data-testid="destination-close-title">{content.close}</h2>
        <div className="destination-actions"><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="destination-book-demo-link">Book a working session <ArrowUpRight size={16} /></a><button type="button" onClick={onJoin} data-testid="destination-download-button"><Download size={15} /> Join the desktop waitlist</button></div>
      </section>
    </div>
  );
};