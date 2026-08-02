const IMAGES = {
  pattern: 'https://customer-assets-wrfwihn1.emergentagent.net/job_ab4501c9-fdbc-4ece-bd8e-304a97f1279b/artifacts/gpvzw3vz_Amuki%20Tools%C2%A0No_%20208_209_%20ASCII%C2%A0Pattern%20Fonts%20-%20Amuki%20Estudio.jpeg',
  hands: 'https://customer-assets-wrfwihn1.emergentagent.net/job_ab4501c9-fdbc-4ece-bd8e-304a97f1279b/artifacts/lc25sx3e_adamgodascii.jpg',
  dots: 'https://customer-assets-wrfwihn1.emergentagent.net/job_ab4501c9-fdbc-4ece-bd8e-304a97f1279b/artifacts/9us3ymw2_ascii-art.png'
};

export const AsciiBackdrop = ({ variant = 'hero' }) => (
  <div className={`ascii-backdrop ascii-${variant}`} aria-hidden="true">
    <div className="ascii-image-layer ascii-pattern" style={{ backgroundImage: `url("${IMAGES.pattern}")` }} />
    <div className="ascii-image-layer ascii-hands" style={{ backgroundImage: `url("${IMAGES.hands}")` }} />
    <div className="ascii-image-layer ascii-dots" style={{ backgroundImage: `url("${IMAGES.dots}")` }} />
    <pre className="ascii-code-stream">{`AGENT_01 -> [ INTENT ] -> COMPILE\nHUMAN   -> [ APPROVE ] -> EXECUTE\nMCP::ROUTER   01001100   CRDT::SYNC\nTRUST_GRAPH   ................ LIVE`}</pre>
    <div className="scan-beam" />
    <div className="ascii-vignette" />
  </div>
);