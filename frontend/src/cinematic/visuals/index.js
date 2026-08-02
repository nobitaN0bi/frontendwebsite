import { BrowserVisual } from './BrowserVisual';
import { BuilderVisual } from './BuilderVisual';
import { CodeVisual } from './CodeVisual';
import { CollabVisual } from './CollabVisual';
import { DecisionVisual } from './DecisionVisual';
import { DispatchVisual } from './DispatchVisual';
import { DocsVisual } from './DocsVisual';
import { KnowledgeVisual } from './KnowledgeVisual';
import { OntologyVisual } from './OntologyVisual';

export const visuals = {
  dispatch: DispatchVisual,
  ontology: OntologyVisual,
  builder: BuilderVisual,
  docs: DocsVisual,
  knowledge: KnowledgeVisual,
  collaboration: CollabVisual,
  code: CodeVisual,
  browser: BrowserVisual,
  decision: DecisionVisual
};
