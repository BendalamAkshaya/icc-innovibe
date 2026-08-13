/**
 * InnoVibe Mobility CTO Portal - Core Application Logic & View Engine (cto2.mp4 Software Development Rebuild)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- ELEMENTS CACHE ---
  const sidebar = document.getElementById('sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const toggleIcon = document.getElementById('toggleIcon');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  const headerPageTitle = document.getElementById('headerPageTitle');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  
  const globalSearchBar = document.getElementById('globalSearchBar');
  const sidebarSearchBtn = document.getElementById('sidebarSearchBtn');
  const searchModalOverlay = document.getElementById('searchModalOverlay');
  const paletteInput = document.getElementById('paletteInput');
  const paletteResults = document.getElementById('paletteResults');
  
  const headerNotificationBtn = document.getElementById('headerNotificationBtn');
  const notificationDot = document.getElementById('notificationDot');
  const notificationDropdown = document.getElementById('notificationDropdown');
  const notificationDropdownList = document.getElementById('notificationDropdownList');
  const notificationCountBadge = document.getElementById('notificationCountBadge');
  const clearAllNotificationsBtn = document.getElementById('clearAllNotificationsBtn');
  
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerPanel = document.getElementById('drawerPanel');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerBody = document.getElementById('drawerBody');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  
  const mainContent = document.getElementById('mainContent');
  const viewDashboard = document.getElementById('view-dashboard');
  const viewSubpage = document.getElementById('view-subpage');

  // --- APPLICATION STATE ---
  let currentTheme = localStorage.getItem('portal-theme') || 'light';
  let isSidebarCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';

  // --- UNIVERSAL EXECUTIVE KPI POPOVER / MODAL GENERATOR ---
  window.createExecPopoverHTML = function(opts = {}) {
    const {
      status = 'Optimal',
      statusColor = 'success',
      situation = 'Operating within optimal executive baseline parameters.',
      businessImpact = 'Sustains 99.98% platform SLA uptime and zero customer impact.',
      aiRecommendation = 'Maintain current automated monitoring and health protocol.',
      recommendedAction = 'Inspect Domain',
      relatedModule = 'CTO Portal',
      relatedRoute = ''
    } = opts;

    const escapeAttr = (str) => String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n/g, ' ');

    return `
      <button type="button" class="kpi-info-btn exec-insight-trigger" title="View Executive Insight"
        data-status="${escapeAttr(status)}"
        data-status-color="${escapeAttr(statusColor)}"
        data-situation="${escapeAttr(situation)}"
        data-impact="${escapeAttr(businessImpact)}"
        data-recommendation="${escapeAttr(aiRecommendation)}"
        data-action="${escapeAttr(recommendedAction)}"
        data-module="${escapeAttr(relatedModule)}"
        data-route="${escapeAttr(relatedRoute)}"
      >
        <i class="fa-solid fa-circle-info"></i>
      </button>
    `;
  };

  // --- EXECUTIVE INSIGHT MODAL HANDLER ---
  (function initExecInsightModalHandler() {
    let modalEl = document.getElementById('exec-insight-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'exec-insight-modal';
      modalEl.className = 'exec-modal-overlay';
      modalEl.onclick = function(e) {
        if (e.target === modalEl) window.closeExecInsightModal();
      };
      document.body.appendChild(modalEl);
    }

    window.openExecInsightModal = function(opts = {}) {
      const {
        status = 'Optimal',
        statusColor = 'success',
        situation = 'Operating within optimal baseline parameters.',
        businessImpact = 'Sustains 99.98% platform SLA uptime.',
        aiRecommendation = 'Maintain automated monitoring.',
        recommendedAction = 'Inspect Domain',
        relatedModule = 'CTO Portal',
        relatedRoute = ''
      } = opts;

      modalEl.innerHTML = `
        <div class="exec-modal-card" onclick="event.stopPropagation()">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 12px;">
            <span style="font-weight: 800; color: var(--text-primary); font-size: 0.90rem; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-chart-line" style="color: #2563EB; font-size: 1.0rem;"></i> Executive Insight
            </span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge badge-${statusColor}" style="font-size: 0.65rem; padding: 2px 8px;">${status}</span>
              <button type="button" onclick="window.closeExecInsightModal()" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: var(--text-muted); padding: 0 4px; line-height: 1;">&times;</button>
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <span style="font-weight: 700; color: var(--text-muted); font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.04em;">Situation</span>
            <div style="color: var(--text-primary); font-size: 0.78rem; font-weight: 500; line-height: 1.4; margin-top: 2px;">${situation}</div>
          </div>

          <div style="margin-bottom: 10px;">
            <span style="font-weight: 700; color: #2563EB; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.04em;">Business Impact</span>
            <div style="color: var(--text-secondary); font-size: 0.78rem; line-height: 1.4; margin-top: 2px;">${businessImpact}</div>
          </div>

          <div style="margin-bottom: 10px;">
            <span style="font-weight: 700; color: #10B981; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.04em;">AI Recommendation</span>
            <div style="color: var(--text-secondary); font-size: 0.78rem; line-height: 1.4; margin-top: 2px;">${aiRecommendation}</div>
          </div>

          <div style="margin-bottom: 12px;">
            <span style="font-weight: 700; color: #8B5CF6; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.04em;">CTO Action</span>
            <div style="color: var(--text-primary); font-size: 0.78rem; font-weight: 600; line-height: 1.4; margin-top: 2px;">${recommendedAction}</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-color); padding-top: 10px; margin-top: 10px; font-size: 0.75rem; color: var(--text-muted);">
            <span>Related Module: <strong style="color: var(--text-primary);">${relatedModule}</strong></span>
            ${relatedRoute ? `<button class="btn btn-primary btn-sm" onclick="window.closeExecInsightModal(); window.switchRoute('${relatedRoute}')" style="padding: 3px 10px; font-size: 0.70rem;">Open Module &rarr;</button>` : ''}
          </div>
        </div>
      `;

      modalEl.classList.add('active');
    };

    window.closeExecInsightModal = function(e) {
      if (e) e.stopPropagation();
      modalEl.classList.remove('active');
    };

    // Global Event Delegation for clicking any info button or trigger element
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.kpi-info-btn, .exec-insight-trigger');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();

        const card = btn.closest('.has-exec-popover') || btn.parentElement;
        const dataEl = card ? card.querySelector('.exec-popover-data') : null;

        const status = btn.getAttribute('data-status') || (dataEl && dataEl.getAttribute('data-status')) || (card && card.getAttribute('data-popover-status')) || 'Optimal';
        const statusColor = btn.getAttribute('data-status-color') || (dataEl && dataEl.getAttribute('data-status-color')) || (card && card.getAttribute('data-popover-status-color')) || (status.includes('Attention') || status.includes('Warning') ? 'warning' : 'success');
        const situation = btn.getAttribute('data-situation') || (dataEl && dataEl.getAttribute('data-situation')) || (card && card.getAttribute('data-popover-situation')) || 'Operating within optimal executive baseline parameters.';
        const businessImpact = btn.getAttribute('data-impact') || (dataEl && dataEl.getAttribute('data-impact')) || (card && card.getAttribute('data-popover-impact')) || 'Sustains 99.98% platform SLA uptime and zero customer impact.';
        const aiRecommendation = btn.getAttribute('data-recommendation') || (dataEl && dataEl.getAttribute('data-recommendation')) || (card && card.getAttribute('data-popover-recommendation')) || 'Maintain current automated monitoring and health protocol.';
        const recommendedAction = btn.getAttribute('data-action') || (dataEl && dataEl.getAttribute('data-action')) || (card && card.getAttribute('data-popover-action')) || 'Inspect Domain';
        const relatedModule = btn.getAttribute('data-module') || (dataEl && dataEl.getAttribute('data-module')) || (card && card.getAttribute('data-popover-module')) || 'CTO Portal';
        const relatedRoute = btn.getAttribute('data-route') || (dataEl && dataEl.getAttribute('data-route')) || (card && card.getAttribute('data-popover-route')) || '';

        window.openExecInsightModal({
          status,
          statusColor,
          situation,
          businessImpact,
          aiRecommendation,
          recommendedAction,
          relatedModule,
          relatedRoute
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('active')) {
        window.closeExecInsightModal();
      }
    });
  })();


  // --- INITIALIZATION ---
  initTheme();
  initSidebar();
  initNotifications();
  window.switchRoute = switchRoute;
  window.renderModuleSubpage = renderModuleSubpage;
  setupEventListeners();
  
  // Default load: Dashboard
  renderDashboard();

  // --- THEME MANAGEMENT ---
  function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
  }

  function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portal-theme', currentTheme);
    updateThemeIcon();
    // Redraw components to fit theme styles
    if (viewDashboard.classList.contains('active')) {
      renderDashboard();
    } else {
      const activeNav = document.querySelector('.nav-item.active');
      if (activeNav) {
        const viewId = activeNav.getAttribute('data-view');
        const targetModule = window.portalData.modules.find(m => m.id === viewId);
        if (targetModule) renderModuleSubpage(targetModule);
      }
    }
  }

  function updateThemeIcon() {
    if (currentTheme === 'dark') {
      themeToggleIcon.className = 'fa-regular fa-sun';
    } else {
      themeToggleIcon.className = 'fa-regular fa-moon';
    }
  }

  // --- SIDEBAR COLLAPSE MANAGEMENT ---
  function initSidebar() {
    if (isSidebarCollapsed) {
      sidebar.classList.add('collapsed');
      toggleIcon.className = 'fa-solid fa-chevron-right';
    } else {
      sidebar.classList.remove('collapsed');
      toggleIcon.className = 'fa-solid fa-chevron-left';
    }
  }

  function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
    sidebar.classList.toggle('collapsed', isSidebarCollapsed);
    localStorage.setItem('sidebar-collapsed', isSidebarCollapsed);
    
    if (isSidebarCollapsed) {
      toggleIcon.className = 'fa-solid fa-chevron-right';
    } else {
      toggleIcon.className = 'fa-solid fa-chevron-left';
    }

    // Trigger chart resize if active
    setTimeout(() => {
      if (viewDashboard.classList.contains('active')) {
        if (window.portalCharts && typeof window.portalCharts.initDashboardCharts === 'function') { window.portalCharts.initDashboardCharts(); }
      }
    }, 300);
  }

  // --- NOTIFICATION ENGINE ---
  function initNotifications() {
    const unread = window.portalData.notifications.filter(n => !n.read);
    
    // Toggle dot
    if (unread.length > 0) {
      notificationDot.style.display = 'block';
      notificationCountBadge.textContent = `${unread.length} New`;
      notificationCountBadge.style.display = 'inline-flex';
    } else {
      notificationDot.style.display = 'none';
      notificationCountBadge.style.display = 'none';
    }

    // Populate dropdown list
    notificationDropdownList.innerHTML = window.portalData.notifications.map(n => `
      <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
        <div class="notification-item-icon" style="background-color: var(--color-${n.type === 'critical' ? 'red' : n.type === 'warning' ? 'orange' : 'green'})">
          <i class="fa-solid ${n.type === 'critical' ? 'fa-triangle-exclamation' : n.type === 'warning' ? 'fa-circle-exclamation' : 'fa-check'}"></i>
        </div>
        <div class="notification-item-content">
          <div class="notification-item-text"><strong>${n.title}</strong>: ${n.desc}</div>
          <div class="notification-item-time">${n.time}</div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to read notifications
    document.querySelectorAll('.notification-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        markAsRead(id);
      });
    });
  }

  function markAsRead(id) {
    const notif = window.portalData.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      initNotifications();
    }
  }

  function clearAllNotifications() {
    window.portalData.notifications.forEach(n => n.read = true);
    initNotifications();
  }

  // --- COMMAND PALETTE / GLOBAL SEARCH ---
  function openSearchModal() {
    searchModalOverlay.classList.add('active');
    paletteInput.value = '';
    paletteInput.focus();
    renderSearchResults('');
  }

  function closeSearchModal() {
    searchModalOverlay.classList.remove('active');
  }

  function renderSearchResults(query) {
    const results = window.portalData.modules.filter(m => 
      m.name.toLowerCase().includes(query.toLowerCase()) || 
      m.desc.toLowerCase().includes(query.toLowerCase()) ||
      m.group.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
      paletteResults.innerHTML = `<div class="palette-item" style="color: var(--text-muted); justify-content: center;">No matches found.</div>`;
      return;
    }

    paletteResults.innerHTML = results.map(m => `
      <div class="palette-item" data-view="${m.id}">
        <i class="fa-solid ${m.icon}"></i>
        <div class="palette-item-text">
          <span class="palette-item-title">${m.name}</span>
          <span class="palette-item-subtitle">${m.group} &bull; ${m.desc.substring(0, 70)}...</span>
        </div>
      </div>
    `).join('');

    // Attach click triggers to search items
    paletteResults.querySelectorAll('.palette-item').forEach(item => {
      item.addEventListener('click', () => {
        const viewId = item.getAttribute('data-view');
        switchRoute(viewId);
        closeSearchModal();
      });
    });
  }

  // --- PROJECT DETAILS IN-DEPTH DRAWER (cto2.mp4 Slide 00:08) ---
  window.openProjectDrawer = function(projId) {
    const details = window.portalData.projectDrawerData[projId];
    if (!details) return;

    drawerTitle.innerHTML = `Project Details: ${details.name} <span class="badge badge-${details.status === 'Healthy' ? 'success' : details.status === 'Needs Attention' ? 'warning' : 'danger'}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${details.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Team Ownership -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-users" style="color: var(--color-blue); font-size: 0.85rem;"></i> Team Ownership</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Engineering Lead:</strong> ${details.lead}</div>
            <div><strong style="color: var(--text-primary);">Assigned Teams:</strong> ${details.teams}</div>
            <div><strong style="color: var(--text-primary);">Team Size:</strong> ${details.teamSize}</div>
          </div>
        </div>

        <!-- Technical Architecture -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-sitemap" style="color: var(--color-purple); font-size: 0.85rem;"></i> Technical Architecture</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Frontend:</strong> ${details.arch.frontend}</div>
            <div><strong style="color: var(--text-primary);">Backend:</strong> ${details.arch.backend}</div>
            <div><strong style="color: var(--text-primary);">Database:</strong> ${details.arch.database}</div>
            <div><strong style="color: var(--text-primary);">Cloud:</strong> ${details.arch.cloud}</div>
            <div><strong style="color: var(--text-primary);">External Integrations:</strong> ${details.arch.integrations}</div>
          </div>
        </div>

        <!-- Development Health -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-heart-pulse" style="color: var(--color-green); font-size: 0.85rem;"></i> Development Health</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: flex; flex-direction: column; gap: 6px; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between;">
              <span style="font-weight: 600; color: var(--text-primary);">Delivery Status:</span>
              <strong style="color: var(--color-green);">${details.devHealth.delivery}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="font-weight: 600; color: var(--text-primary);">Code Quality Score:</span>
              <strong>${details.devHealth.quality}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="font-weight: 600; color: var(--text-primary);">Deployment Stability:</span>
              <strong>${details.devHealth.stability}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="font-weight: 600; color: var(--text-primary);">System Reliability:</span>
              <strong>${details.devHealth.reliability}</strong>
            </div>
          </div>
        </div>

        <!-- Technical Risk Assessment -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px; color: var(--color-red); font-size: 0.85rem;"><i class="fa-solid fa-triangle-exclamation"></i> Technical Risk Assessment</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: flex; flex-direction: column; gap: 6px; color: var(--text-secondary);">
            <div><strong style="color: var(--text-primary);">Risk:</strong> ${details.risks.risk}</div>
            <div><strong style="color: var(--text-primary);">Impact:</strong> ${details.risks.impact}</div>
            <div style="background-color: var(--bg-input); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); margin-top: 4px; color: var(--text-primary); line-height: 1.35;">
              💡 <strong>Recommendation:</strong> ${details.risks.recommendation}
            </div>
          </div>
        </div>

        <!-- Recent Engineering Activity -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-timeline" style="color: var(--color-blue); font-size: 0.85rem;"></i> Recent Engineering Activity</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px; padding-left: 8px; border-left: 2px solid var(--border-color);">
            <div>&bull; ${details.activity.deploy}</div>
            <div>&bull; ${details.activity.code}</div>
            <div>&bull; ${details.activity.system}</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="alert('CTO DIRECTION: Milestone checklist verification validated.')">Verify Milestone</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  function closeDrawer() {
    drawerOverlay.classList.remove('active');
  }
  window.closeDrawer = closeDrawer;

  // --- EVENT LISTENERS BINDING ---
  function setupEventListeners() {
    // Sidebar collapse
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
    
    // Mobile toggle
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-active');
    });

    // Outside click mobile sidebar close
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('mobile-active') && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-active');
      }
    });

    // Theme toggle
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

    // Dropdown notification toggle
    if (headerNotificationBtn) headerNotificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
      notificationDropdown.classList.remove('active');
    });

    if (notificationDropdown) notificationDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    if (clearAllNotificationsBtn) clearAllNotificationsBtn.addEventListener('click', clearAllNotifications);

    // Search command modal toggles
    if (globalSearchBar) globalSearchBar.addEventListener('click', openSearchModal);
    if (sidebarSearchBtn) sidebarSearchBtn.addEventListener('click', openSearchModal);
    
    if (searchModalOverlay) searchModalOverlay.addEventListener('click', (e) => {
      if (e.target === searchModalOverlay) closeSearchModal();
    });

    if (paletteInput) paletteInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });

    // Hotkey bindings: Ctrl+K and Esc
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeSearchModal();
        closeDrawer();
      }
    });

    // Details drawer closure
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeDrawer();
    });

    
    // User Profile & Logout Dropdown Toggle
    const userProfileDropdownTrigger = document.getElementById('userProfileDropdownTrigger');
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const portalLogoutBtn = document.getElementById('portalLogoutBtn');

    if (userProfileDropdownTrigger && userProfileDropdown) {
      userProfileDropdownTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = userProfileDropdown.style.display === 'block';
        userProfileDropdown.style.display = isVisible ? 'none' : 'block';
      });

      document.addEventListener('click', (e) => {
        if (!userProfileDropdown.contains(e.target) && !userProfileDropdownTrigger.contains(e.target)) {
          userProfileDropdown.style.display = 'none';
        }
      });
    }

    if (portalLogoutBtn) {
      portalLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to log out of InnoVibe CTO Portal?')) {
          localStorage.removeItem('portal-theme');
          alert('Logged out successfully. Executive session closed.');
          if (window.location.pathname.includes('/dashboard')) {
            window.location.href = '/auth/login';
          } else {
            window.location.reload();
          }
        }
      });
    }

    // Sidebar navigation clicks
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = item.getAttribute('data-view');
        switchRoute(viewId);
        // Close mobile drawer if open
        sidebar.classList.remove('mobile-active');
      });
    });
  }

  // --- ROUTING ENGINE / VIEW SWITCHER ---
  function switchRoute(viewId) {
    window.switchRoute = switchRoute;
    // Set active class in sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Fetch view details from data.js definition
    const targetModule = window.portalData.modules.find(m => m.id === viewId);
    if (!targetModule) return;

    // Update Header Text
    headerPageTitle.innerHTML = `${targetModule.name} <span class="badge badge-grey" style="font-weight: 600; text-transform: none; font-size: 0.72rem; padding: 3px 8px; margin-left: 8px; display: inline-block; vertical-align: middle;">InnoVibe Mobility Office Portal</span>`;

    if (viewId === 'dashboard') {
      viewDashboard.classList.add('active');
      viewSubpage.classList.remove('active');
      renderDashboard();
    } else {
      viewDashboard.classList.remove('active');
      viewSubpage.classList.add('active');
      renderModuleSubpage(targetModule);
    }
  }
  // Expose switchRoute globally for navigation shortcuts in workspace subpages
  window.switchRoute = switchRoute;

  // --- TECHNOLOGY DASHBOARD RENDERING (EXECUTIVE OPERATING SYSTEM) ---
  function renderDashboard() {
    const data = window.portalData.technologyDashboard;
    
    // Smooth Bezier SVG sparklines helper with subtle gradient fill
    const getSmoothSparkline = (color, id) => {
      const strokeColor = color === 'green' ? '#34c759' : color === 'purple' ? '#af52de' : color === 'orange' ? '#ff9500' : '#007aff';
      const gradId = `spark-grad-${id}`;
      return `
        <svg width="64" height="20" viewBox="0 0 64 20" fill="none" style="overflow: visible;">
          <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.30"/>
              <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <path d="M 2,15 C 12,15 18,17 26,11 C 34,5 42,12 50,7 C 56,3 60,3 62,2 L 62,20 L 2,20 Z" fill="url(#${gradId})"/>
          <path d="M 2,15 C 12,15 18,17 26,11 C 34,5 42,12 50,7 C 56,3 60,3 62,2" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="62" cy="2" r="2.5" fill="${strokeColor}"/>
        </svg>
      `;
    };

    const categories = [
      { name: 'Connected Mobility', icon: 'fa-car-side', color: 'blue', kpis: data.kpis.filter(k => k.category === 'Connected Mobility') },
      { name: 'Artificial Intelligence', icon: 'fa-brain', color: 'purple', kpis: data.kpis.filter(k => k.category === 'Artificial Intelligence') },
      { name: 'Engineering', icon: 'fa-code-commit', color: 'blue', kpis: data.kpis.filter(k => k.category === 'Engineering') },
      { name: 'Platform', icon: 'fa-server', color: 'green', kpis: data.kpis.filter(k => k.category === 'Platform') },
      { name: 'Business', icon: 'fa-chart-line', color: 'green', kpis: data.kpis.filter(k => k.category === 'Business') }
    ];

    viewDashboard.innerHTML = `
      <!-- CSS STYLES FOR TECHNOLOGY DASHBOARD EXECUTIVE OS -->
      <style>
        .tech-exec-toolbar {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 0.85rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 1.25rem;
        }
        .tech-matrix-5col {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        @media (max-width: 1200px) {
          .tech-matrix-5col { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 800px) {
          .tech-matrix-5col { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 550px) {
          .tech-matrix-5col { grid-template-columns: 1fr; }
        }
        .tech-domain-col {
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tech-micro-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
          position: relative;
        }
        .tech-micro-item:hover {
          transform: translateY(-1px);
          border-color: var(--color-blue);
          box-shadow: var(--shadow-sm);
        }
        .tech-kpi-tab {
          padding: 5px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .tech-kpi-tab:hover, .tech-kpi-tab.active {
          background-color: var(--color-blue);
          color: #ffffff;
          border-color: var(--color-blue);
        }
        .release-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) { .release-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .release-grid { grid-template-columns: 1fr; } }
        .eng-teams-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 1100px) { .eng-teams-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .eng-teams-grid { grid-template-columns: 1fr; } }
        .tech-timeline-item {
          display: flex;
          gap: 12px;
          padding-bottom: 12px;
          position: relative;
        }
        .tech-timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 38px;
          top: 24px;
          bottom: 0;
          width: 2px;
          background-color: var(--border-color);
        }
        .tech-kpi-card-compact .tech-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .tech-kpi-card-compact:hover .tech-kpi-info-wrapper {
          max-min-height: 100px; height: auto;
          opacity: 1;
          margin-top: 6px;
        }
        .tech-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.05);
          border-left: 3px solid var(--color-blue);
          padding: 4px 6px;
          font-size: 0.66rem;
          color: var(--text-secondary);
          line-height: 1.25;
        }
      </style>

      <!-- PAGE HEADER TOOLBAR -->
      <div class="tech-exec-toolbar">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('REPORT: Generating executive report...')"><i class="fa-solid fa-file-pdf"></i> Generate Executive Report</button>
          <button class="btn btn-outline btn-sm" onclick="alert('EXPORT: Dashboard view exported.')"><i class="fa-solid fa-download"></i> Export Dashboard</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Generating executive summary report...')"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Executive Summary</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="renderDashboard()"><i class="fa-solid fa-arrows-rotate"></i> Refresh Dashboard</button>
          <button class="btn btn-outline btn-sm" onclick="alert('SETTINGS: Opening executive dashboard settings...')"><i class="fa-solid fa-gear"></i> Dashboard Settings</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" placeholder="Global search across all CTO modules, releases, AI models, connected EVs, infrastructure..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Domain: All CTO Modules</option>
            <option value="connected">Connected Mobility</option>
            <option value="ai">AI & ML Intelligence</option>
            <option value="infra">Cloud Infrastructure</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Region: All India Fleets</option>
            <option value="mumbai">Mumbai Region</option>
            <option value="bengaluru">Bengaluru Region</option>
          </select>
        </div>
      </div>

      <!-- SECTION 1: EXECUTIVE KPI SUMMARY (CLEAN MINIMALIST 13 KPIS) -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-chart-simple"></i> Executive Technology Domain Matrix</span>
            <span class="card-subtitle">13 High-impact executive KPIs aggregated directly from source module data layers</span>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button class="tech-kpi-tab active" onclick="window.filterTechDomain('all', this)">All Domains (13)</button>
            <button class="tech-kpi-tab" onclick="window.filterTechDomain('Connected Mobility', this)">Mobility</button>
            <button class="tech-kpi-tab" onclick="window.filterTechDomain('Artificial Intelligence', this)">AI & ML</button>
            <button class="tech-kpi-tab" onclick="window.filterTechDomain('Engineering', this)">Engineering</button>
            <button class="tech-kpi-tab" onclick="window.filterTechDomain('Platform', this)">Platform</button>
            <button class="tech-kpi-tab" onclick="window.filterTechDomain('Business', this)">Business</button>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem;">
          <div class="tech-matrix-5col">
            ${categories.map(cat => `
              <div class="tech-domain-col" data-category="${cat.name}">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 6px; margin-bottom: 4px;">
                  <span style="font-size: 0.76rem; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid ${cat.icon}" style="color: var(--color-${cat.color}); font-size: 0.82rem;"></i> ${cat.name}
                  </span>
                  <span class="badge badge-grey" style="font-size: 0.58rem;">${cat.kpis.length}</span>
                </div>
                ${cat.kpis.map(k => `
                  <div class="tech-micro-item tech-kpi-card-compact has-exec-popover" onclick="window.switchRoute('${k.route}')">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
                      <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${k.title}</span>
                      <span class="badge badge-${k.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.54rem; padding: 1px 4px;">${k.trend}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                      <strong style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em;">${k.value}</strong>
                    </div>
                    <div style="margin-top: 6px; font-size: 0.62rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
                      <span>← ${k.source.split(' ')[0]}</span>
                      <span style="color: var(--color-blue); font-weight: 600;">Go &rarr;</span>
                    </div>
                    ${window.createExecPopoverHTML({
                      status: k.status === 'Healthy' ? 'Optimal' : 'Attention',
                      statusColor: k.status === 'Healthy' ? 'success' : 'warning',
                      situation: k.impact || `${k.title} operating at ${k.value} with ${k.trend} trend.`,
                      businessImpact: k.businessImpact || 'Maintains high SLA availability and zero platform disruption.',
                      aiRecommendation: k.aiRecommendation || 'Maintain active monitoring and automated health checks.',
                      recommendedAction: 'Inspect Domain',
                      relatedModule: k.source
                    })}
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 2: UPCOMING MAJOR RELEASES -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-rocket"></i> Upcoming Major Releases Board</span>
            <span class="card-subtitle">Executive release pipeline across products, AI models, and core platform services</span>
          </div>
          <span class="badge badge-purple">${data.upcomingReleases.length} Upcoming Releases</span>
        </div>
        <div class="card-body" style="padding: 1.25rem;">
          <div class="release-grid">
            ${data.upcomingReleases.map(rel => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.76rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: var(--text-primary); font-size: 0.82rem;">${rel.name}</strong>
                    <span class="badge badge-${rel.risk === 'Low' ? 'success' : 'warning'}" style="font-size: 0.60rem;">${rel.version}</span>
                  </div>
                  <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
                    <div>Target Date: <strong>${rel.date}</strong></div>
                    <div>Stage: <strong style="color: var(--color-blue);">${rel.stage}</strong></div>
                    <div>Owner Team: <strong>${rel.owner}</strong></div>
                    <div>Dependencies: <strong style="color: var(--text-muted);">${rel.dependencies}</strong></div>
                  </div>
                  <div style="margin-top: 6px; font-size: 0.7rem; display: flex; justify-content: space-between; align-items: center;">
                    <span>Readiness Score:</span>
                    <strong style="color: var(--color-green);">${rel.readiness} (Confidence: ${rel.confidence})</strong>
                  </div>
                </div>
                <div style="margin-top: 10px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="window.switchRoute('product-roadmap')">Open Roadmap</button>
                  <button class="btn btn-outline btn-xs" onclick="window.openTechnologyDashboardDrawer('${rel.name}')">Review Release</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 3: EXECUTIVE BOARDROOM ANALYTICS ENGINE -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-chart-pie" style="color: #2563EB;"></i> Executive Boardroom Analytics Engine</span>
            <span class="card-subtitle">Presentation-grade executive intelligence directly consuming window.portalData from corresponding CTO modules</span>
          </div>
          <span class="badge" style="background-color: rgba(37, 99, 235, 0.1); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.2); font-size: 0.68rem; font-weight: 700;">Live Boardroom View</span>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 1.25rem;">
          
          <!-- 1. Engineering Delivery Performance -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span class="badge" style="background-color: rgba(37, 99, 235, 0.08); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.2); font-size: 0.60rem; font-weight: 700; margin-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-circle-question"></i> Are engineering teams delivering as expected?
                  </span>
                  <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">1. Engineering Delivery Performance</h4>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" title="Expand Chart" onclick="alert('BOARDROOM PRESENTATION: Opening full-screen view for Engineering Delivery Performance...')"><i class="fa-solid fa-expand"></i></button>
                  <button class="btn btn-outline btn-xs" title="Export Analytics" onclick="alert('EXPORT: Engineering Analytics report exported.')"><i class="fa-solid fa-download"></i></button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <strong style="font-size: 1.35rem; font-weight: 800; color: #2563EB;">94.2%</strong>
                <span class="badge badge-success" style="font-size: 0.60rem;">+4.1% vs Q2 Baseline</span>
              </div>
              <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 8px;">Sprint Completion: 96% | Release Success: 99.4% | Deploys: 312/mo</div>

              <div style="height: 150px; position: relative;"><canvas id="techEngChart"></canvas></div>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; font-size: 0.71rem; line-height: 1.35;">
              <div style="color: var(--text-primary); margin-bottom: 4px;"><strong>Executive Summary:</strong> Sprint 42 milestone velocity reached 94.2% with 99.4% release success rate across 312 CI/CD deploys.</div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.65rem; color: var(--text-muted);">
                <span>← Software Dev | Sprint Mgmt | Bug Tracking</span>
                <span style="color: #2563EB; font-weight: 700; cursor: pointer;" onclick="window.switchRoute('sprint-management')">View Details &rarr;</span>
              </div>
            </div>
          </div>

          <!-- 2. Code Quality & Engineering Excellence -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span class="badge" style="background-color: rgba(79, 70, 229, 0.08); color: #4F46E5; border: 1px solid rgba(79, 70, 229, 0.2); font-size: 0.60rem; font-weight: 700; margin-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-circle-question"></i> Is our codebase healthy and sustainable?
                  </span>
                  <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">2. Code Quality & Excellence</h4>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" title="Expand Chart" onclick="alert('BOARDROOM PRESENTATION: Opening full-screen view for Code Quality & Engineering Excellence...')"><i class="fa-solid fa-expand"></i></button>
                  <button class="btn btn-outline btn-xs" title="Export Analytics" onclick="alert('EXPORT: Code Quality report exported.')"><i class="fa-solid fa-download"></i></button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <strong style="font-size: 1.35rem; font-weight: 800; color: #4F46E5;">92.4% Score</strong>
                <span class="badge badge-success" style="font-size: 0.60rem;">88.5% Coverage</span>
              </div>
              <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 8px;">Tech Debt: 4.2% | Critical Vulnerabilities: 0 | Maintainability: A+</div>

              <div style="height: 150px; position: relative;"><canvas id="techQualityChart"></canvas></div>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; font-size: 0.71rem; line-height: 1.35;">
              <div style="color: var(--text-primary); margin-bottom: 4px;"><strong>Executive Summary:</strong> Code quality remains above enterprise standards (92.4%) while technical debt increased slightly (+0.4%). Dedicated refactoring sprint recommended.</div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.65rem; color: var(--text-muted);">
                <span>← Software Dev | Bug Tracking</span>
                <span style="color: #4F46E5; font-weight: 700; cursor: pointer;" onclick="window.switchRoute('bug-tracking')">View Details &rarr;</span>
              </div>
            </div>
          </div>

          <!-- 3. Connected Vehicle Health -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span class="badge" style="background-color: rgba(16, 185, 129, 0.08); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2); font-size: 0.60rem; font-weight: 700; margin-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-circle-question"></i> How healthy is the connected EV ecosystem?
                  </span>
                  <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">3. Connected Vehicle Health</h4>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" title="Expand Chart" onclick="alert('BOARDROOM PRESENTATION: Opening full-screen view for Connected Vehicle Health...')"><i class="fa-solid fa-expand"></i></button>
                  <button class="btn btn-outline btn-xs" title="Export Analytics" onclick="alert('EXPORT: Telemetry & Vehicle Health report exported.')"><i class="fa-solid fa-download"></i></button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <strong style="font-size: 1.35rem; font-weight: 800; color: #10B981;">99.2% Health</strong>
                <span class="badge badge-success" style="font-size: 0.60rem;">45,200 Connected EVs</span>
              </div>
              <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 8px;">Battery Health: 98.6% | IoT Devices: 3,240 | Telemetry Stream: 99.9%</div>

              <div style="height: 150px; position: relative;"><canvas id="techMobilityChart"></canvas></div>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; font-size: 0.71rem; line-height: 1.35;">
              <div style="color: var(--text-primary); margin-bottom: 4px;"><strong>Executive Summary:</strong> 45,200 active connected EVs operating at 99.2% overall fleet hardware & battery health with 99.9% telemetry uptime.</div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.65rem; color: var(--text-muted);">
                <span>← Telemetry | IoT Devices | EVcare.AI</span>
                <span style="color: #10B981; font-weight: 700; cursor: pointer;" onclick="window.switchRoute('evcare-ai-dashboard')">View Details &rarr;</span>
              </div>
            </div>
          </div>

          <!-- 4. AI Intelligence & Model Performance -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span class="badge" style="background-color: rgba(139, 92, 246, 0.08); color: #8B5CF6; border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.60rem; font-weight: 700; margin-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-circle-question"></i> Are AI systems delivering accurate predictions?
                  </span>
                  <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">4. AI Intelligence & Diagnostics</h4>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" title="Expand Chart" onclick="alert('BOARDROOM PRESENTATION: Opening full-screen view for AI Intelligence & Model Performance...')"><i class="fa-solid fa-expand"></i></button>
                  <button class="btn btn-outline btn-xs" title="Export Analytics" onclick="alert('EXPORT: AI Model Diagnostics report exported.')"><i class="fa-solid fa-download"></i></button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <strong style="font-size: 1.35rem; font-weight: 800; color: #8B5CF6;">98.2% Accuracy</strong>
                <span class="badge badge-purple" style="font-size: 0.60rem;">12.5M Inferences/day</span>
              </div>
              <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 8px;">Model Confidence: 99.1% | Latency: 18ms | Model Drift: 1.8%</div>

              <div style="height: 150px; position: relative;"><canvas id="techAIChart"></canvas></div>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; font-size: 0.71rem; line-height: 1.35;">
              <div style="color: var(--text-primary); margin-bottom: 4px;"><strong>Executive Summary:</strong> Thermal prediction model processed 12.5M daily inferences maintaining 98.2% diagnostic accuracy.</div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.65rem; color: var(--text-muted);">
                <span>← AI Diagnostics | AI Models | ML Platform</span>
                <span style="color: #8B5CF6; font-weight: 700; cursor: pointer;" onclick="window.switchRoute('ai-diagnostics')">View Details &rarr;</span>
              </div>
            </div>
          </div>

          <!-- 5. Platform Reliability & Infrastructure -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span class="badge" style="background-color: rgba(20, 184, 166, 0.08); color: #14B8A6; border: 1px solid rgba(20, 184, 166, 0.2); font-size: 0.60rem; font-weight: 700; margin-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-circle-question"></i> Is our platform stable and scalable?
                  </span>
                  <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">5. Platform Reliability & Infra</h4>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" title="Expand Chart" onclick="alert('BOARDROOM PRESENTATION: Opening full-screen view for Platform Reliability & Infrastructure...')"><i class="fa-solid fa-expand"></i></button>
                  <button class="btn btn-outline btn-xs" title="Export Analytics" onclick="alert('EXPORT: Infrastructure Reliability report exported.')"><i class="fa-solid fa-download"></i></button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <strong style="font-size: 1.35rem; font-weight: 800; color: #14B8A6;">99.98% Uptime</strong>
                <span class="badge badge-success" style="font-size: 0.60rem;">12ms API Latency</span>
              </div>
              <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 8px;">DB Performance: 99.99% | Cloud Util: 64% | Security Threats: 0</div>

              <div style="height: 150px; position: relative;"><canvas id="techReliabilityChart"></canvas></div>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; font-size: 0.71rem; line-height: 1.35;">
              <div style="color: var(--text-primary); margin-bottom: 4px;"><strong>Executive Summary:</strong> Cloud availability maintained 99.98% SLA with 12ms API latency across 45 continuous run days.</div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.65rem; color: var(--text-muted);">
                <span>← Cloud Infra | API Mgmt | DB | SecOps</span>
                <span style="color: #14B8A6; font-weight: 700; cursor: pointer;" onclick="window.switchRoute('cloud-infrastructure')">View Details &rarr;</span>
              </div>
            </div>
          </div>

          <!-- 6. Business Growth & Customer Experience -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span class="badge" style="background-color: rgba(16, 185, 129, 0.08); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.2); font-size: 0.60rem; font-weight: 700; margin-bottom: 4px; display: inline-flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-circle-question"></i> Is technology driving business growth?
                  </span>
                  <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">6. Business Growth & Customer</h4>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" title="Expand Chart" onclick="alert('BOARDROOM PRESENTATION: Opening full-screen view for Business Growth & Customer Experience...')"><i class="fa-solid fa-expand"></i></button>
                  <button class="btn btn-outline btn-xs" title="Export Analytics" onclick="alert('EXPORT: Business Growth report exported.')"><i class="fa-solid fa-download"></i></button>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <strong style="font-size: 1.35rem; font-weight: 800; color: #10B981;">$1.42M MRR</strong>
                <span class="badge badge-success" style="font-size: 0.60rem;">+14.2% YoY</span>
              </div>
              <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 8px;">Fleet Clients: 142 | NPS Rating: +68 Benchmark | Support Resolution: 98.2%</div>

              <div style="height: 150px; position: relative;"><canvas id="techBusinessChart"></canvas></div>
            </div>

            <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; font-size: 0.71rem; line-height: 1.35;">
              <div style="color: var(--text-primary); margin-bottom: 4px;"><strong>Executive Summary:</strong> Monthly Recurring Revenue increased +14.2% YoY driven by 142 enterprise fleets and +68 Net Promoter Score.</div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.65rem; color: var(--text-muted);">
                <span>← Reports | Customer Mgmt | Service Ops</span>
                <span style="color: #10B981; font-weight: 700; cursor: pointer;" onclick="window.switchRoute('reports-analytics')">View Details &rarr;</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- SECTION 4: ENGINEERING ORGANIZATION PERFORMANCE -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-users-gear"></i> Engineering Organization Performance</span>
            <span class="card-subtitle">Real-time team capacity, utilization %, delivery scores, quality ratings, and active sprint health</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem;">
          <div class="eng-teams-grid">
            ${data.engineeringTeams.map(t => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="color: var(--text-primary); font-size: 0.8rem; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid ${t.icon}" style="color: var(--color-blue);"></i> ${t.name}
                    </strong>
                    <span class="badge badge-${t.sprintHealth === 'Optimal' ? 'success' : 'warning'}" style="font-size: 0.58rem;">${t.sprintHealth}</span>
                  </div>
                  <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px; margin-top: 4px;">
                    <div>Team Lead: <strong>${t.lead}</strong></div>
                    <div>Capacity / Util: <strong>${t.capacity} / ${t.util}</strong></div>
                    <div>Delivery Score: <strong style="color: var(--color-green);">${t.delivery}/100</strong></div>
                    <div>Quality Score: <strong style="color: var(--color-blue);">${t.quality}/100</strong></div>
                    <div>Active Projects: <strong>${t.activeProjects}</strong> | Open Risks: <strong style="color: ${t.openRisks > 0 ? 'var(--color-orange)' : 'var(--color-green)'};">${t.openRisks}</strong></div>
                    <div style="margin-top: 4px; font-size: 0.68rem; color: var(--text-muted);">Current Focus: ${t.focus}</div>
                  </div>
                </div>
                <div style="margin-top: 10px;">
                  <button class="btn btn-outline btn-xs" style="width: 100%;" onclick="window.switchRoute('${t.route}')">Support Team &rarr;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 5 & 6: CTO DECISION CENTER & AI COPILOT -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 5: CTO Executive Decision Center -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title" style="color: var(--color-purple);"><i class="fa-solid fa-gavel"></i> CTO Executive Decision Center</span>
              <span class="card-subtitle">Pending high-priority executive approvals and release sign-offs</span>
            </div>
            <span class="badge badge-purple">${data.decisions.length} Active Decisions</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.decisions.map(dec => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--text-primary); font-size: 0.8rem;">${dec.observation}</strong>
                  <span class="badge badge-${dec.risk === 'Medium' ? 'warning' : 'success'}" style="font-size: 0.60rem;">Risk: ${dec.risk}</span>
                </div>
                <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
                  <div>Business Impact: <strong style="color: var(--color-blue);">${dec.impact}</strong></div>
                  <div>Recommendation: <strong>${dec.rec}</strong></div>
                  <div>Owner / Module: <strong>${dec.owner} (${dec.route})</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="alert('APPROVED: CTO decision executed.')">Approve</button>
                  <button class="btn btn-outline btn-xs" onclick="window.openTechnologyDashboardDrawer('${dec.id}')">Review Details</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('ASSIGNED: Reassigned lead.')">Assign Lead</button>
                  <button class="btn btn-outline btn-xs" onclick="window.switchRoute('${dec.route}')">Open Module &rarr;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 6: AI Executive Copilot -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title" style="color: var(--color-purple);"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Executive Copilot Intelligence</span>
              <span class="card-subtitle">Automated observations and recommended CTO action plans</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.aiCopilot.map(copilot => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.74rem;">
                <strong style="color: var(--color-purple); display: block; margin-bottom: 2px;">🤖 ${copilot.obs}</strong>
                <div style="color: var(--text-secondary);"><strong>Business Impact:</strong> ${copilot.impact}</div>
                <div style="color: var(--text-secondary);"><strong>Recommendation:</strong> ${copilot.rec}</div>
                <div style="margin-top: 6px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.65rem; color: var(--text-muted);">Confidence: ${copilot.confidence}</span>
                  <div style="display: flex; gap: 4px;">
                    <button class="btn btn-primary btn-xs" onclick="alert('CTO EXECUTIVE ACTION EXECUTED: ${copilot.action}')">${copilot.action}</button>
                    <button class="btn btn-outline btn-xs" onclick="window.switchRoute('${copilot.route}')">Open Module &rarr;</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 7 & 8: BUSINESS INSIGHTS & EXECUTIVE ACTIVITY TIMELINE -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 7: Executive Business Insights -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-lightbulb"></i> Executive Business Insights</span>
              <span class="card-subtitle">Strategic revenue growth, customer satisfaction ratings, and adoption metrics</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.businessInsights.map(bi => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-left: 3px solid var(--color-blue); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.74rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                  <strong style="color: var(--text-primary); font-size: 0.78rem;">${bi.title}</strong>
                  <span class="badge badge-success" style="font-size: 0.58rem;">${bi.trend}</span>
                </div>
                <div style="color: var(--text-secondary); margin-top: 2px;">Business Impact: ${bi.impact}</div>
                <div style="color: var(--text-secondary);">Recommendation: <strong>${bi.rec}</strong></div>
                <div style="margin-top: 6px; display: flex; justify-content: flex-end;">
                  <button class="btn btn-outline btn-xs" onclick="window.switchRoute('${bi.route}')">Inspect Domain &rarr;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 8: Executive Activity Timeline -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-clock-rotate-left"></i> Executive Activity Timeline</span>
              <span class="card-subtitle">Major cross-system executive releases, OTA rollouts, and platform milestones</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem; font-size: 0.75rem;">
            ${data.activityTimeline.map(act => `
              <div class="tech-timeline-item">
                <div style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; color: var(--color-blue); min-width: 45px;">${act.time}</div>
                <div style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--color-blue); margin-top: 4px;"></div>
                <div>
                  <strong style="color: var(--text-primary); font-size: 0.78rem;">${act.title}</strong>
                  <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 1px;">${act.desc} (${act.module})</div>
                  <div style="font-size: 0.66rem; color: var(--color-green); margin-top: 1px;">Business Impact: ${act.impact}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Initialize 6 Executive Analytics charts
    setTimeout(() => {
      if (window.portalCharts && window.portalCharts.initExecutiveDashboardCharts) {
        if (window.portalCharts && typeof window.portalCharts.initExecutiveDashboardCharts === 'function') { window.portalCharts.initExecutiveDashboardCharts(); }
      }
    }, 100);
  }

  // EXECUTIVE TECHNOLOGY DASHBOARD DETAIL DRAWER
  function openTechnologyDashboardDrawer(id) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">Executive Review</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Item: ${id}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Overview -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Executive Context & Release Scope</strong>
          <p style="color: var(--text-secondary); line-height: 1.35;">
            Product release candidate or system milestone review for ${id}. Verified for production readiness and security compliance.
          </p>
        </div>

        <!-- Section 2: Business Impact -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Business Impact & Risk Score</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Business Impact: <strong style="color: var(--color-blue);">High Impact across 45,200 EVs</strong></div>
            <div>Risk Margin: <strong style="color: var(--color-green);">Low Risk (Verified)</strong></div>
          </div>
        </div>

        <!-- Section 3: Actions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Executive Actions</strong>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
            <button class="btn btn-primary" onclick="alert('CTO ACTION EXECUTED.'); closeDrawer();">Approve & Execute</button>
            <button class="btn btn-outline" onclick="alert('REASSIGNED.'); closeDrawer();">Reassign to Lead</button>
            <button class="btn btn-outline" onclick="window.switchRoute('product-roadmap'); closeDrawer();">Inspect Product Roadmap</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  // EXECUTIVE TECHNOLOGY DASHBOARD DETAIL DRAWER
  function openTechnologyDashboardDrawer(id) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">Executive Decision Review</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Decision ID: ${id}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Overview -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Executive Observation & Context</strong>
          <p style="color: var(--text-secondary); line-height: 1.35;">
            AWS Kinesis telemetry ingestion scaling or Battery LSTM model deployment candidate waiting for final CTO signoff.
          </p>
        </div>

        <!-- Section 2: Business Impact -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Business Impact & Risk Score</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Business Impact: <strong style="color: var(--color-blue);">High Impact across 45,200 EVs</strong></div>
            <div>Risk Margin: <strong style="color: var(--color-green);">Low Risk (Verified)</strong></div>
          </div>
        </div>

        <!-- Section 3: Actions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Executive Actions</strong>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
            <button class="btn btn-primary" onclick="alert('CTO DECISION EXECUTED.'); closeDrawer();">Approve & Execute</button>
            <button class="btn btn-outline" onclick="alert('ASSIGNED.'); closeDrawer();">Reassign to Lead</button>
            <button class="btn btn-outline" onclick="window.switchRoute('cloud-infrastructure'); closeDrawer();">Inspect Source Module</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  // --- RENDER DYNAMIC MODULE-SPECIFIC PORTALS ---
  function renderModuleSubpage(module) {
    if (window.portalCharts && typeof window.portalCharts.destroyAll === 'function') { if (window.portalCharts && typeof window.portalCharts.destroyAll === 'function') { window.portalCharts.destroyAll(); } }

    if (module.id === 'software-development') {
      renderSoftwareDevelopmentModule();
    } else if (module.id === 'system-configuration') {
      renderSystemConfigurationModule();
    } else if (module.id === 'user-management') {
      renderUserManagementModule();
    } else if (module.id === 'document-repository') {
      renderDocumentRepositoryModule();
    } else if (module.id === 'reports-analytics') {
      renderReportsAnalyticsModule();
    } else if (module.id === 'integrations') {
      renderIntegrationsModule();
    } else if (module.id === 'cybersecurity') {
      renderCybersecurityModule();
    } else if (module.id === 'devops-pipelines') {
      renderDevOpsPipelinesModule();
    } else if (module.id === 'system-logs') {
      renderSystemLogsModule();
    } else if (module.id === 'cloud-infrastructure') {
      renderCloudInfrastructureModule();
    } else if (module.id === 'database-management') {
      renderDatabaseManagementModule();
    } else if (module.id === 'api-management') {
      renderAPIManagementModule();
    } else if (module.id === 'bug-tracking') {
      renderBugTrackingModule();
    } else if (module.id === 'feature-requests') {
      renderFeatureRequestsModule();
    } else if (module.id === 'sprint-management') {
      renderSprintManagementModule();
    } else if (module.id === 'product-roadmap') {
      renderProductRoadmapModule();
    } else if (module.id === 'iot-device-management') {
      renderIoTDeviceManagementModule();
    } else if (module.id === 'telemetry-platform') {
      renderTelemetryPlatformModule();
    } else if (module.id === 'evcare-ai-dashboard') {
      renderEVcareAIDashboardModule();
    } else if (module.id === 'ai-diagnostics') {
      renderAIDiagnosticsModule();
    } else if (module.id === 'mobile-app-management') {
      renderMobileAppManagementModule();
    } else if (module.id === 'web-portal-management') {
      renderWebPortalManagementModule();
    } else if (module.id === 'ai-models') {
      renderAIModelsModule();
    } else if (module.id === 'machine-learning') {
      renderMachineLearningPlatformModule();
    } else if (module.id === 'notifications') {
      renderNotificationsModule();
    } else {
      // Default fallback layout for other modules placeholders
      viewSubpage.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="background-color: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('dashboard')" style="margin-bottom: 10px;"><i class="fa-solid fa-arrow-left"></i> Back to Dashboard</button>
              <h2 style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid ${module.icon}" style="color: var(--color-blue);"></i> ${module.name} Workspace
              </h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">${module.desc}</p>
            </div>
            <span class="badge badge-grey">${module.group} Module</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
            <div class="card" style="padding: 1.25rem;">
              <h3 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 8px;"><i class="fa-solid fa-circle-info" style="color: var(--color-purple); margin-right: 6px;"></i> Operational Overview</h3>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
                Reconstructed workspace layout placeholder. Specific metrics and components for the ${module.name} dashboard will be configured in subsequent development iterations.
              </p>
              <button class="btn btn-outline btn-sm" onclick="alert('Workspace configuration workflow triggered.')">Configure Workspace</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // ==========================================================
  // SOFTWARE DEVELOPMENT MODULE - cto2.mp4 RECONSTRUCTION
  // ==========================================================
  function renderSoftwareDevelopmentModule() {
    viewSubpage.innerHTML = `
      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('ACTION: Create Project wizard initiated.')"><i class="fa-solid fa-plus"></i> Create Project</button>
        <button class="btn btn-outline btn-sm" onclick="alert('ACTION: Dynamic Architecture Review Map opened.')"><i class="fa-solid fa-sitemap"></i> View Architecture</button>
        <button class="btn btn-outline btn-sm" onclick="alert('ACTION: Exporting Engineering Health Report PDF...')"><i class="fa-solid fa-download"></i> Export Report</button>
      </section>

      <!-- MULTI-DIMENSIONAL FILTERS ROW (cto2.mp4 style) -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem;">
        <div class="filter-group">
          <div class="search-control">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="projectSearchInput" placeholder="Search project name, owner, tech">
          </div>
          <select class="select-control" id="productFilterSelect">
            <option value="all">Project: All</option>
            <option value="EVcare">EVcare.AI</option>
            <option value="Mobile">Mobile Application</option>
            <option value="Web">Web Portal</option>
            <option value="Fleet">Fleet Platform</option>
            <option value="Office">Office Systems</option>
          </select>
          <select class="select-control" id="teamFilterSelect">
            <option value="all">Team: All Teams</option>
            <option value="Backend AI">Backend & AI</option>
            <option value="Mobile Squad">Mobile Squad</option>
            <option value="Frontend Team">Frontend Team</option>
            <option value="EV Telematics">EV Telematics</option>
            <option value="Cloud Infra">Cloud Infra</option>
          </select>
          <select class="select-control" id="statusFilterSelect">
            <option value="all">Status: All</option>
            <option value="Healthy">Healthy</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Critical">Critical</option>
          </select>
          <select class="select-control" id="techFilterSelect">
            <option value="all">Technology Stack: All</option>
            <option value="React">React</option>
            <option value="Flutter">Flutter</option>
            <option value="Python">Python</option>
            <option value="Go">Go</option>
            <option value="Rust">Rust</option>
          </select>
        </div>
      </div>

      <!-- SECTION 1: 5 EXECUTIVE KPI CARDS (cto2.mp4 style) -->
      <section style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 1.5rem;">
        ${window.portalData.softDevKPIs.map(k => `
          <div class="kpi-card glassmorphism has-exec-popover">
            <div class="kpi-header">
              <span class="kpi-title">${k.title}</span>
              <div class="kpi-icon" style="background-color: var(--bg-active); color: var(--color-${k.color})">
                <i class="fa-solid ${k.icon}"></i>
              ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "Codebase delivery velocity running at 94.2% milestone completion.", businessImpact: "Sustains high codebase quality and enterprise delivery velocity.", aiRecommendation: "Allocate refactoring capacity before next major release.", recommendedAction: "Open Software Dev", relatedModule: "Software Development"})}</div>
            </div>
            <div class="kpi-value">${k.value}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
              <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 500;">${k.support}</span>
              <span class="badge badge-${k.trendClass === 'positive' ? 'success' : k.trendClass === 'negative' ? 'danger' : 'grey'}" style="font-size: 0.65rem;">
                ${k.change}
              </span>
            </div>
          </div>
        `).join('')}
      </section>

      <!-- SECTION 2: APPLICATION ECOSYSTEM ARCHITECTURE VIEW (cto2.mp4 style) -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-sitemap"></i> Application Ecosystem Architecture View</span>
            <span class="card-subtitle">Executive visualization of system connections from mobile clients to cloud IoT infrastructure</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; overflow-x: auto; padding: 10px 0;">
            <div class="card" style="padding: 10px; text-align: center; min-width: 140px; background-color: var(--bg-app); border: 1px solid var(--border-color);">
              <i class="fa-solid fa-mobile-screen-button" style="color: var(--color-blue); font-size: 1.15rem; margin-bottom: 4px;"></i>
              <div style="font-size: 0.78rem; font-weight: 700;">Mobile Apps</div>
              <span style="font-size: 0.65rem; color: var(--text-muted);">EVcare iOS & Android</span>
            </div>
            <i class="fa-solid fa-arrow-right" style="color: var(--text-muted);"></i>
            <div class="card" style="padding: 10px; text-align: center; min-width: 140px; background-color: var(--bg-app); border: 1px solid var(--border-color);">
              <i class="fa-solid fa-server" style="color: var(--color-purple); font-size: 1.15rem; margin-bottom: 4px;"></i>
              <div style="font-size: 0.78rem; font-weight: 700;">Backend Services</div>
              <span style="font-size: 0.65rem; color: var(--text-muted);">FastAPI & Go Gateway</span>
            </div>
            <i class="fa-solid fa-arrow-right" style="color: var(--text-muted);"></i>
            <div class="card" style="padding: 10px; text-align: center; min-width: 140px; background-color: var(--bg-app); border: 1px solid var(--border-color);">
              <i class="fa-solid fa-database" style="color: var(--color-green); font-size: 1.15rem; margin-bottom: 4px;"></i>
              <div style="font-size: 0.78rem; font-weight: 700;">Database Layer</div>
              <span style="font-size: 0.65rem; color: var(--text-muted);">PostgreSQL & Timescale</span>
            </div>
            <i class="fa-solid fa-arrow-right" style="color: var(--text-muted);"></i>
            <div class="card" style="padding: 10px; text-align: center; min-width: 140px; background-color: var(--bg-app); border: 1px solid var(--border-color);">
              <i class="fa-solid fa-cloud" style="color: var(--color-blue); font-size: 1.15rem; margin-bottom: 4px;"></i>
              <div style="font-size: 0.78rem; font-weight: 700;">Cloud Infra</div>
              <span style="font-size: 0.65rem; color: var(--text-muted);">AWS EKS & Azure MS</span>
            </div>
            <i class="fa-solid fa-arrow-right" style="color: var(--text-muted);"></i>
            <div class="card" style="padding: 10px; text-align: center; min-width: 140px; background-color: var(--bg-app); border: 1px solid var(--border-color);">
              <i class="fa-solid fa-tower-broadcast" style="color: var(--color-purple); font-size: 1.15rem; margin-bottom: 4px;"></i>
              <div style="font-size: 0.78rem; font-weight: 700;">IoT / Telemetry</div>
              <span style="font-size: 0.65rem; color: var(--text-muted);">CAN-bus & MQTT/Kafka</span>
            </div>
            <i class="fa-solid fa-arrow-right" style="color: var(--text-muted);"></i>
            <div class="card" style="padding: 10px; text-align: center; min-width: 140px; background-color: var(--bg-app); border: 1px solid var(--border-color);">
              <i class="fa-solid fa-plug" style="color: var(--color-green); font-size: 1.15rem; margin-bottom: 4px;"></i>
              <div style="font-size: 0.78rem; font-weight: 700;">External APIs</div>
              <span style="font-size: 0.65rem; color: var(--text-muted);">ChargePoint & OpenADR</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 3: SOFTWARE PROJECT PORTFOLIO TABLE (cto2.mp4 style) -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-folder-open"></i> Software Project Portfolio</span>
            <span class="card-subtitle">Executive overview of projects owners, technology stack, progress, and versions</span>
          </div>
        </div>
        <div class="card-body" style="padding: 0;">
          <div class="table-responsive">
            <table class="enterprise-table" id="softDevProjectsTable">
              <thead>
                <tr>
                  <th onclick="window.sortProjectTable('name')">PROJECT NAME <i class="fa-solid fa-sort"></i></th>
                  <th onclick="window.sortProjectTable('owner')">PROJECT OWNER <i class="fa-solid fa-sort"></i></th>
                  <th>TECHNOLOGY STACK</th>
                  <th onclick="window.sortProjectTable('status')">CURRENT STATUS <i class="fa-solid fa-sort"></i></th>
                  <th onclick="window.sortProjectTable('progress')">DEVELOPMENT PROGRESS <i class="fa-solid fa-sort"></i></th>
                  <th>CURRENT VERSION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody id="projectsTableBody">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- SECTION 4: TECHNOLOGY STACK OVERVIEW (cto2.mp4 style) -->
      <section style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -0.02em;">Technology Stack Overview</h3>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
          ${window.portalData.techStackOverview.map(t => `
            <div class="card" style="padding: 1.25rem;">
              <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 10px;">${t.title}</span>
              <div style="font-size: 1.15rem; font-weight: 800; margin-bottom: 4px;">${t.main}</div>
              <span style="font-size: 0.72rem; color: var(--text-secondary); display: block; margin-bottom: 12px;">${t.sub}</span>
              <div style="display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 10px; font-size: 0.72rem; color: var(--text-muted);">
                ${t.items.map(item => `<div>&bull; ${item}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 5: TWO-COLUMN DETAIL CARDS (cto2.mp4 style) -->
      <div class="dashboard-grid" style="margin-top: 0; margin-bottom: 1.5rem;">
        
        <!-- Application Environment Status -->
        <div class="card col-6">
          <div class="card-header">
            <span class="card-title"><i class="fa-solid fa-server"></i> Application Environment Status</span>
            <span class="badge badge-success">3/3 Operational</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px;">
            ${window.portalData.environments.map(env => `
              <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 2px;">${env.name}</h4>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">${env.desc}</span>
                </div>
                <div style="text-align: right;">
                  <span class="badge badge-${env.statusClass}" style="font-size: 0.65rem; margin-bottom: 4px;">${env.status}</span>
                  <div style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 600;">Availability: ${env.availability}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Engineering Activity Summary -->
        <div class="card col-6">
          <div class="card-header">
            <span class="card-title"><i class="fa-solid fa-timeline"></i> Engineering Activity Summary</span>
            <span class="badge badge-grey">CTO Summary Feed</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px;">
            ${window.portalData.engineeringActivity.map(act => `
              <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 8px; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                <div style="flex: 1;">
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block;">${act.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); margin-top: 2px;">${act.desc}</p>
                </div>
                <span style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap;">${act.time}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- SECTION 6: HEALTH INSIGHTS & ATTENTION CENTER (cto2.mp4 style) -->
      <div class="dashboard-grid" style="margin-top: 0; margin-bottom: 1.5rem;">
        
        <!-- Engineering Health Insights -->
        <div class="card col-6">
          <div class="card-header">
            <span class="card-title"><i class="fa-solid fa-heart-pulse"></i> Engineering Health Insights</span>
            <span class="badge badge-grey">Executive Overview</span>
          </div>
          <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
            ${window.portalData.healthInsights.map(h => `
              <div style="padding: 12px; background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block;">${h.label}</span>
                <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px; letter-spacing: -0.02em;">${h.score}</div>
                <span style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px; display: block;">${h.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- CTO Attention Center -->
        <div class="card col-6">
          <div class="card-header">
            <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> CTO Attention Center</span>
            <span class="badge badge-danger">3 Items Require Attention</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; justify-content: space-between;">
            ${window.portalData.attentionCenter.map(att => `
              <div style="padding: 8px 10px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                <div style="flex: 1;">
                  <span class="badge badge-${att.priority === 'Critical' ? 'danger' : att.priority === 'Warning' ? 'warning' : 'success'}" style="font-size: 0.62rem; margin-bottom: 2px;">${att.priority}</span>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.3;">${att.title}</p>
                </div>
                <button class="btn btn-primary btn-sm" style="font-size: 0.68rem; padding: 4px 8px;" onclick="alert('CTO EXPLICIT ACTION: Initiated ${att.action}')">${att.action}</button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- SECTION 7: AI RECOMMENDATIONS (cto2.mp4 style) -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Engineering Intelligence & Recommendations</span>
          <span class="badge badge-grey">3 Active Insights</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.aiRecommendations.map(rec => `
              <div class="card" style="padding: 12px; background-color: var(--bg-surface); border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-primary);">${rec.title}</span>
                  <span class="badge badge-grey" style="font-size: 0.62rem;">${rec.priority}</span>
                </div>
                <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 8px;">${rec.desc}</p>
                <div style="font-size: 0.72rem; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); color: var(--text-secondary); line-height: 1.35;">
                  💡 <strong>Recommendation:</strong> ${rec.recommendation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local table controller states
    let searchVal = '';
    let sortKey = 'name';
    let sortOrder = 'asc';
    let productVal = 'all';
    let teamVal = 'all';
    let statusVal = 'all';
    let techVal = 'all';

    function drawTable() {
      const tbody = document.getElementById('projectsTableBody');
      if (!tbody) return;

      // Filtering projects based on user input
      let filtered = window.portalData.projectsList.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal.toLowerCase()) || 
                            p.owner.toLowerCase().includes(searchVal.toLowerCase()) ||
                            p.tech.toLowerCase().includes(searchVal.toLowerCase());
        const matchesProduct = productVal === 'all' || p.name.includes(productVal);
        const matchesTeam = teamVal === 'all' || p.owner === teamVal;
        const matchesStatus = statusVal === 'all' || p.status === statusVal;
        const matchesTech = techVal === 'all' || p.tech.includes(techVal);
        return matchesSearch && matchesProduct && matchesTeam && matchesStatus && matchesTech;
      });

      // Sorting
      filtered.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];
        if (typeof valA === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
      });

      // Render Rows matching cto2.mp4
      tbody.innerHTML = filtered.map(p => `
        <tr onclick="window.openProjectDrawer('${p.id}')" style="cursor: pointer;">
          <td><strong>${p.name}</strong></td>
          <td>${p.owner}</td>
          <td>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${p.tech.split(', ').slice(0, 3).map(t => `<span class="badge badge-grey" style="font-size:0.68rem; padding: 2px 5px;">${t}</span>`).join('')}
              ${p.tech.split(', ').length > 3 ? `<span class="badge badge-grey" style="font-size:0.68rem; padding: 2px 5px;">+${p.tech.split(', ').length - 3}</span>` : ''}
            </div>
          </td>
          <td><span class="badge badge-${p.status === 'Healthy' ? 'success' : p.status === 'Needs Attention' ? 'warning' : 'danger'}" style="font-size: 0.65rem;">${p.status}</span></td>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size: 0.75rem; font-weight: 600;">${p.progress}%</span>
              <div style="width:60px; height:5px; background-color: var(--border-color); border-radius: var(--radius-full); overflow:hidden;">
                <div style="width:${p.progress}%; height:100%; background-color: var(--color-${p.status === 'Healthy' ? 'green' : p.status === 'Needs Attention' ? 'orange' : 'red'})"></div>
              </div>
            </div>
          </td>
          <td><strong>${p.version}</strong></td>
          <td>
            <button class="btn btn-primary btn-sm" style="padding: 4px 8px; font-size: 0.7rem;" onclick="event.stopPropagation(); window.openProjectDrawer('${p.id}')">View Details</button>
          </td>
        </tr>
      `).join('');

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">No projects match filters.</td></tr>`;
      }
    }

    // Attach local input listeners
    const searchInput = document.getElementById('projectSearchInput');
    const prodSelect = document.getElementById('productFilterSelect');
    const teamSelect = document.getElementById('teamFilterSelect');
    const statusSelect = document.getElementById('statusFilterSelect');
    const techSelect = document.getElementById('techFilterSelect');

    if (searchInput) searchInput.addEventListener('input', (e) => { searchVal = e.target.value; drawTable(); });
    if (prodSelect) prodSelect.addEventListener('change', (e) => { productVal = e.target.value; drawTable(); });
    if (teamSelect) teamSelect.addEventListener('change', (e) => { teamVal = e.target.value; drawTable(); });
    if (statusSelect) statusSelect.addEventListener('change', (e) => { statusVal = e.target.value; drawTable(); });
    if (techSelect) techSelect.addEventListener('change', (e) => { techVal = e.target.value; drawTable(); });

    // Expose sort function globally
    window.sortProjectTable = function(key) {
      if (sortKey === key) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey = key;
        sortOrder = 'asc';
      }
      drawTable();
    };

    // Draw initial table rows
    drawTable();
  }

  // ==========================================================
  // SYSTEM CONFIGURATION MODULE - cto2.mp4 RECONSTRUCTION
  // ==========================================================
  function renderSystemConfigurationModule() {
    viewSubpage.innerHTML = `
      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Create new configuration request wizard opened.')"><i class="fa-solid fa-plus"></i> Submit Config Change</button>
        <button class="btn btn-outline btn-sm" onclick="alert('Triggering Cross-Environment Drift Audit Sprint...')"><i class="fa-solid fa-arrows-rotate"></i> Audit Drift Sprint</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Sharing technology policy compliance matrix...')"><i class="fa-solid fa-share-nodes"></i> Share Policy Matrix</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Generating configuration compliance audit report...')"><i class="fa-solid fa-download"></i> Export Config Audit</button>
      </section>

      <!-- SEARCH BAR & FILTER PILLS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem;">
        <div class="filter-group">
          <div class="search-control" style="flex: 1; max-width: 500px;">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="systemSearchInput" placeholder="Search system name, parameter, environment, status, owner team...">
          </div>
        </div>
        <div class="filter-group" style="gap: 6px;" id="configFilterGroup">
          <button class="btn btn-primary btn-sm config-filter-btn" data-category="all">All Systems (18)</button>
          <button class="btn btn-outline btn-sm config-filter-btn" data-category="Applications">Applications</button>
          <button class="btn btn-outline btn-sm config-filter-btn" data-category="Infrastructure">Infrastructure</button>
          <button class="btn btn-outline btn-sm config-filter-btn" data-category="Security">Security</button>
          <button class="btn btn-outline btn-sm config-filter-btn" data-category="pending">Pending (3)</button>
        </div>
      </div>

      <!-- SECTION 1: SYSTEM LANDSCAPE VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-cubes"></i> System Landscape View</span>
            <span class="card-subtitle">Visual configuration map answering: "What systems are configured and what is their status?"</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;" id="landscapeCountText">6 Technology Domains Configured</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;" id="systemLandscapeGrid">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 2: CONFIGURATION MANAGEMENT WORKSPACE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-folder-tree"></i> Configuration Management Workspace</span>
            <span class="card-subtitle">Enterprise configuration categories covering Applications, Infrastructure, Integrations, and Security</span>
          </div>
          <span class="badge badge-grey">4 Category Hubs</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.systemConfig.workspace.map(w => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="font-size: 0.88rem; font-weight: 700; max-width: 70%;">${w.category}</h4>
                    <span class="badge badge-${w.badgeClass}" style="font-size: 0.65rem;">${w.badge}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
                    <div>${w.line1}</div>
                    <div>${w.line2}</div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-blue" onclick="alert('CTO ACTION: Loading configuration files registry for ${w.category}...')">View Configuration</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO ACTION: Initiating configuration update request workflow...')">Update Request</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO ACTION: Opening git config differences review pane...')">Compare Changes</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 3: ENVIRONMENT CONTROL CENTER -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-server"></i> Environment Control Center</span>
            <span class="card-subtitle">Cross-environment comparison answering: "Are Development, Testing, and Production environments consistent?"</span>
          </div>
          <span class="badge badge-grey">3 Environment Tiers</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.systemConfig.environments.map(env => `
              <div class="card" style="padding: 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <h4 style="font-size: 0.95rem; font-weight: 800;">${env.name}</h4>
                  <span class="badge badge-grey">Version: ${env.version}</span>
                </div>
                
                <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-sm);">
                  <div>Rate Limit: <strong>${env.rateLimit}</strong></div>
                  <div>Readiness: <strong style="color: var(--color-green);">${env.readiness}</strong></div>
                  <div style="font-style: italic; color: ${env.hasDiff ? 'var(--color-orange)' : 'var(--text-muted)'}; margin-top: 4px;">
                    ${env.diff}
                  </div>
                </div>

                <div style="display: flex; gap: 6px;">
                  <button class="btn ${env.actionLabel.includes('Approve') ? 'btn-primary' : 'btn-outline'} btn-sm" style="flex: 1;" onclick="handleEnvironmentAction('${env.name}', '${env.actionLabel}')">
                    ${env.actionLabel}
                  </button>
                  <button class="btn btn-outline btn-sm" onclick="alert('Comparing ${env.name} baseline values against cluster configurations...')">Compare</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 4: CONFIGURATION CHANGE GOVERNANCE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-gavel"></i> Configuration Change Governance</span>
            <span class="card-subtitle">Visual approval workflow: Change Requested &rarr; Technical Review &rarr; CTO Approval &rarr; Implemented &rarr; Verified</span>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">
            Requested &bull; Tech Review &bull; <strong style="color: var(--color-blue); font-weight: 700;">CTO Approval</strong> &bull; Implemented &bull; Verified
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.systemConfig.governance.map(gov => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="font-size: 0.82rem; font-weight: 700; line-height: 1.35; max-width: 75%;">${gov.title}</h4>
                    <span class="badge badge-${gov.riskClass}" style="font-size: 0.62rem;">${gov.risk}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
                    <div>Affected System: <strong>${gov.system}</strong></div>
                    <div>Owner Team: <strong>${gov.owner}</strong></div>
                    <div>Status: <span class="badge badge-${gov.statusClass}" style="font-size: 0.65rem;" id="govStatus-${gov.id}">${gov.status}</span></div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="btn btn-primary btn-sm" style="flex: 1; padding: 4px; font-size: 0.7rem; justify-content: center; background-color: var(--color-green); border-color: var(--color-green);" onclick="approveChangeRequest('${gov.id}', '${gov.title}')">Approve Change</button>
                  <button class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 0.7rem; color: var(--color-red);" onclick="alert('Change request rejected and flagged for review.')">Reject</button>
                  <button class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 0.7rem;" onclick="alert('CTO Action: Requesting technical analysis and audit notes...')">${gov.id === 'gov-2' ? 'Assign Team' : 'Request Review'}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 5: TECHNOLOGY POLICY CONTROL -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-shield-halved"></i> Technology Policy Control</span>
            <span class="card-subtitle">Enterprise governance workspace managing system standards, configuration policies, default settings, and technology guidelines</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="alert('CTO Governance: Approved and signed active compliance standards.')">Approve Policies</button>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.systemConfig.policies.map(pol => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 8px;">${pol.title}</h4>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 14px;">${pol.text}</p>
                </div>
                <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;" onclick="alert('CTO Governance: Loading detail review workflow for ${pol.title}...')">
                  ${pol.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 6: CTO CONTROL CENTER -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-user-gear"></i> CTO Control Center</span>
            <span class="card-subtitle">Direct executive controls for configuration approvals, sensitive locking, emergency rollbacks, and health monitoring</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="alert('CTO Control: Critical configuration changes reviewed and approved.')">
              <i class="fa-solid fa-circle-check"></i> Approve Critical Config Changes
            </button>
            <button class="btn btn-outline btn-sm" onclick="alert('CTO Control: Sensitive database and cloud configurations locked. Unauthorized updates blocked.')">
              <i class="fa-solid fa-lock"></i> Lock Sensitive Configurations
            </button>
            <button class="btn btn-outline btn-sm" onclick="alert('CTO Control: Opening global system baseline parameters settings panel...')">
              <i class="fa-solid fa-sliders"></i> Review System Settings
            </button>
            <button class="btn btn-outline btn-sm" style="color: var(--color-red);" onclick="alert('CRITICAL CTO ACTION: Emergency rollback sequence initiated for all active pods.')">
              <i class="fa-solid fa-circle-left"></i> Initiate Emergency Rollback
            </button>
            <button class="btn btn-outline btn-sm" onclick="alert('CTO Control: Assigning team for architecture audit & drift review...')">
              <i class="fa-solid fa-user-shield"></i> Assign Technical Review
            </button>
            <button class="btn btn-outline btn-sm" onclick="alert('CTO Control: Ingress telemetry configuration health stream is online.')">
              <i class="fa-solid fa-heart-pulse"></i> Monitor Configuration Health
            </button>
          </div>
        </div>
      </section>

      <!-- SECTION 7: AI CONFIGURATION INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Configuration Insights</span>
            <span class="card-subtitle">Automated observations, configuration impact analysis, recommendations, and CTO actions</span>
          </div>
          <span class="badge badge-grey">4 Active Insights</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.systemConfig.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${ins.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.4; margin-bottom: 6px;"><strong>Observation:</strong> "${ins.obs}"</p>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;"><strong>Impact:</strong> "${ins.impact}"</p>
                  <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 12px;">
                    💡 <strong>Recommendation:</strong> "${ins.rec}"
                  </div>
                </div>
                <button class="btn ${ins.action.includes('Config') ? 'btn-primary' : 'btn-outline'} btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('AI Recommendation Action triggered: ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local filter state
    let searchVal = '';
    let categoryFilter = 'all';

    function drawLandscape() {
      const grid = document.getElementById('systemLandscapeGrid');
      const countText = document.getElementById('landscapeCountText');
      if (!grid) return;

      let filtered = window.portalData.systemConfig.landscape.filter(sys => {
        const matchesSearch = sys.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            sys.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                            sys.owner.toLowerCase().includes(searchVal.toLowerCase()) ||
                            sys.params.toLowerCase().includes(searchVal.toLowerCase());
        
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
          if (categoryFilter === 'pending') {
            matchesCategory = sys.status === 'Pending Change';
          } else {
            // Applications or Infrastructure
            if (categoryFilter === 'Applications') {
              matchesCategory = sys.title.includes('APPLICATIONS') || sys.title.includes('AI SYSTEMS') || sys.title.includes('MOBILE PLATFORMS') || sys.title.includes('WEB PLATFORMS');
            } else if (categoryFilter === 'Infrastructure') {
              matchesCategory = sys.title.includes('CLOUD PLATFORMS') || sys.title.includes('DATABASES');
            } else if (categoryFilter === 'Security') {
              matchesCategory = false; // no security systems in landscape grid
            }
          }
        }
        return matchesSearch && matchesCategory;
      });

      grid.innerHTML = filtered.map(sys => `
        <div class="card" style="padding: 1.25rem; cursor: pointer;" onclick="window.openConfigComponentDrawer('${sys.id}')">
          <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${sys.title}</span>
          <h4 style="font-size: 0.88rem; font-weight: 800; margin-bottom: 8px;">${sys.name}</h4>
          
          <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Status:</span>
              <span class="badge badge-${sys.statusClass}" style="font-size: 0.65rem;">${sys.status}</span>
            </div>
            <div>Environment: <strong>${sys.env}</strong></div>
            <div>Last Change: <strong>${sys.time}</strong></div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Health:</span>
              <strong style="color: var(--color-${sys.health.includes('Optimal') ? 'green' : 'orange'})">${sys.health}</strong>
            </div>
          </div>
          
          <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="event.stopPropagation(); window.openConfigComponentDrawer('${sys.id}')">Inspect Config</button>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">No systems match search or filters.</div>`;
      }

      countText.textContent = `${filtered.length} Systems Displayed`;
    }

    // Attach search listener
    const searchInput = document.getElementById('systemSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscape();
      });
    }

    // Attach filter buttons click
    const filterBtns = document.querySelectorAll('.config-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
        
        categoryFilter = btn.getAttribute('data-category');
        drawLandscape();
      });
    });

    // Draw initial grid
    drawLandscape();
  }

  // Handle environment actions
  window.handleEnvironmentAction = function(env, label) {
    if (label === 'Rollback') {
      alert(`Initiated config rollback on Production environment to previous verified snapshot.`);
    } else if (label === 'Approve Migration') {
      alert(`Migration from Testing to Production approved. Initializing CI/CD verification pipeline...`);
    } else if (label === 'Promote to Test') {
      alert(`Promoting active sandbox configuration to Testing environment...`);
    }
  };

  // Change request approvals
  window.approveChangeRequest = function(id, title) {
    const item = window.portalData.systemConfig.governance.find(g => g.id === id);
    if (item) {
      item.status = 'Approved';
      item.statusClass = 'success';
      alert(`Change Request Approved: ${title}`);
      
      // Update badge dynamically
      const el = document.getElementById(`govStatus-${id}`);
      if (el) {
        el.className = 'badge badge-success';
        el.textContent = 'Approved';
      }
    }
  };

  // --- COMPONENT INSPECTOR DRAWER ---
  window.openConfigComponentDrawer = function(sysId) {
    const sys = window.portalData.systemConfig.landscape.find(s => s.id === sysId);
    if (!sys) return;

    drawerTitle.innerHTML = `System Config: ${sys.name} <span class="badge badge-${sys.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${sys.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Domain Details -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-server" style="color: var(--color-blue); font-size: 0.85rem;"></i> System Landscape Details</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Technology Domain:</strong> ${sys.title}</div>
            <div><strong style="color: var(--text-primary);">Owner Team:</strong> ${sys.owner}</div>
            <div><strong style="color: var(--text-primary);">Environment:</strong> ${sys.env}</div>
            <div><strong style="color: var(--text-primary);">Health Status:</strong> <span style="color: var(--color-${sys.healthClass === 'success' ? 'green' : 'orange'})">${sys.health}</span></div>
          </div>
        </div>

        <!-- Dependencies -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-sitemap" style="color: var(--color-purple); font-size: 0.85rem;"></i> Active Dependencies</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Upstream & Downstream:</strong> ${sys.deps}</div>
          </div>
        </div>

        <!-- Configuration Parameters -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-sliders" style="color: var(--color-green); font-size: 0.85rem;"></i> Active Parameters</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Settings:</strong> ${sys.params}</div>
            <div><strong style="color: var(--text-primary);">Last Drift Audit:</strong> Synced (100% compliant)</div>
          </div>
        </div>

        <!-- Governance Operations -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO DIRECTION: Configuration baseline review triggered for ${sys.name}.')">Verify Configuration</button>
          <button class="btn btn-outline" onclick="alert('CTO DIRECTION: Syncing environment baselines...')">Request Configuration Audit</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // USER MANAGEMENT MODULE - CTO IDENTITY & ACCESS GOVERNANCE CENTER
  // ==========================================================
  function renderUserManagementModule() {
    viewSubpage.innerHTML = `
      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Create new user workspace profile wizard opened.')"><i class="fa-solid fa-plus"></i> Create User Request</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Enforcing security sync parameters across local domain clusters...')"><i class="fa-solid fa-shield-halved"></i> Request Security Audit</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Generating user log audit report...')"><i class="fa-solid fa-download"></i> Export User Audit</button>
      </section>

      <!-- SEARCH BAR & FILTER PILLS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem;">
        <div class="filter-group">
          <div class="search-control" style="flex: 1; max-width: 500px;">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="userSearchInput" placeholder="Search user name, email, role, department, accessible system...">
          </div>
        </div>
        <div class="filter-group" style="gap: 6px;" id="userFilterGroup">
          <button class="btn btn-primary btn-sm user-filter-btn" data-category="all">All Users (142)</button>
          <button class="btn btn-outline btn-sm user-filter-btn" data-category="Engineering">Engineering (58)</button>
          <button class="btn btn-outline btn-sm user-filter-btn" data-category="CloudOps">CloudOps & Security (24)</button>
          <button class="btn btn-outline btn-sm user-filter-btn" data-category="AI">AI & Data (18)</button>
          <button class="btn btn-outline btn-sm user-filter-btn" data-category="Super">Super Admins (6)</button>
        </div>
      </div>

      <!-- SECTION 1: IDENTITY LANDSCAPE VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-users-viewfinder"></i> Identity Landscape View</span>
            <span class="card-subtitle">Visual identity relationship map answering: "Who has access to systems across the organization structure?"</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">142 Identities Synchronized via Passkey SSO</span>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; gap: 15px;">
          <!-- Visual access relationship flow -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 15px;">
            <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 10px;">Visual Access Relationship Flow</span>
            <div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 0.82rem; font-weight: 600; text-align: center; padding: 5px 0;">
              <div style="background-color: var(--bg-surface); padding: 10px 15px; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-users" style="color: var(--color-blue);"></i> Engineering Teams (58 Users)
              </div>
              <i class="fa-solid fa-arrow-right" style="color: var(--text-muted);"></i>
              <div style="background-color: var(--bg-surface); padding: 10px 15px; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-user-shield" style="color: var(--color-blue);"></i> CTO & Lead Architect Roles
              </div>
              <i class="fa-solid fa-arrow-right" style="color: var(--text-muted);"></i>
              <div style="background-color: var(--bg-surface); padding: 10px 15px; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-cubes" style="color: var(--color-green);"></i> AWS EKS, CockroachDB & Production API Portals
              </div>
            </div>
          </div>

          <!-- Summary list of boxes -->
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
            <div class="card" style="padding: 10px 12px; background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Identities</span>
              <div style="font-size: 1.15rem; font-weight: 800; margin-top: 4px; color: var(--text-primary);">${window.portalData.identityAccess.summary.activeUsers}</div>
              <span style="font-size: 0.68rem; color: var(--color-green); font-weight: 600; display: block; margin-top: 2px;">${window.portalData.identityAccess.summary.activeUsersSub}</span>
            </div>
            <div class="card" style="padding: 10px 12px; background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Teams & Squads</span>
              <div style="font-size: 1.15rem; font-weight: 800; margin-top: 4px; color: var(--text-primary);">${window.portalData.identityAccess.summary.squads}</div>
              <span style="font-size: 0.68rem; color: var(--text-secondary); display: block; margin-top: 2px;">${window.portalData.identityAccess.summary.squadsSub}</span>
            </div>
            <div class="card" style="padding: 10px 12px; background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Roles Tier</span>
              <div style="font-size: 1.15rem; font-weight: 800; margin-top: 4px; color: var(--text-primary);">${window.portalData.identityAccess.summary.definedRoles}</div>
              <span style="font-size: 0.68rem; color: var(--text-secondary); display: block; margin-top: 2px;">${window.portalData.identityAccess.summary.definedRolesSub}</span>
            </div>
            <div class="card" style="padding: 10px 12px; background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Access Levels</span>
              <div style="font-size: 1.15rem; font-weight: 800; margin-top: 4px; color: var(--text-primary);">${window.portalData.identityAccess.summary.tiers}</div>
              <span style="font-size: 0.68rem; color: var(--text-secondary); display: block; margin-top: 2px;">${window.portalData.identityAccess.summary.tiersSub}</span>
            </div>
            <div class="card" style="padding: 10px 12px; background-color: var(--bg-app); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
              <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Systems</span>
              <div style="font-size: 1.15rem; font-weight: 800; margin-top: 4px; color: var(--text-primary);">${window.portalData.identityAccess.summary.activeSystems}</div>
              <span style="font-size: 0.68rem; color: var(--text-secondary); display: block; margin-top: 2px;">${window.portalData.identityAccess.summary.activeSystemsSub}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: ROLE & PERMISSION ARCHITECTURE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-network-wired"></i> Role & Permission Architecture</span>
            <span class="card-subtitle">Structured organizational role hierarchy defining system access, permissions, and privilege levels</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Create new organizational role wizard opened.')">+ Create Role</button>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.identityAccess.roles.map(r => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.95rem; font-weight: 800;">${r.title}</h4>
                    <span class="badge badge-${r.badgeClass}" style="font-size: 0.65rem;">${r.badge}</span>
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; margin-bottom: 10px;">
                    Assigned Users: ${r.users}
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
                    ${r.permissions.map(p => {
                      const isRestricted = p.includes('Restricted') || p.includes('Time-bound');
                      const icon = p.includes('Restricted') ? 'fa-xmark' : (p.includes('Time-bound') ? 'fa-exclamation' : 'fa-check');
                      const color = p.includes('Restricted') ? 'var(--text-muted)' : (p.includes('Time-bound') ? 'var(--color-orange)' : 'var(--color-green)');
                      return `<div style="display: flex; align-items: flex-start; gap: 6px; color: ${isRestricted && p.includes('Restricted') ? 'var(--text-secondary)' : 'var(--text-primary)'}">
                        <i class="fa-solid ${icon}" style="color: ${color}; margin-top: 3px; font-size: 0.75rem; width: 12px;"></i>
                        <span>${p}</span>
                      </div>`;
                    }).join('')}
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-blue" onclick="alert('CTO ACTION: Opening permission modifier checklist for ${r.title}...')">Modify Permissions</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO ACTION: Opening baseline access review for ${r.title}...')">Review Access</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 3: USER IDENTITY WORKSPACE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-user-tag"></i> User Identity Workspace</span>
            <span class="card-subtitle">Focused identity profiles showing assigned roles, granular permissions, activity history, and status</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">Key Technical Leaders</span>
        </div>
        <div class="card-body" style="padding: 0; overflow-x: auto;">
          <table class="table" style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">
                <th style="padding: 10px 16px;">User Name & Email</th>
                <th style="padding: 10px 16px;">Department</th>
                <th style="padding: 10px 16px;">Designation & Role</th>
                <th style="padding: 10px 16px;">Accessible Systems</th>
                <th style="padding: 10px 16px;">Status</th>
                <th style="padding: 10px 16px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="userDirectoryTableBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 4: ACCESS REQUEST & APPROVAL FLOW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-key"></i> Access Request & Approval Flow</span>
            <span class="card-subtitle">Visual access governance pipeline: Access Request &rarr; Security Review &rarr; Manager Approval &rarr; CTO Approval &rarr; Granted</span>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">
            Request &bull; Security Review &bull; Manager Appr. &bull; <strong style="color: var(--color-blue); font-weight: 700;">CTO Approval</strong> &bull; Granted
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.identityAccess.requests.map(req => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="font-size: 0.82rem; font-weight: 700; line-height: 1.35; max-width: 75%;">${req.title}</h4>
                    <span class="badge badge-${req.impactClass}" style="font-size: 0.62rem;">${req.impact}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
                    <div>Requester: <strong>${req.requester}</strong></div>
                    <div>Requested Scope: <strong>${req.scope}</strong></div>
                    <div>Business Reason: <strong>${req.reason}</strong></div>
                    <div>Status: <span class="badge badge-${req.statusClass}" style="font-size: 0.65rem;" id="reqStatus-${req.id}">${req.status}</span></div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="btn btn-primary btn-sm" style="flex: 1; padding: 4px; font-size: 0.7rem; justify-content: center; background-color: var(--color-green); border-color: var(--color-green);" onclick="approveAccessRequest('${req.id}', '${req.title}')">✓ Approve</button>
                  <button class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 0.7rem; color: var(--color-red);" onclick="alert('Access Request rejected and flagged.')">Reject</button>
                  <button class="btn btn-outline btn-sm" style="padding: 4px 8px; font-size: 0.7rem;" onclick="alert('Requesting additional justification logs...')">Request Review</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 5: CTO ACCESS CONTROL CENTER -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-user-lock"></i> CTO Access Control Center</span>
            <span class="card-subtitle">Executive decision workspace for user management, permission controls, and least-privilege governance</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.identityAccess.controlCenter.map(cc => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.88rem; font-weight: 700;">${cc.category}</h4>
                    <span class="badge badge-${cc.badgeClass}" style="font-size: 0.65rem;">${cc.badge}</span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 14px;">${cc.text}</p>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="btn btn-primary btn-sm" style="flex: 1; padding: 4px 6px; font-size: 0.68rem; justify-content: center;" onclick="alert('CTO Decision: Triggering workflow for ${cc.actions[0]}...')">${cc.actions[0]}</button>
                  <button class="btn btn-outline btn-sm" style="padding: 4px 6px; font-size: 0.68rem;" onclick="alert('CTO Decision: Triggering workflow for ${cc.actions[1]}...')">${cc.actions[1]}</button>
                  <button class="btn btn-outline btn-sm" style="padding: 4px 6px; font-size: 0.68rem; ${cc.actions[2] === 'Remove Access' ? 'color: var(--color-red);' : ''}" onclick="alert('CTO Decision: Triggering workflow for ${cc.actions[2]}...')">${cc.actions[2]}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 6: ACCESS RISK MONITORING -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> Access Risk Monitoring</span>
            <span class="card-subtitle">Security-focused monitoring highlighting dormant accounts, excessive privileges, and expiring credentials</span>
          </div>
          <span class="badge badge-grey">4 Active Risk Flags</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.identityAccess.risks.map(r => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.78rem; font-weight: 700; color: var(--color-red);">${r.title}</h4>
                    <span class="badge badge-warning" style="font-size: 0.62rem;">${r.level}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px;">
                    <div><strong>Risk:</strong> "${r.risk}"</div>
                    <div><strong>Impact:</strong> "${r.impact}"</div>
                    <div style="font-style: italic; color: var(--text-muted); margin-top: 2px;">Recommendation: "${r.rec}"</div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="btn btn-primary btn-sm" style="flex: 1; font-size: 0.7rem; justify-content: center;" onclick="alert('CTO Action: Initiating investigation on risk flag: ${r.title}')">Investigate</button>
                  <button class="btn btn-outline btn-sm" style="font-size: 0.7rem;" onclick="alert('CTO Action: Launching access scope adjustments...')">Adjust Access</button>
                  <button class="btn btn-outline btn-sm" style="font-size: 0.7rem;" onclick="alert('CTO Action: Delegating access review to SecOps team...')">Assign Review</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 7: AI ACCESS INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Access Insights</span>
            <span class="card-subtitle">Automated observations, permission impact analysis, recommendations, and CTO actions</span>
          </div>
          <span class="badge badge-grey">4 Active Insights</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.identityAccess.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${ins.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.4; margin-bottom: 6px;"><strong>Observation:</strong> "${ins.obs}"</p>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;"><strong>Impact:</strong> "${ins.impact}"</p>
                  <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 12px;">
                    💡 <strong>Recommendation:</strong> "${ins.rec}"
                  </div>
                </div>
                <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('AI Recommendation Action triggered: ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Directory filter logic
    let searchVal = '';
    let categoryFilter = 'all';

    function drawDirectory() {
      const tbody = document.getElementById('userDirectoryTableBody');
      if (!tbody) return;

      const filtered = window.portalData.identityAccess.users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            u.email.toLowerCase().includes(searchVal.toLowerCase()) ||
                            u.department.toLowerCase().includes(searchVal.toLowerCase()) ||
                            u.designation.toLowerCase().includes(searchVal.toLowerCase()) ||
                            u.systems.toLowerCase().includes(searchVal.toLowerCase());
        
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
          if (categoryFilter === 'Engineering') {
            matchesCategory = u.department.includes('Software Engineering');
          } else if (categoryFilter === 'CloudOps') {
            matchesCategory = u.department.includes('Cloud Infrastructure') || u.department.includes('DevOps');
          } else if (categoryFilter === 'AI') {
            matchesCategory = u.department.includes('AI & ML Engineering');
          } else if (categoryFilter === 'Super') {
            matchesCategory = u.designation.includes('Architect') || u.designation.includes('Lead');
          }
        }
        return matchesSearch && matchesCategory;
      });

      tbody.innerHTML = filtered.map(u => `
        <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.8rem; hover: background-color: var(--bg-app);">
          <td style="padding: 12px 16px;">
            <div style="font-weight: 700; color: var(--text-primary);">${u.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${u.email}</div>
          </td>
          <td style="padding: 12px 16px; color: var(--text-secondary);">${u.department}</td>
          <td style="padding: 12px 16px;">
            <span class="badge badge-${u.badgeClass}" style="font-size: 0.68rem; font-weight: 600;">${u.designation}</span>
          </td>
          <td style="padding: 12px 16px; color: var(--text-secondary); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${u.systems}
          </td>
          <td style="padding: 12px 16px;">
            <span class="badge badge-${u.statusClass}" style="font-size: 0.65rem;">${u.status}</span>
          </td>
          <td style="padding: 12px 16px; text-align: right;">
            <div style="display: flex; gap: 6px; justify-content: flex-end;">
              <button class="table-action-btn table-action-btn-blue" onclick="window.openUserProfileDrawer('${u.id}')">View Profile</button>
              <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Updating role settings for ${u.name}...')">Update Role</button>
              ${u.actions.includes('Disable')
                ? `<button class="table-action-btn table-action-btn-red" onclick="alert('CTO SECURITY ACTION: Account ${u.name} has been disabled in SSO directory.')">Disable</button>`
                : `<button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Modify access permissions...')">Modify Access</button>`
              }
            </div>
          </td>
        </tr>
      `).join('');

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No technical leaders match active filters.</td></tr>`;
      }
    }

    // Attach search input trigger
    const searchInput = document.getElementById('userSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawDirectory();
      });
    }

    // Attach filter buttons click
    const filterBtns = document.querySelectorAll('.user-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
        
        categoryFilter = btn.getAttribute('data-category');
        drawDirectory();
      });
    });

    // Draw initial directory
    drawDirectory();
  }

  // Handle access approvals
  window.approveAccessRequest = function(id, title) {
    const item = window.portalData.identityAccess.requests.find(r => r.id === id);
    if (item) {
      item.status = 'Approved';
      item.statusClass = 'success';
      alert(`Access Request Approved: ${title}`);
      
      const el = document.getElementById(`reqStatus-${id}`);
      if (el) {
        el.className = 'badge badge-success';
        el.textContent = 'Approved';
      }
    }
  };

  // --- USER PROFILE DRAWER ---
  window.openUserProfileDrawer = function(userId) {
    const u = window.portalData.identityAccess.users.find(user => user.id === userId);
    if (!u) return;

    drawerTitle.innerHTML = `User Profile: ${u.name} <span class="badge badge-${u.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${u.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- User Information -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-address-card" style="color: var(--color-blue); font-size: 0.85rem;"></i> User Information</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Full Name:</strong> ${u.name}</div>
            <div><strong style="color: var(--text-primary);">Email Address:</strong> ${u.email}</div>
            <div><strong style="color: var(--text-primary);">Department:</strong> ${u.department}</div>
            <div><strong style="color: var(--text-primary);">Designation / Role:</strong> ${u.designation}</div>
            <div><strong style="color: var(--text-primary);">SSO Status:</strong> ${u.status}</div>
            <div><strong style="color: var(--text-primary);">Last Login:</strong> ${u.lastLogin}</div>
          </div>
        </div>

        <!-- Access Information -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-purple); font-size: 0.85rem;"></i> Access & Permissions</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Assigned Role:</strong> ${u.designation} Role</div>
            <div><strong style="color: var(--text-primary);">Accessible Systems:</strong> ${u.systems}</div>
            <div><strong style="color: var(--text-primary);">Permission Scopes:</strong> Zero-Trust access token gating enabled</div>
          </div>
        </div>

        <!-- Activity History -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--color-green); font-size: 0.85rem;"></i> Recent Activity History</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px;">
            ${u.history.map(hist => `
              <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 6px; last-of-type: border-bottom: none;">
                <div style="color: var(--text-muted); font-size: 0.65rem;">${hist.time}</div>
                <div style="margin-top: 2px; color: var(--text-primary);">${hist.action}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Identity Governance Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO GOVERNANCE: Initiating role configuration change for ${u.name}...')">Update Role</button>
          <button class="btn btn-outline" onclick="alert('CTO GOVERNANCE: Launching system permission modifier console...')">Modify Access</button>
          <button class="btn btn-outline" style="color: var(--color-red); border-color: var(--color-red);" onclick="alert('CTO SECURITY ACTION: Account ${u.name} has been disabled in SSO directory.')">Disable Account</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // DOCUMENT REPOSITORY MODULE - TECHNOLOGY KNOWLEDGE & GOVERNANCE Center
  // ==========================================================
  function renderDocumentRepositoryModule() {
    viewSubpage.innerHTML = `
      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Launching document upload interface...')"><i class="fa-solid fa-plus"></i> Upload Document</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Enforcing document verification audit...')"><i class="fa-solid fa-shield-halved"></i> Request Doc Audit</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Exporting document index metrics...')"><i class="fa-solid fa-download"></i> Export Doc Matrix</button>
      </section>

      <!-- SEARCH BAR & FILTER PILLS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem;">
        <div class="filter-group">
          <div class="search-control" style="flex: 1; max-width: 500px;">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="docSearchInput" placeholder="Search document name, technology area, owner team, keywords...">
          </div>
        </div>
        <div class="filter-group" style="gap: 6px;" id="docFilterGroup">
          <button class="btn btn-primary btn-sm doc-filter-btn" data-category="all">All Documents (18)</button>
          <button class="btn btn-outline btn-sm doc-filter-btn" data-category="Architecture">Architecture</button>
          <button class="btn btn-outline btn-sm doc-filter-btn" data-category="Engineering">Engineering</button>
          <button class="btn btn-outline btn-sm doc-filter-btn" data-category="Operations">Operations</button>
          <button class="btn btn-outline btn-sm doc-filter-btn" data-category="Security">Security</button>
          <button class="btn btn-outline btn-sm doc-filter-btn" data-category="Business Tech">Business Tech</button>
        </div>
      </div>

      <!-- SECTION 1: TECHNOLOGY KNOWLEDGE LANDSCAPE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-book-open-reader"></i> Technology Knowledge Landscape</span>
            <span class="card-subtitle">Visual knowledge category map answering: "What technology knowledge exists across InnoVibe Mobility?"</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">5 Major Knowledge Areas Active</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
            ${window.portalData.docRepository.categories.map(c => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.62rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${c.type}</span>
                  <h4 style="font-size: 0.88rem; font-weight: 800; margin-bottom: 8px;">${c.title}</h4>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
                    <div>Scope: <strong>${c.scope}</strong></div>
                    <div>Status: <span class="badge badge-${c.statusClass}" style="font-size: 0.65rem;">${c.status}</span></div>
                    <div>Lead Team: <strong>${c.lead}</strong></div>
                  </div>
                </div>
                <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('CTO Action: Browsing category files registry for ${c.title}...')">Browse Category</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 2: DOCUMENT EXPLORATION SPACE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-compass"></i> Document Exploration Space</span>
            <span class="card-subtitle">Clean discovery area displaying document metadata, ownership, versioning, and review status</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;" id="docCountText">18 Technology Records</span>
        </div>
        <div class="card-body" style="padding: 0; overflow-x: auto;">
          <table class="table" style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">
                <th style="padding: 10px 16px;">Document Name</th>
                <th style="padding: 10px 16px;">Category</th>
                <th style="padding: 10px 16px;">Owner Team</th>
                <th style="padding: 10px 16px;">Version</th>
                <th style="padding: 10px 16px;">Last Updated</th>
                <th style="padding: 10px 16px;">Review Status</th>
                <th style="padding: 10px 16px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="docExplorerTableBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 3: DOCUMENT REVIEW WORKFLOW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-code-pull-request"></i> Document Review Workflow</span>
            <span class="card-subtitle">Visual review process: Created &rarr; Technical Review &rarr; CTO Approval &rarr; Published &rarr; Periodic Review</span>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">
            Created &bull; Tech Review &bull; <strong style="color: var(--color-blue); font-weight: 700;">CTO Approval</strong> &bull; Published &bull; Periodic Review
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.docRepository.workflow.map(wf => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="font-size: 0.82rem; font-weight: 700; line-height: 1.35; max-width: 75%;">${wf.name}</h4>
                    <span class="badge badge-${wf.status === 'Expired Document' ? 'danger' : 'warning'}" style="font-size: 0.62rem;">${wf.status}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
                    <div>Priority: <strong style="color: ${wf.priority === 'High Priority' ? 'var(--color-orange)' : 'var(--text-primary)'}">${wf.priority}</strong></div>
                    <div>Timeline: <span class="badge badge-${wf.priorityClass}" style="font-size: 0.65rem;" id="wfTime-${wf.id}">${wf.time}</span></div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn ${wf.status === 'Expired Document' ? 'table-action-btn-red' : 'table-action-btn-blue'}" onclick="handleWorkflowReview('${wf.id}', '${wf.name}')">Review Now</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Assigning technical reviewer...')">Assign Reviewer</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Requesting extension for review timeline...')">Extend Date</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 4: CTO DOCUMENT GOVERNANCE CENTER -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-gavel"></i> CTO Document Governance Center</span>
            <span class="card-subtitle">Executive decision workspace for user management, permission controls, and least-privilege governance</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.docRepository.governance.map(gov => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.88rem; font-weight: 700;">${gov.category}</h4>
                    <span class="badge badge-${gov.badgeClass}" style="font-size: 0.65rem;">${gov.badge}</span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 14px;">${gov.text}</p>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-blue" style="flex: 1; justify-content: center;" onclick="alert('CTO Action: Executing ${gov.actions[0]}...')">${gov.actions[0]}</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Executing ${gov.actions[1]}...')">${gov.actions[1]}</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Executing ${gov.actions[2]}...')">${gov.actions[2]}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 5: AI KNOWLEDGE INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Knowledge Insights</span>
            <span class="card-subtitle">Automated observations, permission impact analysis, recommendations, and CTO actions</span>
          </div>
          <span class="badge badge-grey">4 Active Insights</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.docRepository.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${ins.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.4; margin-bottom: 6px;"><strong>Observation:</strong> "${ins.obs}"</p>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;"><strong>Impact:</strong> "${ins.impact}"</p>
                  <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 12px;">
                    💡 <strong>Recommendation:</strong> "${ins.rec}"
                  </div>
                </div>
                <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('AI Recommendation Action triggered: ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local filter state
    let searchVal = '';
    let categoryFilter = 'all';

    function drawExplorer() {
      const tbody = document.getElementById('docExplorerTableBody');
      const countText = document.getElementById('docCountText');
      if (!tbody) return;

      const filtered = window.portalData.docRepository.documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            doc.category.toLowerCase().includes(searchVal.toLowerCase()) ||
                            doc.owner.toLowerCase().includes(searchVal.toLowerCase()) ||
                            doc.purpose.toLowerCase().includes(searchVal.toLowerCase());
        
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
          if (categoryFilter === 'Business Tech') {
            matchesCategory = doc.category.includes('Business') || doc.category.includes('Tech');
          } else {
            matchesCategory = doc.category === categoryFilter;
          }
        }
        return matchesSearch && matchesCategory;
      });

      tbody.innerHTML = filtered.map(doc => `
        <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.8rem; hover: background-color: var(--bg-app);">
          <td style="padding: 12px 16px; max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <div style="font-weight: 700; color: var(--text-primary); cursor: pointer;" onclick="window.openDocDetailDrawer('${doc.id}')">${doc.name}</div>
          </td>
          <td style="padding: 12px 16px;">
            <span class="badge badge-${doc.categoryClass}" style="font-size: 0.68rem; font-weight: 600;">${doc.category}</span>
          </td>
          <td style="padding: 12px 16px; color: var(--text-secondary);">${doc.owner}</td>
          <td style="padding: 12px 16px; color: var(--text-secondary);">${doc.version}</td>
          <td style="padding: 12px 16px; color: var(--text-secondary);">${doc.updated}</td>
          <td style="padding: 12px 16px;">
            <span class="badge badge-${doc.statusClass}" style="font-size: 0.65rem;">${doc.status}</span>
          </td>
          <td style="padding: 12px 16px; text-align: right;">
            <div style="display: flex; gap: 6px; justify-content: flex-end;">
              <button class="table-action-btn table-action-btn-blue" onclick="window.openDocDetailDrawer('${doc.id}')">Open Document</button>
              <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Initializing baseline documentation review...')">Review</button>
              <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Sharing document...')">Share</button>
              <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Requesting document update...')">Request Update</button>
            </div>
          </td>
        </tr>
      `).join('');

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 20px;">No documents match active filters.</td></tr>`;
      }

      countText.textContent = `${filtered.length} Documents Displayed`;
    }

    // Attach search input trigger
    const searchInput = document.getElementById('docSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawExplorer();
      });
    }

    // Attach filter buttons click
    const filterBtns = document.querySelectorAll('.doc-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
        
        categoryFilter = btn.getAttribute('data-category');
        drawExplorer();
      });
    });

    // Draw initial explorer
    drawExplorer();
  }

  // Handle workflow reviews
  window.handleWorkflowReview = function(id, name) {
    const item = window.portalData.docRepository.workflow.find(w => w.id === id);
    if (item) {
      item.status = 'Approved';
      item.time = 'Published';
      item.priorityClass = 'success';
      alert(`CTO DOCUMENT ACTION: Reviewed and approved: ${name}`);
      
      const el = document.getElementById(`wfTime-${id}`);
      if (el) {
        el.className = 'badge badge-success';
        el.textContent = 'Published';
      }
    }
  };

  // --- DOCUMENT PROFILE INSPECTION DRAWER ---
  window.openDocDetailDrawer = function(docId) {
    const doc = window.portalData.docRepository.documents.find(d => d.id === docId);
    if (!doc) return;

    drawerTitle.innerHTML = `Doc Details: ${doc.category} <span class="badge badge-${doc.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${doc.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Document Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-file-invoice" style="color: var(--color-blue); font-size: 0.85rem;"></i> Document Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Title:</strong> ${doc.name}</div>
            <div><strong style="color: var(--text-primary);">Owner Team:</strong> ${doc.owner}</div>
            <div><strong style="color: var(--text-primary);">Current Version:</strong> ${doc.version}</div>
            <div><strong style="color: var(--text-primary);">Purpose Scope:</strong> ${doc.purpose}</div>
          </div>
        </div>

        <!-- Content & System Information -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-sitemap" style="color: var(--color-purple); font-size: 0.85rem;"></i> System Dependencies</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Associated Platforms:</strong> ${doc.deps}</div>
          </div>
        </div>

        <!-- Governance Details -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-green); font-size: 0.85rem;"></i> Governance Audit</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Created Date:</strong> ${doc.created}</div>
            <div><strong style="color: var(--text-primary);">Last Review Date:</strong> ${doc.lastReview}</div>
            <div><strong style="color: var(--text-primary);">Next Review Date:</strong> ${doc.nextReview}</div>
            <div><strong style="color: var(--text-primary);">SSO Gated:</strong> Certified SOC2 compliant</div>
          </div>
        </div>

        <!-- Version History -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--text-secondary); font-size: 0.85rem;"></i> Version Changes History</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px;">
            ${doc.history.map(h => `
              <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 6px; last-of-type: border-bottom: none;">
                <div style="color: var(--text-muted); font-size: 0.65rem;">Version: ${h.version} &bull; ${h.date}</div>
                <div style="margin-top: 2px; color: var(--text-primary);">"${h.desc}"</div>
                <div style="font-size: 0.7rem; color: var(--text-muted); text-align: right;">by ${h.author}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Governance Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO GOVERNANCE: Approved technology record baseline: ${doc.name}')">Approve Document</button>
          <button class="btn btn-outline" onclick="alert('CTO GOVERNANCE: Requested changes notification sent to owners.')">Request Changes</button>
          <button class="btn btn-outline" style="color: var(--color-red); border-color: var(--color-red);" onclick="alert('CTO GOVERNANCE: Document archived.')">Archive</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // REPORTS & ANALYTICS MODULE - CTO TECHNOLOGY REVIEW CENTER
  // ==========================================================
  function renderReportsAnalyticsModule() {
    viewSubpage.innerHTML = `
      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Launching report creation wizard...')"><i class="fa-solid fa-plus"></i> Create Report</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Triggering system-wide diagnostics run...')"><i class="fa-solid fa-flask"></i> Run Diagnostics</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Exporting analytical summary metrics report...')"><i class="fa-solid fa-download"></i> Export Analytics</button>
      </section>

      <!-- SECTION 1: TECHNOLOGY EXECUTIVE HEALTH VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-square-poll-vertical"></i> Technology Executive Health View</span>
            <span class="card-subtitle">Snapshot of health, trend direction, attention level, and technology maturity across domains</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">6 Domains Gated</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px;">
            ${window.portalData.reportsAnalytics.healthView.map(h => `
              <div class="card" style="padding: 1.25rem;">
                <span style="font-size: 0.62rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${h.domain}</span>
                <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                  <div>Health: <strong style="color: ${h.healthClass === 'success' ? 'var(--color-green)' : 'var(--color-blue)'};">${h.health}</strong></div>
                  <div>Trend: <strong style="color: ${h.trendClass === 'success' ? 'var(--color-green)' : (h.trendClass === 'warning' ? 'var(--color-orange)' : 'var(--color-blue)')};">${h.trend}</strong></div>
                  <div>Attention: <strong>${h.attention}</strong></div>
                  <div style="margin-top: 6px;"><span class="badge badge-info" style="font-size: 0.62rem;">${h.maturity}</span></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 2: TECHNOLOGY PERFORMANCE REVIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-award"></i> Technology Performance Review</span>
            <span class="card-subtitle">Evaluate technology effectiveness, risk scores, and department-level optimization strategies</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">5 Department Reviews</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
            ${window.portalData.reportsAnalytics.performanceReview.map(p => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.88rem; font-weight: 800;">${p.area}</h4>
                    <span class="badge badge-${p.badgeClass}" style="font-size: 0.65rem;">${p.badge}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
                    <div style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.3;">Metrics: ${p.metrics}</div>
                    <div style="margin-top: 4px;">Status: <strong style="color: var(--text-primary);">${p.status}</strong></div>
                    <div>Trend: <strong style="color: ${p.trendClass === 'success' ? 'var(--color-green)' : 'var(--color-blue)'}">${p.trend}</strong></div>
                    <div>Improvement: <strong>${p.improvement}</strong></div>
                    <div>Risk: <span class="badge badge-${p.riskClass === 'success' ? 'success' : 'warning'}" style="font-size: 0.62rem;">${p.risk}</span></div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-neutral" style="width: 100%;" onclick="alert('${p.improvementDetails}')">Review Details</button>
                  <button class="table-action-btn table-action-btn-blue" style="width: 100%;" onclick="alert('CTO Action: Creating improvement plan for ${p.area}...')">Create Plan</button>
                  <button class="table-action-btn table-action-btn-neutral" style="width: 100%;" onclick="alert('CTO Action: Assigning task force to improvement plan...')">Assign Team</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 3: TECHNOLOGY INTELLIGENCE LIBRARY -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-folder-open"></i> Technology Intelligence Library</span>
            <span class="card-subtitle">Exploration workspace across Engineering, Infrastructure, AI, and Security Intelligence pillars</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">12 Published Intelligence Reports</span>
        </div>
        <div class="card-body" style="padding: 0; overflow-x: auto;">
          <table class="table" style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">
                <th style="padding: 10px 16px;">Report Title</th>
                <th style="padding: 10px 16px;">Intelligence Pillar</th>
                <th style="padding: 10px 16px;">Last Updated</th>
                <th style="padding: 10px 16px;">Owner</th>
                <th style="padding: 10px 16px;">Status</th>
                <th style="padding: 10px 16px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${window.portalData.reportsAnalytics.intelligenceLibrary.map(rep => `
                <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.8rem;">
                  <td style="padding: 12px 16px; font-weight: 700; color: var(--text-primary); cursor: pointer;" onclick="window.openReportDetailDrawer('${rep.id}')">${rep.title}</td>
                  <td style="padding: 12px 16px;">
                    <span class="badge badge-${rep.pillarClass}" style="font-size: 0.68rem; font-weight: 600;">${rep.pillar}</span>
                  </td>
                  <td style="padding: 12px 16px; color: var(--text-secondary);">${rep.updated}</td>
                  <td style="padding: 12px 16px; color: var(--text-secondary);">${rep.owner}</td>
                  <td style="padding: 12px 16px;">
                    <span class="badge badge-${rep.statusClass}" style="font-size: 0.65rem;">${rep.status}</span>
                  </td>
                  <td style="padding: 12px 16px; text-align: right;">
                    <div style="display: flex; gap: 6px; justify-content: flex-end;">
                      <button class="table-action-btn table-action-btn-blue" onclick="window.openReportDetailDrawer('${rep.id}')">Open Summary</button>
                      <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Comparing historical trends...')">Compare Trends</button>
                      <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Sharing insights summary...')">Share Insights</button>
                      <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Creating action item tracker...')">Create Action</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 4: TECHNOLOGY TREND EXPLORER -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-chart-line"></i> Technology Trend Explorer</span>
            <span class="card-subtitle">Interactive trend analysis across platform performance, engineering delivery, and business technology growth</span>
          </div>
        </div>
        <div class="card-body">
          <!-- Chart Toolbar Filters -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
            <div style="display: flex; gap: 4px;">
              <button class="btn btn-outline btn-sm time-filter-btn" style="padding: 2px 8px; font-size: 0.68rem;">1M</button>
              <button class="btn btn-outline btn-sm time-filter-btn" style="padding: 2px 8px; font-size: 0.68rem;">3M</button>
              <button class="btn btn-primary btn-sm time-filter-btn" style="padding: 2px 8px; font-size: 0.68rem;">6M</button>
              <button class="btn btn-outline btn-sm time-filter-btn" style="padding: 2px 8px; font-size: 0.68rem;">1Y</button>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-primary btn-sm trend-filter-btn" data-trend="Platform Trends">Platform Trends</button>
              <button class="btn btn-outline btn-sm trend-filter-btn" data-trend="Engineering Trends">Engineering Trends</button>
              <button class="btn btn-outline btn-sm trend-filter-btn" data-trend="Business Tech Trends">Business Tech Trends</button>
              <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Exporting trend data as CSV...')"><i class="fa-solid fa-download"></i> Export CSV</button>
            </div>
          </div>

          <!-- Trend Workspace Grid -->
          <div style="display: grid; grid-template-columns: 280px 1fr; gap: 14px; align-items: stretch;">
            <!-- Mini-Metrics column -->
            <div style="display: flex; flex-direction: column; gap: 10px;" id="miniMetricsContainer">
              <!-- Dynamically updated -->
              <div class="card" style="padding: 14px; background-color: var(--bg-app);">
                <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">SYSTEM RELIABILITY SLA</div>
                <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">99.99%</div>
                <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">+0.04% vs Q2 target</div>
              </div>
              <div class="card" style="padding: 14px; background-color: var(--bg-app);">
                <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">APPLICATION RESPONSE TIME</div>
                <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">18ms <span style="font-size: 0.78rem; font-weight: 500;">(p99)</span></div>
                <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">-12% latency drop</div>
              </div>
              <div class="card" style="padding: 14px; background-color: var(--bg-app);">
                <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">INFRASTRUCTURE GROWTH</div>
                <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">+14.2%</div>
                <div style="font-size: 0.72rem; color: var(--color-blue); font-weight: 600; margin-top: 2px;">Managed EKS cluster expansion</div>
              </div>
            </div>
            <!-- Canvas container -->
            <div class="card" style="padding: 1rem; min-height: 240px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px solid var(--border-color);">
                <span id="chartLabelHeader">Month: Jul (Current) &bull; SLA: 99.99% &bull; Latency: 18ms</span>
                <span id="chartMilestoneHeader" style="font-weight: 600;">Milestone: Automated EKS Autoscale Gating</span>
              </div>
              <div style="flex: 1; position: relative;">
                <canvas id="reportsTrendChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: STRATEGIC DECISION SUPPORT CENTER -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-compass-drafting"></i> Strategic Decision Support Center</span>
            <span class="card-subtitle">Review business operations situations, evaluate performance impacts, and trigger capacity decisions</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            ${window.portalData.reportsAnalytics.decisions.map(dec => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Technology Area: ${dec.area}</h4>
                    <span class="badge badge-${dec.status === 'Approved' ? 'success' : 'warning'}" style="font-size: 0.65rem;" id="decBadge-${dec.id}">${dec.status}</span>
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
                    <div><strong>Situation:</strong> "${dec.situation}"</div>
                    <div><strong>Impact:</strong> "${dec.impact}"</div>
                    <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-top: 6px;">
                      💡 <strong>Recommended Decision:</strong> "${dec.recommendation}"
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-blue" onclick="handleDecisionApproval('${dec.id}', '${dec.area}')" id="decApprBtn-${dec.id}">Approve Decision</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Creating strategic action plan...')">Create Action Plan</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Assigning strategic owner...')">Assign Owner</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 6: TECHNOLOGY INITIATIVE TRACKING -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-list-check"></i> Technology Initiative Tracking</span>
            <span class="card-subtitle">Strategic progress tracking across completed, ongoing, and upcoming technology initiatives</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">6 Strategic Initiatives</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            <!-- Completed -->
            <div>
              <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--color-green); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-check"></i> Completed Initiatives</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${window.portalData.reportsAnalytics.initiatives.completed.map(init => `
                  <div class="card" style="padding: 12px; background-color: var(--bg-app);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="font-size: 0.8rem; color: var(--text-primary);">${init.name}</strong>
                      <span class="badge badge-success" style="font-size: 0.62rem;">${init.status}</span>
                    </div>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 6px; line-height: 1.3;">Business Impact: ${init.impact}</div>
                    <div style="display: flex; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 8px;">
                      <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.65rem;" onclick="alert('CTO Action: Reviewing completed baseline metrics...')">Review Initiative</button>
                      <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.65rem;" onclick="alert('CTO Action: Updating initiative status log...')">Update Status</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Ongoing -->
            <div>
              <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--color-blue); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-spinner fa-spin"></i> Ongoing Initiatives</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${window.portalData.reportsAnalytics.initiatives.ongoing.map(init => `
                  <div class="card" style="padding: 12px; background-color: var(--bg-app);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="font-size: 0.8rem; color: var(--text-primary);">${init.name}</strong>
                      <span class="badge badge-info" style="font-size: 0.62rem;">${init.status}</span>
                    </div>
                    <!-- Progress Bar -->
                    <div style="margin-top: 6px; background-color: var(--border-color); height: 5px; border-radius: 3px; overflow: hidden;">
                      <div style="background-color: var(--color-blue); width: ${init.progress}%; height: 100%;"></div>
                    </div>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 6px; line-height: 1.3;">Business Impact: ${init.impact}</div>
                    <div style="display: flex; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 8px;">
                      <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.65rem;" onclick="alert('CTO Action: Tracking active sprints status...')">Track Progress</button>
                      <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.65rem;" onclick="alert('CTO Action: Updating initiative status log...')">Update Status</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Upcoming -->
            <div>
              <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-calendar"></i> Upcoming Initiatives</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                ${window.portalData.reportsAnalytics.initiatives.upcoming.map(init => `
                  <div class="card" style="padding: 12px; background-color: var(--bg-app);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="font-size: 0.8rem; color: var(--text-primary);">${init.name}</strong>
                      <span class="badge badge-grey" style="font-size: 0.62rem;">${init.status}</span>
                    </div>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 6px; line-height: 1.3;">Business Impact: ${init.impact}</div>
                    <div style="display: flex; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 8px;">
                      <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.65rem;" onclick="alert('CTO Action: Reviewing upcoming budget parameters...')">Review Initiative</button>
                      <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.65rem;" onclick="alert('CTO Action: Updating initiative status log...')">Update Status</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 7: AI ANALYTICS INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Analytics Insights</span>
            <span class="card-subtitle">Automated executive observations, technology impact analysis, recommendations, and CTO actions</span>
          </div>
          <span class="badge badge-grey">4 Active Insights</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.reportsAnalytics.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${ins.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.4; margin-bottom: 6px;"><strong>Observation:</strong> "${ins.obs}"</p>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;"><strong>Impact:</strong> "${ins.impact}"</p>
                  <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 12px;">
                    💡 <strong>Recommendation:</strong> "${ins.rec}"
                  </div>
                </div>
                <button class="${ins.action === 'Analyse' || ins.action === 'Approve' ? 'btn btn-primary' : 'btn btn-outline'} btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('AI Recommendation Action triggered: ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local Chart Trend Filters
    const trendBtns = document.querySelectorAll('.trend-filter-btn');
    trendBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        trendBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');

        const trendType = btn.getAttribute('data-trend');
        
        // Dynamically update mini-metrics column & header
        const metricsContainer = document.getElementById('miniMetricsContainer');
        const chartLabelHeader = document.getElementById('chartLabelHeader');
        const chartMilestoneHeader = document.getElementById('chartMilestoneHeader');

        if (trendType === 'Platform Trends') {
          metricsContainer.innerHTML = `
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">SYSTEM RELIABILITY SLA</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">99.99%</div>
              <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">+0.04% vs Q2 target</div>
            </div>
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">APPLICATION RESPONSE TIME</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">18ms <span style="font-size: 0.78rem; font-weight: 500;">(p99)</span></div>
              <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">-12% latency drop</div>
            </div>
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">INFRASTRUCTURE GROWTH</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">+14.2%</div>
              <div style="font-size: 0.72rem; color: var(--color-blue); font-weight: 600; margin-top: 2px;">Managed EKS cluster expansion</div>
            </div>
          `;
          chartLabelHeader.innerHTML = `Month: Jul (Current) &bull; SLA: 99.99% &bull; Latency: 18ms`;
          chartMilestoneHeader.innerHTML = `Milestone: Automated EKS Autoscale Gating`;
        } else if (trendType === 'Engineering Trends') {
          metricsContainer.innerHTML = `
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">RELEASE FREQUENCY</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">24 / week</div>
              <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">+20% sprint commits velocity</div>
            </div>
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">CODE TEST COVERAGE</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">88.5%</div>
              <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">+2.4% debt paydown</div>
            </div>
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">BUILD SUCCESS RATE</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">98.2%</div>
              <div style="font-size: 0.72rem; color: var(--color-blue); font-weight: 600; margin-top: 2px;">Canary auto-promoted</div>
            </div>
          `;
          chartLabelHeader.innerHTML = `Month: Jul (Current) &bull; Releases: 24 &bull; Success: 98.2%`;
          chartMilestoneHeader.innerHTML = `Milestone: CI/CD Runner Capacity Optimized`;
        } else {
          metricsContainer.innerHTML = `
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">PLATFORM ADOPTION</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">94%</div>
              <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">SSO Active Passkey MFA</div>
            </div>
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">API INTEGRATIONS</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">18 Services</div>
              <div style="font-size: 0.72rem; color: var(--color-green); font-weight: 600; margin-top: 2px;">100% mTLS certified gateway</div>
            </div>
            <div class="card" style="padding: 14px; background-color: var(--bg-app);">
              <div style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">TECH IMPACT SCORE</div>
              <div style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">9.4 / 10</div>
              <div style="font-size: 0.72rem; color: var(--color-blue); font-weight: 600; margin-top: 2px;">Zero P1 incident reports</div>
            </div>
          `;
          chartLabelHeader.innerHTML = `Month: Jul (Current) &bull; Adoption: 94% &bull; Integrations: 18`;
          chartMilestoneHeader.innerHTML = `Milestone: Enterprise Core Infrastructure Complete`;
        }

        window.portalCharts.initReportsCharts(trendType);
      });
    });

    // Time filters toggle visual state
    const timeBtns = document.querySelectorAll('.time-filter-btn');
    timeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timeBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');
      });
    });

    // Draw initial charts
    window.portalCharts.initReportsCharts('Platform Trends');
  }

  // Handle decisions approvals
  window.handleDecisionApproval = function(id, area) {
    const dec = window.portalData.reportsAnalytics.decisions.find(d => d.id === id);
    if (dec) {
      dec.status = 'Approved';
      alert(`CTO STRATEGIC DECISION: Approved decision pathway for ${area}`);
      
      const badge = document.getElementById(`decBadge-${id}`);
      if (badge) {
        badge.className = 'badge badge-success';
        badge.textContent = 'Approved';
      }
    }
  };

  // --- REPORT DETAILS INSPECTOR DRAWER ---
  window.openReportDetailDrawer = function(repId) {
    const rep = window.portalData.reportsAnalytics.intelligenceLibrary.find(r => r.id === repId);
    if (!rep) return;

    drawerTitle.innerHTML = `Report: ${rep.pillar} <span class="badge badge-${rep.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${rep.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Report Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-file-invoice" style="color: var(--color-blue); font-size: 0.85rem;"></i> Report Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Report Title:</strong> ${rep.title}</div>
            <div><strong style="color: var(--text-primary);">Pillar:</strong> ${rep.pillar}</div>
            <div><strong style="color: var(--text-primary);">Lead Author:</strong> ${rep.owner}</div>
            <div><strong style="color: var(--text-primary);">Last Updated:</strong> ${rep.updated}</div>
          </div>
        </div>

        <!-- Detailed Summary -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-align-left" style="color: var(--color-purple); font-size: 0.85rem;"></i> Executive Summary</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45;">
            ${rep.summary}
          </div>
        </div>

        <!-- History & Contributions -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--text-secondary); font-size: 0.85rem;"></i> Contribution Log</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px;">
            ${rep.history.map(h => `
              <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 6px; last-of-type: border-bottom: none;">
                <div style="color: var(--text-muted); font-size: 0.65rem;">Version: ${h.version} &bull; ${h.date}</div>
                <div style="margin-top: 2px; color: var(--text-primary);">"${h.desc}"</div>
                <div style="font-size: 0.7rem; color: var(--text-muted); text-align: right;">by ${h.author}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Executive Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO INTEL ACTION: Approved report baseline parameters: ${rep.title}')">Approve Report Summary</button>
          <button class="btn btn-outline" onclick="alert('CTO INTEL ACTION: PDF report generated successfully.')">Export as PDF</button>
          <button class="btn btn-outline" onclick="alert('CTO INTEL ACTION: Requesting updates from lead authors...')">Request Revision</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // INTEGRATIONS MODULE - DIGITAL CONNECTIVITY COMMAND CENTER
  // ==========================================================
  function renderIntegrationsModule() {
    viewSubpage.innerHTML = `
      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Launching integration setup wizard...')"><i class="fa-solid fa-plus"></i> Create Integration</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Displaying integration architectural model...')"><i class="fa-solid fa-sitemap"></i> Integration Architecture</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Exporting system integration matrix...')"><i class="fa-solid fa-download"></i> Export Integration Matrix</button>
      </section>

      <!-- SEARCH BAR & FILTER PILLS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem;">
        <div class="filter-group">
          <div class="search-control" style="flex: 1; max-width: 500px;">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="intSearchInput" placeholder="Search system, endpoint, partner, protocol (mTLS, REST, gRPC)...">
          </div>
        </div>
        <div class="filter-group" style="gap: 6px;" id="intFilterGroup">
          <button class="btn btn-primary btn-sm int-filter-btn" data-category="all">All Integrations (38)</button>
          <button class="btn btn-outline btn-sm int-filter-btn" data-category="internal">Internal Ecosystem</button>
          <button class="btn btn-outline btn-sm int-filter-btn" data-category="edge">IoT & Vehicle Edge</button>
          <button class="btn btn-outline btn-sm int-filter-btn" data-category="external">External Partners</button>
        </div>
      </div>

      <!-- SECTION 1: INTEGRATION ECOSYSTEM MAP -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-diagram-project"></i> Integration Ecosystem Map</span>
            <span class="card-subtitle">Interactive topology map connecting 6 core ecosystem nodes across internal & external boundaries</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--color-green); font-weight: 600;">● Interactive Live Graph</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;" id="intEcosystemGrid">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 2: CONNECTION HEALTH FLOW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wave-square"></i> Connection Health Flow</span>
            <span class="card-subtitle">Real-time monitoring of active, healthy, delayed, and failed data exchange streams</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <span class="badge badge-success" style="font-size: 0.65rem;">34 Healthy</span>
            <span class="badge badge-warning" style="font-size: 0.65rem;">3 Delayed</span>
            <span class="badge badge-danger" style="font-size: 0.65rem;">1 Failed</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.integrations.healthFlow.map(f => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.88rem; font-weight: 800;">${f.name}</h4>
                    <span class="badge badge-${f.badgeClass}" style="font-size: 0.65rem;">${f.badge}</span>
                  </div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
                    <div style="font-size: 0.72rem; color: var(--text-muted);">Status: ${f.status}</div>
                    <div>Last Sync: <strong>${f.sync}</strong></div>
                    <div>Performance: <strong class="text-${f.latencyClass}">${f.latency}</strong></div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 8px;">
                  <span style="font-size: 0.68rem; color: var(--text-muted);">${f.type}</span>
                  <button class="table-action-btn table-action-btn-blue" onclick="window.openIntegrationDetailDrawer('${f.id}')">Inspect</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 3: CTO INTEGRATION GOVERNANCE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-gavel"></i> CTO Integration Governance</span>
            <span class="card-subtitle">Executive decision workspace across lifecycle, dependency management, and partner connectivity</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            <!-- Lifecycle -->
            <div class="card" style="padding: 1.25rem;">
              <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-arrows-spin"></i> Integration Lifecycle</h4>
              <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">Approve new integrations, authorise external connections, and retire legacy pipelines.</p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-primary" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Opening Provision wizard for new gateway endpoints...')"><i class="fa-solid fa-circle-check"></i> Approve New Integrations</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Reviewing external B2B connection link requests...')">Approve External Connections</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Loading gateway routing difference logs...')">Review Integration Changes</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem; color: var(--color-red); border-color: rgba(255,59,48,0.25);" onclick="alert('CTO Decision: Scanning for redundant webhook subscriptions...')">Retire Unused Integrations</button>
              </div>
            </div>

            <!-- Dependency -->
            <div class="card" style="padding: 1.25rem;">
              <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-sitemap"></i> Dependency Management</h4>
              <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">Evaluate critical system dependencies and authorize architectural enhancements.</p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Triggering microservice dependencies review audit...')">Review Critical Dependencies</button>
                <button class="btn btn-primary" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Approved architectural layout update for Fleet gateway peering.')"><i class="fa-solid fa-circle-check"></i> Approve Architecture Changes</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Requesting optimization on Kafka broker parameters...')">Request Improvement</button>
              </div>
            </div>

            <!-- Partner -->
            <div class="card" style="padding: 1.25rem;">
              <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-handshake"></i> Partner Integration</h4>
              <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">Govern third-party connectivity, approve data sharing scopes, and verify SLAs.</p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Reviewing external REST endpoint health credentials...')">Review Partner Connectivity</button>
                <button class="btn btn-primary" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Approved Stripe B2B checkout sync data scope modification.')"><i class="fa-solid fa-circle-check"></i> Approve Data Sharing</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Scanning partner webhook latency metrics...')">Monitor Reliability</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 4: INTEGRATION RISK VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> Integration Risk View</span>
            <span class="card-subtitle">Identify integration performance bottlenecks, impact analysis, and resolution triggers</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.integrations.risks.map(r => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <span style="font-size: 0.62rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${r.badge}</span>
                    <span class="badge badge-warning" style="font-size: 0.62rem;" id="riskStatus-${r.id}">${r.status}</span>
                  </div>
                  <h4 style="font-size: 0.82rem; font-weight: 800; line-height: 1.35; margin-bottom: 8px;">"${r.title}"</h4>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
                    <div>Impact: <strong>${r.impact}</strong></div>
                    <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-top: 6px;">
                      💡 Recommendation: "${r.recommendation}"
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Assigning team to risk ticket...')">Assign Team</button>
                  <button class="table-action-btn table-action-btn-blue" onclick="handleRiskInvestigation('${r.id}', '${r.title}')" id="riskInvestBtn-${r.id}">Create Investigation</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Monitoring latency traces...')">Monitor</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 5: AI INTEGRATION INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Integration Insights</span>
            <span class="card-subtitle">Automated integration observations, impact analysis, and CTO decision triggers</span>
          </div>
          <span class="badge badge-grey">4 Active Insights</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.integrations.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${ins.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.4; margin-bottom: 6px;"><strong>Observation:</strong> "${ins.obs}"</p>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;"><strong>Impact:</strong> "${ins.impact}"</p>
                  <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 12px;">
                    💡 <strong>Recommendation:</strong> "${ins.rec}"
                  </div>
                </div>
                <button class="${ins.action === 'Create Investigation' || ins.action === 'Approve Expansion' ? 'btn btn-primary' : 'btn btn-outline'} btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('AI Recommendation Action triggered: ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local search & filtering state
    let searchVal = '';
    let categoryFilter = 'all';

    function drawEcosystemGrid() {
      const grid = document.getElementById('intEcosystemGrid');
      if (!grid) return;

      const filtered = window.portalData.integrations.ecosystemMap.filter(item => {
        const matchesSearch = item.type.toLowerCase().includes(searchVal.toLowerCase()) ||
                            item.node.toLowerCase().includes(searchVal.toLowerCase()) ||
                            item.proto.toLowerCase().includes(searchVal.toLowerCase());
        
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
          if (categoryFilter === 'internal') {
            matchesCategory = item.typeBadge === 'Core Hub' || item.typeBadge === 'AI Diagnostics' || item.typeBadge === 'AWS EKS Cluster';
          } else if (categoryFilter === 'edge') {
            matchesCategory = item.typeBadge === 'iOS / Android' || item.typeBadge === 'EV Edge Telematics';
          } else if (categoryFilter === 'external') {
            matchesCategory = item.typeBadge === 'B2B Gateways';
          }
        }
        return matchesSearch && matchesCategory;
      });

      grid.innerHTML = filtered.map(item => `
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary);">${item.type}</h4>
              <span class="badge badge-${item.typeClass}" style="font-size: 0.65rem;">${item.typeBadge}</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
              <div>Connected Node: <strong>${item.node}</strong></div>
              <div>Data Flow Direction: <span style="color: var(--color-blue); font-weight: 600;">${item.flow}</span></div>
              <div>Integration Type: <span class="badge badge-info" style="font-size: 0.62rem;">${item.proto}</span></div>
              <div>Connection Status: <strong style="color: ${item.statusClass === 'success' ? 'var(--color-green)' : 'var(--color-orange)'}">${item.status}</strong></div>
            </div>
          </div>
          <button class="table-action-btn table-action-btn-neutral" style="width: 100%;" onclick="window.openIntegrationDetailDrawer('${item.id}')">Inspect Topology</button>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 20px;">No connected systems match active filters.</div>`;
      }
    }

    // Attach search input trigger
    const searchInput = document.getElementById('intSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawEcosystemGrid();
      });
    }

    // Attach filter buttons click
    const filterBtns = document.querySelectorAll('.int-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');

        categoryFilter = btn.getAttribute('data-category');
        drawEcosystemGrid();
      });
    });

    // Draw initial grid
    drawEcosystemGrid();
  }

  // Handle risk investigation triggers
  window.handleRiskInvestigation = function(id, title) {
    const risk = window.portalData.integrations.risks.find(r => r.id === id);
    if (risk) {
      risk.status = 'Investigating';
      alert(`CTO INTEGRATION RISK: Opened high-priority incident investigation for: ${title}`);
      
      const badge = document.getElementById(`riskStatus-${id}`);
      if (badge) {
        badge.className = 'badge badge-info';
        badge.textContent = 'Investigating';
      }
    }
  };

  // --- INTEGRATION PROFILE INSPECTOR DRAWER ---
  window.openIntegrationDetailDrawer = function(id) {
    // Search both healthFlow and ecosystemMap for detail values
    let item = window.portalData.integrations.healthFlow.find(f => f.id === id);
    if (!item) {
      const eco = window.portalData.integrations.ecosystemMap.find(e => e.id === id);
      if (eco) {
        item = {
          id: eco.id,
          name: eco.type,
          badge: eco.typeBadge,
          badgeClass: eco.typeClass,
          status: eco.status,
          sync: 'Active telemetry stream',
          latency: '24ms Latency',
          latencyClass: 'blue',
          type: eco.proto,
          purpose: `Ecosystem interface communicating parameters with ${eco.node}.`,
          owner: 'Shared Engineering Services',
          auth: 'HMAC Webhook verification',
          rate: '0.00%'
        };
      }
    }

    if (!item) return;

    drawerTitle.innerHTML = `Integration: ${item.badge} <span class="badge badge-${item.badgeClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.badge}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Integration Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-cube" style="color: var(--color-blue); font-size: 0.85rem;"></i> Integration Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Integration Name:</strong> ${item.name}</div>
            <div><strong style="color: var(--text-primary);">Purpose:</strong> ${item.purpose}</div>
            <div><strong style="color: var(--text-primary);">Owner Team:</strong> ${item.owner}</div>
          </div>
        </div>

        <!-- Data Exchange -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-right-left" style="color: var(--color-purple); font-size: 0.85rem;"></i> Data Exchange</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Data Format:</strong> JSON / Protobuf logs</div>
            <div><strong style="color: var(--text-primary);">Sync Frequency:</strong> Real-time streaming push</div>
            <div><strong style="color: var(--text-primary);">Last Successful Sync:</strong> ${item.sync}</div>
          </div>
        </div>

        <!-- Technical Details -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-gears" style="color: var(--color-green); font-size: 0.85rem;"></i> Technical Connection</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">API Protocol:</strong> ${item.type}</div>
            <div><strong style="color: var(--text-primary);">Authentication:</strong> ${item.auth}</div>
            <div><strong style="color: var(--text-primary);">SSO Status:</strong> Active certificate validation</div>
          </div>
        </div>

        <!-- Performance -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bolt" style="color: var(--color-orange); font-size: 0.85rem;"></i> Performance SLA</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">API Response Time:</strong> ${item.latency}</div>
            <div><strong style="color: var(--text-primary);">Reliability SLA:</strong> 99.99% operational</div>
            <div><strong style="color: var(--text-primary);">Error Rate (5xx):</strong> ${item.rate}</div>
          </div>
        </div>

        <!-- Executive Governance Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO CONNECTIVITY: Approved gateway change settings for ${item.name}')">Approve Change</button>
          <button class="btn btn-outline" onclick="alert('CTO CONNECTIVITY: Technical baseline review log triggered.')">Review Connection</button>
          <button class="btn btn-outline" style="color: var(--color-red); border-color: var(--color-red);" onclick="alert('CTO CONNECTIVITY: Disabled connection endpoint: ${item.name}')">Disable Connection</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // CYBERSECURITY MODULE - CTO CYBERSECURITY COMMAND CENTER
  // ==========================================================
  function renderCybersecurityModule() {
    viewSubpage.innerHTML = `
      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Create new incident form opened.')"><i class="fa-solid fa-plus"></i> Create Incident</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Triggering system-wide vulnerability and compliance audit scan...')"><i class="fa-solid fa-shield-halved"></i> Request Security Audit</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Enforcing security patch rollouts to staging clusters...')"><i class="fa-solid fa-cloud-arrow-up"></i> Approve Security Update</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Exporting zero-trust access log parameters...')"><i class="fa-solid fa-download"></i> Export Audit Log</button>
      </section>

      <!-- SEARCH BAR & FILTER PILLS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem;">
        <div class="filter-group">
          <div class="search-control" style="flex: 1; max-width: 500px;">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="secSearchInput" placeholder="Search security domain, threat vector, active incident...">
          </div>
        </div>
        <div class="filter-group" style="gap: 6px;" id="secFilterGroup">
          <button class="btn btn-primary btn-sm sec-filter-btn" data-category="all">All Security Domains (5)</button>
          <button class="btn btn-outline btn-sm sec-filter-btn" data-category="cloud">Cloud Security</button>
          <button class="btn btn-outline btn-sm sec-filter-btn" data-category="app">App Security</button>
          <button class="btn btn-outline btn-sm sec-filter-btn" data-category="api">API Security</button>
          <button class="btn btn-outline btn-sm sec-filter-btn" data-category="data-device">Data & Device</button>
        </div>
      </div>

      <!-- SECTION 1: SECURITY POSTURE VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-user-shield"></i> Security Posture View</span>
            <span class="card-subtitle">Executive query: "How secure is the complete ecosystem?"</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--color-green); font-weight: 600;">● Zero Critical Breaches</span>
        </div>
        <div class="card-body" style="display: flex; gap: 1.5rem; align-items: stretch; flex-wrap: wrap;">
          
          <!-- Large Central indicator panel -->
          <div class="card" style="flex: 1; min-width: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; background: var(--bg-app); border: 1px solid var(--border-color);">
            <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem;">SECURITY POSTURE</span>
            <div style="position: relative; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center;">
              <svg width="100%" height="100%" viewBox="0 0 100 100" style="transform: rotate(-90deg);">
                <circle cx="50" cy="50" r="40" stroke="var(--border-color)" stroke-width="8" fill="transparent" />
                <circle cx="50" cy="50" r="40" stroke="var(--color-green)" stroke-width="8" fill="transparent" 
                        stroke-dasharray="251.2" stroke-dashoffset="10.05" style="stroke-linecap: round; transition: stroke-dashoffset 0.8s ease;" />
              </svg>
              <div style="position: absolute; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <span style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em; color: var(--text-primary);">96%</span>
                <span style="font-size: 0.7rem; color: var(--color-green); font-weight: 700;">Protected</span>
              </div>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 1.25rem; text-align: center; font-weight: 500;">5 Connected Security Areas Assessed<br><span style="color: var(--color-green);">Nominal</span></p>
          </div>

          <!-- Domain list grid -->
          <div style="flex: 3; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;" id="secPostureGrid">
            <!-- Dynamically populated -->
          </div>

        </div>
      </section>

      <!-- SECTION 2: THREAT LANDSCAPE MAP -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-radar"></i> Threat Landscape Map</span>
            <span class="card-subtitle">Real-time visual monitoring of active threats, suspicious activities, security warnings, and resolved issues</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <span class="badge badge-danger" style="font-size: 0.65rem;">Critical Zone</span>
            <span class="badge badge-warning" style="font-size: 0.65rem;">Warning Zone</span>
            <span class="badge badge-info" style="font-size: 0.65rem;">Suspicious Zone</span>
            <span class="badge badge-success" style="font-size: 0.65rem;">Resolved Zone</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.cybersecurity.threats.map(t => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid var(--color-${t.zoneClass === 'danger' ? 'red' : t.zoneClass === 'warning' ? 'orange' : t.zoneClass === 'info' ? 'blue' : 'green'});">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <span style="font-size: 0.62rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${t.zone}</span>
                    <span class="badge badge-${t.zoneClass}" style="font-size: 0.62rem;">${t.badge}</span>
                  </div>
                  <h4 style="font-size: 0.82rem; font-weight: 800; line-height: 1.35; margin-bottom: 6px;">"${t.title}"</h4>
                  <p style="font-size: 0.74rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">${t.desc}</p>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 8px; justify-content: space-between;">
                  <button class="table-action-btn table-action-btn-${t.zoneClass === 'danger' || t.zoneClass === 'warning' ? 'blue' : 'neutral'}" onclick="alert('CTO Action triggered: ${t.action1}')" style="flex: 1; justify-content: center; font-size: 0.68rem; padding: 4px 6px;">${t.action1}</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action triggered: ${t.action2}')" style="flex: 1; justify-content: center; font-size: 0.68rem; padding: 4px 6px;">${t.action2}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 3: SECURITY RISK ASSESSMENT -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> Security Risk Assessment</span>
            <span class="card-subtitle">Identify technology risks, evaluate impact, system scope, and trigger remediation actions</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.cybersecurity.risks.map(r => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <span style="font-size: 0.62rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${r.badge}</span>
                    <span class="badge badge-${r.impactClass}" style="font-size: 0.62rem;">Impact: ${r.impact}</span>
                  </div>
                  <h4 style="font-size: 0.88rem; font-weight: 800; margin-bottom: 8px;">${r.title}</h4>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
                    <div>Affected System: <strong style="color: var(--text-primary);">${r.system}</strong></div>
                    <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-top: 4px;">
                      💡 Recommendation: "${r.recommendation}"
                    </div>
                  </div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Security ticket assigned to SecOps Squad.')">Assign Security Team</button>
                  <button class="table-action-btn table-action-btn-blue" onclick="handleRemediationPlan('${r.id}', '${r.title}')" id="remedBtn-${r.id}">Create Remediation Plan</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Risk marked Under Review.')">Mark Under Review</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 4: SECURITY INCIDENT RESPONSE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-shield-virus"></i> Security Incident Response</span>
            <span class="card-subtitle">Incident workflow timeline and CTO management decision triggers</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="alert('CTO Decision: Opening new security incident reporting form...')"><i class="fa-solid fa-plus"></i> Create Incident</button>
        </div>
        <div class="card-body">
          <!-- Timeline Header -->
          <div style="display: flex; justify-content: space-around; align-items: center; background: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 14px; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-size: 0.75rem; font-weight: 700;">
            <span style="color: var(--color-red);"><i class="fa-solid fa-triangle-exclamation"></i> 1. Detected</span>
            <i class="fa-solid fa-chevron-right" style="color: var(--text-muted); font-size: 0.7rem;"></i>
            <span style="color: var(--color-orange);"><i class="fa-solid fa-magnifying-glass-chart"></i> 2. Investigating</span>
            <i class="fa-solid fa-chevron-right" style="color: var(--text-muted); font-size: 0.7rem;"></i>
            <span style="color: var(--color-blue);"><i class="fa-solid fa-shield-halved"></i> 3. Mitigation</span>
            <i class="fa-solid fa-chevron-right" style="color: var(--text-muted); font-size: 0.7rem;"></i>
            <span style="color: var(--color-green);"><i class="fa-solid fa-circle-check"></i> 4. Resolved</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
            ${window.portalData.cybersecurity.incidents.map(inc => `
              <div class="card" style="padding: 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted);">${inc.num}</span>
                  <span class="badge badge-${inc.stageClass}" style="font-size: 0.65rem;" id="incStage-${inc.id}">Stage: ${inc.stage}</span>
                </div>
                <h4 style="font-size: 0.88rem; font-weight: 800; margin-bottom: 10px;">${inc.name}</h4>
                <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
                  <div>Affected System: <strong style="color: var(--text-primary);">${inc.system}</strong></div>
                  <div>Severity: <strong style="color: var(--color-red);">${inc.severity}</strong></div>
                  <div>Incident Owner: <strong>${inc.owner}</strong></div>
                  <div>Current Stage: <span style="font-weight: 600;" id="incText-${inc.id}">${inc.stage}</span></div>
                </div>
                <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                  <button class="table-action-btn table-action-btn-neutral" onclick="alert('CTO Action: Access controls assigned to cloud security leads.')">Assign Team</button>
                  <button class="table-action-btn table-action-btn-neutral" onclick="handleEscalatePriority('${inc.id}', '${inc.name}')" id="escalBtn-${inc.id}" style="color: var(--color-red); border-color: rgba(255,59,48,0.2);">Escalate Priority</button>
                  <button class="table-action-btn table-action-btn-blue" onclick="handleResolveIncident('${inc.id}', '${inc.name}')" id="resolBtn-${inc.id}">Approve Resolution</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 5: SECURITY CONTROL CENTER -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-sliders"></i> Security Control Center</span>
            <span class="card-subtitle">CTO security governance area for Access Control, Security Policies, and Infrastructure Security</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            <!-- Access Control -->
            <div class="card" style="padding: 1.25rem;">
              <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-lock"></i> Access Control</h4>
              <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">Review access permissions, approve privileged access, and review authentication policies.</p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="window.switchRoute('user-management')">Review Access Permissions</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Opening list of pending privileged access approvals...')">Approve Privileged Access</button>
                <button class="btn btn-primary" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Approved WebAuthn MFA authentication standards.')"><i class="fa-solid fa-circle-check"></i> Review Authentication Policies</button>
              </div>
            </div>

            <!-- Security Policies -->
            <div class="card" style="padding: 1.25rem;">
              <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-folder-shield"></i> Security Policies</h4>
              <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">Approve security updates, review compliance requirements, and update security standards.</p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-primary" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Approved critical TLS library security patch rollout.')"><i class="fa-solid fa-circle-check"></i> Approve Security Updates</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Opening ISO 26262 baseline conformity documents...')">Review Compliance Requirements</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Initiating zero-trust audit compliance upgrade...')">Update Security Standards</button>
              </div>
            </div>

            <!-- Infrastructure Security -->
            <div class="card" style="padding: 1.25rem;">
              <h4 style="font-size: 0.88rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-server"></i> Infrastructure Security</h4>
              <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">Approve vulnerability fixes, review cloud security changes, and request security audits.</p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Approved staging patch vulnerability update plan.')">Approve Vulnerability Fixes</button>
                <button class="btn btn-primary" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Approved AWS VPC security groups peering modifications.')"><i class="fa-solid fa-circle-check"></i> Review Cloud Security Changes</button>
                <button class="btn btn-outline" style="justify-content: flex-start; text-align: left; font-size: 0.78rem;" onclick="alert('CTO Decision: Security audit request dispatched to SecOps team.')">Request Security Audits</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 6: AI SECURITY INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Security Insights</span>
            <span class="card-subtitle">Automated cybersecurity observations, impact analysis, and CTO decision triggers</span>
          </div>
          <span class="badge badge-grey">4 Active Insights</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.cybersecurity.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${ins.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.4; margin-bottom: 6px;"><strong>Observation:</strong> "${ins.obs}"</p>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;"><strong>Impact:</strong> "${ins.impact}"</p>
                  <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 12px;">
                    💡 <strong>Recommendation:</strong> "${ins.rec}"
                  </div>
                </div>
                <button class="${ins.action === 'Investigate' ? 'btn btn-primary' : 'btn btn-outline'} btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('AI recommendation trigger: ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local search & filtering state
    let searchVal = '';
    let categoryFilter = 'all';

    function drawPostureGrid() {
      const grid = document.getElementById('secPostureGrid');
      if (!grid) return;

      const filtered = window.portalData.cybersecurity.postureView.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            item.status.toLowerCase().includes(searchVal.toLowerCase()) ||
                            item.purpose.toLowerCase().includes(searchVal.toLowerCase());
        
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
          if (categoryFilter === 'cloud') {
            matchesCategory = item.id === 'sec-area-1';
          } else if (categoryFilter === 'app') {
            matchesCategory = item.id === 'sec-area-2';
          } else if (categoryFilter === 'api') {
            matchesCategory = item.id === 'sec-area-3';
          } else if (categoryFilter === 'data-device') {
            matchesCategory = item.id === 'sec-area-4' || item.id === 'sec-area-5';
          }
        }
        return matchesSearch && matchesCategory;
      });

      grid.innerHTML = filtered.map(item => `
        <div class="card" style="padding: 1rem; display: flex; flex-direction: column; justify-content: space-between; background: var(--bg-surface); border: 1px solid var(--border-color);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary);">${item.name}</h4>
              <span class="badge badge-${item.badgeClass}" style="font-size: 0.65rem;">${item.badge}</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;">
              <div>Current Status: <strong>${item.status}</strong></div>
              <div>Risk Level: <strong class="text-${item.riskClass}">${item.risk}</strong></div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Last Assessment: ${item.time}</div>
            </div>
          </div>
          <div style="display: flex; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 8px;">
            <button class="table-action-btn table-action-btn-neutral" style="flex: 1; justify-content: center;" onclick="window.openSecurityDetailDrawer('${item.id}')">Inspect Domain</button>
            <button class="table-action-btn table-action-btn-neutral" style="flex: 1; justify-content: center;" onclick="alert('CTO Action: Viewing Audit Logs for ${item.name}...')">Audit Logs</button>
          </div>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--text-muted); padding: 20px;">No security domains match active filters.</div>`;
      }
    }

    // Attach search input trigger
    const searchInput = document.getElementById('secSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawPostureGrid();
      });
    }

    // Attach filter buttons click
    const filterBtns = document.querySelectorAll('.sec-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-primary');

        categoryFilter = btn.getAttribute('data-category');
        drawPostureGrid();
      });
    });

    // Draw initial grid
    drawPostureGrid();
  }

  // Handle remediation plan trigger
  window.handleRemediationPlan = function(id, title) {
    alert(`CTO GOVERNANCE: Approved security remediation baseline and action tickets generated for: ${title}`);
  };

  // Handle escalate priority trigger
  window.handleEscalatePriority = function(id, title) {
    alert(`CTO ACTION: Security incident priority escalated to High. Dispatching emergency notification alerts to CISO and lead response teams.`);
    const badge = document.getElementById(`incStage-${id}`);
    const text = document.getElementById(`incText-${id}`);
    if (badge && text) {
      badge.className = 'badge badge-danger';
      badge.textContent = 'Stage: ESCALATED';
      text.textContent = 'Escalated / Out-of-Band Response Active';
    }
  };

  // Handle resolve incident trigger
  window.handleResolveIncident = function(id, title) {
    alert(`CTO ACTION: Security incident marked Resolved. Audit record baselines synchronized.`);
    const badge = document.getElementById(`incStage-${id}`);
    const text = document.getElementById(`incText-${id}`);
    if (badge && text) {
      badge.className = 'badge badge-success';
      badge.textContent = 'Stage: Resolved';
      text.textContent = 'Incident Resolved & Closed';
    }
  };

  // --- SECURITY AREA DETAIL INSPECTOR DRAWER ---
  window.openSecurityDetailDrawer = function(id) {
    let item = window.portalData.cybersecurity.postureView.find(p => p.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `Security Domain: ${item.name} <span class="badge badge-${item.badgeClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.badge}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Security Area Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-blue); font-size: 0.85rem;"></i> Domain Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Domain Name:</strong> ${item.name}</div>
            <div><strong style="color: var(--text-primary);">Purpose Scope:</strong> ${item.purpose}</div>
            <div><strong style="color: var(--text-primary);">Governance Lead:</strong> ${item.owner}</div>
          </div>
        </div>

        <!-- Technical Security Controls -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-key" style="color: var(--color-purple); font-size: 0.85rem;"></i> Technical Security Controls</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Encryption Standard:</strong> AES-256-GCM / TLS 1.3 mTLS</div>
            <div><strong style="color: var(--text-primary);">Authorization:</strong> OAuth2 PKCE, JWT tokens, WebAuthn MFA</div>
            <div><strong style="color: var(--text-primary);">Certifications:</strong> ISO 26262, SOC2 Type II, and CIS benchmarks</div>
          </div>
        </div>

        <!-- Risk Assessment -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-orange); font-size: 0.85rem;"></i> Risk Assessment</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Assessed Risk Level:</strong> ${item.risk}</div>
            <div><strong style="color: var(--text-primary);">Active Warnings:</strong> 0 Critical vulnerabilities identified</div>
            <div><strong style="color: var(--text-primary);">Remediation Suggestion:</strong> Maintain current threat inspection rules and review logs.</div>
          </div>
        </div>

        <!-- Executive Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO CYBERSECURITY: Active domain-wide vulnerability scan dispatched...')">Run Domain Scan</button>
          <button class="btn btn-outline" onclick="alert('CTO CYBERSECURITY: Domain status acknowledged.')">Acknowledge Status</button>
          <button class="btn btn-outline" onclick="alert('CTO CYBERSECURITY: Security patch verification completed.')">Approve Security Fix</button>
                <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // DEVOPS & PIPELINES MODULE - RELEASE OPERATIONS CENTER
  // ==========================================================
  function renderDevOpsPipelinesModule() {
    viewSubpage.innerHTML = `
      <style>
        .devops-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .devops-filter-select:hover {
          border-color: var(--text-muted);
        }
        .kpi-card-devops {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100px; height: auto;
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO DEVOPS: Opening pipeline wizard...')"><i class="fa-solid fa-plus"></i> Create Pipeline</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVOPS: Initiating deployment run...')"><i class="fa-solid fa-rocket"></i> Trigger Deployment</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVOPS: Scheduling automated rollback audit...')"><i class="fa-solid fa-clock-rotate-left"></i> Schedule Rollback</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVOPS: Exported release deployment log.')"><i class="fa-solid fa-download"></i> Export Deployment Log</button>
      </section>

      <!-- DEVOPS SUBTITLE DESCRIPTION & BUTTONS -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 1rem; line-height: 1.4;">Monitor deployment workflows, CI/CD pipelines, release health, and software delivery operations across InnoVibe Mobility.</p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('CTO ACTION: Create new deployment pipeline wizard triggered.')"><i class="fa-solid fa-plus"></i> Create Pipeline</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: Loading deployment timeline archive logs...')"><i class="fa-solid fa-clock-rotate-left"></i> View Deployment History</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ACTION: PDF deployment performance report generated.')"><i class="fa-solid fa-download"></i> Export Report</button>
        </div>
      </div>

      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS (cto2.mp4 style) -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 400px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="devopsSearchInput" placeholder="Search pipeline, application, team...">
        </div>
        <select class="devops-filter-select" id="devopsEnvFilter">
          <option value="all">Environment: All Environments</option>
          <option value="Production">Production</option>
          <option value="Testing / Staging">Testing / Staging</option>
        </select>
        <select class="devops-filter-select" id="devopsStatusFilter">
          <option value="all">Status: All Statuses</option>
          <option value="Successful">Successful</option>
          <option value="Running">Running</option>
        </select>
        <select class="devops-filter-select" id="devopsTypeFilter">
          <option value="all">Deployment Type: All Types</option>
          <option value="Canary Rollout">Canary Rollout</option>
          <option value="Blue-Green">Blue-Green</option>
          <option value="Rolling Update">Rolling Update</option>
        </select>
        <select class="devops-filter-select" id="devopsAppFilter">
          <option value="all">Application: All Applications</option>
          <option value="pipe-1">EVcare Mobile App Backend</option>
          <option value="pipe-2">Telemetry Ingress Stream Service</option>
          <option value="pipe-3">Fleet Routing AI Core</option>
          <option value="pipe-4">Core API Gateway & Auth</option>
        </select>
      </div>

      <!-- SECTION 1: RELEASE OPERATIONS CENTER PANEL -->
      <section class="card" style="margin-bottom: 1.5rem; border: none; background: transparent;">
        <div style="margin-bottom: 10px;">
          <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-tower-broadcast" style="color: var(--color-blue);"></i> Release Operations Center</span>
          <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Real-time software delivery pipelines, release reliability, deployment velocity, and engineering operations</span>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;">
          
          <div class="kpi-card-devops has-exec-popover">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Deployment Health</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.devopsPipelines.operationsCenter.health.value}</div>
            <div>
              <span class="badge badge-success" style="font-size: 0.62rem; padding: 2px 6px;">${window.portalData.devopsPipelines.operationsCenter.health.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "CI/CD deployment success rate at 99.4% with automated rollback.", businessImpact: "Zero production downtime during continuous deployment runs.", aiRecommendation: "Gradually promote staging builds to production shards.", recommendedAction: "Review DevOps Pipelines", relatedModule: "DevOps & Pipelines"})}</div>
          </div>
          
          <div class="kpi-card-devops has-exec-popover">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Active Pipelines</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.devopsPipelines.operationsCenter.activePipelines.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600;">${window.portalData.devopsPipelines.operationsCenter.activePipelines.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "CI/CD deployment success rate at 99.4% with automated rollback.", businessImpact: "Zero production downtime during continuous deployment runs.", aiRecommendation: "Gradually promote staging builds to production shards.", recommendedAction: "Review DevOps Pipelines", relatedModule: "DevOps & Pipelines"})}</div>
          </div>

          <div class="kpi-card-devops has-exec-popover">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Deploy Frequency</div>
            <div style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.devopsPipelines.operationsCenter.frequency.value}</div>
            <div style="font-size: 0.68rem; color: var(--color-blue); font-weight: 700;">${window.portalData.devopsPipelines.operationsCenter.frequency.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "CI/CD deployment success rate at 99.4% with automated rollback.", businessImpact: "Zero production downtime during continuous deployment runs.", aiRecommendation: "Gradually promote staging builds to production shards.", recommendedAction: "Review DevOps Pipelines", relatedModule: "DevOps & Pipelines"})}</div>
          </div>

          <div class="kpi-card-devops has-exec-popover">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Release Success Rate</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.devopsPipelines.operationsCenter.successRate.value}</div>
            <div>
              <span class="badge badge-success" style="font-size: 0.62rem; padding: 2px 6px;">${window.portalData.devopsPipelines.operationsCenter.successRate.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "CI/CD deployment success rate at 99.4% with automated rollback.", businessImpact: "Zero production downtime during continuous deployment runs.", aiRecommendation: "Gradually promote staging builds to production shards.", recommendedAction: "Review DevOps Pipelines", relatedModule: "DevOps & Pipelines"})}</div>
          </div>

          <div class="kpi-card-devops has-exec-popover">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Avg Deploy Time</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.devopsPipelines.operationsCenter.duration.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600;">${window.portalData.devopsPipelines.operationsCenter.duration.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "CI/CD deployment success rate at 99.4% with automated rollback.", businessImpact: "Zero production downtime during continuous deployment runs.", aiRecommendation: "Gradually promote staging builds to production shards.", recommendedAction: "Review DevOps Pipelines", relatedModule: "DevOps & Pipelines"})}</div>
          </div>

          <div class="kpi-card-devops has-exec-popover">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Automation Level</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.devopsPipelines.operationsCenter.automation.value}</div>
            <div>
              <span class="badge badge-info" style="font-size: 0.62rem; padding: 2px 6px; background-color: rgba(0, 122, 255, 0.08); color: var(--color-blue);">${window.portalData.devopsPipelines.operationsCenter.automation.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "CI/CD deployment success rate at 99.4% with automated rollback.", businessImpact: "Zero production downtime during continuous deployment runs.", aiRecommendation: "Gradually promote staging builds to production shards.", recommendedAction: "Review DevOps Pipelines", relatedModule: "DevOps & Pipelines"})}</div>
          </div>

        </div>
      </section>

      <!-- SECTION 2: CI/CD PIPELINE FLOW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="padding-bottom: 8px;">
          <div>
            <span class="card-title"><i class="fa-solid fa-route" style="color: var(--color-blue);"></i> CI/CD End-to-End Software Delivery Pipeline Flow</span>
            <span class="card-subtitle">Executive visualization of automated delivery stages from code commit to production deployment</span>
          </div>
        </div>
        <div class="card-body" style="padding-top: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
            ${window.portalData.devopsPipelines.pipelineFlow.map((stage, idx) => `
              <div class="card" style="flex: 1; min-width: 140px; padding: 10px 12px; margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; min-min-height: 100px; height: auto;">
                <!-- Header: Icon & Title/Duration -->
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(0, 122, 255, 0.06); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0, 122, 255, 0.12); color: var(--color-blue); font-size: 0.78rem;">
                    <i class="fa-solid ${stage.icon}"></i>
                  </div>
                  <div>
                    <div style="font-size: 0.74rem; font-weight: 800; color: var(--text-primary); line-height: 1.2;">${stage.name}</div>
                    <div style="font-size: 0.64rem; color: var(--text-muted);">${stage.time}</div>
                  </div>
                </div>
                <!-- Status Row -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                  <span class="badge badge-${stage.statusClass === 'success' ? 'success' : stage.statusClass === 'warning' ? 'warning' : 'info'}" style="font-size: 0.62rem; padding: 1px 5px;">${stage.status}</span>
                  <span style="font-size: 0.65rem; font-weight: 700; color: var(--color-${stage.statusClass === 'success' ? 'green' : stage.statusClass === 'warning' ? 'orange' : 'blue'});">${stage.subtext}</span>
                </div>
                <!-- Progress Line -->
                <div style="width: 100%; height: 3px; background: var(--border-color); border-radius: 2px; overflow: hidden; margin-top: 6px;">
                  <div style="width: ${stage.progressPct}; height: 100%; background: var(--color-${stage.statusClass === 'success' ? 'green' : stage.statusClass === 'warning' ? 'orange' : 'blue'});"></div>
                </div>
              </div>
              ${idx < 5 ? `<div style="font-size: 0.85rem; color: var(--color-blue); font-weight: bold; margin: 0 4px;"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 3: DEPLOYMENT LANDSCAPE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="card-title"><i class="fa-solid fa-globe" style="color: var(--color-blue);"></i> Active Application Deployment Landscape</span>
            <span class="card-subtitle">Release-focused status across core InnoVibe Mobility production and staging systems</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="alert('DevOps Landscape catalog sync initialized...')"><i class="fa-solid fa-rotate"></i> Refresh Landscape</button>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;" id="devopsLandscapeGrid">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 4: DEVOPS AI INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> AI DevOps Insights & Delivery Bottlenecks</span>
            <span class="card-subtitle">Automated recommendations to eliminate delivery bottlenecks and optimize release stability</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">CTO Recommendations</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.devopsPipelines.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary);">${ins.title}</span>
                    <span class="badge badge-${ins.badgeClass === 'success' ? 'success' : ins.badgeClass === 'warning' ? 'warning' : 'info'}" style="font-size: 0.62rem; padding: 2px 6px;">${ins.badge}</span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 12px;">${ins.desc}</p>
                  
                  <!-- CTO Insight nested alert box (cto2.mp4 style) -->
                  <div style="background-color: #fbf5eb; border: 1px solid #f2e3cd; padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; color: #8a6d3b; line-height: 1.4;">
                    💡 <strong>CTO Insight:</strong> ${ins.ctoInsight}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local filtering states
    let searchVal = '';
    let envFilter = 'all';
    let statusFilter = 'all';
    let typeFilter = 'all';
    let appFilter = 'all';

    function drawLandscapeGrid() {
      const grid = document.getElementById('devopsLandscapeGrid');
      if (!grid) return;

      const filtered = window.portalData.devopsPipelines.deploymentLandscape.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            item.owner.toLowerCase().includes(searchVal.toLowerCase());
        
        const matchesEnv = (envFilter === 'all' || item.env === envFilter);
        const matchesStatus = (statusFilter === 'all' || item.status === statusFilter);
        const matchesType = (typeFilter === 'all' || item.type === typeFilter);
        const matchesApp = (appFilter === 'all' || item.id === appFilter);

        return matchesSearch && matchesEnv && matchesStatus && matchesType && matchesApp;
      });

      grid.innerHTML = filtered.map(item => `
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary);">${item.name}</h4>
              <span class="badge badge-${item.statusClass}" style="font-size: 0.65rem;">${item.status}</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 10px;">Owner: ${item.owner}</div>
            
            <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; border-top: 1px solid var(--border-color); padding-top: 8px;">
              <div>Current Version: <strong style="color: var(--text-primary);">${item.version}</strong></div>
              <div>Environment: <span style="font-weight: 700; color: ${item.env === 'Production' ? 'var(--color-blue)' : 'var(--color-purple)'};">${item.env}</span></div>
              <div>Last Deployment: <span style="font-weight: 600;">${item.lastSync}</span></div>
              <div>Deploy Time: <span style="font-weight: 600;">${item.duration}</span></div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 4px;">
            <span style="font-size: 0.74rem; font-weight: 700; color: var(--color-${item.riskClass === 'success' ? 'green' : 'orange'});">${item.riskText}</span>
            <button class="table-action-btn table-action-btn-neutral" onclick="window.openPipelineDetailDrawer('${item.id}')">View Details</button>
          </div>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 3; text-align: center; color: var(--text-muted); padding: 20px;">No applications match active filters.</div>`;
      }
    }

    // Attach search input listener
    const searchInput = document.getElementById('devopsSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscapeGrid();
      });
    }

    // Attach change listeners to select elements
    const envSel = document.getElementById('devopsEnvFilter');
    if (envSel) {
      if (envSel) envSel.addEventListener('change', (e) => {
        envFilter = e.target.value;
        drawLandscapeGrid();
      });
    }

    const statusSel = document.getElementById('devopsStatusFilter');
    if (statusSel) {
      if (statusSel) statusSel.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        drawLandscapeGrid();
      });
    }

    const typeSel = document.getElementById('devopsTypeFilter');
    if (typeSel) {
      if (typeSel) typeSel.addEventListener('change', (e) => {
        typeFilter = e.target.value;
        drawLandscapeGrid();
      });
    }

    const appSel = document.getElementById('devopsAppFilter');
    if (appSel) {
      if (appSel) appSel.addEventListener('change', (e) => {
        appFilter = e.target.value;
        drawLandscapeGrid();
      });
    }

    // Draw initial grid
    drawLandscapeGrid();
  }

  // --- PIPELINE PROFILE INSPECTOR DRAWER ---
  window.openPipelineDetailDrawer = function(id) {
    const item = window.portalData.devopsPipelines.deploymentLandscape.find(d => d.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `Pipeline Profile: ${item.name} <span class="badge badge-${item.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Pipeline Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-cube" style="color: var(--color-blue); font-size: 0.85rem;"></i> Pipeline Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Application Name:</strong> ${item.name}</div>
            <div><strong style="color: var(--text-primary);">Purpose:</strong> ${item.purpose}</div>
            <div><strong style="color: var(--text-primary);">Owner Team:</strong> ${item.owner}</div>
            <div><strong style="color: var(--text-primary);">Target Environment:</strong> ${item.env}</div>
          </div>
        </div>

        <!-- Execution History -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--color-purple); font-size: 0.85rem;"></i> Execution History</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px;">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span class="badge badge-success" style="font-size: 0.6rem;">Successful</span> &bull; Version ${item.version} &bull; ${item.duration} run duration (2 hours ago)
            </div>
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span class="badge badge-success" style="font-size: 0.6rem;">Successful</span> &bull; v1.0.9 &bull; 18 min run duration (1 day ago)
            </div>
            <div>
              <span class="badge badge-danger" style="font-size: 0.6rem;">Failed</span> &bull; v1.0.8 &bull; Testing Stage Timeout (2 days ago)
            </div>
          </div>
        </div>

        <!-- Environment Flow progressive check -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-route" style="color: var(--color-green); font-size: 0.85rem;"></i> Environment Flow</h4>
          <div style="margin-top: 6px; display: flex; justify-content: space-around; align-items: center; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.75rem; font-weight: 700;">
            <span style="color: var(--color-green);">Development</span>
            <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.7rem;"></i>
            <span style="color: var(--color-green);">Testing</span>
            <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.7rem;"></i>
            <span style="color: ${item.env === 'Production' ? 'var(--color-green)' : 'var(--text-muted)'}">Production</span>
          </div>
        </div>

        <!-- Quality Gates check -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-orange); font-size: 0.85rem;"></i> Quality Gates Validation</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Automated Testing:</strong> Passed (94% code coverage)</div>
            <div><strong style="color: var(--text-primary);">Security Scan checks:</strong> Passed (0 critical vulnerabilities)</div>
            <div><strong style="color: var(--text-primary);">CTO Approval status:</strong> Authorized baseline</div>
          </div>
        </div>

        <!-- Deployment Risks -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-red); font-size: 0.85rem;"></i> Pipeline Release Risks</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Risk factor:</strong> Outdated base image caches</div>
            <div><strong style="color: var(--text-primary);">Potential Impact:</strong> Increased build stage duration</div>
            <div><strong style="color: var(--text-primary);">Remediation Recommendation:</strong> Schedule weekly pipeline runner workspace garbage collections.</div>
          </div>
        </div>

        <!-- Executive Control Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO RELEASE: Triggered pipeline execution run for ${item.name} Version ${item.version}')">Trigger Run</button>
          <button class="btn btn-outline" onclick="alert('CTO RELEASE: Release deployment successfully promoted to Production env.')">Approve Release</button>
          <button class="btn btn-outline" style="color: var(--color-red); border-color: var(--color-red);" onclick="alert('CTO RELEASE: Initiating instant rollback to previous stable version!')">Rollback Deployment</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // SYSTEM LOGS MODULE - SYSTEM OBSERVABILITY CENTER
  // ==========================================================
  function renderSystemLogsModule() {
    viewSubpage.innerHTML = `
      <style>
        .obs-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .obs-filter-select:hover {
          border-color: var(--text-muted);
        }
        .obs-health-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          flex: 1;
          min-width: 220px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .timeline-container {
          border-left: 2px solid var(--border-color);
          margin-left: 20px;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .timeline-item {
          position: relative;
        }
        .timeline-dot {
          position: absolute;
          left: -27px;
          top: 6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--bg-surface);
          border: 2px solid var(--color-blue);
        }
        .timeline-dot.danger { border-color: var(--color-red); }
        .timeline-dot.warning { border-color: var(--color-orange); }
        .timeline-dot.success { border-color: var(--color-green); }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO OBS: Dispatched logs export request.')"><i class="fa-solid fa-download"></i> Export Logs</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO OBS: Query filter profile lock active.')"><i class="fa-solid fa-magnifying-glass"></i> Query Logs</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO OBS: Cleared system logs caches.')"><i class="fa-solid fa-trash-can"></i> Clear Logs</button>
      </section>

      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 400px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="logSearchInput" placeholder="Search service, event, application...">
        </div>
        <select class="obs-filter-select" id="logSeverityFilter">
          <option value="all">Severity: All Severities</option>
          <option value="Info">Info</option>
          <option value="Warning">Warning</option>
          <option value="Critical">Critical</option>
        </select>
        <select class="obs-filter-select" id="logEnvFilter">
          <option value="all">Environment: All Environments</option>
          <option value="Production">Production</option>
          <option value="Staging">Staging</option>
        </select>
        <select class="obs-filter-select" id="logSourceFilter">
          <option value="all">Source System: All Sources</option>
          <option value="Authentication Service">Authentication Service</option>
          <option value="Database Service">Database Service</option>
          <option value="API Gateway">API Gateway</option>
          <option value="Cloud Load Balancer">Cloud Load Balancer</option>
          <option value="Telemetry Streamer">Telemetry Streamer</option>
          <option value="Fleet Core DB">Fleet Core DB</option>
        </select>
        <select class="obs-filter-select" id="logTimeFilter">
          <option value="24h">Time Range: Last 24 Hours</option>
          <option value="12h">Last 12 Hours</option>
          <option value="1h">Last 1 Hour</option>
        </select>
      </div>

      <!-- SECTION 1: SYSTEM HEALTH MONITOR -->
      <section class="card" style="margin-bottom: 1.5rem; border: none; background: transparent;">
        <div style="margin-bottom: 10px;">
          <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-heart-pulse" style="color: var(--color-green);"></i> System Health Monitor</span>
          <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Real-time operational status, network telemetry, and log coverage levels</span>
        </div>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          
          <div class="obs-health-card">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(52, 199, 89, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-green); font-size: 1.1rem;">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Overall System Status</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-green); letter-spacing: -0.02em; margin-top: 2px;">${window.portalData.systemLogs.healthMonitor.status}</div>
            </div>
          </div>
          
          <div class="obs-health-card">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(255, 149, 0, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-orange); font-size: 1.1rem;">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div>
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Active Alerts</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin-top: 2px;">${window.portalData.systemLogs.healthMonitor.activeAlerts}</div>
            </div>
          </div>

          <div class="obs-health-card">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 1.1rem;">
              <i class="fa-solid fa-gauge-high"></i>
            </div>
            <div>
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Monitoring Coverage</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin-top: 2px;">${window.portalData.systemLogs.healthMonitor.coverage}</div>
            </div>
          </div>

          <div class="obs-health-card">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(52, 199, 89, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-green); font-size: 1.1rem;">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Recent Activity Status</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin-top: 2px;">${window.portalData.systemLogs.healthMonitor.recentActivity}</div>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION 2: LIVE EVENT TIMELINE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-timeline" style="color: var(--color-blue);"></i> Live Event Timeline</span>
            <span class="card-subtitle">Real-time system transaction telemetry and operational event logs</span>
          </div>
        </div>
        <div class="card-body">
          <div class="timeline-container" id="logTimelineList">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 3: SERVICE OBSERVABILITY VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="padding-bottom: 8px;">
          <div>
            <span class="card-title"><i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> Service Observability View</span>
            <span class="card-subtitle">Operational status, telemetry counts, and alert parameters across core service components</span>
          </div>
        </div>
        <div class="card-body" style="padding-top: 8px;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
            ${window.portalData.systemLogs.serviceObservability.map(srv => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <span style="font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">${srv.category}</span>
                    <span class="badge badge-${srv.healthClass}" style="font-size: 0.62rem;">${srv.health}</span>
                  </div>
                  <h4 style="font-size: 0.84rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px; line-height: 1.3;">${srv.name}</h4>
                  <div style="font-size: 0.76rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 6px;">
                    <div>Activity: <strong>${srv.activity}</strong></div>
                    <div>Status: <span style="font-weight: 600; color: ${srv.alerts === 'No active alerts' ? 'var(--color-green)' : 'var(--color-orange)'};">${srv.alerts}</span></div>
                  </div>
                </div>
                <button class="table-action-btn table-action-btn-neutral" style="width: 100%; margin-top: 12px;" onclick="alert('CTO OBSERVABILITY: Loading real-time Grafana metric dashboard for ${srv.name}...')">View Telemetry</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 5: INCIDENT & ALERT VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-orange);"></i> Incident & Alert View</span>
            <span class="card-subtitle">Critical operations checkpoints, warnings, and resolution events</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            
            <!-- Critical Events Column -->
            <div class="card" style="padding: 1.25rem; margin-bottom: 0; background-color: rgba(255, 59, 48, 0.02); border-color: rgba(255, 59, 48, 0.15);">
              <h4 style="font-size: 0.85rem; font-weight: 800; color: var(--color-red); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-xmark"></i> Critical Events</h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${window.portalData.systemLogs.incidents.filter(inc => inc.type === 'Critical').map(inc => `
                  <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.78rem;">
                    <div style="font-weight: 700; color: var(--text-primary);">${inc.title}</div>
                    <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 4px; display: flex; justify-content: space-between;">
                      <span>Time: ${inc.time}</span>
                      <span style="color: var(--color-red); font-weight: 700;">${inc.count}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Warnings Column -->
            <div class="card" style="padding: 1.25rem; margin-bottom: 0; background-color: rgba(255, 149, 0, 0.02); border-color: rgba(255, 149, 0, 0.15);">
              <h4 style="font-size: 0.85rem; font-weight: 800; color: var(--color-orange); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-exclamation"></i> Warnings</h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${window.portalData.systemLogs.incidents.filter(inc => inc.type === 'Warning').map(inc => `
                  <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.78rem;">
                    <div style="font-weight: 700; color: var(--text-primary);">${inc.title}</div>
                    <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 4px; display: flex; justify-content: space-between;">
                      <span>Time: ${inc.time}</span>
                      <span style="color: var(--color-orange); font-weight: 700;">${inc.latency}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Resolved Events Column -->
            <div class="card" style="padding: 1.25rem; margin-bottom: 0; background-color: rgba(52, 199, 89, 0.02); border-color: rgba(52, 199, 89, 0.15);">
              <h4 style="font-size: 0.85rem; font-weight: 800; color: var(--color-green); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-check"></i> Resolved Events</h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${window.portalData.systemLogs.incidents.filter(inc => inc.type === 'Resolved').map(inc => `
                  <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); font-size: 0.78rem;">
                    <div style="font-weight: 700; color: var(--text-primary);">${inc.title}</div>
                    <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 4px; display: flex; justify-content: space-between;">
                      <span>Time: ${inc.time}</span>
                      <span style="color: var(--color-green); font-weight: 700;">${inc.duration}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION 6: AI SYSTEM INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> AI System Insights & Predictions</span>
            <span class="card-subtitle">Observability stream modeling and anomaly detection triggers</span>
          </div>
          <span class="badge badge-grey">3 Active Models</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.systemLogs.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
                <div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">${ins.title}</span>
                  <p style="font-size: 0.78rem; color: var(--text-primary); line-height: 1.45; margin-bottom: 6px;"><strong>Telemetry:</strong> "${ins.obs}"</p>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 10px;"><strong>Impact Path:</strong> "${ins.impact}"</p>
                  
                  <div style="background-color: #fbf5eb; border: 1px solid #f2e3cd; padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; color: #8a6d3b; line-height: 1.4; margin-bottom: 12px;">
                    💡 <strong>Observation:</strong> "${ins.rec}"
                  </div>
                </div>
                <button class="${ins.action !== 'Acknowledge' ? 'btn btn-primary' : 'btn btn-outline'} btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('CTO OBSERVABILITY: Action launched - ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local filters logic
    let searchVal = '';
    let severityFilter = 'all';
    let envFilter = 'all';
    let sourceFilter = 'all';

    function drawTimeline() {
      const list = document.getElementById('logTimelineList');
      if (!list) return;

      const filtered = window.portalData.systemLogs.liveEvents.filter(log => {
        const matchesSearch = log.source.toLowerCase().includes(searchVal.toLowerCase()) ||
                            log.desc.toLowerCase().includes(searchVal.toLowerCase()) ||
                            log.app.toLowerCase().includes(searchVal.toLowerCase());
        
        const matchesSeverity = (severityFilter === 'all' || log.severity === severityFilter);
        const matchesEnv = (envFilter === 'all' || log.env === envFilter);
        const matchesSource = (sourceFilter === 'all' || log.source === sourceFilter);

        return matchesSearch && matchesSeverity && matchesEnv && matchesSource;
      });

      list.innerHTML = filtered.map(log => `
        <div class="timeline-item" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div class="timeline-dot ${log.severityClass}"></div>
          
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); width: 65px;">${log.time}</div>
            <div>
              <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-primary);">${log.source}</div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">${log.desc}</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 14px;">
            <span class="badge badge-${log.severityClass}" style="font-size: 0.62rem; padding: 2px 6px;">${log.severity}</span>
            <span class="badge badge-info" style="font-size: 0.62rem; background-color: rgba(0, 122, 255, 0.06); border-color: rgba(0, 122, 255, 0.1); color: var(--color-blue);">${log.env}</span>
            <button class="table-action-btn table-action-btn-neutral" onclick="window.openLogDetailDrawer('${log.id}')">View Details</button>
          </div>
        </div>
      `).join('');

      if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">No operational events match current filters.</div>`;
      }
    }

    // Attach search and select filter triggers
    const searchInput = document.getElementById('logSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawTimeline();
      });
    }

    const sevFilter = document.getElementById('logSeverityFilter');
    if (sevFilter) {
      if (sevFilter) sevFilter.addEventListener('change', (e) => {
        severityFilter = e.target.value;
        drawTimeline();
      });
    }

    const envFilterSel = document.getElementById('logEnvFilter');
    if (envFilterSel) {
      if (envFilterSel) envFilterSel.addEventListener('change', (e) => {
        envFilter = e.target.value;
        drawTimeline();
      });
    }

    const sourceFilterSel = document.getElementById('logSourceFilter');
    if (sourceFilterSel) {
      if (sourceFilterSel) sourceFilterSel.addEventListener('change', (e) => {
        sourceFilter = e.target.value;
        drawTimeline();
      });
    }

    // Draw initial timeline
    drawTimeline();
  }

  // --- LOG DETAILED INSPECTOR DRAWER ---
  window.openLogDetailDrawer = function(id) {
    const item = window.portalData.systemLogs.liveEvents.find(log => log.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `Log Analyzer: ${item.source} <span class="badge badge-${item.severityClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.severity}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Event Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-list" style="color: var(--color-blue); font-size: 0.85rem;"></i> Event Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Timestamp:</strong> ${item.time}</div>
            <div><strong style="color: var(--text-primary);">Source System:</strong> ${item.source}</div>
            <div><strong style="color: var(--text-primary);">Event Description:</strong> ${item.desc}</div>
          </div>
        </div>

        <!-- System Context -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-server" style="color: var(--color-purple); font-size: 0.85rem;"></i> System Context</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Related Service:</strong> ${item.source}</div>
            <div><strong style="color: var(--text-primary);">Target Environment:</strong> ${item.env}</div>
            <div><strong style="color: var(--text-primary);">Core Application:</strong> ${item.app}</div>
          </div>
        </div>

        <!-- Impact Analysis -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-orange); font-size: 0.85rem;"></i> Impact Analysis</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Affected Platforms:</strong> ${item.app} dependencies and API nodes.</div>
            <div><strong style="color: var(--text-primary);">Severity Baseline:</strong> ${item.severity} Level Indicator.</div>
            <div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid var(--border-color); font-style: italic;">
              ${item.impact}
            </div>
          </div>
        </div>

        <!-- Recommended Action -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-green); font-size: 0.85rem;"></i> Recommended Action</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Suggested Response:</strong> Observability mitigation workflow.</div>
            <div style="margin-top: 4px; font-weight: 600; color: var(--text-primary);">${item.recommendation}</div>
          </div>
        </div>

        <!-- Executive Control Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO OBSERVABILITY: Event from ${item.source} acknowledged and archived.')">Acknowledge Event</button>
          <button class="btn btn-outline" onclick="alert('CTO OBSERVABILITY: Triggering automated diagnostic telemetry trace on ${item.app}...')">Trigger Diagnostics Scan</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // CLOUD INFRASTRUCTURE MODULE - CLOUD COMMAND CENTER
  // ==========================================================
  function renderCloudInfrastructureModule() {
    viewSubpage.innerHTML = `
      <style>
        .cloud-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .cloud-filter-select:hover {
          border-color: var(--text-muted);
        }
        .cloud-health-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          flex: 1;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 90px;
        }
        .arch-node-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          text-align: center;
          width: 140px;
          min-height: 95px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .arch-node-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO CLOUD: Resource provision request wizard initiated.')"><i class="fa-solid fa-plus"></i> Provision Resource</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO CLOUD: Drift detection run sequence active...')"><i class="fa-solid fa-shield-halved"></i> Drift Detection Run</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO CLOUD: Exported AWS cost analysis models.')"><i class="fa-solid fa-download"></i> Export AWS Cost Analysis</button>
      </section>

      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 400px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="cloudSearchInput" placeholder="Search resource, type, purpose...">
        </div>
        <select class="cloud-filter-select" id="cloudProviderFilter">
          <option value="all">Cloud Provider: All</option>
          <option value="AWS">AWS</option>
        </select>
        <select class="cloud-filter-select" id="cloudEnvFilter">
          <option value="all">Environment: All</option>
          <option value="Production">Production</option>
          <option value="Testing">Testing</option>
          <option value="Development">Development</option>
        </select>
        <select class="cloud-filter-select" id="cloudRegionFilter">
          <option value="all">Region: All</option>
          <option value="us-east-1">us-east-1</option>
        </select>
        <select class="cloud-filter-select" id="cloudServiceFilter">
          <option value="all">Service: All Services</option>
          <option value="Compute">Compute</option>
          <option value="Networking">Networking</option>
          <option value="Caching">Caching</option>
          <option value="Ingress Stream">Ingress Stream</option>
        </select>
      </div>

      <!-- SECTION 1: CLOUD OPERATIONS OVERVIEW -->
      <section class="card" style="margin-bottom: 1.5rem; border: none; background: transparent;">
        <div style="margin-bottom: 10px;">
          <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> Cloud Operations Overview</span>
          <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Core cloud health indexes, active application service counts, and cluster workloads</span>
        </div>
        
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          
          <div class="cloud-health-card">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Overall Cloud Health</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-green); letter-spacing: -0.02em; margin-top: 4px;">${window.portalData.cloudInfrastructure.operationsOverview.health}</div>
          </div>
          
          <div class="cloud-health-card">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Active Services</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-blue); letter-spacing: -0.02em; margin-top: 4px;">${window.portalData.cloudInfrastructure.operationsOverview.activeServices}</div>
          </div>

          <div class="cloud-health-card">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Resource Utilization</div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin-top: 4px;">${window.portalData.cloudInfrastructure.operationsOverview.utilization}</div>
          </div>

          <div class="cloud-health-card">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Availability Status</div>
            <div style="font-size: 0.88rem; font-weight: 800; color: var(--color-green); margin-top: 6px; display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-green); display: inline-block;"></span>
              ${window.portalData.cloudInfrastructure.operationsOverview.availabilityStatus}
            </div>
          </div>

          <div class="cloud-health-card">
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Security Status</div>
            <div style="font-size: 0.94rem; font-weight: 800; color: var(--color-green); margin-top: 6px; display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-green); display: inline-block;"></span>
              ${window.portalData.cloudInfrastructure.operationsOverview.securityStatus}
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION 2: CLOUD ARCHITECTURE MAP -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="padding-bottom: 8px;">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes" style="color: var(--color-blue);"></i> Cloud Architecture Dependency Map</span>
            <span class="card-subtitle">Simple, executive-friendly visualization mapping data ingestion paths and dependent microservices</span>
          </div>
        </div>
        <div class="card-body" style="padding-top: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 1.5rem 1rem; border-radius: var(--radius-md);">
            ${window.portalData.cloudInfrastructure.architectureMap.nodes.map((node, idx) => `
              <div class="arch-node-card">
                <div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(0,122,255,0.06); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.82rem; border: 1px solid rgba(0,122,255,0.12);">
                  <i class="fa-solid ${node.icon}"></i>
                </div>
                <div style="font-size: 0.76rem; font-weight: 800; color: var(--text-primary); margin-top: 6px; line-height: 1.1;">${node.name}</div>
                <span class="badge badge-${node.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.6rem; padding: 1px 5px; margin-top: 4px;">${node.status}</span>
              </div>
              ${idx < 5 ? `<div style="font-size: 0.9rem; color: var(--text-muted); font-weight: bold; margin: 0 4px;"><i class="fa-solid fa-arrow-right"></i></div>` : ''}
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 3: RESOURCE HEALTH VIEW -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-server" style="color: var(--color-blue);"></i> Resource Health View</span>
            <span class="card-subtitle">Real-time CPU, Memory, and Disk capacity status of application server infrastructure</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;" id="cloudResourceGrid">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 4: ENVIRONMENT STATUS -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="padding-bottom: 8px;">
          <div>
            <span class="card-title"><i class="fa-solid fa-layer-group" style="color: var(--color-blue);"></i> Environment Cluster Status</span>
            <span class="card-subtitle">Active versions, availability margins, and deployment status across engineering stages</span>
          </div>
        </div>
        <div class="card-body" style="padding-top: 8px;">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.cloudInfrastructure.environments.map(env => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary);">${env.name} Environment</h4>
                    <span class="badge badge-${env.healthClass}" style="font-size: 0.62rem;">Health: ${env.health}</span>
                  </div>
                  <p style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 10px;">${env.desc}</p>
                  
                  <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 8px;">
                    <div>Availability SLA: <strong style="color: var(--text-primary);">${env.availability}</strong></div>
                    <div>Active Release: <strong style="color: var(--text-primary);">${env.version}</strong></div>
                    <div>Deploy Status: <span class="badge badge-${env.deployClass}" style="font-size: 0.62rem; padding: 1px 5px;">${env.deployStatus}</span></div>
                  </div>
                </div>
                <button class="table-action-btn table-action-btn-neutral" style="width: 100%; margin-top: 12px;" onclick="alert('CTO CLOUD: Opening environment logs view for ${env.name} cluster...')">Inspect Cluster</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 6: CLOUD RISKS & OPTIMIZATION -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-orange);"></i> CTO Cloud Risks & Optimization Actions</span>
            <span class="card-subtitle">Identified infrastructure cost saves, capacity boundaries, and reliability mitigations</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.cloudInfrastructure.risks.map(rsk => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary);">${rsk.title}</span>
                    <span class="badge badge-${rsk.statusClass === 'warning' ? 'warning' : 'info'}" style="font-size: 0.62rem; padding: 2px 6px;">${rsk.risk}</span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 10px;"><strong>Impact:</strong> ${rsk.impact}</p>
                  
                  <div style="background-color: #fbf5eb; border: 1px solid #f2e3cd; padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; color: #8a6d3b; line-height: 1.4;">
                    💡 <strong>Recommendation:</strong> ${rsk.recommendation}
                  </div>
                </div>
                <button class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem; margin-top: 12px;" onclick="alert('CTO CLOUD Action Triggered: Approved mitigation ruleset for ${rsk.risk}')">Approve Action</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 7: AI CLOUD INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> AI Cloud Insights & Optimization Recommendations</span>
            <span class="card-subtitle">Machine learning observations, sizing analyses, and latency-performance predictions</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.cloudInfrastructure.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary);">${ins.title}</span>
                    <span class="badge badge-${ins.badgeClass === 'success' ? 'success' : ins.badgeClass === 'warning' ? 'warning' : 'info'}" style="font-size: 0.62rem; padding: 2px 6px;">${ins.badge}</span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 12px;">${ins.desc}</p>
                </div>
                <button class="${ins.action !== 'View Metrics' ? 'btn btn-primary' : 'btn btn-outline'} btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('CTO CLOUD Action Dispatched: ${ins.action}')">
                  ${ins.action}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local filtering states
    let searchVal = '';
    let providerFilter = 'all';
    let envFilter = 'all';
    let regionFilter = 'all';
    let serviceFilter = 'all';

    function drawResources() {
      const grid = document.getElementById('cloudResourceGrid');
      if (!grid) return;

      const filtered = window.portalData.cloudInfrastructure.resourceHealth.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            res.type.toLowerCase().includes(searchVal.toLowerCase()) ||
                            res.purpose.toLowerCase().includes(searchVal.toLowerCase());
        
        const matchesProvider = (providerFilter === 'all' || res.provider === providerFilter);
        const matchesEnv = (envFilter === 'all' || res.env === envFilter);
        const matchesRegion = (regionFilter === 'all' || res.region === regionFilter);
        
        let matchesService = true;
        if (serviceFilter !== 'all') {
          matchesService = res.type.toLowerCase().includes(serviceFilter.toLowerCase());
        }

        return matchesSearch && matchesProvider && matchesEnv && matchesRegion && matchesService;
      });

      grid.innerHTML = filtered.map(res => `
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary);">${res.name}</h4>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${res.type} &bull; ${res.region}</div>
              </div>
              <span class="badge badge-${res.statusClass}" style="font-size: 0.65rem;">${res.status}</span>
            </div>

            <!-- CPU, Memory, Storage Usage Bars -->
            <div style="display: flex; flex-direction: column; gap: 8px; margin: 12px 0; border-top: 1px solid var(--border-color); padding-top: 10px;">
              
              <!-- CPU Bar -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.74rem; margin-bottom: 3px;">
                  <span>CPU Usage</span>
                  <strong>${res.cpu}</strong>
                </div>
                <div style="width: 100%; height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden;">
                  <div style="width: ${res.cpu}; height: 100%; background: var(--color-${res.cpuVal > 80 ? 'red' : res.cpuVal > 60 ? 'orange' : 'green'});"></div>
                </div>
              </div>

              <!-- Memory Bar -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.74rem; margin-bottom: 3px;">
                  <span>Memory Usage</span>
                  <strong>${res.memory}</strong>
                </div>
                <div style="width: 100%; height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden;">
                  <div style="width: ${res.memory}; height: 100%; background: var(--color-${res.memoryVal > 80 ? 'red' : res.memoryVal > 60 ? 'orange' : 'green'});"></div>
                </div>
              </div>

              <!-- Storage Bar -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.74rem; margin-bottom: 3px;">
                  <span>Storage Usage</span>
                  <strong>${res.storage}</strong>
                </div>
                <div style="width: 100%; height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden;">
                  <div style="width: ${res.storage}; height: 100%; background: var(--color-${res.storageVal > 80 ? 'red' : res.storageVal > 60 ? 'orange' : 'green'});"></div>
                </div>
              </div>

            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 4px; font-size: 0.72rem;">
            <span style="color: var(--text-muted);">Net: <strong>${res.network}</strong></span>
            <button class="table-action-btn table-action-btn-neutral" onclick="window.openCloudResourceDetailDrawer('${res.id}')">View Details</button>
          </div>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--text-muted); padding: 20px;">No cloud resources match active filters.</div>`;
      }
    }

    // Attach listeners
    const searchInput = document.getElementById('cloudSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawResources();
      });
    }

    const providerSel = document.getElementById('cloudProviderFilter');
    if (providerSel) {
      if (providerSel) providerSel.addEventListener('change', (e) => {
        providerFilter = e.target.value;
        drawResources();
      });
    }

    const envSel = document.getElementById('cloudEnvFilter');
    if (envSel) {
      if (envSel) envSel.addEventListener('change', (e) => {
        envFilter = e.target.value;
        drawResources();
      });
    }

    const regionSel = document.getElementById('cloudRegionFilter');
    if (regionSel) {
      if (regionSel) regionSel.addEventListener('change', (e) => {
        regionFilter = e.target.value;
        drawResources();
      });
    }

    const serviceSel = document.getElementById('cloudServiceFilter');
    if (serviceSel) {
      if (serviceSel) serviceSel.addEventListener('change', (e) => {
        serviceFilter = e.target.value;
        drawResources();
      });
    }

    // Draw initial resource grid
    drawResources();
  }

  // --- CLOUD DETAILED PROFILE DRAWER ---
  window.openCloudResourceDetailDrawer = function(id) {
    const item = window.portalData.cloudInfrastructure.resourceHealth.find(res => res.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `Resource Detail: ${item.name} <span class="badge badge-${item.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Resource Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-info" style="color: var(--color-blue); font-size: 0.85rem;"></i> Resource Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Service Name:</strong> ${item.name}</div>
            <div><strong style="color: var(--text-primary);">Type:</strong> ${item.type}</div>
            <div><strong style="color: var(--text-primary);">Environment:</strong> ${item.env}</div>
            <div><strong style="color: var(--text-primary);">Purpose:</strong> ${item.purpose}</div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-chart-line" style="color: var(--color-purple); font-size: 0.85rem;"></i> Performance & Usage</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">CPU Usage:</strong> ${item.cpu}</div>
            <div><strong style="color: var(--text-primary);">Memory Usage:</strong> ${item.memory}</div>
            <div><strong style="color: var(--text-primary);">Storage Capacity:</strong> ${item.storage}</div>
            <div><strong style="color: var(--text-primary);">Network Traffic:</strong> ${item.network}</div>
          </div>
        </div>

        <!-- Dependencies -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-sitemap" style="color: var(--color-green); font-size: 0.85rem;"></i> Dependencies & Connections</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary);">
            <div><strong style="color: var(--text-primary);">Configured Capacity:</strong> ${item.capacity}</div>
            <div style="margin-top: 4px;"><strong style="color: var(--text-primary);">Connected Applications:</strong> InnoVibe Telematics Streamer, EVcare Gateway proxy.</div>
          </div>
        </div>

        <!-- Security -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-orange); font-size: 0.85rem;"></i> Security & Access Control</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Access Status:</strong> ${item.accessStatus}</div>
            <div><strong style="color: var(--text-primary);">ISO 26262 Compliance:</strong> Checked & verified</div>
          </div>
        </div>

        <!-- Scaling Recommendations -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-triangle-exclamation" style="color: var(--color-red); font-size: 0.85rem;"></i> Scaling Information</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); font-style: italic;">
            ${item.scalingRec}
          </div>
        </div>

        <!-- Executive Control Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO CLOUD: Dispatched automated scale out command for ${item.name}')">Trigger Scale Out</button>
          <button class="btn btn-outline" onclick="alert('CTO CLOUD: Current resource limits status acknowledged.')">Acknowledge Status</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // DATABASE MANAGEMENT MODULE - DATA RELIABILITY CENTER
  // ==========================================================
  function renderDatabaseManagementModule() {
    viewSubpage.innerHTML = `
      <style>
        .db-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .db-filter-select:hover {
          border-color: var(--text-muted);
        }
        .kpi-card-db {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 105px;
          position: relative;
        }
        .kpi-icon-db {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--color-blue);
          font-size: 0.78rem;
        }
        .flow-node-card-db {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px 12px;
          text-align: center;
          width: 210px;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .flow-node-card-db:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO DATABASE: Add Database wizard initiated...')"><i class="fa-solid fa-plus"></i> Add Database</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DATABASE: Displaying Database Architecture topologies...')"><i class="fa-solid fa-sitemap"></i> Database Architecture</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DATABASE: Database reliability report exported.')"><i class="fa-solid fa-download"></i> Export Report</button>
      </section>

      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS (cto2.mp4 single-row layout) -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md);">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 400px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="dbSearchInput" placeholder="Search database name, type, ap...">
        </div>
        <select class="db-filter-select" id="dbTypeFilter">
          <option value="all">Database Type: All Types</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="TimescaleDB">TimescaleDB</option>
          <option value="Redis">Redis</option>
          <option value="ClickHouse">ClickHouse</option>
        </select>
        <select class="db-filter-select" id="dbAppFilter">
          <option value="all">Application: All Applications</option>
          <option value="EVcare Backend APIs">EVcare Backend APIs</option>
          <option value="Telemetry Ingress Stream">Telemetry Ingress Stream</option>
          <option value="User Core API">User Core API</option>
          <option value="Fleet Routing AI Core">Fleet Routing AI Core</option>
        </select>
        <select class="db-filter-select" id="dbEnvFilter">
          <option value="all">Environment: All Environments</option>
          <option value="Production">Production</option>
        </select>
        <select class="db-filter-select" id="dbStatusFilter">
          <option value="all">Status: All Statuses</option>
          <option value="Excellent">Excellent</option>
          <option value="Warning">Warning</option>
        </select>
      </div>

      <!-- SECTION 1: DATABASE HEALTH CENTER CONTAINER -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-server"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Data Infrastructure Reliability Health Center</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Real-time database cluster availability, storage capacity, backup SLAs, and query performance</span>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;">
          
          <!-- AVAILABILITY -->
          <div class="kpi-card-db has-exec-popover">
            <i class="fa-solid ${window.portalData.databaseManagement.healthCenter.availability.icon} kpi-icon-db"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Availability</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.databaseManagement.healthCenter.availability.value}</div>
            <div>
              <span class="badge badge-success" style="font-size: 0.62rem; padding: 2px 6px; background-color: rgba(52, 199, 89, 0.08); color: var(--color-green);">${window.portalData.databaseManagement.healthCenter.availability.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "Database cluster health running at 99.99% availability.", businessImpact: "Zero data loss and sub-millisecond query response time.", aiRecommendation: "Schedule automated index defragmentation during off-peak hours.", recommendedAction: "Inspect Database Cluster", relatedModule: "Database Management"})}</div>
          </div>
          
          <!-- ACTIVE DBS -->
          <div class="kpi-card-db has-exec-popover">
            <i class="fa-solid ${window.portalData.databaseManagement.healthCenter.activeDbs.icon} kpi-icon-db"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Active DBs</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.databaseManagement.healthCenter.activeDbs.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600;">${window.portalData.databaseManagement.healthCenter.activeDbs.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "Database cluster health running at 99.99% availability.", businessImpact: "Zero data loss and sub-millisecond query response time.", aiRecommendation: "Schedule automated index defragmentation during off-peak hours.", recommendedAction: "Inspect Database Cluster", relatedModule: "Database Management"})}</div>
          </div>

          <!-- STORAGE USAGE -->
          <div class="kpi-card-db has-exec-popover">
            <i class="fa-solid ${window.portalData.databaseManagement.healthCenter.storageUsage.icon} kpi-icon-db"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Storage Usage</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-blue); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.databaseManagement.healthCenter.storageUsage.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600;">${window.portalData.databaseManagement.healthCenter.storageUsage.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "Database cluster health running at 99.99% availability.", businessImpact: "Zero data loss and sub-millisecond query response time.", aiRecommendation: "Schedule automated index defragmentation during off-peak hours.", recommendedAction: "Inspect Database Cluster", relatedModule: "Database Management"})}</div>
          </div>

          <!-- BACKUP HEALTH -->
          <div class="kpi-card-db has-exec-popover">
            <i class="fa-solid ${window.portalData.databaseManagement.healthCenter.backupHealth.icon} kpi-icon-db"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Backup Health</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-green); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.databaseManagement.healthCenter.backupHealth.value}</div>
            <div>
              <span class="badge badge-success" style="font-size: 0.62rem; padding: 2px 6px; background-color: rgba(52, 199, 89, 0.08); color: var(--color-green);">${window.portalData.databaseManagement.healthCenter.backupHealth.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "Database cluster health running at 99.99% availability.", businessImpact: "Zero data loss and sub-millisecond query response time.", aiRecommendation: "Schedule automated index defragmentation during off-peak hours.", recommendedAction: "Inspect Database Cluster", relatedModule: "Database Management"})}</div>
          </div>

          <!-- PERFORMANCE -->
          <div class="kpi-card-db has-exec-popover">
            <i class="fa-solid ${window.portalData.databaseManagement.healthCenter.performance.icon} kpi-icon-db"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Performance</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.databaseManagement.healthCenter.performance.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600;">${window.portalData.databaseManagement.healthCenter.performance.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "Database cluster health running at 99.99% availability.", businessImpact: "Zero data loss and sub-millisecond query response time.", aiRecommendation: "Schedule automated index defragmentation during off-peak hours.", recommendedAction: "Inspect Database Cluster", relatedModule: "Database Management"})}</div>
          </div>

          <!-- SECURITY & AUDIT -->
          <div class="kpi-card-db has-exec-popover">
            <i class="fa-solid ${window.portalData.databaseManagement.healthCenter.security.icon} kpi-icon-db"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Security & Audit</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.databaseManagement.healthCenter.security.value}</div>
            <div>
              <span class="badge badge-info" style="font-size: 0.62rem; padding: 2px 6px; background-color: rgba(0, 122, 255, 0.08); color: var(--color-blue);">${window.portalData.databaseManagement.healthCenter.security.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "Database cluster health running at 99.99% availability.", businessImpact: "Zero data loss and sub-millisecond query response time.", aiRecommendation: "Schedule automated index defragmentation during off-peak hours.", recommendedAction: "Inspect Database Cluster", relatedModule: "Database Management"})}</div>
          </div>

        </div>
      </section>

      <!-- SECTION 2: DATA INFRASTRUCTURE MAP CONTAINER -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-circle-nodes"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Data Infrastructure Flow & Relationship Map</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Executive visualization of connected applications, database relationships, data pipelines, and health states</span>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
          ${window.portalData.databaseManagement.infrastructureMap.nodes.map((node, idx) => `
            <div class="flow-node-card-db">
              <!-- Icon Container -->
              <div style="width: 34px; height: 34px; border-radius: 50%; background: rgba(0, 122, 255, 0.06); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.94rem; border: 1px solid rgba(0, 122, 255, 0.12);">
                <i class="fa-solid ${node.icon}"></i>
              </div>
              
              <!-- Name & Description -->
              <div style="margin-top: 8px;">
                <div style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary); line-height: 1.2;">${node.name}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 2px;">${node.desc}</div>
              </div>
              
              <!-- Status Badge -->
              <span class="badge badge-${node.statusClass}" style="font-size: 0.62rem; padding: 2px 8px; margin-top: 8px; background-color: ${node.statusClass === 'success' ? 'rgba(52, 199, 89, 0.08)' : 'rgba(255, 149, 0, 0.08)'}; color: ${node.statusClass === 'success' ? 'var(--color-green)' : 'var(--color-orange)'};">${node.status}</span>
            </div>
            ${idx < 3 ? `<div style="font-size: 0.85rem; color: var(--color-blue); font-weight: bold; margin: 0 4px;"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
          `).join('')}
        </div>
      </section>

      <!-- SECTION 3: ENTERPRISE DATABASE ECOSYSTEM -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="display: flex; align-items: center; justify-content: flex-start; gap: 10px; padding-bottom: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-database"></i>
          </div>
          <div>
            <span class="card-title" style="display: block; line-height: 1.2;">Enterprise Database Ecosystem</span>
            <span class="card-subtitle" style="display: block; margin-top: 2px;">Active database clusters, environments, current versions, and storage utilization parameters</span>
          </div>
        </div>
        <div class="card-body" style="padding-top: 8px;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;" id="dbLandscapeGrid">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 5: DATA HEALTH INSIGHTS -->
      <section class="card" style="margin-bottom: 1rem;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> AI Data Health Insights & Predictions</span>
            <span class="card-subtitle">Predictive models scanning index health, read/write workloads, and query latencies</span>
          </div>
          <span class="badge badge-grey">3 Active Models</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            ${window.portalData.databaseManagement.insights.map(ins => `
              <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary);">${ins.issue}</span>
                    <span class="badge badge-${ins.statusClass === 'success' ? 'success' : ins.statusClass === 'warning' ? 'warning' : 'info'}" style="font-size: 0.62rem; padding: 2px 6px;">${ins.statusClass.toUpperCase()}</span>
                  </div>
                  <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 10px;"><strong>Impact Path:</strong> ${ins.impact}</p>
                  
                  <!-- Insight recommendation box -->
                  <div style="background-color: #fbf5eb; border: 1px solid #f2e3cd; padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; color: #8a6d3b; line-height: 1.4;">
                    💡 <strong>Recommendation:</strong> ${ins.recommendation}
                  </div>
                </div>
                <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem; margin-top: 12px;" onclick="alert('CTO DATABASE Action: Acknowledging AI data recommendations.')">Acknowledge Insight</button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Local filters logic
    let searchVal = '';
    let typeFilter = 'all';
    let appFilter = 'all';
    let envFilter = 'all';
    let statusFilter = 'all';

    function drawLandscape() {
      const grid = document.getElementById('dbLandscapeGrid');
      if (!grid) return;

      const filtered = window.portalData.databaseManagement.landscape.filter(db => {
        const matchesSearch = db.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            db.type.toLowerCase().includes(searchVal.toLowerCase()) ||
                            db.app.toLowerCase().includes(searchVal.toLowerCase());
        
        const matchesType = (typeFilter === 'all' || db.type === typeFilter);
        const matchesApp = (appFilter === 'all' || db.app === appFilter);
        const matchesEnv = (envFilter === 'all' || db.env === envFilter);
        const matchesStatus = (statusFilter === 'all' || db.health === statusFilter);

        return matchesSearch && matchesType && matchesApp && matchesEnv && matchesStatus;
      });

      grid.innerHTML = filtered.map(db => `
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h4 style="font-size: 0.88rem; font-weight: 800; color: var(--text-primary);">${db.name}</h4>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${db.type} &bull; Version ${db.version}</div>
              </div>
              <span class="badge badge-${db.healthClass}" style="font-size: 0.65rem;">Health: ${db.health}</span>
            </div>

            <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 6px;">
              <div>Connected Application: <strong style="color: var(--text-primary);">${db.app}</strong></div>
              <div>Environment: <span style="font-weight: 700; color: var(--color-blue);">${db.env}</span></div>
              <div>Cluster Node Configuration: <span style="font-weight: 600;">${db.nodes}</span></div>
            </div>

            <!-- Storage Progress Bar -->
            <div style="margin-top: 12px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.74rem; margin-bottom: 3px;">
                <span>Storage Utilization</span>
                <strong>${db.storage}</strong>
              </div>
              <div style="width: 100%; height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden;">
                <div style="width: ${db.storage}; height: 100%; background: var(--color-${db.storageVal > 80 ? 'red' : db.storageVal > 60 ? 'orange' : 'green'});"></div>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px; font-size: 0.72rem;">
            <span style="color: var(--text-muted);">Read Latency: <strong>${db.latency}</strong></span>
            <button class="table-action-btn table-action-btn-neutral" onclick="window.openDatabaseDetailDrawer('${db.id}')">View Details</button>
          </div>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--text-muted); padding: 20px;">No databases match active filters.</div>`;
      }
    }

    // Attach listeners
    const searchInput = document.getElementById('dbSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscape();
      });
    }

    const typeSel = document.getElementById('dbTypeFilter');
    if (typeSel) {
      if (typeSel) typeSel.addEventListener('change', (e) => {
        typeFilter = e.target.value;
        drawLandscape();
      });
    }

    const appSel = document.getElementById('dbAppFilter');
    if (appSel) {
      if (appSel) appSel.addEventListener('change', (e) => {
        appFilter = e.target.value;
        drawLandscape();
      });
    }

    const envSel = document.getElementById('dbEnvFilter');
    if (envSel) {
      if (envSel) envSel.addEventListener('change', (e) => {
        envFilter = e.target.value;
        drawLandscape();
      });
    }

    const statusSel = document.getElementById('dbStatusFilter');
    if (statusSel) {
      if (statusSel) statusSel.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        drawLandscape();
      });
    }

    // Draw initial database landscape
    drawLandscape();
  }

  // --- DATABASE DETAILED PROFILE DRAWER ---
  window.openDatabaseDetailDrawer = function(id) {
    const item = window.portalData.databaseManagement.landscape.find(db => db.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `Database Profile: ${item.name} <span class="badge badge-${item.healthClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.health}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Database Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-info" style="color: var(--color-blue); font-size: 0.85rem;"></i> Database Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Database Engine:</strong> ${item.type} (v${item.version})</div>
            <div><strong style="color: var(--text-primary);">Owner Team:</strong> ${item.owner}</div>
            <div><strong style="color: var(--text-primary);">Connected Applications:</strong> ${item.app}</div>
            <div><strong style="color: var(--text-primary);">Target Environment:</strong> ${item.env}</div>
          </div>
        </div>

        <!-- Performance -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-gauge-high" style="color: var(--color-purple); font-size: 0.85rem;"></i> Performance & Load</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Average Latency:</strong> ${item.latency}</div>
            <div><strong style="color: var(--text-primary);">Cluster Load Status:</strong> ${item.load}</div>
            <div><strong style="color: var(--text-primary);">Slow Query Optimization:</strong> Active rulesets synced</div>
          </div>
        </div>

        <!-- Storage Management -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-hard-drive" style="color: var(--color-blue); font-size: 0.85rem;"></i> Storage Management</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Current Storage:</strong> ${item.storage} of disk allocations.</div>
            <div><strong style="color: var(--text-primary);">Growth Trend:</strong> ~2.5% increase per week.</div>
            <div><strong style="color: var(--text-primary);">Capacity Status:</strong> Nominal limits (gp3 volume expansion enabled).</div>
          </div>
        </div>

        <!-- Security -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-orange); font-size: 0.85rem;"></i> Security & Encryption</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Encryption Status:</strong> AES-256 Storage level active (AWS KMS managed keys).</div>
            <div><strong style="color: var(--text-primary);">Access Control:</strong> IAM restricted, security group VPCPeering nodes.</div>
            <div><strong style="color: var(--text-primary);">Compliance Status:</strong> ISO 26262 audit checks passed.</div>
          </div>
        </div>

        <!-- Backup & Recovery -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-cloud-arrow-up" style="color: var(--color-green); font-size: 0.85rem;"></i> Backup & Recovery Status</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Backup status:</strong> ${item.backupStatus}</div>
            <div><strong style="color: var(--text-primary);">Last snapshot taken:</strong> ${item.lastBackup}</div>
            <div><strong style="color: var(--text-primary);">Recovery Readiness:</strong> Verified & validated baseline (100% SLA)</div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--text-muted); font-size: 0.85rem;"></i> Recent Database Activity</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); font-style: italic;">
            ${item.queryRec}
          </div>
        </div>

          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // API MANAGEMENT MODULE - API OPERATIONS COMMAND CENTER
  // ==========================================================
  function renderAPIManagementModule() {
    viewSubpage.innerHTML = `
      <style>
        .api-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .api-filter-select:hover {
          border-color: var(--text-muted);
        }
        .kpi-card-api {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 105px;
          position: relative;
        }
        .kpi-icon-api {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--color-blue);
          font-size: 0.78rem;
        }
        .flow-node-card-api {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 10px;
          text-align: center;
          width: 175px;
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .flow-node-card-api:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .monitoring-bar-api {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
      </style>



      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS (cto2.mp4 t=70 single-row layout) -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-md);">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 350px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="apiSearchInput" placeholder="Search API name, service, owne">
        </div>
        <select class="api-filter-select" id="apiEnvFilter">
          <option value="all">Environment: All Environments</option>
          <option value="Production">Production</option>
          <option value="Staging">Staging</option>
        </select>
        <select class="api-filter-select" id="apiStatusFilter">
          <option value="all">Status: All Statuses</option>
          <option value="Healthy">Healthy</option>
          <option value="Needs Attention">Needs Attention</option>
        </select>
        <select class="api-filter-select" id="apiVersionFilter">
          <option value="all">Version: All Versions</option>
          <option value="v2.4">v2.4</option>
          <option value="v3.1">v3.1</option>
          <option value="v2.8">v2.8</option>
          <option value="v4.0">v4.0</option>
        </select>
        <select class="api-filter-select" id="apiServiceFilter">
          <option value="all">Service: All Services</option>
        </select>
        <select class="api-filter-select" id="apiTeamFilter">
          <option value="all">Owner Team: All Teams</option>
          <option value="IoT Team">IoT Team</option>
          <option value="Billing Team">Billing Team</option>
          <option value="Fleet Squad">Fleet Squad</option>
          <option value="Security Team">Security Team</option>
        </select>
      </div>

      <!-- SECTION 1: API OPERATIONS COMMAND OVERVIEW -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-network-wired"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">API Operations Command Overview</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Real-time enterprise ingress health, response latencies, and security status</span>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;">
          
          <!-- AVAILABILITY -->
          <div class="kpi-card-api has-exec-popover">
            <i class="fa-solid ${window.portalData.apiManagement.operationsOverview.availability.icon} kpi-icon-api"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Availability</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.apiManagement.operationsOverview.availability.value}</div>
            <div>
              <span class="badge badge-success" style="font-size: 0.62rem; padding: 2px 6px; background-color: rgba(52, 199, 89, 0.08); color: var(--color-green);">${window.portalData.apiManagement.operationsOverview.availability.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "API gateway operating at 12ms average latency.", businessImpact: "Ensures sub-millisecond partner API integration SLAs.", aiRecommendation: "Provision additional rate-limiting shards for peak hours.", recommendedAction: "Inspect API Gateway", relatedModule: "API Management"})}</div>
          </div>
          
          <!-- ACTIVE APIS -->
          <div class="kpi-card-api has-exec-popover">
            <i class="fa-solid ${window.portalData.apiManagement.operationsOverview.activeApis.icon} kpi-icon-api"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Active APIs</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.apiManagement.operationsOverview.activeApis.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600;">${window.portalData.apiManagement.operationsOverview.activeApis.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "API gateway operating at 12ms average latency.", businessImpact: "Ensures sub-millisecond partner API integration SLAs.", aiRecommendation: "Provision additional rate-limiting shards for peak hours.", recommendedAction: "Inspect API Gateway", relatedModule: "API Management"})}</div>
          </div>

          <!-- DAILY VOLUME -->
          <div class="kpi-card-api has-exec-popover">
            <i class="fa-solid ${window.portalData.apiManagement.operationsOverview.dailyVolume.icon} kpi-icon-api"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Daily Volume</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-blue); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.apiManagement.operationsOverview.dailyVolume.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-blue); font-weight: 600;">${window.portalData.apiManagement.operationsOverview.dailyVolume.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "API gateway operating at 12ms average latency.", businessImpact: "Ensures sub-millisecond partner API integration SLAs.", aiRecommendation: "Provision additional rate-limiting shards for peak hours.", recommendedAction: "Inspect API Gateway", relatedModule: "API Management"})}</div>
          </div>

          <!-- AVG LATENCY -->
          <div class="kpi-card-api has-exec-popover">
            <i class="fa-solid ${window.portalData.apiManagement.operationsOverview.avgLatency.icon} kpi-icon-api"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Avg Latency</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.apiManagement.operationsOverview.avgLatency.value}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600;">${window.portalData.apiManagement.operationsOverview.avgLatency.label}${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "API gateway operating at 12ms average latency.", businessImpact: "Ensures sub-millisecond partner API integration SLAs.", aiRecommendation: "Provision additional rate-limiting shards for peak hours.", recommendedAction: "Inspect API Gateway", relatedModule: "API Management"})}</div>
          </div>

          <!-- ERROR RATE -->
          <div class="kpi-card-api has-exec-popover">
            <i class="fa-solid ${window.portalData.apiManagement.operationsOverview.errorRate.icon} kpi-icon-api"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Error Rate</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-green); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.apiManagement.operationsOverview.errorRate.value}</div>
            <div>
              <span class="badge badge-success" style="font-size: 0.62rem; padding: 2px 6px; background-color: rgba(52, 199, 89, 0.08); color: var(--color-green);">${window.portalData.apiManagement.operationsOverview.errorRate.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "API gateway operating at 12ms average latency.", businessImpact: "Ensures sub-millisecond partner API integration SLAs.", aiRecommendation: "Provision additional rate-limiting shards for peak hours.", recommendedAction: "Inspect API Gateway", relatedModule: "API Management"})}</div>
          </div>

          <!-- GATEWAY AUTH -->
          <div class="kpi-card-api has-exec-popover">
            <i class="fa-solid ${window.portalData.apiManagement.operationsOverview.gatewayAuth.icon} kpi-icon-api"></i>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Gateway Auth</div>
            <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${window.portalData.apiManagement.operationsOverview.gatewayAuth.value}</div>
            <div>
              <span class="badge badge-info" style="font-size: 0.62rem; padding: 2px 6px; background-color: rgba(0, 122, 255, 0.08); color: var(--color-blue);">${window.portalData.apiManagement.operationsOverview.gatewayAuth.label}</span>
            ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: "API gateway operating at 12ms average latency.", businessImpact: "Ensures sub-millisecond partner API integration SLAs.", aiRecommendation: "Provision additional rate-limiting shards for peak hours.", recommendedAction: "Inspect API Gateway", relatedModule: "API Management"})}</div>
          </div>

        </div>
      </section>

      <!-- SECTION 2: API ECOSYSTEM MAP CONTAINER -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-share-nodes"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">API Ecosystem Communication Map</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Executive visualization of service dependencies, ingress relationships, and system connections</span>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
          ${window.portalData.apiManagement.ecosystemMap.nodes.map((node, idx) => `
            <div class="flow-node-card-api">
              <!-- Icon Container -->
              <div style="width: 34px; height: 34px; border-radius: 50%; background: rgba(0, 122, 255, 0.06); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.94rem; border: 1px solid rgba(0, 122, 255, 0.12);">
                <i class="fa-solid ${node.icon}"></i>
              </div>
              
              <!-- Name & Description -->
              <div style="margin-top: 8px;">
                <div style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary); line-height: 1.2;">${node.name}</div>
                <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 2px;">${node.desc}</div>
              </div>
              
              <!-- Status Badge -->
              <span class="badge badge-success" style="font-size: 0.62rem; padding: 2px 8px; margin-top: 8px; background-color: rgba(52, 199, 89, 0.08); color: var(--color-green);">${node.status}</span>
            </div>
            ${idx < 4 ? `<div style="font-size: 0.85rem; color: var(--color-blue); font-weight: bold; margin: 0 4px;"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
          `).join('')}
        </div>
      </section>

      <!-- SECTION 3: ENTERPRISE API SERVICE LANDSCAPE -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="display: flex; align-items: center; justify-content: flex-start; gap: 10px; padding-bottom: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-cubes"></i>
          </div>
          <div>
            <span class="card-title" style="display: block; line-height: 1.2;">Enterprise API Service Landscape</span>
            <span class="card-subtitle" style="display: block; margin-top: 2px;">Active API endpoints, owner teams, versions, environments, and performance status</span>
          </div>
        </div>
        <div class="card-body" style="padding-top: 8px;">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;" id="apiLandscapeGrid">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 4 & 5: SIDE-BY-SIDE COLUMNS AT THE BOTTOM -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 1rem;">
        
        <!-- COLUMN 1: OPERATIONAL MONITORING -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-chart-line" style="color: var(--color-blue);"></i> Operational API Monitoring</h4>
              <span class="badge badge-grey" style="font-size: 0.65rem;">Lightweight View</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Real-time throughput, latency trends, and geographic distribution</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-wave-square" style="color: var(--color-blue); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">Traffic: 14,200 req/sec Peak Throughput</div>
              </div>
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-circle-check" style="color: var(--color-green); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">Reliability Ratio: 99.99% Successful Reqs / 0.01% Error Rate</div>
              </div>
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-bolt" style="color: var(--color-orange); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">Latency Trend: 42ms Average Latency across US-East & EU-Central</div>
              </div>
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-earth-americas" style="color: var(--color-blue); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">Geographic Ingress: US-East (62%), EU-Central (28%), AP-South (10%)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUMN 2: AI API RECOMMENDATIONS -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> AI API Intelligence & Recommendations</h4>
              <span class="badge badge-grey" style="font-size: 0.65rem;">3 AI Insights</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Intelligent API optimization and security alerts</p>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${window.portalData.apiManagement.insights.map(ins => `
                <div class="card" style="padding: 10px 12px; margin-bottom: 0; border: 1px solid var(--border-color); background-color: var(--bg-app); border-radius: var(--radius-md);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary);">${ins.impact}</span>
                    <span class="badge badge-${ins.impactLevel === 'High' ? 'danger' : ins.impactLevel === 'Medium' ? 'warning' : 'info'}" style="font-size: 0.6rem; padding: 1px 5px;">${ins.impactLevel} Impact</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #8a6d3b; background-color: #fbf5eb; padding: 6px; border-radius: 4px; border: 1px solid #f2e3cd;">
                    💡 <strong>Recommendation:</strong> ${ins.recommendation}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `;

    // Local filters logic
    let searchVal = '';
    let envFilter = 'all';
    let statusFilter = 'all';
    let versionFilter = 'all';
    let teamFilter = 'all';

    function drawLandscape() {
      const grid = document.getElementById('apiLandscapeGrid');
      if (!grid) return;

      const filtered = window.portalData.apiManagement.landscape.filter(api => {
        const matchesSearch = api.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                            api.purpose.toLowerCase().includes(searchVal.toLowerCase()) ||
                            api.owner.toLowerCase().includes(searchVal.toLowerCase());
        
        const matchesEnv = (envFilter === 'all' || api.env === envFilter);
        const matchesStatus = (statusFilter === 'all' || api.status === statusFilter);
        const matchesVersion = (versionFilter === 'all' || api.version === versionFilter);
        const matchesTeam = (teamFilter === 'all' || api.owner === teamFilter);

        return matchesSearch && matchesEnv && matchesStatus && matchesVersion && matchesTeam;
      });

      grid.innerHTML = filtered.map(api => `
        <div class="card" style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h4 style="font-size: 0.84rem; font-weight: 800; color: var(--text-primary); line-height: 1.25;">${api.name}</h4>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">${api.purpose}</div>
              </div>
              <span class="badge badge-${api.statusClass}" style="font-size: 0.62rem; padding: 2px 6px;">${api.status}</span>
            </div>

            <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 6px;">
              <div>Owner Team: <strong style="color: var(--text-primary); font-weight: 700;">${api.owner}</strong> &bull; Version: <strong style="color: var(--text-primary); font-weight: 700;">${api.version}</strong></div>
              <div>Environment: <strong style="color: var(--text-primary); font-weight: 700;">${api.env}</strong> &bull; Response: <strong style="color: var(--color-blue); font-weight: 700;">${api.response}</strong></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px; font-size: 0.7rem;">
            <span style="color: var(--text-muted); font-size: 0.65rem;">Click to inspect drawer</span>
            <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.68rem;" onclick="window.openAPIDetailDrawer('${api.id}')">View Details</button>
          </div>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 4; text-align: center; color: var(--text-muted); padding: 20px;">No APIs match active filters.</div>`;
      }
    }

    // Attach listeners
    const searchInput = document.getElementById('apiSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscape();
      });
    }

    const envSel = document.getElementById('apiEnvFilter');
    if (envSel) {
      if (envSel) envSel.addEventListener('change', (e) => {
        envFilter = e.target.value;
        drawLandscape();
      });
    }

    const statusSel = document.getElementById('apiStatusFilter');
    if (statusSel) {
      if (statusSel) statusSel.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        drawLandscape();
      });
    }

    const verSel = document.getElementById('apiVersionFilter');
    if (verSel) {
      if (verSel) verSel.addEventListener('change', (e) => {
        versionFilter = e.target.value;
        drawLandscape();
      });
    }

    const teamSel = document.getElementById('apiTeamFilter');
    if (teamSel) {
      if (teamSel) teamSel.addEventListener('change', (e) => {
        teamFilter = e.target.value;
        drawLandscape();
      });
    }

    // Draw initial API landscape
    drawLandscape();
  }

  // --- API DETAILED PROFILE DRAWER ---
  window.openAPIDetailDrawer = function(id) {
    const item = window.portalData.apiManagement.landscape.find(api => api.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `API Profile: ${item.name} <span class="badge badge-${item.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.status}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- API Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-info" style="color: var(--color-blue); font-size: 0.85rem;"></i> API Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Purpose:</strong> ${item.purpose}</div>
            <div><strong style="color: var(--text-primary);">Owner Team:</strong> ${item.owner}</div>
            <div><strong style="color: var(--text-primary);">Version:</strong> ${item.version}</div>
            <div><strong style="color: var(--text-primary);">Environment:</strong> ${item.env}</div>
          </div>
        </div>

        <!-- Performance -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-gauge-high" style="color: var(--color-purple); font-size: 0.85rem;"></i> Performance</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Daily Volume:</strong> ${item.requestVolume}</div>
            <div><strong style="color: var(--text-primary);">Avg Response Time:</strong> ${item.avgLatency}</div>
            <div><strong style="color: var(--text-primary);">Error Rate:</strong> ${item.errorRate}</div>
          </div>
        </div>

        <!-- Security -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-shield-halved" style="color: var(--color-orange); font-size: 0.85rem;"></i> Security & Compliance</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Authentication Method:</strong> ${item.authMethod}</div>
            <div><strong style="color: var(--text-primary);">Access Control:</strong> ${item.accessControl}</div>
            <div><strong style="color: var(--text-primary);">SSL/mTLS Certificate:</strong> ${item.certStatus}</div>
          </div>
        </div>

        <!-- Connected Systems -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-nodes" style="color: var(--color-blue); font-size: 0.85rem;"></i> Connected Systems</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Consuming Apps:</strong> ${item.connectedApps}</div>
          </div>
        </div>

        <!-- Deployment History -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-cloud-arrow-up" style="color: var(--color-green); font-size: 0.85rem;"></i> Deployment History</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); font-style: italic;">
            ${item.history}
          </div>
        </div>

        <!-- Recent Activity -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--text-muted); font-size: 0.85rem;"></i> Recent API Activity</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); font-style: italic;">
            ${item.activity}
          </div>
        </div>

          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // BUG TRACKING MODULE - EXECUTIVE QUALITY INTELLIGENCE CENTER
  // ==========================================================
  function renderBugTrackingModule() {
    viewSubpage.innerHTML = `
      <style>
        .bug-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .bug-filter-select:hover {
          border-color: var(--text-muted);
        }
        .kpi-card-bug {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100px; height: auto;
          position: relative;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .kpi-card-bug:hover {
          border-color: var(--color-blue);
          transform: translateY(-1px);
        }
        .kpi-icon-bug {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--color-blue);
          font-size: 0.78rem;
        }
        .kpi-hover-panel {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease, padding 0.3s ease;
          background: rgba(0, 122, 255, 0.04);
          border: 1px dashed rgba(0, 122, 255, 0.2);
          border-radius: var(--radius-sm);
          padding: 0 10px;
          margin-top: 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .kpi-card-bug:hover .kpi-hover-panel {
          max-height: 300px;
          opacity: 1;
          padding: 10px;
          margin-top: 8px;
        }
        .prod-card-bug {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .prod-card-bug:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .risk-row-bug {
          display: grid;
          grid-template-columns: 100px repeat(6, 1fr);
          gap: 10px;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.78rem;
        }
        .decision-card-bug {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 195px;
        }
        .copilot-insight-bug {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 8px;
        }
      </style>



      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-md);">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 300px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="bugSearchInput" placeholder="Search bug, product, team...">
        </div>
        <select class="bug-filter-select" id="bugProductFilter">
          <option value="all">Product: All Products</option>
          <option value="EVcare.AI">EVcare.AI</option>
          <option value="Mobile Application">Mobile Application</option>
          <option value="Fleet Dashboard">Fleet Dashboard</option>
          <option value="Web Portal">Web Portal</option>
          <option value="Office Portal">Office Portal</option>
        </select>
        <select class="bug-filter-select" id="bugSeverityFilter">
          <option value="all">Severity: All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select class="bug-filter-select" id="bugStatusFilter">
          <option value="all">Status: All Statuses</option>
          <option value="Open (Fixing)">Open</option>
          <option value="Under Review">Under Review</option>
        </select>
        <select class="bug-filter-select" id="bugTeamFilter">
          <option value="all">Engineering Team: All Teams</option>
          <option value="IoT Team">IoT Team</option>
          <option value="Billing Team">Billing Team</option>
          <option value="Fleet Squad">Fleet Squad</option>
          <option value="Security Team">Security Team</option>
        </select>
        <select class="bug-filter-select" id="bugEnvFilter">
          <option value="all">Environment: All</option>
          <option value="Production">Production</option>
          <option value="Staging">Staging</option>
        </select>
      </div>

      <!-- SECTION 1: EXECUTIVE QUALITY OVERVIEW (KPIs with Hover Insights) -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-medal"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Executive Quality Overview</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Hover over any metric card to review live situation reports, business impacts, and AI recommendations</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
          ${window.portalData.bugTracking.overviewKpis.map(kpi => `
            <div class="kpi-card-bug has-exec-popover">
              <i class="fa-solid ${kpi.icon} kpi-icon-bug"></i>
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">${kpi.title}</div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${kpi.value}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.68rem; font-weight: 600; color: var(--text-muted);">${kpi.change}</span>
                <span class="badge badge-${kpi.trendClass}" style="font-size: 0.62rem; padding: 1px 5px;">${kpi.trend}</span>
              </div>
              
              <!-- Hover Insight Panel -->
              ${window.createExecPopoverHTML({status: kpi.status === "Zero Critical" ? "Optimal" : "Attention", statusColor: kpi.status === "Zero Critical" ? "success" : "warning", situation: `${kpi.title}: ${kpi.value} open across active release branches.`, businessImpact: "Zero high-severity blockers impacting production SLAs.", aiRecommendation: "Schedule triage for remaining non-critical items.", recommendedAction: "Review Bug Queue", relatedModule: "Bug Tracking"})}</div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 2: PRODUCT QUALITY INTELLIGENCE -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-cubes"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Product Quality Intelligence</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Core software products, active releases, open bug rates, and customer experience indexes</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 12px;">
          ${window.portalData.bugTracking.products.map(prod => `
            <div class="prod-card-bug" onclick="window.toggleProductQualityWorkspace('${prod.id}')">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--text-primary);">${prod.name}</h4>
                <span class="badge badge-${prod.riskClass}" style="font-size: 0.62rem; padding: 1px 5px;">Risk: ${prod.risk}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 4px;">
                <div>Quality Score: <strong style="color: var(--text-primary);">${prod.quality}</strong></div>
                <div>Stability Score: <strong style="color: var(--text-primary);">${prod.stability}</strong></div>
                <div>Crash Rate: <strong style="color: var(--color-red);">${prod.crashRate}</strong></div>
                <div>Open/Critical Issues: <strong>${prod.open} open (${prod.critical} P0)</strong></div>
                <div>Active Release: <strong style="color: var(--color-blue);">${prod.release}</strong></div>
              </div>
              <div style="font-size: 0.65rem; color: var(--text-muted); text-align: center; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 8px;">
                Click to inspect Quality Workspace
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Inline Product Quality Workspace Container -->
        <div id="productBugWorkspaceContainer" style="display: none; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-md); transition: all 0.3s ease;">
          <!-- Dynamically populated -->
        </div>
      </section>

      <!-- SECTION 3: ISSUE RISK INTELLIGENCE -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Issue Risk Intelligence</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Risk exposure matrices based on bug counts, mean time to resolve (MTTR), and affected user volumes</span>
          </div>
        </div>

        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; background-color: var(--bg-surface);">
          <div class="risk-row-bug" style="background-color: var(--bg-app); font-weight: 800; border-bottom: 2px solid var(--border-color);">
            <div>Severity</div>
            <div>Open Count</div>
            <div>Resolved Today</div>
            <div>Avg MTTR</div>
            <div>Affected Products</div>
            <div>Business Impact</div>
            <div>CTO Action</div>
          </div>
          ${window.portalData.bugTracking.issueRisks.map(risk => `
            <div class="risk-row-bug">
              <span class="badge badge-${risk.severity === 'Critical' ? 'danger' : risk.severity === 'High' ? 'warning' : 'info'}" style="font-size: 0.72rem; padding: 2px 6px;">${risk.severity}</span>
              <div style="font-weight: 700; font-size: 0.85rem;">${risk.openCount} open</div>
              <div style="color: var(--color-green); font-weight: 600;">${risk.resolvedToday} fixed</div>
              <div>${risk.resolutionTime}</div>
              <div>${risk.products}</div>
              <div style="font-style: italic;">${risk.impact}</div>
              <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.7rem;" onclick="alert('CTO RISK: ${risk.rec}')">Review Recommendation</button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- EXECUTIVE ISSUE LANDSCAPE BACKLOG -->
      <section class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="display: flex; align-items: center; justify-content: flex-start; gap: 10px; padding-bottom: 8px; margin-bottom: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-list-check"></i>
          </div>
          <div>
            <span class="card-title" style="display: block; line-height: 1.2;">Executive Backlog Landscape</span>
            <span class="card-subtitle" style="display: block; margin-top: 2px;">Select any issue profile to activate the right-side quality drawer and execute CTO control overrides</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;" id="bugLandscapeGrid">
            <!-- Dynamically populated -->
          </div>
        </div>
      </section>

      <!-- SECTION 5: QUALITY INTELLIGENCE CENTER & CTO DECISION CENTER (Side-by-Side) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 1.5rem;">
        
        <!-- QUALITY INTELLIGENCE CENTER -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-chart-line" style="color: var(--color-blue);"></i> Quality Intelligence Center</h4>
              <span class="badge badge-grey">Operational Analytics</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Bug Trends, Regression performance, and Release stability indices</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-heart-pulse" style="color: var(--color-green); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">Current Quality Health: ${window.portalData.bugTracking.analytics.healthScore} (Excellent)</div>
              </div>
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-triangle-exclamation" style="color: var(--color-red); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">Major Quality Risk: ${window.portalData.bugTracking.analytics.qualityRisks}</div>
              </div>
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-cloud-arrow-up" style="color: var(--color-blue); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">Predicted Release Quality: ${window.portalData.bugTracking.analytics.forecast}</div>
              </div>
              <div class="monitoring-bar-api">
                <i class="fa-solid fa-flask" style="color: var(--color-orange); font-size: 0.94rem;"></i>
                <div style="font-size: 0.8rem; font-weight: 800;">CTO Recommendation: ${window.portalData.bugTracking.analytics.recommendations}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTO DECISION CENTER -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> CTO Quality Decision Center</h4>
              <span class="badge badge-grey">Critical Decisions</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Approve hotfixes, assign engineering leads, or scale architecture limits</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
              ${window.portalData.bugTracking.decisions.map(dec => `
                <div class="decision-card-bug">
                  <div>
                    <span class="badge badge-${dec.priorityClass}" style="font-size: 0.58rem; padding: 1px 4px; margin-bottom: 6px;">${dec.priority}</span>
                    <div style="font-size: 0.74rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; margin-bottom: 4px;">${dec.issue}</div>
                    <div style="font-size: 0.65rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 4px;"><strong>Impact:</strong> ${dec.impact}</div>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px; border-top: 1px solid var(--border-color); padding-top: 6px;">
                    <button class="btn btn-primary btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Approved primary action - ${dec.primaryAction}')">${dec.primaryAction}</button>
                    <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Dispatched secondary action - ${dec.secondaryAction}')">${dec.secondaryAction}</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>

      <!-- SECTION 7: AI QUALITY COPILOT -->
      <section class="card" style="margin-bottom: 1rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">AI Quality Copilot</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Predictive machine learning audits scanning regression logs, database index lock risks, and release forecasts</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          ${window.portalData.bugTracking.copilotInsights.map(cop => `
            <div class="copilot-insight-bug">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary);">${cop.prediction}</span>
                <span class="badge badge-warning" style="font-size: 0.65rem;">Confidence: ${cop.confidence}</span>
              </div>
              <div style="font-size: 0.74rem; color: var(--text-secondary); margin-bottom: 8px;"><strong>Impact Severity:</strong> ${cop.impact}</div>
              <div style="font-size: 0.74rem; color: #8a6d3b; background-color: #fbf5eb; padding: 8px; border-radius: 4px; border: 1px solid #f2e3cd; margin-bottom: 8px;">
                💡 <strong>Recommendation:</strong> ${cop.recommendation}
              </div>
              <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.72rem;" onclick="alert('CTO COPILOT: Executing suggested action - ${cop.action}')">${cop.action}</button>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    // Local filters logic
    let searchVal = '';
    let prodFilter = 'all';
    let severityFilter = 'all';
    let statusFilter = 'all';
    let teamFilter = 'all';
    let envFilter = 'all';

    function drawLandscape() {
      const grid = document.getElementById('bugLandscapeGrid');
      if (!grid) return;

      const filtered = window.portalData.bugTracking.landscape.filter(bug => {
        const matchesSearch = bug.title.toLowerCase().includes(searchVal.toLowerCase()) ||
                            bug.desc.toLowerCase().includes(searchVal.toLowerCase()) ||
                            bug.team.toLowerCase().includes(searchVal.toLowerCase());
        
        const matchesProd = (prodFilter === 'all' || bug.product === prodFilter);
        const matchesSeverity = (severityFilter === 'all' || bug.severity === severityFilter);
        const matchesStatus = (statusFilter === 'all' || bug.status === statusFilter);
        const matchesTeam = (teamFilter === 'all' || bug.team === teamFilter);
        const matchesEnv = (envFilter === 'all' || bug.env === envFilter);

        return matchesSearch && matchesProd && matchesSeverity && matchesStatus && matchesTeam && matchesEnv;
      });

      grid.innerHTML = filtered.map(bug => `
        <div class="card" style="padding: 12px; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h4 style="font-size: 0.84rem; font-weight: 800; color: var(--text-primary); line-height: 1.25;">${bug.title}</h4>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">${bug.desc}</div>
              </div>
              <span class="badge badge-${bug.severity === 'Critical' ? 'danger' : 'warning'}" style="font-size: 0.62rem; padding: 2px 6px;">${bug.severity}</span>
            </div>

            <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 6px;">
              <div>Owner Team: <strong style="color: var(--text-primary); font-weight: 700;">${bug.team}</strong> &bull; Environment: <span style="font-weight: 600;">${bug.env}</span></div>
              <div>Connected App: <strong style="color: var(--text-primary); font-weight: 700;">${bug.product}</strong> &bull; Release: <strong style="color: var(--color-blue); font-weight: 700;">${bug.release}</strong></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px; font-size: 0.7rem;">
            <span style="color: var(--text-muted); font-size: 0.65rem;">Click to inspect drawer</span>
            <button class="table-action-btn table-action-btn-neutral" style="padding: 2px 6px; font-size: 0.68rem;" onclick="window.openBugDetailDrawer('${bug.id}')">View Details</button>
          </div>
        </div>
      `).join('');

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--text-muted); padding: 20px;">No bug reports match active filters.</div>`;
      }
    }

    // Toggle Product Quality Workspace
    window.toggleProductQualityWorkspace = function(prodId) {
      const container = document.getElementById('productBugWorkspaceContainer');
      if (!container) return;

      const prod = window.portalData.bugTracking.products.find(p => p.id === prodId);
      if (!prod) return;

      if (container.style.display === 'block' && container.getAttribute('data-active-id') === prodId) {
        container.style.display = 'none';
        return;
      }

      container.setAttribute('data-active-id', prodId);
      container.style.display = 'block';
      container.innerHTML = `
        <h3 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 10px; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
          Product Quality Workspace: ${prod.name}
        </h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.78rem; color: var(--text-secondary);">
          <div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Overview:</strong> Software quality stands at ${prod.quality} with stability at ${prod.stability}.</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Affected Components:</strong> ${prod.workspace.components.join(', ')}</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Recent Releases:</strong> ${prod.workspace.recentReleases.join(', ')}</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Current Quality Score:</strong> ${prod.quality} (${prod.trend} trend)</div>
          </div>
          <div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Recent Critical Issues:</strong> ${prod.workspace.recentIssues.join(', ')}</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Related APIs:</strong> ${prod.workspace.apis.join(', ')}</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Infrastructure Status:</strong> ${prod.workspace.infrastructure}</div>
            <div style="background-color: #fbf5eb; padding: 6px; border: 1px solid #f2e3cd; border-radius: 4px; margin-top: 6px; color: #8a6d3b;">
              💡 <strong>AI Recommendations:</strong> ${prod.workspace.improvements}
            </div>
          </div>
        </div>
      `;
    };

    // Attach listeners
    const searchInput = document.getElementById('bugSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscape();
      });
    }

    const prodSel = document.getElementById('bugProductFilter');
    if (prodSel) {
      if (prodSel) prodSel.addEventListener('change', (e) => {
        prodFilter = e.target.value;
        drawLandscape();
      });
    }

    const sevSel = document.getElementById('bugSeverityFilter');
    if (sevSel) {
      if (sevSel) sevSel.addEventListener('change', (e) => {
        severityFilter = e.target.value;
        drawLandscape();
      });
    }

    const statSel = document.getElementById('bugStatusFilter');
    if (statSel) {
      if (statSel) statSel.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        drawLandscape();
      });
    }

    const teamSel = document.getElementById('bugTeamFilter');
    if (teamSel) {
      if (teamSel) teamSel.addEventListener('change', (e) => {
        teamFilter = e.target.value;
        drawLandscape();
      });
    }

    const envSel = document.getElementById('bugEnvFilter');
    if (envSel) {
      if (envSel) envSel.addEventListener('change', (e) => {
        envFilter = e.target.value;
        drawLandscape();
      });
    }

    // Draw initial bug landscape
    drawLandscape();
  }

  // --- BUG TRACKING DETAILED PROFILE DRAWER ---
  window.openBugDetailDrawer = function(id) {
    const item = window.portalData.bugTracking.landscape.find(bug => bug.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `Quality Case: ${item.title} <span class="badge badge-${item.severity === 'Critical' ? 'danger' : 'warning'}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.severity}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Issue Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-info" style="color: var(--color-blue); font-size: 0.85rem;"></i> Issue Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Title:</strong> ${item.title}</div>
            <div><strong style="color: var(--text-primary);">Description:</strong> ${item.desc}</div>
            <div><strong style="color: var(--text-primary);">Affected Product:</strong> ${item.product}</div>
            <div><strong style="color: var(--text-primary);">Category:</strong> ${item.category}</div>
            <div><strong style="color: var(--text-primary);">Business Impact:</strong> ${item.impact}</div>
            <div><strong style="color: var(--text-primary);">Users Affected:</strong> ${item.usersAffected}</div>
            <div><strong style="color: var(--text-primary);">Severity / Priority:</strong> ${item.severity} / ${item.priority}</div>
          </div>
        </div>

        <!-- Technical Information -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-terminal" style="color: var(--color-purple); font-size: 0.85rem;"></i> Technical Information</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Environment:</strong> ${item.env}</div>
            <div><strong style="color: var(--text-primary);">Affected Component:</strong> ${item.component}</div>
            <div><strong style="color: var(--text-primary);">Related Service:</strong> ${item.service}</div>
            <div><strong style="color: var(--text-primary);">Release Version:</strong> ${item.release}</div>
          </div>
        </div>

        <!-- Resolution Information -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-list-check" style="color: var(--color-blue); font-size: 0.85rem;"></i> Resolution Information</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Current Status:</strong> ${item.status}</div>
            <div><strong style="color: var(--text-primary);">Owner Team:</strong> ${item.team}</div>
            <div><strong style="color: var(--text-primary);">Estimated Resolution:</strong> ${item.estResolution}</div>
            <div><strong style="color: var(--text-primary);">Related Sprint / Release:</strong> ${item.sprint} / ${item.relRelease}</div>
            <div><strong style="color: var(--text-primary);">Related API / Database:</strong> ${item.api} / ${item.db}</div>
            <div><strong style="color: var(--text-primary);">Related Infrastructure:</strong> ${item.infra}</div>
          </div>
        </div>

        <!-- AI Root Cause Analysis -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-robot" style="color: var(--color-green); font-size: 0.85rem;"></i> AI Root Cause Analysis</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Detected Root Cause:</strong> ${item.rootCause}</div>
            <div style="background-color: #fbf5eb; padding: 6px; border: 1px solid #f2e3cd; border-radius: 4px; margin-top: 4px; color: #8a6d3b;">
              💡 <strong>Prevention:</strong> ${item.prevention}
            </div>
          </div>
        </div>

        <!-- Executive Control Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO BUG: Dispatched authorization for Emergency Hotfix rollout on ${item.relRelease}.')">Approve Emergency Hotfix</button>
          <button class="btn btn-outline" onclick="alert('CTO BUG: Opening Sprint Workspace for ${item.sprint}...')">Open Sprint</button>
          <button class="btn btn-outline" onclick="alert('CTO BUG: Directing to DevOps Release Center pipelines...')">Open DevOps</button>
          <button class="btn btn-outline" onclick="alert('CTO BUG: Sending slack alert dispatch override to Engineering Manager.')">Notify Engineering Manager</button>
          <button class="btn btn-outline" onclick="alert('CTO BUG: Executive quality incident report generated.')">Generate Executive Report</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // FEATURE REQUESTS MODULE - EXECUTIVE PRODUCT INNOVATION CENTER
  // ==========================================================
  function renderFeatureRequestsModule() {
    viewSubpage.innerHTML = `
      <style>
        .feat-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .feat-filter-select:hover {
          border-color: var(--text-muted);
        }
        .kpi-card-feat {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100px; height: auto;
          position: relative;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .kpi-card-feat:hover {
          border-color: var(--color-blue);
          transform: translateY(-1px);
        }
        .kpi-icon-feat {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--color-blue);
          font-size: 0.78rem;
        }
        .kpi-hover-panel-feat {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease, padding 0.3s ease;
          background: rgba(0, 122, 255, 0.04);
          border: 1px dashed rgba(0, 122, 255, 0.2);
          border-radius: var(--radius-sm);
          padding: 0 10px;
          margin-top: 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .kpi-card-feat:hover .kpi-hover-panel-feat {
          max-height: 300px;
          opacity: 1;
          padding: 10px;
          margin-top: 8px;
        }
        .feat-category-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .feat-item-card {
          background: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .feat-item-card:hover {
          transform: translateY(-1px);
          border-color: var(--color-blue);
        }
        .impact-card-feat {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 150px;
        }
        .decision-card-feat {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 195px;
        }
        .copilot-insight-feat {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 8px;
        }
      </style>



      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-md);">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 300px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="featSearchInput" placeholder="Search feature, product, owner...">
        </div>
        <select class="feat-filter-select" id="featProductFilter">
          <option value="all">Product: All Products</option>
          <option value="EVcare.AI">EVcare.AI</option>
          <option value="Mobile Application">Mobile Application</option>
          <option value="Fleet Dashboard">Fleet Dashboard</option>
          <option value="Web Portal">Web Portal</option>
        </select>
        <select class="feat-filter-select" id="featPriorityFilter">
          <option value="all">Priority: All Priorities</option>
          <option value="P0 Critical">P0 Critical</option>
          <option value="P1 High">P1 High</option>
          <option value="P2 Medium">P2 Medium</option>
          <option value="P3 Low">P3 Low</option>
        </select>
        <select class="feat-filter-select" id="featStatusFilter">
          <option value="all">Status: All Statuses</option>
          <option value="Evaluating">Evaluating</option>
          <option value="Under Review">Under Review</option>
          <option value="Plan Approved">Plan Approved</option>
        </select>
        <select class="feat-filter-select" id="featSourceFilter">
          <option value="all">Request Source: All</option>
          <option value="B2B Fleet Operator Group">B2B Fleet Operator</option>
          <option value="Finance & Account Manager">Finance Team</option>
          <option value="DevOps & Infrastructure Team">DevOps Team</option>
          <option value="Strategic Partnerships Division">Strategic Partnerships</option>
        </select>
      </div>

      <!-- SECTION 1: EXECUTIVE REQUEST OVERVIEW (KPIs with Hover Insights) -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-chart-line"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Executive Request Overview</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Hover over any metric card to review live situation reports, business impacts, and AI recommendations</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;">
          ${window.portalData.featureRequests.overviewKpis.map(kpi => `
            <div class="kpi-card-feat has-exec-popover">
              <i class="fa-solid ${kpi.icon} kpi-icon-feat"></i>
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">${kpi.title}</div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${kpi.value}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.68rem; font-weight: 600; color: var(--text-muted);">${kpi.change}</span>
                <span class="badge badge-${kpi.trendClass}" style="font-size: 0.62rem; padding: 1px 5px;">${kpi.trend}</span>
              </div>
              
              <!-- Hover Insight Panel -->
              ${window.createExecPopoverHTML({status: "Optimal", statusColor: "success", situation: `${kpi.title} currently at ${kpi.value} across customer portals.`, businessImpact: "Directly drives enterprise customer satisfaction score.", aiRecommendation: "Prioritize top 3 voted telemetry features for Sprint 43.", recommendedAction: "Review Feature Backlog", relatedModule: "Feature Requests"})}</div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 2: FEATURE PRIORITY INTELLIGENCE -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-cubes"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Feature Priority Intelligence</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Strategic grouping of incoming enhancements, business scores, and complexity metrics</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;" id="featPriorityGrid">
          
          <!-- HIGH STRATEGIC VALUE -->
          <div class="feat-category-card">
            <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--color-red); border-bottom: 2px solid var(--color-red); padding-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
              <span>High Strategic Value</span>
              <span class="badge badge-danger" id="featStrategicCount">0</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="featStrategicList"></div>
          </div>

          <!-- GROWTH OPPORTUNITIES -->
          <div class="feat-category-card">
            <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--color-orange); border-bottom: 2px solid var(--color-orange); padding-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
              <span>Growth Opportunities</span>
              <span class="badge badge-warning" id="featGrowthCount">0</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="featGrowthList"></div>
          </div>

          <!-- OPERATIONAL IMPROVEMENTS -->
          <div class="feat-category-card">
            <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--color-blue); border-bottom: 2px solid var(--color-blue); padding-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
              <span>Operational Improvements</span>
              <span class="badge badge-info" id="featOperationalCount">0</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="featOperationalList"></div>
          </div>

          <!-- INNOVATION IDEAS -->
          <div class="feat-category-card">
            <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--color-green); border-bottom: 2px solid var(--color-green); padding-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
              <span>Innovation Ideas</span>
              <span class="badge badge-success" id="featInnovationCount">0</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="featInnovationList"></div>
          </div>

        </div>
      </section>

      <!-- SECTION 4: PRODUCT INNOVATION INSIGHTS -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-chart-simple"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Product Innovation Insights</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Visual distribution parameters tracking value scores, client demographics, and pain points</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 12px;">
          <div class="impact-card-feat">
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Most Requested Products</div>
            <div style="font-size: 1.15rem; font-weight: 800; margin: 6px 0;">EVcare.AI (54%)</div>
            <div style="font-size: 0.74rem; color: var(--text-secondary);">Fleet Dashboard (32%), Web Portal (14%)</div>
          </div>
          <div class="impact-card-feat">
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Top Customer Pain Point</div>
            <div style="font-size: 1.15rem; font-weight: 800; margin: 6px 0; color: var(--color-red);">Battery Decay Anxiety</div>
            <div style="font-size: 0.74rem; color: var(--text-secondary);">Urgency score for State-of-Health is 9.5/10</div>
          </div>
          <div class="impact-card-feat">
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Business Value Distribution</div>
            <div style="font-size: 1.15rem; font-weight: 800; margin: 6px 0; color: var(--color-green);">$180K/yr Potential ROI</div>
            <div style="font-size: 0.74rem; color: var(--text-secondary);">Core Strategic integrations make up 65%</div>
          </div>
          <div class="impact-card-feat">
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Innovation Trend</div>
            <div style="font-size: 1.15rem; font-weight: 800; margin: 6px 0; color: var(--color-blue);">${window.portalData.featureRequests.analytics.innovationTrend}</div>
            <div style="font-size: 0.74rem; color: var(--text-secondary);">Emerging: ${window.portalData.featureRequests.analytics.emergingNeeds}</div>
          </div>
        </div>

        <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45;">
          💡 <strong>AI Innovation Summary:</strong> ${window.portalData.featureRequests.analytics.aiSummary}
          <br><strong style="color: var(--text-primary);">Recommended Investment Strategy:</strong> ${window.portalData.featureRequests.analytics.recommendedInvestments}
        </div>
      </section>

      <!-- SECTION 5: CROSS-MODULE IMPACT -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-share-nodes"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Cross-Module Impact Summary</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Status summaries and action shortcuts from other CTO modules</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
          
          <!-- SOFTWARE DEVELOPMENT -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; display: flex; flex-direction: column; justify-content: space-between; height: 130px;">
            <div>
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Software Development</strong>
              <div>Dev Capacity: <strong>${window.portalData.featureRequests.crossModuleImpact.development.capacity}</strong></div>
              <div style="color: var(--text-muted); margin-top: 2px;">Readiness: ${window.portalData.featureRequests.crossModuleImpact.development.readiness}</div>
            </div>
            <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="window.switchRoute('${window.portalData.featureRequests.crossModuleImpact.development.shortcut}')">Open Software Dev</button>
          </div>

          <!-- PRODUCT ROADMAP -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; display: flex; flex-direction: column; justify-content: space-between; height: 130px;">
            <div>
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Product Roadmap</strong>
              <div>Planning: <strong>${window.portalData.featureRequests.crossModuleImpact.roadmap.status}</strong></div>
              <div style="color: var(--text-muted); margin-top: 2px;">Release Window: ${window.portalData.featureRequests.crossModuleImpact.roadmap.window}</div>
            </div>
            <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="window.switchRoute('${window.portalData.featureRequests.crossModuleImpact.roadmap.shortcut}')">Open Product Roadmap</button>
          </div>

          <!-- SPRINT MANAGEMENT -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; display: flex; flex-direction: column; justify-content: space-between; height: 130px;">
            <div>
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Sprint Management</strong>
              <div>Status: <strong>${window.portalData.featureRequests.crossModuleImpact.sprints.status}</strong></div>
              <div style="color: var(--text-muted); margin-top: 2px;">Next: ${window.portalData.featureRequests.crossModuleImpact.sprints.nextSprint}</div>
            </div>
            <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="window.switchRoute('${window.portalData.featureRequests.crossModuleImpact.sprints.shortcut}')">Open Sprint Mgmt</button>
          </div>

          <!-- BUG TRACKING -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; display: flex; flex-direction: column; justify-content: space-between; height: 130px;">
            <div>
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Bug Tracking</strong>
              <div>Quality: <strong>${window.portalData.featureRequests.crossModuleImpact.bugs.concerns}</strong></div>
              <div style="color: var(--text-muted); margin-top: 2px;">Similar: ${window.portalData.featureRequests.crossModuleImpact.bugs.similar}</div>
            </div>
            <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="window.switchRoute('${window.portalData.featureRequests.crossModuleImpact.bugs.shortcut}')">Open Bug Tracking</button>
          </div>

          <!-- AI DIAGNOSTICS -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); font-size: 0.74rem; display: flex; flex-direction: column; justify-content: space-between; height: 130px;">
            <div>
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">AI Diagnostics</strong>
              <div>Opportunity: <strong>${window.portalData.featureRequests.crossModuleImpact.aiModels.opportunity}</strong></div>
            </div>
            <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="window.switchRoute('${window.portalData.featureRequests.crossModuleImpact.aiModels.shortcut}')">Open AI Models</button>
          </div>

        </div>
      </section>

      <!-- SECTION 6: CTO DECISION CENTER & SECTION 7: AI PRODUCT COPILOT (Side-by-Side) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 1.5rem;">
        
        <!-- CTO DECISION CENTER -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> CTO Product Decision Center</h4>
              <span class="badge badge-grey">Strategic Decisions</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Approve feature enhancements, defer tasks, or scale engineering focus</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
              ${window.portalData.featureRequests.decisions.map(dec => `
                <div class="decision-card-feat">
                  <div>
                    <span class="badge badge-${dec.priorityClass}" style="font-size: 0.58rem; padding: 1px 4px; margin-bottom: 6px;">${dec.priority}</span>
                    <div style="font-size: 0.74rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; margin-bottom: 4px;">${dec.issue}</div>
                    <div style="font-size: 0.65rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 4px;">
                      <strong>Val:</strong> ${dec.value} &bull; <strong>Effort:</strong> ${dec.effort}
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px; border-top: 1px solid var(--border-color); padding-top: 6px;">
                    <button class="btn btn-primary btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Approved feature action - ${dec.primaryAction}')">${dec.primaryAction}</button>
                    <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Dispatched feature action - ${dec.secondaryAction}')">${dec.secondaryAction}</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- AI PRODUCT COPILOT -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-robot" style="color: var(--color-blue);"></i> AI Product Copilot</h4>
              <span class="badge badge-grey">Innovation Intelligence</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Predictive ROI models, feature consolidations, and risk forecasters</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${window.portalData.featureRequests.copilotInsights.map(cop => `
                <div class="copilot-insight-feat">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary);">${cop.prediction}</span>
                    <span class="badge badge-warning" style="font-size: 0.65rem;">Conf: ${cop.confidence}</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #8a6d3b; background-color: #fbf5eb; padding: 6px; border-radius: 4px; border: 1px solid #f2e3cd; margin-bottom: 6px;">
                    💡 <strong>Recommendation:</strong> ${cop.recommendation}
                  </div>
                  <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.7rem;" onclick="alert('CTO COPILOT: Executing - ${cop.action}')">${cop.action}</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `;

    // Local filters logic
    let searchVal = '';
    let prodFilter = 'all';
    let priorityFilter = 'all';
    let statusFilter = 'all';
    let sourceFilter = 'all';

    function drawLandscape() {
      const strategicList = document.getElementById('featStrategicList');
      const growthList = document.getElementById('featGrowthList');
      const operationalList = document.getElementById('featOperationalList');
      const innovationList = document.getElementById('featInnovationList');

      if (!strategicList || !growthList || !operationalList || !innovationList) return;

      const filterList = (arr) => {
        return arr.filter(feat => {
          const matchesSearch = feat.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                              feat.requestedBy.toLowerCase().includes(searchVal.toLowerCase()) ||
                              feat.priority.toLowerCase().includes(searchVal.toLowerCase());
          
          const matchesProd = (prodFilter === 'all' || feat.product === prodFilter);
          const matchesPriority = (priorityFilter === 'all' || feat.priority === priorityFilter);
          const matchesStatus = (statusFilter === 'all' || feat.status === statusFilter);
          const matchesSource = (sourceFilter === 'all' || feat.requestedBy === sourceFilter);

          return matchesSearch && matchesProd && matchesPriority && matchesStatus && matchesSource;
        });
      };

      const strategic = filterList(window.portalData.featureRequests.priorityCategories.strategic);
      const growth = filterList(window.portalData.featureRequests.priorityCategories.growth);
      const operational = filterList(window.portalData.featureRequests.priorityCategories.operational);
      const innovation = filterList(window.portalData.featureRequests.priorityCategories.innovation);

      document.getElementById('featStrategicCount').innerText = strategic.length;
      document.getElementById('featGrowthCount').innerText = growth.length;
      document.getElementById('featOperationalCount').innerText = operational.length;
      document.getElementById('featInnovationCount').innerText = innovation.length;

      const mapToHtml = (arr) => {
        if (arr.length === 0) {
          return `<div style="text-align: center; color: var(--text-muted); font-size: 0.72rem; padding: 12px; border: 1px dashed var(--border-color); border-radius: var(--radius-md);">No features match filters.</div>`;
        }
        return arr.map(feat => `
          <div class="feat-item-card" onclick="window.openFeatureDetailDrawer('${feat.id}')">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <span class="badge badge-${feat.priorityClass}" style="font-size: 0.62rem; padding: 1px 5px;">${feat.priority}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">${feat.product}</span>
            </div>
            <h5 style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; margin-bottom: 6px;">${feat.name}</h5>
            <div style="font-size: 0.68rem; color: var(--text-secondary); line-height: 1.35; border-top: 1px solid var(--border-color); padding-top: 6px; margin-top: 6px;">
              <div>Requested By: <strong>${feat.requestedBy}</strong></div>
              <div>Business Value: <strong style="color: var(--text-primary);">${feat.businessValue}</strong></div>
              <div>Customer Demand: <strong style="color: var(--color-blue);">${feat.demand}</strong></div>
              <div>Strategic Align: <strong style="color: var(--color-green);">${feat.alignment}</strong></div>
              <div>Complexity: <strong>${feat.complexity}</strong></div>
            </div>
            
            <div style="display: flex; gap: 4px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 8px;">
              <button class="btn btn-outline btn-sm" style="flex: 1; font-size: 0.65rem; padding: 2px; justify-content: center;" onclick="event.stopPropagation(); window.openFeatureDetailDrawer('${feat.id}')">View Details</button>
              <button class="btn btn-primary btn-sm" style="flex: 1; font-size: 0.65rem; padding: 2px; justify-content: center;" onclick="event.stopPropagation(); alert('CTO FEATURE: Feature ${feat.name} approved.')">Approve</button>
            </div>
          </div>
        `).join('');
      };

      strategicList.innerHTML = mapToHtml(strategic);
      growthList.innerHTML = mapToHtml(growth);
      operationalList.innerHTML = mapToHtml(operational);
      innovationList.innerHTML = mapToHtml(innovation);
    }

    // Attach listeners
    const searchInput = document.getElementById('featSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscape();
      });
    }

    const prodSel = document.getElementById('featProductFilter');
    if (prodSel) {
      if (prodSel) prodSel.addEventListener('change', (e) => {
        prodFilter = e.target.value;
        drawLandscape();
      });
    }

    const priSel = document.getElementById('featPriorityFilter');
    if (priSel) {
      if (priSel) priSel.addEventListener('change', (e) => {
        priorityFilter = e.target.value;
        drawLandscape();
      });
    }

    const statSel = document.getElementById('featStatusFilter');
    if (statSel) {
      if (statSel) statSel.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        drawLandscape();
      });
    }

    const srcSel = document.getElementById('featSourceFilter');
    if (srcSel) {
      if (srcSel) srcSel.addEventListener('change', (e) => {
        sourceFilter = e.target.value;
        drawLandscape();
      });
    }

    // Draw initial landscape elements
    drawLandscape();
  }

  // --- FEATURE REQUESTS DETAILED PROFILE DRAWER ---
  window.openFeatureDetailDrawer = function(id) {
    let item = null;
    const cats = window.portalData.featureRequests.priorityCategories;
    for (const key in cats) {
      const match = cats[key].find(f => f.id === id);
      if (match) {
        item = match;
        break;
      }
    }

    if (!item) return;

    drawerTitle.innerHTML = `Feature Case: ${item.name} <span class="badge badge-${item.priorityClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.priority}</span>`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Feature Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-info" style="color: var(--color-blue); font-size: 0.85rem;"></i> Feature Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Feature Name:</strong> ${item.name}</div>
            <div><strong style="color: var(--text-primary);">Business Problem:</strong> ${item.workspace.problem}</div>
            <div><strong style="color: var(--text-primary);">Expected Outcome:</strong> ${item.workspace.outcome}</div>
            <div><strong style="color: var(--text-primary);">Request Source:</strong> ${item.workspace.source}</div>
            <div><strong style="color: var(--text-primary);">Business Impact:</strong> ${item.workspace.impact}</div>
            <div><strong style="color: var(--text-primary);">Customer Value:</strong> ${item.workspace.customerValue}</div>
            <div><strong style="color: var(--text-primary);">Operational Benefits:</strong> ${item.workspace.benefits}</div>
          </div>
        </div>

        <!-- Technical Assessment -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-terminal" style="color: var(--color-purple); font-size: 0.85rem;"></i> Technical Assessment</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Estimated Complexity:</strong> ${item.workspace.techComplexity}</div>
            <div><strong style="color: var(--text-primary);">Required Systems:</strong> ${item.workspace.systems}</div>
            <div><strong style="color: var(--text-primary);">Dependencies:</strong> ${item.workspace.dependencies}</div>
            <div><strong style="color: var(--text-primary);">Related Products:</strong> ${item.product}</div>
            <div><strong style="color: var(--text-primary);">Related APIs:</strong> ${item.workspace.relatedApis}</div>
            <div><strong style="color: var(--text-primary);">Related AI Models:</strong> ${item.workspace.relatedAi}</div>
            <div><strong style="color: var(--text-primary);">Estimated Effort:</strong> ${item.workspace.effort}</div>
          </div>
        </div>

        <!-- AI Recommendation -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-robot" style="color: var(--color-green); font-size: 0.85rem;"></i> AI Recommendation</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Suggested Priority:</strong> ${item.workspace.recPriority}</div>
            <div style="background-color: #fbf5eb; padding: 6px; border: 1px solid #f2e3cd; border-radius: 4px; margin-top: 4px; color: #8a6d3b;">
              💡 <strong>Recommended Release Window:</strong> ${item.workspace.recRelease}
            </div>
          </div>
        </div>

        <!-- Executive Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO FEATURE: Feature ${item.name} approved for Q3 release.')">Approve Feature</button>
          <button class="btn btn-outline" onclick="alert('CTO FEATURE: Requested additional product analysis for ${item.name}.')">Request More Analysis</button>
          <button class="btn btn-outline" onclick="alert('CTO FEATURE: Merging similar requests with ${item.name}...')">Merge with Existing Request</button>
          <button class="btn btn-outline" onclick="alert('CTO FEATURE: Deferring feature planning to next fiscal quarter.')">Defer</button>
          <button class="btn btn-outline" onclick="alert('CTO FEATURE: Request rejected.')">Reject</button>
          <button class="btn btn-outline" onclick="alert('CTO FEATURE: Generated executive product alignment report.')">Generate Executive Report</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // SPRINT MANAGEMENT MODULE - EXECUTIVE ENGINEERING DELIVERY
  // ==========================================================
  function renderSprintManagementModule() {
    viewSubpage.innerHTML = `
      <style>
        .spr-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .spr-filter-select:hover {
          border-color: var(--text-muted);
        }
        .spr-kpi-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100px; height: auto;
          position: relative;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .spr-kpi-card:hover {
          border-color: var(--color-blue);
          transform: translateY(-1px);
        }
        .spr-kpi-icon {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--color-blue);
          font-size: 0.78rem;
        }
        .spr-hover-panel {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease, padding 0.3s ease;
          background: rgba(0, 122, 255, 0.04);
          border: 1px dashed rgba(0, 122, 255, 0.2);
          border-radius: var(--radius-sm);
          padding: 0 10px;
          margin-top: 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .spr-kpi-card:hover .spr-hover-panel {
          max-height: 300px;
          opacity: 1;
          padding: 10px;
          margin-top: 8px;
        }
        .timeline-container-spr {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          flex-wrap: wrap;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 14px;
          border-radius: var(--radius-md);
        }
        .timeline-node-spr {
          background: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px;
          width: 135px;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
          text-align: center;
        }
        .timeline-node-spr:hover {
          transform: translateY(-1px);
          border-color: var(--color-blue);
        }
        .team-row-spr {
          display: grid;
          grid-template-columns: 110px repeat(6, 1fr) 90px;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.76rem;
        }
        .flow-row-spr {
          display: grid;
          grid-template-columns: 120px repeat(4, 1fr);
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.76rem;
        }
        .decision-card-spr {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 195px;
        }
        .copilot-insight-spr {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 8px;
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 1.0rem;">
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('CTO SPRINT: Initializing sprint builder wizard...')"><i class="fa-solid fa-plus"></i> Create Sprint</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO SPRINT: Starting sprint review run...')"><i class="fa-solid fa-clipboard-check"></i> Start Sprint Review</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO SPRINT: Generated Sprint Intelligence Report.')"><i class="fa-solid fa-file-invoice"></i> Generate Sprint Intelligence Report</button>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('CTO SPRINT: Authorization dispatched for sprint closure.')"><i class="fa-solid fa-circle-check"></i> Approve Sprint Closure</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO SPRINT: Initiating engineering delivery review...')"><i class="fa-solid fa-arrows-spin"></i> Request Delivery Review</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO SPRINT: Rebalancing engineers across EKS clusters...')"><i class="fa-solid fa-people-carry-box"></i> Rebalance Engineering Resources</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO SPRINT: Dispatched AI sprint metrics analysis report.')"><i class="fa-solid fa-download"></i> Export Executive Sprint Report</button>
        </div>
      </section>

      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-md);">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 300px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="sprSearchInput" placeholder="Search sprint, team, deliverable...">
        </div>
        <select class="spr-filter-select" id="sprProductFilter">
          <option value="all">Product: All Products</option>
          <option value="EVcare.AI">EVcare.AI</option>
          <option value="Mobile Application">Mobile Application</option>
          <option value="Fleet Dashboard">Fleet Dashboard</option>
          <option value="Web Portal">Web Portal</option>
        </select>
        <select class="spr-filter-select" id="sprTeamFilter">
          <option value="all">Engineering Team: All</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="Mobile">Mobile</option>
          <option value="AI/ML">AI/ML</option>
        </select>
        <select class="spr-filter-select" id="sprSprintFilter">
          <option value="all">Sprint: Active Sprint</option>
          <option value="Sprint 43">Sprint 43</option>
        </select>
        <select class="spr-filter-select" id="sprReleaseFilter">
          <option value="all">Release: All</option>
          <option value="v2.5.0-rc1">v2.5.0-rc1</option>
        </select>
        <select class="spr-filter-select" id="sprStatusFilter">
          <option value="all">Status: All</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <!-- SECTION 1: CURRENT SPRINT COMMAND CENTER -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-gauge-high"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Current Sprint Command Center</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Active sprint goals, timeline execution, and live team health status indexes</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 14px;">
          
          <!-- Sprint parameters and metrics -->
          <div style="background-color: var(--bg-app); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 1rem; font-weight: 800; color: var(--text-primary);">${window.portalData.sprintManagement.commandCenter.sprintNumber}</span>
                <span class="badge badge-success" style="font-size: 0.65rem;">Active Goal</span>
              </div>
              <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600; line-height: 1.4; margin-bottom: 8px;">
                🎯 <strong>Goal:</strong> ${window.portalData.sprintManagement.commandCenter.goal}
              </div>
              <div style="font-size: 0.74rem; color: var(--text-secondary); margin-bottom: 12px;">
                📅 <strong>Duration:</strong> ${window.portalData.sprintManagement.commandCenter.duration} &bull; <strong>Burndown:</strong> <strong style="color: var(--color-green);">${window.portalData.sprintManagement.commandCenter.burndown}</strong>
              </div>
            </div>

            <!-- Health indexes grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px;">
              ${window.portalData.sprintManagement.commandCenter.metrics.map(met => `
                <div class="spr-kpi-card has-exec-popover">
                  <i class="fa-solid ${met.icon} spr-kpi-icon"></i>
                  <div style="font-size: 0.62rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${met.name}</div>
                  <div style="font-size: 1.55rem; font-weight: 800; color: var(--text-primary); margin: 2px 0;">${met.value}</div>
                  <div style="font-size: 0.62rem; color: var(--text-muted);">Hover to view insights</div>
                  
                  <!-- Insight Overlay -->
                  ${window.createExecPopoverHTML({status: met.status || "Optimal", statusColor: "success", situation: met.situation || `${met.name} reached ${met.value} in Sprint 42.`, businessImpact: met.businessImpact || "On track for Q3 enterprise milestone release.", aiRecommendation: met.aiRecommendation || "Maintain current sprint velocity.", recommendedAction: "Triage Backlog", relatedModule: "Sprint Management"})}</div>
              `).join('')}
            </div>
          </div>

          <!-- Animated Sprint Completion Pie Chart Widget -->
          <div style="background-color: var(--bg-app); padding: 14px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; box-shadow: var(--shadow-sm);">
            
            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 0.68rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;">Sprint Completion</span>
              <span class="badge badge-success" style="font-size: 0.62rem; font-weight: 700; padding: 2px 6px;">+11% Ahead</span>
            </div>

            <!-- SVG Animated Donut / Pie Chart -->
            <div style="position: relative; width: 115px; height: 115px; display: flex; align-items: center; justify-content: center; margin: 4px 0;">
              <svg width="115" height="115" viewBox="0 0 100 100" style="transform: rotate(-90deg); filter: drop-shadow(0px 4px 8px rgba(37, 99, 235, 0.25));">
                <!-- Background Circle Track -->
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-color)" stroke-width="9" />
                <!-- In Review Segment (11%) -->
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F59E0B" stroke-width="9" stroke-dasharray="283" stroke-dashoffset="20" stroke-linecap="round" />
                <!-- Completed Segment (82%) Animated -->
                <circle class="sprint-pie-ring" cx="50" cy="50" r="45" fill="none" stroke="url(#sprintPieGrad)" stroke-width="9" stroke-linecap="round" />
                <defs>
                  <linearGradient id="sprintPieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3B82F6" />
                    <stop offset="100%" stop-color="#1D4ED8" />
                  </linearGradient>
                </defs>
              </svg>
              <!-- Center Text Overlay -->
              <div style="position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 1.65rem; font-weight: 900; color: var(--text-primary); letter-spacing: -0.03em; line-height: 1;">${window.portalData.sprintManagement.commandCenter.completion}%</span>
                <span style="font-size: 0.60rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-top: 2px;">Done</span>
              </div>
            </div>

            <!-- Pie Chart Legend & Story Breakdown -->
            <div style="width: 100%; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid var(--border-color); padding-top: 8px; font-size: 0.68rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="display: flex; align-items: center; gap: 5px; color: var(--text-primary); font-weight: 600;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #2563EB;"></span> Completed
                </span>
                <span style="font-weight: 800; color: var(--text-primary);">23 Stories (82%)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="display: flex; align-items: center; gap: 5px; color: var(--text-secondary); font-weight: 500;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #F59E0B;"></span> Code Review
                </span>
                <span style="font-weight: 700; color: var(--text-secondary);">3 Stories (11%)</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.65rem; color: var(--text-muted); margin-top: 2px;">
                <span>⏱️ Day 10 of 14 Elapsed</span>
                <span class="badge badge-warning" style="font-size: 0.58rem; padding: 1px 4px;">1 Blocker</span>
              </div>
            </div>

          </div></div>
        </div>

      </div>

      <!-- SECTION 8: CTO DELIVERY DECISION CENTER & SECTION 9: AI DELIVERY COPILOT (Side-by-Side) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 1rem;">
        
        <!-- CTO DECISION CENTER -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> CTO Delivery Decision Center</h4>
              <span class="badge badge-grey">Active Decisions</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Approve resource allocation, re-schedule releases, or override sprint constraints</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              ${window.portalData.sprintManagement.decisions.map(dec => `
                <div class="decision-card-spr">
                  <div>
                    <span class="badge badge-${dec.priorityClass}" style="font-size: 0.58rem; padding: 1px 4px; margin-bottom: 6px;">${dec.priority}</span>
                    <div style="font-size: 0.74rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; margin-bottom: 4px;">${dec.issue}</div>
                    <div style="font-size: 0.65rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 4px;">
                      <strong>Impact:</strong> ${dec.impact}
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px; border-top: 1px solid var(--border-color); padding-top: 6px;">
                    <button class="btn btn-primary btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Approved sprint action - ${dec.primaryAction}')">${dec.primaryAction}</button>
                    <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Dispatched sprint action - ${dec.secondaryAction}')">${dec.secondaryAction}</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- AI DELIVERY COPILOT -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-robot" style="color: var(--color-blue);"></i> AI Engineering Delivery Copilot</h4>
              <span class="badge badge-grey">Predictive Intelligence</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Predictive velocity models, resource recommendations, and risk forecasting</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${window.portalData.sprintManagement.copilotInsights.map(cop => `
                <div class="copilot-insight-spr">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary);">${cop.prediction}</span>
                    <span class="badge badge-warning" style="font-size: 0.65rem;">Confidence: ${cop.confidence}</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #8a6d3b; background-color: #fbf5eb; padding: 6px; border-radius: 4px; border: 1px solid #f2e3cd; margin-bottom: 6px;">
                    💡 <strong>Recommendation:</strong> ${cop.recommendation}
                  </div>
                  <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.7rem;" onclick="alert('CTO COPILOT: Executing - ${cop.action}')">${cop.action}</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `;

    // Local filters logic
    let searchVal = '';
    let prodFilter = 'all';
    let teamFilter = 'all';
    let sprintFilter = 'all';
    let releaseFilter = 'all';
    let statusFilter = 'all';

    function drawLandscape() {
      // Sprint Management doesn't render developer task lists as per requirement,
      // but we filter the engineering delivery intelligence team rows dynamically!
      const rows = document.querySelectorAll('.team-row-spr:not(:first-child)');
      rows.forEach(row => {
        const teamName = row.querySelector('div:first-child').innerText;
        const matchesSearch = teamName.toLowerCase().includes(searchVal.toLowerCase());
        const matchesTeam = (teamFilter === 'all' || teamName === teamFilter);
        
        if (matchesSearch && matchesTeam) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    }

    // Toggle Team Performance Workspace inline
    window.toggleTeamWorkspace = function(team) {
      const container = document.getElementById('teamPerformanceWorkspaceContainer');
      if (!container) return;

      const data = window.portalData.sprintManagement.teamWorkspaces[team] || window.portalData.sprintManagement.teamWorkspaces['Backend'];
      
      if (container.style.display === 'block' && container.getAttribute('data-active-team') === team) {
        container.style.display = 'none';
        return;
      }

      container.setAttribute('data-active-team', team);
      container.style.display = 'block';
      container.innerHTML = `
        <h3 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 10px; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
          Team Performance Workspace: ${team} Team
        </h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.78rem; color: var(--text-secondary);">
          <div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Current Sprint Contribution:</strong> ${data.sprintContribution}</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Recent Performance:</strong> ${data.recentPerformance}</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Capacity History:</strong> ${data.capacityHistory}</div>
          </div>
          <div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Current Risks:</strong> ${data.risks}</div>
            <div style="margin-bottom: 6px;"><strong style="color: var(--text-primary);">Upcoming Deliverables:</strong> ${data.upcomingDeliverables}</div>
            <div style="background-color: #fbf5eb; padding: 6px; border: 1px solid #f2e3cd; border-radius: 4px; margin-top: 6px; color: #8a6d3b;">
              💡 <strong>AI Recommendations:</strong> ${data.aiRecommendations}
            </div>
          </div>
        </div>
      `;
    };

    // Open detailed timeline phase drawer
    window.openSprintPhaseDrawer = function(phaseId) {
      const phase = window.portalData.sprintManagement.timeline.find(t => t.id === phaseId);
      if (!phase) return;

      drawerTitle.innerHTML = `Timeline Phase: ${phase.name} <span class="badge badge-${phase.statusClass}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${phase.status}</span>`;
      drawerBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <h4 style="font-size: 0.88rem; font-weight: 700;"><i class="fa-solid fa-circle-info" style="color: var(--color-blue);"></i> Phase Summary</h4>
            <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div><strong>Completion percentage:</strong> ${phase.completion}</div>
              <div><strong>Phase Duration:</strong> ${phase.duration}</div>
              <div><strong>Assigned Teams:</strong> ${phase.teams}</div>
              <div><strong>Quality Gate Status:</strong> <strong style="color: var(--color-green);">${phase.status}</strong></div>
              <div><strong>Active Bottlenecks:</strong> <strong style="color: var(--color-red);">${phase.bottlenecks}</strong></div>
              <div><strong>Executive Notes:</strong> ${phase.notes}</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('CTO SPRINT: Gate override authorized for ${phase.name}.')">Override Quality Gate</button>
            <button class="btn btn-outline" onclick="closeDrawer()">Close Drawer</button>
          </div>
        </div>
      `;
      drawerOverlay.classList.add('active');
    };

    // Attach listeners
    const searchInput = document.getElementById('sprSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscape();
      });
    }

    const teamSel = document.getElementById('sprTeamFilter');
    if (teamSel) {
      if (teamSel) teamSel.addEventListener('change', (e) => {
        teamFilter = e.target.value;
        drawLandscape();
      });
    }
  }

  // --- SPRINT WORKSPACE PROFILE DRAWER ---
  window.openSprintDetailDrawer = function(id) {
    const item = window.portalData.sprintManagement.sprintsList.find(s => s.id === id);
    if (!item) return;

    drawerTitle.innerHTML = `Sprint Workspace: ${item.name}`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Sprint Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-info" style="color: var(--color-blue); font-size: 0.85rem;"></i> Sprint Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Business Goal:</strong> ${item.goal}</div>
            <div><strong style="color: var(--text-primary);">Sprint Objective:</strong> ${item.objective}</div>
            <div><strong style="color: var(--text-primary);">Release Association:</strong> ${item.release}</div>
            <div><strong style="color: var(--text-primary);">Assigned Teams:</strong> ${item.teams}</div>
          </div>
        </div>

        <!-- Delivery Performance -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-chart-line" style="color: var(--color-purple); font-size: 0.85rem;"></i> Delivery Performance</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Planned Work:</strong> ${item.plannedWork}</div>
            <div><strong style="color: var(--text-primary);">Completed Work:</strong> ${item.completedWork}</div>
            <div><strong style="color: var(--text-primary);">Carry Forward:</strong> ${item.carryForward}</div>
            <div><strong style="color: var(--text-primary);">Current Velocity:</strong> ${item.velocity} &bull; <strong>Completion Rate:</strong> ${item.completionRate}</div>
            <div><strong style="color: var(--text-primary);">Capacity Utilization:</strong> ${item.utilization}</div>
          </div>
        </div>

        <!-- Delivery Risks & Blockers -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-exclamation" style="color: var(--color-red); font-size: 0.85rem;"></i> Delivery Risks & Blockers</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Current Blockers:</strong> <span style="color: var(--color-red); font-weight: 700;">${item.blockers}</span></div>
            <div><strong style="color: var(--text-primary);">Business Impact:</strong> ${item.impact}</div>
            <div><strong style="color: var(--text-primary);">Estimated Delay:</strong> ${item.delay}</div>
            <div><strong style="color: var(--text-primary);">Affected Products:</strong> ${item.affectedProducts}</div>
          </div>
        </div>

        <!-- Historical Comparison -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--text-muted); font-size: 0.85rem;"></i> Historical Comparison</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Previous Sprint:</strong> ${item.prevSprint}</div>
            <div><strong style="color: var(--text-primary);">Velocity Change:</strong> ${item.prevVelocityChange}</div>
            <div><strong style="color: var(--text-primary);">Quality Change:</strong> ${item.prevQualityChange}</div>
            <div><strong style="color: var(--text-primary);">Completion Change:</strong> ${item.prevCompletionChange}</div>
            <div style="background-color: #fbf5eb; padding: 6px; border: 1px solid #f2e3cd; border-radius: 4px; margin-top: 4px; color: #8a6d3b;">
              💡 <strong>Lessons Learned:</strong> ${item.lessons}
            </div>
          </div>
        </div>

        <!-- Executive Control Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO SPRINT: Approved closure override for ${item.name}.')">Approve Sprint</button>
          <button class="btn btn-outline" onclick="alert('CTO SPRINT: Requesting recovery plan proposal from Scrum Lead...')">Request Recovery Plan</button>
          <button class="btn btn-outline" onclick="alert('CTO SPRINT: Allocating additional EKS and database pool capacity...')">Assign Additional Resources</button>
          <button class="btn btn-outline" onclick="window.switchRoute('devops-pipelines')">Open DevOps</button>
          <button class="btn btn-outline" onclick="window.switchRoute('software-development')">Open Software Development</button>
          <button class="btn btn-outline" onclick="alert('CTO SPRINT: Sprint execution report generated.')">Generate Executive Report</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // PRODUCT ROADMAP MODULE - STRATEGY & ROADMAP CENTER
  // ==========================================================
  function renderProductRoadmapModule() {
    viewSubpage.innerHTML = `
      <style>
        .rdm-filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-surface);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        .rdm-filter-select:hover {
          border-color: var(--text-muted);
        }
        .rdm-kpi-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100px; height: auto;
          position: relative;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .rdm-kpi-card:hover {
          border-color: var(--color-blue);
          transform: translateY(-1px);
        }
        .rdm-kpi-icon {
          position: absolute;
          top: 12px;
          right: 12px;
          color: var(--color-blue);
          font-size: 0.78rem;
        }
        .rdm-hover-panel {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease, padding 0.3s ease;
          background: rgba(0, 122, 255, 0.04);
          border: 1px dashed rgba(0, 122, 255, 0.2);
          border-radius: var(--radius-sm);
          padding: 0 10px;
          margin-top: 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .rdm-kpi-card:hover .rdm-hover-panel {
          max-height: 300px;
          opacity: 1;
          padding: 10px;
          margin-top: 8px;
        }
        .timeline-category-rdm {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .timeline-card-rdm {
          background: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .timeline-card-rdm:hover {
          transform: translateY(-1px);
          border-color: var(--color-blue);
        }
        .health-bar-container-rdm {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          margin-bottom: 12px;
        }
        .health-item-rdm {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          text-align: center;
        }
        .portfolio-row-rdm {
          display: grid;
          grid-template-columns: 120px 220px 100px 100px 80px 1fr 140px;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.76rem;
        }
        .dep-row-rdm {
          display: grid;
          grid-template-columns: 130px 100px 150px 80px 1fr 120px;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.76rem;
        }
        .decision-card-rdm {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 195px;
        }
        .copilot-insight-rdm {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 8px;
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 1.0rem;">
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('CTO ROADMAP: Initiating strategic initiative wizard...')"><i class="fa-solid fa-plus"></i> Create Strategic Initiative</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ROADMAP: Launching product vision dashboard...')"><i class="fa-solid fa-lightbulb"></i> Create Product Vision</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ROADMAP: Generated Roadmap Report.')"><i class="fa-solid fa-file-invoice"></i> Generate Roadmap Report</button>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ROADMAP: Opening portfolio review workspace...')"><i class="fa-solid fa-cubes"></i> Review Portfolio</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ROADMAP: Approved roadmap initiative closure.')"><i class="fa-solid fa-circle-check"></i> Approve Initiative</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ROADMAP: Dispatched AI roadmap analysis report.')"><i class="fa-solid fa-robot"></i> Generate AI Roadmap Analysis</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CTO ROADMAP: Exported executive product roadmap report.')"><i class="fa-solid fa-download"></i> Export Executive Roadmap</button>
        </div>
      </section>

      <!-- SEARCH BAR & SELECT DROPDOWN FILTERS -->
      <div class="filter-toolbar" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-md);">
        <div class="search-control" style="flex: 1; min-width: 250px; max-width: 300px; margin-bottom: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="rdmSearchInput" placeholder="Search initiative, product, milestone...">
        </div>
        <select class="rdm-filter-select" id="rdmProductFilter">
          <option value="all">Product: All Products</option>
          <option value="EVcare.AI">EVcare.AI</option>
          <option value="Fleet Management">Fleet Management</option>
          <option value="Office Portal">Office Portal</option>
          <option value="Mobile Application">Mobile Application</option>
        </select>
        <select class="rdm-filter-select" id="rdmPriorityFilter">
          <option value="all">Priority: All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select class="rdm-filter-select" id="rdmTimelineFilter">
          <option value="all">Timeline: All Quarters</option>
          <option value="Current Quarter">Current Quarter</option>
          <option value="Next Quarter">Next Quarter</option>
          <option value="Future Vision">Future Vision</option>
        </select>
        <select class="rdm-filter-select" id="rdmStatusFilter">
          <option value="all">Status: All</option>
          <option value="On Track">On Track</option>
          <option value="Needs Attention">Needs Attention</option>
          <option value="Evaluating">Evaluating</option>
        </select>
      </div>

      <!-- SECTION 1: EXECUTIVE ROADMAP OVERVIEW -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-chart-line"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Executive Roadmap Overview</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Hover over any metric card to review live situation reports, business impacts, and AI recommendations</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;">
          ${window.portalData.productRoadmap.overviewKpis.map(kpi => `
            <div class="rdm-kpi-card has-exec-popover">
              <i class="fa-solid ${kpi.icon} rdm-kpi-icon"></i>
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">${kpi.title}</div>
              <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${kpi.value}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.68rem; font-weight: 600; color: var(--text-muted);">${kpi.change}</span>
                <span class="badge badge-${kpi.trendClass}" style="font-size: 0.62rem; padding: 1px 5px;">${kpi.trend}</span>
              </div>
              
              <!-- Hover Insight Panel -->
              ${window.createExecPopoverHTML({status: kpi.title === "At-Risk Initiatives" ? "Attention" : "Optimal", statusColor: kpi.title === "At-Risk Initiatives" ? "warning" : "success", situation: `${kpi.title} achieved ${kpi.value} completion across product tracks.`, businessImpact: "High alignment with strategic enterprise roadmap goals.", aiRecommendation: "Accelerate Fleet OS v4.2 feature release.", recommendedAction: "View Roadmap", relatedModule: "Product Roadmap"})}
            </div>
          `).join('')}       </div>
      </section>

      <!-- SECTION 2: STRATEGIC ROADMAP VISUALIZATION -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-map-location-dot"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Strategic Roadmap Visualization</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Timeline visualization of active and upcoming strategic initiatives grouped by target launch quarter</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;" id="rdmPriorityGrid">
          
          <!-- CURRENT QUARTER -->
          <div class="timeline-category-rdm">
            <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--color-red); border-bottom: 2px solid var(--color-red); padding-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
              <span>Current Quarter (Q3 2026)</span>
              <span class="badge badge-danger" id="rdmCurrentCount">0</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="rdmCurrentList"></div>
          </div>

          <!-- NEXT QUARTER -->
          <div class="timeline-category-rdm">
            <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--color-orange); border-bottom: 2px solid var(--color-orange); padding-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
              <span>Next Quarter (Q4 2026)</span>
              <span class="badge badge-warning" id="rdmNextCount">0</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="rdmNextList"></div>
          </div>

          <!-- FUTURE VISION -->
          <div class="timeline-category-rdm">
            <h4 style="font-size: 0.86rem; font-weight: 800; color: var(--color-blue); border-bottom: 2px solid var(--color-blue); padding-bottom: 4px; display: flex; align-items: center; justify-content: space-between;">
              <span>Future Vision (H1 2027)</span>
              <span class="badge badge-info" id="rdmFutureCount">0</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 10px;" id="rdmFutureList"></div>
          </div>

        </div>
      </section>

      <!-- SECTION 4: ROADMAP HEALTH CENTER -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-heart-pulse"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Roadmap Health Center</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Portfolio delivery health, resources readiness metrics, and upcoming strategic milestones</span>
          </div>
        </div>

        <div class="health-bar-container-rdm">
          ${window.portalData.productRoadmap.healthCenter.metrics.map(h => `
            <div class="health-item-rdm">
              <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${h.name}</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 4px 0;">${h.value}</div>
              <div style="width: 100%; height: 3px; background: var(--border-color); border-radius: 1.5px; overflow: hidden; margin-top: 4px;">
                <div style="width: ${h.score}%; height: 100%; background: ${h.status === 'Warning' ? 'var(--color-orange)' : 'var(--color-blue)'};"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45;">
          <div>
            <strong>Current Health Summary:</strong> ${window.portalData.productRoadmap.healthCenter.aiSummary}
            <br><strong style="color: var(--color-red);">Major Risks:</strong> ${window.portalData.productRoadmap.healthCenter.risks}
          </div>
          <div>
            <strong>Upcoming Milestones:</strong> ${window.portalData.productRoadmap.healthCenter.milestones}
            <br><strong style="color: var(--color-green);">AI Recommendation:</strong> ${window.portalData.productRoadmap.healthCenter.aiRecommendations}
          </div>
        </div>
      </section>

      <!-- SECTION 5: PRODUCT PORTFOLIO ALIGNMENT -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-cubes"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Product Portfolio Alignment</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Engineering status, investment priorities, and strategic contribution parameters for core platforms</span>
          </div>
        </div>

        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; background-color: var(--bg-surface);">
          <div class="portfolio-row-rdm" style="background-color: var(--bg-app); font-weight: 800; border-bottom: 2px solid var(--border-color);">
            <div>Product</div>
            <div>Strategic Initiatives</div>
            <div>Next Release</div>
            <div>Status</div>
            <div>Priority</div>
            <div>Strategic Contribution</div>
            <div>Quick Actions</div>
          </div>
          ${window.portalData.productRoadmap.portfolioProducts.map(p => `
            <div class="portfolio-row-rdm">
              <strong style="color: var(--text-primary);">${p.name}</strong>
              <div style="font-size: 0.74rem; line-height: 1.25;">${p.initiatives}</div>
              <div><strong style="color: var(--color-blue);">${p.nextRelease}</strong></div>
              <div>${p.status}</div>
              <div><span class="badge badge-${p.priority === 'Critical' ? 'danger' : p.priority === 'High' ? 'warning' : 'info'}" style="font-size: 0.62rem;">${p.priority}</span></div>
              <div style="font-style: italic; color: var(--text-muted);">${p.contribution}</div>
              <div style="display: flex; gap: 4px;">
                <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px;" onclick="alert('CTO ROADMAP: Open Architecture details for ${p.name}...')">Architecture</button>
                <button class="btn btn-primary btn-sm" style="font-size: 0.65rem; padding: 2px 4px;" onclick="window.switchRoute('software-development')">Software Dev</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 6: DEPENDENCY INTELLIGENCE -->
      <section class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 122, 255, 0.08); display: flex; align-items: center; justify-content: center; color: var(--color-blue); font-size: 0.88rem; border: 1px solid rgba(0, 122, 255, 0.15);">
            <i class="fa-solid fa-share-nodes"></i>
          </div>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); display: block; line-height: 1.2;">Dependency Intelligence Center</span>
            <span style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 2px;">Cross-module dependency risks, platform sync delays, and recommended mitigations</span>
          </div>
        </div>

        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; background-color: var(--bg-surface);">
          <div class="dep-row-rdm" style="background-color: var(--bg-app); font-weight: 800; border-bottom: 2px solid var(--border-color);">
            <div>Dependency Node</div>
            <div>Status</div>
            <div>Affected Initiatives</div>
            <div>Risk</div>
            <div>AI Recommendation</div>
            <div>Primary Action</div>
          </div>
          ${window.portalData.productRoadmap.dependencyIntelligence.map(d => `
            <div class="dep-row-rdm">
              <strong style="color: var(--text-primary);">${d.name}</strong>
              <div><span class="badge badge-${d.risk === 'High' ? 'danger' : 'warning'}" style="font-size: 0.65rem;">${d.status}</span></div>
              <div>${d.affected}</div>
              <div><strong style="color: ${d.risk === 'High' ? 'var(--color-red)' : 'var(--color-orange)'};">${d.risk}</strong></div>
              <div style="color: var(--text-secondary); font-style: italic;">${d.rec}</div>
              <button class="btn btn-outline btn-sm" style="font-size: 0.68rem; padding: 2px 6px; justify-content: center;" onclick="alert('CTO ACTION: Triggering - ${d.action}')">${d.action}</button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 7: CTO STRATEGIC DECISION CENTER & SECTION 8: AI ROADMAP COPILOT (Side-by-Side) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 1rem;">
        
        <!-- CTO STRATEGIC DECISION CENTER -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-blue);"></i> CTO Strategic Decision Center</h4>
              <span class="badge badge-grey">Active Portfolio Decisions</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">Approve initiatives, adjust milestones, or allocate resource balances</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              ${window.portalData.productRoadmap.decisions.map(dec => `
                <div class="decision-card-rdm">
                  <div>
                    <span class="badge badge-${dec.priorityClass}" style="font-size: 0.58rem; padding: 1px 4px; margin-bottom: 6px;">${dec.priority}</span>
                    <div style="font-size: 0.74rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; margin-bottom: 4px;">${dec.issue}</div>
                    <div style="font-size: 0.65rem; color: var(--text-secondary); line-height: 1.35; margin-bottom: 4px;">
                      <strong>Impact:</strong> ${dec.impact}
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px; border-top: 1px solid var(--border-color); padding-top: 6px;">
                    <button class="btn btn-primary btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Approved roadmap action - ${dec.primaryAction}')">${dec.primaryAction}</button>
                    <button class="btn btn-outline btn-sm" style="font-size: 0.65rem; padding: 2px 4px; justify-content: center;" onclick="alert('CTO DECISION: Dispatched roadmap action - ${dec.secondaryAction}')">${dec.secondaryAction}</button>
                  </div>
                </div>
              `).join('')}</div>
        </div>

        <!-- AI ROADMAP COPILOT -->
        <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 0.94rem; font-weight: 800; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-robot" style="color: var(--color-blue);"></i> AI Roadmap Copilot</h4>
              <span class="badge badge-grey">Strategy Intelligence</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 12px;">ML-driven roadmap risk forecasts, timeline drifts, and consolidation recommendations</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${window.portalData.productRoadmap.copilotInsights.map(cop => `
                <div class="copilot-insight-rdm">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 0.78rem; font-weight: 800; color: var(--text-primary);">${cop.prediction}</span>
                    <span class="badge badge-warning" style="font-size: 0.65rem;">Confidence: ${cop.confidence}</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #8a6d3b; background-color: #fbf5eb; padding: 6px; border-radius: 4px; border: 1px solid #f2e3cd; margin-bottom: 6px;">
                    💡 <strong>Recommendation:</strong> ${cop.recommendation}
                  </div>
                  <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center; font-size: 0.7rem;" onclick="alert('CTO COPILOT: Executing - ${cop.action}')">${cop.action}</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `;

    // Local filters logic
    let searchVal = '';
    let prodFilter = 'all';
    let priorityFilter = 'all';
    let timelineFilter = 'all';
    let statusFilter = 'all';

    function drawLandscape() {
      const currentList = document.getElementById('rdmCurrentList');
      const nextList = document.getElementById('rdmNextList');
      const futureList = document.getElementById('rdmFutureList');

      if (!currentList || !nextList || !futureList) return;

      const filterList = (arr, category) => {
        return arr.filter(init => {
          const matchesSearch = init.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                              init.product.toLowerCase().includes(searchVal.toLowerCase()) ||
                              init.priority.toLowerCase().includes(searchVal.toLowerCase());
          
          const matchesProd = (prodFilter === 'all' || init.product === prodFilter);
          const matchesPriority = (priorityFilter === 'all' || init.priority === priorityFilter);
          const matchesTimeline = (timelineFilter === 'all' || timelineFilter === category);
          const matchesStatus = (statusFilter === 'all' || init.status === statusFilter);

          return matchesSearch && matchesProd && matchesPriority && matchesTimeline && matchesStatus;
        });
      };

      const current = filterList(window.portalData.productRoadmap.timelineCategories.current, 'Current Quarter');
      const next = filterList(window.portalData.productRoadmap.timelineCategories.next, 'Next Quarter');
      const future = filterList(window.portalData.productRoadmap.timelineCategories.future, 'Future Vision');

      document.getElementById('rdmCurrentCount').innerText = current.length;
      document.getElementById('rdmNextCount').innerText = next.length;
      document.getElementById('rdmFutureCount').innerText = future.length;

      const mapToHtml = (arr) => {
        if (arr.length === 0) {
          return `<div style="text-align: center; color: var(--text-muted); font-size: 0.72rem; padding: 12px; border: 1px dashed var(--border-color); border-radius: var(--radius-md);">No active initiatives.</div>`;
        }
        return arr.map(init => `
          <div class="timeline-card-rdm" onclick="window.openStrategicInitiativeDrawer('${init.id}')">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <span class="badge badge-${init.priority === 'Critical' ? 'danger' : init.priority === 'High' ? 'warning' : 'info'}" style="font-size: 0.62rem; padding: 1px 5px;">${init.priority}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">${init.product}</span>
            </div>
            <h5 style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; margin-bottom: 6px;">${init.name}</h5>
            <div style="font-size: 0.68rem; color: var(--text-secondary); line-height: 1.35; border-top: 1px solid var(--border-color); padding-top: 6px; margin-top: 6px;">
              <div>Objective: <strong>${init.objective}</strong></div>
              <div>Current Phase: <strong style="color: var(--text-primary);">${init.phase}</strong></div>
              <div>Release Target: <strong style="color: var(--color-blue);">${init.release}</strong></div>
              <div>Eng Readiness: <strong style="color: var(--color-green);">${init.readiness}</strong></div>
              <div>Risk Level: <strong style="color: ${init.risk === 'High' ? 'var(--color-red)' : 'var(--text-secondary)'};">${init.risk}</strong></div>
            </div>
            
            <div style="display: flex; gap: 4px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 8px;">
              <button class="btn btn-outline btn-sm" style="flex: 1; font-size: 0.65rem; padding: 2px; justify-content: center;" onclick="event.stopPropagation(); window.openStrategicInitiativeDrawer('${init.id}')">View Details</button>
              <button class="btn btn-primary btn-sm" style="flex: 1; font-size: 0.65rem; padding: 2px; justify-content: center;" onclick="event.stopPropagation(); alert('CTO ROADMAP: Initiative approved.')">Approve</button>
            </div>
          </div>
        `).join('');
      };

      currentList.innerHTML = mapToHtml(current);
      nextList.innerHTML = mapToHtml(next);
      futureList.innerHTML = mapToHtml(future);
    }

    // Attach listeners
    const searchInput = document.getElementById('rdmSearchInput');
    if (searchInput) {
      if (searchInput) searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value;
        drawLandscape();
      });
    }

    const prodSel = document.getElementById('rdmProductFilter');
    if (prodSel) {
      if (prodSel) prodSel.addEventListener('change', (e) => {
        prodFilter = e.target.value;
        drawLandscape();
      });
    }

    const priSel = document.getElementById('rdmPriorityFilter');
    if (priSel) {
      if (priSel) priSel.addEventListener('change', (e) => {
        priorityFilter = e.target.value;
        drawLandscape();
      });
    }

    const timeSel = document.getElementById('rdmTimelineFilter');
    if (timeSel) {
      if (timeSel) timeSel.addEventListener('change', (e) => {
        timelineFilter = e.target.value;
        drawLandscape();
      });
    }

    const statSel = document.getElementById('rdmStatusFilter');
    if (statSel) {
      if (statSel) statSel.addEventListener('change', (e) => {
        statusFilter = e.target.value;
        drawLandscape();
      });
    }

    // Draw initial timeline visualization elements
    drawLandscape();
  }

  // --- STRATEGIC INITIATIVE WORKSPACE DRAWER ---
  window.openStrategicInitiativeDrawer = function(id) {
    let item = window.portalData.productRoadmap.initiativesList.find(i => i.id === id);
    if (!item) {
      // Create a fallback object in case click targets a Q4 or future timeline category node that has no full list details
      const cats = window.portalData.productRoadmap.timelineCategories;
      let matchedNode = null;
      for (const key in cats) {
        matchedNode = cats[key].find(c => c.id === id);
        if (matchedNode) break;
      }
      if (matchedNode) {
        item = {
          id: matchedNode.id,
          name: matchedNode.name,
          vision: matchedNode.objective,
          objective: 'Standard product alignment and telemetry configurations.',
          businessOwner: 'Sarah Jenkins (VP Product)',
          productOwner: 'David K. (Product Lead)',
          value: 'Nominal roadmap value contribution.',
          startDate: 'August 1, 2026',
          release: matchedNode.release,
          phase: matchedNode.phase,
          progress: '50% progress',
          teams: 'Engineering Teams',
          stack: 'Platform stack',
          platformReadiness: 'High',
          capacity: '80%',
          dependencies: { apis: 'None', apps: 'None', infra: 'None', cloud: 'None', ai: 'None', vendor: 'None' },
          risks: { business: 'Low', engineering: 'Low', dependency: 'Low', market: 'Low' },
          aiRecommendations: 'Ensure dependency nodes are verified during current sprint grooming.'
        };
      }
    }

    if (!item) return;

    drawerTitle.innerHTML = `Strategic Initiative: ${item.name}`;
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Initiative Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-info" style="color: var(--color-blue); font-size: 0.85rem;"></i> Initiative Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Business Vision:</strong> ${item.vision}</div>
            <div><strong style="color: var(--text-primary);">Strategic Objective:</strong> ${item.objective}</div>
            <div><strong style="color: var(--text-primary);">Business Owner:</strong> ${item.businessOwner} &bull; <strong>Product Owner:</strong> ${item.productOwner}</div>
            <div><strong style="color: var(--text-primary);">Expected Value:</strong> ${item.value}</div>
          </div>
        </div>

        <!-- Timeline & Phase -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-calendar-days" style="color: var(--color-purple); font-size: 0.85rem;"></i> Timeline & Milestones</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Start Date:</strong> ${item.startDate}</div>
            <div><strong style="color: var(--text-primary);">Target Release:</strong> ${item.release}</div>
            <div><strong style="color: var(--text-primary);">Current Phase:</strong> ${item.phase}</div>
            <div><strong style="color: var(--text-primary);">Milestone Progress:</strong> <strong style="color: var(--color-blue);">${item.progress}</strong></div>
          </div>
        </div>

        <!-- Engineering Alignment -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-users-gear" style="color: var(--color-green); font-size: 0.85rem;"></i> Engineering Alignment</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Responsible Teams:</strong> ${item.teams}</div>
            <div><strong style="color: var(--text-primary);">Technology Stack:</strong> ${item.stack}</div>
            <div><strong style="color: var(--text-primary);">Platform Readiness:</strong> ${item.platformReadiness}</div>
            <div><strong style="color: var(--text-primary);">Engineering Capacity:</strong> ${item.capacity}</div>
          </div>
        </div>

        <!-- Dependencies -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-share-nodes" style="color: var(--color-blue); font-size: 0.85rem;"></i> Dependencies</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">APIs:</strong> ${item.dependencies.apis}</div>
            <div><strong style="color: var(--text-primary);">Applications:</strong> ${item.dependencies.apps}</div>
            <div><strong style="color: var(--text-primary);">Infrastructure:</strong> ${item.dependencies.infra}</div>
            <div><strong style="color: var(--text-primary);">Cloud Services:</strong> ${item.dependencies.cloud}</div>
            <div><strong style="color: var(--text-primary);">AI Models:</strong> ${item.dependencies.ai}</div>
          </div>
        </div>

        <!-- Risk Assessment -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-circle-exclamation" style="color: var(--color-red); font-size: 0.85rem;"></i> Risk Assessment</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Business Risks:</strong> ${item.risks.business}</div>
            <div><strong style="color: var(--text-primary);">Engineering Risks:</strong> ${item.risks.engineering}</div>
            <div><strong style="color: var(--text-primary);">Dependency Risks:</strong> <span style="color: var(--color-red); font-weight: 700;">${item.risks.dependency}</span></div>
          </div>
        </div>

        <!-- AI Recommendations -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-robot" style="color: var(--color-green); font-size: 0.85rem;"></i> AI Recommendations</h4>
          <div style="margin-top: 6px; background-color: #fbf5eb; border: 1px solid #f2e3cd; padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: #8a6d3b; line-height: 1.4;">
            💡 <strong>AI Strategy Forecast:</strong> ${item.aiRecommendations}
          </div>
        </div>

        <!-- Executive Strategic Actions -->
        <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 12px;">
          <button class="btn btn-primary" onclick="alert('CTO ROADMAP: Approved strategic initiative - ${item.name}.')">Approve Initiative</button>
          <button class="btn btn-outline" onclick="alert('CTO ROADMAP: Opened timeline shifting controls for ${item.name}.')">Adjust Timeline</button>
          <button class="btn btn-outline" onclick="alert('CTO ROADMAP: Displaying dependency health maps...')">Review Dependencies</button>
          <button class="btn btn-outline" onclick="alert('CTO ROADMAP: Showing related product architecture models...')">Open Product Architecture</button>
          <button class="btn btn-outline" onclick="alert('CTO ROADMAP: Strategy alignment report generated.')">Generate Executive Report</button>
          <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
        </div>
      </div>
    `;
    drawerOverlay.classList.add('active');
  };

  // ==========================================================
  // IOT DEVICE MANAGEMENT MODULE - CONNECTED VEHICLE OPERATIONS CENTER
  // ==========================================================
  let iotSearch = '';
  let iotFleetFilter = 'all';
  let iotOemFilter = 'all';
  let iotFirmwareFilter = 'all';
  let iotStatusFilter = 'all';
  let iotConnectivityFilter = 'all';
  let iotRegionFilter = 'all';
  let iotModelFilter = 'all';
  let iotLifecycleFilter = 'all';

  window.filterIoTInventory = function() {
    iotSearch = document.getElementById('iotSearchInput') ? document.getElementById('iotSearchInput').value.toLowerCase() : '';
    iotFleetFilter = document.getElementById('iotFleetSelect') ? document.getElementById('iotFleetSelect').value : 'all';
    iotOemFilter = document.getElementById('iotOemSelect') ? document.getElementById('iotOemSelect').value : 'all';
    iotFirmwareFilter = document.getElementById('iotFirmwareSelect') ? document.getElementById('iotFirmwareSelect').value : 'all';
    iotStatusFilter = document.getElementById('iotStatusSelect') ? document.getElementById('iotStatusSelect').value : 'all';
    iotConnectivityFilter = document.getElementById('iotConnectivitySelect') ? document.getElementById('iotConnectivitySelect').value : 'all';
    iotRegionFilter = document.getElementById('iotRegionSelect') ? document.getElementById('iotRegionSelect').value : 'all';
    iotModelFilter = document.getElementById('iotModelSelect') ? document.getElementById('iotModelSelect').value : 'all';
    
    renderIoTInventoryTable();
  };

  window.setLifecycleFilter = function(stageId) {
    if (iotLifecycleFilter === stageId) {
      iotLifecycleFilter = 'all';
    } else {
      iotLifecycleFilter = stageId;
    }
    
    document.querySelectorAll('.lifecycle-node').forEach(node => {
      if (node.getAttribute('data-stage') === iotLifecycleFilter) {
        node.style.borderColor = 'var(--color-blue)';
        node.style.boxShadow = 'var(--shadow-md)';
      } else {
        node.style.borderColor = 'var(--border-color)';
        node.style.boxShadow = 'none';
      }
    });

    renderIoTInventoryTable();
  };

  window.setRegionFilter = function(regionName) {
    if (iotRegionFilter === regionName) {
      iotRegionFilter = 'all';
    } else {
      iotRegionFilter = regionName;
    }

    const select = document.getElementById('iotRegionSelect');
    if (select) {
      select.value = iotRegionFilter;
    }

    renderIoTInventoryTable();
  };

  function renderIoTInventoryTable() {
    const data = window.portalData.iotDeviceManagement;
    const filtered = data.inventory.filter(item => {
      const matchSearch = item.id.toLowerCase().includes(iotSearch) || item.vehicle.toLowerCase().includes(iotSearch) || item.location.toLowerCase().includes(iotSearch);
      const matchFleet = iotFleetFilter === 'all' || item.fleet === iotFleetFilter;
      const matchOem = iotOemFilter === 'all' || item.oem === iotOemFilter;
      const matchFirmware = iotFirmwareFilter === 'all' || item.firmware === iotFirmwareFilter;
      const matchStatus = iotStatusFilter === 'all' || item.status === iotStatusFilter;
      const matchConnectivity = iotConnectivityFilter === 'all' || (iotConnectivityFilter === 'Online' && item.status === 'Online') || (iotConnectivityFilter === 'Offline' && item.status === 'Offline');
      const matchRegion = iotRegionFilter === 'all' || item.location.includes(iotRegionFilter);
      const matchModel = iotModelFilter === 'all' || item.model === iotModelFilter;
      
      let matchLifecycle = true;
      if (iotLifecycleFilter !== 'all') {
        if (iotLifecycleFilter === 'monitoring' || iotLifecycleFilter === 'connected' || iotLifecycleFilter === 'activated') {
          matchLifecycle = item.status === 'Online' && item.health === 'Healthy';
        } else if (iotLifecycleFilter === 'maintenance') {
          matchLifecycle = item.health === 'Critical' || item.health === 'Warning';
        } else if (iotLifecycleFilter === 'retired') {
          matchLifecycle = item.status === 'Offline' && item.healthScore < 50;
        } else if (iotLifecycleFilter === 'installed') {
          matchLifecycle = item.status === 'Online';
        }
      }
      
      return matchSearch && matchFleet && matchOem && matchFirmware && matchStatus && matchConnectivity && matchRegion && matchModel && matchLifecycle;
    });
    
    const tbody = document.getElementById('iotInventoryTbody');
    if (tbody) {
      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="13" style="text-align: center; color: var(--text-muted); padding: 2rem;">
              <i class="fa-solid fa-folder-open" style="font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
              No connected devices match the active console filters.
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = filtered.map(item => {
          let healthClass = 'badge-success';
          if (item.health === 'Warning') healthClass = 'badge-warning';
          if (item.health === 'Critical') healthClass = 'badge-danger';
          
          let statusClass = item.status === 'Online' ? 'green' : 'grey';
          
          let signalColor = 'var(--color-green)';
          if (item.healthScore < 80) signalColor = 'var(--color-orange)';
          if (item.healthScore < 50) signalColor = 'var(--color-red)';
          
          return `
            <tr onclick="window.openDeviceDetailDrawer('${item.id}')" style="cursor: pointer;">
              <td><input type="checkbox" onclick="event.stopPropagation();" class="bulk-check"></td>
              <td><strong>${item.id}</strong></td>
              <td>${item.vehicle}</td>
              <td>${item.fleet}</td>
              <td>${item.oem}</td>
              <td><span class="badge badge-grey">${item.firmware}</span></td>
              <td>
                <span style="display: inline-flex; align-items: center; gap: 4px;">
                  <span class="status-dot ${statusClass}" style="width: 6px; height: 6px;"></span>
                  ${item.status}
                </span>
              </td>
              <td>${item.battery}</td>
              <td>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 0.72rem; font-weight: 600;">${item.signal}</span>
                  <div style="width: 40px; height: 4px; background: var(--bg-app); border-radius: 2px; overflow: hidden;">
                    <div style="width: ${item.healthScore}%; height: 100%; background: ${signalColor};"></div>
                  </div>
                </div>
              </td>
              <td><span style="color: ${item.gps === 'Lock' ? 'var(--color-green)' : 'var(--color-red)'};"><i class="fa-solid ${item.gps === 'Lock' ? 'fa-location-dot' : 'fa-location-pin-slash'}"></i> ${item.gps}</span></td>
              <td>${item.sim}</td>
              <td>${item.lastComms}</td>
              <td>
                <span class="badge ${healthClass}" style="font-size: 0.65rem;">
                  ${item.health} (${item.healthScore}%)
                </span>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  function renderIoTDeviceManagementModule() {
    const data = window.portalData.iotDeviceManagement;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR OVERLAYS AND LIFECYCLE CHEVRONS -->
      <style>
        .iot-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 1.25rem;
        }
        .iot-kpi-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 14px 16px;
          min-height: 120px;
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .iot-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-blue);
        }
        .iot-kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .iot-kpi-icon-box {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.82rem;
        }
        .iot-kpi-trend-badge {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }
        .iot-kpi-title {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 6px;
          margin-bottom: 2px;
          display: block;
        }
        .iot-kpi-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .iot-kpi-link {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-blue);
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px solid var(--border-color);
        }
        .iot-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .iot-kpi-card:hover .iot-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .iot-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.05);
          border: 1px solid rgba(0, 122, 255, 0.1);
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 0.68rem;
          color: var(--color-blue);
          line-height: 1.35;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .iot-kpi-info-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0, 122, 255, 0.1);
          padding: 2px 0;
        }
        .iot-kpi-info-row:last-child {
          border-bottom: none;
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <section style="display: flex; justify-content: flex-end; gap: 8px; flex-wrap: wrap; margin-bottom: 1.0rem;">
        <button class="btn btn-primary btn-sm" onclick="alert('CTO DEVICE OPERATIONS: Device registration initialized.')"><i class="fa-solid fa-plus"></i> Register Device</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVICE OPERATIONS: OTA update deployment console opened.')"><i class="fa-solid fa-rocket"></i> Deploy OTA Update</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVICE OPERATIONS: Remote diagnostics command sweeps triggered.')"><i class="fa-solid fa-wifi"></i> Run Remote Diagnostics</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVICE OPERATIONS: Create Device Group wizard opened.')"><i class="fa-solid fa-folder-plus"></i> Create Device Group</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVICE OPERATIONS: Exporting device inventory database CSV...')"><i class="fa-solid fa-download"></i> Export Inventory</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVICE OPERATIONS: Opening firmware versions repository dashboard...')"><i class="fa-solid fa-code-branch"></i> Firmware Repository</button>
        <button class="btn btn-outline btn-sm" onclick="alert('CTO DEVICE OPERATIONS: Cellular telemetry connectivity analytics charts opened.')"><i class="fa-solid fa-chart-line"></i> Connectivity Analytics</button>
      </section>

      <!-- SECTION 1: CONNECTED DEVICE HEALTH OVERVIEW -->
      <div class="iot-kpi-grid">
        ${data.kpis.map(k => `
          <div class="iot-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="iot-kpi-header">
              <div class="iot-kpi-icon-box" style="background-color: var(--bg-active); color: var(--color-${k.color});">
                <i class="fa-solid ${k.icon}"></i>
              </div>
              <span class="iot-kpi-trend-badge" style="background-color: rgba(52, 199, 89, 0.08); color: var(--color-green);">${k.trend}</span>
            </div>
            <div>
              <span class="iot-kpi-title">${k.title}</span>
              <div class="iot-kpi-value">${k.value}</div>
            </div>
            <div class="iot-kpi-link">
              <span>${k.action}</span>
              <i class="fa-solid fa-chevron-right" style="font-size: 0.65rem;"></i>
            </div>
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `${k.title} operating at ${k.value} with ${k.trend} variance.`, businessImpact: k.businessImpact || "Guarantees reliable CAN bus telemetry across fleet nodes.", aiRecommendation: k.aiRecommendation || "Continue CAN bus health check protocol.", recommendedAction: "Open IoT Management", relatedModule: "IoT Device Management"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2: DEVICE LIFECYCLE WORKFLOW -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div>
            <span class="card-title"><i class="fa-solid fa-rotate"></i> Device Lifecycle Workflow Governance</span>
            <span class="card-subtitle">Complete stage counts, success rates, and bottlenecks across vehicular lifetimes (Click stage to filter inventory)</span>
          </div>
        </div>
        <div class="card-body" style="display: flex; align-items: center; justify-content: space-between; overflow-x: auto; gap: 8px; padding-top: 1rem;">
          ${data.lifecycle.map((stage, idx) => `
            <div class="lifecycle-node" data-stage="${stage.id}" onclick="window.setLifecycleFilter('${stage.id}')" style="flex: 1; min-width: 120px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 10px; text-align: center; cursor: pointer; transition: all 0.2s ease; position: relative;">
              <span class="badge badge-${stage.status === 'Healthy' ? 'success' : stage.status === 'Warning' ? 'warning' : 'danger'}" style="font-size: 0.6rem; position: absolute; top: 4px; right: 4px;">${stage.count}</span>
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-top: 6px;">${stage.name}</div>
              <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px;">Dur: ${stage.duration}</div>
              <div style="font-size: 0.65rem; color: var(--color-${stage.color}); font-weight: 600; margin-top: 2px;">${stage.success} Success</div>
              ${stage.bottlenecks !== 'None' ? `<div style="font-size: 0.6rem; color: var(--color-red); margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${stage.bottlenecks}">⚠️ ${stage.bottlenecks}</div>` : ''}
            </div>
            ${idx < data.lifecycle.length - 1 ? `<i class="fa-solid fa-chevron-right" style="color: var(--text-muted); font-size: 0.85rem;"></i>` : ''}
          `).join('')}
        </div>
      </div>

      <!-- SECTION 3: CONNECTED DEVICE ECOSYSTEM -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div>
            <span class="card-title"><i class="fa-solid fa-cubes"></i> Connected Device Ecosystem Groups</span>
            <span class="card-subtitle">Real-time status summaries aggregated by Fleet, OEM, Model, and firmware versions</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; padding-top: 1rem;">
          ${data.ecosystem.map(group => `
            <div class="card" style="padding: 12px; margin-bottom: 0; border: 1px solid var(--border-color); background-color: var(--bg-app);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <span style="font-size: 0.62rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">${group.type}</span>
                  <h4 style="font-size: 0.85rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">${group.name}</h4>
                </div>
                <span class="badge badge-${group.color}" style="font-size: 0.65rem;">Sync: ${group.lastSync}</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; text-align: center; margin-top: 8px; background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div>
                  <div style="font-size: 0.65rem; color: var(--text-muted);">Total</div>
                  <div style="font-size: 0.9rem; font-weight: 800; color: var(--text-primary);">${group.total}</div>
                </div>
                <div>
                  <div style="font-size: 0.65rem; color: var(--color-green);">Healthy</div>
                  <div style="font-size: 0.9rem; font-weight: 800; color: var(--color-green);">${group.healthy}</div>
                </div>
                <div>
                  <div style="font-size: 0.65rem; color: var(--color-red);">Critical</div>
                  <div style="font-size: 0.9rem; font-weight: 800; color: var(--color-red);">${group.critical}</div>
                </div>
              </div>
              <div style="display: flex; gap: 6px; margin-top: 10px;">
                <button class="btn btn-outline btn-sm" style="flex: 1; padding: 2px 4px; font-size: 0.65rem;" onclick="alert('ECOSYSTEM: Running diagnostics sweeps for group - ${group.name}...')">Diagnostics</button>
                <button class="btn btn-outline btn-sm" style="flex: 1; padding: 2px 4px; font-size: 0.65rem;" onclick="alert('ECOSYSTEM: Initiating OTA firmware deployment wizard...')">Deploy OTA</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 4: CONNECTED VEHICLE CONTEXT LAYER -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div>
            <span class="card-title"><i class="fa-solid fa-sitemap"></i> Connected Vehicle Context Layer</span>
            <span class="card-subtitle">Ecosystem integration flow from physical sensors to executive decision intelligence</span>
          </div>
        </div>
        <div class="card-body" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-top: 1.25rem; text-align: center;">
          
          <div style="flex: 1; min-width: 140px; padding: 12px; background: rgba(0, 122, 255, 0.04); border: 1px dashed var(--color-blue); border-radius: var(--radius-md);">
            <i class="fa-solid fa-car" style="font-size: 1.2rem; color: var(--color-blue); margin-bottom: 6px; display: block;"></i>
            <strong style="font-size: 0.78rem; display: block;">Vehicles</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary);">VIN mapping, telemetry nodes</span>
          </div>

          <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.85rem;"></i>

          <div style="flex: 1; min-width: 140px; padding: 12px; background: rgba(175, 82, 222, 0.04); border: 1px dashed var(--color-purple); border-radius: var(--radius-md);">
            <i class="fa-solid fa-microchip" style="font-size: 1.2rem; color: var(--color-purple); margin-bottom: 6px; display: block;"></i>
            <strong style="font-size: 0.78rem; display: block;">IoT Devices</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary);">Gateway configuration tracks</span>
          </div>

          <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.85rem;"></i>

          <div style="flex: 1; min-width: 140px; padding: 12px; background: rgba(52, 199, 89, 0.04); border: 1px dashed var(--color-green); border-radius: var(--radius-md);">
            <i class="fa-solid fa-users" style="font-size: 1.2rem; color: var(--color-green); margin-bottom: 6px; display: block;"></i>
            <strong style="font-size: 0.78rem; display: block;">Fleets</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary);">Fleet Alpha/Beta allocations</span>
          </div>

          <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.85rem;"></i>

          <div style="flex: 1; min-width: 140px; padding: 12px; background: rgba(0, 122, 255, 0.04); border: 1px dashed var(--color-blue); border-radius: var(--radius-md);">
            <i class="fa-solid fa-tower-broadcast" style="font-size: 1.2rem; color: var(--color-blue); margin-bottom: 6px; display: block;"></i>
            <strong style="font-size: 0.78rem; display: block;">Telemetry</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary);">Ingest success (99.98% uptime)</span>
          </div>

          <i class="fa-solid fa-arrow-right" style="color: var(--text-muted); font-size: 0.85rem;"></i>

          <div style="flex: 1; min-width: 140px; padding: 12px; background: rgba(255, 149, 0, 0.04); border: 1px dashed var(--color-orange); border-radius: var(--radius-md);">
            <i class="fa-solid fa-heart-pulse" style="font-size: 1.2rem; color: var(--color-orange); margin-bottom: 6px; display: block;"></i>
            <strong style="font-size: 0.78rem; display: block;">AI Diagnostics</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary);">State-of-Health prediction engines</span>
          </div>

        </div>
      </div>

      <!-- SECTION 5: DEVICE INVENTORY TABLE -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-list"></i> Connected Device Inventory Workspace</span>
            <span class="card-subtitle">Search, filter, and execute bulk operations on connected hardware nodes</span>
          </div>
        </div>
        
        <!-- Multi-Dimensional Filters Row -->
        <div class="filter-toolbar" style="padding: 10px 1.25rem; border-bottom: 1px solid var(--border-color);">
          <div class="filter-group">
            <div class="search-control">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="iotSearchInput" placeholder="Search Device ID, VIN, location..." oninput="window.filterIoTInventory()">
            </div>
            
            <select class="select-control" id="iotFleetSelect" onchange="window.filterIoTInventory()">
              <option value="all">Fleet: All</option>
              <option value="Fleet Beta (South India)">Fleet Beta (South India)</option>
              <option value="Fleet Alpha (West India)">Fleet Alpha (West India)</option>
              <option value="Fleet Gamma (North India)">Fleet Gamma (North India)</option>
            </select>
            
            <select class="select-control" id="iotOemSelect" onchange="window.filterIoTInventory()">
              <option value="all">OEM: All</option>
              <option value="InnoVibe Systems">InnoVibe Systems</option>
              <option value="Third-Party OEM">Third-Party OEM</option>
            </select>

            <select class="select-control" id="iotStatusSelect" onchange="window.filterIoTInventory()">
              <option value="all">Status: All</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <select class="select-control" id="iotConnectivitySelect" onchange="window.filterIoTInventory()">
              <option value="all">Connectivity: All</option>
              <option value="Online">Active Connection</option>
              <option value="Offline">Disconnected</option>
            </select>

            <select class="select-control" id="iotRegionSelect" onchange="window.filterIoTInventory()">
              <option value="all">Region: All</option>
              <option value="Mumbai">West India (Mumbai)</option>
              <option value="Bengaluru">South India (Bengaluru)</option>
              <option value="Delhi">North India (Delhi)</option>
              <option value="Kolkata">East India (Kolkata)</option>
            </select>

            <select class="select-control" id="iotModelSelect" onchange="window.filterIoTInventory()">
              <option value="all">Model: All</option>
              <option value="E-Fleet X1">E-Fleet X1</option>
              <option value="Urban Go">Urban Go</option>
            </select>

            <select class="select-control" id="iotFirmwareSelect" onchange="window.filterIoTInventory()">
              <option value="all">Firmware: All</option>
              <option value="v5.3.2">v5.3.2</option>
              <option value="v5.2.1">v5.2.1</option>
              <option value="v5.1.0">v5.1.0</option>
            </select>
          </div>
        </div>

        <!-- Inventory Table Body -->
        <div class="card-body" style="padding: 0;">
          <div class="table-responsive">
            <table class="enterprise-table">
              <thead>
                <tr>
                  <th width="40"><input type="checkbox" id="selectAllIotCheck" onclick="document.querySelectorAll('.bulk-check').forEach(c => c.checked = this.checked)"></th>
                  <th>Device ID</th>
                  <th>Vehicle</th>
                  <th>Fleet</th>
                  <th>OEM</th>
                  <th>Firmware</th>
                  <th>Connectivity</th>
                  <th>Battery</th>
                  <th>Signal Strength</th>
                  <th>GPS</th>
                  <th>SIM Provider</th>
                  <th>Last Comms</th>
                  <th>AI Reliability Score</th>
                </tr>
              </thead>
              <tbody id="iotInventoryTbody">
                <!-- Populated Dynamically -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- SECTION 6 & 7: OTA OPERATIONS & CONNECTIVITY HEALTH -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Firmware operations rollout -->
        <div class="card col-8">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-rocket"></i> Secure OTA Firmware Operations</span>
              <span class="card-subtitle">Phased rollout validation stages (Target compliance track: 95%)</span>
            </div>
            <span class="badge badge-purple" style="font-size: 0.65rem;">Active: ${data.firmware.current}</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 0.65rem; color: var(--text-muted);">Latest Track</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--text-primary); margin-top: 4px;">${data.firmware.latest}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 0.65rem; color: var(--color-green);">Successful</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--color-green); margin-top: 4px;">${data.firmware.successful}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 0.65rem; color: var(--color-orange);">Pending</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--color-orange); margin-top: 4px;">${data.firmware.pending}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 0.65rem; color: var(--color-red);">Failed / Rollback</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--color-red); margin-top: 4px;">${data.firmware.failed} / ${data.firmware.rollback}</strong>
              </div>
            </div>
            
            <!-- Rollout Progress Bars -->
            <div>
              <h4 style="font-size: 0.78rem; font-weight: 700; margin-bottom: 8px; color: var(--text-primary);">Active Rollout Track Progress</h4>
              ${data.firmware.rollouts.map(r => `
                <div style="margin-bottom: 8px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 2px;">
                    <span><strong>${r.version}</strong> &bull; ${r.stage} (${r.target})</span>
                    <span>${r.progress}%</span>
                  </div>
                  <div style="width: 100%; height: 6px; background-color: var(--bg-app); border-radius: 3px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: ${r.progress}%; height: 100%; background-color: ${r.status === 'Rollback' ? 'var(--color-red)' : 'var(--color-blue)'};"></div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Controlled Rollout Steps -->
            <div>
              <h4 style="font-size: 0.78rem; font-weight: 700; margin-bottom: 8px; color: var(--text-primary);">OTA Deployment Security Validation</h4>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.65rem; color: var(--text-secondary); background: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <span style="color: var(--color-green); font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Mfg Validate</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span style="color: var(--color-green); font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Pilot Fleet</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span style="color: var(--color-blue); font-weight: 700;"><i class="fa-solid fa-circle-play"></i> Controlled</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span><i class="fa-solid fa-circle-dot"></i> Full Depl</span>
                <i class="fa-solid fa-chevron-right"></i>
                <span><i class="fa-solid fa-circle-dot"></i> Monitor</span>
              </div>
            </div>

            <!-- Control Buttons -->
            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <button class="btn btn-primary btn-sm" onclick="alert('OTA COMMAND: Pilot rollout authorized.')">Start Rollout</button>
              <button class="btn btn-outline btn-sm" onclick="alert('OTA COMMAND: Rollout tracks paused.')">Pause</button>
              <button class="btn btn-outline btn-sm" onclick="alert('OTA COMMAND: Rolling back to previous stable baseline.')">Rollback</button>
              <button class="btn btn-outline btn-sm" onclick="alert('OTA COMMAND: Release notes opened.')">Release Notes</button>
            </div>
          </div>
        </div>

        <!-- Section 7: Connectivity & Telemetry Health -->
        <div class="card col-4">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-wifi"></i> Connectivity & Telemetry Health</span>
              <span class="card-subtitle">Cellular signal latency and connection performance indices</span>
            </div>
            <span class="badge badge-success" style="font-size: 0.65rem;">Ping: ${data.connectivity.avgLatency}</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 0.65rem; color: var(--text-muted);">Connection Success</div>
                <strong style="font-size: 0.95rem; display: block; color: var(--color-green); margin-top: 4px;">${data.connectivity.successRate}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="font-size: 0.65rem; color: var(--text-muted);">MQTT Queue Availability</div>
                <strong style="font-size: 0.95rem; display: block; color: var(--color-green); margin-top: 4px;">${data.connectivity.mqttAvailability}</strong>
              </div>
            </div>
            
            <div style="min-height: 100px; height: auto; position: relative;">
              <canvas id="offlineTrendChart"></canvas>
            </div>
            
            <!-- Global Connectivity Intelligence -->
            <div>
              <h4 style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Global Connectivity Intelligence</h4>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
                ${data.connectivity.regions.map(r => `
                  <div style="font-size: 0.7rem; color: var(--text-secondary); display: flex; justify-content: space-between; background: var(--bg-app); padding: 4px 6px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); cursor: pointer;" onclick="window.setRegionFilter('${r.devices > 0 ? (r.name.includes('North') ? 'US' : 'DE') : 'none'}')">
                    <span>${r.name}</span>
                    <span style="font-weight: 700; color: ${r.status === 'Healthy' ? 'var(--color-green)' : r.status === 'Warning' ? 'var(--color-orange)' : 'var(--text-muted)'};">${r.status}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- SECTION 8: DEVICE SECURITY GOVERNANCE -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div>
            <span class="card-title"><i class="fa-solid fa-user-shield"></i> Device Security Governance</span>
            <span class="card-subtitle">CAN vehicular bus access security metrics, hardware boot checks, and vulnerability states</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; padding-top: 1rem;">
          <div style="background-color: var(--bg-app); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Secure Boot Status</div>
            <strong style="font-size: 1.4rem; display: block; color: var(--color-green); margin-top: 4px;">${data.security.secureBoot}</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary); display: block; margin-top: 2px;">Hardware signatures validated</span>
          </div>
          <div style="background-color: var(--bg-app); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Firmware Code Signing</div>
            <strong style="font-size: 1.4rem; display: block; color: var(--color-green); margin-top: 4px;">${data.security.signedFirmware}</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary); display: block; margin-top: 2px;">All active releases signed</span>
          </div>
          <div style="background-color: var(--bg-app); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">SSL/TLS Ingress Encryption</div>
            <strong style="font-size: 1.4rem; display: block; color: var(--color-green); margin-top: 4px;">${data.security.encryption}</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary); display: block; margin-top: 2px;">mTLS certificate streams</span>
          </div>
          <div style="background-color: var(--bg-app); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); text-align: center;">
            <div style="font-size: 0.68rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Vulnerable Firmware Indices</div>
            <strong style="font-size: 1.4rem; display: block; color: var(--color-red); margin-top: 4px;">${data.security.vulnerable} Devices</strong>
            <span style="font-size: 0.65rem; color: var(--text-secondary); display: block; margin-top: 2px;">Obsolete v5.1.0 CAN bus version</span>
          </div>
        </div>
      </div>

      <!-- SECTION 9: AI DEVICE INSIGHTS -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div>
            <span class="card-title"><i class="fa-solid fa-robot"></i> AI Device Operations Insights</span>
            <span class="card-subtitle">Machine learning telemetry scans and automatic sensor degradation warnings</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; padding-top: 1rem;">
          ${data.insights.map(ins => `
            <div class="card" style="padding: 12px; margin-bottom: 0; border: 1px solid var(--border-color); background-color: var(--bg-app);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <span class="badge badge-purple" style="font-size: 0.65rem;">Confidence: ${ins.confidence}</span>
                <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">SLA Impact: High</span>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-primary); font-weight: 700;">${ins.obs}</p>
              <p style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;"><strong>Business Impact:</strong> ${ins.impact}</p>
              <div style="background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px; margin-top: 8px; font-size: 0.72rem; color: var(--text-primary); line-height: 1.35;">
                💡 <strong>AI Recommendation:</strong> ${ins.rec}
              </div>
              <button class="btn btn-outline btn-sm" style="margin-top: 10px; width: 100%; font-size: 0.68rem;" onclick="alert('AI OPERATIONS: Action executed - ${ins.action}')">${ins.action}</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 10: CONNECTED PLATFORM INTEGRATION MAP -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div>
            <span class="card-title"><i class="fa-solid fa-sitemap"></i> Connected Platform Architecture Data Loops</span>
            <span class="card-subtitle">Real-time state synchronization, consumers, producers, and link statuses</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; padding-top: 1rem;">
          ${data.integrations.map(integ => `
            <div class="card" style="padding: 12px; margin-bottom: 0; border: 1px solid var(--border-color); background-color: var(--bg-app);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary); display: flex; align-items: center; gap: 4px;">
                  <i class="fa-solid fa-circle-nodes" style="color: var(--color-blue);"></i> ${integ.module}
                </h4>
                <span class="badge badge-success" style="font-size: 0.65rem;">${integ.status}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div><strong>Consumes:</strong> ${integ.consumes}</div>
                <div><strong>Produces:</strong> ${integ.produces}</div>
                <div><strong>Sync Interval:</strong> ${integ.sync}</div>
              </div>
              <button class="btn btn-outline btn-sm" style="margin-top: 8px; width: 100%; font-size: 0.65rem;" onclick="window.switchRoute('${integ.path}')">Open Related Module</button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 11: CTO DECISION CENTER -->
      <div class="card" style="padding: 1.25rem; margin-bottom: 1rem;">
        <div class="card-header" style="border-bottom: none; padding-bottom: 0;">
          <div>
            <span class="card-title"><i class="fa-solid fa-gavel"></i> CTO Governance Decision Center</span>
            <span class="card-subtitle">Execute approvals and assign engineering investigations directly from sensor analytics alerts</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding-top: 1rem;">
          ${data.decisionCenter.map(dec => {
            let riskBadge = 'badge-success';
            if (dec.risk === 'Warning') riskBadge = 'badge-warning';
            if (dec.risk === 'Critical') riskBadge = 'badge-danger';
            
            return `
              <div class="card" style="padding: 12px; margin-bottom: 0; border: 1px solid var(--border-color); background-color: var(--bg-app); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span class="badge ${riskBadge}" style="font-size: 0.65rem;">${dec.risk}</span>
                    <span style="font-size: 0.72rem; color: var(--text-secondary); font-weight: 600;">System: ${dec.module}</span>
                  </div>
                  <h4 style="font-size: 0.8rem; font-weight: 800; color: var(--text-primary);">${dec.issue}</h4>
                  <p style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;"><strong>Business Impact:</strong> ${dec.impact}</p>
                  <div style="background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px; margin-top: 8px; font-size: 0.72rem; color: var(--text-primary); line-height: 1.35;">
                    💡 <strong>Recommendation:</strong> ${dec.rec}
                  </div>
                </div>
                <div style="display: flex; gap: 6px; margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 8px;">
                  <button class="btn btn-primary btn-sm" style="flex: 1; font-size: 0.65rem;" onclick="alert('CTO DECISION: Action executed - ${dec.action}')">${dec.action}</button>
                  <button class="btn btn-outline btn-sm" style="font-size: 0.65rem;" onclick="alert('CTO DECISION: Assigned task ticket to ${dec.module} owner.')">Assign Owner</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    renderIoTInventoryTable();
    window.portalCharts.initIoTCharts(data.connectivity.offlineTrend);
  }

  window.openDeviceDetailDrawer = function(deviceId) {
    const data = window.portalData.iotDeviceManagement;
    const item = data.inventory.find(i => i.id === deviceId);
    if (!item) return;
    
    drawerTitle.innerHTML = `Device Explorer: ${item.id} <span class="badge badge-${item.health === 'Healthy' ? 'success' : item.health === 'Warning' ? 'warning' : 'danger'}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${item.health}</span>`;
    
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Section 1: Device Overview -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-microchip" style="color: var(--color-blue); font-size: 0.85rem;"></i> Device Overview</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Device ID:</strong> ${item.id}</div>
            <div><strong style="color: var(--text-primary);">Vehicle VIN:</strong> ${item.vehicle}</div>
            <div><strong style="color: var(--text-primary);">Fleet:</strong> ${item.fleet}</div>
            <div><strong style="color: var(--text-primary);">OEM Stack:</strong> ${item.oem}</div>
            <div><strong style="color: var(--text-primary);">Vehicle Model:</strong> ${item.model}</div>
            <div><strong style="color: var(--text-primary);">Installation Date:</strong> July 10, 2026</div>
          </div>
        </div>

        <!-- Section 2: Connectivity -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-wifi" style="color: var(--color-purple); font-size: 0.85rem;"></i> Connectivity</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Signal Quality:</strong> ${item.signal}</div>
            <div><strong style="color: var(--text-primary);">Location GPS:</strong> ${item.location} (${item.gps})</div>
            <div><strong style="color: var(--text-primary);">SIM Provider:</strong> ${item.sim}</div>
            <div><strong style="color: var(--text-primary);">Communication Status:</strong> ${item.status}</div>
            <div><strong style="color: var(--text-primary);">Last Communication:</strong> ${item.lastComms}</div>
            <div style="margin-top: 6px; border-top: 1px solid var(--border-color); padding-top: 6px; font-size: 0.7rem; color: var(--text-muted);">
              <strong>Timeline Signal:</strong> Nominal connection state maintained for 48 hours.
            </div>
          </div>
        </div>

        <!-- Section 3: Firmware History -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-code" style="color: var(--color-green); font-size: 0.85rem;"></i> Firmware History</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Current Version:</strong> ${item.firmware}</div>
            <div><strong style="color: var(--text-primary);">Available Version:</strong> v5.4.0</div>
            <div><strong style="color: var(--text-primary);">Rollback State:</strong> None pending</div>
            <div style="margin-top: 4px; background: var(--bg-surface); padding: 6px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-primary);">
              📦 <strong>OTA Update Path:</strong> Pilot &rarr; Controlled Rollout tracks validated.
            </div>
          </div>
        </div>

        <!-- Section 4: Telemetry Summary -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-tower-broadcast" style="color: var(--color-blue); font-size: 0.85rem;"></i> Telemetry Summary</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Latency:</strong> 112ms average</div>
            <div><strong style="color: var(--text-primary);">Packet Loss Rate:</strong> 0.12%</div>
            <div><strong style="color: var(--text-primary);">Ingress Frequency:</strong> 10s ping intervals</div>
            <div><strong style="color: var(--text-primary);">Last Data Packet:</strong> Synced 2s ago</div>
            <div><strong style="color: var(--text-primary);">Stream:</strong> <a href="#" onclick="event.preventDefault(); window.switchRoute('telemetry-platform'); closeDrawer();" style="color: var(--color-blue);">Open Telemetry Stream</a></div>
          </div>
        </div>

        <!-- Section 5: AI Diagnostics -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px; color: var(--color-orange);"><i class="fa-solid fa-robot"></i> AI Diagnostics</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Device Health Score:</strong> ${item.healthScore}%</div>
            <div><strong style="color: var(--text-primary);">Predicted Failure Risk:</strong> ${item.healthScore > 80 ? 'Low' : item.healthScore > 50 ? 'Medium' : 'High Failure Probability within 7 days'}</div>
            <div><strong style="color: var(--text-primary);">AI Confidence:</strong> 96%</div>
            <div style="background-color: var(--bg-surface); border: 1px solid var(--border-color); padding: 8px; border-radius: var(--radius-sm); margin-top: 4px; color: var(--text-primary); line-height: 1.35;">
              💡 <strong>AI Maintenance Rec:</strong> ${item.healthScore > 50 ? 'Keep monitoring active signal telemetry.' : 'Schedule immediate physical device and SIM replacement at dispatch center.'}
            </div>
          </div>
        </div>

        <!-- Section 6: Remote Controls -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px; color: var(--color-red);"><i class="fa-solid fa-sliders"></i> Remote Control System</h4>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('REMOTE COMMAND: Restart device request dispatched for ${item.id}.')">Restart Device</button>
            <button class="btn btn-outline" onclick="alert('REMOTE COMMAND: Deploy OTA request sent to client broker.')">Deploy OTA</button>
            <button class="btn btn-outline" onclick="alert('REMOTE COMMAND: Configuration console overlay opened.')">Update Configuration</button>
            <button class="btn btn-outline" onclick="alert('REMOTE COMMAND: Starting full device diagnostics sweeps...')">Run Diagnostics</button>
            <button class="btn btn-outline" onclick="alert('REMOTE COMMAND: Viewing real-time device ping console logs...')">View Logs</button>
            <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
          </div>
        </div>

      </div>
    `;
    
    drawerOverlay.classList.add('active');
  };

  // Expose methods globally for integration hooks
  window.renderIoTDeviceManagementModule = renderIoTDeviceManagementModule;

  // ==========================================================
  // TELEMETRY PLATFORM MODULE - REAL-TIME VEHICLE OPERATIONS CENTER
  // ==========================================================
  
  function renderTelemetryPlatformModule() {
    const data = window.portalData.telemetryPlatform;
    
    // Set search field input placeholder and filters visibility
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR TELEMETRY PLATFORM -->
      <style>
        .telemetry-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 1.25rem;
        }
        @media (max-width: 992px) {
          .telemetry-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .telemetry-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .telemetry-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .telemetry-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .telemetry-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .telemetry-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Color maps */
        .icon-blue { background-color: rgba(0, 122, 255, 0.08); color: var(--color-blue); }
        .icon-green { background-color: rgba(52, 199, 89, 0.08); color: var(--color-green); }
        .icon-purple { background-color: rgba(175, 82, 222, 0.08); color: var(--color-purple); }
        .icon-red { background-color: rgba(255, 59, 48, 0.08); color: var(--color-red); }
        .icon-orange { background-color: rgba(255, 149, 0, 0.08); color: var(--color-orange); }

        /* Hover Insight Panels */
        .telemetry-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .telemetry-kpi-card:hover .telemetry-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .telemetry-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Flowchart Node Styling */
        .flow-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 15px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow-x: auto;
          gap: 10px;
        }
        .flow-node {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          min-width: 140px;
          box-shadow: var(--shadow-sm);
        }
        .flow-arrow {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('TELEMETRY COMMAND: Open core configuration console.')"><i class="fa-solid fa-sliders"></i> Configure Telemetry</button>
          <button class="btn btn-outline btn-sm" onclick="alert('TELEMETRY COMMAND: Open alert rule manager.')"><i class="fa-solid fa-bell-plus"></i> Create Alert Rule</button>
          <button class="btn btn-outline btn-sm" onclick="alert('TELEMETRY COMMAND: Launch pipeline stream processor controller.')"><i class="fa-solid fa-network-wired"></i> Manage Data Pipeline</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Exporting connected fleet diagnostics reports...')"><i class="fa-solid fa-file-export"></i> Export Telemetry Report</button>
          <button class="btn btn-outline btn-sm" onclick="alert('SYSTEM: Loading vehicle ecosystem flow topology map...')"><i class="fa-solid fa-circle-nodes"></i> View Data Architecture</button>
          <button class="btn btn-outline btn-sm" onclick="window.switchRoute('system-logs')"><i class="fa-solid fa-receipt"></i> Open System Logs</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Commencing ingestion pipeline anomalies sweeps...')"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Analysis</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="telSearchInput" placeholder="Search Vehicle ID, GPS lock coordinates, location..." oninput="window.filterTelemetryVehicles()" style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" id="telFleetSelect" onchange="window.filterTelemetryVehicles()" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Fleet: All</option>
            <option value="Fleet Beta (South India)">Fleet Beta (South India)</option>
            <option value="Fleet Alpha (West India)">Fleet Alpha (West India)</option>
            <option value="Fleet Gamma (North India)">Fleet Gamma (North India)</option>
          </select>

          <select class="select-control" id="telRegionSelect" onchange="window.filterTelemetryVehicles()" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Region: All</option>
            <option value="Bengaluru">South India (Bengaluru)</option>
            <option value="Mumbai">West India (Mumbai)</option>
            <option value="Delhi">North India (Delhi)</option>
            <option value="Chennai">Chennai</option>
          </select>

          <select class="select-control" id="telStatusSelect" onchange="window.filterTelemetryVehicles()" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Status: All</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <select class="select-control" id="telQualitySelect" onchange="window.filterTelemetryVehicles()" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Data Quality: All</option>
            <option value="Healthy">Healthy (>=90%)</option>
            <option value="Warning">Warning (50-89%)</option>
            <option value="Critical">Critical (<50%)</option>
          </select>
        </div>
      </div>

      <!-- SECTION 1: TELEMETRY EXECUTIVE OVERVIEW -->
      <div class="telemetry-kpi-grid">
        ${data.kpis.map(k => `
          <div class="telemetry-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="telemetry-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.45rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="telemetry-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span style="color: ${k.status === 'Healthy' ? 'var(--color-green)' : k.status === 'Warning' ? 'var(--color-orange)' : 'var(--color-red)'}; font-weight: 600;">
                ● ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `Real-time telematics stream throughput at ${k.value}.`, businessImpact: k.businessImpact || "Supports sub-millisecond driver app & MLOps sync.", aiRecommendation: k.aiRecommendation || "Optimize Kinesis partition stream shards.", recommendedAction: "Inspect Telemetry Stream", relatedModule: "Telemetry Platform"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2: LIVE MAP -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="card-title"><i class="fa-solid fa-map-location-dot"></i> Connected Fleets Ingress Geographic Status Map</span>
            <span class="card-subtitle">Real-time localized signal availability indices across Indian regional sectors</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.regions.map(r => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px 14px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 4px; cursor: pointer;" onclick="document.getElementById('telRegionSelect').value = '${r.name.split(' ')[0]}'; window.filterTelemetryVehicles();">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.8rem; color: var(--text-primary);">${r.name}</strong>
                <span class="badge badge-${r.color}" style="font-size: 0.62rem;">${r.status}</span>
              </div>
              <div style="margin-top: 6px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-size: 0.72rem; text-align: center;">
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.6rem;">Online</span>
                  <strong style="color: var(--color-blue);">${r.connected}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.6rem;">Offline</span>
                  <strong style="color: var(--color-orange);">${r.offline}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.6rem;">Alerts</span>
                  <strong style="color: var(--color-red);">${r.alerts}</strong>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 3 & 4: VEHICLE WORKSPACE & DATA STREAM MONITORING -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Vehicles List Card -->
        <div class="card col-8">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-list-check"></i> Connected Fleet Nodes</span>
              <span class="card-subtitle">Active vehicles transmitting telemetry packets (Select row to view timeline)</span>
            </div>
          </div>
          <div class="card-body" style="padding: 0;">
            <div class="table-responsive">
              <table class="enterprise-table">
                <thead>
                  <tr>
                    <th>Vehicle VIN</th>
                    <th>Fleet Segment</th>
                    <th>Ingress Region</th>
                    <th>Connectivity</th>
                    <th>Battery SOC</th>
                    <th>Telemetry SOH</th>
                    <th style="text-align: right;">Action</th>
                  </tr>
                </thead>
                <tbody id="telemetryVehiclesTbody">
                  <!-- Rendered dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 4: Live Data Stream Inspector -->
        <div class="card col-4">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-tower-broadcast"></i> Ingress Data Stream Inspector</span>
              <span class="card-subtitle">Real-time CAN and diagnostic packets signals parsing status</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 14px; padding: 1.25rem;">
            <!-- Real-time metrics -->
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem;">
              <strong style="color: var(--text-primary); display: block; margin-bottom: 6px; font-size: 0.8rem;">Signal Metrics</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; color: var(--text-secondary);">
                <div>SOC: <strong style="color: var(--text-primary);">85% average</strong></div>
                <div>SOH: <strong style="color: var(--color-green);">94% healthy</strong></div>
                <div>Temp: <strong style="color: var(--text-primary);">32.4°C</strong></div>
                <div>Speed: <strong style="color: var(--text-primary);">42 km/h</strong></div>
              </div>
            </div>

            <!-- Ingest performance gauge -->
            <div>
              <strong style="color: var(--text-primary); display: block; margin-bottom: 6px; font-size: 0.8rem;">Platform Health Ingress</strong>
              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.72rem; color: var(--text-secondary);">
                <div style="display: flex; justify-content: space-between;">
                  <span>MQTT Broker Stream</span>
                  <span style="color: var(--color-green); font-weight: 700;">● ${data.performance.mqttStatus}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Cloud Process Node</span>
                  <span style="color: var(--color-green); font-weight: 700;">● ${data.performance.cloudProcessing}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Ingestion Pipeline API</span>
                  <span style="color: var(--color-green); font-weight: 700;">● ${data.performance.pipelineStatus}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>AI Inference Queue</span>
                  <span style="color: var(--color-green); font-weight: 700;">● ${data.performance.aiAvailability}</span>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-color); padding-top: 8px; display: flex; flex-direction: column; gap: 6px;">
              <button class="btn btn-primary btn-sm" onclick="alert('TELEMETRY: Adjusting telemetry transmission frequencies for active fleets...')">Adjust Frequency</button>
              <button class="btn btn-outline btn-sm" onclick="alert('SYSTEM: Dispatched ping to pipeline broker...')">Test Connection ping</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 5: TELEMETRY ANALYTICS (CHARTS) -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Chart 1 -->
        <div class="card col-6">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="card-title">Data Ingestion Trend</span>
              <span class="card-subtitle">Throughput (msgs/sec) peak capacities over past 6 hours</span>
            </div>
            <strong style="color: var(--color-blue); font-size: 1.05rem;">${data.performance.messageRate}</strong>
          </div>
          <div class="card-body" style="height: 200px; padding: 1.25rem; position: relative;">
            <canvas id="ingestionTrendChart"></canvas>
          </div>
        </div>

        <!-- Chart 2 -->
        <div class="card col-6">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="card-title">Ingress Latency Trend</span>
              <span class="card-subtitle">Average database commit delay times</span>
            </div>
            <strong style="color: var(--color-purple); font-size: 1.05rem;">${data.performance.latency}</strong>
          </div>
          <div class="card-body" style="height: 200px; padding: 1.25rem; position: relative;">
            <canvas id="latencyTrendChart"></canvas>
          </div>
        </div>
      </div>

      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        <!-- Chart 3 -->
        <div class="card col-6">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="card-title">Data Quality Trend</span>
              <span class="card-subtitle">Valid telemetry signals percentage tracks</span>
            </div>
            <strong style="color: var(--color-blue); font-size: 1.05rem;">${data.performance.successRate}</strong>
          </div>
          <div class="card-body" style="height: 200px; padding: 1.25rem; position: relative;">
            <canvas id="qualityTrendChart"></canvas>
          </div>
        </div>

        <!-- Chart 4 -->
        <div class="card col-6">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="card-title">Platform Ingestion Stability</span>
              <span class="card-subtitle">Overall server availability uptime metrics</span>
            </div>
            <strong style="color: var(--color-green); font-size: 1.05rem;">99.98%</strong>
          </div>
          <div class="card-body" style="height: 200px; padding: 1.25rem; position: relative;">
            <canvas id="telemetryStabilityChart"></canvas>
          </div>
        </div>
      </div>

      <!-- SECTION 6 & 7: ALERTS CENTER & EVENTS MONITORING -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Alerts center -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> Telemetry Incident Alerts Center</span>
              <span class="card-subtitle">Critical signals warnings requiring immediate CTO response</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.alerts.map(a => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-left: 4px solid var(--color-${a.color}); padding: 12px; border-radius: var(--radius-sm); font-size: 0.78rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: var(--color-${a.color});">${a.severity}</strong>
                  <span style="font-size: 0.68rem; color: var(--text-muted);">${a.time}</span>
                </div>
                <div style="margin-top: 4px; font-weight: 700; color: var(--text-primary);">${a.text}</div>
                <div style="margin-top: 4px; color: var(--text-secondary);"><strong>Impact:</strong> ${a.impact}</div>
                <div style="margin-top: 2px; color: var(--text-secondary);"><strong>Recommendation:</strong> ${a.rec}</div>
                <div style="margin-top: 8px; display: flex; gap: 6px;">
                  <button class="btn btn-outline btn-xs" onclick="alert('ALERT: Action Dispatched for ID ${a.id}')">${a.action}</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('ALERT: Assigned to active engineer.')">Assign Owner</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Ingestion Events Monitor -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-clock-rotate-left"></i> Real-time Ingestion Events Log</span>
              <span class="card-subtitle">Chronological events timeline inside the pipeline stream</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.events.map(e => `
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; font-size: 0.75rem; color: var(--text-secondary);">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--text-muted); font-size: 0.7rem;">[${e.time}]</span>
                  <strong>${e.source}</strong>
                  <span>&bull;</span>
                  <span>${e.event}</span>
                </div>
                <span class="badge badge-${e.color}" style="font-size: 0.65rem;">${e.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 8 & 9: REPORTS WORKSPACE & AI TELEMETRY INTELLIGENCE -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Reports Workspace -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-folder-open"></i> Telemetry Reports & Workspace</span>
              <span class="card-subtitle">Generate connectivity, performance, and hardware data quality records</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-sm); font-size: 0.78rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: var(--text-primary); display: block;">Connectivity & Throughput Report</strong>
                <span style="font-size: 0.68rem; color: var(--text-muted);">Online ratios, packet lags profiles, cellular regions sync.</span>
              </div>
              <button class="btn btn-outline btn-xs" onclick="alert('Exported Connectivity Report PDF.')">Export</button>
            </div>
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-sm); font-size: 0.78rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: var(--text-primary); display: block;">Vehicle Health & Battery telemetry</strong>
                <span style="font-size: 0.68rem; color: var(--text-muted);">SOC cycles, thermal anomalies rates, fault codes distributions.</span>
              </div>
              <button class="btn btn-outline btn-xs" onclick="alert('Exported Vehicle Health Report PDF.')">Export</button>
            </div>
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-sm); font-size: 0.78rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: var(--text-primary); display: block;">Data Quality & Integrity Audits</strong>
                <span style="font-size: 0.68rem; color: var(--text-muted);">Missing signals, packet validation checks.</span>
              </div>
              <button class="btn btn-outline btn-xs" onclick="alert('Exported Data Quality Report PDF.')">Export</button>
            </div>
          </div>
        </div>

        <!-- AI Telemetry Intelligence -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-brain"></i> AI Telemetry Ingress Diagnostics Insights</span>
              <span class="card-subtitle">Predictive models analysis on cellular connection and hardware packets</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.aiIntelligence.map(ai => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size: 0.78rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> AI Observation</strong>
                  <span class="badge badge-${ai.risk === 'Critical' ? 'danger' : ai.risk === 'Medium' ? 'warning' : 'info'}" style="font-size: 0.62rem;">Risk: ${ai.risk}</span>
                </div>
                <div style="color: var(--text-primary); font-weight: 700;">${ai.obs}</div>
                <div style="margin-top: 4px; color: var(--text-secondary);"><strong>Impact:</strong> ${ai.impact}</div>
                <div style="margin-top: 2px; color: var(--text-secondary);"><strong>Recommendation:</strong> ${ai.rec}</div>
                <div style="margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 6px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.7rem; color: var(--text-muted);">AI Confidence: 95%</span>
                  <button class="btn btn-outline btn-xs" onclick="alert('AI ACTION DISPATCHED: ${ai.action}')">${ai.action}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 10: CONNECTED MODULE ARCHITECTURE -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-sitemap"></i> EVcare.AI Data Pipeline Integrations Architecture Flow</span>
            <span class="card-subtitle">Connected modules information routing loops mapping</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem;">
          <div class="flow-container">
            <div class="flow-node">
              <i class="fa-solid fa-microchip" style="color: var(--color-blue); margin-right: 4px;"></i> IoT Devices
              <div style="font-size: 0.6rem; color: var(--color-green); margin-top: 2px;">● Healthy (2s ago)</div>
            </div>
            <div class="flow-arrow">&rarr;</div>
            <div class="flow-node" style="border-color: var(--color-blue);">
              <i class="fa-solid fa-tower-broadcast" style="color: var(--color-blue); margin-right: 4px;"></i> Telemetry Ingest
              <div style="font-size: 0.6rem; color: var(--color-green); margin-top: 2px;">● Active (Real-time)</div>
            </div>
            <div class="flow-arrow">&rarr;</div>
            <div class="flow-node">
              <i class="fa-solid fa-brain" style="color: var(--color-purple); margin-right: 4px;"></i> AI Diagnostics
              <div style="font-size: 0.6rem; color: var(--color-green); margin-top: 2px;">● Healthy (1m ago)</div>
            </div>
            <div class="flow-arrow">&rarr;</div>
            <div class="flow-node">
              <i class="fa-solid fa-gears" style="color: var(--color-green); margin-right: 4px;"></i> ML Models
              <div style="font-size: 0.6rem; color: var(--color-green); margin-top: 2px;">● Loaded (5m ago)</div>
            </div>
            <div class="flow-arrow">&rarr;</div>
            <div class="flow-node">
              <i class="fa-solid fa-chart-line" style="color: var(--color-purple); margin-right: 4px;"></i> EVcare.AI Dashboard
              <div style="font-size: 0.6rem; color: var(--color-green); margin-top: 2px;">● Healthy (10s ago)</div>
            </div>
          </div>
        </div>
      </div>
    `;

    renderTelemetryVehiclesTable();
    if (window.portalCharts && typeof window.portalCharts.initTelemetryCharts === 'function') { window.portalCharts.initTelemetryCharts(); }
  }

  function filterTelemetryVehicles() {
    renderTelemetryVehiclesTable();
  }

  function renderTelemetryVehiclesTable() {
    const tbody = document.getElementById('telemetryVehiclesTbody');
    if (!tbody) return;

    const data = window.portalData.telemetryPlatform;
    const search = document.getElementById('telSearchInput')?.value.toLowerCase() || '';
    const fleetFilter = document.getElementById('telFleetSelect')?.value || 'all';
    const regionFilter = document.getElementById('telRegionSelect')?.value || 'all';
    const statusFilter = document.getElementById('telStatusSelect')?.value || 'all';
    const qualityFilter = document.getElementById('telQualitySelect')?.value || 'all';

    const filtered = data.vehicles.filter(v => {
      const matchesSearch = v.id.toLowerCase().includes(search) || v.location.toLowerCase().includes(search) || v.fleet.toLowerCase().includes(search);
      const matchesFleet = fleetFilter === 'all' || v.fleet === fleetFilter;
      const matchesRegion = regionFilter === 'all' || v.location.includes(regionFilter);
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
      
      let matchesQuality = true;
      if (qualityFilter !== 'all') {
        if (qualityFilter === 'Healthy') matchesQuality = v.healthScore >= 90;
        else if (qualityFilter === 'Warning') matchesQuality = v.healthScore >= 50 && v.healthScore < 90;
        else if (qualityFilter === 'Critical') matchesQuality = v.healthScore < 50;
      }

      return matchesSearch && matchesFleet && matchesRegion && matchesStatus && matchesQuality;
    });

    tbody.innerHTML = filtered.map(v => `
      <tr style="cursor: pointer;" onclick="window.openVehicleTimelineDrawer('${v.id}')">
        <td style="font-weight: 700; color: var(--text-primary);"><i class="fa-solid fa-car" style="color: var(--color-blue); font-size: 0.8rem; margin-right: 6px;"></i> ${v.id}</td>
        <td>${v.fleet}</td>
        <td>${v.location}</td>
        <td>
          <span class="badge badge-${v.status === 'Online' ? 'success' : 'danger'}" style="font-size: 0.65rem;">
            ${v.status}
          </span>
        </td>
        <td>${v.battery}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="width: 40px; height: 5px; background-color: var(--bg-app); border-radius: 3px; overflow: hidden; border: 1px solid var(--border-color);">
              <div style="width: ${v.healthScore}%; height: 100%; background-color: ${v.health === 'Healthy' ? 'var(--color-green)' : v.health === 'Warning' ? 'var(--color-orange)' : 'var(--color-red)'};"></div>
            </div>
            <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary);">${v.healthScore}%</span>
          </div>
        </td>
        <td style="text-align: right; pointer-events: none;">
          <button class="btn btn-outline btn-xs" style="pointer-events: auto;" onclick="event.stopPropagation(); window.openVehicleTimelineDrawer('${v.id}')">View Timeline</button>
        </td>
      </tr>
    `).join('');
  }

  window.openVehicleTimelineDrawer = function(vehicleId) {
    const data = window.portalData.telemetryPlatform;
    const vehicle = data.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const timelineEvents = data.timelines[vehicleId] || [
      { time: '12:00 PM', event: 'Watchdog Ping Ingress', detail: 'Nominal telemetry communication stream verified.', icon: 'fa-signal', color: 'green' }
    ];

    drawerTitle.innerHTML = `Vehicle Timeline: ${vehicle.id} <span class="badge badge-${vehicle.health === 'Healthy' ? 'success' : vehicle.health === 'Warning' ? 'warning' : 'danger'}" style="margin-left: 8px; font-size: 0.68rem; vertical-align: middle;">${vehicle.health}</span>`;
    
    drawerBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Box 1: Vehicle Details -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-car" style="color: var(--color-blue); font-size: 0.85rem;"></i> Vehicle Specification</h4>
          <div style="margin-top: 6px; background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
            <div><strong style="color: var(--text-primary);">Vehicle ID:</strong> ${vehicle.id}</div>
            <div><strong style="color: var(--text-primary);">Fleet:</strong> ${vehicle.fleet}</div>
            <div><strong style="color: var(--text-primary);">IoT Device ID:</strong> ${vehicle.deviceId}</div>
            <div><strong style="color: var(--text-primary);">Current Status:</strong> ${vehicle.status}</div>
            <div><strong style="color: var(--text-primary);">Ingress Location:</strong> ${vehicle.location}</div>
          </div>
        </div>

        <!-- Box 2: Timeline Events -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px; margin-bottom: 8px;"><i class="fa-solid fa-clock-rotate-left" style="color: var(--color-purple); font-size: 0.85rem;"></i> Chronological History</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; border-left: 2px solid var(--border-color); padding-left: 14px; margin-left: 6px;">
            ${timelineEvents.map(e => `
              <div style="position: relative;">
                <!-- Bullet icon placement offset -->
                <div style="position: absolute; left: -22px; top: 2px; width: 14px; height: 14px; border-radius: 50%; background-color: var(--bg-surface); border: 2px solid var(--color-${e.color}); display: flex; align-items: center; justify-content: center; font-size: 0.5rem; color: var(--color-${e.color});">
                  <i class="fa-solid ${e.icon}" style="font-size: 0.45rem;"></i>
                </div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">${e.time}</div>
                <strong style="font-size: 0.78rem; color: var(--text-primary); display: block;">${e.event}</strong>
                <p style="font-size: 0.74rem; color: var(--text-secondary); margin-top: 2px; line-height: 1.3;">${e.detail}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Box 3: Actions -->
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 6px; color: var(--color-red);"><i class="fa-solid fa-sliders"></i> Remote CTO Commands</h4>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('REMOTE COMMAND: Dispatched vehicle timeline diagnostics sweep for ${vehicle.id}.')">Trigger Diagnostics</button>
            <button class="btn btn-outline" onclick="alert('SYSTEM: Dispatched investigation directive to local regional dispatch center.')">Investigate Abnormal Behaviour</button>
            <button class="btn btn-outline" onclick="closeDrawer()">Close Details</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  };

  // Expose methods globally for integration hooks
  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;

  // ==========================================================
  // EVCARE.AI DASHBOARD MODULE - EXECUTIVE PRODUCT COMMAND CENTER
  // ==========================================================
  
  function renderEVcareAIDashboardModule() {
    const data = window.portalData.evcareAIDashboard;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR EVCARE.AI DASHBOARD -->
      <style>
        .evcare-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 1200px) {
          .evcare-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .evcare-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .evcare-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .evcare-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .evcare-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .evcare-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Color maps */
        .icon-blue { background-color: rgba(0, 122, 255, 0.08); color: var(--color-blue); }
        .icon-green { background-color: rgba(52, 199, 89, 0.08); color: var(--color-green); }
        .icon-purple { background-color: rgba(175, 82, 222, 0.08); color: var(--color-purple); }
        .icon-red { background-color: rgba(255, 59, 48, 0.08); color: var(--color-red); }
        .icon-orange { background-color: rgba(255, 149, 0, 0.08); color: var(--color-orange); }

        /* Hover Insight Panels */
        .evcare-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .evcare-kpi-card:hover .evcare-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .evcare-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Flowchart styling for connected modules */
        .ecosystem-flow-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }
        .ecosystem-flow-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .ecosystem-flow-row:hover {
          background-color: rgba(0, 122, 255, 0.04);
        }
      </style>

      <!-- EXECUTIVE TOOLBAR: PRIMARY / SECONDARY ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('PRODUCT CONTROL: Deployment approved.')"><i class="fa-solid fa-cloud-arrow-up"></i> Approve Deployment</button>
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Executive PDF Summary created.')"><i class="fa-solid fa-file-pdf"></i> Generate Executive Report</button>
          <button class="btn btn-outline btn-sm" onclick="alert('PRODUCT CONTROL: Launching KPI Tracker console.')"><i class="fa-solid fa-gauge-high"></i> Track Product KPIs</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('SYSTEM: Platform monitors opened.')"><i class="fa-solid fa-binoculars"></i> Monitor Platform</button>
          <button class="btn btn-outline btn-sm" onclick="window.switchRoute('system-logs')"><i class="fa-solid fa-receipt"></i> View System Logs</button>
          <button class="btn btn-outline btn-sm" onclick="alert('SYSTEM: Dispatched restart directives for all microservices...')"><i class="fa-solid fa-rotate"></i> Restart Services</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Commencing executive intelligence summary...')"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Summary</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="evSearchInput" placeholder="Search customer subscriptions, active services, regions..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Fleet: All</option>
            <option value="Fleet Beta">Fleet Beta (South India)</option>
            <option value="Fleet Alpha">Fleet Alpha (West India)</option>
            <option value="Fleet Gamma">Fleet Gamma (North India)</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Region: All</option>
            <option value="Bengaluru">South India (Bengaluru)</option>
            <option value="Mumbai">West India (Mumbai)</option>
            <option value="Delhi">North India (Delhi)</option>
            <option value="Kolkata">East India (Kolkata)</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Vehicle Status: All</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Platform Status: All</option>
            <option value="Optimal">Optimal</option>
            <option value="Warning">Warning</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Subscription Plan: All</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
            <option value="basic">Basic</option>
          </select>
        </div>
      </div>

      <!-- SECTION 1: EXECUTIVE KPIs -->
      <div class="evcare-kpi-grid">
        ${data.kpis.map(k => `
          <div class="evcare-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="evcare-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="evcare-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span style="color: ${k.status === 'Healthy' ? 'var(--color-green)' : k.status === 'Warning' ? 'var(--color-orange)' : 'var(--color-red)'}; font-weight: 600;">
                ● ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action.split(' ')[0]} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `Fleet intelligence operating at ${k.value} baseline score.`, businessImpact: k.businessImpact || "Reduces fleet downtime by 28% via predictive alerts.", aiRecommendation: k.aiRecommendation || "Promote predictive battery maintenance model.", recommendedAction: "Review EVcare.AI", relatedModule: "EVcare.AI Dashboard"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2: SYSTEM HEALTH -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="card-title"><i class="fa-solid fa-server"></i> EVcare.AI Integrated Microservices Status Panel</span>
            <span class="card-subtitle">Real-time indicators showing core pipeline availability (Click service to open module)</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">
            Uptime: <strong style="color: var(--color-green);">${data.productMetrics.stability}</strong> | Response: <strong style="color: var(--color-purple);">${data.productMetrics.responseTime}</strong>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.systemHealth.map(s => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px 14px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 4px; cursor: pointer; transition: background-color var(--transition-fast);" onclick="window.switchRoute('${s.related}')" onmouseover="this.style.backgroundColor='rgba(0,122,255,0.04)'" onmouseout="this.style.backgroundColor='var(--bg-app)'">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.8rem; color: var(--text-primary);">${s.name}</strong>
                <span class="badge badge-success" style="font-size: 0.62rem;">${s.status}</span>
              </div>
              <p style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.3;">${s.details}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 3 & 4: PRODUCT METRICS & AI PERFORMANCE -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 3: Product Metrics -->
        <div class="card col-6">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="card-title"><i class="fa-solid fa-chart-line"></i> Customer Adoption & Engagement</span>
              <span class="card-subtitle">Active subscriptions, sessions and features utilization</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; font-size: 0.78rem;">
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 0.62rem;">Monthly Active (MAU)</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--text-primary); margin-top: 4px;">${data.productMetrics.mau}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 0.62rem;">Vehicle Sessions</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--text-primary); margin-top: 4px;">${data.productMetrics.sessions}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 0.62rem;">Session Duration</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--text-primary); margin-top: 4px;">${data.productMetrics.sessionDuration}</strong>
              </div>
            </div>

            <!-- Features & growth list -->
            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Customer Base growth (MoM)</span>
                <strong style="color: var(--color-green);">${data.productMetrics.customerGrowth}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Subscription base growth</span>
                <strong style="color: var(--color-green);">${data.productMetrics.subGrowth}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Average Customer retention</span>
                <strong style="color: var(--color-blue);">${data.productMetrics.retention}</strong>
              </div>
              <div>
                <strong>Top Features Used:</strong>
                <span class="badge badge-grey" style="margin-left: 4px;">${data.productMetrics.topFeatures[0]}</span>
                <span class="badge badge-grey" style="margin-left: 4px;">${data.productMetrics.topFeatures[1]}</span>
              </div>
            </div>
            
            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-primary btn-sm" onclick="alert('PRODUCT: Loading compare previous month analytics console...')">Compare Previous Month</button>
              <button class="btn btn-outline btn-sm" onclick="alert('PRODUCT: Exporting customer metrics report...')">Generate Product Report</button>
            </div>
          </div>
        </div>

        <!-- Section 4: AI Performance -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-brain"></i> AI Diagnostics & Model Health</span>
              <span class="card-subtitle">State-of-Health failure prediction models validation checks</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; font-size: 0.78rem;">
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 0.62rem;">Battery Accuracy</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--color-green); margin-top: 4px;">${data.aiPerformance.batteryAccuracy}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 0.62rem;">Motor Accuracy</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--color-green); margin-top: 4px;">${data.aiPerformance.motorAccuracy}</strong>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 0.62rem;">Controller Accuracy</div>
                <strong style="font-size: 1.05rem; display: block; color: var(--color-green); margin-top: 4px;">${data.aiPerformance.controllerAccuracy}</strong>
              </div>
            </div>

            <!-- AI diagnostics status -->
            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Total Diagnoses Computed</span>
                <strong style="color: var(--text-primary);">${data.aiPerformance.diagnoses}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Prediction confidence average</span>
                <strong style="color: var(--color-purple);">${data.aiPerformance.confidence}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Average AI response latency</span>
                <strong style="color: var(--text-primary);">${data.aiPerformance.responseTime}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Failed model requests</span>
                <strong style="color: var(--color-green);">${data.aiPerformance.failedRequests} (Healthy)</strong>
              </div>
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('ai-diagnostics')">Open AI Diagnostics</button>
              <button class="btn btn-outline btn-sm" onclick="alert('ML: Loading machine learning operational pipelines...')">Open Machine Learning Platform</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 5 & 6: DEVICE STATUS & REVENUE & SUBSCRIPTIONS -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 5: Device Status -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-microchip"></i> Executive Hardware Devices Status</span>
              <span class="card-subtitle">Ingress hardware performance and firmware rollout compliance tracks</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 0.75rem; color: var(--text-secondary);">
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div>Active IoT Devices: <strong style="color: var(--text-primary);">${data.kpis[2].value}</strong></div>
                <div>Offline Nodes: <strong style="color: var(--color-orange);">${data.deviceStatus.offline}</strong></div>
              </div>
              <div style="background-color: var(--bg-app); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div>Firmware Compliance: <strong style="color: var(--text-primary);">${data.deviceStatus.firmwareCompliance}</strong></div>
                <div>OTA Success Rate: <strong style="color: var(--color-green);">${data.deviceStatus.otaSuccess}</strong></div>
              </div>
            </div>

            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Ingestion Availability (SLA)</span>
                <strong style="color: var(--color-green);">${data.deviceStatus.telemetryAvailability}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Average Device reliability score</span>
                <strong style="color: var(--color-green);">${data.deviceStatus.healthScore}</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Signal Quality average</span>
                <strong style="color: var(--text-primary);">${data.deviceStatus.signalQuality}</strong>
              </div>
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('iot-device-management')">Open IoT Device Management</button>
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('telemetry-platform')">Open Telemetry Platform</button>
            </div>
          </div>
        </div>

        <!-- Section 6: Revenue & Subscriptions -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-file-invoice-dollar"></i> Business Performance & Subscriptions</span>
              <span class="card-subtitle">Contract growth, recurring revenue ratios and top corporate customers</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem;">
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">MRR Breakdown</strong>
              <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
                <span>Active subscriptions: <strong>${data.kpis[6].value}</strong></span>
                <span>MRR Total: <strong style="color: var(--color-green);">${data.revenue.mrr}</strong></span>
              </div>
            </div>

            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Subscription renewals average</span>
                <strong style="color: var(--color-green);">${data.revenue.renewals}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Pending Renewals (Contract Stage)</span>
                <strong style="color: var(--color-orange);">${data.revenue.pendingRenewals} accounts</strong>
              </div>
              <div>
                <strong>Top Fleet Customers:</strong>
                <span style="color: var(--text-primary); font-weight: 700; margin-left: 4px;">${data.revenue.topFleetCustomers[0]}</span>,
                <span style="color: var(--text-primary); font-weight: 700; margin-left: 4px;">${data.revenue.topFleetCustomers[1]}</span>
              </div>
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="alert('Loading subscription details pane...')">View Subscription Details</button>
              <button class="btn btn-outline btn-sm" onclick="alert('Exported corporate revenue report PDF.')">Export Revenue Report</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 7 & 8: NOTIFICATIONS CENTER & SECURITY OVERVIEW -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 7: Notifications Center -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-bell"></i> EVcare.AI Incident Notifications Center</span>
              <span class="card-subtitle">Real-time alerts generated across connected pipeline modules</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.notifications.map(n => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-left: 4px solid var(--color-${n.color}); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--color-${n.color});">${n.priority} &bull; ${n.source}</strong>
                  <span style="font-size: 0.68rem; color: var(--text-muted);">${n.time}</span>
                </div>
                <div style="font-weight: 700; color: var(--text-primary);">${n.text}</div>
                <div style="margin-top: 2px; color: var(--text-secondary);"><strong>Rec:</strong> ${n.rec}</div>
                <div style="margin-top: 8px;">
                  <button class="btn btn-outline btn-xs" onclick="alert('ACTION DISPATCHED: ${n.action}')">${n.action}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 8: Security Overview -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-shield-halved"></i> Cybersecurity & Compliance Overview</span>
              <span class="card-subtitle">Secure boot tracking, threat vectors monitoring and SOC compliance</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem;">
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Compliance Posture</strong>
              <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
                <span>Security Score: <strong style="color: var(--color-green);">${data.security.score}</strong></span>
                <span>Status: <strong style="color: var(--color-blue);">${data.security.compliance}</strong></span>
              </div>
            </div>

            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Authentication Ingress Health</span>
                <strong style="color: var(--color-green);">${data.security.authHealth}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>API Gateway Security track</span>
                <strong style="color: var(--color-green);">${data.security.apiSecurity}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span>Failed API Authentication logins</span>
                <strong style="color: var(--color-green);">${data.security.failedLogins} (Nominal)</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Active Security threat alerts</span>
                <strong style="color: var(--color-green);">${data.security.activeThreats}</strong>
              </div>
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="alert('CYBER: Loading cybersecurity modules console...')">Open Cybersecurity</button>
              <button class="btn btn-outline btn-sm" onclick="alert('SYSTEM: Loading compliance audit logs...')">Review Audit Logs</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 9 & 10: ACTIVITY TIMELINE & AI EXECUTIVE INSIGHTS -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 9: Activity Timeline -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-clock-rotate-left"></i> Major Product Activity Timeline</span>
              <span class="card-subtitle">Chronological releases, deployments and incidents logs</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem; border-left: 2px solid var(--border-color); margin-left: 24px; padding-left: 20px; position: relative;">
            ${data.timeline.map(t => `
              <div style="position: relative; margin-bottom: 6px;">
                <div style="position: absolute; left: -27px; top: 2px; width: 12px; height: 12px; border-radius: 50%; background-color: var(--bg-surface); border: 2px solid var(--color-${t.color}); display: flex; align-items: center; justify-content: center; font-size: 0.5rem; color: var(--color-${t.color});">
                  <i class="fa-solid ${t.icon}" style="font-size: 0.4rem;"></i>
                </div>
                <div style="font-size: 0.68rem; color: var(--text-muted);">${t.time}</div>
                <strong style="font-size: 0.78rem; color: var(--text-primary); display: block;">${t.event}</strong>
                <p style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 2px;">${t.detail}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 10: AI Executive Insights -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Executive Diagnostics Insights</span>
              <span class="card-subtitle">ML observations and financial optimizations suggestions</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.insights.map(ai => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> AI Observation</strong>
                  <span class="badge badge-${ai.risk === 'Critical' ? 'danger' : ai.risk === 'Medium' ? 'warning' : 'info'}" style="font-size: 0.62rem;">Risk: ${ai.risk}</span>
                </div>
                <div style="font-weight: 700; color: var(--text-primary);">${ai.obs}</div>
                <div style="margin-top: 2px; color: var(--text-secondary);"><strong>Impact:</strong> ${ai.impact}</div>
                <div style="margin-top: 2px; color: var(--text-secondary);"><strong>Recommendation:</strong> ${ai.rec}</div>
                <div style="margin-top: 6px; display: flex; justify-content: flex-end;">
                  <button class="btn btn-outline btn-xs" onclick="alert('AI EXECUTIVE ACTION DISPATCHED: ${ai.action}')">${ai.action}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 11: CONNECTED MODULE ECOSYSTEM -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes"></i> EVcare.AI Consolidated Architecture Pipeline</span>
            <span class="card-subtitle">Consolidated operational metrics exchange and sync status loops</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 8px;">
          <div class="ecosystem-flow-container">
            ${data.architecture.map(arc => `
              <div class="ecosystem-flow-row" onclick="window.switchRoute('${arc.route}')">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary);">
                  <i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> ${arc.name}
                </div>
                <div style="display: flex; gap: 24px; color: var(--text-secondary); font-size: 0.72rem;">
                  <span>Health: <strong style="color: var(--color-green);">● ${arc.health}</strong></span>
                  <span>Last Sync: <strong>${arc.sync}</strong></span>
                  <span>Data Status: <strong style="color: var(--color-blue);">${arc.status}</strong></span>
                </div>
                <div style="text-decoration: underline; color: var(--color-blue); font-size: 0.7rem;">Go to Module &rarr;</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Expose methods globally for integration hooks
  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;
  window.renderEVcareAIDashboardModule = renderEVcareAIDashboardModule;

  // ==========================================================
  // AI DIAGNOSTICS MODULE - EXECUTIVE DECISION ENGINE
  // ==========================================================
  
  function renderAIDiagnosticsModule() {
    const data = window.portalData.aiDiagnostics;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR AI DIAGNOSTICS -->
      <style>
        .diag-workflow-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }
        .diag-workflow-node {
          flex: 1;
          min-width: 140px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          text-align: center;
          position: relative;
        }
        .diag-workflow-arrow {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .diag-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .diag-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .diag-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .diag-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .diag-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .diag-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .diag-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Hover Insight Overlays */
        .diag-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .diag-kpi-card:hover .diag-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .diag-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Ecosystem components row */
        .diag-eco-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .diag-eco-row:hover {
          background-color: rgba(0, 122, 255, 0.04);
        }
      </style>

      <!-- PAGE HEADER TOOLBAR ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('DIAGNOSTICS: Instantly triggered active failure diagnostic sweeps...')"><i class="fa-solid fa-bolt"></i> Trigger Diagnostics</button>
          <button class="btn btn-outline btn-sm" onclick="alert('DIAGNOSTICS: Commenced automated scans across all fleets...')"><i class="fa-solid fa-truck-ramp-box"></i> Run Fleet Diagnosis</button>
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Exporting diagnostic evaluation PDF...')"><i class="fa-solid fa-file-invoice"></i> Generate AI Report</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('DIAGNOSTICS: Fetching model performance aggregates...')"><i class="fa-solid fa-eye"></i> Review AI Results</button>
          <button class="btn btn-outline btn-sm" onclick="alert('PRODUCT CONTROL: Approved and signed new thermal runaway predictive model.')"><i class="fa-solid fa-circle-check"></i> Approve New AI Model</button>
          <button class="btn btn-outline btn-sm" onclick="alert('ML FEEDBACK: Dispatched diagnostics calibration logs back to Data Science repo.')"><i class="fa-solid fa-share-from-square"></i> Send Feedback to ML Team</button>
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Downloading full platform diagnostic matrix...')"><i class="fa-solid fa-download"></i> Export Diagnostic Report</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="diagSearchInput" placeholder="Search vehicle VIN, active faults, prediction models, recommendations..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Fleet: All</option>
            <option value="Fleet Alpha">Fleet Alpha</option>
            <option value="Fleet Beta">Fleet Beta</option>
            <option value="Fleet Gamma">Fleet Gamma</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">OEM: All</option>
            <option value="Tata">Tata Motors</option>
            <option value="Mahindra">Mahindra Electric</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Severity: All</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Health Score: All</option>
            <option value="above90">Above 90%</option>
            <option value="below90">Below 90%</option>
          </select>
        </div>
      </div>

      <!-- VISUAL WORKFLOW REPRESENTATION -->
      <div class="diag-workflow-container">
        ${data.workflow.map((w, idx) => `
          <div class="diag-workflow-node">
            <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Stage ${idx+1}</span>
            <strong style="display: block; font-size: 0.78rem; color: var(--text-primary); margin-top: 2px;">${w.stage}</strong>
            <div style="font-size: 0.68rem; color: var(--color-${w.color}); margin-top: 4px; font-weight: 700;">● ${w.status}</div>
            <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 2px;">Rate: ${w.rate}</div>
            <div style="font-size: 0.62rem; color: var(--text-muted);">Latency: ${w.time}</div>
          </div>
          ${idx < data.workflow.length - 1 ? `<div class="diag-workflow-arrow"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
        `).join('')}
      </div>

      <!-- SECTION 1: AI HEALTH OVERVIEW KPIs -->
      <div class="diag-kpi-grid">
        ${data.kpis.map(k => `
          <div class="diag-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="diag-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="diag-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span class="badge badge-${k.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.62rem;">
                ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action.split(' ')[0]} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `Diagnostic model accuracy maintained at ${k.value}.`, businessImpact: k.businessImpact || "Prevented 14 cell thermal runaway risks this week.", aiRecommendation: k.aiRecommendation || "Retrain model on new winter fleet dataset.", recommendedAction: "Open AI Diagnostics", relatedModule: "AI Diagnostics"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2: FLEET AI HEALTH OVERVIEW -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-truck-field"></i> Fleet Operations AI Health Workspace</span>
            <span class="card-subtitle">Select a fleet below to review localized diagnostics and recommendations</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.fleets.map(f => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.85rem; color: var(--text-primary);">${f.name}</strong>
                <span class="badge badge-success" style="font-size: 0.62rem;">Health: ${f.avgHealth}</span>
              </div>
              
              <!-- Metrics stack -->
              <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-secondary); margin-top: 4px;">
                <span>Healthy: <strong style="color: var(--color-green);">${f.healthy}</strong></span>
                <span>Warning: <strong style="color: var(--color-orange);">${f.warning}</strong></span>
                <span>Critical: <strong style="color: var(--color-red);">${f.critical}</strong></span>
              </div>
              
              <div style="font-size: 0.72rem; color: var(--text-secondary); border-top: 1px solid var(--border-color); padding-top: 6px; display: flex; justify-content: space-between;">
                <span>Model Confidence:</span>
                <strong>${f.confidence}</strong>
              </div>
              
              <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; justify-content: space-between;">
                <span>Recommendations:</span>
                <strong style="color: var(--color-blue);">${f.recommendations} open</strong>
              </div>

              <div style="margin-top: 8px; display: flex; gap: 6px;">
                <button class="btn btn-primary btn-xs" onclick="window.openAIDiagnosticDrawer('${f.id}')">View Fleet</button>
                <button class="btn btn-outline btn-xs" onclick="alert('DIAGNOSTICS: Dispatched remote diagnostic checks on ${f.name} vehicles.')">Run Diagnostics</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 3: PREDICTION CENTER -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> Predictive Diagnostics intelligence Center</span>
            <span class="card-subtitle">AI predicted component anomalies, failure probabilities and estimated times to failure (ETF)</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 1.25rem;">
          
          <!-- Battery Intelligence -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <div style="font-weight: 700; font-size: 0.8rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-car-battery" style="color: var(--color-green);"></i> Battery Intelligence
            </div>
            <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
              <div>Health: <strong>${data.predictions.battery.health}</strong></div>
              <div>Remaining Useful Life: <strong>${data.predictions.battery.rul}</strong></div>
              <div>Failure Prob: <strong style="color: var(--color-green);">${data.predictions.battery.probability}</strong></div>
              <div>Confidence: <strong>${data.predictions.battery.confidence}</strong></div>
              <div>Est. Failure Lead Time: <strong style="color: var(--color-green);">${data.predictions.battery.etf}</strong></div>
            </div>
            <div style="margin-top: 8px;">
              <button class="btn btn-outline btn-xs" style="width:100%;" onclick="alert('INSPECTION: Dispatched battery inspect order to operations.')">${data.predictions.battery.action}</button>
            </div>
          </div>

          <!-- Motor Intelligence -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <div style="font-weight: 700; font-size: 0.8rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-gauge-high" style="color: var(--color-blue);"></i> Motor Intelligence
            </div>
            <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
              <div>Health: <strong>${data.predictions.motor.health}</strong></div>
              <div>Efficiency: <strong>${data.predictions.motor.efficiency}</strong></div>
              <div>Failure Prob: <strong style="color: var(--color-orange);">${data.predictions.motor.probability}</strong></div>
              <div>Confidence: <strong>${data.predictions.motor.confidence}</strong></div>
              <div>Est. Failure Lead Time: <strong style="color: var(--color-orange);">${data.predictions.motor.etf}</strong></div>
            </div>
            <div style="margin-top: 8px;">
              <button class="btn btn-outline btn-xs" style="width:100%;" onclick="alert('REVIEW: Fetching detailed diagnostic trace plots.')">${data.predictions.motor.action}</button>
            </div>
          </div>

          <!-- Controller Intelligence -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <div style="font-weight: 700; font-size: 0.8rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-microchip" style="color: var(--color-purple);"></i> Controller Stability
            </div>
            <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
              <div>Stability Index: <strong>${data.predictions.controller.stability}</strong></div>
              <div>Voltage Behavior: <strong>${data.predictions.controller.voltage}</strong></div>
              <div>Failure Prob: <strong style="color: var(--color-green);">${data.predictions.controller.probability}</strong></div>
              <div>Confidence: <strong>${data.predictions.controller.confidence}</strong></div>
              <div>Est. Failure Lead Time: <strong style="color: var(--color-green);">${data.predictions.controller.etf}</strong></div>
            </div>
            <div style="margin-top: 8px;">
              <button class="btn btn-outline btn-xs" style="width:100%;" onclick="alert('INSPECTION: Dispatching controller calibration requests.')">${data.predictions.controller.action}</button>
            </div>
          </div>

          <!-- Charging Intelligence -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <div style="font-weight: 700; font-size: 0.8rem; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-bolt" style="color: var(--color-orange);"></i> Charging Intelligence
            </div>
            <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
              <div>Charging Health: <strong>${data.predictions.charging.health}</strong></div>
              <div>Charging Cycles: <strong>${data.predictions.charging.cycles}</strong></div>
              <div>Failure Prob: <strong style="color: var(--color-orange);">${data.predictions.charging.probability}</strong></div>
              <div>Confidence: <strong>${data.predictions.charging.confidence}</strong></div>
              <div>Est. Failure Lead Time: <strong style="color: var(--color-orange);">${data.predictions.charging.etf}</strong></div>
            </div>
            <div style="margin-top: 8px;">
              <button class="btn btn-outline btn-xs" style="width:100%;" onclick="alert('SERVICE: Creating vehicle service ticket inside operations.')">${data.predictions.charging.action}</button>
            </div>
          </div>

        </div>
      </div>

      <!-- SECTION 4 & 5: FAULT DETECTION & MAINTENANCE RECOMMENDATIONS -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 4: Fault Detection Center -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-bug"></i> Active Fault Detection Center</span>
              <span class="card-subtitle">Active component failure codes and severity indexes</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.faults.map(f => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: ${f.severity === 'Critical' ? 'var(--color-red)' : 'var(--color-orange)'};">${f.severity} &bull; ${f.type}</strong>
                  <span style="font-size: 0.68rem; color: var(--text-muted);">${f.time}</span>
                </div>
                <div style="color: var(--text-secondary);"><strong>Root Cause:</strong> ${f.cause}</div>
                <div style="color: var(--text-secondary);"><strong>Impact:</strong> ${f.impact}</div>
                <div style="margin-top: 4px; display: flex; justify-content: space-between; align-items: center;">
                  <span>Affected: <strong style="color: var(--text-primary);">${f.affected} vehicles</strong> (Trend: ${f.trend})</span>
                  <div style="display: flex; gap: 4px;">
                    <button class="btn btn-outline btn-xs" onclick="alert('INVESTIGATION: Dispatched teams to review root cause.')">Assign Investigation</button>
                    <button class="btn btn-outline btn-xs" onclick="alert('SERVICE: Created critical service ticket.')">Create Ticket</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 5: Maintenance Recommendation Center -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-wrench"></i> Executive Maintenance Recommendation Center</span>
              <span class="card-subtitle">Predictive and preventive recommendations generated by AI diagnostics</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            
            <!-- Immediate Action -->
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-left: 4px solid var(--color-red); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: var(--color-red);">Immediate Action Needed</strong>
                <span class="badge badge-danger" style="font-size: 0.62rem;">${data.recommendations.immediate[0].timeline}</span>
              </div>
              <div style="margin-top: 4px; font-weight: 700; color: var(--text-primary);">${data.recommendations.immediate[0].impact}</div>
              <div style="color: var(--text-secondary); margin-top: 2px;">
                Fleet: <strong>${data.recommendations.immediate[0].fleet}</strong> | Est. Cost: <strong>${data.recommendations.immediate[0].cost}</strong>
              </div>
              <div style="margin-top: 8px; display: flex; gap: 4px;">
                <button class="btn btn-primary btn-xs" onclick="alert('DIAGNOSTICS: Approved recommendation.')">Approve Recommendation</button>
                <button class="btn btn-outline btn-xs" onclick="alert('SERVICE: Created service request ticket.')">Create Service Request</button>
              </div>
            </div>

            <!-- Scheduled Maintenance -->
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); border-left: 4px solid var(--color-orange); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: var(--color-orange);">Scheduled Maintenance</strong>
                <span class="badge badge-warning" style="font-size: 0.62rem;">${data.recommendations.scheduled[0].timeline}</span>
              </div>
              <div style="margin-top: 4px; font-weight: 700; color: var(--text-primary);">${data.recommendations.scheduled[0].impact}</div>
              <div style="color: var(--text-secondary); margin-top: 2px;">
                Fleet: <strong>${data.recommendations.scheduled[0].fleet}</strong> | Est. Cost: <strong>${data.recommendations.scheduled[0].cost}</strong>
              </div>
              <div style="margin-top: 8px;">
                <button class="btn btn-outline btn-xs" onclick="alert('SERVICE: Dispatched team.')">Assign Service Team</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- SECTION 6: CONFIDENCE SCORE ANALYTICS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-chart-area"></i> Confidence Score Analytics & Trends</span>
            <span class="card-subtitle">AI diagnostic accuracy tracks, success rates and prediction distribution profiles</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 1.25rem;">
          
          <!-- Chart 1: Accuracy Trend -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">Prediction Accuracy Trend</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="diagAccuracyChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              📈 Accuracy: <strong>98.2% avg</strong>. Overall accuracy remains stable MoM.
            </div>
          </div>

          <!-- Chart 2: Confidence Trend -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">Confidence Score Trend</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="diagConfidenceChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              🎯 Confidence: <strong>96.2%</strong>. Validated across model generation cycles.
            </div>
          </div>

          <!-- Chart 3: Success Rate -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">Diagnostic Success Rate</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="diagSuccessChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              ✅ Success: <strong>99.98%</strong>. Zero telemetry packet lag or stream timeouts.
            </div>
          </div>

          <!-- Chart 4: Failure Distribution -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">Prediction Distribution</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="diagDistributionChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              📊 Distribution: <strong>18 critical</strong> predictions reported.
            </div>
          </div>

        </div>
      </div>

      <!-- SECTION 8: AI EXECUTIVE INSIGHTS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Executive Diagnostics Insights Panel</span>
            <span class="card-subtitle">Actionable observations, predicted business impacts, and suggested actions</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.insights.map(i => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> Observation: ${i.obs}</strong>
                <span class="badge badge-${i.risk === 'Critical' ? 'danger' : 'warning'}" style="font-size: 0.62rem;">Risk: ${i.risk}</span>
              </div>
              <div style="color: var(--text-secondary);"><strong>Affected:</strong> ${i.fleet} (Confidence: ${i.confidence})</div>
              <div style="color: var(--text-secondary);"><strong>Business Impact:</strong> ${i.impact}</div>
              <div style="color: var(--text-secondary);"><strong>Recommendation:</strong> ${i.rec}</div>
              <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                <button class="btn btn-outline btn-xs" onclick="alert('CTO DECISION APPROVED: ${i.action}')">${i.action}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 9: CONNECTED MODULE ECOSYSTEM -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes"></i> EVcare.AI Integrated Diagnostics Architecture</span>
            <span class="card-subtitle">Operational metrics exchange, sync times, and consumes/produces schemas</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 8px;">
          <div class="ecosystem-flow-container">
            ${data.architecture.map(arc => `
              <div class="diag-eco-row" onclick="window.switchRoute('${arc.route}')">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); width: 250px;">
                  <i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> ${arc.name}
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px; font-size: 0.7rem; color: var(--text-secondary);">
                  <div>Consumes: <strong style="color: var(--text-muted);">${arc.consumes}</strong></div>
                  <div>Produces: <strong style="color: var(--text-muted);">${arc.produces}</strong></div>
                </div>
                <div style="display: flex; gap: 24px; color: var(--text-secondary); font-size: 0.72rem; align-items: center;">
                  <span>Health: <strong style="color: var(--color-green);">● ${arc.health}</strong></span>
                  <span>Sync: <strong>${arc.sync}</strong></span>
                  <div style="text-decoration: underline; color: var(--color-blue); font-size: 0.7rem;">Go &rarr;</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Initialize Chart.js analytics graphs
    if (window.portalCharts && typeof window.portalCharts.initAIDiagnosticsCharts === 'function') {
      if (window.portalCharts && typeof window.portalCharts.initAIDiagnosticsCharts === 'function') { window.portalCharts.initAIDiagnosticsCharts(); }
    }
  }

  // DIAGNOSTIC DETAIL DRAWER
  function openAIDiagnosticDrawer(fleetId) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">Fleet Diagnostic Overview</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Sync Scope: ${fleetId}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Overview & Telemetry -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Telemetry Summary</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Total active nodes: <strong>3,240 devices</strong></div>
            <div>Cellular connectivity signal: <strong style="color: var(--color-green);">-68 dBm (Optimal)</strong></div>
            <div>Uptime status: <strong style="color: var(--color-green);">99.98%</strong></div>
          </div>
        </div>

        <!-- Section 2: Component Analyses -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Component Diagnostic Breakdown</strong>
          <div style="display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>Battery Impedance Delta</span>
              <strong style="color: var(--color-green);">97.8% Healthy</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>Motor Coil Thermal Variance</span>
              <strong style="color: var(--color-orange);">92.4% Warning</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Controller Capacitor Load</span>
              <strong style="color: var(--color-green);">99.1% Healthy</strong>
            </div>
          </div>
        </div>

        <!-- Section 3: Active Faults & Predictions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Active Failure Predictions</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
            <div>Anomaly Code: <strong style="color: var(--color-orange);">MC-THERM-402</strong></div>
            <div>Root Cause: <strong>Phase coil thermal stress.</strong></div>
            <div>Failure Probability: <strong style="color: var(--color-orange);">8.4%</strong></div>
            <div>Est. Time to Failure (ETF): <strong style="color: var(--color-orange);">45 days</strong></div>
          </div>
        </div>

        <!-- Section 4: Maintenance & Decisions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Recommended CTO Decision</strong>
          <p style="color: var(--text-secondary); margin-top: 2px; line-height: 1.3;">
            Initiate phase calibration software patch deploy to recalibrate coil torque curves, preventing hardware wear.
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('DIAGNOSTICS: Dispatched remote diagnostic check loop.')">Run Diagnostics Again</button>
            <button class="btn btn-outline" onclick="alert('DECISION: Approved recommendation for this fleet.')">Approve Recommendation</button>
            <button class="btn btn-outline" onclick="alert('SERVICE: Dispatched technician instruction ticket.')">Assign Engineering Team</button>
            <button class="btn btn-outline" onclick="window.switchRoute('telemetry-platform'); closeDrawer();">View Telemetry</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  // Expose methods globally for integration hooks
  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;
  window.renderEVcareAIDashboardModule = renderEVcareAIDashboardModule;
  window.renderAIDiagnosticsModule = renderAIDiagnosticsModule;
  window.openAIDiagnosticDrawer = openAIDiagnosticDrawer;

  // ==========================================================
  // MOBILE APP MANAGEMENT MODULE - COMMAND CENTER
  // ==========================================================
  
  function renderMobileAppManagementModule() {
    const data = window.portalData.mobileAppManagement;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR MOBILE APP MANAGEMENT -->
      <style>
        .mobile-workflow-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }
        .mobile-workflow-node {
          flex: 1;
          min-width: 140px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          text-align: center;
        }
        .mobile-workflow-arrow {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .mobile-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 1200px) {
          .mobile-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .mobile-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .mobile-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .mobile-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .mobile-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .mobile-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Hover Insight Overlays */
        .mobile-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .mobile-kpi-card:hover .mobile-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .mobile-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Ecosystem components row */
        .mobile-eco-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .mobile-eco-row:hover {
          background-color: rgba(0, 122, 255, 0.04);
        }
      </style>

      <!-- PAGE HEADER TOOLBAR ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('RELEASE: Publish update triggered...')"><i class="fa-solid fa-cloud-arrow-up"></i> Publish Update</button>
          <button class="btn btn-outline btn-sm" onclick="alert('CONFIG: Opening App Settings layout...')"><i class="fa-solid fa-sliders"></i> Configure App Settings</button>
          <button class="btn btn-outline btn-sm" onclick="alert('FLAGS: Commencing feature flags edit console...')"><i class="fa-solid fa-toggle-on"></i> Enable / Disable Features</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('NOTIFICATIONS: Opening push campaigns creator...')"><i class="fa-solid fa-bell"></i> Push Notification</button>
          <button class="btn btn-outline btn-sm" onclick="alert('RELEASE: Rolling back current production v5.2.4 build to stable backup...')"><i class="fa-solid fa-rotate-left"></i> Rollback Release</button>
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Exporting application reports PDF...')"><i class="fa-solid fa-file-pdf"></i> Export Mobile Report</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Creating mobile feedback summary logs...')"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Summary</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="mobSearchInput" placeholder="Search feature flags, version change releases, device crashes..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Platform: All</option>
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Version: All</option>
            <option value="v5.2.4">v5.2.4</option>
            <option value="v5.2.0">v5.2.0</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Region: All</option>
            <option value="West">West India</option>
            <option value="South">South India</option>
          </select>
        </div>
      </div>

      <!-- VISUAL WORKFLOW REPRESENTATION -->
      <div class="mobile-workflow-container">
        ${data.workflow.map((w, idx) => `
          <div class="mobile-workflow-node">
            <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Stage ${idx+1}</span>
            <strong style="display: block; font-size: 0.78rem; color: var(--text-primary); margin-top: 2px;">${w.stage}</strong>
            <div style="font-size: 0.68rem; color: var(--color-green); margin-top: 4px; font-weight: 700;">● ${w.status}</div>
            <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 2px;">Rate: ${w.successRate}</div>
            <div style="font-size: 0.62rem; color: var(--text-muted);">Owner: ${w.owner}</div>
          </div>
          ${idx < data.workflow.length - 1 ? `<div class="mobile-workflow-arrow"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
        `).join('')}
      </div>

      <!-- SECTION 1: MOBILE APPLICATION OVERVIEW KPIs -->
      <div class="mobile-kpi-grid">
        ${data.kpis.map(k => `
          <div class="mobile-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="mobile-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="mobile-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span class="badge badge-${k.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.62rem;">
                ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action.split(' ')[0]} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `Mobile driver app build v4.2 operating at ${k.value}.`, businessImpact: k.businessImpact || "High crash-free rate maintains 4.8 driver rating.", aiRecommendation: k.aiRecommendation || "Roll out patch v4.2.1 to remaining 15% users.", recommendedAction: "Inspect Mobile App", relatedModule: "Mobile App Management"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2 & 3: VERSION CONTROL & RELEASE NOTES -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 2: Version Control -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-code-branch"></i> Mobile Build & Version Control</span>
              <span class="card-subtitle">Active and archived application build distributions</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.versions.map(v => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--text-primary); font-size: 0.82rem;">${v.num} (${v.platform})</strong>
                  <span class="badge badge-${v.status === 'Production' ? 'success' : 'grey'}" style="font-size: 0.62rem;">${v.status}</span>
                </div>
                <div style="color: var(--text-secondary); display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; margin-top: 4px;">
                  <div>Adoption: <strong>${v.adoption}</strong></div>
                  <div>Active Users: <strong>${v.users}</strong></div>
                  <div>Issues: <strong>${v.issues}</strong></div>
                  <div>Rollback: <strong style="color: var(--color-green);">${v.rollback}</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="window.openMobileAppDrawer('${v.num}')">View Release</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('RELEASE: 1-Click Rollback successfully scheduled.')">Rollback</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('CHANGELOG: Loading v5.2.4 commits changelog...')">Changelog</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 3: Release Notes -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-file-invoice"></i> Production Release History</span>
              <span class="card-subtitle">Version changelog highlights and feature details</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.releases.map(r => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <strong style="color: var(--text-primary); display: block; font-size: 0.8rem; margin-bottom: 4px;">Release ${r.version} Details</strong>
                <p style="color: var(--text-secondary); margin-bottom: 4px; font-style: italic;">"${r.highlights}"</p>
                <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
                  <div>🔧 <strong>Bug Fixes:</strong> ${r.bugfixes}</div>
                  <div>✨ <strong>New Features:</strong> ${r.features}</div>
                  <div>⚡ <strong>Performance:</strong> ${r.performance}</div>
                </div>
                <div style="margin-top: 8px;">
                  <button class="btn btn-outline btn-xs" onclick="alert('REPORTS: Exporting release changelog report PDF.')">Compare Versions</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 4: FEATURE FLAGS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-toggle-on"></i> Product Feature Flags Governance</span>
            <span class="card-subtitle">Rollout percentages, target users and business impacts metrics</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.featureFlags.map(f => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.8rem; color: var(--text-primary);">${f.name}</strong>
                <span class="badge badge-${f.status === 'Enabled' ? 'success' : 'grey'}" style="font-size: 0.62rem;">${f.status}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px; margin-top: 4px;">
                <div>Rollout Percentage: <strong>${f.rollout}</strong></div>
                <div>Target Active Users: <strong>${f.users}</strong></div>
                <div>Business Impact: <strong style="color: var(--color-blue);">${f.impact}</strong></div>
                <div>Owner Team: <strong>${f.owner}</strong></div>
              </div>
              <div style="margin-top: 8px; display: flex; gap: 4px;">
                <button class="btn btn-primary btn-xs" onclick="alert('FLAGS: Flag state enabled.')">Enable</button>
                <button class="btn btn-outline btn-xs" onclick="alert('FLAGS: Flag state disabled.')">Disable</button>
                <button class="btn btn-outline btn-xs" onclick="alert('FLAGS: Scaling flag rollout percentage...')">Increase Rollout</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 5 & 6: USER ANALYTICS & CRASH ANALYTICS -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 5: User Analytics -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-chart-pie"></i> Mobile Application User Analytics</span>
              <span class="card-subtitle">Active distribution, country metrics and retention trends</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Android User Base: <strong>${data.analytics.distribution.android}</strong></span>
              <span>iOS User Base: <strong>${data.analytics.distribution.ios}</strong></span>
              <span>User Retention: <strong style="color: var(--color-green);">${data.analytics.retention}</strong></span>
            </div>
            
            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <div><strong>Top Features Used:</strong> ${data.analytics.usage.join(', ')}</div>
              <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-color); padding-top: 6px;">
                <span>Active Users (MAU)</span>
                <strong>${data.analytics.mau} users</strong>
              </div>
            </div>

            <!-- Premium charts canvas container -->
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="mobileUsersChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 6: Crash Analytics -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> Crash Analytics & Stability Index</span>
              <span class="card-subtitle">Crash reports counts, ANR rates and stability trends</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Crash Reports Today: <strong style="color: var(--color-green);">${data.crashes.reports}</strong></span>
              <span>Crash-Free: <strong style="color: var(--color-green);">${data.crashes.sessions}</strong></span>
              <span>ANR Rate: <strong style="color: var(--color-green);">${data.crashes.anr}</strong></span>
            </div>

            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
              <strong>Top Crash Categories:</strong>
              ${data.crashes.categories.map(c => `<div style="font-size:0.7rem; color: var(--text-muted);">&bull; ${c}</div>`).join('')}
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="alert('CRASH: Fetching detailed stack traces...')">View Crash Details</button>
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('bug-tracking')">Open Bug Tracking</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 7 & 8: PUSH NOTIFICATIONS & USER FEEDBACK -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 7: Push Notification Center -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-bullhorn"></i> Push Notifications Campaigns Center</span>
              <span class="card-subtitle">Campaign metrics, delivery statistics and scheduled digests</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; color: var(--text-secondary);">
              <div>Sent Count: <strong>${data.notifications.sent}</strong></div>
              <div>Delivery Rate: <strong style="color: var(--color-green);">${data.notifications.delivery}</strong></div>
              <div>Open Rate: <strong style="color: var(--color-green);">${data.notifications.open}</strong></div>
              <div>Failed: <strong style="color: var(--color-green);">${data.notifications.failed}</strong></div>
            </div>
            
            <div style="font-size: 0.75rem; color: var(--text-secondary); border-top: 1px solid var(--border-color); padding-top: 6px;">
              <div>Active Campaign: <strong>${data.notifications.campaigns}</strong></div>
              <div>Scheduled Digest: <strong>${data.notifications.scheduled}</strong></div>
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-primary btn-sm" onclick="alert('NOTIFICATIONS: Launching push dialog wizard.')">Create Notification</button>
              <button class="btn btn-outline btn-sm" onclick="alert('NOTIFICATIONS: Opening weekly scheduler campaign.')">Schedule Campaign</button>
            </div>
          </div>
        </div>

        <!-- Section 8: User Feedback -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-comments"></i> Mobile Customer Feedback & Reviews</span>
              <span class="card-subtitle">Rating distributions, reviews sentiment score and driver feedbacks</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-sm); font-size: 0.76rem; display: flex; justify-content: space-between;">
              <span>Average App Store Rating: <strong>${data.feedback.rating}</strong></span>
              <span>Reviews Sentiment: <strong style="color: var(--color-green);">${data.feedback.sentiment}</strong></span>
            </div>
            
            <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
              <strong>Recent Reviews:</strong>
              ${data.feedback.recent.map(r => `
                <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                  <strong>${r.user} (${r.rating}★):</strong> "${r.text}"
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('feature-requests')">Create Feature Request</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 10: AI MOBILE INSIGHTS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Mobile Analytics Executive Insights</span>
            <span class="card-subtitle">Executive recommendations, risk margins and observations for mobile systems</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.insights.map(i => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> AI Observation: ${i.obs}</strong>
                <span class="badge badge-${i.riskLevel === 'Medium' ? 'warning' : 'success'}" style="font-size: 0.62rem;">Risk: ${i.riskLevel || 'None'}</span>
              </div>
              <div style="color: var(--text-secondary);"><strong>Target Users:</strong> ${i.users}</div>
              <div style="color: var(--text-secondary);"><strong>Business Impact:</strong> ${i.impact}</div>
              <div style="color: var(--text-secondary);"><strong>Recommendation:</strong> ${i.rec}</div>
              <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                <button class="btn btn-outline btn-xs" onclick="alert('AI EXECUTIVE ACTION DISPATCHED: ${i.action}')">${i.action}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 11: CONNECTED MODULE ECOSYSTEM -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes"></i> EVcare.AI Integrated Mobile Ecosystem</span>
            <span class="card-subtitle">Ecosystem dependencies, synchronization logs and navigation links</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 8px;">
          <div class="ecosystem-flow-container">
            ${data.architecture.map(arc => `
              <div class="mobile-eco-row" onclick="window.switchRoute('${arc.route}')">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); width: 250px;">
                  <i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> ${arc.name}
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px; font-size: 0.7rem; color: var(--text-secondary);">
                  <div>Consumes: <strong style="color: var(--text-muted);">${arc.consumes}</strong></div>
                  <div>Produces: <strong style="color: var(--text-muted);">${arc.produces}</strong></div>
                </div>
                <div style="display: flex; gap: 24px; color: var(--text-secondary); font-size: 0.72rem; align-items: center;">
                  <span>Health: <strong style="color: var(--color-green);">● ${arc.health}</strong></span>
                  <span>Sync: <strong>${arc.sync}</strong></span>
                  <div style="text-decoration: underline; color: var(--color-blue); font-size: 0.7rem;">Go &rarr;</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Initialize Chart.js analytics graphs
    if (window.portalCharts && typeof window.portalCharts.initMobileAppCharts === 'function') {
      if (window.portalCharts && typeof window.portalCharts.initMobileAppCharts === 'function') { window.portalCharts.initMobileAppCharts(); }
    }
  }

  // APPLICATION DETAIL DRAWER
  function openMobileAppDrawer(versionNum) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">Mobile Build Details</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Version Scope: ${versionNum}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Application Overview -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Version Information</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Adoption: <strong>91.0% Android / iOS</strong></div>
            <div>Crash-Free: <strong style="color: var(--color-green);">99.92%</strong></div>
            <div>Daily Active Users: <strong>1,420 DAU</strong></div>
          </div>
        </div>

        <!-- Section 2: Feature Flags -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Active Feature Flags</strong>
          <div style="display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>Thermal Notifications</span>
              <strong style="color: var(--color-green);">Enabled (100%)</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>Telemetry Map Widget</span>
              <strong style="color: var(--color-green);">Enabled (100%)</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>OTA Firmware Flash Pilot</span>
              <strong style="color: var(--text-muted);">Disabled (10%)</strong>
            </div>
          </div>
        </div>

        <!-- Section 3: Performance & Crashes -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Crash Analytics</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
            <div>Reports Today: <strong style="color: var(--color-green);">4 reports</strong></div>
            <div>Top Crash: <strong>Jio Cellular Connection Timeout</strong></div>
            <div>Performance Score: <strong style="color: var(--color-green);">98 / 100</strong></div>
          </div>
        </div>

        <!-- Section 4: CTO Action Decisions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Recommended CTO Decision</strong>
          <p style="color: var(--text-secondary); margin-top: 2px; line-height: 1.3;">
            Lock current stable baseline build and push incremental telemetry updates to Android and iOS production.
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('RELEASE: Production deployment approved.')">Publish</button>
            <button class="btn btn-outline" onclick="alert('RELEASE: 1-Click Rollback successfully scheduled.')">Rollback</button>
            <button class="btn btn-outline" onclick="alert('FLAGS: Enabled selected feature.')">Enable Feature</button>
            <button class="btn btn-outline" onclick="window.switchRoute('bug-tracking'); closeDrawer();">Open Bug Tracking</button>
            <button class="btn btn-outline" onclick="window.switchRoute('software-development'); closeDrawer();">Open Software Development</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  // Expose methods globally for integration hooks
  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;
  window.renderEVcareAIDashboardModule = renderEVcareAIDashboardModule;
  window.renderAIDiagnosticsModule = renderAIDiagnosticsModule;
  window.openAIDiagnosticDrawer = openAIDiagnosticDrawer;
  window.renderMobileAppManagementModule = renderMobileAppManagementModule;
  window.openMobileAppDrawer = openMobileAppDrawer;

  // ==========================================================
  // WEB PORTAL MANAGEMENT MODULE - DIGITAL PLATFORM OPERATIONS
  // ==========================================================
  
  function renderWebPortalManagementModule() {
    const data = window.portalData.webPortalManagement;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR WEB PORTAL MANAGEMENT -->
      <style>
        .web-workflow-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }
        .web-workflow-node {
          flex: 1;
          min-width: 140px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          text-align: center;
        }
        .web-workflow-arrow {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .web-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 1200px) {
          .web-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .web-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .web-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .web-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .web-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .web-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Hover Insight Overlays */
        .web-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .web-kpi-card:hover .web-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .web-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Ecosystem components row */
        .web-eco-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .web-eco-row:hover {
          background-color: rgba(0, 122, 255, 0.04);
        }
      </style>

      <!-- PAGE HEADER TOOLBAR ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('CMS: Opening CMS management layout...')"><i class="fa-solid fa-list-check"></i> Manage CMS</button>
          <button class="btn btn-outline btn-sm" onclick="alert('UI: Triggering Portal UI layout editor...')"><i class="fa-solid fa-pen-to-square"></i> Update Portal UI</button>
          <button class="btn btn-outline btn-sm" onclick="alert('API: Opening API configurator panel...')"><i class="fa-solid fa-gear"></i> Configure APIs</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('USERS: Opening active users profile logs...')"><i class="fa-solid fa-users-gear"></i> Manage Users</button>
          <button class="btn btn-outline btn-sm" onclick="alert('ANNOUNCEMENT: Announcement published successfully to customer dashboard.')"><i class="fa-solid fa-bullhorn"></i> Publish Announcement</button>
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Exporting portal operational summary PDF...')"><i class="fa-solid fa-file-pdf"></i> Export Portal Report</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Constructing customer portal usage insights summary...')"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Summary</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="webSearchInput" placeholder="Search page announcements, API endpoints, service bookings..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Module: All</option>
            <option value="Dashboard">Dashboard</option>
            <option value="Booking">Booking</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Region: All</option>
            <option value="West">West India</option>
            <option value="South">South India</option>
          </select>
        </div>
      </div>

      <!-- VISUAL WORKFLOW REPRESENTATION -->
      <div class="web-workflow-container">
        ${data.workflow.map((w, idx) => `
          <div class="web-workflow-node">
            <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Stage ${idx+1}</span>
            <strong style="display: block; font-size: 0.78rem; color: var(--text-primary); margin-top: 2px;">${w.stage}</strong>
            <div style="font-size: 0.68rem; color: var(--color-green); margin-top: 4px; font-weight: 700;">● ${w.status}</div>
            <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 2px;">Usage: ${w.usage}</div>
            <div style="font-size: 0.62rem; color: var(--text-muted);">Success: ${w.successRate}</div>
          </div>
          ${idx < data.workflow.length - 1 ? `<div class="web-workflow-arrow"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
        `).join('')}
      </div>

      <!-- SECTION 1: WEB PLATFORM OVERVIEW KPIs -->
      <div class="web-kpi-grid">
        ${data.kpis.map(k => `
          <div class="web-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="web-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="web-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span class="badge badge-${k.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.62rem;">
                ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action.split(' ')[0]} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `Executive portal CMS operating at ${k.value}.`, businessImpact: k.businessImpact || "Delivers real-time executive intelligence to CTO.", aiRecommendation: k.aiRecommendation || "Enable CDN caching for analytics reports.", recommendedAction: "Manage Web Portal", relatedModule: "Web Portal Management"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2 & 3: WEBSITE HEALTH & PORTAL USERS -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 2: Website Health -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-heart-pulse"></i> Website Availability & Platform Health</span>
              <span class="card-subtitle">Server status, DB connections and SSL validations</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px; padding: 1.25rem; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Availability SLA Uptime</span>
              <strong style="color: var(--color-green);">${data.health.apiAvailability}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Server status</span>
              <strong style="color: var(--color-green);">${data.health.server}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Database connectivity</span>
              <strong style="color: var(--color-green);">${data.health.database}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>SSL certification</span>
              <strong>${data.health.sslStatus}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Page speed response latency</span>
              <strong>${data.health.responseTime}</strong>
            </div>
            
            <div style="margin-top: 8px; display: flex; gap: 6px;">
              <button class="btn btn-primary btn-sm" onclick="window.openWebPortalDrawer('main-portal')">View Portal Details</button>
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('cloud-infrastructure')">Open Cloud Infrastructure</button>
              <button class="btn btn-outline btn-sm" onclick="alert('SYSTEM: Dispatched microservices restart directive...')">Restart Services</button>
            </div>
          </div>
        </div>

        <!-- Section 3: Portal Users -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-users"></i> Customer Access & Registrations</span>
              <span class="card-subtitle">User active engagement and regional metrics</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px; padding: 1.25rem; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Active logons (DAU)</span>
              <strong>${data.users.dau} users</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>New registrations today</span>
              <strong>+${data.users.newRegistrations} accounts</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Returning users ratio</span>
              <strong>${data.users.returning}</strong>
            </div>
            <div>
              <strong>Top Accessed Pages:</strong>
              ${data.users.pages.map(p => `<span class="badge badge-grey" style="margin-left:4px;">${p}</span>`).join('')}
            </div>

            <div style="margin-top: 8px; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('software-development')">Open Customer Management</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 4 & 7: SERVICE BOOKINGS & CMS MANAGEMENT -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 4: Service Bookings -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-calendar-check"></i> Customer Service Bookings</span>
              <span class="card-subtitle">Calibration and repair booking conversions stats</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px; padding: 1.25rem; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; background-color: var(--bg-app); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div>Total bookings: <strong>${data.bookings.total}</strong></div>
              <div>Conversion Rate: <strong style="color: var(--color-green);">${data.bookings.conversion}</strong></div>
              <div>Completed: <strong>${data.bookings.completed}</strong></div>
              <div>Cancelled: <strong style="color: var(--color-green);">${data.bookings.cancelled}</strong></div>
            </div>
            
            <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 4px;">
              <div>Average booking time: <strong>${data.bookings.avgTime}</strong></div>
              <div>Popular Services: <strong>${data.bookings.types.join(', ')}</strong></div>
            </div>

            <div style="margin-top: 8px; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('software-development')">Open Service Operations</button>
            </div>
          </div>
        </div>

        <!-- Section 7: CMS Management -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-list-check"></i> Executive CMS Content Management</span>
              <span class="card-subtitle">Published announcements and homepage content validations</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px; padding: 1.25rem; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Published Content Pages</span>
              <strong>${data.cms.published}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Pending Drafts</span>
              <strong>${data.cms.draft}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
              <span>Active Announcement Banner</span>
              <strong style="color: var(--color-green);">${data.cms.banner}</strong>
            </div>
            <div>
              <strong>Latest Update:</strong> "${data.cms.recentUpdate}"
            </div>

            <div style="margin-top: 8px; display: flex; gap: 6px;">
              <button class="btn btn-primary btn-sm" onclick="alert('CMS: Dispatched publish directive.')">Publish Content</button>
              <button class="btn btn-outline btn-sm" onclick="alert('CMS: Opening homepage builder...')">Update Homepage</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 5: PORTAL ANALYTICS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-chart-line"></i> Web Portal Conversion & Performance Analytics</span>
            <span class="card-subtitle">Customer journey, device distribution and page latency trends</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 1.25rem;">
          
          <!-- Chart 1: Website Traffic Trend -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">Website Traffic Trend</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="portalTrafficChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              📈 Traffic: <strong>452K views avg</strong>. Highly optimized rollout trends.
            </div>
          </div>

          <!-- Chart 2: User Engagement -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">User Engagement</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="portalEngagementChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              🎯 Active: <strong>1,420 logins</strong>. Customer retention index remains high (92%).
            </div>
          </div>

          <!-- Chart 3: Booking Conversion -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">Booking Conversion</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="portalBookingChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              ✅ Conversion: <strong>94.2%</strong>. Service Booking conversions stabilized MoM.
            </div>
          </div>

          <!-- Chart 4: Page Performance -->
          <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
            <strong style="font-size: 0.78rem; color: var(--text-primary);">Page Performance</strong>
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="portalLatencyChart"></canvas>
            </div>
            <div style="font-size: 0.68rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.3;">
              ⚡ Latency: <strong>1.2s page load</strong>. VirtDOM optimization verified.
            </div>
          </div>

        </div>
      </div>

      <!-- SECTION 6 & 8: REPORTS & API GATEWAY -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 6: Reports -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-file-pdf"></i> Executive Web Portal Reports Registry</span>
              <span class="card-subtitle">Configure schedules and download comparative periods datasets</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 6px; padding: 1.25rem; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">&bull; Website Performance Report (Daily Schedule)</div>
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">&bull; Customer Activity Report (Weekly Schedule)</div>
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">&bull; Service Booking Report (Monthly Schedule)</div>
            <div style="margin-top: 10px; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Exporting portal usage reports...')">Export Report</button>
              <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Portal reports comparison enabled.')">Compare Previous Period</button>
            </div>
          </div>
        </div>

        <!-- Section 8: API Gateway -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-shield-halved"></i> Customer Portal API Gateway status</span>
              <span class="card-subtitle">Successful response metrics, failure rates and rate limits</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px; padding: 1.25rem; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; background-color: var(--bg-app); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <div>Success Rate: <strong style="color: var(--color-green);">${data.apiGateway.authSuccess}</strong></div>
              <div>Uptime availability: <strong style="color: var(--color-green);">${data.apiGateway.availability}</strong></div>
              <div>Requests: <strong>${data.apiGateway.success} total</strong></div>
              <div>Failed: <strong style="color: var(--color-green);">${data.apiGateway.failed} fails</strong></div>
            </div>

            <div style="margin-top: 6px; display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('api-management')">Open API Management</button>
              <button class="btn btn-outline btn-sm" onclick="alert('API: Fetching active logs...')">View API Logs</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 10: AI WEB PLATFORM INSIGHTS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Web Platform Intelligence Insights</span>
            <span class="card-subtitle">Executive recommendations, customer observations and suggested business decisions</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.insights.map(i => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> AI Observation: ${i.obs}</strong>
                <span class="badge badge-${i.riskLevel === 'Medium' ? 'warning' : 'success'}" style="font-size: 0.62rem;">Risk: ${i.riskLevel || 'None'}</span>
              </div>
              <div style="color: var(--text-secondary);"><strong>Target Users:</strong> ${i.users}</div>
              <div style="color: var(--text-secondary);"><strong>Business Impact:</strong> ${i.impact}</div>
              <div style="color: var(--text-secondary);"><strong>Recommendation:</strong> ${i.rec}</div>
              <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                <button class="btn btn-outline btn-xs" onclick="alert('AI EXECUTIVE ACTION DISPATCHED: ${i.action}')">${i.action}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 11: CONNECTED MODULE ECOSYSTEM -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes"></i> EVcare.AI Web Portal Integration architecture</span>
            <span class="card-subtitle">Ecosystem synchronization logs and data telemetry pipeline loops</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 8px;">
          <div class="ecosystem-flow-container">
            ${data.architecture.map(arc => `
              <div class="web-eco-row" onclick="window.switchRoute('${arc.route}')">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); width: 250px;">
                  <i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> ${arc.name}
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px; font-size: 0.7rem; color: var(--text-secondary);">
                  <div>Consumes: <strong style="color: var(--text-muted);">${arc.consumes}</strong></div>
                  <div>Produces: <strong style="color: var(--text-muted);">${arc.produces}</strong></div>
                </div>
                <div style="display: flex; gap: 24px; color: var(--text-secondary); font-size: 0.72rem; align-items: center;">
                  <span>Health: <strong style="color: var(--color-green);">● ${arc.health}</strong></span>
                  <span>Sync: <strong>${arc.sync}</strong></span>
                  <div style="text-decoration: underline; color: var(--color-blue); font-size: 0.7rem;">Go &rarr;</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Initialize Chart.js analytics graphs
    if (window.portalCharts && typeof window.portalCharts.initWebPortalCharts === 'function') {
      if (window.portalCharts && typeof window.portalCharts.initWebPortalCharts === 'function') { window.portalCharts.initWebPortalCharts(); }
    }
  }

  // PORTAL DETAIL DRAWER
  function openWebPortalDrawer(serviceId) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">Portal Service details</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Service Scope: ${serviceId}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Overview & Stats -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Usage Statistics</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Page load metric: <strong style="color: var(--color-green);">1.2s</strong></div>
            <div>Average session duration: <strong>18m 45s</strong></div>
            <div>Logins today: <strong>1,420 users</strong></div>
          </div>
        </div>

        <!-- Section 2: API connections & issues -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">API Connections Status</strong>
          <div style="display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>In-App Telemetry Stream API</span>
              <strong style="color: var(--color-green);">Optimal (100%)</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>Auth API gateway response</span>
              <strong style="color: var(--color-green);">Optimal (115ms)</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Booking Service API connections</span>
              <strong style="color: var(--color-green);">Optimal (100%)</strong>
            </div>
          </div>
        </div>

        <!-- Section 3: CTO Action Decisions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Recommended CTO Decision</strong>
          <p style="color: var(--text-secondary); margin-top: 2px; line-height: 1.3;">
            Lock current stable layout configurations and scale API clusters partition counts prior to corporate booking sprints.
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('UI: portal UI updated successfully.')">Update UI</button>
            <button class="btn btn-outline" onclick="alert('CMS: published Content changes successfully.')">Publish Changes</button>
            <button class="btn btn-outline" onclick="alert('API: API gateway configurators dispatched.')">Configure APIs</button>
            <button class="btn btn-outline" onclick="window.switchRoute('api-management'); closeDrawer();">Open API Management</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  // Expose methods globally for integration hooks
  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;
  window.renderEVcareAIDashboardModule = renderEVcareAIDashboardModule;
  window.renderAIDiagnosticsModule = renderAIDiagnosticsModule;
  window.openAIDiagnosticDrawer = openAIDiagnosticDrawer;
  window.renderMobileAppManagementModule = renderMobileAppManagementModule;
  window.openMobileAppDrawer = openMobileAppDrawer;
  window.renderWebPortalManagementModule = renderWebPortalManagementModule;
  window.openWebPortalDrawer = openWebPortalDrawer;

  // ==========================================================
  // AI MODELS MODULE - MLOPS COMMAND CENTER
  // ==========================================================
  
  function renderAIModelsModule() {
    const data = window.portalData.aiModels;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR AI MODELS -->
      <style>
        .models-workflow-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }
        .models-workflow-node {
          flex: 1;
          min-width: 140px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 12px;
          text-align: center;
        }
        .models-workflow-arrow {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .models-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .models-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .models-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .models-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .models-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .models-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .models-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Hover Insight Overlays */
        .models-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .models-kpi-card:hover .models-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .models-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Ecosystem components row */
        .models-eco-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .models-eco-row:hover {
          background-color: rgba(0, 122, 255, 0.04);
        }
      </style>

      <!-- PAGE HEADER TOOLBAR ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('TRAIN: Commencing model training scheduler...')"><i class="fa-solid fa-play"></i> Train Model</button>
          <button class="btn btn-outline btn-sm" onclick="alert('VALIDATE: Loading validation pipeline logs...')"><i class="fa-solid fa-magnifying-glass"></i> Validate Model</button>
          <button class="btn btn-outline btn-sm" onclick="alert('DEPLOY: Deploying selected model to staging/prod environments...')"><i class="fa-solid fa-cloud-arrow-up"></i> Deploy Model</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('MLOPS: Initiating rollback to previous stable model...')"><i class="fa-solid fa-rotate-left"></i> Rollback Model</button>
          <button class="btn btn-outline btn-sm" onclick="alert('MLOPS: Selected model archived.')"><i class="fa-solid fa-box-archive"></i> Archive Model</button>
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Exporting MLOps model evaluations PDF...')"><i class="fa-solid fa-file-pdf"></i> Export Model Report</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Constructing training drift summary reports...')"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Summary</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="modelSearchInput" placeholder="Search registered models, experiments, validation accuracy, environments..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Type: All</option>
            <option value="LSTM">LSTM</option>
            <option value="XGBoost">XGBoost</option>
            <option value="CNN">CNN</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Status: All</option>
            <option value="Production">Production</option>
            <option value="Retraining">Retraining Required</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Environment: All</option>
            <option value="Production">Production</option>
            <option value="Staging">Staging</option>
          </select>
        </div>
      </div>

      <!-- VISUAL WORKFLOW REPRESENTATION -->
      <div class="models-workflow-container">
        ${data.workflow.map((w, idx) => `
          <div class="models-workflow-node">
            <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Stage ${idx+1}</span>
            <strong style="display: block; font-size: 0.78rem; color: var(--text-primary); margin-top: 2px;">${w.stage}</strong>
            <div style="font-size: 0.68rem; color: var(--color-green); margin-top: 4px; font-weight: 700;">● ${w.status}</div>
            <div style="font-size: 0.65rem; color: var(--text-secondary); margin-top: 2px;">Rate: ${w.successRate}</div>
            <div style="font-size: 0.62rem; color: var(--text-muted);">Owner: ${w.owner}</div>
          </div>
          ${idx < data.workflow.length - 1 ? `<div class="models-workflow-arrow"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
        `).join('')}
      </div>

      <!-- SECTION 1: MODEL OVERVIEW KPIs -->
      <div class="models-kpi-grid">
        ${data.kpis.map(k => `
          <div class="models-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="models-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="models-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span class="badge badge-${k.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.62rem;">
                ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action.split(' ')[0]} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `Model registry checkpoint running at ${k.value}.`, businessImpact: k.businessImpact || "Ensures high prediction confidence across fleet APIs.", aiRecommendation: k.aiRecommendation || "Promote XGBoost v109.2 to production.", recommendedAction: "Manage AI Models", relatedModule: "AI Models"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2 & 3: MODEL REGISTRY & EXPERIMENTS -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 2: Model Registry -->
        <div class="card col-8">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-database"></i> Registered Model Registry</span>
              <span class="card-subtitle">Active execution weights and component accuracies</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.registry.map(r => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--text-primary); font-size: 0.82rem;">${r.name} (${r.version})</strong>
                  <span class="badge badge-${r.status === 'Production' ? 'success' : 'warning'}" style="font-size: 0.62rem;">${r.status}</span>
                </div>
                <div style="color: var(--text-secondary); display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; margin-top: 4px;">
                  <div>Type: <strong>${r.type}</strong></div>
                  <div>Accuracy Score: <strong>${r.accuracy}</strong></div>
                  <div>F1 Score / Precision: <strong>${r.f1} / ${r.precision}</strong></div>
                  <div>Updated: <strong>${r.updated}</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="window.openAIModelDrawer('${r.name}')">View Details</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('DEPLOY: Dispatched deployment rollout to Staging cluster.')">Deploy</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('ARCHIVE: Model state moved to archived.')">Archive</button>
                  <button class="btn btn-outline btn-xs" onclick="window.switchRoute('ai-diagnostics')">Diagnostics &rarr;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
 
        <!-- Section 3: Model Experiments -->
        <div class="card col-4">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-flask"></i> Recent ML Training Experiments</span>
              <span class="card-subtitle">Active convergence and validation evaluations</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.experiments.map(e => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <strong style="color: var(--text-primary); display: block; font-size: 0.8rem; margin-bottom: 4px;">${e.name}</strong>
                <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
                  <div>Dataset: <strong>${e.dataset}</strong></div>
                  <div>Accuracy / Validation: <strong style="color: var(--color-green);">${e.accuracy} / ${e.validation}</strong></div>
                  <div>Comparison: <strong style="color: var(--color-blue);">${e.comparison}</strong></div>
                  <div>Owner / Date: <strong>${e.owner} (${e.date})</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" onclick="alert('MLOPS: Promoting experiment model to Validation phase...')">Promote to Validation</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 4: MODEL DEPLOYMENT -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-cloud-arrow-up"></i> MLOps Deployment Pipeline Command Center</span>
            <span class="card-subtitle">Dev, Staging, and Production rollout checkpoints</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.deployment.map(dep => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.8rem; color: var(--text-primary);">${dep.stage} Stage</strong>
                <span class="badge badge-success" style="font-size: 0.62rem;">${dep.health}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px; margin-top: 4px;">
                <div>Active Model: <strong>${dep.models}</strong></div>
                <div>Status: <strong>${dep.status}</strong></div>
                <div>Release Time: <strong>${dep.time}</strong></div>
                <div>Rollback: <strong style="color: var(--color-green);">${dep.rollback}</strong></div>
              </div>
              <div style="margin-top: 8px; display: flex; gap: 4px;">
                <button class="btn btn-primary btn-xs" onclick="alert('DEPLOY: Deploying selected model...')">Deploy</button>
                <button class="btn btn-outline btn-xs" onclick="alert('DEPLOY: Paused deployment rollout.')">Pause</button>
                <button class="btn btn-outline btn-xs" onclick="alert('DEPLOY: Triggered 1-Click Rollback.')">Rollback</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 5 & 6: MODEL EVALUATION & MONITORING -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 5: Model Evaluation -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-chart-pie"></i> Model Evaluation Metrics</span>
              <span class="card-subtitle">ROC-AUC thresholds, prediction drifts and F1 ratios</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>ROC-AUC: <strong style="color: var(--color-green);">${data.evaluation.rocAuc}</strong></span>
              <span>Quality Score: <strong style="color: var(--color-green);">${data.evaluation.quality}</strong></span>
            </div>
            
            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
              <div>⚡ <strong>Accuracy Index:</strong> ${data.evaluation.accuracy}</div>
              <div>⚡ <strong>Precision Index:</strong> ${data.evaluation.precision}</div>
              <div>⚡ <strong>Recall Index:</strong> ${data.evaluation.recall}</div>
              <div style="border-top: 1px solid var(--border-color); padding-top: 6px; color: var(--color-orange); font-weight: 700;">
                ⚠ Prediction Drift: ${data.evaluation.drift}
              </div>
            </div>

            <!-- Premium charts canvas container -->
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="modelEvaluationChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 6: Model Monitoring -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-server"></i> Inference Performance & Compute Monitoring</span>
              <span class="card-subtitle">GPU/CPU utilities, inference requests and error rates</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; color: var(--text-secondary);">
              <div>Requests today: <strong>${data.monitoring.requests}</strong></div>
              <div>Avg Latency: <strong style="color: var(--color-green);">${data.monitoring.avgTime}</strong></div>
              <div>GPU Usage: <strong style="color: var(--color-green);">${data.monitoring.gpu}</strong></div>
              <div>CPU Usage: <strong style="color: var(--color-green);">${data.monitoring.cpu}</strong></div>
              <div>Memory Utilization: <strong style="color: var(--color-green);">${data.monitoring.memory}</strong></div>
              <div>Availability: <strong style="color: var(--color-green);">${data.monitoring.availability}</strong></div>
            </div>

            <div style="margin-top: 6px; display: flex; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="alert('MLOPS: Dispatched container scaling checks.')">Scale Model</button>
              <button class="btn btn-outline btn-sm" onclick="alert('SYSTEM: Dispatched inferences service restart...')">Restart Service</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 8: AI MODEL INSIGHTS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Model Operations MLOps Insights</span>
            <span class="card-subtitle">Executive logs observations, concept drifts risks, and suggested retrain loops</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.insights.map(i => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> AI Observation: ${i.obs}</strong>
                <span class="badge badge-${i.riskLevel === 'Medium' ? 'warning' : 'success'}" style="font-size: 0.62rem;">Risk: ${i.riskLevel || 'None'}</span>
              </div>
              <div style="color: var(--text-secondary);"><strong>Business Impact:</strong> ${i.impact}</div>
              <div style="color: var(--text-secondary);"><strong>Recommendation:</strong> ${i.rec}</div>
              <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                <button class="btn btn-outline btn-xs" onclick="alert('AI EXECUTIVE ACTION DISPATCHED: ${i.action}')">${i.action}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 9: CONNECTED MODULE ECOSYSTEM -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes"></i> MLOps Architecture Connected Ecosystem Map</span>
            <span class="card-subtitle">Ecosystem sync times, data schemas consumed, and quick modules links</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 8px;">
          <div class="ecosystem-flow-container">
            ${data.architecture.map(arc => `
              <div class="models-eco-row" onclick="window.switchRoute('${arc.route}')">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); width: 250px;">
                  <i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> ${arc.name}
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px; font-size: 0.7rem; color: var(--text-secondary);">
                  <div>Consumes: <strong style="color: var(--text-muted);">${arc.consumes}</strong></div>
                  <div>Produces: <strong style="color: var(--text-muted);">${arc.produces}</strong></div>
                </div>
                <div style="display: flex; gap: 24px; color: var(--text-secondary); font-size: 0.72rem; align-items: center;">
                  <span>Health: <strong style="color: var(--color-green);">● ${arc.health}</strong></span>
                  <span>Sync: <strong>${arc.sync}</strong></span>
                  <div style="text-decoration: underline; color: var(--color-blue); font-size: 0.7rem;">Go &rarr;</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Initialize Chart.js analytics graphs
    if (window.portalCharts && typeof window.portalCharts.initAIModelCharts === 'function') {
      if (window.portalCharts && typeof window.portalCharts.initAIModelCharts === 'function') { window.portalCharts.initAIModelCharts(); }
    }
  }

  // MODEL DETAIL DRAWER
  function openAIModelDrawer(modelName) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">Model Build Details</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Model Scope: ${modelName}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Model Overview -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Model Information</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Accuracy index: <strong style="color: var(--color-green);">99.1%</strong></div>
            <div>Inferences today: <strong>12.5M inferences</strong></div>
            <div>Deployment Status: <strong style="color: var(--color-green);">Deployed (Production)</strong></div>
          </div>
        </div>

        <!-- Section 2: Evaluation Metrics -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Evaluation & Training Summary</strong>
          <div style="display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>Precision index</span>
              <strong>98.9%</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>Recall score</span>
              <strong>99.2%</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>F1 validation Score</span>
              <strong>99.0%</strong>
            </div>
          </div>
        </div>

        <!-- Section 3: Compute & Latency Metrics -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Compute Monitoring Summary</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
            <div>Inference Latency: <strong style="color: var(--color-green);">12ms</strong></div>
            <div>GPU resources used: <strong>64%</strong></div>
            <div>Model availability SLA: <strong style="color: var(--color-green);">99.98%</strong></div>
          </div>
        </div>

        <!-- Section 4: CTO Action Decisions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Recommended CTO Decision</strong>
          <p style="color: var(--text-secondary); margin-top: 2px; line-height: 1.3;">
            Lock current stable production LSTM baseline weights. Push incremental validation experiments to Staging clusters for comparison checks.
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('DEPLOY: Approved model weights deployment.')">Deploy Model</button>
            <button class="btn btn-outline" onclick="alert('ROLLBACK: Rollback completed successfully.')">Rollback Model</button>
            <button class="btn btn-outline" onclick="alert('ARCHIVE: Selected model archived.')">Archive Model</button>
            <button class="btn btn-outline" onclick="window.switchRoute('ai-diagnostics'); closeDrawer();">View Diagnostics</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  // Expose methods globally for integration hooks
  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;
  window.renderEVcareAIDashboardModule = renderEVcareAIDashboardModule;
  window.renderAIDiagnosticsModule = renderAIDiagnosticsModule;
  window.openAIDiagnosticDrawer = openAIDiagnosticDrawer;
  window.renderMobileAppManagementModule = renderMobileAppManagementModule;
  window.openMobileAppDrawer = openMobileAppDrawer;
  window.renderWebPortalManagementModule = renderWebPortalManagementModule;
  window.openWebPortalDrawer = openWebPortalDrawer;
  window.renderAIModelsModule = renderAIModelsModule;
  window.openAIModelDrawer = openAIModelDrawer;

  // ==========================================================
  // MACHINE LEARNING PLATFORM MODULE - MLOPS PIPELINE CENTER
  // ==========================================================
  
  function renderMachineLearningPlatformModule() {
    const data = window.portalData.machineLearningPlatform;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR MACHINE LEARNING PLATFORM -->
      <style>
        .ml-workflow-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
          margin-bottom: 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }
        .ml-workflow-node {
          flex: 1;
          min-width: 120px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 8px;
          text-align: center;
        }
        .ml-workflow-arrow {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        .ml-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .ml-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .ml-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .ml-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .ml-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .ml-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .ml-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Hover Insight Overlays */
        .ml-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .ml-kpi-card:hover .ml-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .ml-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Ecosystem components row */
        .ml-eco-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .ml-eco-row:hover {
          background-color: rgba(0, 122, 255, 0.04);
        }
      </style>

      <!-- PAGE HEADER TOOLBAR ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('IMPORT: Importing raw telemetry dataset from Data Lake...')"><i class="fa-solid fa-file-import"></i> Import Dataset</button>
          <button class="btn btn-outline btn-sm" onclick="alert('SCHEDULE: Training job scheduled for 18:00...')"><i class="fa-solid fa-calendar-plus"></i> Schedule Training</button>
          <button class="btn btn-outline btn-sm" onclick="alert('RETRAIN: Initiating model retraining pipeline...')"><i class="fa-solid fa-rotate-right"></i> Retrain Models</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('CLEAN: Running automated feature store cleaning & missing data imputation...')"><i class="fa-solid fa-broom"></i> Clean Data</button>
          <button class="btn btn-outline btn-sm" onclick="alert('DRIFT: Triggering drift monitoring scan across production models...')"><i class="fa-solid fa-chart-line"></i> Monitor Drift</button>
          <button class="btn btn-outline btn-sm" onclick="alert('REPORTS: Exporting ML Platform operational summary PDF...')"><i class="fa-solid fa-file-pdf"></i> Export ML Report</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Constructing ML pipeline intelligence summary...')"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Summary</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="mlSearchInput" placeholder="Search datasets, feature groups, training jobs, drift metrics, GPU clusters..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Dataset: All</option>
            <option value="Battery">Battery Telemetry</option>
            <option value="Motor">Motor Vibration</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Training Status: All</option>
            <option value="Running">Running</option>
            <option value="Completed">Completed</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">GPU Cluster: All</option>
            <option value="Cluster1">GPU Cluster #1</option>
            <option value="Cluster2">GPU Cluster #2</option>
          </select>
        </div>
      </div>

      <!-- VISUAL WORKFLOW REPRESENTATION -->
      <div class="ml-workflow-container">
        ${data.workflow.map((w, idx) => `
          <div class="ml-workflow-node">
            <span style="font-size: 0.62rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Stage ${idx+1}</span>
            <strong style="display: block; font-size: 0.75rem; color: var(--text-primary); margin-top: 2px;">${w.stage}</strong>
            <div style="font-size: 0.66rem; color: var(--color-${w.health === 'Healthy' ? 'green' : 'orange'}); margin-top: 3px; font-weight: 700;">● ${w.status}</div>
            <div style="font-size: 0.62rem; color: var(--text-secondary); margin-top: 1px;">Rate: ${w.successRate}</div>
            <div style="font-size: 0.60rem; color: var(--text-muted);">Time: ${w.time}</div>
          </div>
          ${idx < data.workflow.length - 1 ? `<div class="ml-workflow-arrow"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
        `).join('')}
      </div>

      <!-- SECTION 1: ML PLATFORM OVERVIEW KPIs -->
      <div class="ml-kpi-grid">
        ${data.kpis.map(k => `
          <div class="ml-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="ml-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="ml-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span class="badge badge-${k.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.62rem;">
                ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action.split(' ')[0]} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `MLOps inference pipeline running at ${k.value}.`, businessImpact: k.businessImpact || "Sustains enterprise model inference volume.", aiRecommendation: k.aiRecommendation || "Scale GPU cluster for peak afternoon load.", recommendedAction: "Inspect ML Platform", relatedModule: "Machine Learning Platform"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 2 & 3: DATASET MANAGEMENT & FEATURE STORE -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 2: Dataset Management -->
        <div class="card col-8">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-database"></i> Training Dataset Workspace</span>
              <span class="card-subtitle">Source data ingestion streams, volume metrics and quality validation scores</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.datasets.map(ds => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--text-primary); font-size: 0.82rem;">${ds.name}</strong>
                  <span class="badge badge-${ds.status === 'Production' ? 'success' : 'warning'}" style="font-size: 0.62rem;">${ds.status}</span>
                </div>
                <div style="color: var(--text-secondary); display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; margin-top: 4px;">
                  <div>Source: <strong>${ds.source}</strong></div>
                  <div>Size / Rows: <strong>${ds.size} (${ds.records})</strong></div>
                  <div>Quality Score: <strong style="color: var(--color-green);">${ds.quality}</strong></div>
                  <div>Missing Data / Updated: <strong>${ds.missing} (${ds.updated})</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="window.openMLPipelineDrawer('${ds.name}')">View Dataset</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('VALIDATE: Dataset schema validation passed.')">Validate</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('CLEAN: Data cleaning & imputation completed.')">Clean Data</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('RETRAIN: Scheduled retraining with this dataset.')">Retrain Models</button>
                  <button class="btn btn-outline btn-xs" onclick="window.switchRoute('telemetry-platform')">Telemetry &rarr;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 3: Feature Store -->
        <div class="card col-4">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-cubes"></i> Centralized Feature Store</span>
              <span class="card-subtitle">Feature groups, feature importance and quality indicators</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem; font-size: 0.75rem; color: var(--text-secondary);">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-sm);">
              <div>Freshness: <strong style="color: var(--color-green);">${data.featureStore.freshness}</strong></div>
              <div>Quality Score: <strong style="color: var(--color-green);">${data.featureStore.qualityScore}</strong></div>
              <div>Usage: <strong>${data.featureStore.activeUsage}</strong></div>
            </div>

            <div>
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Top Feature Importance:</strong>
              ${data.featureStore.importance.map(imp => `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding: 2px 0;">
                  <span style="font-family: var(--font-mono); font-size: 0.7rem;">${imp.name}</span>
                  <strong style="color: var(--color-blue);">${(imp.score * 100).toFixed(0)}%</strong>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 6px; display: flex; gap: 4px;">
              <button class="btn btn-outline btn-xs" onclick="alert('FEATURE: Opening feature details inspector...')">View Feature</button>
              <button class="btn btn-outline btn-xs" onclick="alert('FEATURE: Updating feature scaling parameters...')">Update Feature</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 4: TRAINING JOBS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-gears"></i> Model Training Command Center</span>
            <span class="card-subtitle">Active convergence, GPU utilization and validation progress</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.trainingJobs.map(job => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.8rem; color: var(--text-primary);">${job.name}</strong>
                <span class="badge badge-success" style="font-size: 0.62rem;">${job.status}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px; margin-top: 4px;">
                <div>Dataset: <strong>${job.dataset}</strong></div>
                <div>Progress: <strong style="color: var(--color-blue);">${job.progress}</strong> (${job.estCompletion})</div>
                <div>GPU / Accuracy: <strong>${job.gpu} / ${job.accuracy}</strong></div>
                <div>Duration: <strong>${job.duration}</strong></div>
              </div>
              <div style="margin-top: 8px; display: flex; gap: 4px;">
                <button class="btn btn-outline btn-xs" onclick="alert('TRAINING: Paused job ${job.name}')">Pause</button>
                <button class="btn btn-outline btn-xs" onclick="alert('TRAINING: Resumed job ${job.name}')">Resume</button>
                <button class="btn btn-outline btn-xs" onclick="alert('TRAINING: Canceled job ${job.name}')">Cancel</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 5 & 6: MODEL VALIDATION & MONITORING -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 5: Model Validation -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-vial"></i> Model Validation & Stability Summary</span>
              <span class="card-subtitle">Cross-validation scores, ROC-AUC, and precision metrics</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>Cross Validation Score: <strong style="color: var(--color-green);">${data.validation.crossVal}</strong></span>
              <span>Stability: <strong style="color: var(--color-green);">${data.validation.stability}</strong></span>
            </div>
            
            <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
              <div>⚡ <strong>Accuracy Index:</strong> ${data.validation.accuracy}</div>
              <div>⚡ <strong>Precision / Recall:</strong> ${data.validation.precision} / ${data.validation.recall}</div>
              <div>⚡ <strong>F1 Score / ROC-AUC:</strong> ${data.validation.f1} / ${data.validation.rocAuc}</div>
              <div style="border-top: 1px solid var(--border-color); padding-top: 4px; color: var(--color-green); font-weight: 700;">
                ✓ Status: ${data.validation.status}
              </div>
            </div>

            <!-- Canvas for validation chart -->
            <div style="height: 120px; position: relative; margin-top: 4px;">
              <canvas id="mlValidationChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Section 6: Model Monitoring & Drift -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-chart-line"></i> Production Drift & Compute Monitoring</span>
              <span class="card-subtitle">Data drift, concept drift, and compute queues</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem;">
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-md); font-size: 0.78rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; color: var(--text-secondary);">
              <div>Prediction Drift: <strong>${data.monitoring.predictionDrift}</strong></div>
              <div>Data Drift: <strong>${data.monitoring.dataDrift}</strong></div>
              <div>Feature Drift: <strong>${data.monitoring.featureDrift}</strong></div>
              <div>Concept Drift: <strong style="color: var(--color-orange);">${data.monitoring.conceptDrift}</strong></div>
              <div>GPU Utilization: <strong style="color: var(--color-green);">${data.monitoring.gpuUtil}</strong></div>
              <div>Training Queue: <strong>${data.monitoring.trainingQueue}</strong></div>
            </div>

            <div style="font-size: 0.72rem; color: var(--text-secondary); background-color: rgba(255, 149, 0, 0.05); border-left: 3px solid var(--color-orange); padding: 8px 10px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
              💡 <strong>Recommendation:</strong> ${data.monitoring.recommendation}
            </div>

            <div style="margin-top: 4px; display: flex; gap: 8px;">
              <button class="btn btn-primary btn-sm" onclick="alert('DRIFT: Initiating drift scanning routine...')">Monitor Drift</button>
              <button class="btn btn-outline btn-sm" onclick="alert('RETRAIN: Scheduled automated retraining pipeline...')">Schedule Retraining</button>
              <button class="btn btn-outline btn-sm" onclick="window.switchRoute('ai-models')">Open AI Models &rarr;</button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 8: AI ML INSIGHTS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> Machine Learning Platform Executive Insights</span>
            <span class="card-subtitle">Automated dataset observations, feature drift detections, and compute suggestions</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.insights.map(i => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> AI Observation: ${i.obs}</strong>
                <span class="badge badge-${i.riskLevel === 'Medium' ? 'warning' : 'success'}" style="font-size: 0.62rem;">Risk: ${i.riskLevel || 'None'}</span>
              </div>
              <div style="color: var(--text-secondary);"><strong>Business Impact:</strong> ${i.impact}</div>
              <div style="color: var(--text-secondary);"><strong>Affected Models / Confidence:</strong> ${i.models} (${i.confidence})</div>
              <div style="color: var(--text-secondary);"><strong>Recommendation:</strong> ${i.rec}</div>
              <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                <button class="btn btn-outline btn-xs" onclick="alert('AI EXECUTIVE ACTION DISPATCHED: ${i.action}')">${i.action}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 9: CONNECTED ML ECOSYSTEM -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes"></i> Enterprise ML Platform Integration Architecture</span>
            <span class="card-subtitle">End-to-end data & training pipeline sync statuses</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 8px;">
          <div class="ecosystem-flow-container">
            ${data.architecture.map(arc => `
              <div class="ml-eco-row" onclick="window.switchRoute('${arc.route}')">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); width: 250px;">
                  <i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> ${arc.name}
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px; font-size: 0.7rem; color: var(--text-secondary);">
                  <div>Consumes: <strong style="color: var(--text-muted);">${arc.consumes}</strong></div>
                  <div>Produces: <strong style="color: var(--text-muted);">${arc.produces}</strong></div>
                </div>
                <div style="display: flex; gap: 24px; color: var(--text-secondary); font-size: 0.72rem; align-items: center;">
                  <span>Health: <strong style="color: var(--color-green);">● ${arc.health}</strong></span>
                  <span>Sync: <strong>${arc.sync}</strong></span>
                  <div style="text-decoration: underline; color: var(--color-blue); font-size: 0.7rem;">Go &rarr;</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Initialize Chart.js analytics graphs
    if (window.portalCharts && typeof window.portalCharts.initMLPlatformCharts === 'function') {
      if (window.portalCharts && typeof window.portalCharts.initMLPlatformCharts === 'function') { window.portalCharts.initMLPlatformCharts(); }
    }
  }

  // ML PIPELINE DETAIL DRAWER
  function openMLPipelineDrawer(name) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">ML Pipeline Details</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Target: ${name}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Overview -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Dataset & Training Summary</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Quality Score: <strong style="color: var(--color-green);">99.8%</strong></div>
            <div>Active Records: <strong>14.2M rows (18.4 GB)</strong></div>
            <div>Pipeline Health: <strong style="color: var(--color-green);">Optimal</strong></div>
          </div>
        </div>

        <!-- Section 2: Resource Utilization -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Resource Utilization</strong>
          <div style="display: flex; flex-direction: column; gap: 4px; color: var(--text-secondary);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>GPU Utilization</span>
              <strong>64%</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 2px;">
              <span>CPU Load</span>
              <strong>42%</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Feature Cache Memory</span>
              <strong>58% (1.2 TB)</strong>
            </div>
          </div>
        </div>

        <!-- Section 3: CTO Decision -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Recommended CTO Decision</strong>
          <p style="color: var(--text-secondary); margin-top: 2px; line-height: 1.3;">
            Approve automated retraining pipeline execution for Motor prediction models to mitigate 1.8% concept drift on Jio fleet streams.
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('SCHEDULE: Scheduled retraining pipeline.')">Schedule Training</button>
            <button class="btn btn-outline" onclick="alert('RETRAIN: Retraining initiated.')">Retrain Models</button>
            <button class="btn btn-outline" onclick="alert('APPROVE: Pipeline approved.')">Approve Pipeline</button>
            <button class="btn btn-outline" onclick="window.switchRoute('ai-models'); closeDrawer();">Open AI Models</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  // Expose methods globally for integration hooks
  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;
  window.renderEVcareAIDashboardModule = renderEVcareAIDashboardModule;
  window.renderAIDiagnosticsModule = renderAIDiagnosticsModule;
  window.openAIDiagnosticDrawer = openAIDiagnosticDrawer;
  window.renderMobileAppManagementModule = renderMobileAppManagementModule;
  window.openMobileAppDrawer = openMobileAppDrawer;
  window.renderWebPortalManagementModule = renderWebPortalManagementModule;
  window.openWebPortalDrawer = openWebPortalDrawer;
  window.renderAIModelsModule = renderAIModelsModule;
  window.openAIModelDrawer = openAIModelDrawer;
  window.renderMachineLearningPlatformModule = renderMachineLearningPlatformModule;
  window.openMLPipelineDrawer = openMLPipelineDrawer;

  // ==========================================================
  // NOTIFICATIONS MODULE - EXECUTIVE DECISION & COMMS CENTER
  // ==========================================================
  
  function renderNotificationsModule() {
    const data = window.portalData.notificationsCenter;
    
    viewSubpage.innerHTML = `
      <!-- CSS STYLES FOR NOTIFICATIONS DECISION CENTER -->
      <style>
        .notif-workflow-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 6px;
          margin-bottom: 1.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          overflow-x: auto;
        }
        .notif-workflow-node {
          flex: 1;
          min-width: 120px;
          background-color: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px 8px;
          text-align: center;
        }
        .notif-workflow-arrow {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        .notif-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 900px) {
          .notif-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .notif-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
        .notif-kpi-card {
          position: relative;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          cursor: pointer;
        }
        .notif-kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .notif-kpi-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .notif-kpi-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        /* Hover Insight Overlays */
        .notif-kpi-info-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.25s ease, opacity 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }
        .notif-kpi-card:hover .notif-kpi-info-wrapper {
          max-height: 180px;
          opacity: 1;
          margin-top: 10px;
        }
        .notif-kpi-info-box {
          background-color: rgba(0, 122, 255, 0.04);
          border-left: 3px solid var(--color-blue);
          padding: 8px 10px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.72rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .notif-timeline-item {
          display: flex;
          gap: 12px;
          padding-bottom: 12px;
          position: relative;
        }
        .notif-timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 38px;
          top: 24px;
          bottom: 0;
          width: 2px;
          background-color: var(--border-color);
        }
        .notif-timeline-time {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-blue);
          min-width: 45px;
          padding-top: 2px;
        }
        .notif-timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--color-blue);
          margin-top: 4px;
          flex-shrink: 0;
        }

        .notif-eco-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-app);
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        .notif-eco-row:hover {
          background-color: rgba(0, 122, 255, 0.04);
        }
      </style>

      <!-- PAGE HEADER TOOLBAR ACTIONS -->
      <div style="background-color: var(--bg-surface); padding: 1rem 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 1.25rem;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="alert('ANNOUNCEMENT: Opening executive announcement composer...')"><i class="fa-solid fa-bullhorn"></i> Create Announcement</button>
          <button class="btn btn-outline btn-sm" onclick="alert('BROADCAST: Dispatched enterprise emergency broadcast dialog...')"><i class="fa-solid fa-tower-cell"></i> Send Broadcast</button>
          <button class="btn btn-outline btn-sm" onclick="alert('ALERT: Creating executive high-priority alert trigger...')"><i class="fa-solid fa-bell-concierge"></i> Create Executive Alert</button>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="alert('EXPORT: Exporting executive notifications audit PDF...')"><i class="fa-solid fa-file-pdf"></i> Export Notifications</button>
          <button class="btn btn-outline btn-sm" onclick="alert('RULES: Opening notification escalation rules config...')"><i class="fa-solid fa-sliders"></i> Notification Rules</button>
          <button class="btn btn-outline btn-sm" onclick="alert('AI: Generating executive communications summary report...')"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Summary</button>
        </div>
      </div>

      <!-- SEARCH AND FILTERS BAR -->
      <div class="filter-toolbar" style="padding: 10px 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: var(--bg-surface); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div class="filter-group" style="width: 100%; display: flex; flex-wrap: wrap; gap: 10px;">
          <div class="search-control" style="flex-grow: 1; min-width: 240px; position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);"></i>
            <input type="text" id="notifSearchInput" placeholder="Search executive alerts, approvals, announcements, timeline events, assigned teams..." style="width: 100%; padding: 8px 12px 8px 30px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
          </div>
          
          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Priority: All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Category: All</option>
            <option value="Critical Attention">Critical Attention</option>
            <option value="Requires Decision">Requires Decision</option>
            <option value="Pending Approval">Pending Approval</option>
          </select>

          <select class="select-control" style="padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background-color: var(--bg-app); font-size: 0.82rem; color: var(--text-primary);">
            <option value="all">Module: All</option>
            <option value="Cloud Infrastructure">Cloud Infrastructure</option>
            <option value="AI Models">AI Models</option>
            <option value="Mobile App">Mobile App Management</option>
          </select>
        </div>
      </div>

      <!-- VISUAL WORKFLOW REPRESENTATION -->
      <div class="notif-workflow-container">
        ${data.workflow.map((w, idx) => `
          <div class="notif-workflow-node">
            <span style="font-size: 0.62rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Stage ${idx+1}</span>
            <strong style="display: block; font-size: 0.75rem; color: var(--text-primary); margin-top: 2px;">${w.stage}</strong>
            <div style="font-size: 0.66rem; color: var(--color-green); margin-top: 3px; font-weight: 700;">● ${w.status}</div>
            <div style="font-size: 0.62rem; color: var(--text-secondary); margin-top: 1px;">Rate: ${w.successRate}</div>
            <div style="font-size: 0.60rem; color: var(--text-muted);">Time: ${w.time}</div>
          </div>
          ${idx < data.workflow.length - 1 ? `<div class="notif-workflow-arrow"><i class="fa-solid fa-chevron-right"></i></div>` : ''}
        `).join('')}
      </div>

      <!-- SECTION 1: EXECUTIVE PRIORITY CENTER KPIs -->
      <div class="notif-kpi-grid">
        ${data.kpis.map(k => `
          <div class="notif-kpi-card has-exec-popover" onclick="window.switchRoute('${k.related}')">
            <div class="notif-kpi-card-header">
              <div>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${k.title}</span>
                <strong style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; display: block; color: var(--text-primary); margin-top: 4px;">${k.value}</strong>
              </div>
              <div class="notif-kpi-icon-wrapper icon-${k.color}">
                <i class="fa-solid ${k.icon}"></i>
              </div>
            </div>
            <div style="margin-top: 6px; font-size: 0.72rem; display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span class="badge badge-${k.status === 'Healthy' ? 'success' : 'warning'}" style="font-size: 0.62rem;">
                ${k.trend}
              </span>
              <span style="color: var(--text-muted); text-decoration: underline;">${k.action.split(' ')[0]} &rarr;</span>
            </div>
            
            <!-- Hover Insight Overlay -->
            ${window.createExecPopoverHTML({status: k.status || "Optimal", statusColor: "success", situation: k.situation || `Notification dispatch gateway operating at ${k.value}.`, businessImpact: k.businessImpact || "Guarantees sub-second emergency fleet alert delivery.", aiRecommendation: k.aiRecommendation || "Optimize SMS gateway failover route.", recommendedAction: "View Notifications", relatedModule: "Notifications"})}
          </div>
        `).join('')}
      </div>

      <!-- SECTION 1 (CARDS) & SECTION 2: PRIORITY CENTER & EVENT TIMELINE -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 1 Breakdown: Executive Priority Center Cards -->
        <div class="card col-8">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-triangle-exclamation"></i> Executive Priority Decision Center</span>
              <span class="card-subtitle">Critical attention alerts and decision items requiring CTO signoff</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.priorityCenter.map(item => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--text-primary); font-size: 0.82rem;">${item.title}</strong>
                  <span class="badge badge-${item.priority === 'Critical' ? 'danger' : 'warning'}" style="font-size: 0.62rem;">${item.priority}</span>
                </div>
                <div style="color: var(--text-secondary); display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; margin-top: 4px;">
                  <div>Category: <strong>${item.category}</strong></div>
                  <div>Source Module: <strong>${item.module}</strong></div>
                  <div>Impact: <strong style="color: var(--text-primary);">${item.impact}</strong></div>
                  <div>Owner / Time: <strong>${item.owner} (${item.time})</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="window.openExecutiveNotificationDrawer('${item.id}')">Review</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('APPROVED: Decision signed off by CTO.')">Approve</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('ASSIGNED: Reassigned lead to engineering.')">Assign</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('ESCALATED: Escalation triggered to executive board.')">Escalate</button>
                  <button class="btn btn-outline btn-xs" onclick="window.switchRoute('${item.route}')">Open Module &rarr;</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Technology Event Timeline -->
        <div class="card col-4">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-clock-rotate-left"></i> Technology Event Timeline</span>
              <span class="card-subtitle">Chronological cross-platform event stream</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 12px; padding: 1.25rem; font-size: 0.75rem;">
            ${data.timelineEvents.map(evt => `
              <div class="notif-timeline-item">
                <div class="notif-timeline-time">${evt.time}</div>
                <div class="notif-timeline-dot"></div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <strong style="color: var(--text-primary); font-size: 0.78rem;">${evt.title}</strong>
                  <span style="font-size: 0.68rem; color: var(--color-blue); font-weight: 600;">${evt.module}</span>
                  <p style="color: var(--text-secondary); font-size: 0.7rem; margin-top: 2px; line-height: 1.3;">${evt.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 3: EXECUTIVE APPROVAL QUEUE -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-clipboard-check"></i> Executive Approval Queue</span>
            <span class="card-subtitle">Pending software deployments, AI releases, and cloud scale requests</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.approvalQueue.map(app => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.8rem; color: var(--text-primary);">${app.title}</strong>
                <span class="badge badge-warning" style="font-size: 0.62rem;">Risk: ${app.risk}</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px; margin-top: 4px;">
                <div>Module: <strong>${app.module}</strong></div>
                <div>Impact: <strong style="color: var(--color-blue);">${app.impact}</strong></div>
                <div>Requested by: <strong>${app.owner} (${app.requested})</strong></div>
              </div>
              <div style="margin-top: 8px; display: flex; gap: 4px;">
                <button class="btn btn-primary btn-xs" onclick="alert('APPROVED: Request ${app.title} approved.')">Approve</button>
                <button class="btn btn-outline btn-xs" onclick="alert('REJECTED: Request ${app.title} rejected.')">Reject</button>
                <button class="btn btn-outline btn-xs" onclick="alert('REVIEW REQUESTED: Clarification requested.')">Request Review</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 4 & 5: ENTERPRISE ANNOUNCEMENTS & TEAM ESCALATIONS -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 4: Enterprise Announcements -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-bullhorn"></i> Enterprise Communications & Announcements</span>
              <span class="card-subtitle">Organization-wide maintenance, platform releases and policy updates</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.announcements.map(anc => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--text-primary); font-size: 0.8rem;">${anc.title}</strong>
                  <span class="badge badge-${anc.status === 'Published' ? 'success' : 'info'}" style="font-size: 0.62rem;">${anc.status}</span>
                </div>
                <div style="color: var(--text-secondary); display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; margin-top: 4px;">
                  <div>Category: <strong>${anc.category}</strong></div>
                  <div>Audience: <strong>${anc.audience}</strong></div>
                  <div>Scheduled: <strong>${anc.scheduled}</strong></div>
                  <div>Priority: <strong style="color: var(--color-blue);">${anc.priority}</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="alert('PUBLISHED: Announcement published.')">Publish</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('EDIT: Opening announcement editor.')">Edit</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('PREVIEW: Previewing communication template.')">Preview</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 5: Team Escalation Center -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-user-shield"></i> Team Escalation & Response Center</span>
              <span class="card-subtitle">Active cross-team operational escalations</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.escalations.map(esc => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="color: var(--text-primary); font-size: 0.8rem;">${esc.issue}</strong>
                  <span class="badge badge-${esc.severity === 'High' ? 'danger' : 'warning'}" style="font-size: 0.62rem;">${esc.severity}</span>
                </div>
                <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px; margin-top: 4px;">
                  <div>Assigned Team: <strong>${esc.assignedTeam}</strong> (${esc.status})</div>
                  <div>Business Impact: <strong style="color: var(--color-orange);">${esc.impact}</strong></div>
                  <div>Time Open: <strong>${esc.timeOpen}</strong></div>
                </div>
                <div style="margin-top: 8px; display: flex; gap: 4px;">
                  <button class="btn btn-primary btn-xs" onclick="alert('PRIORITY INCREASED: Escalation severity raised.')">Increase Priority</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('REASSIGNED: Assigned to senior team lead.')">Assign Team</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('CLOSED: Escalation marked as resolved.')">Close</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 6 & 7: SCHEDULED COMMUNICATIONS & PREFERENCES -->
      <div class="dashboard-grid" style="margin-bottom: 1.5rem;">
        
        <!-- Section 6: Scheduled Communications -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-calendar-check"></i> Scheduled Future Communications</span>
              <span class="card-subtitle">Upcoming maintenance advisories and release broadcasts</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px; padding: 1.25rem;">
            ${data.scheduledComms.map(sc => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.75rem;">
                <strong style="color: var(--text-primary); display: block; margin-bottom: 2px;">${sc.title}</strong>
                <div style="color: var(--text-secondary); display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px;">
                  <div>Schedule: <strong>${sc.schedule}</strong></div>
                  <div>Audience: <strong>${sc.audience}</strong></div>
                  <div>Channel: <strong style="color: var(--color-blue);">${sc.channel}</strong></div>
                  <div>Status: <strong>${sc.status}</strong></div>
                </div>
                <div style="margin-top: 6px; display: flex; gap: 4px;">
                  <button class="btn btn-outline btn-xs" onclick="alert('EDIT: Rescheduling communication...')">Edit</button>
                  <button class="btn btn-outline btn-xs" onclick="alert('CANCELED: Scheduled broadcast canceled.')">Cancel</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 7: Notification Preferences -->
        <div class="card col-6">
          <div class="card-header">
            <div>
              <span class="card-title"><i class="fa-solid fa-sliders"></i> Executive Notification Preferences</span>
              <span class="card-subtitle">Priority delivery channels, escalation rules and recipient profiles</span>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 8px; padding: 1.25rem; font-size: 0.75rem;">
            ${data.preferences.map(pref => `
              <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="color: var(--text-primary); font-size: 0.78rem;">${pref.name}</strong>
                  <div style="color: var(--text-secondary); font-size: 0.68rem;">Channel: ${pref.channel} | Recipients: ${pref.recipients}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span class="badge badge-success" style="font-size: 0.60rem;">${pref.status}</span>
                  <button class="btn btn-outline btn-xs" onclick="alert('CONFIG: Opening channel delivery rules...')">Configure</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 8: AI COMMUNICATION INSIGHTS -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Executive Communication Intelligence</span>
            <span class="card-subtitle">Automated event summaries, volume trend observations, and CTO suggested actions</span>
          </div>
        </div>
        <div class="card-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 1.25rem;">
          ${data.insights.map(i => `
            <div style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-sm); font-size: 0.76rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: var(--color-purple);"><i class="fa-solid fa-robot"></i> AI Observation: ${i.obs}</strong>
                <span class="badge badge-${i.riskLevel === 'Medium' ? 'warning' : 'success'}" style="font-size: 0.62rem;">Risk: ${i.riskLevel || 'None'}</span>
              </div>
              <div style="color: var(--text-secondary);"><strong>Business Impact:</strong> ${i.impact}</div>
              <div style="color: var(--text-secondary);"><strong>Recommendation:</strong> ${i.rec}</div>
              <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                <button class="btn btn-outline btn-xs" onclick="alert('AI EXECUTIVE ACTION DISPATCHED: ${i.action}')">${i.action}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 9: CONNECTED ECOSYSTEM ARCHITECTURE -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div>
            <span class="card-title"><i class="fa-solid fa-circle-nodes"></i> Executive Communication Architecture Ecosystem Map</span>
            <span class="card-subtitle">Real-time notification feeds consumed and produced across all 16 modules</span>
          </div>
        </div>
        <div class="card-body" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 8px;">
          <div class="ecosystem-flow-container">
            ${data.architecture.map(arc => `
              <div class="notif-eco-row" onclick="window.switchRoute('${arc.route}')">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); width: 250px;">
                  <i class="fa-solid fa-network-wired" style="color: var(--color-blue);"></i> ${arc.name}
                </div>
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 2px; font-size: 0.7rem; color: var(--text-secondary);">
                  <div>Consumes: <strong style="color: var(--text-muted);">${arc.consumes}</strong></div>
                  <div>Produces: <strong style="color: var(--text-muted);">${arc.produces}</strong></div>
                </div>
                <div style="display: flex; gap: 24px; color: var(--text-secondary); font-size: 0.72rem; align-items: center;">
                  <span>Health: <strong style="color: var(--color-green);">● ${arc.health}</strong></span>
                  <span>Sync: <strong>${arc.sync}</strong></span>
                  <div style="text-decoration: underline; color: var(--color-blue); font-size: 0.7rem;">Go &rarr;</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // EXECUTIVE NOTIFICATION DETAIL DRAWER
  function openExecutiveNotificationDrawer(id) {
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!drawerOverlay) return;

    drawerOverlay.innerHTML = `
      <div class="drawer" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; height: 100%; overflow-y: auto;">
        
        <!-- Drawer Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">Executive Alert Review</h3>
            <span style="font-size: 0.72rem; color: var(--text-muted);">Event ID: ${id}</span>
          </div>
          <button class="btn btn-outline btn-xs" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Section 1: Overview -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Event Details & Scope</strong>
          <div style="color: var(--text-secondary); display: flex; flex-direction: column; gap: 2px;">
            <div>Priority Level: <strong style="color: var(--color-orange);">High Priority</strong></div>
            <div>Source Module: <strong>API Management / MLOps</strong></div>
            <div>Delivery Channel: <strong style="color: var(--color-green);">Push + SMS + In-App</strong></div>
          </div>
        </div>

        <!-- Section 2: Business Impact -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Business Impact & Risk Margin</strong>
          <p style="color: var(--text-secondary); line-height: 1.35;">
            API gateway latency increased to 240ms during peak ingestion load. Recommended gRPC gateway migration will reduce latency by 40%.
          </p>
        </div>

        <!-- Section 3: CTO Decision Actions -->
        <div class="card-body" style="background-color: var(--bg-app); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Recommended CTO Action</strong>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <button class="btn btn-primary" onclick="alert('APPROVED: CTO decision executed.')">Approve & Execute</button>
            <button class="btn btn-outline" onclick="alert('BROADCAST: Executive broadcast sent.')">Send Broadcast</button>
            <button class="btn btn-outline" onclick="alert('ASSIGNED: Reassigned to DevOps lead.')">Assign Team Lead</button>
            <button class="btn btn-outline" onclick="window.switchRoute('api-management'); closeDrawer();">Open API Management</button>
          </div>
        </div>

      </div>
    `;

    drawerOverlay.classList.add('active');
  }

  window.filterTechDomain = function(category, btnEl) {
    document.querySelectorAll('.tech-kpi-tab').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    const cols = document.querySelectorAll('.tech-domain-col');
    cols.forEach(col => {
      if (category === 'all' || col.getAttribute('data-category') === category) {
        col.style.display = 'flex';
      } else {
        col.style.display = 'none';
      }
    });
  };

  window.renderTelemetryPlatformModule = renderTelemetryPlatformModule;
  window.filterTelemetryVehicles = filterTelemetryVehicles;
  window.renderEVcareAIDashboardModule = renderEVcareAIDashboardModule;
  window.renderAIDiagnosticsModule = renderAIDiagnosticsModule;
  window.openAIDiagnosticDrawer = openAIDiagnosticDrawer;
  window.renderMobileAppManagementModule = renderMobileAppManagementModule;
  window.openMobileAppDrawer = openMobileAppDrawer;
  window.renderWebPortalManagementModule = renderWebPortalManagementModule;
  window.openWebPortalDrawer = openWebPortalDrawer;
  window.renderAIModelsModule = renderAIModelsModule;
  window.openAIModelDrawer = openAIModelDrawer;
  window.renderMachineLearningPlatformModule = renderMachineLearningPlatformModule;
  window.openMLPipelineDrawer = openMLPipelineDrawer;
  window.renderNotificationsModule = renderNotificationsModule;
  window.openExecutiveNotificationDrawer = openExecutiveNotificationDrawer;
  window.openTechnologyDashboardDrawer = openTechnologyDashboardDrawer;

});
