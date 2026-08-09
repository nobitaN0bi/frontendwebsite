import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { AsciiArt } from '../../cinematic/AsciiArt';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const lines = ['Intelligence', 'is abundant.', 'Coordination', 'is scarce.'];

export const InvestorHero = () => {
  const reduced = useInvestorReducedMotion();
  return (
    <section className="investor-hero" id="investor-act-1" data-investor-act="1" data-testid="investor-hero-section">
      <div className="investor-hero-art" aria-hidden="true"><AsciiArt src="/ascii/hands-ascii.txt" className="investor-hands-art" /></div>
      <p className="investor-act-label" data-testid="investor-hero-kicker">ACT I / THE CONVICTION</p>
      <div className="investor-conviction" data-testid="investor-hero-copy">
        <h1 data-testid="investor-hero-title">
          {lines.map((line, index) => (
            <motion.span key={line} initial={reduced ? false : { opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: reduced ? 0 : .16 + index * .13, ease: [0.16, 1, 0.3, 1] }}>{line}</motion.span>
          ))}
        </h1>
        <motion.p initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: reduced ? 0 : .9, ease: [0.16, 1, 0.3, 1] }} data-testid="investor-hero-description">
          Acoord builds the Agent Human Interface—where people and agents operate as one governable team.
        </motion.p>
      </div>
      <div className="investor-hero-proof" data-testid="investor-hero-thesis">
        <span>THE BET</span><p>Model improvements multiply the work requiring coordination.</p>
      </div>
      <a href="#investor-act-2" className="investor-scroll-cue" data-testid="investor-see-story-link"><span>Follow the argument</span><ArrowDown size={15} /></a>
    </section>
  );
};