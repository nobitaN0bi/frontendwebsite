import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const WorkflowExplorer = ({ config }) => {
  const [filter, setFilter] = useState('All');
  const [activeId, setActiveId] = useState(config.workflows[0].id);
  const visible = useMemo(() => config.workflows.filter((item) => filter === 'All' || item.category === filter), [config.workflows, filter]);
  const active = config.workflows.find((item) => item.id === activeId) || visible[0];

  const chooseFilter = (next) => {
    setFilter(next);
    const first = config.workflows.find((item) => next === 'All' || item.category === next);
    if (first) setActiveId(first.id);
  };

  return (
    <section className="workflow-explorer" data-testid="workflow-explorer">
      <div className="workflow-filter-row" role="group" aria-label={`Filter ${config.label} workflows`} data-testid="workflow-filter-controls">
        {config.filters.map((item) => <button type="button" key={item} className={filter === item ? 'is-active' : ''} onClick={() => chooseFilter(item)} data-testid={`workflow-filter-${item.toLowerCase().replace(/\s+/g, '-')}-button`}>{item}</button>)}
      </div>
      <div className="workflow-layout">
        <div className="workflow-list" data-testid="workflow-card-list">
          {visible.map((workflow, index) => <button type="button" key={workflow.id} className={active?.id === workflow.id ? 'is-active' : ''} onClick={() => setActiveId(workflow.id)} data-testid={`workflow-${workflow.id}-button`}><span>{String(index + 1).padStart(2, '0')} / {workflow.category}</span><strong>{workflow.title}</strong><ArrowRight size={16} /></button>)}
        </div>
        {active && <article className="workflow-inspector" data-testid={`workflow-${active.id}-detail`}>
          <header><span>MODELED WORKFLOW / {active.category.toUpperCase()}</span><h2 data-testid="workflow-active-title">{active.title}</h2><p>{active.intent}</p></header>
          <div className="workflow-source-grid">{active.sources.map((source) => <span key={source}><CheckCircle2 size={14} />{source}</span>)}</div>
          <div className="workflow-line"><div><small>AHI SPECIALISTS</small><p>{active.specialists.join(' → ')}</p></div><i /><div><small>HUMAN CHECKPOINT</small><p>{active.checkpoint}</p></div><i /><div><small>DURABLE RECORD</small><p>{active.record}</p></div></div>
          <p className="workflow-disclaimer" data-testid="workflow-modeled-disclaimer">MODELED OPERATING PATTERN — NOT A CUSTOMER CLAIM OR CLINICAL / FINANCIAL OUTCOME</p>
        </article>}
      </div>
    </section>
  );
};