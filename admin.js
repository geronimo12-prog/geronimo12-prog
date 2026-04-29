const Admin={k:'v2_products'};
Admin.load=()=>JSON.parse(localStorage.getItem(Admin.k)||'null')||products;
Admin.save=(list)=>localStorage.setItem(Admin.k,JSON.stringify(list));
Admin.valid=(p)=>p.name&&p.image&&p.category&&p.price>0;
