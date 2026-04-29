
let safeProducts = [];
let currentCategory = 'todas';

const $ = (s) => document.querySelector(s);
const fmt = (n) => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n || 0);

function renderProducts(list) {
  const grid = $('#productGrid');
  if (!grid) return;
  if (!Array.isArray(list) || !list.length) {
    grid.innerHTML = '<p>No hay productos para mostrar.</p>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <article class="card">
      <img loading="lazy" src="${p.image || ''}" alt="${p.name || 'Producto'}" />
      <div class="card-body">
        <small>${p.category || 'sin categoría'}</small>
        <h3>${p.name || 'Producto sin nombre'}</h3>
        <p>${p.description || ''}</p>
        <div class="row">
          <span class="price">${fmt(p.price)}</span>
          <button class="btn-add" data-id="${p.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join('');
}

function filterAndRender(){
  const q = ($('#searchInput')?.value || '').toLowerCase().trim();
  const cat = $('#categoryFilter')?.value || 'todas';
  let list = safeProducts.filter(p => (cat === 'todas' || p.category === cat) && `${p.name} ${p.description}`.toLowerCase().includes(q));
  renderProducts(list);
}

function initCategories(){
  const sel = $('#categoryFilter');
  if(!sel) return;
  const cats = ['todas', ...new Set(safeProducts.map(p => p.category).filter(Boolean))];
  sel.innerHTML = cats.map(c=>`<option value="${c}">${c}</option>`).join('');
}

function bindBaseUI(){
  $('#searchInput')?.addEventListener('input', filterAndRender);
  $('#categoryFilter')?.addEventListener('change', filterAndRender);
  $('#cartToggle')?.addEventListener('click', ()=> $('#cartPanel')?.classList.toggle('open'));
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (typeof products !== "undefined") {
      safeProducts = Array.isArray(products) ? products : [];
      initCategories();
      renderProducts(safeProducts);
      bindBaseUI();
    } else {
      console.error("products no está definido");
      renderProducts([]);
    }
  } catch (e) {
    console.error("Error renderizando productos:", e);
    try { renderProducts(Array.isArray(products) ? products : []); } catch (_) {}
  }
});
