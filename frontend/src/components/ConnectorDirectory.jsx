import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { connectorCategories, connectors } from '../data/connectors';

export const ConnectorDirectory = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = useMemo(() => connectors.filter((connector) => {
    const categoryMatch = category === 'All' || connector.category === category;
    const queryMatch = `${connector.name} ${connector.category} ${connector.protocol}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query]);

  return (
    <section className="connector-directory" id="connectors" data-testid="connector-directory-section">
      <header className="connector-directory-head">
        <div><span>49 / CONNECTOR SURFACES</span><h2 data-testid="connector-directory-title">Connect the systems.<br />Keep one decision line.</h2></div>
        <p data-testid="connector-directory-description">AHI reads from, acts through, and writes proof back to the tools your organization already trusts.</p>
      </header>
      <div className="connector-toolbar" data-testid="connector-directory-toolbar">
        <label className="connector-search"><Search size={16} /><span className="sr-only">Search connectors</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 49 connectors" data-testid="connector-search-input" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear connector search" data-testid="connector-search-clear-button"><X size={15} /></button>}</label>
        <div className="connector-filters" role="group" aria-label="Filter connectors by category">
          {connectorCategories.map((item) => <button type="button" key={item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)} data-testid={`connector-filter-${item.toLowerCase().replace(/\s+/g, '-')}-button`}>{item}</button>)}
        </div>
      </div>
      <div className="connector-result-line" aria-live="polite" data-testid="connector-result-count">{String(filtered.length).padStart(2, '0')} / 49 surfaces visible</div>
      <div className="connector-grid" data-testid="connector-grid">
        {filtered.map((connector) => <article key={connector.id} data-testid={`connector-${connector.id}-card`}><span>{connector.number}</span><strong data-testid={`connector-${connector.id}-name`}>{connector.name}</strong><small>{connector.category} / {connector.protocol}</small><i>{connector.state}</i></article>)}
      </div>
      {!filtered.length && <p className="connector-empty" data-testid="connector-empty-state">NO MATCHING SURFACE / TRY ANOTHER SYSTEM OR CATEGORY</p>}
    </section>
  );
};