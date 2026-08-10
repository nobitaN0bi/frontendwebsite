import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Search, X } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { suggestedProblems } from '../../data/ahiEcosystem';
import { customerRoles, departments, industries } from '../../data/personaJourneys';
import { KineticEcosystem } from './KineticEcosystem';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const SearchPicker = ({ label, value, options, onSelect, testId }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(null);
  const triggerRef = useRef(null);
  const selected = options.find((item) => item.slug === value);
  const filtered = useMemo(() => options.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())), [options, query]);
  const menuId = `${testId}-menu`;
  const selectOption = (item) => { onSelect(item.slug); setOpen(false); setQuery(''); setActiveIndex(0); };
  const measure = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const maxHeight = Math.min(280, window.innerHeight - 32);
    const width = window.innerWidth <= 760 ? window.innerWidth - 24 : Math.max(250, rect.width);
    const left = window.innerWidth <= 760 ? 12 : Math.min(rect.left, window.innerWidth - width - 12);
    const below = window.innerHeight - rect.bottom - 12;
    const top = below >= Math.min(240, maxHeight) ? rect.bottom + 8 : Math.max(12, rect.top - maxHeight - 8);
    setPosition({ left, top, width, maxHeight });
  };
  useEffect(() => {
    if (!open) return undefined;
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => { window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); };
  }, [open]);
  useEffect(() => setActiveIndex(0), [query]);
  const handleKeys = (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(filtered.length - 1, index + 1)); }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(0, index - 1)); }
    if (event.key === 'Enter' && filtered[activeIndex]) { event.preventDefault(); selectOption(filtered[activeIndex]); }
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
  };
  const menu = open && position ? <motion.div id={menuId} role="listbox" className="canvas-picker-menu portal" style={position} initial={{ opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }} transition={{ duration: .2, ease: [0.215, .61, .355, 1] }}><label><Search size={14} /><input autoFocus role="combobox" aria-expanded="true" aria-controls={`${menuId}-options`} aria-activedescendant={filtered[activeIndex] ? `${testId}-option-${filtered[activeIndex].slug}` : undefined} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeys} placeholder={`Search ${label.toLowerCase()}`} data-testid={`${testId}-search`} /><button type="button" tabIndex={-1} onClick={() => setOpen(false)} aria-label="Close choices" data-testid={`${testId}-close-button`}><X size={13} /></button></label><div id={`${menuId}-options`}>{filtered.map((item, index) => <button id={`${testId}-option-${item.slug}`} key={item.slug} type="button" role="option" aria-selected={item.slug === value} className={`${item.slug === value ? 'selected' : ''} ${index === activeIndex ? 'keyboard-active' : ''}`} onFocus={() => setActiveIndex(index)} onClick={() => selectOption(item)} data-testid={`${testId}-${item.slug}-option`}><span>{item.label}</span>{item.slug === value && <Check size={13} />}</button>)}</div></motion.div> : null;
  return <div className={`canvas-picker ${open ? 'open' : ''}`} data-testid={`${testId}-picker`}>
    <span>{label}</span><button ref={triggerRef} type="button" aria-haspopup="listbox" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((current) => !current)} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActiveIndex(0); } }} data-testid={`${testId}-trigger`}><strong>{selected?.label || `Choose ${label.toLowerCase()}`}</strong><ChevronDown size={15} /></button>
    {createPortal(<AnimatePresence>{menu}</AnimatePresence>, document.body)}
  </div>;
};

