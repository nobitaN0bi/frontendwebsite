import { useCallback, useRef } from 'react';
import { useSceneLive, useSceneMotion } from './hooks';

export const FilmScene = ({
  id,
  tone = 'dark',
  className = '',
  slate,
  meta,
  testId,
  innerRef,
  onEnter,
  children
}) => {
  const ref = useRef(null);
  const attach = useCallback((node) => {
    ref.current = node;
    if (typeof innerRef === 'function') innerRef(node);
    else if (innerRef) innerRef.current = node;
  }, [innerRef]);

  useSceneMotion(ref);
  useSceneLive(ref, onEnter);

  return (
    <section ref={attach} id={id} className={`film-scene film-${tone} ${className}`} data-testid={testId}>
      {(slate || meta) && (
        <div className="film-slate" aria-hidden="true">
          <span>{slate}</span>
          {meta && <span>{meta}</span>}
        </div>
      )}
      <div className="film-inner">{children}</div>
    </section>
  );
};
