export const investorPersonas = [
  { id: 'venture', label: 'Venture Fund', route: '/investor/venture', note: 'Category, timing, wedge, compounding context.' },
  { id: 'strategic', label: 'Strategic Corporate', route: '/investor/strategic', note: 'Platform adjacency, integration surface, governance.' },
  { id: 'operator', label: 'Operator or Angel', route: '/investor/operator', note: 'Mechanism, operating leverage, founder-level thesis.' }
];

export const customerRoles = [
  { id: 'executive', label: 'Executive Buyer', note: 'Authority, operating risk, rollout, and accountable outcomes.' },
  { id: 'technical', label: 'Technical Evaluator', note: 'Retrieval, state, execution boundaries, deployment, and auditability.' },
  { id: 'workflow', label: 'Workflow Owner', note: 'The daily decision line: evidence, specialists, approvals, and record.' }
];

export const departments = [
  ['All Teams', 'all-teams', 'coordinate an enterprise-wide decision across knowledge, systems, and accountable owners'],
  ['Engineering', 'engineering', 'diagnose delivery risk, inspect technical evidence, and hold production changes for review'],
  ['Customer Service', 'customer-service', 'resolve escalations consistently while preserving policy exceptions for human judgment'],
  ['Sales', 'sales', 'assemble account context, coordinate specialists, and keep commitments human-owned'],
  ['IT', 'it', 'triage incidents across systems, evidence, owners, and controlled remediation'],
  ['Marketing', 'marketing', 'turn market signals into governed briefs, campaigns, and reviewable decisions'],
  ['B2B Marketing', 'b2b-marketing', 'connect account intelligence, research, content, and revenue-team approval'],
  ['B2C Marketing', 'b2c-marketing', 'coordinate audience signals, creative operations, policy, and brand judgment'],
  ['People', 'people', 'ground workforce decisions in policy, context, privacy, and accountable review'],
  ['Finance', 'finance', 'reconcile operational evidence, policy, and approvals into a reconstructable decision'],
  ['Legal', 'legal', 'compare clauses, precedent, obligations, and privileged judgment without losing the source line'],
  ['IT Management', 'it-management', 'govern service operations, change, vendors, access, and infrastructure decisions'],
  ['Procurement', 'procurement', 'evaluate suppliers across requirements, risk, evidence, and approval thresholds'],
  ['Human Resource', 'human-resource', 'coordinate policy-grounded employee workflows while protecting sensitive context'],
  ['Accounting', 'accounting', 'investigate exceptions, reconcile source records, and preserve reviewer sign-off']
].map(([label, slug, objective]) => ({ label, slug, objective }));

export const industries = [
  ['Retail', 'retail', 'demand, inventory, store operations, returns, and customer trust move together'],
  ['Consumer Goods', 'consumer-goods', 'portfolio, supplier, channel, quality, and market signals compete for attention'],
  ['Industrials', 'industrials', 'asset performance, field service, quality, and commercial obligations share one operating reality'],
  ['Energy & Utilities', 'energy-utilities', 'reliability, safety, field operations, regulation, and infrastructure risk are inseparable'],
  ['Manufacturing', 'manufacturing', 'production, supplier, telemetry, quality, and containment decisions must remain traceable'],
  ['Supply Chain', 'supply-chain', 'capacity, routing, inventory, service commitments, and disruption require continuous replanning'],
  ['Professional Services', 'professional-services', 'client commitments, expert knowledge, delivery state, and review must stay aligned'],
  ['Consulting', 'consulting', 'research, synthesis, workstreams, client context, and partner judgment converge under time pressure'],
  ['Construction', 'construction', 'schedule, safety, procurement, change orders, and site evidence create one decision surface'],
  ['IT Services', 'it-services', 'incidents, SLAs, access, change, and customer environments demand bounded execution'],
  ['Financial Services', 'financial-services', 'risk, regulation, customer context, and evidence must travel with every action'],
  ['Banking', 'banking', 'credit, fraud, compliance, operations, and customer decisions require strict authority lines'],
  ['PE/VC', 'pe-vc', 'diligence, portfolio context, market evidence, and investment judgment need a common record'],
  ['Asset Management', 'asset-management', 'research, mandate, risk, holdings, and investment decisions must remain explainable'],
  ['Insurance', 'insurance', 'underwriting, claims, fraud, policy, and human authority form stateful workflows'],
  ['Government', 'government', 'policy, procurement, service delivery, security, and public accountability constrain every action'],
  ['Healthcare', 'healthcare', 'clinical, operational, privacy, and safety context require explicit human boundaries'],
  ['Higher Education', 'higher-education', 'research, student services, administration, and institutional policy span fragmented systems']
].map(([label, slug, pressure]) => ({ label, slug, pressure }));

