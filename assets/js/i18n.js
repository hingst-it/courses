class I18n {
  constructor() {
    this.translations = {};
    this.currentLang = 'de';
    this.loaded = false;
  }

  async init() {
    const stored = localStorage.getItem('courses-lang');
    if (stored && stored !== 'de' && stored !== 'en') {
      this.currentLang = this.detectBrowserLang();
    } else if (stored) {
      this.currentLang = stored;
    } else {
      this.currentLang = this.detectBrowserLang();
    }

    try {
      const res = await fetch('/courses/_locales/' + this.currentLang + '.json');
      this.translations = await res.json();
      this.loaded = true;
      this.apply();
    } catch (e) {
      console.error('Could not load locale:', e);
    }
  }

  detectBrowserLang() {
    const browser = navigator.language || navigator.languages?.[0] || '';
    if (browser.startsWith('de')) return 'de';
    if (browser.startsWith('en')) return 'en';
    // Fallback: try Accept-Language header via a small request
    return 'de';
  }

  t(key) {
    const parts = key.split('.');
    let val = this.translations;
    for (const p of parts) {
      if (val?.[p] !== undefined) val = val[p];
      else return key;
    }
    return val;
  }

  apply() {
    document.documentElement.lang = this.currentLang;
    document.documentElement.dataset.lang = this.currentLang;

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      const value = this.t(key);
      if (value) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = value;
        } else if (el.tagName === 'OPTION') {
          el.textContent = value;
        } else {
          el.textContent = value;
        }
      }
    });

    // Update data-i18n-href elements
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
      el.title = this.t(el.getAttribute('data-i18n-href'));
    });

    // Update lang-* span visibility
    this.updateLangVisibility();

    // Update language toggle buttons
    const enBtn = document.getElementById('lang-toggle-en');
    const deBtn = document.getElementById('lang-toggle-de');
    if (enBtn) enBtn.classList.toggle('active', this.currentLang === 'en');
    if (deBtn) deBtn.classList.toggle('active', this.currentLang === 'de');
  }

  updateLangVisibility() {
    document.querySelectorAll('[data-lang]').forEach(el => {
      const lang = el.getAttribute('data-lang');
      el.style.display = lang === this.currentLang ? '' : 'none';
    });
  }

  setLang(lang) {
    if (lang === this.currentLang) return;

    if (this.loaded && lang !== this.currentLang) {
      const oldLang = this.currentLang;
      this.currentLang = lang;
      localStorage.setItem('courses-lang', lang);

      fetch('/courses/_locales/' + lang + '.json')
        .then(r => r.json())
        .then(t => {
          this.translations = t;
          this.apply();
        });
    }
  }

  toggle() {
    this.setLang(this.currentLang === 'de' ? 'en' : 'de');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const i18n = new I18n();
  window.i18n = i18n;
  await i18n.init();

  // Language toggle buttons
  document.getElementById('lang-toggle-en')?.addEventListener('click', () => i18n.setLang('en'));
  document.getElementById('lang-toggle-de')?.addEventListener('click', () => i18n.setLang('de'));
});
