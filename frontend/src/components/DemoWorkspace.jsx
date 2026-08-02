import { useEffect, useState } from 'react';
import { Bot, Braces, Check, CircleUserRound, Database, Play, ShieldCheck, Wrench } from 'lucide-react';

const scenarios = {
  compliance: {
    label: 'Compliance review', prompt: 'Screen this transaction, ground the decision in policy, and pause before filing.',
    nodes: [
      { id: 'intent', title: 'Lead agent', note: 'Classifies intent', type: 'agent', x: 8, y: 15, icon: Bot },
      { id: 'rag', title: 'Policy retrieval', note: 'BM25 + vector fusion', type: 'tool', x: 39, y: 8, icon: Database },
      { id: 'guard', title: 'Risk topology', note: 'Validates constraints', type: 'logic', x: 39, y: 55, icon: ShieldCheck },
      { id: 'human', title: 'Human checkpoint', note: 'Approval required', type: 'human', x: 70, y: 31, icon: CircleUserRound }
    ]
  },
  incident: {
    label: 'Incident response', prompt: 'Find the production regression, test the safest fix, and build the incident timeline.',
    nodes: [
      { id: 'intent', title: 'Incident lead', note: 'Routes investigation', type: 'agent', x: 8, y: 15, icon: Bot },
      { id: 'rag', title: 'Telemetry MCP', note: 'Queries traces + logs', type: 'mcp', x: 39, y: 8, icon: Wrench },
      { id: 'guard', title: 'Secure sandbox', note: 'Tests patch in isolation', type: 'logic', x: 39, y: 55, icon: Braces },
      { id: 'human', title: 'Deploy checkpoint', note: 'SRE approval required', type: 'human', x: 70, y: 31, icon: CircleUserRound }
    ]
  },
  clinical: {
    label: 'Clinical support', prompt: 'Reconcile this medication list and escalate any dangerous interaction to the clinician.',
    nodes: [
      { id: 'intent', title: 'Clinical router', note: 'Scopes patient context', type: 'agent', x: 8, y: 15, icon: Bot },
      { id: 'rag', title: 'Evidence search', note: 'Clinical hybrid RAG', type: 'tool', x: 39, y: 8, icon: Database },
      { id: 'guard', title: 'Safety policy', note: 'Checks contraindications', type: 'logic', x: 39, y: 55, icon: ShieldCheck },
      { id: 'human', title: 'Clinician review', note: 'Rationale recorded', type: 'human', x: 70, y: 31, icon: CircleUserRound }
    ]
  }
};

export const DemoWorkspace = () => {
  const [scenarioKey, setScenarioKey] = useState('compliance');
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [logCount, setLogCount] = useState(2);
  const scenario = scenarios[scenarioKey];

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => setLogCount((count) => Math.min(count + 1, 6)), 550);
    const timer = window.setTimeout(() => { setRunning(false); setComplete(true); window.clearInterval(interval); }, 2900);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, [running]);

  const selectScenario = (key) => { setScenarioKey(key); setComplete(false); setLogCount(2); };
  const run = () => { setRunning(true); setComplete(false); setLogCount(2); };
  const logs = ['intent.classified / confidence 0.96', 'ast.compiled / 4 nodes / 4 edges', 'retrieval.complete / 18 sources fused', 'guardrail.passed / no cycle detected', 'checkpoint.created / human approval pending', 'state.persisted / audit ledger updated'];

  return (
    <div className="demo-workspace" data-testid="interactive-demo-workspace">
      <aside className="demo-chat" data-testid="demo-chat-panel">
        <div className="panel-bar"><span>Intent thread</span><i className="live-dot" /> live</div>
        <div className="scenario-switcher" data-testid="demo-scenario-switcher">
          {Object.entries(scenarios).map(([key, item]) => (
            <button className={key === scenarioKey ? 'active' : ''} onClick={() => selectScenario(key)} key={key} data-testid={`demo-scenario-${key}-button`}>{item.label}</button>
          ))}
        </div>
        <div className="chat-thread">
          <div className="chat-bubble human" data-testid="demo-human-prompt">{scenario.prompt}</div>
          <div className="chat-bubble agent" data-testid="demo-agent-response">
            <span className="mono-kicker">LEAD_AGENT / PLAN</span>
            I’ll coordinate retrieval, policy checks, and a human checkpoint before any consequential action.
          </div>
        </div>
        <button className="button button-ink demo-run" onClick={run} disabled={running} data-testid="demo-run-button">
          {running ? <><span className="pulse-square" /> Executing graph</> : complete ? <><Check size={16} /> Run complete</> : <><Play size={15} fill="currentColor" /> Run coordination</>}
        </button>
      </aside>
      <section className="demo-canvas" data-testid="demo-canvas-panel">
        <div className="panel-bar canvas-bar"><span>Workspace / {scenario.label}</span><span className="mono-meta">CRDT SYNC · 3 PRESENT</span></div>
        <div className={`node-field ${running ? 'is-running' : ''} ${complete ? 'is-complete' : ''}`}>
          <svg className="edge-map" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 24 27 C 31 27, 31 20, 39 20" /><path d="M 24 27 C 31 32, 31 67, 39 67" />
            <path d="M 55 20 C 61 22, 64 43, 70 43" /><path d="M 55 67 C 61 64, 64 48, 70 43" />
          </svg>
          {scenario.nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <article className={`flow-node node-${node.type}`} style={{ left: `${node.x}%`, top: `${node.y}%`, '--delay': `${index * 0.13}s` }} key={node.id} data-testid={`demo-node-${node.id}`}>
                <span className="node-port in" /><div className="node-heading"><Icon size={15} /><strong>{node.title}</strong></div>
                <p>{node.note}</p><span className="node-status">{complete ? 'complete' : running ? 'executing' : 'ready'}</span><span className="node-port out" />
              </article>
            );
          })}
          <div className="presence-cursor cursor-one"><span>Ari</span></div>
          <div className="presence-cursor cursor-two"><span>Sam</span></div>
          <div className="terminal-card" data-testid="demo-terminal-log">
            <div className="terminal-top"><span>AST / TELEMETRY</span><span>•••</span></div>
            {logs.slice(0, logCount).map((log, index) => <code key={log}><b>{String(index + 1).padStart(2, '0')}</b> {log}</code>)}
          </div>
        </div>
      </section>
    </div>
  );
};