// Dataset curado manualmente (sin scraping runtime)
const products = [
  {id:'cam-riv-24',name:'Camiseta River Titular 2024',category:'camisetas',price:45000,referencePrice:52000,img:'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=1200&q=80',description:'Camiseta oficial titular River Plate.',team:'river'},
  {id:'cam-boc-24',name:'Camiseta Boca Titular 2024',category:'camisetas',price:44900,referencePrice:51900,img:'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=1200&q=80',description:'Modelo oficial titular Boca Juniors.',team:'boca'},
  {id:'cam-arg-24',name:'Camiseta Selección Argentina 2024',category:'camisetas',price:47900,referencePrice:54900,img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',description:'Versión fan albiceleste.',team:'argentina'},
  {id:'bot-nk-1',name:'Nike Mercurial Vapor 15',category:'botines',price:89900,referencePrice:99900,img:'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80',description:'Botín de velocidad para césped natural.'},
  {id:'bot-ad-1',name:'Adidas Predator Accuracy',category:'botines',price:86900,referencePrice:95900,img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',description:'Control y precisión en cada toque.'},
  {id:'bot-pm-1',name:'Puma Future Ultimate',category:'botines',price:82900,referencePrice:91900,img:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',description:'Ajuste dinámico y estabilidad.'},
  {id:'pel-ad-1',name:'Pelota Adidas Al Rihla Pro',category:'pelotas',price:35900,referencePrice:42900,img:'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=1200&q=80',description:'Pelota profesional de competencia.'},
  {id:'pel-nk-1',name:'Pelota Nike Flight',category:'pelotas',price:32900,referencePrice:39900,img:'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80',description:'Vuelo estable y gran control.'},
  {id:'sho-riv-1',name:'Short River Oficial',category:'shorts',price:24900,referencePrice:29900,img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',description:'Short oficial de entrenamiento.'},
  {id:'sho-boc-1',name:'Short Boca Oficial',category:'shorts',price:24900,referencePrice:29900,img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',description:'Short oficial versión match.'}
];

const ALLOWED_CATEGORIES = ['camisetas','botines','pelotas','shorts'];

function validateProduct(p){
  return p && p.id && p.name && ALLOWED_CATEGORIES.includes(p.category) && Number(p.price)>0 && Number(p.referencePrice)>0 && typeof p.img==='string' && p.img.startsWith('http');
}
