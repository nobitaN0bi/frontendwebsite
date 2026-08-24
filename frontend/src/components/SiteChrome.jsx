import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AsciiNarrative } from './AsciiNarrative';
import { InfinityMark } from './InfinityMark';

export const SiteChrome = ({ children, onJoin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.body.classList.add('nav-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <div className="site-shell" data-testid="site-shell">
      <AsciiNarrative mode="ambient" tone="global" label="ACOORD / LIVE SIGNAL" />
      <header className="site-header" data-testid="site-header">
        <Link className="wordmark" to="/" onClick={closeMenu} data-testid="header-logo-link">
          <span className="wordmark-mark"><InfinityMark title="Acoord" testId="header-infinity-mark" /></span>
          <span data-testid="header-logo-text">acoord</span>
        </Link>
        <nav id="primary-navigation" className={`header-nav ${menuOpen ? 'is-open' : ''}`} data-testid="header-navigation">
          <a href="/#ahi-live" onClick={closeMenu} data-testid="header-ahi-link">AHI</a>
          <Link className={location.pathname === '/pricing' ? 'active' : ''} to="/pricing" onClick={closeMenu} data-testid="header-pricing-link">Pricing</Link>
          <Link className={location.pathname === '/partners' ? 'active' : ''} to="/partners" onClick={closeMenu} data-testid="header-partners-link">Partners</Link>
          <Link className={location.pathname === '/roi' ? 'active' : ''} to="/roi" onClick={closeMenu} data-testid="header-roi-link">ROI</Link>
          <Link className={location.pathname.startsWith('/resources') ? 'active' : ''} to="/resources" onClick={closeMenu} data-testid="header-resources-link">Resources</Link>
          <button className="header-access-link" onClick={() => { closeMenu(); onJoin(); }} data-testid="header-waitlist-button">Join</button>
          <a className="button button-ink nav-cta" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="header-book-demo-link">Talk to us <ArrowUpRight size={15} strokeWidth={1.8} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="primary-navigation" data-testid="mobile-menu-button">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      <main data-testid="main-content">{children}</main>
      <footer className="site-footer expanded-footer" data-testid="site-footer">
        <div className="footer-brand">
          <span className="wordmark footer-wordmark" data-testid="footer-logo"><span className="wordmark-mark"><InfinityMark title="Acoord" testId="footer-infinity-mark" /></span>acoord</span>
          <p data-testid="footer-tagline">Solving artificial coordination. Magic you can trust.</p>
          <a className="footer-book" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="footer-book-demo-link">Book a demo <ArrowUpRight size={14} /></a>
        </div>
        <div className="footer-directory" data-testid="footer-links">
          <div><strong>Product</strong><a href="/#ahi-live" data-testid="footer-ahi-link">AHI live</a><a href="/#connectors" data-testid="footer-connectors-link">49 connectors</a><Link to="/pricing" data-testid="footer-pricing-link">Pricing</Link><Link to="/roi" data-testid="footer-roi-link">ROI estimator</Link><Link to="/demo" data-testid="footer-demo-link">Watch demo</Link><button onClick={onJoin} data-testid="footer-access-button">Join the waitlist</button></div>
          <div><strong>Company</strong><Link to="/partners" data-testid="footer-partners-link">Partners</Link><Link to="/use-cases/healthcare" data-testid="footer-healthcare-link">Healthcare</Link><Link to="/use-cases/cfo" data-testid="footer-cfo-link">CFO office</Link><Link to="/resources" data-testid="footer-field-notes-link">Field notes</Link><Link to="/investor" data-testid="footer-investor-link">Investor brief</Link></div>
          <div><strong>Trust</strong><Link to="/legal" data-testid="footer-legal-center-link">Legal center</Link><Link to="/legal/security" data-testid="footer-security-link">Security</Link><Link to="/legal/privacy" data-testid="footer-privacy-link">Privacy</Link><Link to="/legal/acceptable-use" data-testid="footer-acceptable-use-link">Acceptable use</Link></div>
          <div><strong>Legal</strong><Link to="/legal/terms" data-testid="footer-terms-link">Terms</Link><Link to="/legal/cookies" data-testid="footer-cookies-link">Cookies</Link><Link to="/legal/dpa" data-testid="footer-dpa-link">DPA</Link><Link to="/legal/subprocessors" data-testid="footer-subprocessors-link">Service providers</Link></div>
        </div>
        <div className="footer-bottom"><span className="footer-signal" data-testid="footer-status"><i /> Acoord system / alpha</span><span>© 2026 Acoord.co</span><a href="mailto:legal@acoord.co" data-testid="footer-legal-email-link">legal@acoord.co</a><a href="mailto:support@acoord.co" data-testid="footer-support-email-link">support@acoord.co</a></div>
      </footer>
    </div>
  );
};