export const architectureSystems = [
  {
    id: 'search', index: '01', name: 'Enterprise Search', action: 'RETRIEVE', proof: 'ARCHITECTURE',
    headline: 'Find exact clauses and semantic context without crossing access boundaries.',
    summary: 'Sparse BM25 and dense retrieval produce candidates; reciprocal rank fusion and a cross-encoder create one ranked context.',
    facts: ['Query-time ACL enforcement', 'Hybrid sparse + dense retrieval', 'RRF fusion and re-ranking']
  },
  {
    id: 'onyx', index: '02', name: 'Onyx', action: 'CONNECT', proof: 'ARCHITECTURE',
    headline: 'Bring enterprise sources into one citation-bearing knowledge surface.',
    summary: 'Distributed ingestion workers parse, chunk, embed, and index source content while preserving external permission models.',
    facts: ['Connector-led ingestion', 'Inline source citations', 'Self-hosted deployment paths']
  },
  {
    id: 'aigis', index: '03', name: 'AIGIS', action: 'ORCHESTRATE', proof: 'ARCHITECTURE',
    headline: 'Turn the request into a stateful graph with checkpoints and human interrupts.',
    summary: 'LangGraph orchestration, PostgreSQL checkpoints, MCP-exposed tools, and streamed events make execution resumable and inspectable.',
    facts: ['Persistent graph state', 'Human-in-the-loop interrupts', 'Tamper-evident audit design']
  },
  {
    id: 'colanode', index: '04', name: 'Colanode', action: 'COORDINATE', proof: 'ARCHITECTURE',
    headline: 'Let people and agents share one live, local-first decision state.',
    summary: 'CRDT synchronization merges concurrent work across web, desktop, and mobile while node-level permissions govern the shared graph.',
    facts: ['CRDT shared state', 'Local-first clients', 'Node and row-level controls']
  },
  {
    id: 'deerflow', index: '05', name: 'DeerFlow', action: 'EXECUTE', proof: 'ARCHITECTURE',
    headline: 'Dispatch specialists, call approved tools, and contain code inside a sandbox.',
    summary: 'A lead-agent harness routes work to subagents, controls tool calls through middleware, and persists checkpoints for interruption and replay.',
    facts: ['Lead + specialist dispatch', 'MCP tool consumption', 'Isolated code execution']
  }
];

