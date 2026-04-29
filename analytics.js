const Analytics={k:'v2_analytics',data:JSON.parse(localStorage.getItem('v2_analytics')||'{}')};
Analytics.hit=(id,type)=>{Analytics.data[id]=Analytics.data[id]||{v:0,a:0};Analytics.data[id][type]++;localStorage.setItem(Analytics.k,JSON.stringify(Analytics.data));};
Analytics.top=()=>Object.entries(Analytics.data).sort((a,b)=>(b[1].a+b[1].v)-(a[1].a+a[1].v)).slice(0,5);
