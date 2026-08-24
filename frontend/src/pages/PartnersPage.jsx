import { ArrowUpRight, Check } from 'lucide-react';
import { Seo } from '../components/Seo';

const tracks = [
  { id: 'implementation', label: 'Implementation Partners', description: 'For consultancies and implementation teams delivering governed agent operations inside client environments.', benefits: ['AHI deployment playbook', 'Solution architecture support', 'Co-delivery on the first customer'] },
  { id: 'ecosystem', label: 'Ecosystem Partners', description: 'For connector, platform, model, and specialist workflow partners extending the AHI command surface.', benefits: ['Joint product design', 'Shared launch motion', 'Qualified customer introductions'] }
];

const partnerSchema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Acoord AHI Partner Program', description: 'Two partner tracks for implementing governed agent operations and extending the AHI ecosystem.', about: tracks.map((track) => track.label) };

export default function PartnersPage() {
  return <div className="branch-page" data-testid="partners-page">
    <Seo title="AHI Partner Program | Acoord" description="Partner with Acoord to implement governed agent operations or extend the AHI ecosystem." path="/partners" schema={partnerSchema} />
    <section className="branch-hero"><span>PARTNERS / FOUNDING COHORT</span><h1 data-testid="partners-title">Build the coordination layer.<br />Together.</h1><p>Two focused tracks for teams that can move enterprise agent systems from disconnected pilots into governed work.</p><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="partners-apply-hero-link">Apply to Partner <ArrowUpRight size={15} /></a></section>
    <section className="partner-track-grid" data-testid="partner-track-grid">{tracks.map((track) => <article key={track.id} data-testid={`partner-${track.id}-track`}><span>{track.id === 'implementation' ? '01' : '02'} / PARTNER TRACK</span><h2>{track.label}</h2><p>{track.description}</p><ul>{track.benefits.map((benefit) => <li key={benefit}><Check size={14} />{benefit}</li>)}</ul></article>)}</section>
    <section className="founding-advantage" data-testid="founding-partner-section"><header><span>FOUNDING PARTNER ADVANTAGE</span><h2>Early partners help define the operating standard.</h2></header><div>{['Zero program fees', 'Direct founder access', 'Shared pipeline', 'Early roadmap influence'].map((item, index) => <article key={item}><span>0{index + 1}</span><strong>{item}</strong></article>)}</div><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="partners-apply-link">Apply to Partner <ArrowUpRight size={15} /></a></section>
  </div>;
}