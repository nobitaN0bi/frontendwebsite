import { ArrowRight, BookOpen, Database, FileCheck2, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { legalContacts, legalDocs } from '../data/legalDocs';
import { AsciiBackdrop } from '../components/AsciiBackdrop';
import { AsciiNarrative } from '../components/AsciiNarrative';

const iconMap = { Data: Database, Agreement: Scale, Safety: ShieldCheck, Trust: ShieldCheck, Enterprise: FileCheck2, Transparency: BookOpen };

export default function LegalCenterPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Acoord Legal and Trust Center', url: `${process.env.REACT_APP_SITE_URL}/legal`, description: 'Privacy, terms, acceptable use, security, and enterprise data processing information for Acoord.' };
  return (
    <div className="legal-center page-shell" data-testid="legal-center-page">
      <Seo title="Legal and Trust Center" description="Read Acoord privacy, terms, acceptable use, security, cookie, and data processing information." path="/legal" schema={schema} />
      <section className="legal-center-hero" data-testid="legal-center-hero">
        <AsciiBackdrop variant="legal" art="eye" />
        <div><p className="eyebrow" data-testid="legal-center-eyebrow">Acoord / Legal and trust</p><h1 data-testid="legal-center-title">Trust should be<br /><em>inspectable.</em></h1></div>
        <div className="legal-center-intro"><p data-testid="legal-center-description">Clear rules for the website that exists today—and transparent boundaries for the agentic platform being built next.</p><span data-testid="legal-center-jurisdiction">Acoord.co · California, United States</span></div>
      </section>
      <section className="legal-doc-grid ascii-stage" data-testid="legal-document-grid">
        <AsciiNarrative mode="policy" label="POLICY / VERSIONED" />
        {legalDocs.map((document) => {
          const Icon = iconMap[document.category] || FileCheck2;
          return <Link to={`/legal/${document.slug}`} className="legal-doc-card" key={document.slug} data-testid={`legal-${document.slug}-link`}>
            <div className="legal-card-top"><Icon size={19} /><span>{document.category}</span></div><h2>{document.title}</h2><p>{document.summary}</p>
            <div className="legal-card-foot"><span>Updated {document.effective}</span><ArrowRight size={17} /></div>
          </Link>;
        })}
      </section>
      <section className="legal-principles section-pad ascii-stage" data-testid="legal-principles">
        <AsciiNarrative mode="trust" label="CLAIMS / VERIFIED" />
        <div><p className="eyebrow">Operating principles</p><h2>Plain language.<br />Scoped claims.<br />Visible change.</h2></div>
        <div className="principle-list">
          <article><span>01</span><h3>Present state before future state</h3><p>The public demo and the future enterprise platform are described separately.</p></article>
          <article><span>02</span><h3>No certification theater</h3><p>Security certifications appear only after independent verification.</p></article>
          <article><span>03</span><h3>Human accountability remains</h3><p>Agent outputs do not remove the need for qualified review in consequential workflows.</p></article>
        </div>
      </section>
      <section className="contact-directory section-pad ascii-stage" data-testid="legal-contact-directory">
        <AsciiNarrative mode="signal" tone="dark" label="REQUEST / ROUTED" />
        <div><p className="eyebrow">Contact directory</p><h2>Route the question<br />to the right team.</h2></div>
        <div className="contact-grid">{legalContacts.map((contact) => <a href={`mailto:${contact.email}`} key={contact.email} data-testid={`contact-${contact.email.split('@')[0]}-link`}><span>{contact.label}</span><strong>{contact.email}</strong></a>)}</div>
      </section>
    </div>
  );
}