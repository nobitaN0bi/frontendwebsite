import { Seo } from '../components/Seo';
import { CustomerSelector } from '../components/investor/CustomerSelector';

export default function CustomerGatewayPage() {
  return <div className="investor-page" data-testid="customer-gateway-page"><Seo title="Build Your Acoord Operating View" description="Choose your role, department, and industry to see the Ahi system through your operating reality." path="/investor/customer" /><CustomerSelector /></div>;
}