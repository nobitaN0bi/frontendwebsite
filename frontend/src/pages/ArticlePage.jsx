import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { getResource, resources } from '../data/resources';
import { AsciiBackdrop } from '../components/AsciiBackdrop';

export default function ArticlePage() {
  const { slug } = useParams();
  const resource = getResource(slug) || resources[0];
  const current = resources.findIndex((item) => item.slug === resource.slug);
  const next = resources[(current + 1) % resources.length];
  const schema = { '@context': 'https://schema.org', '@type': 'TechArticle', headline: resource.title, description: resource.description, datePublished: '2026-04-08', dateModified: '2026-04-08', author: { '@type': 'Organization', name: 'Acoord.co' }, publisher: { '@type': 'Organization', name: 'Acoord.co' }, mainEntityOfPage: `${process.env.REACT_APP_SITE_URL}/resources/${resource.slug}`, keywords: resource.keyword };

  return (
    <article className="article-page page-shell" data-testid={`article-page-${resource.slug}`}>
      <Seo title={resource.title} description={resource.description} path={`/resources/${resource.slug}`} type="article" schema={schema} />
      <header className="article-hero" data-testid="article-hero">
        <AsciiBackdrop variant="article" art="network" />
        <Link to="/resources" className="article-back" data-testid="article-back-link"><ArrowLeft size={16} /> All field notes</Link>
        <div className="article-kicker" data-testid="article-category">{resource.category} / {resource.type}</div>
        <h1 data-testid="article-title">{resource.title}</h1><p data-testid="article-description">{resource.description}</p>
        <div className="article-meta" data-testid="article-meta"><span>{resource.published}</span><span><Clock3 size={14} /> {resource.readingTime}</span><span>For {resource.audience}</span></div>
      </header>
      <div className="article-layout">
        <aside className="article-sidebar" data-testid="article-sidebar"><span>Target question</span><p>{resource.keyword}</p><span>In this guide</span>{resource.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}>{section.title}</a>)}</aside>
        <div className="article-body" data-testid="article-body">
          <section className="article-takeaways" data-testid="article-takeaways"><span>Three things to remember</span>{resource.takeaways.map((takeaway) => <p key={takeaway}>{takeaway}</p>)}</section>
          {resource.sections.map((section, index) => <section id={`section-${index + 1}`} data-ascii-index={`0${index + 1} ░▒▓ KNOWLEDGE::GROUND`} key={section.title} data-testid={`article-section-${index + 1}`}><span className="article-section-number">0{index + 1}</span><h2>{section.title}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
          <div className="article-cta" data-testid="article-cta"><div><span className="mono-kicker">COORDINATION REVIEW</span><h2>Apply this architecture to your system.</h2></div><a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="article-book-demo-link">Book a working session <ArrowRight size={16} /></a></div>
        </div>
      </div>
      <Link className="article-next" to={`/resources/${next.slug}`} data-testid="article-next-link"><span>Next field note</span><strong>{next.title}</strong><ArrowRight size={22} /></Link>
    </article>
  );
}