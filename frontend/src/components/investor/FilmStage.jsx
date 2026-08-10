import { motion } from 'framer-motion';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const layouts = {
  gateway: [[24, 33], [24, 68], [50, 50], [75, 31], [76, 69]],
  venture: [[25, 31], [26, 69], [50, 50], [74, 31], [75, 69]],
  strategic: [[18, 25], [18, 74], [50, 50], [80, 25], [80, 74]],
  operator: [[12, 50], [30, 50], [50, 50], [69, 50], [87, 50]],
  executive: [[20, 30], [20, 70], [50, 50], [78, 30], [78, 70]],
  technical: [[13, 52], [31, 32], [50, 52], [69, 32], [87, 52]],
  workflow: [[18, 50], [34, 27], [52, 50], [70, 27], [84, 55]]
};

const systems = [
  { id: 'search', label: 'ENTERPRISE SEARCH', from: 1 },
  { id: 'onyx', label: 'ONYX', from: 1 },
  { id: 'aigis', label: 'AIGIS', from: 2 },
  { id: 'colanode', label: 'COLANODE', from: 3 },
  { id: 'deerflow', label: 'DEERFLOW', from: 4 }
];

export const FilmStage = ({ variant, active, signal }) => {
  const reduced = useInvestorReducedMotion();
  const positions = layouts[variant] || layouts.operator;
  const duration = reduced ? 0 : .7;
  const activeSystem = variant === 'gateway' ? systems[Math.max(0, active - 1)]?.id : null;
  const packetStops = positions.map(([x, y]) => ({ left: `${x}%`, top: `${y}%` }));
  const packetIndex = Math.min(4, active);

  return <div className={`film-stage film-stage-${variant}`} data-testid={`${variant}-animated-stage`}>
    <div className="film-stage-readout"><span>AHI / LIVE SYSTEM MAP</span><b>{signal}</b></div>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d={`M ${positions[0][0]} ${positions[0][1]} L ${positions[2][0]} ${positions[2][1]}`} animate={{ pathLength: active >= 1 ? 1 : 0 }} transition={{ duration }} />
      <motion.path d={`M ${positions[1][0]} ${positions[1][1]} L ${positions[2][0]} ${positions[2][1]}`} animate={{ pathLength: active >= 1 ? 1 : 0 }} transition={{ duration, delay: reduced ? 0 : .12 }} />
      <motion.path d={`M ${positions[2][0]} ${positions[2][1]} L ${positions[3][0]} ${positions[3][1]}`} animate={{ pathLength: active >= 2 ? 1 : 0 }} transition={{ duration }} />
      <motion.path d={`M ${positions[2][0]} ${positions[2][1]} L ${positions[4][0]} ${positions[4][1]}`} animate={{ pathLength: active >= 3 ? 1 : 0 }} transition={{ duration }} />
      <motion.path d={`M ${positions[3][0]} ${positions[3][1]} L ${positions[4][0]} ${positions[4][1]}`} animate={{ pathLength: active >= 4 ? 1 : 0 }} transition={{ duration }} />
    </svg>

    {variant === 'venture' && <div className="film-particles" aria-hidden="true">{Array.from({ length: 24 }, (_, index) => <motion.i key={index} animate={{ x: active < 2 ? ((index % 6) - 3) * 18 : ((index % 4) - 1.5) * 6, y: active < 2 ? ((index % 5) - 2) * 14 : 0, opacity: active === 0 ? .85 : active === 1 ? .45 : .12 }} transition={{ duration, delay: reduced ? 0 : index * .01 }} />)}</div>}
    {variant === 'strategic' && <div className="film-silos" aria-hidden="true"><span>ERP</span><span>CRM</span><span>IDENTITY</span><span>DATA</span><span>MODELS</span><span>TOOLS</span></div>}
    {variant === 'technical' && active === 1 && <motion.div className="film-rrf" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}><span>BM25</span><i /><i /><i /><b>RRF</b><i /><i /><i /><span>DENSE</span></motion.div>}
    {variant === 'workflow' && active >= 3 && <div className="film-cursors" aria-hidden="true"><motion.i animate={{ x: [0, 26, 8], y: [0, -16, 12] }} transition={{ duration: reduced ? 0 : 3, repeat: reduced ? 0 : Infinity }} /><motion.i animate={{ x: [0, -18, 12], y: [0, 20, -8] }} transition={{ duration: reduced ? 0 : 3.6, repeat: reduced ? 0 : Infinity }} /></div>}

    {systems.map((system, index) => {
      const [x, y] = positions[index];
      const visible = variant === 'gateway' ? active >= Math.min(3, system.from) : active >= Math.max(1, system.from - 1);
      const current = activeSystem === system.id || (variant !== 'gateway' && active === Math.min(4, system.from));
      return <motion.div key={system.id} className={`film-system-node ${current ? 'active' : ''} node-${system.id}`} style={{ left: `${x}%`, top: `${y}%` }} initial={false} animate={{ opacity: visible ? 1 : .08, scale: current ? 1.08 : 1 }} transition={{ duration }} data-testid={`${variant}-stage-${system.id}-node`}><i /><span>{String(index + 1).padStart(2, '0')}</span><strong>{system.label}</strong></motion.div>;
    })}

    {variant !== 'venture' && variant !== 'strategic' && <motion.div className="film-packet" animate={packetStops[packetIndex]} transition={{ duration: reduced ? 0 : .85, ease: [0.16, 1, 0.3, 1] }}><span>REQ</span></motion.div>}
    <motion.div className="film-aigis-boundary" animate={{ opacity: active >= 2 ? 1 : 0, scale: active >= 2 ? 1 : .84 }} transition={{ duration }} aria-hidden="true"><span>CHECKPOINTED EXECUTION</span></motion.div>
    <motion.div className={`film-human-line ${active >= 3 ? 'visible' : ''}`} animate={{ opacity: active >= 3 ? 1 : 0, x: active >= 3 ? 0 : 18 }} transition={{ duration }} data-testid={`${variant}-human-authority-node`}><i /><span>HUMAN AUTHORITY</span><b>{active >= 4 ? 'RECORDED' : 'REVIEW'}</b></motion.div>
    <div className="film-audit-line"><span>EVENTS</span><motion.b animate={{ width: `${Math.max(8, (active + 1) * 19)}%` }} transition={{ duration }} /></div>
  </div>;
};