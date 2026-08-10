export const ventureProofs = [
  { id: 'search', name: 'Enterprise Search', role: 'CONTEXT WEDGE', claim: 'Permission-aware hybrid retrieval makes fragmented knowledge usable at the first consequential workflow.', compounding: 'Feedback telemetry can improve relevance while the indexed permission graph becomes harder to recreate.' },
  { id: 'onyx', name: 'Onyx', role: 'CONNECTOR SURFACE', claim: 'Distributed ingestion turns enterprise sources into a citation-bearing knowledge surface.', compounding: 'Every governed connector broadens the context available to later assistants and workflows.' },
  { id: 'aigis', name: 'AIGIS', role: 'CONTROL PLANE', claim: 'Checkpointed state, human interrupts, and MCP tools move the category from answers to governed operations.', compounding: 'Execution history and policy-bearing state become reusable operating infrastructure.' },
  { id: 'colanode', name: 'Colanode', role: 'SHARED STATE', claim: 'CRDT collaboration gives people and agents one live workspace across web, desktop, and mobile.', compounding: 'The decision surface gains distribution as more teams coordinate in the same graph.' },
  { id: 'deerflow', name: 'DeerFlow', role: 'EXECUTION HARNESS', claim: 'Specialist dispatch, safety middleware, MCP, and sandboxes make agent execution extensible.', compounding: 'Skills and bounded tools expand what the operating layer can safely coordinate.' }
];

export const strategicProofs = [
  { id: 'search', name: 'Enterprise Search', estate: 'Identity providers + source ACLs', boundary: 'Filter at retrieval time—not after generation.', interface: 'REST / GraphQL search and context APIs' },
  { id: 'onyx', name: 'Onyx', estate: 'Jira, Slack, Drive, GitHub, Salesforce', boundary: 'Replicate source permissions into indexed chunks.', interface: 'Connector workers + citation-bearing retrieval' },
  { id: 'aigis', name: 'AIGIS', estate: 'Existing FastAPI and legacy operations', boundary: 'Interrupt stateful graphs before consequential action.', interface: 'MCP-exposed tools + SSE execution events' },
  { id: 'colanode', name: 'Colanode', estate: 'Documents, databases, canvases, local clients', boundary: 'Workspace, node, and row-level controls.', interface: 'REST + WebSocket CRDT synchronization' },
  { id: 'deerflow', name: 'DeerFlow', estate: 'Models, MCP servers, skills, code environments', boundary: 'Audit tool calls and isolate generated code.', interface: 'Agent harness + sandbox + checkpoint store' }
];

export const operatorProofs = [
  { id: 'search', name: 'Enterprise Search', input: 'query + identity + source ACL', operation: 'BM25 ∪ dense → RRF → cross-encoder', output: 'ranked, permission-safe context', raw: '{ "route": "synthesis", "acl_filter": "query_time", "fusion": "rrf" }' },
  { id: 'onyx', name: 'Onyx', input: 'connector delta + external permissions', operation: 'parse → chunk → embed → index', output: 'cited enterprise knowledge', raw: '{ "connector": "source", "sync": "delta", "citation": true }' },
  { id: 'aigis', name: 'AIGIS', input: 'intent + typed workflow state', operation: 'graph node → tool → checkpoint → interrupt', output: 'resumable execution state', raw: '{ "thread": "active", "checkpoint": "persisted", "human_interrupt": true }' },
  { id: 'colanode', name: 'Colanode', input: 'local immutable mutation', operation: 'CRDT merge → persist → broadcast', output: 'shared, offline-capable state', raw: '{ "mutation": "immutable", "merge": "crdt", "broadcast": "websocket" }' },
  { id: 'deerflow', name: 'DeerFlow', input: 'lead-agent task + policy', operation: 'dispatch → MCP/tool → sandbox → middleware', output: 'bounded artifact + event trail', raw: '{ "dispatch": "specialist", "sandbox": "isolated", "resume": true }' }
];

