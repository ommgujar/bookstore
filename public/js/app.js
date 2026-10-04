// Shared helpers used by every page

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatPrice(p) {
  return '₹' + Number(p).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function bookCard(b) {
  return `
    <article class="book">
      <div class="cover" style="background:${escapeHtml(b.cover_color)}">${escapeHtml(b.title)}</div>
      <div class="book-body">
        <span class="tag">${escapeHtml(b.category)}</span>
        <div class="book-title">${escapeHtml(b.title)}</div>
        <div class="book-author">by ${escapeHtml(b.author)}</div>
        <div class="book-desc">${escapeHtml(b.description)}</div>
        <div class="book-foot">
          <span class="price">${formatPrice(b.price)}</span>
          <button class="btn btn-sm" data-add="${b.id}" data-title="${escapeHtml(b.title)}">Add to cart</button>
        </div>
      </div>
    </article>`;
}

// Cart is kept in the browser (localStorage) for this demo
function addToCart(id, title) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find((c) => c.id === id);
  if (item) item.qty += 1;
  else cart.push({ id, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  showToast(`Added "${title}" to cart`);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add]');
  if (btn) addToCart(Number(btn.dataset.add), btn.dataset.title);
});

// Navbar: mobile toggle + login state
async function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle) toggle.addEventListener('click', () => links.classList.toggle('open'));

  const slot = document.getElementById('authSlot');
  if (!slot) return;
  try {
    const res = await fetch('/api/auth/me');
    const { user } = await res.json();
    if (user) {
      slot.innerHTML = `<span class="nav-user">Hi, ${escapeHtml(user.name)}</span>
        <a href="#" id="logoutLink">Logout</a>`;
      document.getElementById('logoutLink').addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('/api/auth/logout', { method: 'POST' });
        location.href = '/';
      });
    } else {
      slot.innerHTML = `<a href="/login.html">Login</a>
        <a class="btn btn-sm" href="/register.html">Sign up</a>`;
    }
  } catch {
    slot.innerHTML = `<a href="/login.html">Login</a>`;
  }
}

document.addEventListener('DOMContentLoaded', initNav);
