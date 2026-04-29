function renderAdmin(products, onSave) {
  const panel = document.querySelector('#adminPanel');
  const session = getSession();
  if (!session || session.role !== 'admin') { panel.innerHTML = ''; return; }

  panel.innerHTML = `
    <h2>Panel Admin</h2>
    <form id="adminForm" class="admin-form">
      <input id="pName" placeholder="Nombre" required />
      <input id="pPrice" type="number" placeholder="Precio ARS" required />
      <select id="pCat" required><option value="">Categoría</option><option>camisetas</option><option>botines</option><option>pelotas</option><option>shorts</option></select>
      <input id="pImg" placeholder="URL imagen" required />
      <input id="pDesc" placeholder="Descripción" required />
      <button class="btn-primary" type="submit">Guardar producto</button>
    </form>
    <div id="adminTable"></div>`;

  const drawTable = () => {
    document.querySelector('#adminTable').innerHTML = `<table><tr><th>Nombre</th><th>Cat</th><th>Precio</th><th></th></tr>${products.map((p,i)=>`<tr><td>${p.name}</td><td>${p.category}</td><td>${p.finalPrice || p.price}</td><td><button data-del="${i}">Eliminar</button></td></tr>`).join('')}</table>`;
    document.querySelectorAll('[data-del]').forEach(btn=>btn.onclick=()=>{products.splice(Number(btn.dataset.del),1);onSave(products);drawTable();});
  };
  drawTable();

  document.querySelector('#adminForm').onsubmit = (e)=>{
    e.preventDefault();
    const name = document.querySelector('#pName').value.trim();
    const price = Number(document.querySelector('#pPrice').value);
    const category = document.querySelector('#pCat').value;
    const image = document.querySelector('#pImg').value.trim();
    const description = document.querySelector('#pDesc').value.trim();
    if (!name || !price || !category || !image || !description) return alert('Completá todos los campos.');
    products.push({ id:`custom-${Date.now()}`, name, price, finalPrice:price, category, image, description, team:'' });
    onSave(products);
    e.target.reset();
    drawTable();
  };
}
