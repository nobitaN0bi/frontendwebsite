import { ArrowRight, Mail } from 'lucide-react';
import { AsciiArt } from './AsciiArt';
import { FilmScene } from './FilmScene';

export const PortraitScene = ({ onJoin }) => (
  <FilmScene id="contact" tone="dark" className="scene-portrait" slate="FINAL SCENE" meta="THE PERSON BEHIND IT" testId="film-scene-portrait">
    <div className="portrait-stage" data-testid="portrait-stage">
      <AsciiArt src="/ascii/portrait-ascii.txt" className="portrait-art" />
      <span className="portrait-scan" aria-hidden="true" />
      <span className="portrait-frame" aria-hidden="true" />
    </div>
    <div className="portrait-copy">
      <p className="film-eyebrow" data-testid="portrait-eyebrow"><i />CONTACT / ACOORD</p>
      <h2 data-testid="portrait-title">Built by someone<br />who answers the email.</h2>
      <p data-testid="portrait-description">
        Acoord is an early, opinionated system. If coordination is the thing breaking in your organisation,
        bring the workflow that refuses to behave and we will map it together.
      </p>
      <div className="portrait-actions">
        <a className="film-button film-button-solid" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="portrait-book-call-link">Book a 30-minute call <ArrowRight size={15} /></a>
        <a className="film-button" href="mailto:support@acoord.co" data-testid="portrait-email-link"><Mail size={14} /> support@acoord.co</a>
        <button className="film-link" type="button" onClick={onJoin} data-testid="portrait-waitlist-button">Join the private waitlist</button>
      </div>
      <p className="portrait-meta" data-testid="portrait-meta">ASCII PORTRAIT / RENDERED FROM SOURCE ARTWORK / 190 × 39 CHARACTERS</p>
    </div>
  </FilmScene>
);