export const CustomerOnboardingCanvas = ({ variant = 'A', basePath = '/demo/customer' }) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const reduced = useInvestorReducedMotion();
  const initialProblem = params.get('problem') || '';
  const [problem, setProblem] = useState(initialProblem);
  const [stage, setStage] = useState(variant === 'B' && !initialProblem ? 'problem' : 'canvas');
  const role = params.get('role') || '';
  const department = params.get('department') || '';
  const industry = params.get('industry') || '';
  const completeCount = [problem.trim(), role, department, industry].filter(Boolean).length;
  const complete = completeCount === 4;

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params); next.set(key, value); setParams(next, { replace: true });
  };
  const commitProblem = (value = problem) => {
    const clean = value.trim(); if (!clean) return;
    setProblem(clean); updateParam('problem', clean); setStage('canvas');
  };
  const openView = () => {
    const query = new URLSearchParams({ problem: problem.trim(), role, department, industry });
    navigate(`${basePath}/${role}/${department}/${industry}?${query}`);
  };

  return <div className={`customer-onboarding variant-${variant.toLowerCase()}`} data-testid={`customer-onboarding-${variant.toLowerCase()}`}>
    <header className="onboarding-header"><Link to="/demo/workspace" data-testid="customer-full-explorer-link"><ArrowLeft size={14} /> Full product explorer</Link><div><span>A/B VARIANT {variant}</span><b>{completeCount} / 4 SIGNALS</b></div></header>
    <KineticEcosystem compact={stage === 'canvas'} />
    <AnimatePresence mode="wait">
      {stage === 'problem' ? <motion.main key="problem" className="problem-first-stage" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, scale: .96, y: -24 }} transition={{ duration: reduced ? 0 : .25, ease: [0.215, .61, .355, 1] }} data-testid="variant-b-problem-stage"><p>START WITH THE WORK</p><h1>What problem should Ahi solve?</h1><textarea value={problem} onChange={(event) => setProblem(event.target.value)} placeholder="Turn a consequential workflow into evidence, owned actions, human approval, and a durable record." data-testid="customer-problem-input" /><div><button type="button" disabled={!problem.trim()} onClick={() => commitProblem()} data-testid="customer-problem-submit-button">Build the operating context <ArrowRight size={15} /></button><span>or choose a starting point</span></div><nav>{suggestedProblems.slice(0, 3).map((item, index) => <button key={item} type="button" onClick={() => commitProblem(item)} data-testid={`customer-problem-suggestion-${index + 1}-button`}><span>0{index + 1}</span>{item}</button>)}</nav></motion.main> : <motion.main key="canvas" className="onboarding-canvas" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .25, ease: [0.215, .61, .355, 1] }} data-testid="customer-context-canvas">
        <section className={`canvas-field canvas-problem ${problem.trim() ? 'complete' : ''}`} data-testid="canvas-problem-field"><header><span>01 / PROBLEM</span>{problem.trim() && <Check size={14} />}</header><textarea value={problem} onChange={(event) => setProblem(event.target.value)} onBlur={() => problem.trim() && updateParam('problem', problem.trim())} placeholder="Describe the operating problem" data-testid="canvas-problem-input" /></section>
        <section className={`canvas-field canvas-authority ${role ? 'complete' : ''}`} data-testid="canvas-authority-field"><header><span>02 / ROLE + AUTHORITY</span>{role && <Check size={14} />}</header><div>{customerRoles.map((item) => <button key={item.id} type="button" className={role === item.id ? 'selected' : ''} onClick={() => updateParam('role', item.id)} data-testid={`customer-role-${item.id}-button`}><strong>{item.label}</strong><small>{item.note}</small></button>)}</div></section>
        <motion.section className={`canvas-state state-${completeCount}`} animate={{ scale: complete ? 1.025 : 1 }} transition={{ duration: reduced ? 0 : .25, ease: [0.645, .045, .355, 1] }} data-testid="customer-ahi-state"><div className="canvas-state-orbit"><i /><i /><i /><i /></div><span>AHI / CONTEXT</span><strong>{complete ? 'READY' : `${completeCount} SIGNAL${completeCount === 1 ? '' : 'S'}`}</strong><div className={`canvas-mini-laptop ${complete ? 'open' : ''}`}><div /><i /></div></motion.section>
        <section className={`canvas-field canvas-team ${department ? 'complete' : ''}`} data-testid="canvas-team-field"><SearchPicker label="Team" value={department} options={departments} onSelect={(value) => updateParam('department', value)} testId="customer-department" /></section>
        <section className={`canvas-field canvas-industry ${industry ? 'complete' : ''}`} data-testid="canvas-industry-field"><SearchPicker label="Industry" value={industry} options={industries} onSelect={(value) => updateParam('industry', value)} testId="customer-industry" /></section>
        <section className={`canvas-launch ${complete ? 'ready' : ''}`} data-testid="customer-selector-launch"><div><span>{complete ? 'OPERATING VIEW READY' : 'COMPLETE THE CONTEXT'}</span><strong>{complete ? 'Open the live product around this problem.' : 'Problem · Authority · Team · Industry'}</strong></div><button type="button" disabled={!complete} onClick={openView} data-testid="customer-open-destination-button">{complete ? 'Open the MacBook' : `${4 - completeCount} remaining`} <ArrowRight size={15} /></button></section>
      </motion.main>}
    </AnimatePresence>
  </div>;
};