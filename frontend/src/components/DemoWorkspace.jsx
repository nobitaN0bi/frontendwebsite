import { useEffect, useState } from 'react';
import { Maximize2, Pause, Play } from 'lucide-react';

const scenes = [
  { id: 'home', label: 'Dispatch', caption: 'Ask, act, or route work to specialists.' },
  { id: 'ontology', label: 'Ontology', caption: 'Explore the shared graph for agents and the organization.' },
  { id: 'apps', label: 'Agent builder', caption: 'Compose and execute visual agent workflows.' },
  { id: 'doc-workspace', label: 'Docs + thread', caption: 'Co-author decisions with people and agents.' },
  { id: 'library', label: 'Knowledge', caption: 'Search enterprise knowledge across formats.' },
  { id: 'chat', label: 'Collaboration', caption: 'Bring agents into channels, email, and meetings.' },
  { id: 'code', label: 'Sandbox', caption: 'Run code in an isolated engineering workspace.' },
  { id: 'browser', label: 'Browser', caption: 'Observe an autonomous web task step by step.' },
  { id: 'teamspaces', label: 'Teamspaces', caption: 'Move between collaborative docs and operational boards.' }
];

export const DemoWorkspace = ({ compact = false }) => {
  const [active, setActive] = useState(0);
  const [touring, setTouring] = useState(false);
  const scene = scenes[active];

  useEffect(() => {
    if (!touring) return undefined;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % scenes.length), 5000);
    return () => window.clearInterval(interval);
  }, [touring]);

  const selectScene = (index) => {
    setActive(index);
    setTouring(false);
  };

  return (
    <div className={`exported-demo ${compact ? 'exported-demo-compact' : ''}`} data-testid="exported-html-demo">
      <div className="demo-chapter-bar" data-testid="demo-chapter-navigation">
        <div className="demo-chapter-copy">
          <span data-testid="demo-active-scene-number">0{active + 1} / 0{scenes.length}</span>
          <strong data-testid="demo-active-scene-title">{scene.label}</strong>
          <p data-testid="demo-active-scene-caption">{scene.caption}</p>
        </div>
        <div className="demo-chapter-actions">
          <button type="button" onClick={() => setTouring((current) => !current)} data-testid="demo-guided-tour-button">
            {touring ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
            {touring ? 'Pause tour' : 'Play guided tour'}
          </button>
          <a href={`/demo/demopages/${scene.id}.html`} target="_blank" rel="noreferrer" aria-label="Open current demo scene full screen" data-testid="demo-fullscreen-link"><Maximize2 size={16} /></a>
        </div>
      </div>
      <div className="demo-scene-tabs" role="tablist" aria-label="Ahi workspace scenes" data-testid="demo-scene-tabs">
        {scenes.map((item, index) => (
          <button key={item.id} type="button" role="tab" aria-selected={index === active} className={index === active ? 'active' : ''} onClick={() => selectScene(index)} data-testid={`demo-scene-${item.id}-tab`}>{item.label}</button>
        ))}
      </div>
      <div className={`demo-frame-shell ${touring ? 'is-touring' : ''}`}>
        <div className="demo-window-bar" aria-hidden="true"><i /><i /><i /><span>AHI DESKTOP / EXPORTED PRODUCT WALKTHROUGH</span></div>
        <iframe key={scene.id} className="demo-export-frame" src={`/demo/demopages/${scene.id}.html`} title={`Ahi desktop ${scene.label} demo`} sandbox="allow-scripts allow-same-origin allow-forms allow-modals" data-testid="demo-export-iframe" />
        <span className="demo-tour-progress" aria-hidden="true" />
      </div>
    </div>
  );
};