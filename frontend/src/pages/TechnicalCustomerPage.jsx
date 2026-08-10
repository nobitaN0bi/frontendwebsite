import { useParams } from 'react-router-dom';
import { TechnicalJourney } from '../components/investor/TechnicalJourney';
import { findDepartment, findIndustry } from '../data/personaJourneys';

export default function TechnicalCustomerPage({ onJoin }) {
  const { department, industry } = useParams();
  return <TechnicalJourney department={findDepartment(department)} industry={findIndustry(industry)} onJoin={onJoin} />;
}