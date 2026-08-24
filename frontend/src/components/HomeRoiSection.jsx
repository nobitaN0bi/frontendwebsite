import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RoiEstimator } from './RoiEstimator';

export const HomeRoiSection = () => {
  const [values, setValues] = useState({ employees: 100, cost: 75, hours: 6, recoverable: 25 });
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  return <section className="home-roi-section" data-testid="home-roi-section"><header><span>OUTCOME MODEL / AFTER THE PRODUCT</span><h2 data-testid="home-roi-title">What does coordinated work return?</h2><p>Model recovered time against the $100,000 OSI Launch plan. No seat math. No unsupported savings claim.</p><Link to="/roi" data-testid="home-roi-page-link">Open the full estimator <ArrowRight size={15} /></Link></header><RoiEstimator compact values={values} onChange={update} /></section>;
};