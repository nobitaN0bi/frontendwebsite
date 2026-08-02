import { useEffect, useState } from 'react';

const IMAGES = {
  pattern: 'https://customer-assets-wrfwihn1.emergentagent.net/job_ab4501c9-fdbc-4ece-bd8e-304a97f1279b/artifacts/gpvzw3vz_Amuki%20Tools%C2%A0No_%20208_209_%20ASCII%C2%A0Pattern%20Fonts%20-%20Amuki%20Estudio.jpeg',
  hands: 'https://customer-assets-wrfwihn1.emergentagent.net/job_ab4501c9-fdbc-4ece-bd8e-304a97f1279b/artifacts/lc25sx3e_adamgodascii.jpg',
  dots: 'https://customer-assets-wrfwihn1.emergentagent.net/job_ab4501c9-fdbc-4ece-bd8e-304a97f1279b/artifacts/9us3ymw2_ascii-art.png'
};

const ASCII_ART = {
  space: '/ascii/space.txt',
  eye: '/ascii/eye.txt',
  mesh: '/ascii/a1.txt',
  network: '/ascii/a2.txt',
  field: '/ascii/a3.txt'
};

const artCache = new Map();
const requestCache = new Map();
const FALLBACK_ART = `░░░▒▒▓▓████▓▓▒▒░░░\n░▒▓█  COORDINATE  █▓▒░\n░░░▒▒▓▓████▓▓▒▒░░░`;

const loadAsciiArt = (art) => {
  if (artCache.has(art)) return Promise.resolve(artCache.get(art));
  if (!requestCache.has(art)) {
    requestCache.set(art, fetch(ASCII_ART[art] || ASCII_ART.space, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(`ASCII asset returned ${response.status}`);
        return response.text();
      })
      .then((text) => {
        artCache.set(art, text);
        return text;
      })
      .catch((error) => {
        requestCache.delete(art);
        console.warn(`[Acoord ASCII] ${art} could not load`, error);
        return FALLBACK_ART;
      }));
  }
  return requestCache.get(art);
};

export const AsciiBackdrop = ({ variant = 'hero', art = 'space' }) => {
  const [content, setContent] = useState(artCache.get(art) || FALLBACK_ART);

  useEffect(() => {
    let active = true;
    if (artCache.has(art)) {
      setContent(artCache.get(art));
      return undefined;
    }
    loadAsciiArt(art).then((text) => active && setContent(text));
    return () => { active = false; };
  }, [art]);

  return (
    <div className={`ascii-backdrop ascii-${variant}`} aria-hidden="true">
      <pre className="ascii-exact-art">{content}</pre>
      <div className="ascii-image-layer ascii-pattern" style={{ backgroundImage: `url("${IMAGES.pattern}")` }} />
      <div className="ascii-image-layer ascii-hands" style={{ backgroundImage: `url("${IMAGES.hands}")` }} />
      <div className="ascii-image-layer ascii-dots" style={{ backgroundImage: `url("${IMAGES.dots}")` }} />
      <pre className="ascii-code-stream">{`AGENT_01 -> [ INTENT ] -> COMPILE\nHUMAN   -> [ APPROVE ] -> EXECUTE\nMCP::ROUTER   01001100   CRDT::SYNC\nTRUST_GRAPH   ................ LIVE`}</pre>
      <div className="scan-beam" />
      <div className="ascii-vignette" />
    </div>
  );
};