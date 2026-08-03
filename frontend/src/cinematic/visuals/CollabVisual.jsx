const initials = (name) => name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export const CollabVisual = ({ scenario }) => (
  <div className="diagram diagram-collab" data-testid="chapter-visual-collaboration">
    <div className="thread-bar" style={{ '--i': 0 }}>
      <span># {scenario.channel}</span>
      <div className="thread-presence">
        {(scenario.people || []).slice(0, 3).map((person, index) => (
          <b key={person} style={{ '--i': index + 1 }} title={person}>{initials(person)}</b>
        ))}
      </div>
    </div>
    <p className="bubble bubble-human dg-type" style={{ '--i': 1 }}>{scenario.message}</p>
    <p className="bubble bubble-agent dg-type" style={{ '--i': 3 }}>{scenario.agentReply}</p>
    <div className="thread-joins">
      {(scenario.agents || []).slice(0, 3).map((agent, index) => (
        <span key={agent} style={{ '--i': index + 5 }}>{agent} joined the thread</span>
      ))}
    </div>
    <p className="dg-foot" style={{ '--i': 8 }}>CRDT STATE CONVERGED — NOBODY IS EDITING A STALE DECISION</p>
  </div>
);
