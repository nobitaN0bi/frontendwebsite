const count = (list) => (Array.isArray(list) ? list.length : 0);

export const buildFilm = (scenario) => [
  {
    id: 'dispatch',
    kind: 'dispatch',
    surface: 'Dispatch',
    act: 'ACT I — INTENT',
    title: 'The work arrives as a sentence, not a spec.',
    story: scenario.intent,
    caption: `${scenario.owner} opens the request in plain language. A lead orchestrator reads the stakes, names the constraints, and wakes only the ${count(scenario.agents)} specialists this decision actually needs.`,
    state: `INTENT::ROUTED — SPECIALISTS::${count(scenario.agents)} — HUMAN::OWNER ${scenario.owner.toUpperCase()}`
  },
  {
    id: 'ontology',
    kind: 'ontology',
    surface: 'Ontology',
    act: 'ACT I — GROUND',
    title: 'Before it moves, it learns what is true here.',
    story: scenario.trigger,
    caption: `People, policies, systems, and evidence become one graph: ${(scenario.graphNodes || []).slice(0, 4).join(' · ')}. Nothing runs against a guess about your organisation.`,
    state: `ONTOLOGY::BOUND — NODES::${count(scenario.graphNodes)} — TENANT::SCOPED`
  },
  {
    id: 'builder',
    kind: 'builder',
    surface: 'Agent builder',
    act: 'ACT II — COMPILE',
    title: 'The plan becomes a contract, not a prompt.',
    story: `${scenario.workflow} compiles into a typed execution plan with explicit boundaries and one human gate.`,
    caption: 'Visual state is compiled through a strict AST. Broken topology, unscoped tools, and missing approvals are rejected before a single step executes.',
    state: `AST::VALID — STEPS::${count(scenario.tasks)} — UNSAFE_BINDINGS::0`
  },
  {
    id: 'docs',
    kind: 'docs',
    surface: 'Docs + thread',
    act: 'ACT II — DRAFT',
    title: 'The decision is written while it is being made.',
    story: `${scenario.document} is co-authored by people and agents, with every claim carrying its source.`,
    caption: 'No end-of-week reconstruction. Rationale, citations, and dissent land in the same document the reviewer will sign.',
    state: `DOC::LIVE — CITATIONS::${Math.min(3, count(scenario.knowledge))} — EDITORS::HUMAN+AGENT`
  },
  {
    id: 'knowledge',
    kind: 'knowledge',
    surface: 'Knowledge',
    act: 'ACT II — RETRIEVE',
    title: 'Private context, ranked two ways at once.',
    story: `Hybrid retrieval fuses meaning and exact identifiers across ${count(scenario.knowledge)} internal sources.`,
    caption: 'Vector similarity finds the concept. Lexical ranking keeps the account number, clause, or part code intact. Reciprocal fusion returns one grounded context.',
    state: `RAG::HYBRID — SOURCES::${count(scenario.knowledge)} — FUSION::RRF`
  },
  {
    id: 'collaboration',
    kind: 'collaboration',
    surface: 'Collaboration',
    act: 'ACT II — COORDINATE',
    title: 'People and specialists in one moving thread.',
    story: scenario.message,
    caption: `${(scenario.people || []).join(', ')} stay present while agents work. CRDT state converges, so nobody edits a stale version of the decision.`,
    state: `CHANNEL::${String(scenario.channel || 'operations').toUpperCase()} — PRESENCE::${count(scenario.people)} — MERGE::DETERMINISTIC`
  },
  {
    id: 'code',
    kind: 'code',
    surface: 'Code',
    act: 'ACT III — EXECUTE',
    title: 'A coding agent that never leaves its boundary.',
    story: scenario.codeTask,
    caption: `The full coding panel — files, editor, run policy, terminal, tests — executes ${scenario.codeFile} away from the application host with no egress and scoped credentials.`,
    state: `SANDBOX::ISOLATED — EGRESS::DENIED — ARTIFACTS::PERSISTED`
  },
  {
    id: 'browser',
    kind: 'browser',
    surface: 'Browser',
    act: 'ACT III — VERIFY',
    title: 'It checks the outside world before you sign.',
    story: scenario.browserTitle,
    caption: `Approved external sources are opened, read, and captured as evidence: ${(scenario.browserItems || []).join('; ')}.`,
    state: `SOURCE::APPROVED — CAPTURES::${count(scenario.browserItems)} — CITED::TRUE`
  },
  {
    id: 'teamspaces',
    kind: 'decision',
    surface: 'Teamspaces',
    act: 'ACT III — DECIDE',
    title: 'The human line, and the record that outlives it.',
    story: scenario.checkpoint,
    caption: `${scenario.outcome} Owners, state, rationale, and evidence stay in ${scenario.teamspace} as one reconstructable line.`,
    state: `CHECKPOINT::APPROVED — OUTCOME::${String(scenario.metric || '').toUpperCase()} — AUDIT::WRITTEN`
  }
];
