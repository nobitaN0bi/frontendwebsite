import { Pause, Play } from 'lucide-react';

export const FilmHud = ({ industry, chapter, total, playing, onToggle }) => (
  <div className="film-hud" data-testid="film-hud">
    <span className="hud-industry" data-testid="film-hud-industry">{industry}</span>
    <span className="hud-chapter" data-testid="film-hud-chapter">
      CHAPTER {String(chapter).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
    <span className="hud-track" aria-hidden="true"><i style={{ transform: `scaleX(${chapter / total})` }} /></span>
    <button type="button" className="hud-play" onClick={onToggle} data-testid="film-play-toggle">
      {playing ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
      {playing ? 'Pause the film' : 'Play the film'}
    </button>
    <a className="hud-skip" href="#ahi" data-testid="film-skip-demo">Skip to the product</a>
  </div>
);
