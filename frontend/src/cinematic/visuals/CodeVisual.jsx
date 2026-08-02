const policy = ['cpu · 2 cores', 'memory · 512 MB', 'network · denied', 'timeout · 30 s', 'credentials · scoped'];

export const CodeVisual = ({ scenario }) => {
  const tasks = (scenario.tasks || []).slice(0, 3);
  const lines = [
    `# ${scenario.codeTask}`,
    'from ahi import sandbox, evidence',
    `run = sandbox.open("${scenario.workflow}")`,
    ...tasks.map((task, index) => `step_${index + 1} = run.verify("${task}")`),
    `evidence.persist(run, owner="${scenario.owner}")`
  ];
  const logs = [
    `$ python ${scenario.codeFile}`,
    `-> ${tasks[0] || 'verifying run'}`,
    '-> policy checks passed',
    'OK  artifacts written to /run/evidence'
  ];

  return (
    <div className="diagram diagram-code" data-testid="chapter-visual-code">
      <div className="code-bar" style={{ '--i': 0 }}>
        <span>AHI / CODE</span>
        <em>{scenario.codeFile}</em>
        <b>ISOLATED RUN</b>
      </div>
      <div className="code-body">
        <aside className="code-tree">
          {['workspace/', scenario.codeFile, 'tests/test_rules.py', 'artifacts/report.md'].map((file, index) => (
            <span key={file} className={index === 1 ? 'is-open' : ''} style={{ '--i': index + 1 }}>{file}</span>
          ))}
        </aside>
        <div className="code-editor">
          {lines.map((line, index) => (
            <p key={line} className="dg-type" style={{ '--i': index + 1 }}><i>{String(index + 1).padStart(2, '0')}</i>{line}</p>
          ))}
        </div>
        <aside className="code-policy">
          <span>RUN POLICY</span>
          {policy.map((rule, index) => <b key={rule} style={{ '--i': index + 3 }}>{rule}</b>)}
        </aside>
      </div>
      <div className="code-terminal">
        {logs.map((log, index) => (
          <code key={log} className="dg-type" style={{ '--i': index + 8 }}>{log}</code>
        ))}
      </div>
      <p className="dg-foot" style={{ '--i': 13 }}>GENERATED CODE RAN OUTSIDE THE APPLICATION HOST — RESULTS CAME BACK, RISK DID NOT</p>
    </div>
  );
};
