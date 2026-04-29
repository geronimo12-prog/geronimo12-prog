function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1200);}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('v')),{threshold:.1});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));}
