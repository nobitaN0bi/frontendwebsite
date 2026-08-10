import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { investorPersonas } from '../../data/personaJourneys';
import { FilmStage } from './FilmStage';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const PersonaGateway = () => {
  const [params] = useSearchParams();
  const [phase, setPhase] = useState(params.get('intent') === 'investor' ? 4 : 0);
  const reduced = useInvestorReducedMotion();

  useEffect(() => {
    if (reduced) { setPhase(4); return undefined; }
    const timers = [500, 1150, 1850, 2550].map((delay, index) => window.setTimeout(() => setPhase((current) => Math.max(current, index + 1)), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  const formationSignal = ['CAPITAL / 00:00', 'THESIS / LOCATED', 'PROOF / CONNECTING', 'OPERATING LINE / FORMED', 'SELECT INVESTOR LENS'][phase];
  return <div className="cinematic-gateway investor-only-gateway" data-testid="persona-gateway"><header><span>ACOORD / INVESTOR</span><b>{formationSignal}</b><button type="button" onClick={() => setPhase(4)} data-testid="persona-gateway-skip-button">Skip formation</button></header><div className={`gateway-system ${phase === 4 ? 'formed' : ''}`} data-testid="investor-gateway-stage"><FilmStage variant="gateway" active={phase} signal={formationSignal} /></div>{phase === 4 && <motion.section className="gateway-choice-layer investor-paths" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} data-testid="persona-investor-step"><div><p data-testid="persona-investor-kicker">INVESTOR / THREE QUESTIONS</p><h1 data-testid="persona-investor-title">Where do you enter the thesis?</h1><span data-testid="persona-investor-description">Choose the question you need the live product to answer.</span></div><nav data-testid="persona-investor-choices">{investorPersonas.map((persona, index) => <Link key={persona.id} to={persona.route} data-testid={`persona-investor-${persona.id}-link`}><span>0{index + 1}</span><strong>{persona.label}</strong><small>{persona.note}</small><ArrowUpRight /></Link>)}</nav></motion.section>}</div>;
};