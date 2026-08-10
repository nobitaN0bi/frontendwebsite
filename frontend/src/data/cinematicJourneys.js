const proof = {
  built: 'The public Ahi shell and guided product surfaces are built.',
  architecture: 'The five-system behavior shown here is grounded in supplied technical designs.',
  modeled: 'Department, industry, workflow, and outcome context is modeled—not customer proof.'
};

export const investorFilms = {
  venture: {
    id: 'venture', label: 'VENTURE FUND', variant: 'venture', path: '/investor/venture', proof,
    close: 'The category is the governed interface between intelligence and operations.',
    scenes: [
      { system: 'models', eyebrow: '01 / MODEL ABUNDANCE', title: 'Intelligence stopped being scarce.', body: 'More capable models and specialists can now enter the same workflow. Model access alone does not keep their work coherent.', signal: 'MODEL SUPPLY / EXPANDING' },
      { system: 'search', eyebrow: '02 / COORDINATION PRESSURE', title: 'Every new actor adds a coordination cost.', body: 'Permissions, source context, tools, handoffs, state, and human authority multiply faster than a chat interface can hold.', signal: 'COORDINATION SURFACE / MULTIPLYING' },
      { system: 'aigis', eyebrow: '03 / CONTROL LAYER', title: 'Ahi turns activity into an operating line.', body: 'Enterprise Search and Onyx assemble permission-safe context. AIGIS turns the request into checkpointed, interruptible state.', signal: 'CONTEXT → STATE' },
      { system: 'colanode', eyebrow: '04 / SHARED CONTEXT', title: 'The workflow starts to compound.', body: 'Colanode gives people and agents one live decision state. The record survives the individual model and the individual run.', signal: 'STATE → ORGANIZATIONAL MEMORY' },
      { system: 'deerflow', eyebrow: '05 / BOUNDED EXECUTION', title: 'The moat is governed operating context.', body: 'DeerFlow dispatches specialists through approved tools and sandboxes. Execution expands without making authority invisible.', signal: 'MEMORY → BOUNDED ACTION' }
    ]
  },
  strategic: {
    id: 'strategic', label: 'STRATEGIC CORPORATE', variant: 'strategic', path: '/investor/strategic', proof,
    close: 'The partnership surface is where your platform enters governed agent work.',
    scenes: [
      { system: 'estate', eyebrow: '01 / EXISTING ESTATE', title: 'The enterprise already has a stack.', body: 'Identity, systems of record, documents, APIs, models, and teams are not waiting to be replaced.', signal: 'ESTATE / FRAGMENTED' },
      { system: 'onyx', eyebrow: '02 / CONNECTED CONTEXT', title: 'Connect the estate without flattening it.', body: 'Onyx ingests source deltas and citations. Enterprise Search ranks exact and semantic context while source permissions remain attached.', signal: 'SOURCES → PERMISSIONED CONTEXT' },
      { system: 'aigis', eyebrow: '03 / GOVERNANCE BOUNDARY', title: 'Put a control plane around action.', body: 'AIGIS exposes approved tools through MCP, checkpoints graph state, and interrupts execution where accountable review is required.', signal: 'CONTEXT → GOVERNED GRAPH' },
      { system: 'colanode', eyebrow: '04 / COLLABORATIVE STATE', title: 'Let people and agents share one current state.', body: 'Colanode synchronizes concurrent work through CRDTs across web, desktop, and mobile, with workspace and node controls.', signal: 'GRAPH → SHARED DECISION' },
      { system: 'deerflow', eyebrow: '05 / PARTNERSHIP SURFACE', title: 'Expose bounded execution—not another silo.', body: 'DeerFlow consumes approved tools, dispatches specialists, isolates code, and returns artifacts and events to the operating record.', signal: 'TOOLS → INSPECTABLE OUTPUT' }
    ]
  },
  operator: {
    id: 'operator', label: 'OPERATOR OR ANGEL', variant: 'operator', path: '/investor/operator', proof,
    close: 'Inspect the mechanism: fluid for the operator, strict beneath the action.',
    scenes: [
      { system: 'intent', eyebrow: '01 / INTENT', title: 'A consequential request enters once.', body: 'The owner states the objective, constraints, and stop conditions. The interface begins with a decision—not a blank conversation.', signal: 'INPUT / TYPED INTENT' },
      { system: 'search', eyebrow: '02 / RETRIEVAL + GROUNDING', title: 'Context arrives with identity attached.', body: 'Hybrid sparse and dense retrieval, RRF, and cross-encoder ranking meet connector-backed citations and source ACLs.', signal: 'BM25 ∪ DENSE → RRF → RERANK' },
      { system: 'aigis', eyebrow: '03 / STATEFUL PLAN', title: 'The request becomes a graph that can stop.', body: 'AIGIS routes typed state through tools, PostgreSQL checkpoints, streamed events, and explicit human interrupts.', signal: 'THREAD → NODE → CHECKPOINT' },
      { system: 'colanode', eyebrow: '04 / SHARED STATE', title: 'The plan becomes multiplayer.', body: 'Colanode merges concurrent edits and presence into one local-first decision state rather than parallel agent transcripts.', signal: 'LOCAL MUTATION → CRDT MERGE' },
      { system: 'deerflow', eyebrow: '05 / EXECUTION + RECORD', title: 'Specialists act inside declared boundaries.', body: 'DeerFlow dispatches subagents, consumes MCP tools, isolates code, and preserves events so the work remains inspectable.', signal: 'DISPATCH → SANDBOX → ARTIFACT' }
    ]
  }
};

