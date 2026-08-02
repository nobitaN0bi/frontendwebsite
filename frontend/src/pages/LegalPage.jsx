import { ArrowLeft, ArrowRight, Clock3, Mail } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { getLegalDoc, legalDocs } from '../data/legalDocs';

export default function LegalPage() {
  const { document: documentSlug } = useParams();
  const document = getLegalDoc(documentSlug) || legalDocs[0];
  const currentIndex = legalDocs.findIndex((item) => item.slug === document.slug);
  const nextDocument = legalDocs[(currentIndex + 1) % legalDocs.length];
  const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: document.title, dateModified: '2026-04-08', publisher: { '@type': 'Organization', name: 'Acoord.co' }, url: `${process.env.REACT_APP_SITE_URL}/legal/${document.slug}`, description: document.summary };

  return (
    <article className="legal-page page-shell" data-testid={`legal-page-${document.slug}`}>
      <Seo title={document.title} description={document.summary} path={`/legal/${document.slug}`} schema={schema} />
      <header className="legal-page-hero" data-testid="legal-page-hero">
        <Link to="/legal" className="legal-back" data-testid="legal-back-link"><ArrowLeft size={16} /> Legal center</Link>
        <div className="legal-title-block"><p className="eyebrow" data-testid="legal-document-category">{document.category} / Acoord.co</p><h1 data-testid="legal-document-title">{document.title}</h1><p data-testid="legal-document-summary">{document.summary}</p></div>
        <div className="legal-meta" data-testid="legal-document-meta"><span>Effective {document.effective}</span><span><Clock3 size={14} /> {document.readingTime} read</span></div>
      </header>
      <div className="legal-layout">
        <aside className="legal-toc" data-testid="legal-table-of-contents"><span>On this page</span>{document.sections.map((section) => <a href={`#${section.id}`} key={section.id} data-testid={`legal-toc-${section.id}-link`}>{section.title}</a>)}</aside>
        <div className="legal-document" data-testid="legal-document-content">
          <div className="legal-callout" data-testid="legal-document-callout">{document.callout}</div>
          {document.sections.map((section) => <section id={section.id} key={section.id} data-testid={`legal-section-${section.id}`}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph, index) => <p key={`${section.id}-${index}`}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>)}
          <div className="legal-help"><Mail size={20} /><div><strong>Questions about this document?</strong><p>Email <a href="mailto:legal@acoord.co">legal@acoord.co</a>. Privacy requests can go directly to <a href="mailto:privacy@acoord.co">privacy@acoord.co</a>.</p></div></div>
        </div>
      </div>
      <Link className="legal-next" to={`/legal/${nextDocument.slug}`} data-testid="legal-next-document-link"><span>Next document</span><strong>{nextDocument.title}</strong><ArrowRight size={22} /></Link>
    </article>
  );
}