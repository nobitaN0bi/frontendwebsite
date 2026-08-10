export const investorTypes = [
  { id: 'venture', label: 'Venture fund', note: 'Category, timing, wedge, and compounding context.' },
  { id: 'strategic', label: 'Strategic corporate', note: 'Platform adjacency, governance, and partnership surface.' },
  { id: 'operator', label: 'Operator or angel', note: 'Mechanism, founder choices, and operating leverage.' },
  { id: 'exploring', label: 'Exploring', note: 'Start with the broad category thesis.' }
];

export const investmentStages = ['Pre-seed / Seed', 'Series A–C', 'Growth', 'Strategic partnership', 'Stage-agnostic', 'Prefer not to say'];
export const investorSectors = ['Enterprise AI', 'Future of work', 'Developer infrastructure', 'Fintech / regulated', 'Industrial systems', 'Consumer / commerce', 'Generalist', 'Still exploring'];
export const investorIntents = ['Understand the category', 'Review the product mechanism', 'Explore a strategic partnership', 'Begin technical diligence', 'Follow the company quietly'];
export const investorTimelines = ['Now', 'This quarter', 'This year', 'Just learning', 'Prefer not to say'];
export const investorRegions = ['Global', 'North America', 'Europe', 'India / APAC', 'Middle East', 'No geographic constraint'];

export const investorRoute = (type) => type === 'strategic' ? '/investor/strategic' : type === 'operator' ? '/investor/operator' : '/investor/venture';