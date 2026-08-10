import { DestinationPage } from '../components/investor/DestinationPage';
import { investorJourneys } from '../data/personaJourneys';

export default function StrategicInvestorPage({ onJoin }) {
  return <DestinationPage audience="investor" content={{ ...investorJourneys.strategic, id: 'strategic' }} onJoin={onJoin} />;
}