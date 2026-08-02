export const operatingSteps = [
  { number: '01', label: 'Intent', title: 'Describe the outcome.', text: 'Start in language your team already uses. A lead agent scopes the work, constraints, evidence, and decisions that need human judgment.' },
  { number: '02', label: 'Compile', title: 'Turn intent into a contract.', text: 'Acoord translates visual state into a versioned workflow DSL, rejecting broken topology and unsafe bindings before execution.' },
  { number: '03', label: 'Orchestrate', title: 'Coordinate specialist agents.', text: 'Agents, tools, retrieval, sandboxes, and enterprise systems move through one observable execution plan.' },
  { number: '04', label: 'Trust', title: 'Pause, prove, and resume.', text: 'Human checkpoints preserve context, capture rationale, and resume from durable state instead of restarting the work.' }
];

export const capabilities = [
  { code: 'CANVAS / DSL', title: 'Visual agent builder', text: 'Compose branching, stateful workflows on a spatial canvas while a strict compiler keeps the runtime deterministic.' },
  { code: 'RAG / RRF', title: 'Hybrid enterprise retrieval', text: 'Fuse semantic and lexical ranking so exact identifiers and conceptual meaning both survive retrieval.' },
  { code: 'CRDT / YJS', title: 'Local-first collaboration', text: 'People and agents edit documents, graphs, and decisions concurrently with deterministic convergence.' },
  { code: 'ISOLATE / RUN', title: 'Secure code sandboxes', text: 'Keep generated scripts away from the application host with explicit time, memory, network, and credential boundaries.' },
  { code: 'MCP / SCOPE', title: 'Scoped tool connectivity', text: 'Connect proprietary APIs and enterprise tools through tenant-aware, permissioned MCP routes.' },
  { code: 'MEDIA / CONTEXT', title: 'Multimodal workflows', text: 'Bring documents, images, audio, video, and generated artifacts into one coordinated execution history.' },
  { code: 'QUEUE / SCALE', title: 'Event-driven operations', text: 'Separate the collaborative interface from burstable workers so each layer can scale on its own terms.' }
];

export const agentRoles = [
  { code: 'ROUTE', title: 'Lead orchestrator', text: 'Interprets the request, assembles the plan, and delegates work without losing the governing intent.' },
  { code: 'DESIGN', title: 'UI design specialist', text: 'Turns brand, accessibility, and interaction constraints into coherent product surfaces.' },
  { code: 'DISCOVER', title: 'SEO specialist', text: 'Structures technical knowledge for search intent, answer engines, citations, and qualified discovery.' },
  { code: 'EXPLAIN', title: 'Technical writer', text: 'Translates architecture, APIs, and operational behavior into documentation people can act on.' },
  { code: 'GROUND', title: 'Research analyst', text: 'Retrieves, compares, and cites private and public evidence through hybrid search.' },
  { code: 'EXECUTE', title: 'Systems engineer', text: 'Tests code, runs diagnostics, and produces artifacts inside scoped, observable sandboxes.' }
];

export const trustLayers = [
  ['01', 'Local-first collaboration', 'Yjs CRDT state converges across people, agents, text, and spatial graph edits.'],
  ['02', 'Bidirectional compilation', 'A visual workflow becomes a typed execution plan; telemetry returns as UI-safe state.'],
  ['03', 'Checkpointed runtime', 'Long-running work pauses for review with evidence and exact state preserved.'],
  ['04', 'Tenant-aware knowledge', 'Retrieval, tools, and execution remain scoped to the current workspace and permissions.'],
  ['05', 'Isolated execution', 'Untrusted scripts run outside the application process with explicit resource policies.']
];

export const faqs = [
  { question: 'What is an agentic operating system?', answer: 'It is the coordination layer that turns human intent into durable plans spanning AI agents, knowledge, tools, checkpoints, and reconstructable decisions.' },
  { question: 'How does Acoord move AI workflows from prototype to production?', answer: 'Acoord separates the fluid visual workspace from a strict compiler and observable runtime, so teams can validate, version, review, execute, and reproduce workflows.' },
  { question: 'How does Acoord keep humans in control?', answer: 'Consequential steps can become durable checkpoints with evidence, clear options, recorded rationale, and deterministic resume behavior.' },
  { question: 'Can Acoord connect to private enterprise systems?', answer: 'The architecture is designed around tenant-scoped retrieval and MCP tool routes so existing systems can be connected without turning every integration into runtime code.' }
];