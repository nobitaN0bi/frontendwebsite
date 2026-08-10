import { Navigate, useLocation, useParams } from 'react-router-dom';

export default function LegacyCustomerRedirectPage() {
  const { role, department, industry } = useParams();
  const location = useLocation();
  const target = role && department && industry ? `/demo/customer/${role}/${department}/${industry}` : '/demo';
  return <Navigate replace to={`${target}${location.search}`} />;
}