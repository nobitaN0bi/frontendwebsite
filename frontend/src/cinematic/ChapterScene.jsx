import { FilmScene } from './FilmScene';
import { visuals } from './visuals';

export const ChapterScene = ({ chapter, index, total, scenario, onEnter, innerRef }) => {
  const Visual = visuals[chapter.kind];
  const tone = index % 2 === 0 ? 'dark' : 'light';

  return (
    <FilmScene
      id={`chapter-${chapter.id}`}
      tone={tone}
      className="scene-chapter"
      slate={`CHAPTER ${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      meta={`${scenario.label.toUpperCase()} — ${chapter.surface.toUpperCase()}`}
      testId={`film-chapter-${chapter.id}`}
      innerRef={innerRef}
      onEnter={onEnter}
    >
      <div className="chapter-copy">
        <p className="chapter-act" data-testid={`chapter-act-${chapter.id}`}>{chapter.act}</p>
        <h2 className="chapter-title" data-testid={`chapter-title-${chapter.id}`}>{chapter.title}</h2>
        <p className="chapter-story" data-testid={`chapter-story-${chapter.id}`}>{chapter.story}</p>
        <p className="chapter-caption" data-testid={`chapter-caption-${chapter.id}`}>{chapter.caption}</p>
        <p className="chapter-state" data-testid={`chapter-state-${chapter.id}`}>{chapter.state}</p>
      </div>
      <div className="chapter-stage">{Visual && <Visual scenario={scenario} />}</div>
    </FilmScene>
  );
};
