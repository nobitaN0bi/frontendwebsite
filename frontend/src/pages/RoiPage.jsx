import { useState } from 'react';
import { RoiEstimator } from '../components/RoiEstimator';
import { Seo } from '../components/Seo';

const roiSchema = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Acoord AHI ROI Estimator', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: 'A directional calculator for annual coordination hours and gross value potentially recovered through AHI.' };

export default function RoiPage() {
  const [values, setValues] = useState({ employees: 100, cost: 75, hours: 6, recoverable: 25 });
  return <div className="branch-page" data-testid="roi-page">
    <Seo title="AHI ROI Estimator | Acoord" description="Estimate annual hours and gross value recovered through AHI, net of the OSI Launch plan." path="/roi" schema={roiSchema} />
    <section className="branch-hero"><span>ROI / DIRECTIONAL MODEL</span><h1 data-testid="roi-title">Measure coordination<br />before promising transformation.</h1><p>Use your employee cost and coordination baseline. A production pilot validates the real recoverable work.</p></section>
    <RoiEstimator values={values} onChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))} />
  </div>;
}