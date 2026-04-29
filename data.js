const CATEGORIES=['camisetas','botines','pelotas','shorts'];
const products=[
{id:'cam-riv-tit',name:'Camiseta River Titular 2024',category:'camisetas',price:45000,referencePrice:52000,img:'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=1200&q=80',description:'Modelo oficial River Plate 24/25',team:'river'},
{id:'cam-boc-tit',name:'Camiseta Boca Titular 2024',category:'camisetas',price:44900,referencePrice:51900,img:'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=1200&q=80',description:'Modelo oficial Boca Juniors 24/25',team:'boca'},
{id:'cam-arg-tit',name:'Camiseta Selección Argentina',category:'camisetas',price:47900,referencePrice:54900,img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',description:'Versión fan albiceleste',team:'argentina'},
{id:'bot-nk-vap',name:'Botines Nike Mercurial Vapor',category:'botines',price:89900,referencePrice:99900,img:'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80',description:'Velocidad y reacción'},
{id:'bot-ad-pred',name:'Botines Adidas Predator',category:'botines',price:86900,referencePrice:95900,img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',description:'Control total en cancha'},
{id:'pel-ad-pro',name:'Pelota Adidas Pro',category:'pelotas',price:35900,referencePrice:42900,img:'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=1200&q=80',description:'Pelota profesional de partido'},
{id:'pel-nk-flight',name:'Pelota Nike Flight',category:'pelotas',price:32900,referencePrice:39900,img:'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80',description:'Vuelo estable y preciso'},
{id:'sho-riv',name:'Short River Oficial',category:'shorts',price:24900,referencePrice:29900,img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',description:'Short match de entrenamiento'},
{id:'sho-boc',name:'Short Boca Oficial',category:'shorts',price:24900,referencePrice:29900,img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',description:'Short oficial con ajuste regular'}
];
function isValidProduct(p){return p&&p.id&&p.name&&CATEGORIES.includes(p.category)&&p.price>0&&p.referencePrice>0&&typeof p.img==='string'&&p.img.startsWith('http');}
