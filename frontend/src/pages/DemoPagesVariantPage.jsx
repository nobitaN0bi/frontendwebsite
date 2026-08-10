import { Seo } from '../components/Seo';
import { CustomerSelector } from '../components/investor/CustomerSelector';

export default function DemoPagesVariantPage() {
  return <div className="investor-page customer-demo-page" data-testid="demopages-variant-page"><Seo title="Frame a Problem with Ahi" description="Start with the problem, then form the role, team, and industry context around a live Ahi product view." path="/demopages" /><CustomerSelector variant="B" /></div>;
}