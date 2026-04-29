const Coupons={SPORT10:{t:'all',p:10},RIVER15:{t:'river',p:15},BIENVENIDO20:{t:'first',p:20}};
Coupons.apply=(code,cart,user)=>{const c=Coupons[code];if(!c)return{ok:false,m:'Cupón inválido'};if(c.t==='river'&&!cart.some(i=>i.team==='river'))return{ok:false,m:'Requiere River'};if(c.t==='first'&&user&&user.orders>0)return{ok:false,m:'Solo primera compra'};return{ok:true,c};};
