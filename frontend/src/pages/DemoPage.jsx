import { Seo } from '../components/Seo';
import { CustomerSelector } from '../components/investor/CustomerSelector';

export default function DemoPage() {
  return <div className="investor-page customer-demo-page" data-testid="demo-page"><Seo title="Solve a Real Operating Problem with Ahi" description="Frame an operating problem, role, team, and industry together, then watch Ahi work through it in the live product." path="/demo" /><CustomerSelector variant="A" /></div>;
}