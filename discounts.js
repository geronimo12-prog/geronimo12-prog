const Discounts={rules:{camisetas:10,botines:8}};
Discounts.final=(p,coupon)=>{let price=p.price;const cat=Discounts.rules[p.category]||0;price=Math.round(price*(1-cat/100));if(coupon?.t==='all')price=Math.round(price*(1-coupon.p/100));if(coupon?.t==='river'&&p.team==='river')price=Math.round(price*(1-coupon.p/100));if(coupon?.t==='first')price=Math.round(price*(1-coupon.p/100));return price;};
