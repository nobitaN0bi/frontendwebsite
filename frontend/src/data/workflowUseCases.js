export const workflowUseCases = {
  healthcare: {
    label: 'Healthcare', eyebrow: 'HEALTHCARE / HUMAN AUTHORITY',
    title: 'Coordinate care without automating judgment.',
    description: 'Model the handoffs around a clinical or operational decision while keeping patient context, policy, evidence, and accountable review in one line.',
    filters: ['All', 'Clinical Ops', 'Revenue Cycle', 'Compliance'],
    schemaDescription: 'AHI workflow patterns for clinical operations, revenue cycle, and healthcare compliance with explicit human review.',
    workflows: [
      { id: 'discharge', category: 'Clinical Ops', title: 'Discharge readiness', intent: 'Assemble the care plan, unresolved risks, owner handoffs, and follow-up before discharge.', sources: ['EHR context', 'Care plan', 'Medication list', 'Scheduling'], specialists: ['Care coordinator', 'Medication reviewer', 'Follow-up planner'], checkpoint: 'A licensed clinician confirms readiness and unresolved exceptions.', record: 'Signed discharge coordination brief' },
      { id: 'prior-auth', category: 'Clinical Ops', title: 'Prior authorization', intent: 'Ground a request in policy and patient context, then prepare the evidence packet.', sources: ['Coverage policy', 'Clinical notes', 'Procedure codes', 'Prior decisions'], specialists: ['Policy analyst', 'Clinical evidence reviewer', 'Packet writer'], checkpoint: 'Clinical staff validates necessity and submitted evidence.', record: 'Cited authorization packet' },
      { id: 'denial', category: 'Revenue Cycle', title: 'Denial root cause', intent: 'Trace a denial cluster across coding, eligibility, documentation, and payer policy.', sources: ['Claim ledger', 'Payer policy', 'Coding history', 'Remittance advice'], specialists: ['Denial analyst', 'Coding reviewer', 'Appeal writer'], checkpoint: 'Revenue-cycle leadership approves the appeal and process change.', record: 'Denial decision map' },
      { id: 'audit', category: 'Compliance', title: 'Clinical audit response', intent: 'Collect the evidence, owners, chronology, and remediation steps for a review.', sources: ['Audit request', 'Policy library', 'Access logs', 'Prior remediation'], specialists: ['Evidence collector', 'Policy mapper', 'Response drafter'], checkpoint: 'Compliance and counsel approve the final representation.', record: 'Reconstructable audit response' }
    ]
  },
  cfo: {
    label: 'CFO Office', eyebrow: 'CFO / DECISION CONTROL',
    title: 'Turn financial signals into an accountable operating decision.',
    description: 'Coordinate finance, systems, and business owners around the close, forecast, spend, and board narrative without losing evidence or approval boundaries.',
    filters: ['All', 'Close', 'Planning', 'Procurement'],
    schemaDescription: 'AHI workflow patterns for CFO teams across financial close, planning, procurement, and board reporting.',
    workflows: [
      { id: 'close', category: 'Close', title: 'Close exception control', intent: 'Resolve reconciliation exceptions, assign evidence gaps, and stop at material judgment.', sources: ['General ledger', 'Subledgers', 'Reconciliation policy', 'Close calendar'], specialists: ['Reconciliation analyst', 'Policy reviewer', 'Close coordinator'], checkpoint: 'The controller approves material adjustments and sign-off.', record: 'Close exception ledger' },
      { id: 'forecast', category: 'Planning', title: 'Forecast variance', intent: 'Explain variance through pipeline, headcount, spend, and operating assumptions.', sources: ['ERP actuals', 'CRM pipeline', 'HRIS plan', 'Operating model'], specialists: ['Variance analyst', 'Revenue planner', 'Workforce planner'], checkpoint: 'Finance leadership accepts revised assumptions before publication.', record: 'Cited forecast narrative' },
      { id: 'board', category: 'Planning', title: 'Board pack assembly', intent: 'Build a sourced operating narrative from finance and company systems.', sources: ['Management accounts', 'KPI model', 'Department updates', 'Risk register'], specialists: ['Pack editor', 'KPI verifier', 'Risk summarizer'], checkpoint: 'The CFO approves every external-facing claim and number.', record: 'Versioned board decision pack' },
      { id: 'spend', category: 'Procurement', title: 'Spend exception review', intent: 'Compare a purchase request with budget, vendor risk, policy, and alternatives.', sources: ['Budget plan', 'Vendor master', 'Security review', 'Procurement policy'], specialists: ['Budget analyst', 'Vendor reviewer', 'Sourcing specialist'], checkpoint: 'The budget owner approves the exception and rationale.', record: 'Approved spend decision' }
    ]
  }
};