import { useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent })
      });
      if (!response.ok) throw new Error('Subscription failed');
      const result = await response.json();
      setStatus('success');
      setMessage(result.status === 'already_subscribed' ? 'You are already on the field-notes list.' : 'Subscription confirmed. The next field note is yours.');
    } catch (error) {
      setStatus('error');
      setMessage('We could not save your subscription. Please try again.');
    }
  };

  return (
    <form className="newsletter-form" onSubmit={submit} data-testid="newsletter-form">
      <div className="newsletter-input-row">
        <label htmlFor="newsletter-email">Work email</label>
        <input id="newsletter-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" data-testid="newsletter-email-input" />
        <button type="submit" disabled={status === 'loading' || status === 'success'} data-testid="newsletter-submit-button">
          {status === 'loading' ? <LoaderCircle className="spin" size={17} /> : status === 'success' ? <Check size={17} /> : <ArrowRight size={17} />}
          <span>{status === 'success' ? 'Subscribed' : 'Get field notes'}</span>
        </button>
      </div>
      <label className="newsletter-consent" data-testid="newsletter-consent-label">
        <input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} data-testid="newsletter-consent-checkbox" />
        <span>I agree to receive technical field notes and can unsubscribe at any time. See the <a href="/legal/privacy" data-testid="newsletter-privacy-link">Privacy Policy</a>.</span>
      </label>
      {message && <p className={`newsletter-message ${status}`} role="status" data-testid="newsletter-status-message">{message}</p>}
    </form>
  );
};