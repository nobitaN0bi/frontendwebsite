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
          <a href="/#system" onClick={closeMenu} data-testid="header-system-link">System</a>
          <a href="/#use-cases" onClick={closeMenu} data-testid="header-use-cases-link">Use cases</a>
          <Link className={location.pathname === '/demo' ? 'active' : ''} to="/demo" onClick={closeMenu} data-testid="header-demo-link">Live canvas</Link>
          <button className="button button-ink nav-cta" onClick={() => { closeMenu(); onJoin(); }} data-testid="header-waitlist-button">
            Request access <ArrowUpRight size={15} strokeWidth={1.8} />
          </button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" data-testid="mobile-menu-button">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      <main data-testid="main-content">{children}</main>
      <footer className="site-footer" data-testid="site-footer">
        <div>
          <span className="wordmark footer-wordmark" data-testid="footer-logo"><span className="wordmark-mark">a:</span>acoord</span>
          <p data-testid="footer-tagline">Solving artificial coordination. Magic you can trust.</p>
        </div>
        <div className="footer-links" data-testid="footer-links">
          <Link to="/demo" data-testid="footer-demo-link">Canvas preview</Link>
          <a href="/#use-cases" data-testid="footer-stories-link">Customer stories</a>
          <button onClick={onJoin} data-testid="footer-access-button">Request access</button>
        </div>
        <span className="footer-signal" data-testid="footer-status"><i /> Acoord system / alpha</span>
      </footer>
    </div>
  );
};