import { ArrowRight } from 'lucide-react';
import { InvestorReveal } from './InvestorReveal';

const mandates = [
  ['ORCHESTRATE', 'Reads the intent, assigns the operating plan, and owns the stop conditions.'],
  ['GROUND', 'Retrieves policy, evidence, and organisational context before action.'],
  ['ANALYSE', 'Tests the options inside the workflow’s constraints and surfaces uncertainty.'],
  ['RECORD', 'Turns the run into a cited rationale, approval packet, and durable audit line.']
];

export const InvestorAgents = ({ scenario }) => {
  const agents = scenario?.agents || [];
  return (
    <section className="investor-section investor-agents" data-testid="investor-agent-profiles-section">
      <InvestorReveal className="investor-section-head" testId="investor-agents-heading">
        <p className="investor-kicker">04 / THE AGENT TEAM</p>
        <h2>Hire the ontology,<br />not a generic bot.</h2>
        <p>Each specialist receives a mandate, the relevant organisational context, approved tools, and a visible relationship to the human owner.</p>
      </InvestorReveal>
      <div className="investor-agent-context" data-testid="investor-agent-context">
        <span>ACTIVE MODELED CHANNEL</span><strong>{scenario?.label || 'Finance'} / {scenario?.teamspace || 'Operations'}</strong><p>{scenario?.intent}</p>
      </div>
      <div className="investor-agent-list" data-testid="investor-agent-profile-list">
        {agents.slice(0, 4).map((agent, index) => (
          <InvestorReveal as="article" key={agent} delay={index * 0.07} testId={`investor-agent-profile-${index + 1}`}>
            <span>0{index + 1}</span>
            <div><small>{mandates[index][0]}</small><h3>{agent}</h3></div>
            <p>{mandates[index][1]}</p>
            <ArrowRight size={18} aria-hidden="true" />
          </InvestorReveal>
        ))}
      </div>
    </section>
  );
};