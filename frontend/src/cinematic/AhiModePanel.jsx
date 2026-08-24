import { useState } from 'react';

const connectorGroups = ['Communication', 'Work', 'Code', 'Knowledge', 'CRM', 'Files', 'Meetings', 'Web'];

export const AhiModePanel = ({ chapter }) => {
  const [decision, setDecision] = useState('pending');
  const [directive, setDirective] = useState('Keep external writes behind human approval');
  const [applied, setApplied] = useState('');

  return (
    <aside className={`ahi-mode-panel mode-${chapter.id}`} data-testid={`ahi-${chapter.id}-state`}>
      <span>{chapter.label.toUpperCase()} / LIVE STATE</span>
      {chapter.id === 'observe' && <div className="ahi-fleet-mini" data-testid="ahi-observe-fleet"><b>12 RUNNING</b><b>03 WAITING</b><b>01 HUMAN GATE</b></div>}
      {chapter.id === 'approve' && <div className="ahi-approval-mini"><p>External CRM update · 184 records · Evidence attached</p><div><button type="button" className={decision === 'approved' ? 'is-active' : ''} onClick={() => setDecision(decision === 'approved' ? 'pending' : 'approved')} data-testid="ahi-approve-button">Approve</button><button type="button" className={decision === 'denied' ? 'is-active' : ''} onClick={() => setDecision(decision === 'denied' ? 'pending' : 'denied')} data-testid="ahi-deny-button">Deny</button></div><strong data-testid="ahi-decision-status">{decision.toUpperCase()} · reversible demo state</strong></div>}
      {chapter.id === 'steer' && <form className="ahi-steer-mini" onSubmit={(event) => { event.preventDefault(); setApplied(directive); }} data-testid="ahi-steer-form"><label htmlFor="ahi-directive">Directive</label><input id="ahi-directive" value={directive} onChange={(event) => setDirective(event.target.value)} data-testid="ahi-directive-input" /><button type="submit" data-testid="ahi-apply-directive-button">Apply directive</button>{applied && <strong data-testid="ahi-directive-result">Applied across connected agents: {applied}</strong>}</form>}
      {chapter.id === 'connect' && <div className="ahi-connector-mini" data-testid="ahi-connect-grid">{connectorGroups.map((item) => <b key={item}>{item}</b>)}</div>}
      {chapter.id === 'audit' && <div className="ahi-audit-mini" data-testid="ahi-audit-timeline"><p><i /> 09:42 · Evidence attached</p><p><i /> 09:44 · Human approved</p><p><i /> 09:45 · Decision recorded</p></div>}
      {chapter.id === 'scale' && <div className="ahi-scale-mini" data-testid="ahi-scale-graph"><b>MEMBERS</b><i /> <b>AHI</b> <i /> <b>AGENTS</b><p>Shared context · governed decisions · durable memory</p></div>}
    </aside>
  );
};