export const executiveProofs = [
  { id: 'search', name: 'Enterprise Search', outcome: 'The decision begins with ranked evidence, not a memory of where a document lives.', authority: 'Existing source permissions remain part of retrieval.' },
  { id: 'onyx', name: 'Onyx', outcome: 'Relevant systems become one cited context instead of parallel search work.', authority: 'Connector ingestion carries external permission models forward.' },
  { id: 'aigis', name: 'AIGIS', outcome: 'A multi-step request becomes a visible, resumable operating plan.', authority: 'Human interrupts stop the graph at consequential decisions.' },
  { id: 'colanode', name: 'Colanode', outcome: 'Operators and agents review one current state across devices.', authority: 'Workspace and node controls keep participation legible.' },
  { id: 'deerflow', name: 'DeerFlow', outcome: 'Specialists can research, calculate, and create artifacts in the background.', authority: 'Middleware, MCP scopes, and sandboxes bound execution.' }
];

export const technicalProofs = [
  { id: 'search', name: 'ENTERPRISE_SEARCH', ingress: 'query, tenant, user/group identity', process: 'sparse+dense candidates → RRF → cross-encoder', control: 'pre-filter ACLs; no raw vector exposure', state: 'indices + relevance telemetry', egress: 'ranked context with source boundaries' },
  { id: 'onyx', name: 'ONYX', ingress: 'connector polling/webhook deltas', process: 'parse → OCR → semantic chunks → embeddings', control: 'external ACL mapping at document/chunk level', state: 'vector engine + connector cursor', egress: 'cited answers and GraphRAG-ready APIs' },
  { id: 'aigis', name: 'AIGIS', ingress: 'typed intent + workflow state', process: 'LangGraph nodes + MCP tool calls', control: 'RBAC, HITL interrupt, immutable audit design', state: 'PostgreSQL checkpoints + Redis session', egress: 'SSE events + replayable decision state' },
  { id: 'colanode', name: 'COLANODE', ingress: 'local client mutations', process: 'CRDT merge + background jobs', control: 'workspace/node RBAC and RLS for retrieval', state: 'PostgreSQL + local IndexedDB/SQLite', egress: 'WebSocket sync across web/desktop/mobile' },
  { id: 'deerflow', name: 'DEERFLOW', ingress: 'lead-agent task + tool policy', process: 'subagent dispatch + MCP + sandbox', control: 'AST audit, output budgets, signed skills', state: 'LangGraph checkpointer', egress: 'artifacts + granular execution events' }
];

export const workflowProofs = [
  { id: 'intent', system: 'HUMAN OWNER', verb: 'FRAME', title: 'State the decision and the stop conditions.', evidence: 'Owner, objective, constraints, approval threshold', human: 'The accountable owner defines what must not be automated.' },
  { id: 'search', system: 'ENTERPRISE SEARCH', verb: 'RETRIEVE', title: 'Find exact records and semantic context together.', evidence: 'Permission-safe ranked sources', human: 'Only context available to this user can enter the run.' },
  { id: 'onyx', system: 'ONYX', verb: 'GROUND', title: 'Pull cited context from the connected enterprise surface.', evidence: 'Connector-backed documents with inline sources', human: 'The operator can inspect where each claim came from.' },
  { id: 'aigis', system: 'AIGIS', verb: 'ORCHESTRATE', title: 'Route the work through a checkpointed graph.', evidence: 'Thread state, tool events, checkpoint, pending interrupt', human: 'The graph pauses before the consequential branch.' },
  { id: 'colanode', system: 'COLANODE', verb: 'COORDINATE', title: 'Review the proposal in one shared, live decision state.', evidence: 'Edits, comments, assignments, presence, version state', human: 'People and agents see the same current decision.' },
  { id: 'deerflow', system: 'DEERFLOW', verb: 'EXECUTE', title: 'Dispatch bounded specialists and preserve the artifacts.', evidence: 'Tool calls, sandbox output, specialist result, event trail', human: 'Approval releases only the actions inside the declared boundary.' },
  { id: 'record', system: 'AHI', verb: 'RECORD', title: 'Persist the evidence, rationale, approval, and final state.', evidence: 'Reconstructable decision line', human: 'The next operator inherits the decision—not an empty chat.' }
];