export const customerFilm = (role, department, industry) => {
  const context = `${department.label} / ${industry.label}`;
  const contextual = `${department.label} teams need to ${department.objective}. In ${industry.label}, ${industry.pressure}.`;
  const shared = { id: role, label: role === 'executive' ? 'EXECUTIVE BUYER' : role === 'technical' ? 'TECHNICAL EVALUATOR' : 'WORKFLOW OWNER', path: `/investor/customer/${role}/${department.slug}/${industry.slug}`, proof, context };

  if (role === 'executive') return { ...shared, variant: 'executive', close: 'Choose the first decision where speed matters and authority cannot disappear.', scenes: [
    { system: 'intent', eyebrow: '01 / CONSEQUENTIAL REQUEST', title: 'This is not another chat request.', body: contextual, signal: 'MODELED CONTEXT / OWNER DEFINED' },
    { system: 'onyx', eyebrow: '02 / EVIDENCE', title: 'The answer arrives with a source line.', body: 'Onyx connects the relevant enterprise surface. Search ranks exact and semantic evidence without dropping the user’s permission boundary.', signal: 'SOURCE → CITATION → DECISION CONTEXT' },
    { system: 'aigis', eyebrow: '03 / ACCOUNTABLE PLAN', title: 'The request becomes visible work.', body: 'AIGIS assigns state, tools, checkpoints, and pending decisions so the operating plan can be inspected before it acts.', signal: 'REQUEST → OWNED PLAN' },
    { system: 'human', eyebrow: '04 / HUMAN AUTHORITY', title: 'Execution stops at the declared line.', body: 'The system presents evidence, proposed action, scope, and owner. It remains paused until the accountable human decides.', signal: 'STATUS / REVIEW REQUIRED' },
    { system: 'deerflow', eyebrow: '05 / CONTROLLED ROLLOUT', title: 'Approved work becomes a record.', body: 'DeerFlow executes only the bounded task. Colanode preserves the shared decision state, edits, approval, and resulting artifact.', signal: 'APPROVAL → ACTION → RECORD' }
  ] };

  if (role === 'technical') return { ...shared, variant: 'technical', close: 'Bring your identity, data, execution, and deployment constraints to the review.', scenes: [
    { system: 'intent', eyebrow: '01 / REQUEST PACKET', title: 'Start with identity attached.', body: `The ${context} review begins with tenant, user and group context—not an anonymous prompt.`, signal: 'TENANT + USER + GROUP ACL' },
    { system: 'search', eyebrow: '02 / HYBRID RETRIEVAL', title: 'Two candidate lists become one ranked context.', body: 'BM25 and dense retrieval run in parallel. Reciprocal rank fusion combines candidates before cross-encoder re-ranking.', signal: 'SPARSE ∪ DENSE → RRF → CROSS-ENCODER' },
    { system: 'onyx', eyebrow: '03 / CONNECTOR CONTEXT', title: 'Lineage survives ingestion.', body: 'Onyx workers parse, chunk, embed, and index source deltas while replicating external document and chunk permissions.', signal: 'DELTA → CHUNK → EMBED → CITE' },
    { system: 'aigis', eyebrow: '04 / GRAPH CHECKPOINT', title: 'State is persisted before execution continues.', body: 'AIGIS writes checkpointed graph state to PostgreSQL, streams events, and exposes a human interrupt before consequential tools.', signal: 'LANGGRAPH → POSTGRES → HITL' },
    { system: 'deerflow', eyebrow: '05 / COLLABORATION + TOOLS', title: 'Shared state and execution stay bounded.', body: 'Colanode syncs CRDT state with node/RLS controls. DeerFlow applies middleware, MCP scopes, and isolated sandboxes to action.', signal: 'CRDT + RLS → MCP + SANDBOX' }
  ] };

  return { ...shared, variant: 'workflow', close: 'Bring the workflow that currently lives across tabs, threads, and handoffs.', scenes: [
    { system: 'intent', eyebrow: '01 / OWNER FRAMING', title: 'Frame the decision once.', body: contextual, signal: 'MODELED WORK ITEM / OWNER ACTIVE' },
    { system: 'search', eyebrow: '02 / SEARCH GROUNDING', title: 'Pull the work already done into view.', body: 'Enterprise Search finds exact records and semantic context. Onyx keeps citations and connected source lineage visible.', signal: 'EVIDENCE / RETRIEVED + CITED' },
    { system: 'aigis', eyebrow: '03 / ORCHESTRATION', title: 'Wake only the specialists the work requires.', body: 'AIGIS turns the request into typed, checkpointed state and routes bounded subtasks through approved tools.', signal: 'LEAD → SPECIALISTS → CHECKPOINT' },
    { system: 'colanode', eyebrow: '04 / MULTIPLAYER REVIEW', title: 'Review one current decision—not five side channels.', body: 'Colanode synchronizes people, agents, edits, comments, and presence in one local-first shared state.', signal: 'CRDT STATE / CONVERGED' },
    { system: 'deerflow', eyebrow: '05 / EXECUTION + APPROVAL', title: 'Approve the action. Keep the record.', body: 'DeerFlow executes inside the declared sandbox and tool boundary. The evidence, rationale, approval, and artifact remain attached.', signal: 'HUMAN APPROVAL → BOUNDED EXECUTION' }
  ] };
};