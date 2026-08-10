import { useParams } from 'react-router-dom';
import { ExecutiveJourney } from '../components/investor/ExecutiveJourney';
import { findDepartment, findIndustry } from '../data/personaJourneys';

export default function ExecutiveCustomerPage({ onJoin }) {
  const { department, industry } = useParams();
  return <ExecutiveJourney department={findDepartment(department)} industry={findIndustry(industry)} onJoin={onJoin} />;
}