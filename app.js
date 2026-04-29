window.addEventListener('error',e=>console.error('JS ERROR',e.message));
let catalog=(Admin.load()||[]).filter(p=>validateProduct(p)).map(p=>({...p,image:p.img})), coupon=null;
const $=s=>document.querySelector(s); const fmt=n=>new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);

function fuzzy(text,q){q=q.toLowerCase();text=text.toLowerCase();if(text.includes(q))return true;return q.split('').every(ch=>text.includes(ch));}
function filtered(){
  const q=$('#q').value||''; const cat=$('#cat').value; const pr=$('#price').value; const onlyO=$('#onlyOffers').checked; const onlyF=$('#onlyFav').checked;
  return catalog.filter(p=>{
    if(cat!=='todas'&&p.category!==cat)return false;
    if(pr==='low'&&p.price>=100000)return false; if(pr==='mid'&&(p.price<100000||p.price>150000))return false; if(pr==='high'&&p.price<=150000)return false;
    if(onlyF&&!Wishlist.has(p.id))return false;
    const final=Discounts.final(p,coupon); if(onlyO&&final>=p.price)return false;
    return fuzzy(`${p.name} ${p.description}`,q);
  });
}
function render(){
  const list=filtered(); const box=$('#products');
  if(!list.length){box.innerHTML='<div class="panel">Sin resultados o productos inválidos filtrados por seguridad.</div>';return;}
  box.innerHTML=list.map((p,i)=>{const fp=Discounts.final(p,coupon); const off=fp<p.price?`<span class='badge'>-${Math.round((1-fp/p.price)*100)}% OFF</span>`:'';Analytics.hit(p.id,'v');
    return `<article class='card' style='animation-delay:${i*40}ms'><img loading='lazy' src='${p.image}' alt='${p.name}'><div class='b'><small>${p.category}</small><h3>${p.name}</h3><p>${p.description}</p>${off}<p><strong>Nuestro: ${fmt(fp)}</strong> <br><s>Referencia: ${fmt(p.referencePrice||p.price)}</s></p><button data-a='${p.id}'>Agregar</button><button data-w='${p.id}'>${Wishlist.has(p.id)?'Quitar ❤':'❤ Favorito'}</button></div></article>`}).join('');
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const p=catalog.find(x=>x.id===b.dataset.a);Cart.add(p);Analytics.hit(p.id,'a');renderCart();toast('Agregado al carrito');});
  document.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{Wishlist.toggle(b.dataset.w);render();renderFav();});
  renderFav(); renderOffers(); renderAnalytics();
}
function renderFav(){const fav=catalog.filter(p=>Wishlist.has(p.id));$('#favGrid').innerHTML=fav.map(p=>`<article class='card'><img src='${p.image}' alt='${p.name}'><div class='b'>${p.name}</div></article>`).join('')||'<p>Sin favoritos</p>';}
function renderOffers(){const offers=catalog.filter(p=>Discounts.final(p,coupon)<p.price);document.getElementById('state').innerHTML=`<div class='panel'>Ofertas activas: ${offers.length}</div>`;}
function renderAnalytics(){const top=Analytics.top();$('#analyticsBox').innerHTML=top.map(([id,v])=>`<p>${id}: vistas ${v.v} · agregados ${v.a}</p>`).join('')||'<p>Sin datos aún</p>';}
function renderCart(){const c=Cart.data;$('#cartCount').textContent=c.reduce((a,i)=>a+i.qty,0);$('#cartItems').innerHTML=c.map(i=>`<div class='panel'><b>${i.name}</b><p>${fmt(Discounts.final(i,coupon))}</p><input data-q='${i.id}' type='number' min='1' value='${i.qty}'><button data-r='${i.id}'>Eliminar</button></div>`).join('')||'<p>Carrito vacío</p>';
  document.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{Cart.rm(b.dataset.r);renderCart();});
  document.querySelectorAll('[data-q]').forEach(i=>i.onchange=()=>{Cart.qty(i.dataset.q,Number(i.value));renderCart();});
  const total=Cart.total(coupon);$('#total').textContent=`Total: ${fmt(total)}`; const lines=c.map(i=>`- ${i.name} x${i.qty}`).join('%0A');$('#wa').href=`https://wa.me/5493425550198?text=Hola%20quiero%20comprar:%0A${lines}%0ATotal:%20${total}`;
}
function initAuth(){const s=Auth.session();$('#authBtn').textContent=s?`Salir (${s.name})`:'Login';$('#authBtn').onclick=()=>{if(Auth.session()){Auth.logout();location.reload();return;}const t=prompt('login/register');const e=prompt('email');const p=prompt('pass');if(t==='register'){const n=prompt('nombre');Auth.register(n,e,p)?toast('Registrado'):toast('Error');}else{Auth.login(e,p)?toast('Login OK'):toast('Credenciales inválidas');}setTimeout(()=>location.reload(),300);};}
function initAdmin(){const s=Auth.session();if(!s||s.role!=='admin')return $('#admin').innerHTML='';$('#admin').innerHTML=`<h3>Admin</h3><form id='af'><input id='an' placeholder='Nombre' required><input id='ap' type='number' placeholder='Precio' required><select id='ac'><option>camisetas</option><option>botines</option><option>pelotas</option><option>shorts</option></select><input id='ai' placeholder='Imagen URL' required><input id='ad' placeholder='Descripción' required><button>Guardar</button></form>`;
$('#af').onsubmit=e=>{e.preventDefault();const p={id:'x'+Date.now(),name:an.value,price:Number(ap.value),category:ac.value,image:ai.value,description:ad.value};if(!Admin.valid(p))return toast('Datos inválidos');catalog.push(p);Admin.save(catalog);render();toast('Producto guardado');};}

function bind(){ $('#q').oninput=render; $('#cat').onchange=render; $('#price').onchange=render; $('#onlyOffers').onchange=render; $('#onlyFav').onchange=render; $('#wishBtn').onclick=()=>document.getElementById('favorites').scrollIntoView(); $('#cartBtn').onclick=()=>$('#cart').classList.toggle('open'); $('#applyCoupon').onclick=()=>{const code=$('#coupon').value.toUpperCase(); const res=Coupons.apply(code,Cart.data,Auth.session()); $('#couponMsg').textContent=res.ok?'Cupón aplicado':'Cupón inválido'; coupon=res.ok?res.c:null; render(); renderCart();};}

document.addEventListener('DOMContentLoaded',()=>{try{$('#cat').innerHTML=`<option value='todas'>Todas</option><option value='camisetas'>Camisetas</option><option value='botines'>Botines</option><option value='pelotas'>Pelotas</option><option value='shorts'>Shorts</option>`;initAuth();initAdmin();bind();render();renderCart();reveal();}catch(e){document.body.innerHTML='<div class="panel">Error cargando tienda. Recargá la página.</div>';console.error(e);}});
