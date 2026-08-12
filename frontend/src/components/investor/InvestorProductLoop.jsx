import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScanEye } from 'lucide-react';
import { investorProductScenario } from '../../data/investorProductScenario';
import { DemoWorkspace } from '../DemoWorkspace';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const productReel = [
  { scene: 0, title: 'Understand the investor question', explanation: 'Intent enters one operating context before any agent acts.' },
  { scene: 1, title: 'Ground the company context', explanation: 'Product, evidence, people, and policy resolve into one graph.' },
  { scene: 2, title: 'Compile the diligence workflow', explanation: 'Specialists receive bounded tasks, tools, and checkpoints.' },
  { scene: 3, title: 'Write the evidence brief', explanation: 'Claims and citations become one reviewable decision document.' },
  { scene: 4, title: 'Retrieve trusted knowledge', explanation: 'Private context returns with permissions and sources attached.' },
  { scene: 5, title: 'Coordinate the review', explanation: 'People and agents work together without hiding the approval line.' },
  { scene: 6, title: 'Verify in a sandbox', explanation: 'Bounded code tests claims without production write access.' },
  { scene: 7, title: 'Inspect current evidence', explanation: 'Approved external sources enter the same cited context.' },
  { scene: 8, title: 'Persist the decision state', explanation: 'Owners, tasks, approvals, and outcomes survive the run.' },
  { scene: 9, title: 'Keep the meeting memory', explanation: 'Decisions and follow-ups are captured while the discussion happens.' },
  { scene: 10, title: 'Compose the investor story', explanation: 'Slides, images, and product scenes become a reviewable brief.' }
];

const phaseDuration = {
  opening: 1200,
  playing: 3400,
  closing: 1050,
  closed: 650
};

export const InvestorProductLoop = () => {
  const reduced = useInvestorReducedMotion();
  const [phase, setPhase] = useState(reduced ? 'playing' : 'opening');
  const [frameIndex, setFrameIndex] = useState(0);
  const frame = productReel[frameIndex];

  useEffect(() => {
    if (reduced) {
      setPhase('playing');
      setFrameIndex(0);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      if (phase === 'opening') setPhase('playing');
      if (phase === 'playing' && frameIndex < productReel.length - 1) setFrameIndex((current) => current + 1);
      if (phase === 'playing' && frameIndex === productReel.length - 1) setPhase('closing');
      if (phase === 'closing') setPhase('closed');
      if (phase === 'closed') {
        setFrameIndex(0);
        setPhase('opening');
      }
    }, phaseDuration[phase]);

    return () => window.clearTimeout(timer);
  }, [frameIndex, phase, reduced]);

  const lidClosed = phase === 'closing' || phase === 'closed';

  return (
    <aside className="investor-product-loop" aria-label="Automated product demo loop" data-testid="investor-product-demo-loop">
      <div className="investor-loop-stage">
        <motion.div
          className="investor-loop-laptop"
          initial={reduced ? false : { y: 18, opacity: 0 }}
          animate={{ y: phase === 'closed' && !reduced ? 10 : 0, opacity: phase === 'closed' && !reduced ? 0.72 : 1 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.215, 0.61, 0.355, 1] }}
          data-testid="investor-loop-macbook"
        >
          <div className="investor-loop-transparency" role="img" aria-label="Transparent, explainable product run" title="Transparent product run" data-testid="investor-transparency-icon">
            <ScanEye size={14} strokeWidth={1.7} />
          </div>
          <motion.div
            className="investor-loop-lid"
            initial={reduced ? false : { rotateX: -86 }}
            animate={{ rotateX: reduced ? 0 : lidClosed ? -86 : 0 }}
            transition={{ duration: reduced ? 0 : 1.05, ease: [0.645, 0.045, 0.355, 1] }}
            data-testid="investor-loop-macbook-lid"
          >
            <div className="investor-loop-camera" aria-hidden="true" />
            <div className="investor-loop-screen" data-testid="investor-loop-product-screen">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={frame.scene}
                  initial={reduced ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: phase === 'closed' ? 0 : 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -8 }}
                  transition={{ duration: reduced ? 0 : 0.22, ease: [0.215, 0.61, 0.355, 1] }}
                  data-testid="investor-loop-product-player"
                >
                  <DemoWorkspace compact showcase autoPlaySimulation scenarioOverride={investorProductScenario} activeSceneIndex={frame.scene} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <div className="investor-loop-base" aria-hidden="true"><i /></div>
        </motion.div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`caption-${frame.scene}`}
            className="investor-loop-caption"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: phase === 'closed' ? 0 : 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: [0.215, 0.61, 0.355, 1] }}
            data-testid="investor-loop-explanation"
          >
            <span>{String(frame.scene + 1).padStart(2, '0')} / 11 · INVESTOR PRODUCT REEL</span>
            <strong data-testid="investor-loop-explanation-title">{frame.title}</strong>
            <p data-testid="investor-loop-explanation-copy">{frame.explanation}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
};