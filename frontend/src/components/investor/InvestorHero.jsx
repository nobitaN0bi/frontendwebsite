import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AsciiArt } from '../../cinematic/AsciiArt';
import { InvestorReveal } from './InvestorReveal';

export const InvestorHero = () => (
  <section className="investor-hero" data-testid="investor-hero-section">
    <div className="investor-hero-art" aria-hidden="true">
      <AsciiArt src="/ascii/hands-ascii.txt" className="investor-hands-art" />
    </div>
    <div className="investor-hero-grid">
      <InvestorReveal className="investor-hero-copy" testId="investor-hero-copy">
        <p className="investor-kicker" data-testid="investor-hero-kicker">INVESTOR BRIEF / ACOORD.CO</p>
        <h1 data-testid="investor-hero-title">The next AI bottleneck is not intelligence.</h1>
        <strong data-testid="investor-hero-thesis">It is coordination.</strong>
        <p data-testid="investor-hero-description">Acoord is building the Agent Human Interface: the operating surface where people, specialist agents, knowledge, tools, and approvals become one inspectable system of work.</p>
        <div className="investor-hero-actions">
          <a href="#investor-demo" className="investor-button investor-button-light" data-testid="investor-see-product-link">See the product <ArrowDown size={16} /></a>
          <a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" className="investor-text-link" data-testid="investor-hero-meeting-link">Start an investor conversation <ArrowUpRight size={15} /></a>
        </div>
      </InvestorReveal>
      <InvestorReveal className="investor-hero-note" delay={0.18} testId="investor-hero-note">
        <span>THE COUNTER-INTUITIVE BET</span>
        <p>As models get better, the coordination problem gets larger—not smaller.</p>
      </InvestorReveal>
    </div>
    <p className="investor-hero-index" data-testid="investor-hero-index">BRIEF 01 / 08<br />PRIVATE ALPHA / 2026</p>
  </section>
);