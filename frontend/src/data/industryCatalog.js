export const industryGroups = [
  { label: 'Technology & Systems', ids: ['ai-data', 'engineering', 'it-leadership', 'it-services'] },
  { label: 'Industry & Infrastructure', ids: ['construction', 'logistics', 'manufacturing', 'real-estate'] },
  { label: 'Business & Regulation', ids: ['finance', 'legal', 'operations', 'professional-services'] },
  { label: 'Human & Public Services', ids: ['healthcare', 'customer-operations', 'commerce', 'science', 'public-sector', 'education'] }
];

const labels = {
  'ai-data': 'AI & Data', construction: 'Construction', engineering: 'Engineering', finance: 'Finance',
  'it-leadership': 'IT Leadership', 'it-services': 'IT Services', legal: 'Legal', logistics: 'Logistics',
  manufacturing: 'Manufacturing', operations: 'Operations', 'real-estate': 'Real Estate', science: 'Science',
  healthcare: 'Healthcare', 'customer-operations': 'Customer Operations', commerce: 'Commerce',
  'professional-services': 'Professional Services', 'public-sector': 'Public Sector', education: 'Education'
};

export const industryCatalog = industryGroups.flatMap((group) => group.ids.map((id) => ({ id, label: labels[id], group: group.label })));