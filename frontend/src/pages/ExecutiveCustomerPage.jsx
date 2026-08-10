import { useParams, useSearchParams } from 'react-router-dom';
import { ExecutiveJourney } from '../components/investor/ExecutiveJourney';
import { findDepartment, findIndustry } from '../data/personaJourneys';

export default function ExecutiveCustomerPage({ onJoin }) {
  const { department, industry } = useParams();
  const [params] = useSearchParams();
  return <ExecutiveJourney department={findDepartment(department)} industry={findIndustry(industry)} problem={params.get('problem') || ''} onJoin={onJoin} />;
}