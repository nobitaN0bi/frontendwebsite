import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { customerRoles, departments, industries } from '../../data/personaJourneys';
import { FilmStage } from './FilmStage';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const CustomerSelector = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const role = params.get('role') || '';
  const department = params.get('department') || '';
  const industry = params.get('industry') || '';
  const [step, setStep] = useState(industry ? 3 : department ? 2 : role ? 1 : 0);
  const [filter, setFilter] = useState('');
  const reduced = useInvestorReducedMotion();
  const selectedRole = customerRoles.find((item) => item.id === role);
  const selectedDepartment = departments.find((item) => item.slug === department);
  const selectedIndustry = industries.find((item) => item.slug === industry);
  const options = step === 0 ? customerRoles : step === 1 ? departments : industries;
  const filtered = useMemo(() => options.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase())), [options, filter]);

  const choose = (item) => {
    const next = new URLSearchParams(params);
    if (step === 0) { next.set('role', item.id); next.delete('department'); next.delete('industry'); }
    if (step === 1) { next.set('department', item.slug); next.delete('industry'); }
    if (step === 2) next.set('industry', item.slug);
    setParams(next); setFilter(''); setStep((value) => Math.min(3, value + 1));
  };
  const back = () => setStep((value) => Math.max(0, value - 1));
  const open = () => navigate(`/investor/customer/${role}/${department}/${industry}?role=${role}&department=${department}&industry=${industry}`);
  const labels = ['YOUR AUTHORITY', 'YOUR TEAM', 'YOUR OPERATING ENVIRONMENT', 'YOUR OPERATING VIEW'];

  return <div className="cinematic-selector" data-testid="customer-selector">
    <header><Link to="/investor" data-testid="customer-selector-back-link"><ArrowLeft size={14} /> Investor gateway</Link><div data-testid="customer-selector-progress"><span className={step >= 0 ? 'active' : ''}>01 ROLE</span><span className={step >= 1 ? 'active' : ''}>02 DEPARTMENT</span><span className={step >= 2 ? 'active' : ''}>03 INDUSTRY</span></div></header>
    <div className="selector-system" aria-hidden="true"><FilmStage variant="workflow" active={Math.min(4, step + 1)} signal={`${labels[step]} / ACTIVE`} /></div>
    <main>
      <AnimatePresence mode="wait"><motion.section key={step} initial={reduced ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -20 }} transition={{ duration: reduced ? 0 : .35 }} data-testid={step === 0 ? 'customer-role-step' : step === 1 ? 'customer-department-step' : step === 2 ? 'customer-industry-step' : 'customer-summary-step'}>
        <div className="selector-question"><p>CUSTOMER / STEP 0{step + 1}</p><h1 data-testid="customer-selector-title">{labels[step]}</h1>{step > 0 && <button type="button" onClick={back} data-testid="customer-selector-step-back-button"><ArrowLeft size={14} /> Previous</button>}</div>
        {step < 3 ? <div className="selector-options"><label><Search size={15} /><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={`Filter ${step === 0 ? 'roles' : step === 1 ? 'departments' : 'industries'}`} data-testid={step === 2 ? 'customer-industry-search-input' : `customer-step-${step + 1}-search-input`} /></label><div data-testid={step === 0 ? 'customer-role-grid' : step === 1 ? 'customer-department-grid' : 'customer-industry-grid'}>{filtered.map((item, index) => { const id = step === 0 ? item.id : item.slug; return <button key={id} type="button" onClick={() => choose(item)} data-testid={step === 0 ? `customer-role-${id}-button` : step === 1 ? `customer-department-${id}-button` : `customer-industry-${id}-button`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong><ArrowRight size={14} /></button>; })}</div></div> : <div className="selector-summary" data-testid="customer-selector-launch"><p>VIEW READY</p><h2>{selectedRole?.label}<br />{selectedDepartment?.label}<br />{selectedIndustry?.label}</h2><span>{selectedDepartment?.objective}. In {selectedIndustry?.label}, {selectedIndustry?.pressure}.</span><button type="button" onClick={open} data-testid="customer-open-destination-button">Watch this operating view <ArrowRight size={15} /></button></div>}
      </motion.section></AnimatePresence>
    </main>
  </div>;
};