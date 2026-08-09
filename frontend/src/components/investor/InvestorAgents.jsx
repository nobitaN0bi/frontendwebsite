import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { businessModel, moatLayers } from '../../data/investorContent';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const mandates = [
  ['ORCHESTRATE', 'Reads the intent, assigns the operating plan, and owns the stop conditions.'],
  ['GROUND', 'Retrieves policy, evidence, and organisational context before action.'],
  ['ANALYSE', 'Tests the options inside the workflow’s constraints and surfaces uncertainty.'],
  ['RECORD', 'Turns the run into a cited rationale, approval packet, and durable audit line.']
];

const modes = [
  ['wedge', 'Commercial wedge'], ['cast', 'Operating cast'], ['moat', 'Compounding moat']
];

export const InvestorAgents = ({ scenario }) => {
  const [mode, setMode] = useState('wedge');
  const reduced = useInvestorReducedMotion();
  const agents = scenario?.agents || [];
  return (
    <section className="investor-system" data-testid="investor-system-section">
      <div className="investor-system-copy">
        <p className="investor-act-label">ACT IV / THE SYSTEM</p>
        <h2 data-testid="investor-system-title">Land on friction.<br />Compound on context.</h2>
        <p data-testid="investor-system-description">One commercial system, viewed three ways. No reported revenue or forecast is implied.</p>
        <div className="investor-mode-switcher" role="tablist" aria-label="Investor system views">
          {modes.map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={mode === id} className={mode === id ? 'active' : ''} onClick={() => setMode(id)} data-testid={`investor-mode-${id}-button`}><span>{mode === id ? '●' : '○'}</span>{label}</button>)}
        </div>
      </div>
      <div className="investor-system-visual" data-testid="investor-system-visual">
        <div className="system-window-bar"><span>VISUAL EXPLAINER</span><b>{modes.findIndex(([id]) => id === mode) + 1} / 3</b></div>
        <AnimatePresence mode="wait">
          <motion.div key={mode} className={`system-mode system-mode-${mode}`} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -12 }} transition={{ duration: .46, ease: [0.16, 1, 0.3, 1] }} data-testid={`investor-mode-${mode}-panel`}>
            {mode === 'wedge' && businessModel.map(([label, text], index) => <article key={label} data-testid={`investor-wedge-box-${index + 1}`}><span>0{index + 1}</span><h3>{label}</h3><p>{text}</p>{index < 2 && <i aria-hidden="true" />}</article>)}
            {mode === 'cast' && <><div className="human-owner"><span>HUMAN OWNER</span><strong>{scenario?.owner || 'Operations lead'}</strong><p>{scenario?.role}</p></div>{agents.slice(0, 4).map((agent, index) => <article key={agent} data-testid={`investor-agent-profile-${index + 1}`}><span>{mandates[index][0]}</span><h3>{agent}</h3><p>{mandates[index][1]}</p></article>)}</>}
            {mode === 'moat' && moatLayers.map(([code, title, text]) => <article key={code} data-testid={`investor-moat-layer-${code}`}><span>{code}</span><h3>{title}</h3><p>{text}</p><b>ACCUMULATES</b></article>)}
          </motion.div>
        </AnimatePresence>
        <div className="system-context"><span>ACTIVE MODELED CHANNEL</span><strong>{scenario?.label || 'Finance'} / {scenario?.teamspace || 'Operations'}</strong></div>
      </div>
    </section>
  );
};