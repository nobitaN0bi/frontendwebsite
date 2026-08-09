import { InvestorReveal } from './InvestorReveal';
import { investorThesis, timingSignals } from '../../data/investorContent';

export const InvestorNarrative = () => (
  <>
    <section className="investor-section investor-thesis" data-testid="investor-thesis-section">
      <InvestorReveal className="investor-section-head" testId="investor-thesis-heading">
        <p className="investor-kicker">01 / THE THESIS</p>
        <h2>More intelligence creates more coordination.</h2>
        <p>The common assumption is that a better model removes the need for workflow. In an enterprise, the opposite happens: more capable agents can touch more consequential work.</p>
      </InvestorReveal>
      <div className="investor-thesis-grid" data-testid="investor-thesis-grid">
        {investorThesis.map((item, index) => (
          <InvestorReveal as="article" key={item.code} delay={index * 0.08} testId={`investor-thesis-${item.code}`}>
            <span>{item.code}</span><h3>{item.title}</h3><p>{item.text}</p>
          </InvestorReveal>
        ))}
      </div>
    </section>

    <section className="investor-section investor-timing" data-testid="investor-timing-section">
      <InvestorReveal className="investor-section-head" testId="investor-timing-heading">
        <p className="investor-kicker">02 / WHY NOW</p>
        <h2>The interface layer is moving.</h2>
        <p>Ahi is built for a transition from single-model chat to multi-agent, cross-system operations—without asking the enterprise to surrender the human line.</p>
      </InvestorReveal>
      <div className="investor-signal-list" data-testid="investor-timing-signal-list">
        {timingSignals.map(([label, text], index) => (
          <InvestorReveal as="article" key={label} delay={index * 0.07} testId={`investor-signal-${index + 1}`}>
            <span>0{index + 1}</span><h3>{label}</h3><p>{text}</p>
          </InvestorReveal>
        ))}
      </div>
      <InvestorReveal className="investor-category-line" testId="investor-category-statement">
        <span>CATEGORY</span><strong>Not another agent. The place every agent becomes a team.</strong>
      </InvestorReveal>
    </section>
  </>
);