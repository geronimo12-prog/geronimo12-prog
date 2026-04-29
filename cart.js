const Cart={k:'v2_cart',data:JSON.parse(localStorage.getItem('v2_cart')||'[]')};
Cart.save=()=>localStorage.setItem(Cart.k,JSON.stringify(Cart.data));
Cart.add=(p)=>{const f=Cart.data.find(i=>i.id===p.id);f?f.qty++:Cart.data.push({...p,qty:1});Cart.save();};
Cart.rm=(id)=>{Cart.data=Cart.data.filter(i=>i.id!==id);Cart.save();};
Cart.qty=(id,q)=>{const f=Cart.data.find(i=>i.id===id);if(f){f.qty=Math.max(1,q);Cart.save();}};
Cart.total=(coupon)=>Cart.data.reduce((a,c)=>a + Discounts.final(c,coupon)*c.qty,0);
