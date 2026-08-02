import { Check } from 'lucide-react';

const widths = [0.86, 0.72, 0.91, 0.64];

export const BrowserVisual = ({ scenario }) => (
  <div className="diagram diagram-browser" data-testid="chapter-visual-browser">
    <div className="browser-bar" style={{ '--i': 0 }}>
      <i /><i /><i />
      <span className="browser-url dg-type" style={{ '--i': 1 }}>{scenario.browserUrl}</span>
      <b>APPROVED SOURCE</b>
    </div>
    <div className="browser-page">
      <strong className="dg-type" style={{ '--i': 2 }}>{scenario.browserTitle}</strong>
      <div className="browser-skeleton">
        {widths.map((width, index) => <i key={width} style={{ '--i': index + 3, '--w': width }} />)}
      </div>
      <ul className="browser-evidence">
        {(scenario.browserItems || []).map((item, index) => (
          <li key={item} style={{ '--i': index + 7 }}>
            <Check size={13} strokeWidth={2.4} />
            {item}
            <em>captured</em>
          </li>
        ))}
      </ul>
    </div>
    <p className="dg-foot" style={{ '--i': 10 }}>EXTERNAL EVIDENCE CITED — THE BRIEF NOW MATCHES THE WORLD</p>
  </div>
);
