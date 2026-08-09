import { useMemo, useState } from 'react';
import { Seo } from '../components/Seo';
import { useScenarios } from '../cinematic/useScenarios';
import { InvestorHero } from '../components/investor/InvestorHero';
import { InvestorNarrative } from '../components/investor/InvestorNarrative';
import { InvestorLaptopDemo } from '../components/investor/InvestorLaptopDemo';
import { InvestorAgents } from '../components/investor/InvestorAgents';
import { InvestorCase } from '../components/investor/InvestorCase';
import { InvestorActRail } from '../components/investor/InvestorActRail';

const investorSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Acoord Investor Brief',
  description: 'The investor narrative for Acoord and Ahi, the Agent Human Interface for governed human-agent coordination.'
};

export default function InvestorPage({ onJoin }) {
  const scenarios = useScenarios();
  const [scenarioId, setScenarioId] = useState('finance');
  const scenario = useMemo(() => scenarios.find((item) => item.id === scenarioId) || scenarios[0], [scenarios, scenarioId]);

  return (
    <div className="investor-page" data-testid="investor-page">
      <Seo title="Acoord Investor Brief — The Coordination Layer for AI" description="Acoord is building the Agent Human Interface: the operating layer where people, specialist agents, knowledge, tools, and approvals coordinate." path="/investor" schema={investorSchema} />
      <InvestorActRail />
      <InvestorHero />
      <InvestorNarrative />
      <InvestorLaptopDemo scenarioId={scenarioId} onScenarioChange={setScenarioId} />
      <InvestorAgents scenario={scenario} />
      <InvestorCase onJoin={onJoin} />
    </div>
  );
}