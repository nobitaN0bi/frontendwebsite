(function () {
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  const params = new URLSearchParams(window.location.search);
  const scenarioId = params.get('scenario') || 'finance';
  const autoplay = params.get('autoplay') === '1';
  const actions = {
    home: ['Route enterprise intent', 'Classifying the trigger', 'Selecting specialist agents', 'Opening the human checkpoint'],
    ontology: ['Ground the shared graph', 'Resolving people and systems', 'Linking policies and evidence', 'Locking tenant-scoped context'],
    apps: ['Compile the workflow', 'Validating node bindings', 'Applying policy boundaries', 'Checkpointing execution state'],
    'doc-workspace': ['Draft the decision brief', 'Retrieving cited evidence', 'Co-authoring the rationale', 'Holding approval language'],
    library: ['Retrieve enterprise knowledge', 'Running hybrid lexical search', 'Reranking semantic matches', 'Returning cited context'],
    chat: ['Coordinate the response', 'Reading channel context', 'Inviting specialist agents', 'Escalating the decision'],
    code: ['Run the isolated analysis', 'Provisioning the sandbox', 'Executing bounded code', 'Persisting verified output'],
    browser: ['Collect external evidence', 'Opening the approved source', 'Extracting structured facts', 'Citing the current guidance'],
    teamspaces: ['Persist the operating plan', 'Syncing collaborative state', 'Assigning accountable owners', 'Recording the final decision']
    ,'meeting-keeper': ['Capture the live meeting', 'Separating decisions and action items', 'Assigning accountable owners', 'Saving the cited meeting record']
    ,studio: ['Compose the multimodal brief', 'Generating slide and image variants', 'Rendering the product demo sequence', 'Holding publish approval']
  };

  const metrics = {
    home: [['Open runs', '12', '14'], ['Specialists', '4', '6'], ['Reviews', '3', '4'], ['Context', '84%', '93%']],
    ontology: [['Entities', '181', '188'], ['Links', '624', '649'], ['Policies', '28', '31'], ['Coverage', '87%', '92%']],
    apps: [['Nodes', '8', '11'], ['Tools', '14', '16'], ['Checks', '6', '8'], ['Ready', '82%', '100%']],
    'doc-workspace': [['Sources', '12', '16'], ['Comments', '7', '9'], ['Owners', '3', '4'], ['Resolved', '68%', '81%']],
    library: [['Sources', '42', '47'], ['Citations', '18', '24'], ['Chunks', '142k', '145k'], ['Relevance', '.88', '.93']],
    chat: [['Participants', '7', '9'], ['Agents', '3', '4'], ['Threads', '5', '6'], ['Review', 'Pending', 'Ready']],
    code: [['Files', '18', '21'], ['Tests', '42', '48'], ['Findings', '6', '3'], ['Sandbox', 'Scoped', 'Verified']],
    browser: [['Sources', '8', '12'], ['Facts', '31', '44'], ['Citations', '10', '16'], ['Freshness', '2h', 'Now']],
    teamspaces: [['Owners', '4', '5'], ['Tasks', '18', '22'], ['Decisions', '6', '7'], ['State', 'Review', 'Recorded']],
    'meeting-keeper': [['Speakers', '6', '7'], ['Decisions', '3', '5'], ['Actions', '7', '11'], ['Coverage', '76%', '96%']],
    studio: [['Assets', '14', '19'], ['Variants', '8', '12'], ['Scenes', '6', '9'], ['Publish', 'Held', 'Ready']]
  };

  const setText = (selector, value, index = 0) => {
    const node = document.querySelectorAll(selector)[index];
    if (node && value) node.textContent = value;
  };

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

  const populateSidebar = (scenario) => {
    setText('.teamspace-tree .tree-node span[style*="font-weight:600"]', scenario.teamspace);
    const treeLabels = document.querySelectorAll('.tree-children .tree-node span:last-child');
    [scenario.document, scenario.tasks[0], 'Evidence graph'].forEach((label, index) => { if (treeLabels[index]) treeLabels[index].textContent = label; });
    setText('.account-name', scenario.owner);
    setText('.account-role', scenario.role);
    setText('#settings-modal h3', scenario.owner);
    setText('#settings-modal h3 + p', `${scenario.id === 'investor' ? 'investor' : 'operator'}@acoord.co · ${scenario.role}`);
    document.querySelectorAll('.avatar-badge').forEach((node) => { node.textContent = scenario.label.slice(0, 2).toUpperCase(); });
  };

  const replaceFallbackPeople = (scenario) => {
    const replacements = [
      [/Jane Doe/g, scenario.people[0] || scenario.owner],
      [/Mike Ross/g, scenario.people[1] || scenario.owner],
      [/Alex Kim/g, scenario.people[1] || scenario.owner],
      [/Sarah Chen/g, scenario.people[2] || scenario.owner],
      [/\bJane\b/g, scenario.people[0] || scenario.owner],
      [/\bAlex\b/g, scenario.people[1] || scenario.owner],
      [/\bSarah\b/g, scenario.people[2] || scenario.owner],
      [/jane\.doe@ahi-operating\.platform/g, `${scenario.id === 'investor' ? 'investor' : 'operator'}@acoord.co`]
    ];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (!['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName)) {
        let copy = node.nodeValue;
        replacements.forEach(([pattern, value]) => { copy = copy.replace(pattern, value); });
        if (copy.trim() === 'JD') copy = copy.replace('JD', scenario.label.slice(0, 2).toUpperCase());
        node.nodeValue = copy;
      }
      node = walker.nextNode();
    }
    document.querySelectorAll('.avatar-circle').forEach((avatar) => { if (avatar.textContent.trim() === 'JD') avatar.textContent = scenario.label.slice(0, 2).toUpperCase(); });
  };

  const populateHome = (scenario) => {
    setText('.page-container h1', `${scenario.company} command center`);
    setText('.page-container h1 + p', `One operating context · ${scenario.agents.length} active specialists · human authority preserved`);
    const search = document.getElementById('home-search');
    if (search) search.placeholder = scenario.intent;
    const recentTitles = document.querySelectorAll('.recent-item > div > div > div:first-child');
    [scenario.document, scenario.tasks[3], scenario.workflow].forEach((title, index) => { if (recentTitles[index]) recentTitles[index].textContent = title; });
    const recentMetadata = document.querySelectorAll('.recent-item > div > div > div:nth-child(2)');
    [
      `Updated by ${scenario.owner} · just now in ${scenario.teamspace}`,
      `Reviewed by ${scenario.people[1]} · today in ${scenario.teamspace}`,
      `Executed by ${scenario.agents[0]} · recorded in ${scenario.workflow}`
    ].forEach((copy, index) => { if (recentMetadata[index]) recentMetadata[index].textContent = copy; });
    const names = document.querySelectorAll('.page-container span[style*="font-weight: 600"]');
    [...scenario.people, ...scenario.agents.slice(0, 3)].forEach((name, index) => { if (names[index]) names[index].textContent = name; });
    const roleLabels = scenario.id === 'investor' ? ['Investor', 'Product diligence', 'Enterprise operator'] : ['Human operator', 'Workflow owner', 'Risk reviewer'];
    roleLabels.forEach((role, index) => {
      const row = names[index]?.parentElement?.parentElement;
      if (row?.lastElementChild) row.lastElementChild.textContent = role;
    });
  };

  const populateOntology = (scenario) => {
    document.querySelectorAll('.node-label-text').forEach((node, index) => { node.textContent = scenario.graphNodes[index] || scenario.graphNodes[0]; });
    const search = document.querySelector('.floating-search-pill input');
    if (search) search.placeholder = `Search ${scenario.company} entities...`;
  };

  const populateApps = (scenario) => {
    const cards = document.querySelectorAll('.app-directory-card');
    [scenario.workflow, `${scenario.label} Evidence Retriever`, `${scenario.label} Approval Guard`].forEach((title, index) => {
      const card = cards[index];
      if (!card) return;
      card.dataset.title = title;
      const directCopy = card.querySelectorAll(':scope > div');
      if (directCopy[1]) directCopy[1].textContent = title;
      if (directCopy[2]) directCopy[2].textContent = index === 0 ? scenario.hook : index === 1 ? `Grounds work in ${scenario.knowledge.slice(0, 3).join(', ')}.` : scenario.checkpoint;
    });
    const nodes = document.querySelectorAll('.canvas-node [style*="font-weight:700"]');
    [scenario.trigger, `Agent: ${scenario.agents[1]}`, `End: ${scenario.document}`].forEach((title, index) => { if (nodes[index]) nodes[index].textContent = title; });
    setText('#pipeline-log-terminal', `[Ahi Compiler] ${scenario.workflow} validated. Ready for checkpointed execution.`);
  };

  const populateDocument = (scenario) => {
    setText('#doc-content-pane h1', scenario.document);
    const headings = document.querySelectorAll('#doc-content-pane h2');
    ['1. Decision Context', '2. Evidence, Guardrails & Metrics', '3. Human Authority & Next Action'].forEach((title, index) => { if (headings[index]) headings[index].textContent = title; });
    const bodyCopy = document.querySelectorAll('#doc-content-pane p');
    if (bodyCopy[0]) bodyCopy[0].childNodes[0].textContent = `${scenario.trigger} Ahi coordinates the relevant agents and evidence into one reviewable decision brief. `;
    if (bodyCopy[1]) bodyCopy[1].childNodes[0].textContent = `${scenario.checkpoint} The system preserves sources, assumptions, and the exact state required to resume. `;
    setText('#thread-t1 div:last-child', `Can we prove every recommendation against ${scenario.knowledge[0]} and ${scenario.knowledge[1]}?`);
    setText('#thread-t1-reply div:last-child', `Yes. The draft contains source-level citations and marks every unresolved assumption for review.`);
    setText('#thread-t3 div:last-child', `${scenario.checkpoint} @ahi, hold the final action until I approve.`);
  };

  const populateLibrary = (scenario) => {
    const titles = document.querySelectorAll('.doc-card .doc-body > div[style*="font-weight:700"]');
    scenario.knowledge.forEach((title, index) => { if (titles[index]) titles[index].textContent = title; });
    const search = document.getElementById('lib-search');
    if (search) search.placeholder = `Search ${scenario.label.toLowerCase()} knowledge and cited evidence...`;
    setText('.page-container .card h3', `Suggested actions for ${scenario.document}`);
  };

  const populateChat = (scenario) => {
    setText('#active-channel-name', `# ${scenario.channel}`);
    const channelLabels = document.querySelectorAll('.channels-panel .channel-item span:first-child');
    [`# ${scenario.channel}`, '# approvals', '# evidence-review', '# operations-lead'].forEach((label, index) => { if (channelLabels[index]) channelLabels[index].textContent = label; });
    const messages = document.querySelectorAll('#msg-container .msg-card > div:last-child > div:nth-child(2)');
    if (messages[0]) messages[0].textContent = scenario.message;
    if (messages[1]) messages[1].innerHTML = `<strong>${escapeHtml(scenario.agents[0])} synthesis:</strong><br>${escapeHtml(scenario.agentReply)}`;
    if (messages[2]) messages[2].textContent = `${scenario.owner}: keep the final action behind the recorded approval checkpoint.`;
    const input = document.getElementById('chat-input');
    if (input) input.placeholder = `Message #${scenario.channel} or invoke @ahi...`;
  };

  const populateCode = (scenario) => {
    const fileName = scenario.codeFile;
    const files = document.querySelectorAll('.file-tree-panel [style*="padding:4px 6px"]');
    if (files[0]) files[0].textContent = `▣ ${fileName}`;
    setText('.editor-header span:first-child', `▣ ${fileName}`);
    const code = document.getElementById('code-content');
    if (code) code.innerHTML = `<span style="color:#64748b;"># ${escapeHtml(scenario.codeTask)}</span><br><span style="color:#f43f5e;">from</span> ahi.sandbox <span style="color:#f43f5e;">import</span> ScopedRun<br><br>run = ScopedRun(policy=<span style="color:#a5b4fc;">"${escapeHtml(scenario.id)}-approved"</span>)<br>result = run.execute(<span style="color:#a5b4fc;">"${escapeHtml(fileName)}"</span>)<br><span style="color:#f43f5e;">assert</span> result.evidence_complete<br><span style="color:#60a5fa;">checkpoint</span>(result, owner=<span style="color:#a5b4fc;">"${escapeHtml(scenario.owner)}"</span>)`;
    setText('#terminal-log', `[Sandboxed Runtime] ${fileName} ready. No production write access.\n$ ahi run --checkpoint\nAwaiting scenario simulation...`);
  };

  const populateBrowser = (scenario) => {
    const url = document.getElementById('url-bar');
    if (url) url.value = scenario.browserUrl;
    setText('#current-tab-label', scenario.browserTitle);
    setText('#web-render-area h1', scenario.browserTitle);
    const itemTitles = document.querySelectorAll('#web-render-area [style*="font-weight:700"]');
    scenario.browserItems.forEach((title, index) => { if (itemTitles[index]) itemTitles[index].textContent = title; });
    const timeline = document.querySelectorAll('#agent-timeline > div');
    ['Open approved source', 'Extract relevant evidence', 'Cite into operating context'].forEach((title, index) => { if (timeline[index]?.firstElementChild) timeline[index].firstElementChild.textContent = `Step ${index + 1}: ${title}`; });
  };

  const populateTeamspaces = (scenario) => {
    setText('#doc-editor-view h1', scenario.document);
    const paragraphs = document.querySelectorAll('#doc-editor-view p');
    if (paragraphs[0]) paragraphs[0].innerHTML = `<strong>Context & trigger:</strong><br>${escapeHtml(scenario.trigger)}`;
    if (paragraphs[1]) paragraphs[1].innerHTML = `<strong>Operating decision:</strong><br>${escapeHtml(scenario.checkpoint)} Collaborative state remains reconstructable across every participant.`;
    const taskTitles = document.querySelectorAll('#kanban-view .card > div:first-child');
    scenario.tasks.forEach((task, index) => { if (taskTitles[index]) taskTitles[index].textContent = task; });
  };

  const populateMeetings = (scenario) => {
    setText('#meeting-title', `${scenario.company} decision review`);
    setText('#meeting-objective', scenario.intent);
    const owners = document.querySelectorAll('.meeting-owner');
    scenario.people.slice(0, owners.length).forEach((name, index) => { owners[index].textContent = name; });
  };

  const populateStudio = (scenario) => {
    setText('#studio-project-title', `${scenario.company} product story`);
    setText('#studio-brief', scenario.hook);
  };

  const populatePage = (scenario) => {
    populateSidebar(scenario);
    ({ home: populateHome, ontology: populateOntology, apps: populateApps, 'doc-workspace': populateDocument, library: populateLibrary, chat: populateChat, code: populateCode, browser: populateBrowser, teamspaces: populateTeamspaces, 'meeting-keeper': populateMeetings, studio: populateStudio }[page] || (() => {}))(scenario);
  };

  const injectTelemetry = () => {
    const strip = document.createElement('section');
    strip.className = 'scenario-telemetry';
    strip.dataset.testid = 'ahi-scenario-telemetry';
    strip.innerHTML = (metrics[page] || metrics.home).map(([label, start, end], index) => `<div class="scenario-metric"><span>${escapeHtml(label)}</span><strong data-start="${escapeHtml(start)}" data-end="${escapeHtml(end)}" data-testid="ahi-metric-${index + 1}">${escapeHtml(start)}</strong></div>`).join('');
    const workbar = document.querySelector('.scenario-workbar');
    workbar?.insertAdjacentElement('afterend', strip);
    return strip;
  };

  const injectWorkbar = (scenario) => {
    const spec = actions[page] || actions.home;
    const workbar = document.createElement('section');
    workbar.className = 'scenario-workbar';
    workbar.dataset.testid = 'ahi-scenario-workbar';
    workbar.innerHTML = `<div class="scenario-identity"><span>${escapeHtml(scenario.label)} / ${escapeHtml(scenario.company)}</span><strong>${escapeHtml(spec[0])}</strong></div><div class="scenario-live-copy"><i></i><span data-testid="ahi-scenario-status">Ready — ${escapeHtml(scenario.hook)}</span></div><button type="button" data-testid="ahi-simulate-action-button">Simulate this step <b>→</b></button><div class="scenario-trace" aria-hidden="true"></div>`;
    const topbar = document.querySelector('.top-bar, .topbar, header');
    if (topbar?.parentNode) topbar.insertAdjacentElement('afterend', workbar);
    else document.body.prepend(workbar);
    const button = workbar.querySelector('button');
    const status = workbar.querySelector('[data-testid="ahi-scenario-status"]');
    const telemetry = injectTelemetry();
    const run = () => {
      if (button.disabled) return;
      button.disabled = true;
      workbar.classList.add('is-running');
      telemetry?.classList.add('is-running');
      let step = 1;
      status.textContent = spec[step];
      const interval = window.setInterval(() => {
        step += 1;
        if (step < spec.length) {
          status.textContent = spec[step];
          return;
        }
        window.clearInterval(interval);
        workbar.classList.remove('is-running');
        workbar.classList.add('is-complete');
        telemetry?.classList.remove('is-running');
        telemetry?.classList.add('is-complete');
        telemetry?.querySelectorAll('strong').forEach((metric, index) => window.setTimeout(() => { metric.textContent = metric.dataset.end; }, index * 90));
        status.textContent = `Complete — ${scenario.outcome}`;
        button.innerHTML = 'Simulation complete <b>✓</b>';
        if (page === 'code') setText('#terminal-log', `[Sandboxed Runtime] Policy validated.\n✔ ${scenario.codeTask}\n✔ Evidence persisted\n⏸ ${scenario.checkpoint}`);
      }, 780);
    };
    button.addEventListener('click', run);
    if (autoplay) window.setTimeout(run, 550);
  };

  let scenarioApplied = false;

  const applyScenario = (scenario) => {
      if (scenarioApplied || !scenario || !scenario.agents) return;
      scenarioApplied = true;
      populatePage(scenario);
      replaceFallbackPeople(scenario);
      injectWorkbar(scenario);
      document.querySelectorAll('a[href$=".html"]').forEach((link) => {
        const url = new URL(link.href, window.location.href);
        url.searchParams.set('scenario', scenario.id);
        link.href = url.toString();
      });
      document.querySelectorAll('[onclick*="location.href"]').forEach((element) => {
        const handler = element.getAttribute('onclick');
        if (!handler || handler.includes('scenario=')) return;
        element.setAttribute('onclick', handler.replace(/(location\.href=')([^']+\.html)'/g, `$1$2?scenario=${encodeURIComponent(scenario.id)}'`));
      });
  };

  const initializeScenario = async () => {
    let savedMotion = 'cinematic';
    try { savedMotion = localStorage.getItem('acoord-motion') || savedMotion; } catch { /* Strict sandbox: motion arrives from parent. */ }
    document.documentElement.dataset.motion = savedMotion;
    document.documentElement.dataset.scenario = scenarioId;
    document.documentElement.dataset.lens = params.get('lens') || 'workspace';
    window.addEventListener('message', (event) => {
      if (event.source !== window.parent || event.data?.type !== 'ahi:scenario') return;
      if (event.data.motion) document.documentElement.dataset.motion = event.data.motion;
      applyScenario(event.data.scenario);
    });

    if (window.origin === 'null') return;
    try {
      const response = await fetch(new URL('../scenarios.json', window.location.href));
      const scenarios = await response.json();
      applyScenario(scenarios.find((item) => item.id === scenarioId) || scenarios[0]);
    } catch (error) {
      console.warn('Scenario data unavailable', error);
    }
  };

  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', initializeScenario);
  else initializeScenario();
})();