import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { investorPersonas } from '../../data/personaJourneys';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const PersonaGateway = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [intent, setIntent] = useState(params.get('intent') === 'investor' ? 'investor' : 'root');
  const reduced = useInvestorReducedMotion();

  const chooseInvestor = () => {
    setIntent('investor');
    setParams({ intent: 'investor' });
  };

  const reset = () => {
    setIntent('root');
    setParams({});
  };

  return (
    <div className="persona-gateway" data-testid="persona-gateway">
      <div className="persona-gateway-image" aria-hidden="true" />
      <div className="persona-grid-lines" aria-hidden="true" />
      <AnimatePresence mode="wait">
        {intent === 'root' ? (
          <motion.section key="root" className="persona-gateway-stage" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0, y: -20 }} data-testid="persona-gateway-root">
            <div className="persona-gateway-thesis">
              <p className="persona-label" data-testid="persona-gateway-kicker">ACOORD / SELECT YOUR LENS</p>
              <h1 data-testid="persona-gateway-title">The same system.<br /><span>Different stakes.</span></h1>
              <p data-testid="persona-gateway-description">Choose the question you need this product to answer. The next page is built around that decision.</p>
            </div>
            <div className="persona-primary-choices" data-testid="persona-primary-choices">
              <button type="button" onClick={chooseInvestor} data-testid="persona-choice-investor">
                <span>01 / CAPITAL</span><strong>Investor</strong><p>Why this category, why now, and what compounds?</p><ArrowUpRight aria-hidden="true" />
              </button>
              <button type="button" onClick={() => navigate('/investor/customer')} data-testid="persona-choice-customer">
                <span>02 / OPERATIONS</span><strong>Customer</strong><p>How does this change work inside my team and industry?</p><ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.section key="investor" className="persona-gateway-stage persona-investor-stage" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0 }} data-testid="persona-investor-step">
            <div className="persona-gateway-thesis">
              <button type="button" className="persona-back" onClick={reset} data-testid="persona-investor-back-button"><ArrowLeft size={15} /> Change path</button>
              <p className="persona-label" data-testid="persona-investor-kicker">INVESTOR / CHOOSE THE QUESTION</p>
              <h1 data-testid="persona-investor-title">Where do you<br /><span>enter the thesis?</span></h1>
            </div>
            <div className="persona-secondary-choices" data-testid="persona-investor-choices">
              {investorPersonas.map((persona, index) => (
                <Link key={persona.id} to={persona.route} data-testid={`persona-investor-${persona.id}-link`}>
                  <span>{String(index + 1).padStart(2, '0')}</span><div><strong>{persona.label}</strong><p>{persona.note}</p></div><ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <div className="persona-signal" data-testid="persona-gateway-signal"><span>INTELLIGENCE / ABUNDANT</span><span>COORDINATION / SCARCE</span><b>AHI / ACTIVE</b></div>
    </div>
  );
};