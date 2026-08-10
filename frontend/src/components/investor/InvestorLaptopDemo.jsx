import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { DemoWorkspace } from '../DemoWorkspace';
import { featureDialogs } from '../../data/investorContent';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const InvestorLaptopDemo = ({ scenarioId, onScenarioChange }) => {
  const sectionRef = useRef(null);
  const [activeScene, setActiveScene] = useState(0);
  const reduced = useInvestorReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const laptopScale = useTransform(scrollYProgress, [0, .06], [.84, 1]);
  const laptopY = useTransform(scrollYProgress, [0, .06], [72, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, .045, .08], [1, 1, 0]);
  const dialog = featureDialogs[activeScene];

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!reduced && value > .06) setActiveScene(Math.min(8, Math.floor(((value - .06) / .9) * 9)));
  });

  return (
    <section ref={sectionRef} className={`investor-demo-section ${reduced ? 'is-reduced' : ''}`} id="investor-act-3" data-investor-act="3" data-testid="investor-product-demo-section">
      <div className="investor-demo-sticky">
        <motion.div className="investor-demo-intro" style={{ opacity: reduced ? 1 : introOpacity }} data-testid="investor-demo-heading">
          <p className="investor-act-label">ACT III / PRODUCT PROOF</p><h2>Eleven surfaces.<br />One decision line.</h2>
        </motion.div>
        <motion.div className="investor-laptop-stage" style={{ scale: reduced ? 1 : laptopScale, y: reduced ? 0 : laptopY }} data-testid="investor-laptop-stage">
          <div className="investor-laptop-lid" data-testid="investor-laptop-frame">
            <div className="investor-laptop-camera" aria-hidden="true" />
            <div className="investor-laptop-screen" data-testid="investor-laptop-live-screen">
              <DemoWorkspace compact showcase scenarioId={scenarioId} onScenarioChange={onScenarioChange} activeSceneIndex={activeScene} onActiveSceneChange={setActiveScene} />
            </div>
          </div>
          <div className="investor-laptop-base" aria-hidden="true"><i /></div>

          <AnimatePresence mode="wait">
            <motion.article key={dialog.id} className={`investor-feature-dialog dialog-${dialog.position}`} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -14 }} transition={reduced ? { duration: 0 } : { type: 'spring', damping: 22, stiffness: 120 }} data-testid={`investor-dialog-${dialog.id}`}>
              <span>{String(activeScene + 1).padStart(2, '0')} / {dialog.primitive}</span><h3>{dialog.title}</h3><p>{dialog.copy}</p><i aria-hidden="true" />
            </motion.article>
          </AnimatePresence>

          <AnimatePresence mode="wait"><motion.aside key={`${dialog.id}-checkpoint`} className="investor-checkpoint-dialog" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : .38, delay: reduced ? 0 : .08, ease: [0.16, 1, 0.3, 1] }} data-testid={`investor-checkpoint-${dialog.id}`}><span>HUMAN LINE</span><p>{dialog.checkpoint}</p></motion.aside></AnimatePresence>
        </motion.div>
        <div className="investor-demo-rail" data-testid="investor-demo-progress">{featureDialogs.map((item, index) => <button key={item.id} type="button" className={index === activeScene ? 'active' : ''} onClick={() => setActiveScene(index)} data-testid={`investor-demo-step-${item.id}`}><span>0{index + 1}</span><b>{item.label}</b></button>)}</div>
        <p className="investor-demo-disclaimer" data-testid="investor-demo-disclaimer"><strong>MOCKED SCENARIO</strong> / Working product shell. Modeled companies, runs, and outcomes are not customer claims.</p>
      </div>
    </section>
  );
};