import { useParams } from 'react-router-dom';
import { DestinationPage } from '../components/investor/DestinationPage';
import { customerJourneys, findDepartment, findIndustry } from '../data/personaJourneys';

export default function TechnicalCustomerPage({ onJoin }) {
  const { department, industry } = useParams();
  return <DestinationPage audience="customer" content={{ ...customerJourneys.technical, id: 'technical' }} department={findDepartment(department)} industry={findIndustry(industry)} onJoin={onJoin} />;
}