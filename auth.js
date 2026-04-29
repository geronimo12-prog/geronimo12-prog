const AUTH_KEY = 'sf_users';
const SESSION_KEY = 'sf_session';

function getUsers() { return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]'); }
function saveUsers(users) { localStorage.setItem(AUTH_KEY, JSON.stringify(users)); }
function getSession() { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
function setSession(user) { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }

function registerUser(name, email, pass) {
  const users = getUsers();
  if (users.some(u => u.email === email)) return { ok:false, message:'Email ya registrado' };
  const user = { id: crypto.randomUUID(), name, email, pass, orders:0, role: email.includes('admin') ? 'admin' : 'user' };
  users.push(user); saveUsers(users); setSession({ id:user.id, name:user.name, email:user.email, orders:user.orders, role:user.role });
  return { ok:true };
}

function loginUser(email, pass) {
  const user = getUsers().find(u => u.email===email && u.pass===pass);
  if (!user) return { ok:false, message:'Credenciales inválidas' };
  setSession({ id:user.id, name:user.name, email:user.email, orders:user.orders, role:user.role });
  return { ok:true };
}
