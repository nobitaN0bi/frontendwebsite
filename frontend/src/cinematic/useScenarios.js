import { useEffect, useState } from 'react';
import { industryCatalog } from '../data/industryCatalog';

export const fallbackScenarios = industryCatalog.map(({ id, label, group }) => ({
  id, label, group, company: `${label} organization`, owner: 'Knowledge work lead', role: `${label} operations`,
  hook: 'Loading the modeled operating story…', intent: 'Coordinate one consequential knowledge-work decision across the AHI desktop.',
  trigger: 'A new operating signal requires evidence, specialist work, and accountable review.', checkpoint: 'The accountable person approves the consequential step.',
  outcome: 'The decision remains reconstructable across the eight AHI surfaces.', metric: 'Modeled run ready', teamspace: `${label} command`,
  document: `${label} decision brief`, workflow: `${label} orchestrator`, channel: `${id}-command`,
  agents: ['Lead orchestrator', 'Evidence specialist', 'Systems operator', 'Decision recorder'], people: ['Knowledge work lead', 'Domain reviewer', 'Accountable approver'],
  peopleRoles: ['Owner', 'Reviewer', 'Approver'], knowledge: ['Policy library', 'System of record', 'Prior decisions', 'Live operating feed', 'External guidance'],
  pages: ['Decision brief', 'Evidence register', 'Execution plan', 'Approval record'], tasks: ['Frame the request', 'Retrieve evidence', 'Compare options', 'Approve the decision', 'Persist the record'],
  apps: ['Evidence Retriever', 'Workflow Orchestrator', 'Approval Guard'], codeFile: 'validate_decision.py', codeTask: 'Validate the modeled run inside a scoped sandbox.',
  browserUrl: 'https://source.example.com/latest', browserTitle: 'Approved external source', browserItems: ['Current guidance captured', 'Source date verified'],
  computerTask: 'Execute the approved workflow in a supervised computer session.', computerSteps: ['Open scoped workspace', 'Run approved action', 'Capture execution evidence'], computerOutput: 'Execution paused at the human checkpoint.',
  message: '@ahi coordinate this decision and stop before the consequential step.', agentReply: 'Evidence assembled across the eight surfaces. Human approval is required.'
}));

export const useScenarios = () => {
  const [scenarios, setScenarios] = useState(fallbackScenarios);
  useEffect(() => {
    let live = true;
    fetch('/demo/scenarios.json').then((response) => response.json()).then((data) => { if (live && Array.isArray(data) && data.length) setScenarios(data); }).catch(() => undefined);
    return () => { live = false; };
  }, []);
  return scenarios;
};