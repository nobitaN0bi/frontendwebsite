import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScanEye } from 'lucide-react';
import { DemoWorkspace } from '../DemoWorkspace';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const productReel = [
  { scenario: 'finance', scene: 0 },
  { scenario: 'legal', scene: 3 },
  { scenario: 'manufacturing', scene: 6 },
  { scenario: 'customer-support', scene: 5 },
  { scenario: 'logistics', scene: 1 },
  { scenario: 'ecommerce', scene: 4 },
  { scenario: 'saas', scene: 8 },
  { scenario: 'fashion', scene: 10 }
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
              <motion.div
                animate={{ opacity: phase === 'closed' ? 0 : 1 }}
                transition={{ duration: reduced ? 0 : 0.24, ease: 'easeOut' }}
                data-testid="investor-loop-product-player"
              >
                <DemoWorkspace compact showcase autoPlaySimulation scenarioId={frame.scenario} activeSceneIndex={frame.scene} />
              </motion.div>
            </div>
          </motion.div>
          <div className="investor-loop-base" aria-hidden="true"><i /></div>
        </motion.div>
      </div>
    </aside>
  );
};