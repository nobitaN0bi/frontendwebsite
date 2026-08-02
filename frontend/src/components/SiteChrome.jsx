import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const SiteChrome = ({ children, onJoin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" data-testid="site-shell">
      <header className="site-header" data-testid="site-header">
        <Link className="wordmark" to="/" onClick={closeMenu} data-testid="header-logo-link">
          <span className="wordmark-mark" aria-hidden="true">a:</span>
          <span data-testid="header-logo-text">acoord</span>
        </Link>
        <nav className={`header-nav ${menuOpen ? 'is-open' : ''}`} data-testid="header-navigation">
          <a href="/#system" onClick={closeMenu} data-testid="header-system-link">Product</a>
          <a href="/#use-cases" onClick={closeMenu} data-testid="header-use-cases-link">Use cases</a>
          <Link className={location.pathname.startsWith('/resources') ? 'active' : ''} to="/resources" onClick={closeMenu} data-testid="header-resources-link">Resources</Link>
          <Link className={location.pathname === '/demo' ? 'active' : ''} to="/demo" onClick={closeMenu} data-testid="header-demo-link">Live canvas</Link>
          <button className="header-access-link" onClick={() => { closeMenu(); onJoin(); }} data-testid="header-waitlist-button">Private access</button>
          <a className="button button-ink nav-cta" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="header-book-demo-link">Book demo <ArrowUpRight size={15} strokeWidth={1.8} /></a>
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
          <a className="footer-book" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="footer-book-demo-link">Book a 30-minute demo <ArrowUpRight size={14} /></a>
        </div>
        <div className="footer-directory" data-testid="footer-links">
          <div><strong>Product</strong><a href="/#system">System</a><Link to="/demo" data-testid="footer-demo-link">Live canvas</Link><a href="/#use-cases" data-testid="footer-stories-link">Use cases</a><button onClick={onJoin} data-testid="footer-access-button">Private access</button></div>
          <div><strong>Learn</strong><Link to="/resources">Field notes</Link><Link to="/resources/what-is-an-agentic-operating-system">Agentic OS</Link><Link to="/resources/hybrid-rag-postgresql-rrf">Enterprise RAG</Link><Link to="/resources/human-in-the-loop-agent-checkpoints">Human checkpoints</Link></div>
          <div><strong>Trust</strong><Link to="/legal">Legal center</Link><Link to="/legal/security">Security</Link><Link to="/legal/privacy">Privacy</Link><Link to="/legal/acceptable-use">Acceptable use</Link></div>
          <div><strong>Legal</strong><Link to="/legal/terms">Terms</Link><Link to="/legal/cookies">Cookies</Link><Link to="/legal/dpa">DPA</Link><Link to="/legal/subprocessors">Service providers</Link></div>
        </div>
        <div className="footer-bottom"><span className="footer-signal" data-testid="footer-status"><i /> Acoord system / alpha</span><span>© 2026 Acoord.co</span><a href="mailto:legal@acoord.co">legal@acoord.co</a><a href="mailto:support@acoord.co">support@acoord.co</a></div>
      </footer>
    </div>
  );
};