import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';

const plans = [
  { id: 'pilot', name: 'Pilot', price: '$25,000', term: '90 days', amount: '25000', description: 'Prove one production workflow against a measurable operating baseline.', features: ['One production workflow', 'AHI workspace for one operating team', 'Up to five connected systems', 'Human approval and audit controls', 'Outcome review at day 90'] },
  { id: 'launch', name: 'OSI Launch', price: '$100,000', term: 'per year', amount: '100000', description: 'Build governed agent leverage across one organization with implementation support.', featured: true, features: ['Up to 100 members', 'All standard connectors', 'Shared agent inbox and policies', 'Priority implementation support'] },
  { id: 'enterprise', name: 'Enterprise', price: 'From $250,000', term: 'per year', amount: '250000', description: 'Deploy AHI inside complex, regulated, or private infrastructure.', features: ['Custom member scope', 'VPC or on-premise path', 'Custom connectors and controls', 'Forward-deployed coordination support'] }
];

const pricingSchema = {
  '@context': 'https://schema.org', '@type': 'Product', name: 'Acoord AHI', category: 'Agent Human Interface',
  description: 'Enterprise AHI pricing for governed agent workflows.',
  offers: plans.map((plan) => ({ '@type': 'Offer', name: plan.name, price: plan.amount, priceCurrency: 'USD', description: `${plan.term}. ${plan.description}` }))
};

export default function PricingPage() {
  return <div className="branch-page" data-testid="pricing-page">
    <Seo title="AHI Pricing | Acoord" description="Enterprise pricing for AHI pilots, OSI Launch, and private deployments focused on recovered time, controlled risk, and faster execution." path="/pricing" schema={pricingSchema} />
    <section className="branch-hero"><span>PRICING / PRODUCTION PATH</span><h1 data-testid="pricing-title">Price the outcome.<br />Not another seat.</h1><p>Start with one governed workflow. Measure recovered time, controlled risk, and execution speed. Expand only when the operating evidence is real.</p><Link to="/roi" data-testid="pricing-roi-link">Estimate your ROI</Link></section>
    <section className="pricing-grid" data-testid="pricing-plan-grid">{plans.map((plan) => <article className={plan.featured ? 'is-featured' : ''} key={plan.id} data-testid={`pricing-${plan.id}-plan`}><header><span>{plan.featured ? 'PRIMARY PLAN' : 'PRODUCTION PATH'}</span><h2>{plan.name}</h2><strong data-testid={`pricing-${plan.id}-price`}>{plan.price}</strong><small>{plan.term}</small><p>{plan.description}</p></header><ul>{plan.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid={`pricing-${plan.id}-conversation-link`}>Start Conversation <ArrowUpRight size={15} /></a></article>)}</section>
    <section className="branch-closing"><span>PILOT LANGUAGE / PRODUCTION ACCOUNTABILITY</span><div><h2>Validate the baseline before scaling the system.</h2><p>Every engagement begins with a named workflow, accountable owners, explicit human controls, and an outcome review.</p></div></section>
  </div>;
}