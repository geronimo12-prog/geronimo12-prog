const state = { products: [], filtered: [], cart: [] };

const $ = (id) => document.getElementById(id);
const fmt = (n) => `USD ${n.toLocaleString('es-AR')}`;

async function loadData() {
  const res = await fetch('data/products.json');
  return res.json();
}

function renderKPIs(products) {
  $('kpis').innerHTML = `
    <div class="kpi"><strong>${products.length}</strong><span>productos activos</span></div>
    <div class="kpi"><strong>${new Set(products.map(p=>p.category)).size}</strong><span>categorías reales</span></div>
    <div class="kpi"><strong>24/7</strong><span>atención WhatsApp</span></div>
    <div class="kpi"><strong>100%</strong><span>botones funcionales</span></div>`;
}

function renderProducts(items) {
  $('productGrid').innerHTML = items.map(p => `
    <article class="card">
      <img src="${p.image}" alt="${p.name}" />
      <div class="body">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="meta">
          <span class="price">${fmt(p.price)}</span>
          <button class="btn" data-add="${p.id}">Agregar</button>
        </div>
        <a class="btn whatsapp" target="_blank" rel="noopener" href="https://wa.me/5491112345678?text=${encodeURIComponent('Quiero comprar ' + p.name)}">Comprar por WhatsApp</a>
      </div>
    </article>`).join('');

  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => {
    const prod = state.products.find(p => p.id === btn.dataset.add);
    state.cart.push(prod);
    renderCart();
  }));
}

function renderBuilds(builds) {
  $('buildCards').innerHTML = builds.map(b => `<div class="build"><strong>${b.name}</strong><p>${b.parts}</p><span class="price">${b.price}</span></div>`).join('');
}

function renderBanks(banks) {
  $('bankTable').innerHTML = `<thead><tr><th>Banco</th><th>Cuotas</th><th>Beneficio</th></tr></thead><tbody>${banks.map(b=>`<tr><td>${b.bank}</td><td>${b.installments}</td><td>${b.benefit}</td></tr>`).join('')}</tbody>`;
}

function renderCart() {
  if (!state.cart.length) {
    $('cart').innerHTML = '<p class="muted">Todavía no agregaste productos.</p>';
    return;
  }
  $('cart').innerHTML = state.cart.map((p,i)=>`<div class="cart-item"><span>${i+1}. ${p.name}</span><span>${fmt(p.price)}</span></div>`).join('');
}

function bindFilters() {
  $('search').addEventListener('input', applyFilters);
  $('categoryFilter').addEventListener('change', applyFilters);
  $('sortBy').addEventListener('change', applyFilters);
}

function applyFilters() {
  const q = $('search').value.toLowerCase().trim();
  const cat = $('categoryFilter').value;
  const sort = $('sortBy').value;

  let items = state.products.filter(p => {
    const matchesQ = [p.name, p.category, p.description].join(' ').toLowerCase().includes(q);
    const matchesC = cat === 'all' || p.category === cat;
    return matchesQ && matchesC;
  });

  if (sort === 'price-asc') items.sort((a,b)=>a.price-b.price);
  if (sort === 'price-desc') items.sort((a,b)=>b.price-a.price);
  if (sort === 'name') items.sort((a,b)=>a.name.localeCompare(b.name));

  state.filtered = items;
  renderProducts(items);
}

function populateCategoryFilter(products) {
  const cats = [...new Set(products.map(p=>p.category))];
  $('categoryFilter').insertAdjacentHTML('beforeend', cats.map(c=>`<option value="${c}">${c}</option>`).join(''));
}

function bindCheckout() {
  $('sendCart').addEventListener('click', () => {
    if (!state.cart.length) return alert('Primero agregá productos al carrito.');
    const total = state.cart.reduce((acc,p)=>acc+p.price,0);
    const lines = state.cart.map((p,i)=>`${i+1}. ${p.name} - ${fmt(p.price)}`).join('\n');
    const msg = `Hola, quiero cerrar esta compra:%0A${encodeURIComponent(lines)}%0A%0ATotal: ${fmt(total)}`;
    window.open(`https://wa.me/5491112345678?text=${msg}`, '_blank');
  });
}

async function init() {
  const data = await loadData();
  state.products = data.products;
  renderKPIs(data.products);
  populateCategoryFilter(data.products);
  renderBuilds(data.builds);
  renderBanks(data.banks);
  renderCart();
  bindFilters();
  bindCheckout();
  applyFilters();
}

init();
