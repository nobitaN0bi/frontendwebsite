import { ArrowRight, Download, Play } from 'lucide-react';
import { AsciiArt } from './AsciiArt';
import { FilmScene } from './FilmScene';

export const HandsScene = ({ onJoin }) => (
  <FilmScene id="opening" tone="dark" className="scene-hands" slate="SCENE 01" meta="THE REACH" testId="film-scene-hands">
    <div className="hands-stage" aria-hidden="true">
      <AsciiArt src="/ascii/hands-ascii.txt" className="hands-art" testId="hands-ascii" />
    </div>
    <div className="hands-copy">
      <p className="film-eyebrow" data-testid="hands-eyebrow"><i />AHI / AGENTIC OPERATING SYSTEM / PRIVATE ALPHA</p>
      <h1 className="hands-title" data-testid="hero-title">
        {['Solving', 'artificial'].map((word, index) => <span key={word} style={{ '--i': index }}>{word} </span>)}
        <span style={{ '--i': 2 }}><em>coordination.</em></span>
      </h1>
      <p className="hands-sub" data-testid="hero-description">
        Intelligence is no longer the bottleneck. The distance between human intent and machine execution is.
        Ahi is the operating system that closes it.
      </p>
      <div className="hands-actions" data-testid="hero-actions">
        <button className="film-button film-button-solid" type="button" onClick={onJoin} data-testid="hero-waitlist-button"><Download size={14} /> Download the desktop app <em className="cta-tag">waitlist</em></button>
        <a className="film-button" href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="hero-book-call-link">Book a demo <ArrowRight size={15} /></a>
        <a className="film-link" href="#watch-demo" data-testid="hero-watch-demo-link"><Play size={11} fill="currentColor" /> Watch the demo</a>
      </div>
    </div>
    <p className="hands-scroll" aria-hidden="true"><i />SCROLL</p>
  </FilmScene>
);
