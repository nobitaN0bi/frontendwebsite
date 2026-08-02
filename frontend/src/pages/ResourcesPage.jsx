import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { resources } from '../data/resources';
import { AsciiBackdrop } from '../components/AsciiBackdrop';
import { AsciiNarrative } from '../components/AsciiNarrative';

export default function ResourcesPage() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const categories = ['All', ...new Set(resources.map((resource) => resource.category))];
  const visibleResources = useMemo(() => resources.filter((resource) => {
    const categoryMatch = category === 'All' || resource.category === category;
    const searchMatch = `${resource.title} ${resource.description} ${resource.keyword}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  }), [category, query]);
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Acoord Resources', description: 'Technical guides for agentic architecture, collaborative intelligence, enterprise RAG, and secure execution.', url: `${process.env.REACT_APP_SITE_URL}/resources` };

  return (
    <div className="resources-page page-shell" data-testid="resources-page">
      <Seo title="Agentic Systems Resources" description="Technical guides for building coordinated, collaborative, and trustworthy agent systems." path="/resources" schema={schema} />
      <section className="resources-hero" data-testid="resources-hero">
        <AsciiBackdrop variant="resources" art="mesh" />
        <div><p className="eyebrow">Acoord field notes / v1</p><h1 data-testid="resources-title">Build systems that<br /><em>coordinate.</em></h1></div>
        <p data-testid="resources-description">Original field guides for the architecture between a promising agent demo and a production system people can trust.</p>
      </section>
      <section className="resource-controls" data-testid="resource-controls">
        <div className="resource-filters" data-testid="resource-category-filters">{categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item} data-testid={`resource-filter-${item.toLowerCase().replaceAll(' ', '-')}-button`}>{item}</button>)}</div>
        <label className="resource-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search architecture notes" data-testid="resource-search-input" /></label>
      </section>
      <section className="resource-list ascii-stage" data-testid="resource-list">
        <AsciiNarrative mode="knowledge" label="SEARCH / RETRIEVE / CITE" />
        {visibleResources.map((resource, index) => <Link to={`/resources/${resource.slug}`} className="resource-row" key={resource.slug} data-testid={`resource-${resource.slug}-link`}>
          <span className="resource-row-number">{String(index + 1).padStart(2, '0')}</span>
          <div><span className="resource-category">{resource.category} / {resource.type}</span><h2>{resource.title}</h2><p>{resource.description}</p></div>
          <div className="resource-row-meta"><span>{resource.readingTime}</span><span>{resource.published}</span><ArrowRight size={19} /></div>
        </Link>)}
        {!visibleResources.length && <div className="resource-empty" data-testid="resource-empty-state"><BookOpen size={25} /><p>No field notes match that search yet.</p></div>}
      </section>
      <section className="resource-subscribe" data-testid="resource-booking-cta">
        <div><p className="eyebrow">From architecture to operating reality</p><h2>Map your coordination layer.</h2></div>
        <a className="button button-white" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="resources-book-demo-link">Book a 30-minute session <ArrowRight size={17} /></a>
      </section>
    </div>
  );
}