import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { suggestedProblems } from '../../data/ahiEcosystem';
import { customerRoles, departments, industries } from '../../data/personaJourneys';
import { KineticEcosystem } from './KineticEcosystem';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

export const CustomerSelector = ({ basePath = '/demo/customer' }) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const problem = params.get('problem') || '';
  const role = params.get('role') || '';
  const department = params.get('department') || '';
  const industry = params.get('industry') || '';
  const [step, setStep] = useState(industry ? 4 : department ? 3 : role ? 2 : problem ? 1 : 0);
  const [problemInput, setProblemInput] = useState(problem);
  const [filter, setFilter] = useState('');
  const reduced = useInvestorReducedMotion();
  const selectedRole = customerRoles.find((item) => item.id === role);
  const selectedDepartment = departments.find((item) => item.slug === department);
  const selectedIndustry = industries.find((item) => item.slug === industry);
  const options = step === 1 ? customerRoles : step === 2 ? departments : industries;
  const filtered = useMemo(() => options.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase())), [options, filter]);
  const labels = ['WHAT PROBLEM ARE YOU SOLVING?', 'YOUR AUTHORITY', 'YOUR TEAM', 'YOUR OPERATING ENVIRONMENT', 'YOUR OPERATING VIEW'];

  const commitProblem = (value) => {
    const clean = value.trim();
    if (!clean) return;
    const next = new URLSearchParams(params);
    next.set('problem', clean); next.delete('role'); next.delete('department'); next.delete('industry');
    setParams(next); setProblemInput(clean); setStep(1);
  };
  const choose = (item) => {
    const next = new URLSearchParams(params);
    if (step === 1) { next.set('role', item.id); next.delete('department'); next.delete('industry'); }
    if (step === 2) { next.set('department', item.slug); next.delete('industry'); }
    if (step === 3) next.set('industry', item.slug);
    setParams(next); setFilter(''); setStep((value) => Math.min(4, value + 1));
  };
  const back = () => setStep((value) => Math.max(0, value - 1));
  const open = () => navigate(`${basePath}/${role}/${department}/${industry}?${new URLSearchParams({ problem, role, department, industry })}`);

  return <div className="cinematic-selector problem-first-selector" data-testid="customer-selector">
    <header><Link to="/demo/workspace" data-testid="customer-selector-back-link"><ArrowLeft size={14} /> Full product explorer</Link><div data-testid="customer-selector-progress"><span className={step >= 0 ? 'active' : ''}>01 PROBLEM</span><span className={step >= 1 ? 'active' : ''}>02 ROLE</span><span className={step >= 2 ? 'active' : ''}>03 TEAM</span><span className={step >= 3 ? 'active' : ''}>04 INDUSTRY</span></div></header>
    <KineticEcosystem compact={step > 0} />
    <main>
      <AnimatePresence mode="wait"><motion.section key={step} className={step === 0 ? 'selector-problem-step' : ''} initial={reduced ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -20 }} transition={{ duration: reduced ? 0 : .42, ease: [0.16, 1, 0.3, 1] }} data-testid={step === 0 ? 'customer-problem-step' : step === 1 ? 'customer-role-step' : step === 2 ? 'customer-department-step' : step === 3 ? 'customer-industry-step' : 'customer-summary-step'}>
        <div className="selector-question"><p>CUSTOMER / STEP 0{step + 1}</p><h1 data-testid="customer-selector-title">{labels[step]}</h1>{step > 0 && <button type="button" onClick={back} data-testid="customer-selector-step-back-button"><ArrowLeft size={14} /> Previous</button>}</div>
        {step === 0 ? <form className="problem-capture" onSubmit={(event) => { event.preventDefault(); commitProblem(problemInput); }} data-testid="customer-problem-form"><label htmlFor="customer-problem-input">Describe an operating problem—not a feature request.</label><div><textarea id="customer-problem-input" value={problemInput} onChange={(event) => setProblemInput(event.target.value)} placeholder="Example: turn every customer meeting into cited notes, owned actions, a follow-up deck, and a durable account record." data-testid="customer-problem-input" /><button type="submit" disabled={!problemInput.trim()} data-testid="customer-problem-submit-button">Frame this problem <ArrowRight size={15} /></button></div><nav aria-label="Suggested problems" data-testid="customer-problem-suggestions">{suggestedProblems.map((item, index) => <button key={item} type="button" onClick={() => commitProblem(item)} data-testid={`customer-problem-suggestion-${index + 1}-button`}><span>0{index + 1}</span>{item}</button>)}</nav><p>Connection availability varies by workspace policy and deployment.</p></form> : step < 4 ? <div className="selector-options"><label><Search size={15} /><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={`Filter ${step === 1 ? 'roles' : step === 2 ? 'departments' : 'industries'}`} data-testid={step === 3 ? 'customer-industry-search-input' : `customer-step-${step + 1}-search-input`} /></label><div data-testid={step === 1 ? 'customer-role-grid' : step === 2 ? 'customer-department-grid' : 'customer-industry-grid'}>{filtered.map((item, index) => { const id = step === 1 ? item.id : item.slug; return <button key={id} type="button" onClick={() => choose(item)} data-testid={step === 1 ? `customer-role-${id}-button` : step === 2 ? `customer-department-${id}-button` : `customer-industry-${id}-button`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong><ArrowRight size={14} /></button>; })}</div></div> : <div className="selector-summary" data-testid="customer-selector-launch"><p>OPERATING VIEW READY</p><h2>{selectedRole?.label}<br />{selectedDepartment?.label}<br />{selectedIndustry?.label}</h2><blockquote>“{problem}”</blockquote><span>{selectedDepartment?.objective}. In {selectedIndustry?.label}, {selectedIndustry?.pressure}.</span><button type="button" onClick={open} data-testid="customer-open-destination-button">Watch Ahi solve this <ArrowRight size={15} /></button></div>}
      </motion.section></AnimatePresence>
    </main>
  </div>;
};