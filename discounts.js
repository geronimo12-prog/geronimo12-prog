const Discounts={byCategory:{camisetas:8,botines:10,pelotas:5,shorts:7}};
Discounts.apply=(p)=>Math.round(p.price*(1-(Discounts.byCategory[p.category]||0)/100));
