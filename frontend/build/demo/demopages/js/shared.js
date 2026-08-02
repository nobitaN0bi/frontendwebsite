/* ==========================================================================
   AHI Desktop Shared Shell JavaScript
   Handles theme toggling, User Account & Settings footer widget,
   Teamspaces tree navigation, Command Palette (⌘K), and Settings Modal.
   ========================================================================== */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'workspace';
    const selectors = 'button, a, input, select, textarea, h1, h2, h3, [role], .badge';
    document.querySelectorAll(selectors).forEach((element, index) => {
      if (!element.dataset.testid) element.dataset.testid = `ahi-${page}-element-${index + 1}`;
    });
  });

  // Theme Management
  const currentTheme = localStorage.getItem('ahi-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  window.toggleTheme = function () {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ahi-theme', theme);
  };

  // Global Command Palette (⌘K)
  window.toggleCommandPalette = function () {
    const palette = document.getElementById('command-palette-modal');
    if (palette) {
      palette.classList.toggle('open');
      if (palette.classList.contains('open')) {
        const input = palette.querySelector('.cmd-input');
        if (input) input.focus();
      }
    }
  };

  // Global Settings Modal
  window.toggleSettingsModal = function () {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.classList.toggle('open');
    }
  };

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      window.toggleCommandPalette();
    }
    if (e.key === 'Escape') {
      const palette = document.getElementById('command-palette-modal');
      if (palette && palette.classList.contains('open')) palette.classList.remove('open');
      const settings = document.getElementById('settings-modal');
      if (settings && settings.classList.contains('open')) settings.classList.remove('open');
    }
  });

  // Teamspace Tree Node Expansion
  window.toggleTreeNode = function (element, event) {
    if (event) event.stopPropagation();
    const parent = element.closest('.tree-item-wrapper');
    if (!parent) return;
    const arrow = parent.querySelector('.tree-arrow');
    const children = parent.querySelector('.tree-children');
    if (arrow && children) {
      arrow.classList.toggle('expanded');
      children.style.display = children.style.display === 'none' ? 'flex' : 'none';
    }
  };

  // Build Unified Sidebar HTML
  window.renderAHISidebar = function (activeTabId) {
    const navItems = [
      { id: 'home', label: 'Home', icon: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`, href: 'home.html' },
      { id: 'library', label: 'Library', icon: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`, href: 'library.html' },
      { id: 'chat', label: 'Chat', icon: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`, href: 'chat.html', badge: '3' },
      { id: 'apps', label: 'Apps', icon: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>`, href: 'apps.html' },
      { id: 'code', label: 'Code', icon: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`, href: 'code.html' },
      { id: 'browser', label: 'Browser', icon: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>`, href: 'browser.html' },
      { id: 'teamspaces', label: 'Teamspaces', icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 1-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`, href: 'teamspaces.html' },
      { id: 'ontology', label: 'Ontology', icon: `<path d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5"/>`, href: 'ontology.html' }
    ];

    return `
      <aside class="app-sidebar">
        <div class="sidebar-header">
          <a href="../demo.html" class="brand-logo" title="AHI Desktop Landing Visual">
            <div class="logo-badge">A</div>
            <span>AHI Desktop</span>
          </a>
          <button class="theme-toggle-btn" onclick="window.toggleTheme()" title="Toggle Dark/Light Mode">
            <div class="theme-toggle-slider"></div>
          </button>
        </div>

        <div class="sidebar-nav">
          <div>
            <div class="sidebar-section-title">WORKSPACE</div>
            <ul class="sidebar-menu">
              ${navItems.map(item => `
                <li>
                  <a href="${item.href}" class="sidebar-item ${activeTabId === item.id ? 'active' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${item.icon}</svg>
                    <span style="flex:1;">${item.label}</span>
                    ${item.badge ? `<span class="badge badge-primary">${item.badge}</span>` : ''}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Teamspaces Navigation Tree -->
          <div style="margin-top: 14px;">
            <div class="sidebar-section-title">TEAMSPACES</div>
            <div class="teamspace-tree">
              <div class="tree-item-wrapper">
                <div class="tree-node ${activeTabId === 'teamspaces' ? 'active' : ''}" onclick="window.toggleTreeNode(this, event)">
                  <svg class="tree-arrow expanded" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                  <span>🏢</span>
                  <span style="flex:1; font-weight:600;">Core Engineering</span>
                </div>
                <div class="tree-children" style="display: flex;">
                  <div class="tree-node" onclick="location.href='doc-workspace.html'">
                    <span>📄</span> <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">ADR Records</span>
                  </div>
                  <div class="tree-node" onclick="location.href='teamspaces.html'">
                    <span>🗃️</span> <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Sprint Tracker</span>
                  </div>
                  <div class="tree-node" onclick="location.href='ontology.html'">
                    <span>🧠</span> <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">Knowledge Graph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Account & Settings Footer Widget -->
        <div class="sidebar-account-footer">
          <div class="account-profile" onclick="window.toggleSettingsModal()">
            <div class="avatar-badge">JD</div>
            <div class="account-info">
              <span class="account-name">Jane Doe</span>
              <span class="account-role">Lead Engineer</span>
            </div>
          </div>
          <button class="btn-icon" onclick="window.toggleSettingsModal()" title="Account & Settings">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>
      </aside>
    `;
  };

  // Render Command Palette & Settings Modals
  window.renderCommandPaletteModal = function () {
    return `
      <!-- Command Palette Modal -->
      <div id="command-palette-modal" class="modal-backdrop" onclick="if(event.target === this) window.toggleCommandPalette()">
        <div class="cmd-palette" onclick="event.stopPropagation()">
          <div class="cmd-input-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input class="cmd-input" placeholder="Magic that you can trust..." onkeyup="window.filterCmdList(this.value)"/>
          </div>
          <ul class="cmd-list" id="cmd-list-items">
            <li class="cmd-item" onclick="location.href='home.html'"><span style="display:flex; align-items:center; gap:8px;">🏠 <strong>Home Tab</strong></span><span class="badge badge-primary">⌘1</span></li>
            <li class="cmd-item" onclick="location.href='library.html'"><span style="display:flex; align-items:center; gap:8px;">📚 <strong>Library Tab</strong></span><span class="badge badge-primary">⌘2</span></li>
            <li class="cmd-item" onclick="location.href='chat.html'"><span style="display:flex; align-items:center; gap:8px;">💬 <strong>Chat Tab</strong></span><span class="badge badge-primary">⌘3</span></li>
            <li class="cmd-item" onclick="location.href='apps.html'"><span style="display:flex; align-items:center; gap:8px;">⚡ <strong>Apps Tab</strong></span><span class="badge badge-primary">⌘4</span></li>
            <li class="cmd-item" onclick="location.href='code.html'"><span style="display:flex; align-items:center; gap:8px;">💻 <strong>Code</strong></span><span class="badge badge-primary">⌘5</span></li>
            <li class="cmd-item" onclick="location.href='browser.html'"><span style="display:flex; align-items:center; gap:8px;">🌐 <strong>Browser</strong></span><span class="badge badge-primary">⌘6</span></li>
            <li class="cmd-item" onclick="location.href='teamspaces.html'"><span style="display:flex; align-items:center; gap:8px;">🏢 <strong>Teamspaces</strong></span><span class="badge badge-primary">⌘7</span></li>
            <li class="cmd-item" onclick="location.href='ontology.html'"><span style="display:flex; align-items:center; gap:8px;">🧠 <strong>Ontology</strong></span><span class="badge badge-success">Graph</span></li>
          </ul>
        </div>
      </div>

      <!-- Account & Settings Modal -->
      <div id="settings-modal" class="modal-backdrop" onclick="if(event.target === this) window.toggleSettingsModal()">
        <div class="cmd-palette" style="max-width: 520px; padding: 24px;" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="avatar-badge" style="width:40px; height:40px; font-size:1rem;">JD</div>
              <div>
                <h3 style="font-size:1.1rem; font-weight:800;">Jane Doe</h3>
                <p style="font-size:0.8rem; color:var(--text-tertiary);">jane.doe@ahi-operating.platform · Lead Engineer</p>
              </div>
            </div>
            <button class="btn btn-icon" onclick="window.toggleSettingsModal()">✕</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:16px; font-size:0.88rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-surface-elevated); border-radius:var(--radius-md);">
              <div>
                <div style="font-weight:700;">Appearance & Theme</div>
                <div style="font-size:0.75rem; color:var(--text-tertiary);">Switch between Obsidian Dark and Crisp Light</div>
              </div>
              <button class="btn btn-secondary" onclick="window.toggleTheme()">Toggle Theme</button>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-surface-elevated); border-radius:var(--radius-md);">
              <div>
                <div style="font-weight:700;">Active Orchestration Engine</div>
                <div style="font-size:0.75rem; color:var(--text-tertiary);">Super-Agent Subagent Runtime</div>
              </div>
              <span class="badge badge-primary">Active</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.filterCmdList = function(query) {
    const list = document.getElementById('cmd-list-items');
    if (!list) return;
    const items = list.querySelectorAll('.cmd-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query.toLowerCase()) ? 'flex' : 'none';
    });
  };
})();
