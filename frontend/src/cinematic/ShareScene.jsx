import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Link2, LoaderCircle, Ticket } from 'lucide-react';
import { FilmScene } from './FilmScene';

export const ShareScene = ({ scenario, innerRef }) => {
  const [state, setState] = useState('idle');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState('idle');
    setLink('');
    setCopied(false);
  }, [scenario.id]);

  const createMap = async () => {
    setState('loading');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/decision-maps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry: scenario.id })
      });
      if (!response.ok) throw new Error('Map creation failed');
      const data = await response.json();
      setLink(`${window.location.origin}${data.path}`);
      setState('ready');
    } catch (error) {
      setState('error');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch (error) {
      const field = document.createElement('textarea');
      field.value = link;
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <FilmScene id="share" tone="dark" className="scene-share" slate="END CARD" meta="SEND THE STORY" testId="film-scene-share" innerRef={innerRef}>
      <div className="share-grid">
        <div className="share-copy">
          <p className="film-eyebrow" data-testid="share-eyebrow"><i />THE CREDITS ROLL</p>
          <h2 data-testid="share-title">Your team missed<br />the screening.</h2>
          <p className="share-story" data-testid="share-story">
            You just watched {scenario.company} take one {scenario.label.toLowerCase()} problem from a sentence
            to a signed, provable decision. The decision map retells those nine chapters as a story your team
            can read in four minutes — what arrived, what the system learned to be true, where the human line
            held, and the record that outlived the run.
          </p>
          <p className="share-note" data-testid="share-note">MODELED SIMULATION / NO ACCOUNT NEEDED TO READ / LINK NEVER EXPIRES</p>
        </div>

        <div className="share-panel" data-testid="share-panel">
          {state !== 'ready' && (
            <div className="share-invite">
              <span className="share-invite-label"><Ticket size={15} /> DECISION MAP / {scenario.label.toUpperCase()}</span>
              <p>One branded link. The whole film, retold as a decision record.</p>
              <button className="film-button film-button-solid" type="button" onClick={createMap} disabled={state === 'loading'} data-testid="share-create-button">
                {state === 'loading' ? <><LoaderCircle className="spin" size={14} /> Cutting the reel</> : <><Link2 size={14} /> Create the decision map</>}
              </button>
              {state === 'error' && <p className="share-error" role="alert" data-testid="share-error">The projector jammed. Try again.</p>}
            </div>
          )}
          {state === 'ready' && (
            <div className="share-ticket" data-testid="share-ticket">
              <div className="ticket-head">
                <span>ACOORD / DECISION MAP</span>
                <b data-testid="share-ticket-industry">{scenario.label.toUpperCase()}</b>
              </div>
              <p className="ticket-line">ADMIT: YOUR ENTIRE TEAM · RUNTIME: 4 MIN READ · PROOF: INCLUDED</p>
              <span className="ticket-tear" aria-hidden="true" />
              <code className="ticket-link" data-testid="share-link-text">{link}</code>
              <div className="ticket-actions">
                <button className="film-button film-button-solid" type="button" onClick={copyLink} data-testid="share-copy-button">
                  {copied ? <><Check size={14} /> Copied</> : 'Copy link'}
                </button>
                <a className="film-button" href={link} target="_blank" rel="noreferrer" data-testid="share-open-link">Open the map <ArrowUpRight size={14} /></a>
              </div>
            </div>
          )}
        </div>
      </div>
    </FilmScene>
  );
};
