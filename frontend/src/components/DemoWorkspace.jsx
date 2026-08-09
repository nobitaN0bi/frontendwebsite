import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
];

const fallbackChannels = [
  ['finance', 'Finance'], ['legal', 'Legal'], ['manufacturing', 'Manufacturing'], ['customer-support', 'Customer Support'],
  ['logistics', 'Logistics'], ['ecommerce', 'E-commerce'], ['saas', 'SaaS'], ['fashion', 'Fashion']
].map(([id, label]) => ({ id, label, company: label, hook: 'Loading enterprise scenario…', checkpoint: 'Human approval preserved.', outcome: 'Decision state remains reconstructable.', metric: 'Scenario ready' }));

export const DemoWorkspace = ({ compact = false, showcase = false, scenarioId: controlledId, onScenarioChange }) => {
  const [active, setActive] = useState(0);
  const [touring, setTouring] = useState(false);
  const [localId, setLocalId] = useState('finance');
  const [channels, setChannels] = useState(fallbackChannels);
  const [stripRoot, setStripRoot] = useState(null);
  const [pillRoot, setPillRoot] = useState(null);
  const [liveStatus, setLiveStatus] = useState(null);
  const iframeRef = useRef(null);
  const scenarioId = controlledId || localId;
  const scene = scenes[active];
  const scenario = useMemo(() => channels.find((item) => item.id === scenarioId) || channels[0], [channels, scenarioId]);

  useLayoutEffect(() => {
    if (!showcase) return undefined;
    setStripRoot(document.querySelector('.demo-channel-strip-holder'));
    setPillRoot(document.querySelector('.demo-player-pill-holder'));
    return undefined;
  }, [showcase]);

  const sendScenarioToFrame = useCallback(() => {
    if (!scenario?.agents || !iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage({
      type: 'ahi:scenario',
      scenario,
      motion: 'cinematic'
    }, '*');
  }, [scenario]);

  useEffect(() => {
    let activeRequest = true;
    fetch('/demo/scenarios.json').then((response) => response.json()).then((data) => {
      if (activeRequest && Array.isArray(data) && data.length) setChannels(data);
    }).catch(() => undefined);
    return () => { activeRequest = false; };
  }, []);

  useEffect(() => {
    const onMessage = (event) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'ahi:status') setLiveStatus(event.data.status);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (!touring) return undefined;
    const interval = window.setInterval(() => setActive((current) => (current + 1) % scenes.length), 6000);
    return () => window.clearInterval(interval);
  }, [touring]);

  useEffect(() => {
    sendScenarioToFrame();
  }, [active, touring, sendScenarioToFrame]);

  const selectScene = (index) => {
    setActive(index);
    setTouring(false);
    setLiveStatus(null);
  };

  const selectScenario = (id) => {
    setLocalId(id);
    if (onScenarioChange) onScenarioChange(id);
    setActive(0);
    setTouring(false);
    setLiveStatus(null);
  };

  const query = `scenario=${encodeURIComponent(scenarioId)}${touring ? '&autoplay=1' : ''}`;

  const channelShell = (
    <div className="demo-channel-shell" data-testid="enterprise-demo-channels">
      <div className="demo-channel-heading">
        <span data-testid="demo-channel-label">Choose the enterprise channel</span>
        <strong data-testid="demo-channel-instruction">One operating problem. Nine connected surfaces. Every step explainable.</strong>
      </div>
      <div className="demo-channel-list" role="tablist" aria-label="Enterprise demo channels">
        {channels.map((channel) => (
          <button key={channel.id} type="button" role="tab" aria-selected={channel.id === scenarioId} className={channel.id === scenarioId ? 'active' : ''} onClick={() => selectScenario(channel.id)} data-testid={`demo-channel-${channel.id}-tab`}>{channel.label}</button>
        ))}
      </div>
    </div>
  );

  const chapterBar = (
    <div className="demo-chapter-bar" data-testid="demo-chapter-navigation">
      <div className="demo-chapter-copy">
        <span data-testid="demo-active-scene-number">0{active + 1} / 0{scenes.length}</span>
        <strong data-testid="demo-active-scene-title">{scene.label}</strong>
        <p data-testid="demo-active-scene-caption">{scene.caption}</p>
      </div>
      <div className="demo-chapter-actions">
        <span className="demo-scenario-subtitle" data-testid="demo-scenario-subtitle" aria-live="polite">{touring && liveStatus ? `${scenario.label} / ${scene.label} — ${liveStatus}` : `${scenario.label} / ${scene.label} — ${scene.caption}`}</span>
        <span className="demo-mock-label" data-testid="demo-mock-label">MOCKED SCENARIO / WORKING SIMULATION</span>
        <button type="button" onClick={() => { setTouring((current) => !current); setLiveStatus(null); }} data-testid="demo-guided-tour-button">
          {touring ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
          {touring ? 'Pause enterprise run' : 'Play enterprise run'}
        </button>
        <a href={`/demo/demopages/${scene.id}.html?scenario=${encodeURIComponent(scenarioId)}`} target="_blank" rel="noreferrer" aria-label="Open current demo scene full screen" data-testid="demo-fullscreen-link"><Maximize2 size={16} /></a>
      </div>
    </div>
  );

  const playerPill = (
    <div className="demo-player-pill" data-testid="demo-player-pill">
      <span data-testid="demo-active-scene-number">0{active + 1} / 0{scenes.length}</span>
      <button type="button" onClick={() => setTouring((current) => !current)} aria-label={touring ? 'Pause enterprise run' : 'Play enterprise run'} data-testid="demo-guided-tour-button">
        {touring ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
      </button>
    </div>
  );

  return (
    <>
      <div className={`exported-demo exported-demo-light ${compact ? 'exported-demo-compact' : ''} ${showcase ? 'exported-demo-showcase' : ''}`} data-testid="exported-html-demo">
        {!showcase ? channelShell : null}
        {!showcase ? chapterBar : null}
        {!showcase ? (
          <div className="demo-scene-tabs" role="tablist" aria-label="Ahi workspace scenes" data-testid="demo-scene-tabs">
            {scenes.map((item, index) => (
              <button key={item.id} type="button" role="tab" aria-selected={index === active} className={index === active ? 'active' : ''} onClick={() => selectScene(index)} data-testid={`demo-scene-${item.id}-tab`}>{item.label}</button>
            ))}
          </div>
        ) : null}
        <div className={`demo-frame-shell ${touring ? 'is-touring' : ''}`}>
          <div className="demo-window-bar" aria-hidden="true"><i /><i /><i /><span>{scenario.label.toUpperCase()} / {scene.label.toUpperCase()} / AHI DESKTOP</span><b>{scene.caption}</b></div>
          <iframe ref={iframeRef} onLoad={sendScenarioToFrame} key={`${scenario.id}-${scene.id}-${touring}`} className="demo-export-frame" src={`/demo/demopages/${scene.id}.html?${query}`} title={`${scenario.label} ${scene.label} Ahi simulation`} sandbox="allow-scripts allow-forms allow-modals" data-testid="demo-export-iframe" />
          <span className="demo-tour-progress" aria-hidden="true" />
        </div>
        <div className="demo-story-continuity" data-testid="demo-story-continuity"><span>{scenario.label}</span><i /><strong>{scene.label}</strong><i /><span>Human checkpoint</span><ArrowRight size={15} /><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="demo-scenario-book-call-link">Book a demo</a></div>
      </div>
      {showcase && stripRoot ? createPortal(channelShell, stripRoot) : null}
      {showcase && pillRoot ? createPortal(playerPill, pillRoot) : null}
    </>
  );
};