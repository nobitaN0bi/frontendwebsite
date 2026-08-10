import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { customerRoles, departments, industries } from '../../data/personaJourneys';

export const CustomerSelector = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState('');
  const role = params.get('role') || '';
  const department = params.get('department') || '';
  const industry = params.get('industry') || '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    if (key === 'role') { next.delete('department'); next.delete('industry'); }
    if (key === 'department') next.delete('industry');
    setParams(next);
  };

  const filteredIndustries = useMemo(() => industries.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase())), [filter]);
  const selectedRole = customerRoles.find((item) => item.id === role);
  const canOpen = Boolean(role && department && industry);
  const openDestination = () => {
    if (!canOpen) return;
    navigate(`/investor/customer/${role}/${department}/${industry}?role=${role}&department=${department}&industry=${industry}`);
  };

  return (
    <div className="customer-selector" data-testid="customer-selector">
      <header className="selector-header">
        <Link to="/investor" data-testid="customer-selector-back-link"><ArrowLeft size={15} /> Change lens</Link>
        <p className="persona-label" data-testid="customer-selector-kicker">CUSTOMER / BUILD YOUR OPERATING VIEW</p>
        <h1 data-testid="customer-selector-title">Place the system<br /><span>inside your reality.</span></h1>
        <div className="selector-progress" data-testid="customer-selector-progress"><span className={role ? 'complete' : 'active'}>01 ROLE</span><span className={department ? 'complete' : role ? 'active' : ''}>02 DEPARTMENT</span><span className={industry ? 'complete' : department ? 'active' : ''}>03 INDUSTRY</span></div>
      </header>

      <section className="selector-step" data-testid="customer-role-step">
        <div className="selector-step-heading"><span>01</span><div><h2>Choose your authority.</h2><p>The page changes according to the decision you own.</p></div></div>
        <div className="selector-role-grid">
          {customerRoles.map((item) => <button key={item.id} type="button" className={role === item.id ? 'selected' : ''} onClick={() => update('role', item.id)} data-testid={`customer-role-${item.id}-button`}><strong>{item.label}</strong><p>{item.note}</p><ArrowUpRight /></button>)}
        </div>
      </section>

      <section className={`selector-step ${!role ? 'locked' : ''}`} data-testid="customer-department-step">
        <div className="selector-step-heading"><span>02</span><div><h2>Choose the operating team.</h2><p>Every team has a different human boundary.</p></div></div>
        <div className="selector-taxonomy-grid" data-testid="customer-department-grid">
          {departments.map((item, index) => <button key={item.slug} type="button" disabled={!role} className={department === item.slug ? 'selected' : ''} onClick={() => update('department', item.slug)} data-testid={`customer-department-${item.slug}-button`}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}
        </div>
      </section>

      <section className={`selector-step ${!department ? 'locked' : ''}`} data-testid="customer-industry-step">
        <div className="selector-step-heading"><span>03</span><div><h2>Choose the operating environment.</h2><p>Industry changes the evidence, constraints, and approval line.</p></div></div>
        <label className="selector-search" data-testid="customer-industry-search-label"><Search size={16} /><span className="sr-only">Filter industries</span><input value={filter} onChange={(event) => setFilter(event.target.value)} disabled={!department} placeholder="Filter industries" data-testid="customer-industry-search-input" /></label>
        <div className="selector-taxonomy-grid industry-grid" data-testid="customer-industry-grid">
          {filteredIndustries.map((item, index) => <button key={item.slug} type="button" disabled={!department} className={industry === item.slug ? 'selected' : ''} onClick={() => update('industry', item.slug)} data-testid={`customer-industry-${item.slug}-button`}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}
        </div>
      </section>

      <div className={`selector-launch ${canOpen ? 'ready' : ''}`} data-testid="customer-selector-launch">
        <div><span>{canOpen ? 'VIEW READY' : 'COMPLETE THE THREE SIGNALS'}</span><strong>{selectedRole?.label || 'Customer view'}{department ? ` / ${departments.find((item) => item.slug === department)?.label}` : ''}{industry ? ` / ${industries.find((item) => item.slug === industry)?.label}` : ''}</strong></div>
        <button type="button" disabled={!canOpen} onClick={openDestination} data-testid="customer-open-destination-button">Open operating view <ArrowUpRight size={17} /></button>
      </div>
    </div>
  );
};