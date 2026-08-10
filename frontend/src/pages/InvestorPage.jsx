import { Seo } from '../components/Seo';
import { PersonaGateway } from '../components/investor/PersonaGateway';

const investorSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Acoord Investor Brief',
  description: 'The investor narrative for Acoord and Ahi, the Agent Human Interface for governed human-agent coordination.'
};

export default function InvestorPage() {
  return (
    <div className="investor-page" data-testid="investor-page">
      <Seo title="Choose Your Acoord Lens" description="Enter Acoord through an investor or enterprise operating lens." path="/investor" schema={investorSchema} />
      <PersonaGateway />
    </div>
  );
}