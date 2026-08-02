const ledger = ['intent', 'ontology', 'compile', 'retrieve', 'coordinate', 'execute', 'verify', 'approve', 'persist'];

export const DecisionVisual = ({ scenario }) => (
  <div className="diagram diagram-decision" data-testid="chapter-visual-decision">
    <div className="decision-card" style={{ '--i': 0 }}>
      <span>HUMAN CHECKPOINT</span>
      <strong className="dg-type" style={{ '--i': 1 }}>{scenario.checkpoint}</strong>
      <div className="decision-actions">
        {['APPROVE', 'HOLD', 'REASSIGN'].map((action, index) => (
          <b key={action} className={index === 0 ? 'is-chosen' : ''} style={{ '--i': index + 2 }}>{action}</b>
        ))}
      </div>
      <em className="decision-stamp" style={{ '--i': 5 }}>APPROVED · {scenario.owner} · {scenario.teamspace}</em>
    </div>
    <div className="decision-ledger">
      {ledger.map((row, index) => (
        <p key={row} style={{ '--i': index + 5 }}><i />{row.toUpperCase()}<em>OK</em></p>
      ))}
    </div>
    <div className="decision-outcome" style={{ '--i': 15 }}>
      <span>MODELED OUTCOME</span>
      <strong>{scenario.outcome}</strong>
      <b>{scenario.metric}</b>
    </div>
  </div>
);
