import { useEffect, useState } from 'react';

const cache = new Map();

export const AsciiArt = ({ src, className = '' }) => {
  const [text, setText] = useState(() => cache.get(src) || '');

  useEffect(() => {
    if (cache.has(src)) {
      setText(cache.get(src));
      return undefined;
    }
    let live = true;
    fetch(src, { cache: 'force-cache' })
      .then((response) => response.text())
      .then((body) => {
        cache.set(src, body);
        if (live) setText(body);
      })
      .catch(() => undefined);
    return () => { live = false; };
  }, [src]);

  return <pre className={`ascii-plate ${className}`} aria-hidden="true">{text}</pre>;
};
