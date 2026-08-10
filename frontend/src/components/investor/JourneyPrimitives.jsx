import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JourneyBack = ({ customer = false, prefix }) => <Link className="journey-back" to={customer ? '/investor/customer' : '/investor?intent=investor'} data-testid={`${prefix}-back-link`}><ArrowLeft size={15} /> Change lens</Link>;

export const ProofLegend = ({ prefix, modeled = false }) => (
  <div className="journey-proof-legend" data-testid={`${prefix}-proof-legend`}>
    <span>BUILT / PUBLIC PRODUCT SHELL</span><span>ARCHITECTURE / SUPPLIED DESIGNS</span>{modeled && <span>MODELED / CONTEXTUAL WALKTHROUGH</span>}
  </div>
);

export const JourneyActions = ({ prefix, onJoin, title }) => (
  <section className="journey-actions-section" data-testid={`${prefix}-actions-section`}>
    <p className="persona-label">NEXT / HUMAN CONVERSATION</p><h2 data-testid={`${prefix}-actions-title`}>{title}</h2>
    <div className="journey-action-buttons"><a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid={`${prefix}-book-link`}>Book a working session <ArrowUpRight size={16} /></a><button type="button" onClick={onJoin} data-testid={`${prefix}-waitlist-button`}><Download size={15} /> Join the desktop waitlist</button></div>
  </section>
);