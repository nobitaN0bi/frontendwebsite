import { ArrowRight } from 'lucide-react';
import { AsciiArt } from './AsciiArt';
import { FilmScene } from './FilmScene';

export const PortraitScene = () => (
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
      <p data-testid="portrait-description">The work is multi-agent, multi-user, collaborative, and in continuous growth.</p>
      <div className="portrait-actions">
        <a className="film-button film-button-solid" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="portrait-talk-to-us-link">Talk to us <ArrowRight size={15} /></a>
      </div>
    </div>
  </FilmScene>
);
