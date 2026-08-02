import { AsciiArt } from './AsciiArt';
import { FilmScene } from './FilmScene';

const letters = [['A', 'gent'], ['H', 'uman'], ['I', 'nterface']];

export const EyeScene = () => (
  <FilmScene id="ahi" tone="dark" className="scene-eye" slate="SCENE 03" meta="THE OPENING" testId="film-scene-eye">
    <div className="eye-column">
      <div className="eye-shape" aria-hidden="true">
        <div className="eye-iris">
          <AsciiArt src="/ascii/iris-ascii.txt" className="eye-art" testId="eye-ascii" />
          <span className="eye-pupil" />
        </div>
      </div>
      <div className="eye-copy">
        <p className="film-eyebrow" data-testid="eye-eyebrow"><i />THE SYSTEM OPENS ITS EYES</p>
        <h2 className="eye-title" data-testid="eye-title">Ahi</h2>
        <div className="eye-expand" data-testid="eye-expansion">
          {letters.map(([letter, rest], index) => (
            <span key={letter} style={{ '--i': index }}><b>{letter}</b>{rest}</span>
          ))}
        </div>
        <p className="eye-line" data-testid="eye-description">
          One surface where a person states intent and a system of agents answers with work
          you can inspect, interrupt, and prove.
        </p>
      </div>
    </div>
  </FilmScene>
);
