export const resources = [
  {
    slug: 'what-is-an-agentic-operating-system', category: 'Agentic architecture', type: 'Field guide', published: 'April 8, 2026', readingTime: '9 min',
    title: 'What is an agentic operating system?',
    description: 'A practical definition of the coordination layer between human intent, agent runtimes, enterprise tools, and accountable decisions.',
    keyword: 'agentic operating system', audience: 'Technology leaders and platform teams',
    takeaways: ['Agents need a coordination plane, not another chat interface.', 'A compiler separates fluid visual intent from deterministic runtime execution.', 'Trust emerges from checkpoints, scoped tools, and reconstructable state.'],
    sections: [
      { title: 'The missing layer is coordination', paragraphs: ['Most AI products optimize one model call at a time. Real work does not happen one call at a time. It crosses people, systems, permissions, documents, exceptions, and decisions that must survive interruption.', 'An agentic operating system is the coordination layer that turns intent into a durable execution plan. It gives agents somewhere to collaborate, tools somewhere to connect, and humans a clear place to review consequential actions.']},
      { title: 'Four jobs of the operating system', bullets: ['Capture human intent in a surface people can understand.', 'Compile that intent into explicit nodes, edges, schemas, and policies.', 'Execute work through specialized agents, retrieval, tools, and sandboxes.', 'Preserve checkpoints, approvals, telemetry, and provenance for review.']},
      { title: 'Why a canvas and a compiler belong together', paragraphs: ['A canvas is excellent for reasoning spatially, but a runtime cannot safely execute pixels and arrows. The compiler is the contract between them. It validates topology, resolves typed handles, creates a versioned workflow representation, and prevents invalid graphs from reaching the runtime.']},
      { title: 'The standard for trustworthy magic', paragraphs: ['The interface should feel fluid. The execution beneath it should be strict. Acoord’s design principle is simple: every delightful interaction above the line must map to inspectable state below it.']}
    ]
  },
  {
    slug: 'hybrid-rag-postgresql-rrf', category: 'Enterprise RAG', type: 'Technical guide', published: 'April 8, 2026', readingTime: '11 min',
    title: 'Hybrid RAG in PostgreSQL: vector search, BM25, and RRF',
    description: 'Why enterprise retrieval needs both semantic similarity and exact lexical precision—and how reciprocal rank fusion joins them.',
    keyword: 'hybrid RAG PostgreSQL pgvector BM25', audience: 'AI engineers and enterprise architects',
    takeaways: ['Vectors understand meaning but can miss exact identifiers.', 'BM25 finds exact language but can miss conceptual equivalents.', 'RRF combines independent rankings without fragile score normalization.'],
    sections: [
      { title: 'Enterprise questions are mixed-mode', paragraphs: ['A policy query may contain an exact contract ID, a product version, and a conceptual question in the same sentence. Pure vector retrieval is strong on meaning but often weak on rare alphanumeric tokens. Keyword search has the opposite profile.']},
      { title: 'Reciprocal rank fusion', paragraphs: ['RRF assigns each result a score based on its rank in each retrieval list. A document that ranks well semantically and lexically rises naturally. Because the method uses rank rather than raw similarity values, it avoids brittle normalization between unrelated scoring systems.'], bullets: ['Retrieve a wider candidate set from vector similarity.', 'Retrieve a parallel candidate set from BM25 or full-text search.', 'Join candidates by document identity.', 'Sum reciprocal rank contributions and return the highest combined scores.']},
      { title: 'Why keep retrieval in PostgreSQL', paragraphs: ['A PostgreSQL-native architecture reduces synchronization drift between the system of record, vector index, permissions, and keyword corpus. It also keeps tenant filters and transactional updates close to retrieval logic.']},
      { title: 'Production checks', bullets: ['Evaluate with domain-specific query sets, not generic benchmarks.', 'Preserve source metadata and citation anchors.', 'Apply tenant and authorization filters before returning context.', 'Track retrieval quality separately from generation quality.']}
    ]
  },
  {
    slug: 'ast-compiler-agent-workflows', category: 'Agentic architecture', type: 'Engineering deep dive', published: 'April 8, 2026', readingTime: '8 min',
    title: 'How an AST compiler catches broken agent workflows before runtime',
    description: 'Use structural validation to stop cycles, dangling handles, and invalid tool bindings before an agent run begins.',
    keyword: 'agent workflow AST compiler cycle detection', audience: 'Platform and workflow engineers',
    takeaways: ['Visual state is not an execution contract.', 'Topology checks belong before dispatch, not inside the failure path.', 'A versioned DSL makes workflows testable, reviewable, and portable.'],
    sections: [
      { title: 'The danger of executing the canvas directly', paragraphs: ['Canvas state includes layout, selection, transient collaboration state, and partial edits. Sending it directly to an agent runtime couples presentation to execution and makes failure behavior unpredictable.']},
      { title: 'Compilation as a trust boundary', paragraphs: ['The compiler normalizes nodes and edges into a strict domain representation. During that transition it can enforce invariants that the visual editor alone cannot guarantee.'], bullets: ['Reject directed cycles when the workflow contract forbids recursion.', 'Resolve input and output schemas across every edge.', 'Reject dangling handles and missing required parameters.', 'Freeze model, tool, policy, and checkpoint configuration into a versioned plan.']},
      { title: 'Reverse hydration', paragraphs: ['Execution telemetry follows the opposite path. Runtime events are parsed into UI-safe state changes: node status, tool progress, errors, human pauses, and generated artifacts. This keeps the canvas responsive without letting UI concerns leak into workers.']},
      { title: 'The operational payoff', paragraphs: ['Compiled workflows can be diffed, approved, tested, rolled back, and reproduced. That makes a visual agent builder suitable for enterprise change management rather than just prototyping.']}
    ]
  },
  {
    slug: 'crdt-vs-ot-collaborative-agent-canvas', category: 'Collaborative intelligence', type: 'Architecture note', published: 'April 8, 2026', readingTime: '10 min',
    title: 'CRDT vs. OT for a collaborative agent canvas',
    description: 'How local-first conflict resolution changes the reliability model for teams editing workflows together.',
    keyword: 'CRDT collaborative canvas offline', audience: 'Frontend and collaboration engineers',
    takeaways: ['A collaborative canvas needs deterministic convergence across text and geometry.', 'Local-first updates keep the interface responsive during network loss.', 'Authorization and synchronization are separate concerns and both matter.'],
    sections: [
      { title: 'Collaboration is more than shared cursors', paragraphs: ['Agent workflows combine rich text, node parameters, edges, comments, and spatial positions. Two people can edit different dimensions of the same graph at once. The system must converge without discarding either person’s valid work.']},
      { title: 'Why CRDTs fit local-first work', paragraphs: ['Conflict-free replicated data types apply local operations immediately and merge remote operations deterministically. Users can continue editing during transient network loss and synchronize when connectivity returns.']},
      { title: 'Where OT still makes sense', paragraphs: ['Operational transformation remains effective for centrally coordinated text editing. A spatial, heterogeneous graph with offline requirements benefits from CRDT composition because it reduces dependence on a single ordering authority.']},
      { title: 'Security cannot be merged away', bullets: ['Authenticate the synchronization channel.', 'Authorize mutations against the workspace and object.', 'Separate optimistic local state from durable acceptance.', 'Record sensitive administrative changes outside ordinary collaborative content.']}
    ]
  },
  {
    slug: 'human-in-the-loop-agent-checkpoints', category: 'Trust and safety', type: 'Implementation guide', published: 'April 8, 2026', readingTime: '9 min',
    title: 'Human checkpoints are a runtime primitive—not a notification',
    description: 'Design agent workflows that pause, preserve context, capture rationale, and resume deterministically.',
    keyword: 'human in the loop agent workflow checkpoints', audience: 'Product, risk, and AI platform teams',
    takeaways: ['A notification does not preserve execution state.', 'The reviewer needs evidence, options, and downstream impact.', 'The decision and rationale must become part of the workflow record.'],
    sections: [
      { title: 'Why “send a Slack message” breaks down', paragraphs: ['Polling a reaction or waiting for a form response leaves runtime state split across systems. If the worker crashes, the decision may be lost or applied twice. A checkpoint persists the exact workflow state before the handoff.']},
      { title: 'What a useful checkpoint contains', bullets: ['The proposed action and confidence or uncertainty.', 'Relevant source evidence and policy citations.', 'The state that led to the recommendation.', 'Clear approve, modify, reject, and escalate paths.', 'The downstream effect of each choice.']},
      { title: 'Resume, do not restart', paragraphs: ['After a reviewer acts, the runtime should resume from the persisted checkpoint with the decision incorporated. This preserves determinism, limits duplicate work, and creates a coherent audit trail.']},
      { title: 'Design for reviewer reality', paragraphs: ['Route reviews by role and risk, define timeouts and reassignment, and make exceptional overrides require rationale. The interface should make the safe decision easy without hiding complexity.']}
    ]
  },
  {
    slug: 'sandbox-llm-generated-code', category: 'Platform engineering', type: 'Security guide', published: 'April 8, 2026', readingTime: '10 min',
    title: 'How to sandbox LLM-generated code safely',
    description: 'A defense-in-depth pattern for executing useful agent code without turning the application host into the blast radius.',
    keyword: 'secure LLM code execution sandbox', audience: 'Security and platform engineers',
    takeaways: ['Never execute generated code in the application process.', 'Static checks reduce waste but do not replace isolation.', 'Network, time, memory, output, and credential boundaries all need explicit policy.'],
    sections: [
      { title: 'Assume generated code is untrusted', paragraphs: ['Even well-intentioned code can contain destructive filesystem operations, runaway loops, unsafe imports, or accidental secret access. Prompt instructions are not a security boundary.']},
      { title: 'Defense in depth', bullets: ['Parse and inspect code before execution to block clearly disallowed behavior.', 'Run in an ephemeral, isolated environment with no inherited application credentials.', 'Restrict outbound network access to approved destinations or disable it entirely.', 'Set CPU, memory, wall-clock, process, file, and output limits.', 'Destroy or reset the environment after the task unless persistence is explicitly required.']},
      { title: 'Return structured evidence', paragraphs: ['Capture stdout, stderr, exit status, produced artifacts, package changes, timing, and policy decisions. The calling agent should receive enough information to correct an error without receiving access to the sandbox control plane.']},
      { title: 'Keep a human in high-impact loops', paragraphs: ['Sandboxing reduces infrastructure risk; it does not make generated analysis correct. High-impact outputs still need qualified review and source validation.']}
    ]
  }
];

export const getResource = (slug) => resources.find((resource) => resource.slug === slug);