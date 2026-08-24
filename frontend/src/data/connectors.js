const definitions = [
  ['PostgreSQL', 'Data', 'SQL'], ['MySQL', 'Data', 'SQL'], ['MongoDB', 'Data', 'Document'], ['Redis', 'Data', 'Cache'],
  ['Amazon S3', 'Storage', 'Object'], ['Azure Blob', 'Storage', 'Object'], ['Google Cloud Storage', 'Storage', 'Object'],
  ['Snowflake', 'Data', 'Warehouse'], ['Databricks', 'Data', 'Lakehouse'], ['BigQuery', 'Data', 'Warehouse'], ['Redshift', 'Data', 'Warehouse'],
  ['Kafka', 'Events', 'Stream'], ['RabbitMQ', 'Events', 'Queue'], ['Elasticsearch', 'Data', 'Search'], ['Splunk', 'Operations', 'Telemetry'],
  ['Datadog', 'Operations', 'Telemetry'], ['GitHub', 'Engineering', 'Code'], ['GitLab', 'Engineering', 'Code'], ['Bitbucket', 'Engineering', 'Code'],
  ['Stripe', 'Revenue', 'Payments'], ['Plaid', 'Revenue', 'Finance'], ['Shopify', 'Revenue', 'Commerce'],
  ['Google Drive', 'Knowledge', 'Files'], ['SharePoint', 'Knowledge', 'Files'], ['OneDrive', 'Knowledge', 'Files'], ['Dropbox', 'Knowledge', 'Files'], ['Box', 'Knowledge', 'Files'],
  ['Gmail', 'Communication', 'Email'], ['Google Calendar', 'Communication', 'Calendar'], ['Slack', 'Communication', 'Chat'], ['Microsoft Teams', 'Communication', 'Chat'],
  ['Salesforce', 'Revenue', 'CRM'], ['HubSpot', 'Revenue', 'CRM'], ['ServiceNow', 'Operations', 'ITSM'], ['Zendesk', 'Operations', 'Support'], ['Intercom', 'Operations', 'Support'],
  ['Okta', 'Identity', 'IAM'], ['Active Directory', 'Identity', 'Directory'], ['SAP', 'ERP', 'Operations'], ['Oracle ERP', 'ERP', 'Operations'],
  ['NetSuite', 'ERP', 'Finance'], ['Workday', 'People', 'HRIS'], ['Figma', 'Creative', 'Design'], ['Miro', 'Creative', 'Canvas'],
  ['Zoom', 'Communication', 'Meetings'], ['REST APIs', 'Extensible', 'HTTP'], ['GraphQL', 'Extensible', 'Query'], ['MCP Tools', 'Extensible', 'MCP'],
  ['Linear', 'Engineering', 'Issues']
];

export const connectors = definitions.map(([name, category, protocol], index) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  number: String(index + 1).padStart(2, '0'),
  name,
  category,
  protocol,
  state: 'AVAILABLE'
}));

export const connectorCategories = ['All', ...new Set(connectors.map((item) => item.category))];