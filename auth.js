const Auth={u:'v3_users',s:'v3_session'};
Auth.users=()=>JSON.parse(localStorage.getItem(Auth.u)||'[]'); Auth.session=()=>JSON.parse(localStorage.getItem(Auth.s)||'null');
Auth.register=(name,email,pass)=>{const us=Auth.users();if(us.some(x=>x.email===email))return false;const nu={id:Date.now(),name,email,pass,role:email.includes('admin')?'admin':'user',orders:0};us.push(nu);localStorage.setItem(Auth.u,JSON.stringify(us));localStorage.setItem(Auth.s,JSON.stringify(nu));return true;};
Auth.login=(email,pass)=>{const u=Auth.users().find(x=>x.email===email&&x.pass===pass);if(!u)return false;localStorage.setItem(Auth.s,JSON.stringify(u));return true;};
Auth.logout=()=>localStorage.removeItem(Auth.s);
