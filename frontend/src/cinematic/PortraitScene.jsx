import { ArrowRight, Download } from 'lucide-react';
import { AsciiArt } from './AsciiArt';
import { FilmScene } from './FilmScene';

export const PortraitScene = ({ onJoin }) => (
  <FilmScene id="finale" tone="dark" className="scene-portrait" slate="FINAL SCENE" meta="FADE TO WORK" testId="film-scene-portrait">
    <div className="portrait-stage" aria-hidden="true" data-testid="portrait-stage">
      <AsciiArt src="/ascii/portrait-ascii.txt" className="portrait-art" testId="portrait-ascii" />
      <span className="portrait-scan" />
      <span className="portrait-grade" />
    </div>
    <span className="portrait-bar portrait-bar-top" aria-hidden="true" />
    <span className="portrait-bar portrait-bar-bottom" aria-hidden="true" />
    <div className="portrait-copy">
      <p className="film-eyebrow" data-testid="portrait-eyebrow"><i />CLOSING SCENE / ACOORD</p>
      <h2 data-testid="portrait-title">Magic that<br />you can trust.</h2>
      <p data-testid="portrait-description">The film ends. The work doesn&rsquo;t. Take the operating system with you.</p>
      <div className="portrait-actions">
        <button className="film-button film-button-solid" type="button" onClick={onJoin} data-testid="portrait-download-button"><Download size={14} /> Download the desktop app <em className="cta-tag">waitlist</em></button>
        <a className="film-button" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="portrait-book-demo-link">Book a demo <ArrowRight size={15} /></a>
      </div>
      <p className="portrait-meta" data-testid="portrait-meta">AHI — AGENT HUMAN INTERFACE / A FILM ABOUT WORK / 2026</p>
    </div>
  </FilmScene>
);
