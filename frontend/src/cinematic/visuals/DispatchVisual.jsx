export const DispatchVisual = ({ scenario }) => (
  <div className="diagram diagram-dispatch" data-testid="chapter-visual-dispatch">
    <div className="dg-box dg-intent" style={{ '--i': 0 }}>
      <span>HUMAN INTENT</span>
      <strong>{scenario.hook}</strong>
      <em>{scenario.owner} · {scenario.role}</em>
    </div>
    <div className="dg-router" style={{ '--i': 1 }}>
      <i className="dg-wire" />
      <span>LEAD ORCHESTRATOR</span>
      <i className="dg-wire" />
    </div>
    <div className="dg-fanout">
      {(scenario.agents || []).slice(0, 4).map((agent, index) => (
        <div className="dg-box dg-agent" key={agent} style={{ '--i': index + 2 }}>
          <i className="dg-wire dg-wire-vertical" />
          <span>AGENT {String(index + 1).padStart(2, '0')}</span>
          <strong>{agent}</strong>
          <em>scoped tools · no shared secrets</em>
        </div>
      ))}
    </div>
    <p className="dg-foot" style={{ '--i': 6 }}>ROUTING COMPLETE — ONE INTENT, {(scenario.agents || []).length} BOUNDED ROLES</p>
  </div>
);
