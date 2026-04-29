const Cart={k:'v3_cart',items:JSON.parse(localStorage.getItem('v3_cart')||'[]')};
Cart.save=()=>localStorage.setItem(Cart.k,JSON.stringify(Cart.items));
Cart.add=p=>{const f=Cart.items.find(i=>i.id===p.id);f?f.qty++:Cart.items.push({...p,qty:1});Cart.save();};
Cart.remove=id=>{Cart.items=Cart.items.filter(i=>i.id!==id);Cart.save();};
Cart.setQty=(id,q)=>{const f=Cart.items.find(i=>i.id===id);if(f){f.qty=Math.max(1,q);Cart.save();}};
