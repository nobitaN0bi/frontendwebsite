const proof = {
  built: 'The live Ahi interface and the nine product surfaces shown inside the MacBook are built.',
  architecture: 'The retrieval, orchestration, collaboration, sandbox, and record behavior is grounded in supplied technical designs.',
  modeled: 'Companies, department context, industry context, workflow volume, and outcomes are modeled—not customer proof.'
};

const scene = (verb, productScene, eyebrow, title, body, action, human, position = 'right-top') => ({ verb, productScene, eyebrow, title, body, action, human, position });

export const investorFilms = {
  venture: {
    id: 'venture', label: 'VENTURE FUND', path: '/investor/venture', scenarioId: 'finance', proof,
    close: 'The category is the interface that turns abundant intelligence into governed work.',
    scenes: [
      scene('UNDERSTAND', 4, '01 / MODEL ABUNDANCE', 'Intelligence stopped being scarce.', 'The differentiator is no longer access to a model. It is whether private operating context can enter the work safely and visibly.', 'Finds exact evidence and the underlying concept in the same request.', 'Only context available to the current owner enters the run.'),
      scene('GROUND', 1, '02 / OPERATING CONTEXT', 'The organisation becomes part of the interface.', 'People, policy, systems, records, and prior decisions resolve into a working context instead of another prompt attachment.', 'Turns fragmented enterprise reality into a navigable decision graph.', 'The owner can inspect what the system believes is true here.', 'left-top'),
      scene('PLAN', 2, '03 / CONTROL LAYER', 'The request becomes a plan that can fail safely.', 'The work is decomposed into bounded steps, approved tools, required evidence, and explicit stop conditions before execution.', 'Builds the operating plan and rejects missing controls before the run starts.', 'Consequential branches are declared before action.'),
      scene('REVIEW', 5, '04 / SHARED DECISION', 'The workflow becomes multiplayer.', 'People and specialists review one current state instead of reconstructing work from parallel chats and stale copies.', 'Keeps comments, assignments, evidence, and specialist output in one live thread.', 'The accountable person remains visible while the team moves.', 'left-top'),
      scene('REMEMBER', 8, '05 / COMPOUNDING CONTEXT', 'The run ends as institutional memory.', 'The evidence, edits, rationale, owner, approval, and final artifact remain together for the next consequential decision.', 'Persists the complete decision line after the individual run ends.', 'The record outlives the chat that created it.')
    ]
  },
  strategic: {
    id: 'strategic', label: 'STRATEGIC CORPORATE', path: '/investor/strategic', scenarioId: 'manufacturing', proof,
    close: 'The partnership surface is where your systems become part of governed action.',
    scenes: [
      scene('UNDERSTAND', 1, '01 / EXISTING ESTATE', 'The enterprise already has a stack.', 'Ahi starts by understanding the systems, owners, policies, and records already carrying operational truth.', 'Maps the current estate without asking it to become one monolithic database.', 'Existing authority and source boundaries remain visible.'),
      scene('GROUND', 4, '02 / CONNECTED CONTEXT', 'Connect context without flattening it.', 'Exact clauses, semantic context, citations, and source permissions travel into the same product surface.', 'Retrieves what matters and keeps the source line attached.', 'The viewer can verify where the context came from.', 'left-top'),
      scene('PLAN', 2, '03 / GOVERNED LOGIC', 'Put a control plane around action.', 'The operating plan exposes steps, tools, conditions, and review gates instead of hiding execution inside a conversation.', 'Compiles the workflow into visible, inspectable logic.', 'Unsafe or incomplete plans stop before work begins.'),
      scene('ACT', 6, '04 / BOUNDED EXECUTION', 'Let capability act without becoming invisible.', 'Code, tests, files, credentials, and output live inside a scoped workspace rather than the application host.', 'Runs approved technical work inside an isolated execution boundary.', 'Artifacts can leave the sandbox; unapproved access cannot.', 'left-top'),
      scene('REMEMBER', 8, '05 / PARTNERSHIP SURFACE', 'Return the result to the operating record.', 'Your data, model, tool, or platform participates in the decision without becoming another disconnected destination.', 'Attaches the resulting artifact, owner, approval, and state to one durable workspace.', 'The receiving team inherits the decision—not an opaque output.')
    ]
  },
  operator: {
    id: 'operator', label: 'OPERATOR OR ANGEL', path: '/investor/operator', scenarioId: 'saas', proof,
    close: 'Inspect the mechanism: fluid for the operator, strict beneath the action.',
    scenes: [
      scene('UNDERSTAND', 0, '01 / INTENT', 'A consequential request enters once.', 'The interface reads the stakes, identifies the owner, and wakes only the capabilities the decision requires.', 'Turns one operating request into an explicit run with an owner and stop conditions.', 'Nothing starts without a named human boundary.'),
      scene('GROUND', 4, '02 / EVIDENCE', 'Context arrives with its source attached.', 'The system finds both exact language and semantic evidence without making the operator hunt across tabs.', 'Ranks private knowledge into one cited, permission-safe context.', 'Every consequential claim remains inspectable.', 'left-top'),
      scene('PLAN', 2, '03 / EXECUTION CONTRACT', 'The plan becomes a contract.', 'Each step has inputs, tools, expected output, failure state, and review requirement before the workflow is allowed to run.', 'Builds and validates the multi-step operating plan.', 'Broken topology and missing approvals fail before execution.'),
      scene('ACT', 6, '04 / SCOPED WORK', 'Specialists act inside declared boundaries.', 'The coding surface exposes files, terminal, tests, and artifacts while keeping credentials and egress policy scoped.', 'Executes the approved task in an isolated workspace.', 'The operator sees the work—not just the final answer.'),
      scene('REMEMBER', 8, '05 / DECISION MEMORY', 'The product keeps the decision, not the transcript.', 'Owners, work state, evidence, approval, and result persist as the starting context for the next run.', 'Turns completed work into reusable institutional memory.', 'The next operator can reconstruct what happened and why.')
    ]
  }
};

