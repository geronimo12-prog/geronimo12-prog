const Wishlist={k:'v2_wish',ids:new Set(JSON.parse(localStorage.getItem('v2_wish')||'[]'))};
Wishlist.toggle=id=>{Wishlist.ids.has(id)?Wishlist.ids.delete(id):Wishlist.ids.add(id);localStorage.setItem(Wishlist.k,JSON.stringify([...Wishlist.ids]));};
Wishlist.has=id=>Wishlist.ids.has(id);
