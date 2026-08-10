import { useParams, useSearchParams } from 'react-router-dom';
import { TechnicalJourney } from '../components/investor/TechnicalJourney';
import { findDepartment, findIndustry } from '../data/personaJourneys';

export default function TechnicalCustomerPage({ onJoin }) {
  const { department, industry } = useParams();
  const [params] = useSearchParams();
  return <TechnicalJourney department={findDepartment(department)} industry={findIndustry(industry)} problem={params.get('problem') || ''} onJoin={onJoin} />;
}