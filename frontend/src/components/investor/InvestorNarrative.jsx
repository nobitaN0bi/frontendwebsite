import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const beats = [
  { label: 'THE ASSUMPTION', title: 'One better model replaces the workflow.', copy: 'That is true only while the model remains a conversation.' },
  { label: 'THE REALITY', title: 'Useful intelligence multiplies actors.', copy: 'Agents add tools, permissions, context, evidence, handoffs, and parallel state.' },
  { label: 'THE CATEGORY', title: 'The interface becomes the control plane.', copy: 'Ahi coordinates the work before capability turns into organisational entropy.' }
];

const nodes = ['INTENT', 'LEAD', 'RESEARCH', 'ANALYST', 'WRITER', 'POLICY', 'SYSTEM', 'EVIDENCE', 'HUMAN'];

export const InvestorNarrative = () => {
  const sectionRef = useRef(null);
  const [beat, setBeat] = useState(0);
  const reduced = useInvestorReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => { if (!reduced) setBeat(Math.min(2, Math.floor(value * 3))); });

  return (
    <section ref={sectionRef} className="investor-coordination" id="coordination-problem" data-testid="investor-coordination-section">
      <div className="investor-coordination-sticky">
        <p className="investor-act-label">ACT II / THE COORDINATION PROBLEM</p>
        <div className="coordination-frame">
          <div className="coordination-narrative" data-testid="investor-coordination-narrative">
            <AnimatePresence mode="wait">
              <motion.div key={beat} initial={reduced ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -16 }} transition={{ duration: .48, ease: [0.16, 1, 0.3, 1] }}>
                <span>{beats[beat].label}</span><h2>{beats[beat].title}</h2><p>{beats[beat].copy}</p>
              </motion.div>
            </AnimatePresence>
            <div className="coordination-beat-rail" aria-hidden="true">{beats.map((item, index) => <i key={item.label} className={index === beat ? 'active' : ''} />)}</div>
          </div>
          <div className={`coordination-visual beat-${beat}`} data-testid="investor-coordination-visual">
            <div className="coordination-window-bar"><span>VISUAL MODE / COORDINATION SURFACE</span><b>{beat + 1} / 3</b></div>
            <div className="coordination-canvas">
              {nodes.map((node, index) => <motion.div key={node} className={`coord-node node-${index}`} animate={{ opacity: index === 0 || beat > 0 ? 1 : 0, y: index === 0 || beat > 0 ? 0 : 18 }} transition={{ duration: .42, delay: reduced ? 0 : index * .035, ease: [0.16, 1, 0.3, 1] }}>{node}</motion.div>)}
              {Array.from({ length: 10 }, (_, index) => <motion.i key={index} className={`coord-line line-${index}`} animate={{ opacity: beat > 0 ? 1 : 0, scaleX: beat > 0 ? 1 : 0 }} transition={{ duration: .58, delay: reduced ? 0 : index * .035, ease: [0.65, 0, 0.35, 1] }} />)}
              <motion.div className="coordination-boundary" animate={{ opacity: beat === 2 ? 1 : 0, y: beat === 2 ? 0 : 12 }} transition={{ duration: .5, ease: [0.16, 1, 0.3, 1] }}><span>AHI CONTROL PLANE</span><p>context · authority · state · record</p></motion.div>
            </div>
            <div className="coordination-status"><span>CAPABILITY ↑</span><span>COORDINATION SURFACE ↑↑</span><strong>{beat === 2 ? 'GOVERNED' : beat === 1 ? 'FRAGMENTING' : 'SIMPLE'}</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
};