import { ArrowRight } from 'lucide-react';
import { AsciiArt } from './AsciiArt';
import { BinaryHandsCanvas } from './BinaryHandsCanvas';
import { FilmScene } from './FilmScene';

export const HandsScene = ({ onJoin, onSeeAhi }) => (
  <FilmScene id="opening" tone="dark" className="scene-hands" slate="SCENE 01" meta="THE REACH" testId="film-scene-hands">
    <div className="hands-stage" aria-hidden="true">
      <AsciiArt src="/ascii/hands-ascii.txt" className="hands-art hands-art-fallback" testId="hands-ascii" />
      <BinaryHandsCanvas />
    </div>
    <div className="hands-copy">
      <p className="film-eyebrow" data-testid="hands-eyebrow"><i />AHI / AGENT HUMAN INTERFACE</p>
      <h1 className="hands-title" data-testid="hero-title">
        <span style={{ '--i': 0 }}>Solving</span>{' '}
        <span style={{ '--i': 1 }}>Artificial</span>{' '}
        <span style={{ '--i': 2 }}><em>Coordination</em></span>
      </h1>
      <p className="hands-sub" data-testid="hero-description">
        Building OSI — Organizational Super Intelligence — for every member of your organization.
      </p>
      <div className="hands-actions" data-testid="hero-actions">
        <a className="film-button film-button-solid" href="#ahi-live" onClick={onSeeAhi} data-testid="hero-see-ahi-link">See AHI Live <ArrowRight size={15} /></a>
        <button className="film-button" type="button" onClick={onJoin} data-testid="hero-waitlist-button">Join the Waitlist</button>
      </div>
    </div>
    <p className="hands-scroll" aria-hidden="true"><i />SCROLL</p>
  </FilmScene>
);
