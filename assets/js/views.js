// View switcher — VS Code-style navigation for Cloud Courses
const courses = {
  home: {
    title: 'Welcome',
    icon: '🏠',
    file: 'Welcome',
    fileIcon: '🏠',
    href: window.location.origin + '/courses/'
  },
  terraform: {
    title: 'Terraform 101',
    icon: '🟩',
    file: 'terraform-101.md',
    fileIcon: '📄',
    href: window.location.origin + '/courses/courses/terraform-101.html'
  },
  azure: {
    title: 'Azure 101',
    icon: '🟦',
    file: 'azure-101.md',
    fileIcon: '📄',
    href: window.location.origin + '/courses/courses/azure-101.html'
  },
  databricks: {
    title: 'Databricks 101',
    icon: '🟨',
    file: 'databricks-101.md',
    fileIcon: '📄',
    href: window.location.origin + '/courses/courses/databricks-101.html'
  },
  integration: {
    title: 'Integration 101',
    icon: '🚀',
    file: 'integration-101.md',
    fileIcon: '📄',
    href: window.location.origin + '/courses/courses/integration-101.html'
  }
};

function updateStatusbar(view) {
  const langSpan = document.getElementById('status-lang');
  if (!langSpan) return;
  const span = langSpan.querySelector('.icon');
  const docLang = document.documentElement.getAttribute('data-lang') || 'de';
  span.textContent = docLang.toUpperCase();
}

function getCurrentView() {
  const path = window.location.pathname;
  if (path === '/courses/' || path === '/courses/index.html' || path === '') {
    return 'home';
  }
  for (const [key, val] of Object.entries(courses)) {
    if (key !== 'home' && path.includes(key + '.html')) {
      return key;
    }
  }
  return 'home';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const currentView = getCurrentView();
  
  // If we're on a course page, set the active states
  if (currentView !== 'home') {
    setActiveState(currentView);
  } else {
    setActiveState('home');
  }

  // Set up tab clicks → navigate to course
  document.querySelectorAll('.vscode-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const viewName = tab.getAttribute('data-tab');
      if (courses[viewName]) {
        window.location.href = courses[viewName].href;
      }
    });
  });

  // Set up activity bar → navigate to course
  document.querySelectorAll('.activity-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const viewName = btn.getAttribute('data-view');
      if (courses[viewName]) {
        window.location.href = courses[viewName].href;
      }
    });
  });

  // Set up file tree clicks (anchor links) → navigate
  document.querySelectorAll('.file-tree .tree-item a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = link.getAttribute('href');
    });
  });

  // Set up non-link tree items (divs) → navigate
  document.querySelectorAll('.file-tree .tree-item:not(:has(a))').forEach(item => {
    item.addEventListener('click', () => {
      const viewName = item.getAttribute('data-view');
      if (courses[viewName]) {
        window.location.href = courses[viewName].href;
      }
    });
  });

  // Welcome quick start links → navigate
  document.querySelectorAll('.quick-start-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = link.getAttribute('href');
    });
  });

  // Handle lang toggle
  document.getElementById('lang-toggle-en')?.addEventListener('click', () => {
    if (window.i18n) window.i18n.setLang('en');
  });
  document.getElementById('lang-toggle-de')?.addEventListener('click', () => {
    if (window.i18n) window.i18n.setLang('de');
  });
});

function setActiveState(viewName) {
  if (!courses[viewName]) return;

  // Update active states on activity bar
  document.querySelectorAll('.activity-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  // Update active states on tabs
  document.querySelectorAll('.vscode-tabs .tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === viewName);
  });

  // Update breadcrumb
  updateBreadcrumbs(viewName);

  // Update statusbar
  updateStatusbar(viewName);

  // Update sidebar file tree to show active state
  highlightSidebarItem(viewName);
}

function updateBreadcrumbs(viewName) {
  const breadcrumbs = document.querySelector('.vscode-breadcrumbs');
  if (!breadcrumbs) return;
  
  const course = courses[viewName];
  const breadcrumbItem = viewName === 'home' ? 'Home' : course.title;
  
  // Preserve the link to home
  const homeUrl = window.location.origin + '/courses/';
  breadcrumbs.innerHTML = `
    <a href="${homeUrl}" class="breadcrumb-item">Cloud Courses</a>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-item ${viewName === 'home' ? 'active' : ''}">${breadcrumbItem}</span>
  `;
}

function highlightSidebarItem(viewName) {
  // Remove all active states from sidebar items
  document.querySelectorAll('.tree-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active state to matching item
  const target = document.querySelector(`.tree-item[data-view="${viewName}"]`);
  if (target) target.classList.add('active');
}
