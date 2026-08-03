import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoWorkspace } from '../components/DemoWorkspace';
import { FloatingCallout } from './FloatingCallout';

const callouts = [
  { id: 'routing', label: 'Intent routing', copy: 'One request becomes a bounded operating plan.', position: 'top-left' },
  { id: 'ontology', label: 'Living ontology', copy: 'People, policy, systems, and evidence resolve into one graph.', position: 'mid-right' },
  { id: 'execution', label: 'Agent execution', copy: 'Specialists act through approved tools inside visible limits.', position: 'bottom-left' },
  { id: 'approval', label: 'Human approval', copy: 'Authority stops exactly where judgment must remain human.', position: 'bottom-right' },
  { id: 'audit', label: 'Decision record', copy: 'Every input, action, and sign-off survives the run.', position: 'top-right' }
];

export const MacBookDemoHero = ({ scenarioId, onScenarioChange }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stripRef = useRef(null);
  const pillRef = useRef(null);
  const systemReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const laptopScale = useTransform(scrollYProgress, [0.05, 0.38], [0.64, 1]);
  const laptopY = useTransform(scrollYProgress, [0.05, 0.38], [150, 28]);
  const lidRotate = useTransform(scrollYProgress, [0.04, 0.33], [-76, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const railScale = useTransform(scrollYProgress, [0.38, 0.88], [0, 1]);
  const reduced = Boolean(systemReduced);

  useEffect(() => {
    if (reduced) return undefined;
    const unsubscribe = [
      introOpacity.on('change', (value) => {
        if (!headingRef.current) return;
        headingRef.current.style.opacity = String(value);
        headingRef.current.style.pointerEvents = value <= 0.02 ? 'none' : 'auto';
      }),
      scrollYProgress.on('change', (value) => {
        if (!stripRef.current || !pillRef.current) return;
        const lift = Math.min(1, Math.max(0, (value - 0.3) / 0.2));
        const stripTop = 55 - lift * 46;
        stripRef.current.style.top = `${stripTop}%`;
        pillRef.current.style.top = `calc(${stripTop}% + 64px)`;
      })
    ];
    return () => unsubscribe.forEach((stop) => stop());
  }, [reduced, introOpacity, scrollYProgress]);

  return (
    <section ref={sectionRef} className={`usecase-product-showcase scene-snap ${reduced ? 'is-reduced' : ''}`} id="watch-demo" data-testid="watch-demo-section">
      <div className="usecase-showcase-sticky">
        <header ref={headingRef} className="usecase-showcase-heading">
          <p data-testid="watch-demo-kicker">14 / THE REAL PRODUCT</p>
          <h2 data-testid="watch-demo-title">Introducing AHI</h2>
          <p data-testid="watch-demo-description">Nine connected surfaces. One real product shell. Follow a modeled enterprise decision while every boundary, handoff, and approval stays visible.</p>
        </header>

        <div ref={stripRef} className="demo-channel-strip-holder" data-testid="demo-channel-strip" />

        <div ref={pillRef} className="demo-player-pill-holder" data-testid="demo-player-pill" />

        <motion.div className="macbook-stage" style={{ scale: reduced ? 1 : laptopScale, y: reduced ? 0 : laptopY }} data-testid="macbook-demo-stage">
          <motion.div className="macbook-lid" style={{ rotateX: reduced ? 0 : lidRotate }} data-testid="macbook-opening-animation">
            <div className="macbook-camera" aria-hidden="true" />
            <div className="macbook-screen" data-testid="macbook-live-screen">
              <DemoWorkspace compact showcase scenarioId={scenarioId} onScenarioChange={onScenarioChange} />
            </div>
          </motion.div>
          <div className="macbook-base" aria-hidden="true"><i /></div>
        </motion.div>

        {callouts.map((item, index) => (
          <FloatingCallout key={item.id} progress={scrollYProgress} reduced={reduced} item={item} index={index} />
        ))}

        <div className="demo-ontology-rail" data-testid="demo-ontology-rail">
          <span>INTENT</span><i /><span>ONTOLOGY</span><i /><span>EXECUTION</span><i /><span>APPROVAL</span><i /><span>RECORD</span>
          <motion.b style={{ scaleX: reduced ? 1 : railScale }} aria-hidden="true" />
        </div>

        <Link className="demo-showcase-link" to="/demo" data-testid="watch-demo-page-link">Open the full product walkthrough <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
};