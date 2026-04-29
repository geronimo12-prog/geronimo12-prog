const Analytics={k:'v3_analytics',d:JSON.parse(localStorage.getItem('v3_analytics')||'{}')};
Analytics.hit=(id,t)=>{Analytics.d[id]=Analytics.d[id]||{v:0,a:0};Analytics.d[id][t]++;localStorage.setItem(Analytics.k,JSON.stringify(Analytics.d));};
