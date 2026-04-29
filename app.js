let catalog = withDiscounts(JSON.parse(localStorage.getItem('sf_products') || JSON.stringify(PRODUCTS)));
let cart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
let appliedCoupon = null;

const $ = s => document.querySelector(s);
const fmt = n => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);

function saveAll(){ localStorage.setItem('sf_products', JSON.stringify(catalog)); localStorage.setItem('sf_cart', JSON.stringify(cart)); }

function renderUser(){
  const user = getSession();
  const box = document.createElement('div');
  box.className='user-box';
  box.innerHTML = user ? `👤 ${user.name} <button id="logoutBtn">Salir</button>` : `<button id="openAuth">Ingresar</button>`;
  document.querySelector('.navbar').appendChild(box);
  if (user) $('#logoutBtn').onclick=()=>{clearSession(); location.reload();};
  else $('#openAuth').onclick=()=>openAuthModal();
}

function openAuthModal(){
  const type = prompt('Escribí: login o register');
  const email = prompt('Email');
  const pass = prompt('Contraseña');
  if(type==='register'){ const name=prompt('Nombre'); const r=registerUser(name,email,pass); alert(r.ok?'Registrado':r.message); }
  if(type==='login'){ const r=loginUser(email,pass); alert(r.ok?'Bienvenido':r.message); }
  location.reload();
}

function renderProducts(){
  const q = $('#searchInput').value.toLowerCase();
  const cat = $('#categoryFilter').value;
  const sort = $('#sortFilter').value;
  let list = catalog.filter(p => (cat==='todas'||p.category===cat) && `${p.name} ${p.description}`.toLowerCase().includes(q));
  if(sort==='price-asc') list.sort((a,b)=>a.finalPrice-b.finalPrice);
  if(sort==='price-desc') list.sort((a,b)=>b.finalPrice-a.finalPrice);
  $('#productGrid').innerHTML = list.map(p=>`<article class="card"><img loading="lazy" src="${p.image}" alt="${p.name}"><div class="card-body"><small>${p.category}</small><h3>${p.name}</h3><p>${p.description}</p>${p.discountPercent?`<span class='badge'>-${p.discountPercent}% OFF</span>`:''}<div class="row"><span class="price">${p.discountPercent?`<s>${fmt(p.price)}</s> ${fmt(p.finalPrice)}`:fmt(p.price)}</span><button class="btn-add" data-id="${p.id}">Agregar</button></div></div></article>`).join('');
  document.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>addToCart(b.dataset.id));
  $('#offersGrid').innerHTML = list.filter(p=>p.discountPercent).map(p=>`<article class='offer-card'><img src='${p.image}' alt='${p.name}'><h4>${p.name}</h4><p>${fmt(p.finalPrice)}</p></article>`).join('');
}

function addToCart(id){
  const user = getSession(); if(!user){alert('Tenés que iniciar sesión para comprar.'); return;}
  const item = catalog.find(p=>p.id===id); const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty += 1; else cart.push({...item, qty:1});
  saveAll(); renderCart(); showToast('Producto agregado');
}

function calcTotal(){
  let subtotal = cart.reduce((a,c)=>a + c.finalPrice*c.qty, 0);
  if(!appliedCoupon) return subtotal;
  const sess = getSession();
  if(appliedCoupon.type==='general') return Math.round(subtotal*0.9);
  if(appliedCoupon.type==='river'){
    const river = cart.filter(i=>(i.team||'').toLowerCase()==='river').reduce((a,c)=>a+c.finalPrice*c.qty,0);
    return subtotal - Math.round(river*0.15);
  }
  if(appliedCoupon.type==='first_purchase' && sess?.orders===0) return Math.round(subtotal*0.8);
  return subtotal;
}

function renderCart(){
  $('#cartCount').textContent = cart.reduce((a,c)=>a+c.qty,0);
  $('#cartItems').innerHTML = cart.length?cart.map((i,idx)=>`<div class='cart-item'><strong>${i.name}</strong><div>${fmt(i.finalPrice)} x <input type='number' min='1' data-q='${idx}' value='${i.qty}'></div><button data-r='${idx}'>Eliminar</button></div>`).join(''):'<p>Vacío</p>';
  document.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.r),1);saveAll();renderCart();});
  document.querySelectorAll('[data-q]').forEach(inp=>inp.onchange=()=>{cart[Number(inp.dataset.q)].qty=Math.max(1,Number(inp.value));saveAll();renderCart();});
  $('#cartTotal').textContent = fmt(calcTotal());
  const msg = buildWhatsAppMessage(cart, calcTotal(), appliedCoupon?.code);
  $('#whatsappBtn').href = `https://wa.me/5493425550198?text=${msg}`;
}

function bind(){
  $('#searchInput').oninput=renderProducts; $('#categoryFilter').onchange=renderProducts; $('#sortFilter').onchange=renderProducts;
  $('#cartToggle').onclick=()=>$('#cartPanel').classList.toggle('open');
  $('#applyCoupon').onclick=()=>{const code=$('#couponInput').value.trim().toUpperCase(); const v=validateCoupon(code, cart, getSession()); if(!v.ok){showToast(v.message,true);return;} appliedCoupon={...v.coupon, code}; showToast('Cupón aplicado'); renderCart();};
}

function showToast(text,err){const t=$('#toast');t.textContent=text;t.style.borderColor=err?'#ff456d':'#2ad980';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400);}

function init(){
  $('#categoryFilter').innerHTML = `<option value='todas'>Todas</option><option value='camisetas'>Camisetas</option><option value='botines'>Botines</option><option value='pelotas'>Pelotas</option><option value='shorts'>Shorts</option>`;
  renderUser(); bind(); renderProducts(); renderCart(); renderAdmin(catalog, (p)=>{catalog=withDiscounts(p); saveAll(); renderProducts();});
}
init();
