import { useEffect, useRef } from 'react';

const patterns = {
  ambient: `░░░ COORDINATION BUS ░▒▓█ ░░░\nHUMAN::INTENT ─────── AGENT::STATE\n░▒░ TOOL::SCOPE ░░ PROOF::WRITE ░▒░`,
  signal: `YOU SAY IT         THE SYSTEM HEARS IT\n░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░\n      intent.signal -> classify -> plan`,
  compile: `[ HUMAN INTENT ]\n       │\n       ├────> { AGENT_01 } ────> [ TOOL ]\n       └────> { GUARD_02 } ────> [ PROOF ]\n                 topology::valid`,
  collaborate: `ARI  ▸ node.move(42,18)\nSAM  ▸ prompt.edit(+17)\nYJS  ▸ merge[deterministic]\n░▒▓ CRDT STATE CONVERGED ▓▒░`,
  trust: `POLICY ............. PASS\nTOOL_SCOPE .......... VALID\nHUMAN_CHECKPOINT .... WAITING\nAUDIT_LEDGER ........ WRITTEN`,
  stories: `01 BANK      02 HEALTH    03 LEGAL\n04 DEVOPS    05 COMMERCE  06 GOV\n07 EDUCATION 08 INDUSTRY  09 INSURE\n10 AI_NATIVE ............ COORDINATED`,
  ledger: `{ "intent": "coordinate",\n  "topology": "valid",\n  "checkpoint": "human",\n  "proof": "persisted" }`,
  knowledge: `query ──┬── vector.rank[0.93]\n         └── bm25.rank[01]\n             ↓ RRF FUSION ↓\n         grounded.context[18]`,
  policy: `SCOPE::CURRENT ── website/contact\nSCOPE::FUTURE  ── workspace/runtime\nCLAIM::STATUS  ── verified only\nRIGHTS::ROUTE  ── privacy@acoord.co`
};

export const AsciiNarrative = ({ mode = 'signal', tone = 'light', label = '' }) => {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle('is-visible', entry.isIntersecting);
    }, { threshold: 0.12, rootMargin: '80px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ascii-narrative narrative-${mode} narrative-${tone}`} aria-hidden="true">
      <pre>{patterns[mode] || patterns.signal}</pre>
      <div className="ascii-motion-rail rail-a"><i /><i /><i /></div>
      <div className="ascii-motion-rail rail-b"><i /><i /></div>
      <span className="ascii-narrative-label">{label || mode}</span>
    </div>
  );
};