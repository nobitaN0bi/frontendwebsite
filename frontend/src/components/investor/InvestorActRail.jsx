import { useEffect, useState } from 'react';

const acts = [
  ['I', 'Conviction', 'investor-act-1'],
  ['II', 'Coordination', 'investor-act-2'],
  ['III', 'Product proof', 'investor-act-3'],
  ['IV', 'System', 'investor-act-4'],
  ['V', 'Evidence', 'investor-act-5']
];

export const InvestorActRail = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = acts.map(([, , id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(nodes.indexOf(visible.target));
    }, { rootMargin: '-38% 0px -48%', threshold: [0, .15, .4] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="investor-act-rail" aria-label="Investor story acts" data-testid="investor-act-rail">
      {acts.map(([number, label, id], index) => (
        <button key={id} type="button" className={active === index ? 'active' : ''} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} aria-label={`Go to Act ${number}: ${label}`} data-testid={`investor-act-${index + 1}-button`}>
          <span>{number}</span><i aria-hidden="true" /><b>{label}</b>
        </button>
      ))}
    </nav>
  );
};