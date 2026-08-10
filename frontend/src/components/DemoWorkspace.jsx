import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Maximize2, Pause, Play } from 'lucide-react';

const scenes = [
  { id: 'home', label: 'Dispatch', caption: 'Route the enterprise intent and assemble the right specialists.' },
  { id: 'ontology', label: 'Ontology', caption: 'Ground people, policies, systems, and evidence in one graph.' },
  { id: 'apps', label: 'Agent builder', caption: 'Compile the operating plan with explicit boundaries and checkpoints.' },
  { id: 'doc-workspace', label: 'Docs + thread', caption: 'Co-author the decision rationale with cited evidence.' },
  { id: 'library', label: 'Knowledge', caption: 'Retrieve private context through hybrid enterprise search.' },
  { id: 'chat', label: 'Collaboration', caption: 'Coordinate people and specialist agents in the flow of work.' },
  { id: 'code', label: 'Code', caption: 'Run the full coding agent panel inside an isolated sandbox.' },
  { id: 'browser', label: 'Browser', caption: 'Collect current external evidence from approved sources.' },
  { id: 'teamspaces', label: 'Teamspaces', caption: 'Persist owners, work state, approvals, and the final decision.' }
  ,{ id: 'meeting-keeper', label: 'Meeting Keeper', caption: 'Capture decisions, evidence, owners, and follow-up from the live meeting.' }
  ,{ id: 'studio', label: 'Multimodal Studio', caption: 'Compose slides, images, and video into one reviewable product story.' }
];

const showcaseLabels = {
  home: 'Understand request', ontology: 'Ground context', apps: 'Plan workflow', 'doc-workspace': 'Write decision',
  library: 'Find evidence', chat: 'Review together', code: 'Act in sandbox', browser: 'Verify sources', teamspaces: 'Remember decision',
  'meeting-keeper': 'Keep meeting memory', studio: 'Create multimodal story'
};

const fallbackChannels = [
  ['finance', 'Finance'], ['legal', 'Legal'], ['manufacturing', 'Manufacturing'], ['customer-support', 'Customer Support'],
  ['logistics', 'Logistics'], ['ecommerce', 'E-commerce'], ['saas', 'SaaS'], ['fashion', 'Fashion']
].map(([id, label]) => ({ id, label, company: label, hook: 'Loading enterprise scenario…', checkpoint: 'Human approval preserved.', outcome: 'Decision state remains reconstructable.', metric: 'Scenario ready' }));

