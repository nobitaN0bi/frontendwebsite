import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AsciiNarrative } from './AsciiNarrative';
import { MotionControl } from './MotionControl';

export const SiteChrome = ({ children, onJoin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" data-testid="site-shell">
      <AsciiNarrative mode="ambient" tone="global" label="ACOORD / LIVE SIGNAL" />
      <header className="site-header" data-testid="site-header">
        <Link className="wordmark" to="/" onClick={closeMenu} data-testid="header-logo-link">
          <span className="wordmark-mark" aria-hidden="true">a:</span>
          <span data-testid="header-logo-text">acoord</span>
        </Link>
        <nav className={`header-nav ${menuOpen ? 'is-open' : ''}`} data-testid="header-navigation">
          <a href="/#capabilities" onClick={closeMenu} data-testid="header-system-link">Product</a>
          <a href="/#system" onClick={closeMenu} data-testid="header-agents-link">How it works</a>
          <a href="/#use-cases" onClick={closeMenu} data-testid="header-use-cases-link">Use cases</a>
          <Link className={location.pathname.startsWith('/resources') ? 'active' : ''} to="/resources" onClick={closeMenu} data-testid="header-resources-link">Resources</Link>
          <Link className={location.pathname === '/demo' ? 'active' : ''} to="/demo" onClick={closeMenu} data-testid="header-demo-link">Watch demo</Link>
          <MotionControl />
          <button className="header-access-link" onClick={() => { closeMenu(); onJoin(); }} data-testid="header-waitlist-button">Download app</button>
          <a className="button button-ink nav-cta" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="header-book-demo-link">Book a demo <ArrowUpRight size={15} strokeWidth={1.8} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-button">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      <main data-testid="main-content">{children}</main>
      <footer className="site-footer expanded-footer" data-testid="site-footer">
        <div className="footer-brand">
          <span className="wordmark footer-wordmark" data-testid="footer-logo"><span className="wordmark-mark">a:</span>acoord</span>
          <p data-testid="footer-tagline">Solving artificial coordination. Magic you can trust.</p>
          <a className="footer-book" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="footer-book-demo-link">Book a demo <ArrowUpRight size={14} /></a>
        </div>
        <div className="footer-directory" data-testid="footer-links">
          <div><strong>Product</strong><a href="/#capabilities" data-testid="footer-system-link">System</a><Link to="/demo" data-testid="footer-demo-link">Watch demo</Link><a href="/#use-cases" data-testid="footer-stories-link">Use cases</a><button onClick={onJoin} data-testid="footer-access-button">Download the desktop app</button></div>
          <div><strong>Learn</strong><Link to="/resources" data-testid="footer-field-notes-link">Field notes</Link><Link to="/resources/what-is-an-agentic-operating-system" data-testid="footer-agentic-os-link">Agentic OS</Link><Link to="/resources/hybrid-rag-postgresql-rrf" data-testid="footer-enterprise-rag-link">Enterprise RAG</Link><Link to="/resources/human-in-the-loop-agent-checkpoints" data-testid="footer-checkpoints-link">Human checkpoints</Link></div>
          <div><strong>Trust</strong><Link to="/legal" data-testid="footer-legal-center-link">Legal center</Link><Link to="/legal/security" data-testid="footer-security-link">Security</Link><Link to="/legal/privacy" data-testid="footer-privacy-link">Privacy</Link><Link to="/legal/acceptable-use" data-testid="footer-acceptable-use-link">Acceptable use</Link></div>
          <div><strong>Legal</strong><Link to="/legal/terms" data-testid="footer-terms-link">Terms</Link><Link to="/legal/cookies" data-testid="footer-cookies-link">Cookies</Link><Link to="/legal/dpa" data-testid="footer-dpa-link">DPA</Link><Link to="/legal/subprocessors" data-testid="footer-subprocessors-link">Service providers</Link></div>
        </div>
        <div className="footer-bottom"><span className="footer-signal" data-testid="footer-status"><i /> Acoord system / alpha</span><span>© 2026 Acoord.co</span><a href="mailto:legal@acoord.co" data-testid="footer-legal-email-link">legal@acoord.co</a><a href="mailto:support@acoord.co" data-testid="footer-support-email-link">support@acoord.co</a></div>
      </footer>
    </div>
  );
};