import { ArrowRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { WorkflowExplorer } from '../components/WorkflowExplorer';
import { workflowUseCases } from '../data/workflowUseCases';

export default function WorkflowUseCasePage({ slug, onJoin }) {
  const config = workflowUseCases[slug];
  const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: `${config.label} AHI workflows`, description: config.schemaDescription, about: ['Agent Human Interface', config.label, 'Human-in-the-loop workflows'] };
  return (
    <div className="workflow-page" data-testid={`workflow-use-case-${slug}-page`}>
      <Seo title={`${config.label} AHI Workflows | Acoord`} description={config.schemaDescription} path={`/use-cases/${slug}`} schema={schema} />
      <section className="workflow-hero"><span>{config.eyebrow}</span><h1 data-testid={`workflow-${slug}-title`}>{config.title}</h1><p>{config.description}</p><a href="#workflow-library" data-testid={`workflow-${slug}-explore-link`}>Explore workflow library <ArrowRight size={16} /></a></section>
      <div id="workflow-library"><WorkflowExplorer config={config} /></div>
      <section className="workflow-cta"><span>YOUR OPERATING REALITY / SPECIFIC</span><h2>Map one consequential workflow.</h2><p>Bring the systems, evidence, owners, and decision boundary. We will map the coordination layer with you.</p><div><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid={`workflow-${slug}-book-link`}>Book a working session <ArrowRight size={15} /></a><button type="button" onClick={onJoin} data-testid={`workflow-${slug}-waitlist-button`}>Join the waitlist</button></div></section>
    </div>
  );
}