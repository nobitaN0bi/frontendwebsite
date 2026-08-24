import { ArrowUpRight } from 'lucide-react';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export const RoiEstimator = ({ values, onChange, compact = false }) => {
  const annualHours = values.employees * values.hours * 52 * (values.recoverable / 100);
  const grossValue = annualHours * values.cost;
  const netValue = grossValue - 100000;
  const paybackMonths = grossValue > 0 ? 100000 / (grossValue / 12) : 0;
  const fields = [
    { key: 'employees', label: 'Employees using agents', min: 10, max: 2000, step: 10, suffix: '' },
    { key: 'cost', label: 'Loaded hourly employee cost', min: 25, max: 250, step: 5, suffix: '/hr' },
    { key: 'hours', label: 'Hours lost to coordination / week', min: 1, max: 20, step: 1, suffix: ' hrs' },
    { key: 'recoverable', label: 'Work recoverable through AHI', min: 5, max: 80, step: 5, suffix: '%' }
  ];

  return (
    <section className={`roi-calculator ${compact ? 'is-compact' : ''}`} data-testid="roi-calculator">
      <div className="roi-controls">
        {fields.map((field) => <label key={field.key} htmlFor={`roi-${field.key}`} data-testid={`roi-${field.key}-control`}><span>{field.label}<strong data-testid={`roi-${field.key}-value`}>{field.key === 'cost' ? money.format(values[field.key]) : `${number.format(values[field.key])}${field.suffix}`}</strong></span><input id={`roi-${field.key}`} type="range" min={field.min} max={field.max} step={field.step} value={values[field.key]} onChange={(event) => onChange(field.key, Number(event.target.value))} data-testid={`roi-${field.key}-slider`} /></label>)}
      </div>
      <div className="roi-results" aria-live="polite" data-testid="roi-results">
        <div><span>Annual hours recovered</span><strong data-testid="roi-hours-result">{number.format(annualHours)}</strong></div>
        <div><span>Annual gross recovered value</span><strong data-testid="roi-gross-result">{money.format(grossValue)}</strong></div>
        <div><span>Net value after OSI Launch</span><strong data-testid="roi-net-result">{money.format(netValue)}</strong></div>
        <div><span>Estimated payback</span><strong data-testid="roi-payback-result">{paybackMonths > 0 ? `${paybackMonths.toFixed(1)} months` : '—'}</strong></div>
        <p data-testid="roi-disclaimer">Directional estimate only. The actual baseline, recoverable work, and production outcome are validated during a pilot.</p>
        <a href={process.env.REACT_APP_BOOKING_URL} target="_blank" rel="noreferrer" data-testid="roi-discuss-link">Discuss Your ROI <ArrowUpRight size={15} /></a>
      </div>
    </section>
  );
};