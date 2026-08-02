export const KnowledgeVisual = ({ scenario }) => {
  const sources = (scenario.knowledge || []).slice(0, 4);

  return (
    <div className="diagram diagram-knowledge" data-testid="chapter-visual-knowledge">
      <div className="rank-grid">
        <div className="rank-col" style={{ '--i': 0 }}>
          <span>VECTOR · pgvector</span>
          {sources.map((source, index) => (
            <p key={source} style={{ '--i': index + 1, '--w': 0.95 - index * 0.13 }}>
              <i className="rank-bar" />
              <b>{source}</b>
              <em>{(0.95 - index * 0.13).toFixed(2)}</em>
            </p>
          ))}
        </div>
        <div className="rank-col" style={{ '--i': 1 }}>
          <span>LEXICAL · BM25</span>
          {sources.slice().reverse().map((source, index) => (
            <p key={source} style={{ '--i': index + 1, '--w': 0.9 - index * 0.15 }}>
              <i className="rank-bar" />
              <b>{source}</b>
              <em>#{index + 1}</em>
            </p>
          ))}
        </div>
      </div>
      <div className="rank-fuse" style={{ '--i': 6 }}>
        <span>RECIPROCAL RANK FUSION</span>
        <strong>{sources.length} grounded passages, exact identifiers intact</strong>
      </div>
      <p className="dg-foot" style={{ '--i': 7 }}>RETRIEVAL SCOPED TO {scenario.company.toUpperCase()} — NOTHING LEAVES THE TENANT</p>
    </div>
  );
};
