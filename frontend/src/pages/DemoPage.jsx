import { Seo } from '../components/Seo';
import { CustomerSelector } from '../components/investor/CustomerSelector';

export default function DemoPage() {
  return <div className="investor-page customer-demo-page" data-testid="demo-page"><Seo title="Solve a Real Operating Problem with Ahi" description="Frame an operating problem, choose your role, team, and industry, then watch Ahi work through it in the live product." path="/demo" /><CustomerSelector /></div>;
}