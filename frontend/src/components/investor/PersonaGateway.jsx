import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { investorPersonas } from '../../data/personaJourneys';
import { FilmStage } from './FilmStage';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const PersonaGateway = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [phase, setPhase] = useState(params.get('intent') === 'investor' ? 4 : 0);
  const [mode, setMode] = useState(params.get('intent') === 'investor' ? 'investor' : 'root');
  const reduced = useInvestorReducedMotion();

  useEffect(() => {
    if (reduced) { setPhase(4); return undefined; }
    const timers = [500, 1150, 1850, 2550].map((delay, index) => window.setTimeout(() => setPhase((current) => Math.max(current, index + 1)), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  const chooseInvestor = () => { setMode('investor'); setParams({ intent: 'investor' }); };
  const reset = () => { setMode('root'); setParams({}); };
  const formationSignal = ['COORDINATE / 00:00', 'SYSTEMS / LOCATED', 'CONNECTIONS / DRAWING', 'OPERATING LINE / FORMED', 'CHOOSE YOUR STAKES'][phase];

  return <div className="cinematic-gateway" data-testid="persona-gateway">
    <header><span>ACOORD / AHI</span><b>{formationSignal}</b><button type="button" onClick={() => setPhase(4)} data-testid="persona-gateway-skip-button">Skip formation</button></header>
    <div className={`gateway-system ${phase === 4 ? 'formed' : ''}`} data-testid="investor-gateway-stage"><FilmStage variant="gateway" active={phase} signal={formationSignal} /></div>
    <AnimatePresence mode="wait">
      {phase === 4 && mode === 'root' && <motion.section key="root" className="gateway-choice-layer" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0 }} data-testid="persona-gateway-root"><div><p data-testid="persona-gateway-kicker">THE SYSTEM IS THE SAME. THE QUESTION CHANGES.</p><h1 data-testid="persona-gateway-title">Choose the stakes.</h1><span data-testid="persona-gateway-description">Enter through the decision you need Ahi to explain.</span></div><nav data-testid="persona-primary-choices"><button type="button" onClick={chooseInvestor} data-testid="persona-choice-investor"><span>01 / CAPITAL</span><strong>Investor</strong><ArrowUpRight /></button><button type="button" onClick={() => navigate('/investor/customer')} data-testid="persona-choice-customer"><span>02 / OPERATIONS</span><strong>Customer</strong><ArrowUpRight /></button></nav></motion.section>}
      {phase === 4 && mode === 'investor' && <motion.section key="investor" className="gateway-choice-layer investor-paths" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} data-testid="persona-investor-step"><div><button type="button" onClick={reset} data-testid="persona-investor-back-button"><ArrowLeft size={14} /> Change path</button><p data-testid="persona-investor-kicker">INVESTOR / THREE QUESTIONS</p><h1 data-testid="persona-investor-title">Where do you enter?</h1></div><nav data-testid="persona-investor-choices">{investorPersonas.map((persona, index) => <Link key={persona.id} to={persona.route} data-testid={`persona-investor-${persona.id}-link`}><span>0{index + 1}</span><strong>{persona.label}</strong><small>{persona.note}</small><ArrowUpRight /></Link>)}</nav></motion.section>}
    </AnimatePresence>
  </div>;
};