const widths = [0.94, 0.78, 0.88, 0.62, 0.83, 0.51];

export const DocsVisual = ({ scenario }) => (
  <div className="diagram diagram-docs" data-testid="chapter-visual-docs">
    <div className="doc-bar" style={{ '--i': 0 }}>
      <span>{scenario.document}</span>
      <em>2 EDITORS · 1 AGENT</em>
    </div>
    <h4 className="doc-title dg-type" style={{ '--i': 1 }}>{scenario.hook}</h4>
    <div className="doc-lines">
      {widths.map((width, index) => (
        <i key={width} className="doc-line" style={{ '--i': index + 2, '--w': width }} />
      ))}
    </div>
    <div className="doc-cites">
      {(scenario.knowledge || []).slice(0, 3).map((source, index) => (
        <span key={source} style={{ '--i': index + 8 }}>[{index + 1}] {source}</span>
      ))}
    </div>
    <p className="doc-cursor" style={{ '--i': 9 }}>AUDIT WRITER IS DRAFTING<i /></p>
    <p className="dg-foot" style={{ '--i': 10 }}>RATIONALE CAPTURED WHILE THE DECISION IS STILL OPEN</p>
  </div>
);
