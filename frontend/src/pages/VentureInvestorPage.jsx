import { DestinationPage } from '../components/investor/DestinationPage';
import { investorJourneys } from '../data/personaJourneys';

export default function VentureInvestorPage({ onJoin }) {
  return <DestinationPage audience="investor" content={{ ...investorJourneys.venture, id: 'venture' }} onJoin={onJoin} />;
}