const scenarioForContext = (department, industry) => {
  const value = `${department.slug} ${industry.slug}`;
  if (/legal|procurement|government/.test(value)) return 'legal';
  if (/manufacturing|industrial|energy|construction/.test(value)) return 'manufacturing';
  if (/supply|logistics/.test(value)) return 'logistics';
  if (/customer-service|support/.test(value)) return 'customer-support';
  if (/retail|consumer|b2c|marketing/.test(value)) return 'ecommerce';
  if (/finance|accounting|bank|asset|insurance|pe-vc/.test(value)) return 'finance';
  if (/people|human-resource|fashion/.test(value)) return 'fashion';
  return 'saas';
};

export const customerFilm = (role, department, industry, problem = '') => {
  const context = `${department.label} / ${industry.label}`;
  const modeled = `${problem ? `Problem to solve: ${problem}. ` : ''}${department.label} teams need to ${department.objective}. In ${industry.label}, ${industry.pressure}.`;
  const shared = { id: role, label: role === 'executive' ? 'EXECUTIVE BUYER' : role === 'technical' ? 'TECHNICAL EVALUATOR' : 'WORKFLOW OWNER', path: `/demo/customer/${role}/${department.slug}/${industry.slug}`, scenarioId: scenarioForContext(department, industry), proof, context };

  if (role === 'executive') return { ...shared, close: 'Choose the first decision where speed matters and authority cannot disappear.', scenes: [
    scene('UNDERSTAND', 0, '01 / CONSEQUENTIAL REQUEST', 'This is not another chat request.', modeled, 'Frames the request with an owner, objective, constraints, and a visible stop condition.', 'The accountable owner defines what must not be automated.'),
    scene('GROUND', 3, '02 / DECISION BRIEF', 'The evidence arrives inside the work.', 'The product writes the brief while it retrieves source material, attaches citations, and surfaces disagreement.', 'Co-authors the decision rationale with evidence already attached.', 'The reviewer sees what supports the proposal and what remains uncertain.', 'left-top'),
    scene('PLAN', 2, '03 / ACCOUNTABLE PLAN', 'The request becomes visible work.', 'The operating plan exposes the steps, tools, owners, and review gates required to move from evidence to action.', 'Builds the plan before asking the enterprise to trust it.', 'The owner can change scope before execution begins.'),
    scene('REVIEW', 5, '04 / HUMAN AUTHORITY', 'Execution stops at the declared line.', 'The same live thread carries specialist output, comments, assignments, the proposed action, and the pending approval.', 'Presents one review state instead of sending the owner to five systems.', 'The work remains paused until an accountable person decides.', 'left-top'),
    scene('REMEMBER', 8, '05 / CONTROLLED ROLLOUT', 'Approved work becomes a record.', 'The resulting artifact, rationale, edits, approval, and owner remain attached to the operating state.', 'Preserves the complete decision for adjacent teams and the next run.', 'Rollout expands from a reconstructable decision—not an unverifiable result.')
  ] };

  if (role === 'technical') return { ...shared, close: 'Bring your identity, data, execution, and deployment constraints to the review.', scenes: [
    scene('GROUND', 4, '01 / RETRIEVAL', 'Exact and semantic evidence meet in one context.', `${problem ? `For “${problem}”, ` : ''}the ${context} review begins with ranked private knowledge, citations, and the user's source permissions still attached.`, 'Combines exact-term and meaning-based retrieval, then re-ranks one context for the run.', 'Permission filtering happens before context reaches generation.'),
    scene('UNDERSTAND', 1, '02 / OPERATING MODEL', 'The product resolves what is true here.', 'People, policy, records, systems, and evidence become a tenant-scoped graph that the operator can inspect.', 'Maps retrieved evidence to the working entities and relationships of the organisation.', 'Unknown or conflicting state remains visible instead of being smoothed away.', 'left-top'),
    scene('PLAN', 2, '03 / CHECKPOINTED LOGIC', 'The workflow can stop, resume, and be inspected.', 'The visual plan exposes typed steps, tool scopes, pending review, and the state needed to resume after an interruption.', 'Turns intent into checkpointed, inspectable execution logic.', 'Consequential tools wait behind an explicit interrupt.'),
    scene('ACT', 6, '04 / ISOLATED EXECUTION', 'Tools and code remain bounded.', 'The execution surface scopes files, terminal, tests, credentials, network access, and output away from the application host.', 'Runs approved technical work inside a controlled sandbox.', 'The evaluator can inspect the action surface and resulting artifact.', 'left-top'),
    scene('REMEMBER', 8, '05 / RECONSTRUCTABLE STATE', 'The event trail ends in a durable record.', 'Collaborative edits, workflow state, tool output, approval, and artifacts remain available for replay and review.', 'Persists the state required to understand and continue the work.', 'A reviewer can reconstruct the decision after the run ends.')
  ] };

  return { ...shared, close: 'Bring the workflow that currently lives across tabs, threads, and handoffs.', scenes: [
    scene('UNDERSTAND', 0, '01 / OWNER FRAMING', 'Frame the decision once.', modeled, 'Reads the operating request, identifies the owner, and assembles the right work surfaces.', 'The owner sets the objective and the line the system cannot cross.'),
    scene('GROUND', 4, '02 / EXISTING EVIDENCE', 'Pull the work already done into view.', 'The knowledge surface retrieves exact records, related context, and citations without sending the owner tab hunting.', 'Grounds the work in private evidence the team can inspect.', 'Only approved context enters the run.', 'left-top'),
    scene('PLAN', 3, '03 / LIVE RATIONALE', 'Write the decision while it happens.', 'People and specialists co-author the brief, attach evidence, surface uncertainty, and keep review beside the work.', 'Turns research and specialist output into one evolving decision document.', 'Dissent and missing evidence remain visible.'),
    scene('REVIEW', 5, '04 / MULTIPLAYER REVIEW', 'Review one current state.', 'Comments, assignments, presence, specialist work, and the proposed action converge without stale copies or side channels.', 'Keeps the people and the work in one live operating thread.', 'The accountable reviewer stays inside the flow.', 'left-top'),
    scene('REMEMBER', 8, '05 / APPROVAL + RECORD', 'Approve the action. Keep the record.', 'The final workspace retains the evidence, rationale, changes, owner, approval, and resulting artifact for the next decision.', 'Ends the run as durable team memory instead of an expired conversation.', 'The record shows who approved what and why.')
  ] };
};