export const DemoWorkspace = ({ compact = false, showcase = false, scenarioId: controlledId, onScenarioChange, activeSceneIndex, onActiveSceneChange }) => {
  const [internalActive, setInternalActive] = useState(0);
  const [touring, setTouring] = useState(false);
  const [localId, setLocalId] = useState('finance');
  const [channels, setChannels] = useState(fallbackChannels);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      const saved = window.localStorage.getItem('ahi-showcase-sidebar-collapsed');
      return saved === null ? showcase : saved === '1';
    } catch { return showcase; }
  });
  const iframeRef = useRef(null);
  const activeRef = useRef(0);
  const sceneControlled = Number.isInteger(activeSceneIndex);
  const active = sceneControlled ? activeSceneIndex : internalActive;
  activeRef.current = active;
  const scenarioId = controlledId || localId;
  const scene = scenes[active];
  const sceneLabel = showcase ? showcaseLabels[scene.id] : scene.label;
  const sceneCaption = showcase && scene.id === 'library'
    ? 'Rank exact and semantic evidence with source permissions attached.'
    : scene.caption;
  const scenario = useMemo(() => channels.find((item) => item.id === scenarioId) || channels[0], [channels, scenarioId]);

  const sendScenarioToFrame = useCallback(() => {
    if (!scenario?.agents || !iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage({
      type: 'ahi:scenario',
      scenario,
      motion: document.documentElement.dataset.motion || 'cinematic',
      sidebarCollapsed
    }, '*');
  }, [scenario, sidebarCollapsed]);

  useEffect(() => {
    const receiveSidebarState = (event) => {
      if (event.data?.type !== 'ahi:sidebar-state' || typeof event.data.collapsed !== 'boolean') return;
      setSidebarCollapsed(event.data.collapsed);
      try { window.localStorage.setItem('ahi-showcase-sidebar-collapsed', event.data.collapsed ? '1' : '0'); } catch { /* Parent storage can be unavailable in strict embeds. */ }
    };
    window.addEventListener('message', receiveSidebarState);
    return () => window.removeEventListener('message', receiveSidebarState);
  }, []);

  const changeActive = useCallback((next) => {
    const value = typeof next === 'function' ? next(activeRef.current) : next;
    if (!sceneControlled) setInternalActive(value);
    if (onActiveSceneChange) onActiveSceneChange(value);
  }, [onActiveSceneChange, sceneControlled]);

  useEffect(() => {
    let activeRequest = true;
    fetch('/demo/scenarios.json').then((response) => response.json()).then((data) => {
      if (activeRequest && Array.isArray(data) && data.length) setChannels(data);
    }).catch(() => undefined);
    return () => { activeRequest = false; };
  }, []);

  useEffect(() => {
    if (!touring) return undefined;
    const interval = window.setInterval(() => changeActive((current) => (current + 1) % scenes.length), 6000);
    return () => window.clearInterval(interval);
  }, [changeActive, touring]);

  useEffect(() => {
    sendScenarioToFrame();
    window.addEventListener('acoord:motion', sendScenarioToFrame);
    return () => window.removeEventListener('acoord:motion', sendScenarioToFrame);
  }, [active, touring, sendScenarioToFrame]);

  const selectScene = (index) => {
    changeActive(index);
    setTouring(false);
  };

  const selectScenario = (id) => {
    setLocalId(id);
    if (onScenarioChange) onScenarioChange(id);
    changeActive(0);
    setTouring(false);
  };

  const query = `scenario=${encodeURIComponent(scenarioId)}${touring ? '&autoplay=1' : ''}${showcase ? '&lens=capability' : ''}`;

  return (
    <div className={`exported-demo exported-demo-light ${compact ? 'exported-demo-compact' : ''} ${showcase ? 'exported-demo-showcase' : ''}`} data-testid="exported-html-demo">
      <div className="demo-channel-shell" data-testid="enterprise-demo-channels">
        <div className="demo-channel-heading">
          <span data-testid="demo-channel-label">Choose the enterprise channel</span>
          <strong data-testid="demo-channel-instruction">One operating problem. Eleven connected surfaces. Every step explainable.</strong>
        </div>
        <div className="demo-channel-list" role="tablist" aria-label="Enterprise demo channels">
          {channels.map((channel) => (
            <button key={channel.id} type="button" role="tab" aria-selected={channel.id === scenarioId} className={channel.id === scenarioId ? 'active' : ''} onClick={() => selectScenario(channel.id)} data-testid={`demo-channel-${channel.id}-tab`}>{channel.label}</button>
          ))}
        </div>
      </div>

      <div className="demo-chapter-bar" data-testid="demo-chapter-navigation">
        <div className="demo-chapter-copy">
          <span data-testid="demo-active-scene-number">{String(active + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}</span>
          <strong data-testid="demo-active-scene-title">{sceneLabel}</strong>
          <p data-testid="demo-active-scene-caption">{sceneCaption}</p>
        </div>
        <div className="demo-chapter-actions">
          <span className="demo-mock-label" data-testid="demo-mock-label">MOCKED SCENARIO / WORKING SIMULATION</span>
          <button type="button" onClick={() => setTouring((current) => !current)} data-testid="demo-guided-tour-button">
            {touring ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
            {touring ? 'Pause enterprise run' : 'Play enterprise run'}
          </button>
          <a href={`/demo/demopages/${scene.id}.html?scenario=${encodeURIComponent(scenarioId)}`} target="_blank" rel="noreferrer" aria-label="Open current demo scene full screen" data-testid="demo-fullscreen-link"><Maximize2 size={16} /></a>
        </div>
      </div>
      <div className="demo-scene-tabs" role="tablist" aria-label="Ahi workspace scenes" data-testid="demo-scene-tabs">
        {scenes.map((item, index) => (
          <button key={item.id} type="button" role="tab" aria-selected={index === active} className={index === active ? 'active' : ''} onClick={() => selectScene(index)} data-testid={`demo-scene-${item.id}-tab`}>{item.label}</button>
        ))}
      </div>
      <div className={`demo-frame-shell ${touring ? 'is-touring' : ''}`}>
        <div className="demo-window-bar" aria-hidden="true"><i /><i /><i /><span>{scenario.label.toUpperCase()} / {sceneLabel.toUpperCase()} / AHI DESKTOP</span><b>{sceneCaption}</b></div>
        <iframe ref={iframeRef} onLoad={sendScenarioToFrame} key={`${scenario.id}-${scene.id}-${touring}`} className="demo-export-frame" src={`/demo/demopages/${scene.id}.html?${query}`} title={`${scenario.label} ${sceneLabel} Ahi simulation`} sandbox="allow-scripts allow-forms allow-modals" data-testid="demo-export-iframe" />
        <span className="demo-tour-progress" aria-hidden="true" />
      </div>
      <div className="demo-story-continuity" data-testid="demo-story-continuity"><span>{scenario.label}</span><i /><strong>{scene.label}</strong><i /><span>Human checkpoint</span><ArrowRight size={15} /><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="demo-scenario-book-call-link">Book a demo</a></div>
    </div>
  );
};