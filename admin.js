const Admin={k:'v3_products'};
Admin.load=()=>JSON.parse(localStorage.getItem(Admin.k)||'null')||products;
Admin.save=l=>localStorage.setItem(Admin.k,JSON.stringify(l));
Admin.valid=p=>isValidProduct({...p,referencePrice:p.referencePrice||p.price,img:p.img||p.image});
