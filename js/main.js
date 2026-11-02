async function loadIncludes() {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async (slot) => {
    const path = slot.getAttribute('data-include');
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Could not load ${path}`);
    }
    slot.outerHTML = await response.text();
  }));
}

function initNav() {
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (!toggle || !navList) return;

  const page = (location.pathname.split('/').pop() || 'index.html');
  const hash = location.hash.replace('#', '');
  navList.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const [hrefPage, hrefHash] = href.split('#');
    const pageMatch = (hrefPage || 'index.html') === page;
    if (!pageMatch) return;
    if (hrefHash) {
      const current = hash || 'welcome';
      if (hrefHash === current || (hrefHash === 'welcome' && (hash === '' || hash === 'top'))) {
        a.setAttribute('aria-current', 'page');
      }
    } else {
      a.setAttribute('aria-current', 'page');
    }
  });

  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

loadIncludes()
  .then(() => {
    initNav();
    if (typeof initGettingHereMap === 'function') {
      initGettingHereMap();
    }
  })
  .catch((error) => {
    console.error(error);
    document.body.insertAdjacentHTML(
      'afterbegin',
      '<p style="margin:24px;font-family:sans-serif;">This page needs a local server so section files can load. From the project folder run: <code>python3 -m http.server</code></p>'
    );
  });
