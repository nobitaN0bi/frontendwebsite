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
  };

  const populateHome = (scenario) => {
    setText('.page-container h1', `${scenario.company} command center`);
    setText('.page-container h1 + p', `One operating context · ${scenario.agents.length} active specialists · human authority preserved`);
    const search = document.getElementById('home-search');
    if (search) search.placeholder = scenario.intent;
    const recentTitles = document.querySelectorAll('.recent-item > div > div > div:first-child');
    [scenario.document, scenario.tasks[3], scenario.workflow].forEach((title, index) => { if (recentTitles[index]) recentTitles[index].textContent = title; });
    const names = document.querySelectorAll('.page-container span[style*="font-weight: 600"]');
    [...scenario.people, ...scenario.agents.slice(0, 3)].forEach((name, index) => { if (names[index]) names[index].textContent = name; });
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

  const populatePage = (scenario) => {
    populateSidebar(scenario);
    ({ home: populateHome, ontology: populateOntology, apps: populateApps, 'doc-workspace': populateDocument, library: populateLibrary, chat: populateChat, code: populateCode, browser: populateBrowser, teamspaces: populateTeamspaces }[page] || (() => {}))(scenario);
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
    const run = () => {
      if (button.disabled) return;
      button.disabled = true;
      workbar.classList.add('is-running');
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