import { useEffect, useState } from 'react';

const labels = [
  ['finance', 'Finance'], ['legal', 'Legal'], ['manufacturing', 'Manufacturing'], ['customer-support', 'Customer Support'],
  ['logistics', 'Logistics'], ['ecommerce', 'E-commerce'], ['saas', 'SaaS'], ['fashion', 'Fashion']
];

export const fallbackScenarios = labels.map(([id, label]) => ({
  id,
  label,
  company: label,
  owner: 'Operations lead',
  role: `${label} operations`,
  hook: 'Loading the enterprise scenario…',
  intent: 'One operating problem, routed across nine connected surfaces.',
  trigger: 'A signal arrives from an upstream system.',
  checkpoint: 'A human approves the consequential step.',
  outcome: 'The decision stays reconstructable.',
  metric: 'Scenario ready',
  teamspace: `${label} teamspace`,
  document: 'Decision brief',
  workflow: `${label} orchestrator`,
  channel: `${id}-operations`,
  agents: ['Lead orchestrator', 'Research analyst', 'Systems engineer', 'Audit writer'],
  people: ['Operations lead', 'Reviewer', 'Approver'],
  knowledge: ['Policy library', 'System of record', 'Prior decisions', 'Live feed'],
  graphNodes: ['Core intent', 'Policy', 'System', 'Record', 'Owner', 'Evidence'],
  tasks: ['Ground the request', 'Retrieve evidence', 'Score the options', 'Approve the decision', 'Persist the record'],
  codeFile: 'validate_run.py',
  codeTask: 'Validate the run inside an isolated sandbox.',
  browserUrl: 'https://source.example.com/latest',
  browserTitle: 'External source verification',
  browserItems: ['Source verified', 'Change captured'],
  message: '@ahi coordinate this work and stop before the consequential step.',
  agentReply: 'Evidence assembled. Human approval required before execution.'
}));

export const useScenarios = () => {
  const [scenarios, setScenarios] = useState(fallbackScenarios);

  useEffect(() => {
    let live = true;
    fetch('/demo/scenarios.json')
      .then((response) => response.json())
      .then((data) => {
        if (live && Array.isArray(data) && data.length) setScenarios(data);
      })
      .catch(() => undefined);
    return () => { live = false; };
  }, []);

  return scenarios;
};
