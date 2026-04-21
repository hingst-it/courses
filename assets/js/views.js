// View switcher — simulates VS Code tab switching
const courses = {
  home: {
    title: 'Welcome',
    icon: '🏠',
    file: 'Welcome',
    fileIcon: '🏠'
  },
  terraform: {
    title: 'Terraform 101',
    icon: '🟩',
    file: 'terraform-101.md',
    fileIcon: '📄'
  },
  azure: {
    title: 'Azure 101',
    icon: '🟦',
    file: 'azure-101.md',
    fileIcon: '📄'
  },
  databricks: {
    title: 'Databricks 101',
    icon: '🟨',
    file: 'databricks-101.md',
    fileIcon: '📄'
  },
  integration: {
    title: 'Integration 101',
    icon: '🚀',
    file: 'integration-101.md',
    fileIcon: '📄'
  }
};

let currentView = 'home';

function updateStatusbar(view) {
  const langSpan = document.getElementById('status-lang');
  const span = langSpan.querySelector('.icon');
  const docLang = document.documentElement.getAttribute('data-lang') || 'de';
  span.textContent = docLang.toUpperCase();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set up sidebar content
  updateSidebar('home');
  
  // Set up tab states
  document.querySelectorAll('.vscode-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const viewName = tab.getAttribute('data-tab');
      goToView(viewName);
    });
  });

  // Set up activity bar
  document.querySelectorAll('.activity-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const viewName = btn.getAttribute('data-view');
      goToView(viewName);
    });
  });

  // Set up file tree clicks
  document.querySelectorAll('.tree-item a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Determine view name from href
      const href = link.getAttribute('href');
      const viewName = Object.keys(courses).find(key => {
        return href.includes(key + '.html') || 
               ('/' + key + '.html' === href);
      });
      
      if (viewName) {
        goToView(viewName);
        window.location.href = href;
      }
    });
  });

  // Welcome quick start links
  document.querySelectorAll('.quick-start-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const viewName = Object.keys(courses).find(key => {
        return href.includes(key);
      });
      
      if (viewName) {
        goToView(viewName);
        setTimeout(() => {
          window.location.href = href;
        }, 100);
      }
    });
  });

  // Handle lang toggle
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.vscode-btn-toggle');
      if (btn) {
        const lang = btn.textContent.toLowerCase();
        if (window.i18n) {
          window.i18n.setLang(lang);
        }
      }
    });
  }
});

function goToView(viewName) {
  if (!courses[viewName]) return;
  
  const course = courses[viewName];
  const view = localStorage.getItem('vscode-view') || 'home';
  
  // Update active states
  document.querySelectorAll('.activity-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });
  
  // Update tabs
  document.querySelectorAll('.vscode-tabs .tab').forEach(tab => {
    const tabName = tab.getAttribute('data-tab');
    if (tabName === viewName || (viewName === 'home' && tabName === 'home')) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update breadcrumb
  updateBreadcrumbs(viewName);
  
  // Update file tree
  updateSidebar(viewName);
  
  // Update statusbar
  updateStatusbar(viewName);
}

function updateBreadcrumbs(viewName) {
  const breadcrumbs = document.querySelector('.vscode-breadcrumbs');
  if (!breadcrumbs) return;
  
  const parts = viewName.split('-');
  const breadcrumbItem = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  
  breadcrumbs.innerHTML = `
    <span class="breadcrumb-item">Cloud Courses</span>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-item">${breadcrumbItem}</span>
  `;
}

function updateSidebar(viewName) {
  const sidebar = document.querySelector('#sidebar-content');
  if (!sidebar) return;
  
  const view = localStorage.getItem('vscode-view') || 'home';
  const course = courses[viewName];
  
  sidebar.innerHTML = `
    <div class="sidebar-section">
      <div class="sidebar-section-header">
        <span>Courses</span>
        <span class="sidebar-chevron">▼</span>
      </div>
      <div class="sidebar-section-content">
        <div class="tree-item" data-view="home">
          <span class="tree-icon">🏠</span>
          <span class="tree-text">Welcome</span>
        </div>
        <div class="tree-item" data-view="terraform">
          <span class="tree-icon">📄</span>
          <span class="tree-text">terraform-101.md</span>
        </div>
        <div class="tree-item" data-view="azure">
          <span class="tree-icon">📄</span>
          <span class="tree-text">azure-101.md</span>
        </div>
        <div class="tree-item" data-view="databricks">
          <span class="tree-icon">📄</span>
          <span class="tree-text">databricks-101.md</span>
        </div>
        <div class="tree-item" data-view="integration">
          <span class="tree-icon">📄</span>
          <span class="tree-text">integration-101.md</span>
        </div>
      </div>
    </div>
  `;

  // Add click handlers to sidebar items
  sidebar.querySelectorAll('.tree-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      if (targetView && courses[targetView]) {
        goToView(targetView);
      }
    });
  });
}

// Save current view to localStorage
document.addEventListener('beforeunload', () => {
  const activeView = document.querySelector('.vscode-tabs .tab.active')?.getAttribute('data-tab') || 'home';
  localStorage.setItem('vscode-view', activeView);
});
