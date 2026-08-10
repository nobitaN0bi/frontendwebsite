import { useParams, useSearchParams } from 'react-router-dom';
import { WorkflowJourney } from '../components/investor/WorkflowJourney';
import { findDepartment, findIndustry } from '../data/personaJourneys';

export default function WorkflowCustomerPage({ onJoin }) {
  const { department, industry } = useParams();
  const [params] = useSearchParams();
  return <WorkflowJourney department={findDepartment(department)} industry={findIndustry(industry)} problem={params.get('problem') || ''} onJoin={onJoin} />;
}