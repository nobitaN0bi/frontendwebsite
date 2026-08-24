import { useEffect, useState } from 'react';
import { Check, Copy, LoaderCircle, X } from 'lucide-react';

const initialForm = { name: '', email: '', company: '', role: '', use_case: 'ai-native', message: '', consent: false };

export const WaitlistModal = ({ open, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source_page: `${window.location.pathname}${window.location.search}`.slice(0, 160),
          referred_by: new URLSearchParams(window.location.search).get('ref') || null
        })
      });
      if (!response.ok) throw new Error('Request failed');
      setResult(await response.json());
      setStatus('success');
    } catch (requestError) {
      setError('We could not save your request. Please check the form and try again.');
      setStatus('error');
    }
  };

  const copyReferralLink = async () => {
    if (!result?.referral_link) return;
    try {
      await navigator.clipboard.writeText(result.referral_link);
    } catch {
      const input = document.createElement('textarea');
      input.value = result.referral_link;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="modal-scrim" onMouseDown={(event) => event.target === event.currentTarget && onClose()} data-testid="waitlist-modal">
      <section className="waitlist-modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
        <button className="modal-close" onClick={onClose} aria-label="Close request access form" data-testid="waitlist-close-button"><X size={19} /></button>
        {status === 'success' ? (
          <div className="success-state" data-testid="waitlist-success-message">
            <span className="success-icon"><Check size={26} /></span>
            <p className="eyebrow">You&rsquo;re on the list</p>
            <h2 id="waitlist-title">Your seat in the cohort is reserved.</h2>
            <p>We&rsquo;ll send the desktop download link to <strong>{form.email}</strong> the moment your access opens.</p>
            <div className="waitlist-queue" data-testid="waitlist-queue-position"><span>QUEUE POSITION</span><strong>#{result?.queue_position || '—'}</strong><small>{result?.referral_count || 0} successful referrals</small></div>
            <div className="waitlist-referral" data-testid="waitlist-referral-panel"><label htmlFor="waitlist-referral-link">MOVE FORWARD WITH YOUR TEAM</label><div><input id="waitlist-referral-link" readOnly value={result?.referral_link || ''} data-testid="waitlist-referral-link-input" /><button type="button" onClick={copyReferralLink} data-testid="waitlist-copy-referral-button"><Copy size={15} />{copied ? 'Copied' : 'Copy link'}</button></div><p data-testid="waitlist-referral-help">Each teammate who joins through this link moves you forward in the cohort.</p></div>
            <div className="success-actions"><a className="button button-ink" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="waitlist-success-book-link">Book a demo</a><button className="button button-outline" onClick={onClose} data-testid="waitlist-success-close-button">Return to Acoord</button></div>
          </div>
        ) : (
          <>
            <p className="eyebrow" data-testid="waitlist-eyebrow">Desktop app / private waitlist</p>
            <h2 id="waitlist-title" data-testid="waitlist-title">Download the Ahi desktop app.</h2>
            <p className="modal-intro" data-testid="waitlist-description">Access opens in small cohorts. Tell us where coordination breaks in your team and we&rsquo;ll send your download link when your seat opens.</p>
            <form onSubmit={submit} data-testid="waitlist-form">
              <div className="form-grid">
                <label>Name<input required minLength="2" name="name" value={form.name} onChange={update} data-testid="waitlist-name-input" /></label>
                <label>Work email<input required type="email" name="email" value={form.email} onChange={update} data-testid="waitlist-email-input" /></label>
                <label>Company<input required minLength="2" name="company" value={form.company} onChange={update} data-testid="waitlist-company-input" /></label>
                <label>Role<input required minLength="2" name="role" value={form.role} onChange={update} data-testid="waitlist-role-input" /></label>
              </div>
              <label>Coordination domain
                <select name="use_case" value={form.use_case} onChange={update} data-testid="waitlist-use-case-select">
                  <option value="ai-native">AI-native product</option><option value="financial-services">Financial services</option>
                  <option value="healthcare">Healthcare</option><option value="legal">Legal</option>
                  <option value="devops">DevOps</option><option value="commerce">Commerce</option>
                  <option value="government">Government</option><option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option><option value="insurance">Insurance</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>What should coordinate better?
                <textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Agents, people, tools, decisions..." data-testid="waitlist-message-input" />
              </label>
              {error && <p className="form-error" role="alert" data-testid="waitlist-error-message">{error}</p>}
              <label className="consent-row"><input required type="checkbox" name="consent" checked={form.consent} onChange={update} data-testid="waitlist-consent-checkbox" /><span>I agree that Acoord may process this information to respond to my request. See the <a href="/legal/privacy" target="_blank" data-testid="waitlist-privacy-link">Privacy Policy</a> and <a href="/legal/terms" target="_blank" data-testid="waitlist-terms-link">Terms</a>.</span></label>
              <button className="button button-ink form-submit" disabled={status === 'loading'} data-testid="waitlist-submit-button">
                {status === 'loading' ? <><LoaderCircle className="spin" size={17} /> Saving request</> : 'Join the download waitlist'}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
};