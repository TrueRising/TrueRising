(function () {
  const content = window.NAGEEB_CONTENT;
  if (!content) return;

  const currentPath = location.pathname.split('/').pop() || 'index.html';
  const savedLang = localStorage.getItem('nageeb_lang');
  const lang = savedLang === 'ar' ? 'ar' : 'en';
  applyLanguage(lang);

  function applyLanguage(locale) {
    const data = content[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';

    const top = document.querySelector('[data-shell="top"]');
    const header = document.querySelector('[data-shell="header"]');
    const footer = document.querySelector('[data-shell="footer"]');

    if (top) {
      top.innerHTML = `<div class="top-announcement"><div class="container announcement-inner"><span>${data.announcement}</span><a href="request.html" class="btn btn-ghost" style="padding:6px 12px;font-size:.85rem;">${data.cta}</a></div></div>`;
    }

    if (header) {
      header.innerHTML = `
        <header class="site-header">
          <div class="container header-inner">
            <a class="brand" href="index.html" aria-label="${data.brandName}">
              <span class="brand-mark">N</span>
              <span class="brand-copy"><strong>${data.brandName}</strong><small>${data.brandTagline}</small></span>
            </a>
            <button class="btn btn-secondary menu-toggle" id="menuToggle" type="button">☰</button>
            <nav class="nav-links" id="mainNav" aria-label="Primary">
              ${data.nav.map(([name, href]) => `<a class="${href === currentPath ? 'active' : ''}" href="${href}">${name}</a>`).join('')}
              <a class="btn btn-primary" href="request.html">${data.cta}</a>
              <button id="langToggle" class="btn btn-secondary" type="button">${locale === 'en' ? 'AR' : 'EN'}</button>
            </nav>
          </div>
        </header>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <footer class="footer">
          <div class="container footer-inner">
            <span>© 2026 ${data.brandName}. ${locale === 'en' ? 'Web design, development, and conversion strategy.' : 'تصميم وتطوير مواقع تركّز على النتائج.'}</span>
            <div>
              <a href="mailto:anageeb@gmail.com">anageeb@gmail.com</a> ·
              <a href="https://wa.me/201023968999" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </footer>
      `;
    }

    attachUi(locale);
  }

  function attachUi(locale) {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (menuToggle && nav) {
      menuToggle.onclick = () => nav.classList.toggle('open');
    }

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.onclick = () => {
        const next = locale === 'en' ? 'ar' : 'en';
        localStorage.setItem('nageeb_lang', next);
        applyLanguage(next);
      };
    }

    const blogList = document.getElementById('blogList');
    if (blogList) {
      blogList.innerHTML = content.blogPosts.map(post => `
        <a class="card blog-post-link" href="blog.html#${post.slug}">
          <small>${post.date}</small>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
        </a>
      `).join('');
    }
  }
})();
