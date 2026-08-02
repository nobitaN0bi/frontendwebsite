export const legalContacts = [
  { label: 'General legal', email: 'legal@acoord.co' },
  { label: 'Privacy rights', email: 'privacy@acoord.co' },
  { label: 'Security reports', email: 'security@acoord.co' },
  { label: 'Product support', email: 'support@acoord.co' },
  { label: 'Abuse reports', email: 'abuse@acoord.co' },
  { label: 'Data protection', email: 'dpo@acoord.co' },
  { label: 'Accessibility', email: 'accessibility@acoord.co' },
  { label: 'Press', email: 'press@acoord.co' },
  { label: 'Partnerships', email: 'partnerships@acoord.co' }
];

export const legalDocs = [
  {
    slug: 'privacy', title: 'Privacy Policy', shortTitle: 'Privacy', category: 'Data',
    summary: 'How Acoord.co handles website contact data today and how future workspace data will be governed.',
    effective: 'April 8, 2026', readingTime: '12 min',
    callout: 'Today, this website collects waitlist and contact information only. The future platform practices below apply when those services become available and will be updated before launch.',
    sections: [
      { id: 'scope', title: '1. Scope and who we are', paragraphs: [
        'This Privacy Policy explains how Acoord.co (“Acoord,” “we,” “us,” or “our”) collects, uses, discloses, and protects personal information through acoord.co, its scheduling and contact experiences, and future Acoord products that link to this Policy.',
        'For the current public website, Acoord acts as the business or controller of contact information you choose to provide. For a future enterprise workspace, Acoord may act as a service provider or processor for customer-controlled workspace content, as described in the customer agreement and Data Processing Addendum.'
      ]},
      { id: 'current-data', title: '2. Information collected by the current website', paragraphs: ['The current website does not provide production agent workspaces or accept customer datasets. It may collect:'], bullets: [
        'Contact details: name, work email, company, role, and the coordination domain you select.',
        'Request content: the message you submit and any information you include in it.',
        'Consent records: submission time and the privacy notice version associated with your request.',
        'Basic technical records: request time, service status, and security logs needed to operate and protect the website.',
        'Scheduling information: when you choose to book through Calendly, Calendly collects scheduling details under its own privacy terms.'
      ]},
      { id: 'future-data', title: '3. Future platform data', paragraphs: ['When authenticated Acoord workspaces become generally available, the service may process the following categories on behalf of customers:'], bullets: [
        'Account and organization data, including workspace membership, roles, and authentication events.',
        'Customer content, including prompts, documents, canvas nodes, workflow definitions, comments, files, and human approvals.',
        'Agent and execution data, including model requests, tool calls, outputs, checkpoints, error traces, token usage, and audit events.',
        'Integration data made available through customer-authorized MCP servers, APIs, or connected systems.',
        'Collaboration data, including cursor presence, edits, version history, and synchronization events.',
        'Billing, support, and administrative records where applicable.'
      ]},
      { id: 'purposes', title: '4. Why we use information', bullets: [
        'Respond to access requests, schedule conversations, and provide requested information.',
        'Operate, secure, debug, and improve the website and future services.',
        'Provision accounts and deliver customer-configured agent workflows.',
        'Maintain audit history, human checkpoints, collaboration state, and service reliability.',
        'Detect abuse, enforce policies, and protect users, Acoord, and third parties.',
        'Comply with law, resolve disputes, and enforce agreements.',
        'Send product communications where permitted; you may opt out of promotional messages.'
      ]},
      { id: 'ai-data', title: '5. AI models and customer content', paragraphs: [
        'Acoord will not use enterprise customer content to train general-purpose models unless the customer expressly opts in through a written agreement or an authorized product control.',
        'Customer-selected model providers and tools may process content sent through configured workflows. Their handling of that content is governed by the customer’s configuration, the applicable provider terms, and Acoord’s enterprise agreements. We will document material subprocessors before production platform processing begins.'
      ]},
      { id: 'disclosure', title: '6. How information is disclosed', paragraphs: ['We may disclose information only as needed to:'], bullets: [
        'Service providers that host, secure, support, or help deliver the service under contractual restrictions.',
        'Customer-authorized integration and model providers when a workflow directs Acoord to use them.',
        'Professional advisers, auditors, and insurers under duties of confidentiality.',
        'Authorities or other parties when required by law or necessary to protect rights, safety, and service integrity.',
        'A successor in connection with a merger, financing, acquisition, or sale, subject to applicable law.'
      ]},
      { id: 'sale', title: '7. Sale, sharing, and targeted advertising', paragraphs: [
        'Acoord does not sell personal information. The current website does not share personal information for cross-context behavioral advertising and does not use third-party advertising cookies. If this changes, we will update this Policy and provide legally required choices before the change takes effect.'
      ]},
      { id: 'retention', title: '8. Retention', paragraphs: [
        'Waitlist and contact requests are generally retained for up to 24 months after the last meaningful interaction, unless a longer period is required for security, legal, or recordkeeping needs. You may ask us to delete your request sooner.',
        'Future customer content retention will follow customer configuration and contract terms. Backup copies may persist for a limited period before secure deletion. Security and audit records may be kept longer where necessary to protect the service or meet legal obligations.'
      ]},
      { id: 'security', title: '9. Security', paragraphs: [
        'We use administrative, technical, and organizational measures designed to protect information. No method of transmission or storage is completely secure. Our architecture emphasizes tenant boundaries, least-privilege access, encrypted transport, auditable workflow state, and isolated execution. See the Security Overview for the current posture and limitations.'
      ]},
      { id: 'rights', title: '10. Your privacy rights', paragraphs: ['Depending on where you live, you may have rights to know, access, correct, delete, or receive a copy of personal information, and to limit or object to certain processing. California residents may also request information about categories collected, sources, purposes, and disclosures.'], bullets: [
        'Submit requests to privacy@acoord.co or dpo@acoord.co.',
        'We may verify your identity and authority before completing a request.',
        'Authorized agents may submit requests where permitted by law.',
        'We will not discriminate against you for exercising applicable privacy rights.',
        'You may appeal a denied request by replying to our decision.'
      ]},
      { id: 'international', title: '11. International use', paragraphs: [
        'Acoord is governed from California, United States. Information may be processed in the United States and other countries where service providers operate. Where required, we will use approved transfer mechanisms and contractual safeguards for future international platform processing.'
      ]},
      { id: 'children', title: '12. Children', paragraphs: ['The website and future enterprise service are not directed to children under 13, and we do not knowingly collect their personal information. Customers using future services in educational contexts are responsible for obtaining required permissions and configuring age-appropriate safeguards.']},
      { id: 'changes', title: '13. Changes and contact', paragraphs: [
        'We may update this Policy as the product, law, or data practices evolve. We will post the updated date and provide additional notice when required. Questions and rights requests may be sent to privacy@acoord.co. General legal questions may be sent to legal@acoord.co.'
      ]}
    ]
  },
  {
    slug: 'terms', title: 'Terms of Use', shortTitle: 'Terms', category: 'Agreement',
    summary: 'The rules governing this website, demos, access requests, and future use of Acoord services.',
    effective: 'April 8, 2026', readingTime: '15 min',
    callout: 'The current canvas is an interactive product preview. It does not execute production workflows or provide regulated decision-making services.',
    sections: [
      { id: 'agreement', title: '1. Agreement to these Terms', paragraphs: ['These Terms of Use (“Terms”) form an agreement between you and Acoord.co (“Acoord,” “we,” “us,” or “our”). By accessing acoord.co, submitting a request, booking a meeting, or using a service that links to these Terms, you agree to them. If you use the service for an organization, you represent that you may bind that organization.']},
      { id: 'service', title: '2. The service', paragraphs: ['Acoord is developing an agent-human coordination system that may include visual workflow composition, collaborative workspaces, agent orchestration, retrieval, integrations, human checkpoints, and secure execution. Features described on this website may be previews, planned capabilities, or limited alpha functions and may change before commercial release.']},
      { id: 'eligibility', title: '3. Eligibility and authority', paragraphs: ['You must be at least 18 years old and legally able to enter a contract. You may not use the service if applicable law prohibits you from receiving it. Organizational users must follow their employer’s policies and authorization requirements.']},
      { id: 'accounts', title: '4. Accounts and access', paragraphs: ['Future workspace access may require an account. You are responsible for accurate registration information, safeguarding credentials, managing authorized users, and promptly reporting suspected compromise. Access is personal to the authorized user unless an enterprise agreement permits administrative delegation.']},
      { id: 'acceptable-use', title: '5. Acceptable use', paragraphs: ['You must comply with the Acceptable Use Policy. You may not use Acoord to violate law, harm people, bypass safeguards, compromise systems, infringe rights, or create deceptive or unlawful automated decisions. We may investigate and restrict activity that threatens the service or others.']},
      { id: 'customer-content', title: '6. Customer content and instructions', paragraphs: [
        'You retain ownership of content you submit. You grant Acoord the limited rights necessary to host, process, transmit, display, and secure that content to provide the service and carry out authorized workflow instructions.',
        'You are responsible for having the rights and permissions needed to submit content and connect systems. You must not place highly sensitive, regulated, or production data into an alpha or demo environment unless Acoord has expressly authorized that use in writing.'
      ]},
      { id: 'outputs', title: '7. AI outputs and human review', paragraphs: [
        'Agent and model outputs can be inaccurate, incomplete, biased, or unsuitable for a particular purpose. Similar inputs may produce different outputs. You are responsible for evaluating outputs, configuring appropriate safeguards, and applying qualified human review before consequential use.',
        'Acoord is not a substitute for legal, medical, financial, safety, employment, or other professional judgment. Product examples and fictional case studies are illustrative and are not customer promises or professional advice.'
      ]},
      { id: 'integrations', title: '8. Third-party services and integrations', paragraphs: ['Acoord may connect to model providers, MCP servers, APIs, calendars, data stores, and other third-party services at your direction. Third-party terms and privacy practices apply to those services. Acoord is not responsible for third-party services outside its control, and you are responsible for authorized configuration and credentials.']},
      { id: 'ownership', title: '9. Acoord technology and intellectual property', paragraphs: ['Acoord and its licensors retain all rights in the service, software, design, documentation, brands, and technology, excluding customer content. No rights are granted except as expressly stated. Open-source components remain governed by their applicable licenses. You may not copy, sell, reverse engineer, or create derivative services from non-public components except where law or an open-source license permits it.']},
      { id: 'feedback', title: '10. Feedback', paragraphs: ['If you provide ideas or feedback, you grant Acoord a worldwide, perpetual, irrevocable, royalty-free right to use it without restriction or compensation. This does not transfer ownership of your customer content or confidential information.']},
      { id: 'confidentiality', title: '11. Confidential previews', paragraphs: ['Alpha access, non-public roadmaps, credentials, technical materials, and designated information may be confidential. You may use confidential information only to evaluate or use Acoord and must protect it with reasonable care. This obligation does not cover information that becomes public without breach, was already lawfully known, or is independently developed.']},
      { id: 'suspension', title: '12. Suspension and termination', paragraphs: ['You may stop using the website at any time. We may suspend or terminate access for breach, security risk, unlawful activity, nonpayment under a future order, or to protect the service or others. Provisions that by their nature should survive termination will survive, including ownership, disclaimers, liability limits, and dispute terms.']},
      { id: 'disclaimers', title: '13. Disclaimers', paragraphs: ['TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE WEBSITE, DEMOS, ALPHA FEATURES, AND SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE.” Acoord disclaims implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that previews will be uninterrupted, error-free, secure, or preserved, or that outputs will be accurate.']},
      { id: 'liability', title: '14. Limitation of liability', paragraphs: ['TO THE MAXIMUM EXTENT PERMITTED BY LAW, Acoord will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or loss of data, revenue, profits, goodwill, or business opportunity. For free website and preview use, Acoord’s total liability arising from these Terms will not exceed one hundred U.S. dollars (US$100). Different limits may apply under a signed enterprise agreement.']},
      { id: 'indemnity', title: '15. Indemnification', paragraphs: ['To the extent permitted by law, you will defend and indemnify Acoord and its personnel against third-party claims arising from your content, unlawful use, connected systems, or breach of these Terms. This obligation does not apply to the extent a claim results from Acoord’s own breach or misconduct.']},
      { id: 'law', title: '16. Governing law and disputes', paragraphs: ['California law governs these Terms without regard to conflict-of-law rules. The state and federal courts located in San Francisco County, California will have exclusive jurisdiction, and each party consents to those courts. Nothing prevents either party from seeking urgent equitable relief for misuse, security threats, or intellectual property violations.']},
      { id: 'general', title: '17. General terms', paragraphs: ['These Terms, the Privacy Policy, and incorporated policies are the complete agreement for public website and preview use. Signed enterprise terms control if they conflict. You may not assign these Terms without our consent; Acoord may assign them in connection with a reorganization or transfer of the service. If any provision is unenforceable, the rest remains effective. Questions: legal@acoord.co.']}
    ]
  },
  {
    slug: 'acceptable-use', title: 'Acceptable Use Policy', shortTitle: 'Acceptable use', category: 'Safety',
    summary: 'Clear boundaries for safe, lawful, and accountable use of human-agent coordination.',
    effective: 'April 8, 2026', readingTime: '8 min',
    callout: 'Acoord is designed for supervised coordination. You remain responsible for the systems, data, tools, and decisions you connect.',
    sections: [
      { id: 'principles', title: '1. Core principles', bullets: ['Use Acoord lawfully and with appropriate human accountability.', 'Respect consent, privacy, intellectual property, and access boundaries.', 'Apply safeguards proportional to the impact of the workflow.', 'Do not represent generated content as verified fact without appropriate review.']},
      { id: 'illegal', title: '2. Illegal and harmful activity', paragraphs: ['You may not use Acoord to plan, facilitate, conceal, or commit illegal acts; exploit or endanger people; facilitate trafficking; distribute child sexual abuse material; or create instructions intended to cause physical harm.']},
      { id: 'security-abuse', title: '3. Security abuse and malware', bullets: ['No unauthorized access, credential theft, phishing, malware, ransomware, denial-of-service, botnet activity, or evasion of security controls.', 'No scanning, exploitation, or persistence against systems without explicit authorization.', 'Security research must be authorized, scoped, and responsibly disclosed to security@acoord.co.']},
      { id: 'high-impact', title: '4. High-impact decisions', paragraphs: ['Do not use Acoord as the sole decision-maker for eligibility, employment, housing, credit, insurance, education admission, medical treatment, legal rights, critical infrastructure control, or other decisions with material effects on a person. Such workflows require lawful authority, domain-qualified human review, testing, documentation, and an appeal or correction path where appropriate.']},
      { id: 'deception', title: '5. Deception, impersonation, and manipulation', bullets: ['No fraud, impersonation, forged evidence, deceptive synthetic media, or undisclosed automated outreach intended to mislead.', 'No manipulation that exploits vulnerabilities based on age, disability, financial condition, or crisis.', 'Automated agents must be identified where law, context, or reasonable user expectation requires disclosure.']},
      { id: 'privacy', title: '6. Privacy and surveillance', bullets: ['Do not submit personal information without an appropriate legal basis and authorization.', 'Do not infer highly sensitive traits or conduct unlawful biometric identification or surveillance.', 'Do not connect private systems or retrieve data beyond the permissions granted to you.', 'Do not use demo or alpha environments for regulated production data without written approval.']},
      { id: 'content', title: '7. Intellectual property and abusive content', paragraphs: ['Do not use Acoord to infringe intellectual property, distribute non-consensual intimate imagery, threaten or harass others, or generate targeted hateful abuse. Lawful analysis, safety testing, and documentation may be permitted when appropriately scoped and controlled.']},
      { id: 'platform', title: '8. Platform integrity', bullets: ['Do not resell, benchmark for publication, or probe non-public features without authorization.', 'Do not bypass usage limits, access controls, topology guards, human checkpoints, or audit mechanisms.', 'Do not misrepresent output provenance, remove required notices, or interfere with service telemetry.', 'Do not create excessive automated load or use the service to compete through unauthorized extraction.']},
      { id: 'enforcement', title: '9. Reporting and enforcement', paragraphs: ['Report suspected violations to abuse@acoord.co. We may investigate, preserve relevant records, limit tools, suspend workflows, or terminate access. We consider severity, intent, impact, recurrence, and remediation. Where appropriate, we may notify affected parties or authorities.']}
    ]
  },
  {
    slug: 'security', title: 'Security Overview', shortTitle: 'Security', category: 'Trust',
    summary: 'The architectural controls, operating principles, and honest boundaries behind “magic you can trust.”',
    effective: 'April 8, 2026', readingTime: '10 min',
    callout: 'This page describes architecture and planned controls, not a certification claim. Current certifications and external audit reports will be listed only after they are completed.',
    sections: [
      { id: 'model', title: '1. Security model', paragraphs: ['Acoord treats agent execution as untrusted, tenant data as scoped, and consequential actions as candidates for explicit human approval. Security controls are designed around isolation, least privilege, inspectable state, and failure containment.']},
      { id: 'identity', title: '2. Identity and access', bullets: ['Role-based access at workspace and resource levels.', 'Short-lived, scoped credentials for integrations where supported.', 'Administrative controls for membership, roles, and session revocation.', 'Planned enterprise support for SSO, domain controls, and automated provisioning.']},
      { id: 'tenant', title: '3. Tenant and data boundaries', bullets: ['Logical tenant isolation across application and persistence layers.', 'Customer-scoped retrieval, workflow state, and integration routing.', 'Authorization checks before workspace reads, writes, tool calls, and exports.', 'Separate production and development environments with restricted access.']},
      { id: 'encryption', title: '4. Encryption and secrets', bullets: ['TLS for data in transit across supported service boundaries.', 'Encryption at rest through managed infrastructure controls for production services.', 'Secrets supplied through environment and secret-management systems rather than application source.', 'No secrets should be placed in prompts, node labels, public demos, or support messages.']},
      { id: 'execution', title: '5. Agent and code execution', bullets: ['Generated code is intended to run in isolated sandbox environments rather than application hosts.', 'Static analysis and policy checks may block unsafe imports, network actions, or resource use.', 'Tool permissions are scoped to the workflow and tenant context.', 'Execution budgets, timeouts, output limits, and circuit breakers reduce runaway behavior.']},
      { id: 'compiler', title: '6. Workflow integrity', bullets: ['Visual workflows compile to a structured execution representation before runtime.', 'Topology checks detect cycles, unresolved handles, and invalid bindings.', 'Human checkpoints can pause execution before consequential actions.', 'Version and event history support investigation, rollback, and reproducibility.']},
      { id: 'operations', title: '7. Operational security', bullets: ['Centralized security logging for authentication, administrative changes, and execution events.', 'Dependency, vulnerability, and configuration review as the production service matures.', 'Backup and recovery procedures tested against defined service objectives.', 'Incident response process covering triage, containment, recovery, notification, and learning.']},
      { id: 'customer', title: '8. Customer responsibilities', bullets: ['Configure roles, tools, models, and data sources according to least privilege.', 'Review high-impact outputs and preserve required human decision authority.', 'Secure connected systems and rotate credentials when personnel or risk changes.', 'Avoid production regulated data in previews unless covered by a signed agreement.']},
      { id: 'disclosure', title: '9. Vulnerability disclosure', paragraphs: ['Send suspected vulnerabilities to security@acoord.co with reproduction steps, affected URLs, and impact. Do not access data that is not yours, disrupt service, use social engineering, or publish details before remediation coordination. We will acknowledge credible reports and work toward a reasonable resolution.']},
      { id: 'assurance', title: '10. Assurance status', paragraphs: ['Acoord does not currently claim SOC 2, ISO 27001, HIPAA, FedRAMP, PCI DSS, or other certifications on this public demo. Contractual commitments, audit materials, penetration-test summaries, and a production trust center will be made available when applicable and verified.']}
    ]
  },
  {
    slug: 'cookies', title: 'Cookie and Local Storage Notice', shortTitle: 'Cookies', category: 'Data',
    summary: 'A plain-language description of browser storage, hosted assets, and scheduling links.',
    effective: 'April 8, 2026', readingTime: '5 min',
    callout: 'The current Acoord website does not use advertising cookies or cross-site behavioral tracking.',
    sections: [
      { id: 'current-use', title: '1. Current use', paragraphs: ['The public site is designed to function without advertising cookies. The interactive canvas runs in your browser and may use transient browser state to support the current session. The waitlist form sends the information you choose to submit to Acoord’s service.']},
      { id: 'essential', title: '2. Essential technologies', paragraphs: ['Essential storage may be used in future authenticated experiences to maintain sessions, prevent abuse, remember security preferences, or preserve local-first workspace state. These technologies are required for requested functionality and are not used for behavioral advertising.']},
      { id: 'local-first', title: '3. Future local-first workspace storage', paragraphs: ['Future Acoord workspaces may use IndexedDB or similar browser storage to support offline editing, queued CRDT mutations, and faster restoration. Customers will receive product documentation describing controls and deletion behavior before those features process production content.']},
      { id: 'third-party', title: '4. Third-party resources', bullets: ['Google-hosted font assets may receive ordinary network information such as IP address and user agent when loaded.', 'Calendly receives scheduling information when you choose a booking link and is governed by its own notices.', 'External links may lead to services with their own cookies and storage practices.']},
      { id: 'analytics', title: '5. Analytics', paragraphs: ['The current implementation does not include third-party behavioral analytics. If analytics are introduced, Acoord will prefer privacy-preserving measurement, update this notice, and provide consent controls where required.']},
      { id: 'choices', title: '6. Your choices', paragraphs: ['You can control cookies and site data through browser settings. Blocking essential storage may prevent future sign-in, offline collaboration, or security functions. You can avoid Calendly processing by contacting support@acoord.co to request scheduling by email.']},
      { id: 'signals', title: '7. Global Privacy Control', paragraphs: ['Because the current site does not sell or share personal information for cross-context behavioral advertising, there is no advertising opt-out cookie to set. We will honor legally applicable browser-based preference signals if relevant processing is introduced.']},
      { id: 'contact', title: '8. Contact', paragraphs: ['Questions about browser storage or tracking practices may be sent to privacy@acoord.co.']}
    ]
  },
  {
    slug: 'dpa', title: 'Data Processing Addendum', shortTitle: 'DPA', category: 'Enterprise',
    summary: 'A framework for enterprise customer content processed by future Acoord workspaces.',
    effective: 'April 8, 2026', readingTime: '13 min',
    callout: 'This public DPA is a reference framework. A signed order or enterprise agreement must activate production processing obligations.',
    sections: [
      { id: 'application', title: '1. Application and priority', paragraphs: ['This Data Processing Addendum (“DPA”) applies when Acoord processes personal data on behalf of a customer under a signed agreement that incorporates it. If this DPA conflicts with the service agreement on personal data processing, this DPA controls.']},
      { id: 'roles', title: '2. Roles and instructions', paragraphs: ['The customer is the controller or business and Acoord is the processor or service provider for customer personal data. Acoord will process that data only to provide and secure the contracted service, follow documented customer instructions, comply with law, and prevent or address technical problems.']},
      { id: 'details', title: '3. Processing details', bullets: ['Subject matter: agent-human workflow orchestration, collaboration, retrieval, integrations, and support.', 'Duration: the agreement term plus limited deletion and backup periods.', 'Data subjects: customer users, personnel, end users, contacts, and people represented in customer content.', 'Data types: account data, prompts, documents, files, workflow state, tool results, approvals, logs, and integration records.', 'Purpose: provide customer-configured features, maintain security and reliability, and deliver support.']},
      { id: 'confidentiality', title: '4. Personnel and confidentiality', paragraphs: ['Acoord will limit access to personnel who need it for the service and who are subject to confidentiality obligations. Access will be reviewed and revoked when no longer required.']},
      { id: 'security', title: '5. Security measures', bullets: ['Access control and least privilege.', 'Encryption in transit and at rest for production services.', 'Tenant-scoped authorization and integration routing.', 'Logging, monitoring, vulnerability management, and incident response.', 'Backup, recovery, and availability controls.', 'Sandboxing and policy enforcement for untrusted execution where applicable.']},
      { id: 'subprocessors', title: '6. Subprocessors', paragraphs: ['Customer authorizes subprocessors needed to provide the contracted service, subject to written data-protection obligations. Acoord will maintain a current list and provide notice of material new subprocessors under the enterprise agreement. Customer may object on reasonable data-protection grounds.']},
      { id: 'requests', title: '7. Data subject requests', paragraphs: ['Taking into account the nature of processing, Acoord will reasonably assist the customer with verified requests to access, correct, delete, restrict, or export personal data. If Acoord receives a request concerning customer-controlled data, it will direct the requester to the customer unless law requires otherwise.']},
      { id: 'incident', title: '8. Security incidents', paragraphs: ['Acoord will notify the customer without undue delay after confirming a breach of customer personal data and will provide available information reasonably needed for the customer’s response. Notification is not an admission of fault. The customer remains responsible for notices required of it.']},
      { id: 'assistance', title: '9. Compliance assistance', paragraphs: ['Acoord will provide reasonable information for data protection impact assessments, consultations, and customer compliance obligations, considering the processing and information available to Acoord. Additional work may be subject to agreed fees.']},
      { id: 'transfers', title: '10. International transfers', paragraphs: ['Where required, the parties will use an approved transfer mechanism, such as applicable Standard Contractual Clauses, and implement supplementary measures appropriate to the risk. Customer authorizes processing in locations documented in the applicable order and subprocessor list.']},
      { id: 'return', title: '11. Return and deletion', paragraphs: ['At the end of service, Acoord will delete or return customer personal data as configured or requested, unless law requires retention. Data may remain in backups for a limited period while protected and isolated from ordinary use.']},
      { id: 'audit', title: '12. Information and audits', paragraphs: ['Acoord will make available relevant summaries, questionnaires, and independent assurance reports when available. If those materials are insufficient, the parties may arrange a proportionate audit no more than annually, subject to confidentiality, security, timing, and cost controls.']},
      { id: 'contact', title: '13. Contact and execution', paragraphs: ['Privacy and DPA questions may be sent to dpo@acoord.co or privacy@acoord.co. A customer-specific DPA becomes binding only when incorporated into a signed agreement by authorized representatives.']}
    ]
  },
  {
    slug: 'subprocessors', title: 'Service Provider Register', shortTitle: 'Service providers', category: 'Transparency',
    summary: 'Third-party services used by the current marketing experience and the publication standard for future platform subprocessors.',
    effective: 'April 8, 2026', readingTime: '4 min',
    callout: 'No production Acoord workspace is offered through this public demo. A production subprocessor list will be published before customer content is processed.',
    sections: [
      { id: 'current', title: '1. Current public website providers', bullets: ['Calendly LLC — meeting scheduling; United States; used only when you choose a booking link.', 'Google LLC — hosted font delivery; global network; receives standard web request information when font assets load.', 'Infrastructure operators — website delivery and contact-request storage in the configured Acoord environment; access restricted to service operation.']},
      { id: 'future', title: '2. Future platform categories', paragraphs: ['Before production workspace launch, Acoord will publish provider name, purpose, processing location, and the date each provider is added. Expected categories may include cloud hosting, managed databases, observability, transactional email, customer-selected model providers, sandbox execution, and support systems. Listing a category here is not notice that a provider is currently active.']},
      { id: 'customer-tools', title: '3. Customer-directed providers', paragraphs: ['A model, MCP server, API, database, or tool selected and directly configured by a customer may be a customer-directed third party rather than an Acoord subprocessor. Responsibility and terms will be defined in the enterprise agreement and product controls.']},
      { id: 'updates', title: '4. Updates and objections', paragraphs: ['Enterprise customers will receive the notice period specified in their agreement before a material new subprocessor processes customer personal data. Data-protection objections may be sent to privacy@acoord.co.']}
    ]
  }
];

export const getLegalDoc = (slug) => legalDocs.find((document) => document.slug === slug);