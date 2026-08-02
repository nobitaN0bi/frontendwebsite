export const BuilderVisual = ({ scenario }) => {
  const tasks = (scenario.tasks || []).slice(0, 5);

  return (
    <div className="diagram diagram-builder" data-testid="chapter-visual-builder">
      <div className="compile-head" style={{ '--i': 0 }}>
        <span>WORKFLOW</span>
        <strong>{scenario.workflow}</strong>
      </div>
      <div className="compile-stack">
        {tasks.map((task, index) => (
          <div className="compile-row" key={task} style={{ '--i': index + 1 }}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{task}</strong>
            <em>{index === tasks.length - 2 ? 'HUMAN GATE' : 'AGENT STEP'}</em>
            <b className="compile-stamp">COMPILED</b>
          </div>
        ))}
      </div>
      <div className="compile-out" style={{ '--i': tasks.length + 1 }}>
        <span>AST</span>
        <strong>topology valid</strong>
        <em>0 unsafe bindings · 0 orphan nodes · 1 checkpoint</em>
      </div>
      <p className="dg-foot" style={{ '--i': tasks.length + 2 }}>PLAN LOCKED — REJECTED BEFORE RUNTIME, NOT AFTER</p>
    </div>
  );
};
