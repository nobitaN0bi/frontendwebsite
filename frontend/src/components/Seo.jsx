import { useEffect } from 'react';

const ensureMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

export const Seo = ({ title, description, path = '/', type = 'website', schema, image = '/acoord-infinity-share.jpg' }) => {
  useEffect(() => {
    const siteUrl = process.env.REACT_APP_SITE_URL;
    const canonicalUrl = `${siteUrl}${path}`;
    const fullTitle = title.includes('Acoord') ? title : `${title} | Acoord`;
    document.title = fullTitle;
    ensureMeta('meta[name="description"]', { name: 'description', content: description });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: `${siteUrl}${image}` });
    ensureMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Acoord infinity mark and coordination graph' });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: `${siteUrl}${image}` });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schemaNodeId = 'acoord-route-schema';
    document.getElementById(schemaNodeId)?.remove();
    if (schema) {
      const script = document.createElement('script');
      script.id = schemaNodeId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    return () => document.getElementById(schemaNodeId)?.remove();
  }, [title, description, path, type, schema, image]);
  return null;
};