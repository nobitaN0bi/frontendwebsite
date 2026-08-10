import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Database, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { investmentStages, investorIntents, investorRegions, investorRoute, investorSectors, investorTimelines, investorTypes } from '../../data/investorOnboarding';
import { InvestorProductLoop } from './InvestorProductLoop';
import { useInvestorReducedMotion } from './useInvestorReducedMotion';

const SingleChoice = ({ items, value, onChange, prefix }) => <div className="investor-choice-grid">{items.map((item, index) => { const option = typeof item === 'string' ? { id: item, label: item } : item; return <button key={option.id} type="button" className={value === option.id ? 'selected' : ''} onClick={() => onChange(option.id)} data-testid={`${prefix}-${index + 1}-button`}><span>0{index + 1}</span><strong>{option.label}</strong>{option.note && <small>{option.note}</small>}{value === option.id && <Check size={14} />}</button>; })}</div>;

const MultiChoice = ({ items, values, onChange, prefix }) => <div className="investor-pill-grid">{items.map((item, index) => <button key={item} type="button" className={values.includes(item) ? 'selected' : ''} onClick={() => onChange(values.includes(item) ? values.filter((value) => value !== item) : [...values, item])} data-testid={`${prefix}-${index + 1}-button`}>{item}{values.includes(item) && <Check size={12} />}</button>)}</div>;

export const PersonaGateway = () => {
  const reduced = useInvestorReducedMotion();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ type: '', stage: '', sectors: [], intent: '', timeline: '', region: '', name: '', email: '' });
  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
  const next = () => setStep((current) => Math.min(4, current + 1));
  const previous = () => setStep((current) => Math.max(0, current - 1));
  const route = investorRoute(profile.type);

  const content = [
    <div key="type"><p>01 / WHO ARE YOU INVESTING AS?</p><h1>Choose the lens—not a box.</h1><span>This changes the brief you receive. “Exploring” is a complete answer.</span><SingleChoice items={investorTypes} value={profile.type} onChange={(value) => update('type', value)} prefix="investor-type" /></div>,
    <div key="focus"><p>02 / WHERE DO YOU FOCUS?</p><h1>Stage and thesis.</h1><span>Choose one stage and any sectors that matter. Both are optional.</span><label className="investor-field-label">STAGE / ENGAGEMENT</label><SingleChoice items={investmentStages} value={profile.stage} onChange={(value) => update('stage', value)} prefix="investor-stage" /><label className="investor-field-label">SECTORS / MULTI-SELECT</label><MultiChoice items={investorSectors} values={profile.sectors} onChange={(value) => update('sectors', value)} prefix="investor-sector" /></div>,
    <div key="intent"><p>03 / WHAT SHOULD THIS CONVERSATION DO?</p><h1>Intent, timing, region.</h1><span>Enough context to tailor the next screen—never a qualification trap.</span><label className="investor-field-label">PRIMARY INTENT</label><SingleChoice items={investorIntents} value={profile.intent} onChange={(value) => update('intent', value)} prefix="investor-intent" /><div className="investor-split-fields"><div><label className="investor-field-label">TIMELINE</label><SingleChoice items={investorTimelines} value={profile.timeline} onChange={(value) => update('timeline', value)} prefix="investor-timeline" /></div><div><label className="investor-field-label">GEOGRAPHY</label><SingleChoice items={investorRegions} value={profile.region} onChange={(value) => update('region', value)} prefix="investor-region" /></div></div></div>,
    <div key="contact"><p>04 / OPTIONAL CONTACT</p><h1>Leave a return path—or don’t.</h1><span>This preview does not submit or save anything. CRM handoff comes after the database connection.</span><div className="investor-contact-grid"><label><User size={15} /><span>Name / optional</span><input value={profile.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" data-testid="investor-name-input" /></label><label><Mail size={15} /><span>Email / optional</span><input type="email" value={profile.email} onChange={(event) => update('email', event.target.value)} placeholder="you@fund.com" data-testid="investor-email-input" /></label></div><div className="crm-reservation"><Database size={17} /><div><strong>CRM HANDOFF / RESERVED</strong><p>Nothing has been saved or sent. Connect the investor database later to activate this handoff.</p></div></div></div>
  ];

  return <div className="investor-onboarding" data-testid="persona-gateway">
    <header><span>ACOORD / INVESTOR BRIEF</span><div>{[0,1,2,3].map((index) => <i key={index} className={index <= step ? 'active' : ''} />)}</div><b>{step < 4 ? `0${step + 1} / 04` : 'BRIEF / READY'}</b></header>
    <InvestorProductLoop />
    <main>
      <AnimatePresence mode="wait">{step < 4 ? <motion.section key={step} initial={reduced ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -18 }} transition={{ duration: reduced ? 0 : .25, ease: [0.215,.61,.355,1] }} data-testid={`investor-onboarding-step-${step + 1}`}>{content[step]}</motion.section> : <motion.section key="brief" className="investor-brief" initial={reduced ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : .25, ease: [0.215,.61,.355,1] }} data-testid="investor-tailored-brief"><p>TAILORED BRIEF / READY</p><h1>{investorTypes.find((item) => item.id === profile.type)?.label || 'Exploring investor'} lens</h1><div className="brief-ledger"><span>THESIS</span><strong>{profile.sectors.length ? profile.sectors.join(' · ') : 'Broad category view'}</strong><span>ENGAGEMENT</span><strong>{profile.stage || 'Not specified'}</strong><span>INTENT</span><strong>{profile.intent || 'Understand Acoord'}</strong><span>CONTEXT</span><strong>{[profile.timeline, profile.region].filter(Boolean).join(' · ') || 'Open'}</strong></div><div className="crm-reservation"><Database size={17} /><div><strong>CRM HANDOFF / COMING LATER</strong><p>This brief exists only in this browser session. No contact or profile data has been submitted.</p></div></div><Link to={route} data-testid={`persona-investor-${profile.type || 'venture'}-link`}>Open the tailored product brief <ArrowRight size={15} /></Link></motion.section>}</AnimatePresence>
    </main>
    {step < 4 && <footer><button type="button" onClick={previous} disabled={step === 0} data-testid="investor-previous-step-button"><ArrowLeft size={14} /> Back</button><button type="button" className="investor-skip" onClick={next} data-testid="investor-skip-step-button">Skip respectfully</button><button type="button" onClick={next} data-testid="investor-next-step-button">{step === 3 ? 'Build my brief' : 'Continue'} <ArrowRight size={14} /></button></footer>}
  </div>;
};