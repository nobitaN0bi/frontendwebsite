export const useCases = [
  {
    number: '01', slug: 'financial-services', company: 'Meridian Global Bank', industry: 'Financial services',
    headline: 'From compliance liability to an auditable operating advantage.',
    problem: 'Sixty AI initiatives were trapped in proof-of-concept limbo. Manual alert review consumed 320,000 hours a year while regulators demanded every inference be logged, reviewable, and reversible.',
    trigger: 'An FCA enforcement action made the cost of fragmented coordination impossible to ignore.',
    pillars: ['Hybrid retrieval across 8.7M policy documents', 'Checkpointed human approval for every critical decision', 'Tenant-isolated audit trails across three regulatory regions'],
    metrics: [['100%', 'SAR filings on time'], ['74%', 'fewer false positives'], ['4.2h', 'filing review cycle'], ['11 weeks', 'prototype to production']],
    quote: 'The first time in a decade I’ve felt like an investigator rather than a data entry clerk.',
    persona: 'Chief AI Officer', accent: '#a78bfa'
  },
  {
    number: '02', slug: 'healthcare', company: 'VitalSync Health', industry: 'Healthcare SaaS',
    headline: 'Clinical coordination that pauses for judgment—without losing context.',
    problem: 'Patient context lived across five systems. Standalone AI prototypes could recommend, but could not escalate, explain, or preserve a defensible chain of clinical reasoning.',
    trigger: 'A preventable medication contraindication exposed the human cost of fragmented data.',
    pillars: ['Clinical hybrid RAG across 14M documents', 'Clinician checkpoints with documented rationale', 'Isolated simulation sandboxes for education'],
    metrics: [['94%', 'interactions flagged'], ['1.2 min', 'medication review'], ['75%', 'fewer adverse events'], ['94%', 'search relevance']],
    quote: 'One catch justified the entire investment, independent of any other metric.',
    persona: 'Chief Medical Information Officer', accent: '#10b981'
  },
  {
    number: '03', slug: 'legal', company: 'Concord Legal AI', industry: 'Legal tech',
    headline: 'The prompt is the legal product. Now it has lineage.',
    problem: 'A Python monolith forced dedicated deployments for every client, buried prompt changes in code, and disconnected attorney decisions from the AI analysis that initiated them.',
    trigger: 'A lost global-bank RFP put a 90-day clock on re-architecting the execution layer.',
    pillars: ['OAuth-scoped MCP connections', 'Versioned workflow DSL and prompt lineage', 'Real-time multi-party contract review'],
    metrics: [['70%', 'faster NDA review'], ['3 days', 'client integration'], ['87%', 'less orchestration upkeep'], ['$4.2M', 'RFP later won']],
    quote: 'Usable for a distributed legal team across London, New York, and Hong Kong.',
    persona: 'CTO & Legal Operations', accent: '#ec4899'
  },
  {
    number: '04', slug: 'devops', company: 'PipelineOps', industry: 'DevOps platform',
    headline: 'Turn the incident war room into a shared, reasoning system.',
    problem: 'Diagnostics, timelines, and expert judgment were scattered across Zoom, documents, and unsafe scripts. Standalone AI features could not coordinate a live response.',
    trigger: 'A 47-minute Black Friday outage proved that observability without coordination was not enough.',
    pillars: ['Sandboxed diagnostic execution', 'CRDT-native collaborative war rooms', 'Parallel supervisor-worker investigations'],
    metrics: [['4.7 min', 'mean diagnosis'], ['60%', 'lower MTTR'], ['57%', 'fewer L2 escalations'], ['25 min', 'postmortem prep']],
    quote: 'A second set of eyes that works at incident speed.',
    persona: 'VP of Reliability', accent: '#38bdf8'
  },
  {
    number: '05', slug: 'commerce', company: 'Lumina Goods', industry: 'E-commerce',
    headline: 'Make inventory, content, and service move as one system.',
    problem: 'Product changes propagated manually across disconnected channels. Service agents repeated low-value tasks while marketing content drifted out of sync with stock.',
    trigger: 'A Black Friday content mismatch caused $28,000 in avoidable lost sales.',
    pillars: ['Visual workflows owned by marketing', 'Catalog and customer hybrid retrieval', 'Inventory-aware content orchestration'],
    metrics: [['12 sec', 'WISMO resolution'], ['97%', 'faster updates'], ['2.6×', 'content output'], ['7×', 'revenue per interaction']],
    quote: 'A six-hour scramble became a fifteen-minute review.',
    persona: 'VP of Digital Commerce', accent: '#f59e0b'
  },
  {
    number: '06', slug: 'government', company: 'Aegis Defense Systems', industry: 'Government',
    headline: 'Agentic analysis for environments that cannot call home.',
    problem: 'Classified analysts faced a growing analysis gap inside air-gapped environments where public-cloud AI tools simply could not operate.',
    trigger: 'A congressional mandate required a 40% analysis-gap reduction within 36 months.',
    pillars: ['Fully air-gapped deployment', 'Offline-first deterministic collaboration', 'Classified RBAC and immutable audit history'],
    metrics: [['72%', 'fewer analyst hours'], ['3.4×', 'more connections found'], ['51%', 'analysis-gap reduction'], ['92%', 'faster review']],
    quote: 'Built by someone who understands analysis is cognitive work—not data entry.',
    persona: 'Director of Intelligence', accent: '#84cc16'
  },
  {
    number: '07', slug: 'education', company: 'LearnSphere', industry: 'Education',
    headline: 'A tutor that can reason, execute, and invite faculty in.',
    problem: 'Standalone tutoring features could not scale across disciplines, securely evaluate student code, or give faculty a live window into agent-student sessions.',
    trigger: 'A multi-university RFP demanded multimodal tutoring and secure code evaluation in twelve months.',
    pillars: ['Isolated multi-language code evaluation', 'Multimodal coursework ingestion', 'Live faculty co-pilot and intervention'],
    metrics: [['94%', 'assignment completion'], ['55%', 'fewer attempts'], ['8.9/10', 'feedback quality'], ['4.1h', 'accessibility turnaround']],
    quote: 'Student “stuck time” fell from 4.2 hours to twelve minutes.',
    persona: 'Chief Learning Officer', accent: '#fb7185'
  },
  {
    number: '08', slug: 'manufacturing', company: 'Titan Manufacturing', industry: 'Industrial IoT',
    headline: 'Coordinate machines, models, and maintenance judgment.',
    problem: 'Threshold alerts detected failure too late. Preventive schedules wasted parts, and static supply plans could not adapt when production reality changed.',
    trigger: 'A missed spindle vibration produced 340 defective parts and threatened a €48M account.',
    pillars: ['MCP bridges into PLC and SCADA systems', 'Sandboxed spectral and optimization models', 'Human-approved production rescheduling'],
    metrics: [['77%', 'less downtime'], ['75%', 'fewer defects'], ['22 min', 'disruption response'], ['€1.4M', 'maintenance savings']],
    quote: 'Predictive quality kept a sole-source relationship intact.',
    persona: 'Chief Operations Officer', accent: '#f97316'
  },
  {
    number: '09', slug: 'insurance', company: 'ShieldSure Insurance', industry: 'Insurance',
    headline: 'Every claim decision, grounded and independently verifiable.',
    problem: 'Coverage checks, photo assessments, and fraud referrals depended on individual adjuster memory, creating inconsistency and an incomplete audit record.',
    trigger: 'A market-conduct examination found documentation gaps in 12% of reviewed claims.',
    pillars: ['Policy-grounded coverage assessment', 'Vision agents for consistent damage review', 'State-isolated regulatory workflows'],
    metrics: [['60%', 'faster settlement'], ['86%', 'faster coverage check'], ['129%', 'more fraud detected'], ['97%', 'audit completeness']],
    quote: 'I uploaded photos from the scene and had an estimate within hours.',
    persona: 'Chief Digital Officer', accent: '#0ea5e9'
  },
  {
    number: '10', slug: 'ai-native', company: 'Nexus AI', industry: 'AI-native startup',
    headline: 'Skip infrastructure cosplay. Build the product people pay for.',
    problem: 'A five-person team needed enterprise orchestration, search, collaboration, and multi-tenancy without spending its first year assembling infrastructure.',
    trigger: 'Speed to the first enterprise design partner was the company’s existential constraint.',
    pillars: ['Acoord as the complete agent backend', 'Visual composition for daily iteration', 'Enterprise tenant isolation from day one'],
    metrics: [['16 weeks', 'idea to design partner'], ['1,200', 'backend lines'], ['14', 'workflow iterations'], ['3', 'technical builders']],
    quote: 'Every line of code we write is a failure of AI to write it for us.',
    persona: 'Founder / Infrastructure', accent: '#8b5cf6'
  }
];

export const getUseCase = (slug) => useCases.find((item) => item.slug === slug);