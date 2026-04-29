// Estado principal de la tienda.
const state = {
  category: 'Todas',
  search: '',
  cart: []
};

const $ = (selector) => document.querySelector(selector);
const fmtPrice = (value) => `USD ${value.toLocaleString('en-US')}`;

function categoriesFromData() {
  return ['Todas', ...new Set(PRODUCTS.map((p) => p.category))];
}

function renderCategoryFilters() {
  const container = $('#categoryFilters');
  container.innerHTML = categoriesFromData()
    .map((cat) => `<button class="chip ${cat === state.category ? 'active' : ''}" data-category="${cat}">${cat}</button>`)
    .join('');

  container.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      renderAll();
    });
  });
}

function filteredProducts() {
  return PRODUCTS.filter((p) => {
    const byCategory = state.category === 'Todas' || p.category === state.category;
    const bySearch = `${p.name} ${p.description}`.toLowerCase().includes(state.search.toLowerCase());
    return byCategory && bySearch;
  });
}

function renderProducts() {
  const grid = $('#productGrid');
  const products = filteredProducts();

  if (!products.length) {
    grid.innerHTML = '<p>No se encontraron productos con ese filtro.</p>';
    return;
  }

  grid.innerHTML = products
    .map(
      (p, i) => `
      <article class="card" style="animation-delay:${i * 45}ms">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="card-body">
          <small>${p.category}</small>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <div class="price-row">
            <span class="price">${fmtPrice(p.price)}</span>
            <button class="btn-add" data-id="${p.id}">Agregar al carrito</button>
          </div>
        </div>
      </article>`
    )
    .join('');

  grid.querySelectorAll('[data-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = PRODUCTS.find((p) => p.id === Number(btn.dataset.id));
      state.cart.push(product);
      renderCart();
    });
  });
}

function renderCart() {
  const cartItems = $('#cartItems');
  const total = state.cart.reduce((sum, p) => sum + p.price, 0);

  if (!state.cart.length) {
    cartItems.innerHTML = '<p>El carrito está vacío.</p>';
    $('#cartTotal').textContent = fmtPrice(0);
    return;
  }

  cartItems.innerHTML = state.cart
    .map(
      (item, index) => `
      <div class="cart-item">
        <strong>${item.name}</strong>
        <span>${fmtPrice(item.price)}</span>
        <button class="btn-remove" data-remove="${index}">Quitar</button>
      </div>`
    )
    .join('');

  $('#cartTotal').textContent = fmtPrice(total);

  cartItems.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.cart.splice(Number(btn.dataset.remove), 1);
      renderCart();
    });
  });
}

function bindSearch() {
  $('#searchInput').addEventListener('input', (event) => {
    state.search = event.target.value.trim();
    renderProducts();
  });
}

function renderAll() {
  renderCategoryFilters();
  renderProducts();
}

bindSearch();
renderAll();
renderCart();
