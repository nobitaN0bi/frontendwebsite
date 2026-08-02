import { ArrowRight } from 'lucide-react';
import { FilmScene } from './FilmScene';

export const IndustryScene = ({ scenarios, activeId, onSelect }) => (
  <FilmScene id="industry" tone="light" className="scene-industry" slate="SCENE 04" meta="THE CHOICE" testId="film-scene-industry">
    <div className="industry-head">
      <h2 data-testid="industry-title">Select your industry.</h2>
      <p data-testid="industry-description">
        The next nine chapters rebuild themselves around your world — the same operating layer, your stakes,
        your evidence, your approval line. Modeled simulations, real interface.
      </p>
    </div>
    <div className="industry-list" role="tablist" aria-label="Industries">
      {scenarios.map((scenario, index) => (
        <button
          key={scenario.id}
          type="button"
          role="tab"
          aria-selected={scenario.id === activeId}
          className={`industry-row ${scenario.id === activeId ? 'is-active' : ''}`}
          style={{ '--i': index }}
          onClick={() => onSelect(scenario.id)}
          data-testid={`film-industry-${scenario.id}`}
        >
          <span className="industry-number">{String(index + 1).padStart(2, '0')}</span>
          <strong className="industry-name">{scenario.label}</strong>
          <em className="industry-hook">{scenario.hook}</em>
          <ArrowRight className="industry-arrow" size={20} />
        </button>
      ))}
    </div>
  </FilmScene>
);
