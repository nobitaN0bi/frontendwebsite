import { motion } from 'framer-motion';
import { ahiCapabilities, connectorDestinations, toolsToDitch } from '../../data/ahiEcosystem';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const chunks = (items, size) => Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, (index + 1) * size));

const KineticLane = ({ items, direction, duration, testId }) => {
  const reduced = useInvestorReducedMotion();
  const doubled = [...items, ...items];
  return <div className="kinetic-lane" data-testid={testId}><motion.div animate={reduced ? { x: 0 } : { x: direction > 0 ? ['-48%', '0%'] : ['0%', '-48%'] }} transition={{ duration, repeat: reduced ? 0 : Infinity, ease: 'linear' }}>{doubled.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</motion.div></div>;
};

export const KineticEcosystem = ({ compact = false }) => {
  const reduced = useInvestorReducedMotion();
  const capabilityLanes = chunks(ahiCapabilities, 10);
  const toolLanes = chunks(toolsToDitch, 18);
  const connectorLanes = chunks(connectorDestinations, 24);
  return <div className={`kinetic-ecosystem ${compact ? 'compact' : ''}`} data-testid="kinetic-ecosystem" aria-hidden="true">
    <div className="kinetic-field-label label-capabilities"><span>50</span> AHI CAPABILITIES</div>
    <div className="kinetic-group kinetic-capabilities">{capabilityLanes.map((lane, index) => <KineticLane key={index} items={lane} direction={index % 2 ? 1 : -1} duration={26 + index * 4} testId={`kinetic-capability-lane-${index + 1}`} />)}</div>
    <div className="kinetic-field-label label-tools">DITCH THE STITCHING / {toolsToDitch.length} TOOLS</div>
    <div className="kinetic-group kinetic-tools">{toolLanes.map((lane, index) => <KineticLane key={index} items={lane} direction={1} duration={34 + index * 7} testId={`kinetic-tools-lane-${index + 1}`} />)}</div>
    <div className="kinetic-field-label label-connectors">CONNECT THE SOURCES / {connectorDestinations.length} CONNECTORS</div>
    <div className="kinetic-group kinetic-connectors">{connectorLanes.map((lane, index) => <KineticLane key={index} items={lane} direction={-1} duration={38 + index * 8} testId={`kinetic-connectors-lane-${index + 1}`} />)}</div>
    <motion.div className="kinetic-ahi-core" animate={compact ? { scale: .72, opacity: .35 } : reduced ? { scale: 1, opacity: 1 } : { scale: [1, 1.035, 1], opacity: 1 }} transition={{ duration: 4.5, repeat: compact || reduced ? 0 : Infinity, ease: 'easeInOut' }}><span>a:</span><strong>AHI</strong><i /></motion.div>
  </div>;
};