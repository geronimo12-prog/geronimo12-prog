const state = {
  products: PRODUCTS,
  filtered: PRODUCTS,
  cart: JSON.parse(localStorage.getItem('sf_cart') || '[]'),
  category: 'Todas'
};

const $ = (s) => document.querySelector(s);
const fmtARS = (n) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

function initCategories() {
  const categories = ['Todas', ...new Set(PRODUCTS.map(p => p.category))];
  $('#categoryFilter').innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

function applyFilters() {
  const q = $('#searchInput').value.toLowerCase().trim();
  const cat = $('#categoryFilter').value;
  const sort = $('#sortFilter').value;

  let items = PRODUCTS.filter(p => {
    const byCat = cat === 'Todas' || p.category === cat;
    const byText = `${p.name} ${p.description}`.toLowerCase().includes(q);
    return byCat && byText;
  });

  if (sort === 'price-asc') items.sort((a,b)=>a.price-b.price);
  if (sort === 'price-desc') items.sort((a,b)=>b.price-a.price);
  if (sort === 'name') items.sort((a,b)=>a.name.localeCompare(b.name));

  state.filtered = items;
  renderProducts();
}

function renderProducts() {
  const grid = $('#productGrid');
  if (!state.filtered.length) return grid.innerHTML = '<p>No hay resultados.</p>';

  grid.innerHTML = state.filtered.map((p, i) => `
    <article class="card" style="animation:fadeUp .45s ease ${i*30}ms both">
      <img src="${p.image}" alt="${p.name}" loading="lazy" />
      <div class="card-body">
        <small>${p.category}</small>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="row">
          <span class="price">${fmtARS(p.price)}</span>
          <button class="btn-add" data-add="${p.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => {
    const prod = PRODUCTS.find(p => p.id === Number(btn.dataset.add));
    state.cart.push(prod);
    persistCart();
    renderCart();
    showToast(`${prod.name} agregado al carrito`);
  }));
}

function renderCart() {
  const wrap = $('#cartItems');
  const total = state.cart.reduce((acc,p)=>acc+p.price,0);
  $('#cartCount').textContent = state.cart.length;
  $('#cartTotal').textContent = fmtARS(total);

  if (!state.cart.length) return wrap.innerHTML = '<p>Tu carrito está vacío.</p>';

  wrap.innerHTML = state.cart.map((item, idx) => `
    <div class="cart-item">
      <strong>${item.name}</strong>
      <div>${fmtARS(item.price)}</div>
      <button data-remove="${idx}">Quitar</button>
    </div>
  `).join('');

  wrap.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
    state.cart.splice(Number(btn.dataset.remove), 1);
    persistCart();
    renderCart();
  }));

  updateWhatsAppLink();
}

function updateWhatsAppLink() {
  const total = state.cart.reduce((acc,p)=>acc+p.price,0);
  const list = state.cart.map((p,i)=>`${i+1}. ${p.name} - ${fmtARS(p.price)}`).join('\n');
  const text = state.cart.length
    ? `Hola, quiero comprar estos productos:%0A${encodeURIComponent(list)}%0A%0ATotal: ${encodeURIComponent(fmtARS(total))}`
    : 'Hola, quiero consultar productos deportivos.';
  $('#whatsappBtn').href = `https://wa.me/5493425550198?text=${text}`;
}

function persistCart() {
  localStorage.setItem('sf_cart', JSON.stringify(state.cart));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1700);
}

function bindUI() {
  $('#searchInput').addEventListener('input', applyFilters);
  $('#categoryFilter').addEventListener('change', applyFilters);
  $('#sortFilter').addEventListener('change', applyFilters);
  $('#cartToggle').addEventListener('click', () => $('#cartPanel').classList.toggle('open'));

  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = ['#name', '#email', '#phone', '#message'].map(id => $(id));
    const valid = fields.every(f => f.value.trim().length >= 3);
    if (!valid) return $('#formMsg').textContent = 'Completá correctamente todos los campos.';
    $('#formMsg').textContent = '¡Consulta enviada! Te responderemos pronto.';
    e.target.reset();
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function init() {
  initCategories();
  bindUI();
  applyFilters();
  renderCart();
  updateWhatsAppLink();
}

init();
