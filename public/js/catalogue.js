const state = { search: '', category: 'All', sort: 'title' };
const booksEl = document.getElementById('books');
const chipsEl = document.getElementById('chips');

async function loadCategories() {
  try {
    const res = await fetch('/api/books/categories');
    const { categories } = await res.json();
    chipsEl.innerHTML = ['All', ...categories]
      .map((c) => `<button class="chip ${c === state.category ? 'active' : ''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
      .join('');
  } catch {
    chipsEl.innerHTML = '';
  }
}

async function loadBooks() {
  const qs = new URLSearchParams(state).toString();
  try {
    const res = await fetch('/api/books?' + qs);
    if (!res.ok) throw new Error();
    const { books } = await res.json();
    booksEl.innerHTML = books.length
      ? books.map(bookCard).join('')
      : '<p class="empty">No books match your search.</p>';
  } catch {
    booksEl.innerHTML = '<p class="empty">Could not load books. Is the server and database running?</p>';
  }
}

chipsEl.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  state.category = chip.dataset.cat;
  chipsEl.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === chip));
  loadBooks();
});

let timer;
document.getElementById('search').addEventListener('input', (e) => {
  clearTimeout(timer);
  timer = setTimeout(() => { state.search = e.target.value; loadBooks(); }, 250);
});

document.getElementById('sort').addEventListener('change', (e) => {
  state.sort = e.target.value;
  loadBooks();
});

loadCategories();
loadBooks();
