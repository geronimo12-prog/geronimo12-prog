import { useEffect, useMemo, useState } from 'react'

type Property = {
  id: number
  title: string
  type: 'Casa' | 'Departamento' | 'Terreno'
  zone: 'Centro' | 'Norte' | 'Sur'
  rooms: number
  price: number
  location: string
  description: string
  details: string
  image: string
  gallery: string[]
  popular?: boolean
}

const WHATSAPP_BASE = 'https://wa.me/549XXXXXXXXXX?text=Hola%20quiero%20consultar%20por%20una%20propiedad'

const properties: Property[] = Array.from({ length: 20 }).map((_, i) => {
  const zones: Property['zone'][] = ['Centro', 'Norte', 'Sur']
  const types: Property['type'][] = ['Casa', 'Departamento', 'Terreno']
  const zone = zones[i % 3]
  const type = types[i % 3]
  const rooms = type === 'Terreno' ? 0 : (i % 5) + 1
  const base = 65000 + i * 8500
  const img = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  ][i % 4]
  return {
    id: i + 1,
    title: `${type} ${zone} ${i + 1}`,
    type,
    zone,
    rooms,
    price: base,
    location: `${zone}, Santa Fe`,
    description: `${type} con excelente potencial de inversión y ubicación estratégica.`,
    details: `Propiedad ${type.toLowerCase()} en zona ${zone.toLowerCase()} con documentación lista para operar.`,
    image: img,
    gallery: [img, 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'],
    popular: i % 4 === 0
  }
})

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [zone, setZone] = useState('Todas')
  const [type, setType] = useState('Todos')
  const [rooms, setRooms] = useState('Todos')
  const [maxPrice, setMaxPrice] = useState(300000)
  const [query, setQuery] = useState('')
  const [fav, setFav] = useState<number[]>([])
  const [compare, setCompare] = useState<number[]>([])
  const [active, setActive] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [budget, setBudget] = useState(120000)
  const [loanAmount, setLoanAmount] = useState(100000)
  const [months, setMonths] = useState(24)

  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t) }, [])

  const filtered = useMemo(() => properties.filter((p) =>
    (zone === 'Todas' || p.zone === zone) &&
    (type === 'Todos' || p.type === type) &&
    (rooms === 'Todos' || String(p.rooms) === rooms) &&
    p.price <= maxPrice &&
    (!query || `${p.type} ${p.description}`.toLowerCase().includes(query.toLowerCase()))
  ), [zone, type, rooms, maxPrice, query])

  const recommended = properties.filter((p) => p.price <= budget).slice(0, 3)
  const monthlyLoan = (loanAmount * (1 + 0.32)) / months

  const colors = theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-900'

  return (
    <div className={`${colors} min-h-screen transition-colors duration-500`}>
      <section id="inicio" className="relative min-h-screen overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" autoPlay loop muted playsInline />
        <div className="relative z-10 min-h-screen flex flex-col px-6 md:px-12 lg:px-16 pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            <div className="text-2xl font-semibold">SF Inmobiliaria</div>
            <div className="hidden md:flex gap-6 text-sm">{['inicio','propiedades','como-funciona','contacto'].map(s => <a key={s} href={`#${s}`} className="hover:text-gray-300">{s.replace('-',' ')}</a>)}</div>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="bg-white text-black px-4 py-2 rounded-lg text-sm">{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</button>
          </nav>
          <div className="flex-1 flex items-end pb-16"><div><h1 className="text-5xl lg:text-7xl" style={{ letterSpacing: '-0.04em' }}>Encontrá tu próximo hogar<br/>en Santa Fe.</h1><p className="mt-4 text-gray-300 max-w-2xl">Propiedades exclusivas y oportunidades únicas para vivir o invertir.</p><div className="mt-6 flex gap-4"><a href="#propiedades" className="bg-white text-black px-8 py-3 rounded-lg">Ver propiedades</a><a href={WHATSAPP_BASE} className="liquid-glass border border-white/20 px-8 py-3 rounded-lg">Hablar por WhatsApp</a></div></div></div>
        </div>
      </section>

      <section id="propiedades" className="px-6 md:px-12 lg:px-16 py-14">
        <h2 className="text-4xl mb-6">Propiedades disponibles en Santa Fe</h2>
        <div className="liquid-glass border border-white/20 rounded-xl p-4 grid md:grid-cols-5 gap-3 mb-6">
          <input placeholder='Busco casa con patio' value={query} onChange={(e)=>setQuery(e.target.value)} className='bg-black/40 border border-white/20 rounded-lg px-3 py-2'/>
          <select value={zone} onChange={(e)=>setZone(e.target.value)} className='bg-black/40 border border-white/20 rounded-lg px-3 py-2'><option>Todas</option><option>Centro</option><option>Norte</option><option>Sur</option></select>
          <select value={type} onChange={(e)=>setType(e.target.value)} className='bg-black/40 border border-white/20 rounded-lg px-3 py-2'><option>Todos</option><option>Casa</option><option>Departamento</option><option>Terreno</option></select>
          <select value={rooms} onChange={(e)=>setRooms(e.target.value)} className='bg-black/40 border border-white/20 rounded-lg px-3 py-2'><option>Todos</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>
          <div className='flex items-center gap-2 text-xs'>USD {maxPrice.toLocaleString()}<input type='range' min={50000} max={300000} step={5000} value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))}/></div>
        </div>
        {loading ? <div className='grid md:grid-cols-4 gap-4'>{Array.from({length:8}).map((_,i)=><div key={i} className='h-56 bg-white/10 animate-pulse rounded-xl'/>)}</div> : <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">{filtered.map(p => <article key={p.id} className='liquid-glass border border-white/20 rounded-xl overflow-hidden hover:-translate-y-1 transition-all'><img src={p.image} className='h-44 w-full object-cover'/><div className='p-4'><p className='text-xs text-gray-300'>{p.type} · {p.zone} · {p.rooms || '-'} amb.</p><p className='text-lg'>USD {p.price.toLocaleString()}</p><p className='text-sm text-gray-300'>{p.location}</p><p className='text-xs text-gray-300 mb-3'>{p.description}</p><div className='flex flex-wrap gap-2'><button onClick={()=>setActive(p)} className='bg-white text-black px-3 py-1 rounded'>Ver</button><a href={`${WHATSAPP_BASE}%20(${encodeURIComponent(p.title)})`} className='liquid-glass border border-white/20 px-3 py-1 rounded'>WhatsApp</a><button onClick={()=>setFav(v=>v.includes(p.id)?v.filter(x=>x!==p.id):[...v,p.id])} className='px-3 py-1 rounded border border-white/20'>{fav.includes(p.id)?'★':'☆'}</button><button onClick={()=>setCompare(v=>v.includes(p.id)?v.filter(x=>x!==p.id):v.length<3?[...v,p.id]:v)} className='px-3 py-1 rounded border border-white/20'>Comparar</button></div>{p.popular && <p className='mt-2 text-[11px] text-emerald-300'>Propiedad popular</p>}</div></article>)}</div>}
      </section>

      <section className='px-6 md:px-12 lg:px-16 py-10 grid lg:grid-cols-2 gap-6'>
        <div className='liquid-glass border border-white/20 rounded-xl p-6'><h3 className='text-2xl mb-3'>Simulador de compra</h3><p>Presupuesto: USD {budget.toLocaleString()}</p><input type='range' min={50000} max={300000} step={5000} value={budget} onChange={(e)=>setBudget(Number(e.target.value))}/><div className='mt-4 space-y-2 text-sm'>{recommended.map(r=><p key={r.id}>{r.title} — USD {r.price.toLocaleString()}</p>)}</div></div>
        <div className='liquid-glass border border-white/20 rounded-xl p-6'><h3 className='text-2xl mb-3'>Simulador de crédito</h3><p>Monto: USD {loanAmount.toLocaleString()}</p><input type='range' min={50000} max={250000} step={5000} value={loanAmount} onChange={(e)=>setLoanAmount(Number(e.target.value))}/><select value={months} onChange={(e)=>setMonths(Number(e.target.value))} className='mt-3 bg-black/40 border border-white/20 rounded px-3 py-2'><option value={12}>12 meses</option><option value={24}>24 meses</option><option value={60}>60 meses</option></select><p className='mt-3'>Cuota estimada: USD {monthlyLoan.toFixed(0)}</p><p className='text-sm text-gray-300'>Interés aproximado anual: 32%</p></div>
      </section>

      <section id='como-funciona' className='px-6 md:px-12 lg:px-16 py-10'><h2 className='text-3xl mb-6'>Cómo funciona</h2><div className='grid md:grid-cols-3 gap-4'>{['Elegí tus filtros','Recibí asesoramiento','Concretá la operación'].map(t=><div key={t} className='liquid-glass border border-white/20 rounded-xl p-6'>{t}</div>)}</div></section>
      <section className='px-6 md:px-12 lg:px-16 py-10'><h2 className='text-3xl mb-6'>Por qué elegirnos</h2><div className='grid md:grid-cols-3 gap-4'>{['Transparencia total','Experiencia local','Acompañamiento legal'].map(t=><div key={t} className='liquid-glass border border-white/20 rounded-xl p-6'>{t}</div>)}</div></section>
      <section className='px-6 md:px-12 lg:px-16 py-10'><h2 className='text-3xl mb-6'>Estadísticas</h2><div className='grid md:grid-cols-3 gap-4'><div className='liquid-glass rounded-xl p-6'>+620 propiedades vendidas</div><div className='liquid-glass rounded-xl p-6'>99% clientes satisfechos</div><div className='liquid-glass rounded-xl p-6'>15 años de experiencia</div></div></section>
      <section className='px-6 md:px-12 lg:px-16 py-10'><h2 className='text-3xl mb-6'>Opiniones de clientes</h2><div className='grid md:grid-cols-3 gap-4'>{['“Servicio impecable.”','“Venta rápida y segura.”','“Excelente asesoramiento.”'].map(t=><div key={t} className='liquid-glass border border-white/20 rounded-xl p-6'>{t}</div>)}</div></section>
      <section className='px-6 md:px-12 lg:px-16 py-10'><h2 className='text-3xl mb-6'>Asesor inmobiliario</h2><div className='liquid-glass border border-white/20 rounded-xl p-6 flex items-center gap-4'><img src='https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=300&q=80' className='w-20 h-20 rounded-full object-cover'/><div><p className='text-xl'>María González</p><p className='text-sm text-gray-300'>Asesora Senior · +54 342 456 7890</p></div></div></section>
      <section id='contacto' className='px-6 md:px-12 lg:px-16 py-10'><div className='liquid-glass border border-white/20 rounded-xl p-4'><iframe title='mapa' src='https://www.google.com/maps?q=Santa+Fe,+Argentina&output=embed' className='w-full h-[360px]'/></div></section>
      <section className='px-6 md:px-12 lg:px-16 py-10'><h2 className='text-3xl mb-6'>Legal</h2><div className='grid md:grid-cols-3 gap-4 text-sm text-gray-300'><div className='liquid-glass p-4 rounded-xl'>Términos y condiciones de uso de plataforma y reservas.</div><div className='liquid-glass p-4 rounded-xl'>Política de privacidad y tratamiento de datos personales.</div><div className='liquid-glass p-4 rounded-xl'>Aviso legal inmobiliario: información sujeta a verificación documental.</div></div></section>

      {active && <div className='fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4' onClick={()=>setActive(null)}><div className='liquid-glass border border-white/20 rounded-2xl max-w-4xl w-full p-6' onClick={(e)=>e.stopPropagation()}><div className='grid md:grid-cols-2 gap-5'><div className='space-y-3'>{active.gallery.map(g=><img key={g} src={g} className='w-full h-44 object-cover rounded-xl'/>)}</div><div><h3 className='text-2xl'>{active.title}</h3><p className='text-3xl my-2'>USD {active.price.toLocaleString()}</p><p className='text-gray-300 mb-2'>{active.details}</p><p className='text-sm text-gray-300'>Datos técnicos: {active.rooms || 0} ambientes · {active.zone} · {active.type}</p><a href={`${WHATSAPP_BASE}%20(${encodeURIComponent(active.title)})`} className='mt-4 inline-block bg-white text-black px-5 py-2 rounded-lg'>Consultar por WhatsApp</a></div></div></div></div>}

      {compare.length > 1 && <div className='fixed left-6 bottom-6 z-50 liquid-glass border border-white/20 rounded-xl p-4 text-sm'>Comparador activo: {compare.map(id => properties.find(p=>p.id===id)?.title).join(' vs ')}</div>}
      <div className='fixed top-24 right-6 z-50 space-y-2 text-xs'><div className='liquid-glass px-3 py-2 rounded-lg'>Alguien está viendo esta propiedad</div><div className='liquid-glass px-3 py-2 rounded-lg'>Consulta reciente en zona norte</div></div>
      <a href='https://wa.me/549XXXXXXXXXX?text=Hola%20soy%20nuevo%20en%20la%20web%20y%20quiero%20asesoramiento%20inicial' className='fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-full font-medium animate-pulse'>Chat WhatsApp</a>
      <div className='fixed bottom-24 right-6 z-50 liquid-glass rounded-xl p-3 text-xs'>Asesor online: ¡Hola! ¿Querés que te recomiende propiedades ahora?</div>
    </div>
  )
}
