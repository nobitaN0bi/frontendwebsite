import { DestinationPage } from '../components/investor/DestinationPage';
import { investorJourneys } from '../data/personaJourneys';

export default function OperatorInvestorPage({ onJoin }) {
  return <DestinationPage audience="investor" content={{ ...investorJourneys.operator, id: 'operator' }} onJoin={onJoin} />;
}