export const investorJourneys = {
  venture: {
    label: 'Venture Fund', kicker: 'CATEGORY LENS',
    title: 'The coordination layer becomes the category.',
    intro: 'As intelligence becomes cheaper and more specialized, the scarce system is the one that binds models, enterprise context, tools, people, and authority into a single operating line.',
    thesis: [
      ['WHY NOW', 'Agents are leaving isolated chat and entering operations.'],
      ['THE WEDGE', 'Begin where fragmented context already creates consequential delay.'],
      ['THE SYSTEM', 'Search, state, collaboration, execution, and record reinforce one another.'],
      ['THE COMPOUND', 'Every governed run can improve the operating context for the next decision.']
    ],
    close: 'Evaluate the category at the boundary between model capability and enterprise authority.'
  },
  strategic: {
    label: 'Strategic Corporate', kicker: 'PLATFORM LENS',
    title: 'The value sits between models and operations.',
    intro: 'Acoord is designed as connective infrastructure: a governed surface where existing data systems, identity, models, tools, and teams can participate without becoming another invisible chain.',
    thesis: [
      ['ADJACENCY', 'Extend systems of record into a system of coordinated action.'],
      ['INTEGRATION', 'Connect sources through permission-aware ingestion and standardized tools.'],
      ['GOVERNANCE', 'Keep checkpoints, policy, identity, and evidence inside the execution path.'],
      ['PARTNERSHIP', 'Build reusable operating patterns around consequential workflows.']
    ],
    close: 'Map where your platform, data, or domain layer can become part of governed agent work.'
  },
  operator: {
    label: 'Operator or Angel', kicker: 'BUILDER LENS',
    title: 'Build the place where work survives the model.',
    intro: 'The product bet is not a better prompt box. It is an interface where a request becomes context, a plan becomes bounded execution, and the decision remains legible after the agents stop.',
    thesis: [
      ['MECHANISM', 'One request routes into a visible, stateful operating graph.'],
      ['LEVERAGE', 'Specialists work in parallel while the human boundary remains explicit.'],
      ['MEMORY', 'Evidence, edits, approvals, and outcomes persist as shared state.'],
      ['DISCIPLINE', 'Architecture claims and modeled scenarios remain separate from verified proof.']
    ],
    close: 'Inspect the mechanism, the boundaries, and the operating choices behind the product.'
  }
};

export const customerJourneys = {
  executive: {
    label: 'Executive Buyer', kicker: 'OPERATING AUTHORITY',
    title: 'Make agent work governable before it becomes operational risk.',
    intro: 'Acoord creates one accountable path from enterprise context to proposed action, human approval, and decision record.',
    thesis: [
      ['OUTCOME', 'Compress the distance between a live signal and an informed decision.'],
      ['AUTHORITY', 'Attach owners, permissions, and stop conditions before execution.'],
      ['RISK', 'Keep source evidence and intervention points visible throughout the run.'],
      ['ROLLOUT', 'Start with one consequential workflow, then connect adjacent teams and systems.']
    ],
    close: 'Map one workflow where speed matters and authority cannot disappear.'
  },
  technical: {
    label: 'Technical Evaluator', kicker: 'SYSTEM EVALUATION',
    title: 'Evaluate the control plane, not the demo.',
    intro: 'The technical question is whether retrieval, permissions, orchestration, collaboration, tools, and state remain coherent under real enterprise constraints.',
    thesis: [
      ['CONTEXT', 'Hybrid retrieval, source citations, identity, and ACLs travel together.'],
      ['STATE', 'Checkpointed graphs can pause, resume, replay, and expose their transition history.'],
      ['EXECUTION', 'Tools are standardized; code runs inside bounded sandboxes with policy middleware.'],
      ['DEPLOYMENT', 'The supplied architectures describe self-hosted and Kubernetes deployment paths.']
    ],
    close: 'Review the architecture layer by layer, then test the boundaries against your environment.'
  },
  workflow: {
    label: 'Workflow Owner', kicker: 'DAY-TO-DAY WORK',
    title: 'Keep the work, people, and judgment in one decision line.',
    intro: 'Instead of coordinating across search tabs, chats, documents, tickets, and side channels, the workflow becomes one shared state with specialists and approvals attached.',
    thesis: [
      ['INTENT', 'State the decision and its stop conditions once.'],
      ['CAST', 'A lead agent wakes only the specialists the work requires.'],
      ['CHECKPOINT', 'Exceptions and consequential actions return to the accountable owner.'],
      ['RECORD', 'Sources, rationale, edits, and approval persist for the next run.']
    ],
    close: 'Walk through the work as it happens—not as a generic chatbot transcript.'
  }
};

export const findDepartment = (slug) => departments.find((item) => item.slug === slug) || departments[0];
export const findIndustry = (slug) => industries.find((item) => item.slug === slug) || industries[0];