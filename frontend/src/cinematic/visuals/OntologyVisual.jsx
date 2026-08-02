const spots = [[50, 46], [15, 17], [85, 15], [13, 71], [87, 73], [50, 90]];

export const OntologyVisual = ({ scenario }) => {
  const nodes = (scenario.graphNodes || []).slice(0, 6);

  return (
    <div className="diagram diagram-ontology" data-testid="chapter-visual-ontology">
      <svg className="dg-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.slice(1).map((node, index) => (
          <path key={node} d={`M50 46 L${spots[index + 1][0]} ${spots[index + 1][1]}`} style={{ '--i': index }} />
        ))}
      </svg>
      {nodes.map((node, index) => (
        <span
          key={node}
          className={`graph-node ${index === 0 ? 'is-core' : ''}`}
          style={{ '--i': index, left: `${spots[index][0]}%`, top: `${spots[index][1]}%` }}
        >
          <b>{index === 0 ? 'CORE' : `NODE ${String(index).padStart(2, '0')}`}</b>
          {node}
        </span>
      ))}
      <p className="dg-foot" style={{ '--i': 7 }}>GRAPH BOUND — {scenario.company.toUpperCase()} · TENANT SCOPED</p>
    </div>
  );
};
