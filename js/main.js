// ---- Mobile menu ----
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ---- Language toggle (EN default / Roman Urdu) ----
const langBtns = document.querySelectorAll('.lang-toggle button');
function setLang(lang) {
  document.body.classList.remove('lang-en', 'lang-ru');
  document.body.classList.add('lang-' + lang);
  langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  try { localStorage.setItem('soc-lang', lang); } catch(e){}
}
langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
try {
  const saved = localStorage.getItem('soc-lang') || 'en';
  setLang(saved);
} catch(e) { setLang('en'); }

// ---- Contact form -> email app (no backend) ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent('Students of Cyber — message from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail/Phone: ' + email + '\n\nMessage:\n' + message);
    window.location.href = 'mailto:contact@studentsofcyber.example?subject=' + subject + '&body=' + body;
    form.reset();
  });
}

// ---- Render uploaded material from CMS data (content/data/*.json) ----
// Files added via /admin (Decap CMS) appear here automatically.
async function renderMaterials() {
  const grid = document.getElementById('materialGrid');
  if (!grid) return;
  try {
    const res = await fetch('content/data/materials.json');
    if (!res.ok) return;
    const items = await res.json();
    grid.innerHTML = items.map(it => `
      <div class="resource">
        <span class="tag">${it.type || 'Resource'}</span>
        <h3>${it.title}</h3>
        <p>${it.description || ''}</p>
        ${it.url ? `<p class="meta"><a href="${it.url}" target="_blank" rel="noopener">Open / Download →</a></p>` : ''}
      </div>`).join('');
  } catch(e) { /* no data yet — fine */ }
}
renderMaterials();
