import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DemoWorkspace } from '../DemoWorkspace';
import { featureDialogs } from '../../data/investorContent';
import { InvestorReveal } from './InvestorReveal';

export const InvestorLaptopDemo = ({ scenarioId, onScenarioChange }) => {
  const [activeScene, setActiveScene] = useState(0);
  const [siteReduced, setSiteReduced] = useState(document.documentElement.dataset.motion === 'reduced');
  const systemReduced = useReducedMotion();
  const reduced = Boolean(systemReduced || siteReduced);
  const dialog = featureDialogs[activeScene];

  useEffect(() => {
    const sync = () => setSiteReduced(document.documentElement.dataset.motion === 'reduced');
    window.addEventListener('acoord:motion', sync);
    return () => window.removeEventListener('acoord:motion', sync);
  }, []);

  return (
    <section className="investor-demo-section" id="investor-demo" data-testid="investor-product-demo-section">
      <InvestorReveal className="investor-demo-head" testId="investor-demo-heading">
        <p className="investor-kicker">03 / THE PRODUCT</p>
        <h2>Nine surfaces.<br />One decision line.</h2>
        <p>Move through the live product shell. Every tab changes the explanation layer over the laptop, revealing the system primitive and the human boundary behind that feature.</p>
      </InvestorReveal>

      <motion.div
        className="investor-laptop-stage"
        initial={reduced ? false : { opacity: 0, y: 64 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        data-testid="investor-laptop-stage"
      >
        <div className="investor-laptop-lid" data-testid="investor-laptop-frame">
          <div className="investor-laptop-camera" aria-hidden="true" />
          <div className="investor-laptop-screen" data-testid="investor-laptop-live-screen">
            <DemoWorkspace compact showcase scenarioId={scenarioId} onScenarioChange={onScenarioChange} onActiveSceneChange={setActiveScene} />
          </div>
        </div>
        <div className="investor-laptop-base" aria-hidden="true"><i /></div>

        <AnimatePresence mode="wait">
          <motion.article
            key={dialog.id}
            className={`investor-feature-dialog dialog-${dialog.position}`}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            data-testid={`investor-dialog-${dialog.id}`}
          >
            <span>{String(activeScene + 1).padStart(2, '0')} / {dialog.primitive}</span>
            <h3>{dialog.title}</h3>
            <p>{dialog.copy}</p>
            <i aria-hidden="true" />
          </motion.article>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.aside
            key={`${dialog.id}-checkpoint`}
            className="investor-checkpoint-dialog"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : 0.09, ease: [0.16, 1, 0.3, 1] }}
            data-testid={`investor-checkpoint-${dialog.id}`}
          >
            <span>HUMAN LINE</span><p>{dialog.checkpoint}</p>
          </motion.aside>
        </AnimatePresence>
      </motion.div>
      <p className="investor-demo-disclaimer" data-testid="investor-demo-disclaimer"><strong>MOCKED SCENARIO</strong> / The interface and controls are working product surfaces. Companies, runs, and outcomes shown inside the demo are modeled for product storytelling and are not customer claims.</p>
    </section>
  );
};