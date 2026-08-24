import { investorProductScenario } from './investorProductScenario';

export const ahiStoryChapters = [
  { id: 'observe', label: 'Observe', scene: 0, headline: 'See the whole fleet before it acts.', copy: 'Every task, tool call, and handoff appears in one live inbox—not across nine dashboards.', narration: 'Observe. See the whole fleet before it acts. Every task, tool call, and handoff appears in one live inbox, not across nine dashboards.' },
  { id: 'approve', label: 'Approve', scene: 8, headline: 'Put judgment exactly where it matters.', copy: 'AHI pauses consequential actions with the evidence, owner, and blast radius already attached.', narration: 'Approve. Put judgment exactly where it matters. AHI pauses consequential actions with the evidence, owner, and blast radius already attached.' },
  { id: 'steer', label: 'Steer', scene: 5, headline: 'Change direction without rebuilding the agent.', copy: 'Give a plain-language directive once. AHI carries that constraint across the tools and agents involved.', narration: 'Steer. Change direction without rebuilding the agent. Give a plain-language directive once. AHI carries that constraint across the tools and agents involved.' },
  { id: 'connect', label: 'Connect', scene: 2, headline: 'Bring company context into one command surface.', copy: 'Connect communication, work, code, knowledge, CRM, files, meetings, and the public web.', narration: 'Connect. Bring company context into one command surface. Connect communication, work, code, knowledge, customer systems, files, meetings, and the public web.' },
  { id: 'audit', label: 'Audit', scene: 3, headline: 'Know what happened, who approved it, and why.', copy: 'Every action becomes a reviewable chain of evidence instead of an untraceable chat transcript.', narration: 'Audit. Know what happened, who approved it, and why. Every action becomes a reviewable chain of evidence instead of an untraceable chat transcript.' },
  { id: 'scale', label: 'Scale', scene: 1, headline: 'Build OSI across every member.', copy: 'Give each employee governed agent leverage while the organization learns as one coordinated system.', narration: 'Scale. Build organizational super intelligence across every member. Give each employee governed agent leverage while the organization learns as one coordinated system.' }
];

export const ahiProductScenario = {
  ...investorProductScenario,
  id: 'ahi-live',
  label: 'AHI',
  company: 'Acoord Product Workspace',
  owner: 'Human operator',
  role: 'Organizational command surface',
  hook: 'One governed interface between every employee and every agent.',
  intent: 'Observe, approve, steer, connect, audit, and scale coordinated agent work from one command surface.',
  trigger: 'A consequential workflow crosses people, agents, policies, and systems.',
  checkpoint: 'A human reviews the evidence and decides whether the proposed action can proceed.',
  outcome: 'The decision, rationale, evidence, and resulting work remain visible in one durable record.',
  metric: 'Governed execution',
  teamspace: 'AHI Command Surface',
  document: 'Coordinated Decision Record',
  workflow: 'Governed Agent Fleet',
  channel: 'ahi-command',
  agents: ['Context Agent', 'Workflow Agent', 'Evidence Agent', 'Audit Agent'],
  people: ['Human operator', 'Workflow owner', 'Risk reviewer'],
  knowledge: ['Organization policy graph', 'Approved system context', 'Human authority model', 'Workflow evidence', 'Decision history'],
  graphNodes: ['Human Intent', 'Enterprise Context', 'AHI Control Plane', 'Approval Gate', 'Agent Fleet', 'Decision Record'],
  tasks: ['Observe active work', 'Attach evidence', 'Request approval', 'Apply directive', 'Write the audit record'],
  codeFile: 'verify_governed_action.py',
  codeTask: 'Validate evidence, authority, and system scope before a consequential action can execute.',
  browserUrl: 'https://acoord.co/legal/security',
  browserTitle: 'Acoord security and authority controls',
  browserItems: ['Human approval boundaries verified', 'Evidence lineage attached'],
  message: '@ahi keep consequential writes behind human approval and carry that constraint across the fleet.',
  agentReply: 'Directive applied. Connected agents share the constraint; external writes remain paused for approval.'
};