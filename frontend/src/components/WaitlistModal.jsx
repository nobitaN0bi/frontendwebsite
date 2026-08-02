import { useEffect, useState } from 'react';
import { Check, LoaderCircle, X } from 'lucide-react';

const initialForm = { name: '', email: '', company: '', role: '', use_case: 'ai-native', message: '' };

export const WaitlistModal = ({ open, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

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

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch (requestError) {
      setError('We could not save your request. Please check the form and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="modal-scrim" onMouseDown={(event) => event.target === event.currentTarget && onClose()} data-testid="waitlist-modal">
      <section className="waitlist-modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
        <button className="modal-close" onClick={onClose} aria-label="Close request access form" data-testid="waitlist-close-button"><X size={19} /></button>
        {status === 'success' ? (
          <div className="success-state" data-testid="waitlist-success-message">
            <span className="success-icon"><Check size={26} /></span>
            <p className="eyebrow">Request received</p>
            <h2 id="waitlist-title">You’re in the coordination loop.</h2>
            <p>We’ll reach out to <strong>{form.email}</strong> with a focused path into Acoord.</p>
            <button className="button button-ink" onClick={onClose} data-testid="waitlist-success-close-button">Return to Acoord</button>
          </div>
        ) : (
          <>
            <p className="eyebrow" data-testid="waitlist-eyebrow">Private alpha / 2026</p>
            <h2 id="waitlist-title" data-testid="waitlist-title">Bring your hardest coordination problem.</h2>
            <p className="modal-intro" data-testid="waitlist-description">Tell us where human judgment, agent work, and enterprise systems need to move together.</p>
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
              <button className="button button-ink form-submit" disabled={status === 'loading'} data-testid="waitlist-submit-button">
                {status === 'loading' ? <><LoaderCircle className="spin" size={17} /> Saving request</> : 'Request access'}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
};