import { useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { roadmap } from '../../data/investorContent';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const evidence = {
  built: [['WORKING', 'Eleven connected product surfaces'], ['WORKING', 'Eight scenario-aware enterprise channels'], ['WORKING', 'Decision maps, waitlist, and guided runs'], ['WORKING', 'Human checkpoints and evidence boundaries']],
  modeled: [['MOCKED', 'Companies and operator identities'], ['MOCKED', 'Run volumes and operational outcomes'], ['MODELED', 'Commercial expansion thesis'], ['MODELED', 'Illustrative enterprise workflows']],
  next: roadmap.map(([phase, title, text]) => [phase, title, text]),
  risks: [['RISK', 'Enterprise trust must be earned with verified deployments'], ['RISK', 'Live workspace APIs are not connected in this public demo'], ['RISK', 'Commercial evidence must replace modeled proof'], ['RISK', 'Governance depth must keep pace with agent capability']]
};

export const InvestorCase = ({ onJoin }) => {
  const [view, setView] = useState('built');
  const reduced = useInvestorReducedMotion();
  return (
    <>
      <section className="investor-evidence-room" id="investor-act-5" data-investor-act="5" data-testid="investor-evidence-room-section">
        <div className="evidence-room-head"><p className="investor-act-label">ACT V / THE EVIDENCE ROOM</p><h2 data-testid="investor-evidence-title">Evidence,<br />not theatre.</h2><p data-testid="investor-evidence-description">Product, narrative, milestones, and risk—kept separate.</p></div>
        <div className="evidence-console">
          <div className="evidence-tabs" role="tablist" aria-label="Evidence views">{Object.keys(evidence).map((id) => <button key={id} type="button" role="tab" aria-selected={view === id} className={view === id ? 'active' : ''} onClick={() => setView(id)} data-testid={`investor-evidence-${id}-button`}>{id.toUpperCase()}</button>)}</div>
          <AnimatePresence mode="wait"><motion.div key={view} className="evidence-table" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: .38, ease: [0.16, 1, 0.3, 1] }} data-testid={`investor-evidence-${view}-panel`}>
            {evidence[view].map((row, index) => <article key={`${row[0]}-${row[1]}`} data-testid={`investor-evidence-${view}-row-${index + 1}`}><span>[{row[0]}]</span><strong>{row[1]}</strong>{row[2] && <p>{row[2]}</p>}<b>{String(index + 1).padStart(2, '0')}</b></article>)}
          </motion.div></AnimatePresence>
          <p className="evidence-footnote" data-testid="investor-evidence-footnote">NO TAM, ARR, CUSTOMER, TRACTION, OR FUNDRAISING NUMBERS ARE ASSERTED ON THIS PUBLIC PAGE.</p>
        </div>
      </section>
      <section className="investor-closing" data-testid="investor-closing-section">
        <div className="investor-closing-copy" data-testid="investor-closing-copy"><p className="investor-act-label">THE INVESTMENT QUESTION</p><h2>When every company has agents,<br />where will they work together?</h2><p>Ahi: the interface between abundant intelligence and consequential work.</p><div className="investor-closing-actions"><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" className="investor-button investor-button-light" data-testid="investor-closing-meeting-link">Start a conversation <ArrowUpRight size={16} /></a><button type="button" className="investor-text-link" onClick={onJoin} data-testid="investor-closing-download-button"><Download size={15} /> Join the desktop waitlist</button></div></div>
      </section>
    </>
  );
};