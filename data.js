// Catálogo estricto por categoría + imagen coherente.
const products = [
  {id:'cam-1',name:'Camiseta River Plate Titular 24/25',team:'River',category:'camisetas',price:129999,image:'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=1200&q=80',description:'Original, slim fit y tela respirable.'},
  {id:'cam-2',name:'Camiseta Boca Juniors Titular 24/25',team:'Boca',category:'camisetas',price:129999,image:'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=1200&q=80',description:'Modelo oficial con escudo bordado.'},
  {id:'cam-3',name:'Camiseta Selección Argentina Titular',team:'Argentina',category:'camisetas',price:139999,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',description:'Versión fan con tecnología dry-fit.'},
  {id:'cam-4',name:'Camiseta River Alternativa',team:'River',category:'camisetas',price:119999,image:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',description:'Color alternativo y ajuste regular.'},
  {id:'bot-1',name:'Nike Mercurial Vapor 15',category:'botines',price:189999,image:'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80',description:'Velocidad y reacción en césped natural.'},
  {id:'bot-2',name:'Adidas Predator Accuracy',category:'botines',price:179999,image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',description:'Control superior y golpeo potente.'},
  {id:'bot-3',name:'Puma Future Ultimate',category:'botines',price:169999,image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80',description:'Ajuste dinámico y estabilidad.'},
  {id:'bot-4',name:'Adidas X Crazyfast',category:'botines',price:184999,image:'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80',description:'Explosión para ataque rápido.'},
  {id:'pel-1',name:'Pelota Adidas Al Rihla Pro',category:'pelotas',price:89999,image:'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=1200&q=80',description:'Uso profesional y costura premium.'},
  {id:'pel-2',name:'Pelota Nike Flight Premier',category:'pelotas',price:79999,image:'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80',description:'Trayectoria estable y controlada.'},
  {id:'pel-3',name:'Pelota Puma Orbita 1',category:'pelotas',price:75999,image:'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',description:'Resistencia y tacto homogéneo.'},
  {id:'sho-1',name:'Short River Oficial',category:'shorts',price:69999,image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',description:'Tela ligera para partido y entrenamiento.'},
  {id:'sho-2',name:'Short Boca Oficial',category:'shorts',price:69999,image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',description:'Corte deportivo con gran movilidad.'},
  {id:'sho-3',name:'Short Selección Argentina',category:'shorts',price:74999,image:'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',description:'Confort premium para entrenamiento.'}
];

const DISCOUNTS = [
  {productId:'cam-1',percent:15},
  {productId:'bot-2',percent:12},
  {productId:'pel-1',percent:10},
  {productId:'sho-3',percent:20}
];
