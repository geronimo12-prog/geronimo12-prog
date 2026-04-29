import { useEffect, useMemo, useState } from 'react'

type FadeInProps = { children: React.ReactNode; delay?: number; duration?: number; className?: string }
function FadeIn({ children, delay = 0, duration = 1000, className = '' }: FadeInProps) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [delay])
  return <div className={`transition-opacity ${className}`} style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}>{children}</div>
}

function AnimatedHeading({ text, charDelay = 30 }: { text: string; charDelay?: number }) {
  const [visible, setVisible] = useState(false)
  const lines = text.split('\n')
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t) }, [])
  return <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4" style={{ letterSpacing: '-0.04em' }}>{lines.map((line, lineIndex) => <div key={lineIndex}>{line.split('').map((char, charIndex) => { const delay = lineIndex * line.length * charDelay + charIndex * charDelay; return <span key={`${lineIndex}-${charIndex}`} className="inline-block" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-18px)', transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms` }}>{char === ' ' ? '\u00A0' : char}</span> })}</div>)}</h1>
}

type Property = { id: number; type: 'Casa' | 'Departamento' | 'Terreno'; zone: 'Zona Norte' | 'Zona Sur' | 'Zona Centro'; image: string; gallery: string[]; price: number; location: string; description: string; fullDescription: string; lat: number; lng: number }
const properties: Property[] = [
  { id: 1, type: 'Casa', zone: 'Zona Norte', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', gallery: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80'], price: 185000, location: 'Candioti Norte, Santa Fe', description: 'Casa de 3 dormitorios con patio verde y cochera doble.', fullDescription: 'Propiedad familiar en zona residencial premium con ambientes amplios, cocina integrada, patio parquizado y cochera para dos vehículos.', lat: -31.617, lng: -60.694 },
  { id: 2, type: 'Departamento', zone: 'Zona Norte', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', gallery: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'], price: 138000, location: 'Guadalupe, Santa Fe', description: 'Unidad moderna con balcón aterrazado.', fullDescription: 'Departamento a estrenar con diseño contemporáneo, balcón corrido, amenities y excelente conectividad urbana.', lat: -31.624, lng: -60.682 },
  { id: 3, type: 'Terreno', zone: 'Zona Norte', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', gallery: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'], price: 72000, location: 'Country Los Molinos', description: 'Lote de 900 m² ideal para vivienda premium.', fullDescription: 'Terreno con gran frente y orientación ideal para construir vivienda de categoría en entorno consolidado.', lat: -31.588, lng: -60.72 },
  { id: 4, type: 'Casa', zone: 'Zona Sur', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', gallery: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'], price: 162000, location: 'Barrio Sur, Santa Fe', description: 'Diseño contemporáneo, quincho y pileta.', fullDescription: 'Casa de estilo minimalista con terminaciones premium, quincho cubierto y piscina climatizada.', lat: -31.652, lng: -60.708 },
  { id: 5, type: 'Departamento', zone: 'Zona Sur', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80', gallery: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'], price: 119500, location: 'Centro Sur, Rosario', description: '2 ambientes premium con amenities.', fullDescription: 'Departamento ideal para renta o primera vivienda, con amenities completos y seguridad permanente.', lat: -32.959, lng: -60.639 },
  { id: 6, type: 'Terreno', zone: 'Zona Sur', image: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=1200&q=80', gallery: ['https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=1200&q=80'], price: 55000, location: 'Santo Tomé', description: 'Terreno en esquina con rápida salida.', fullDescription: 'Lote con excelente accesibilidad para desarrollo o casa de fin de semana.', lat: -31.669, lng: -60.766 },
]
const whatsappLink = 'https://wa.me/549XXXXXXXXXX?text=Hola%20quiero%20consultar%20por%20una%20propiedad'

export default function App() {
  const [zone, setZone] = useState('Todas')
  const [type, setType] = useState('Todos')
  const [maxPrice, setMaxPrice] = useState(300000)
  const [active, setActive] = useState<Property | null>(null)
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => { const onScroll = () => setScrollY(window.scrollY); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])

  const filtered = useMemo(() => properties.filter((p) => (zone === 'Todas' || p.zone === zone) && (type === 'Todos' || p.type === type) && p.price <= maxPrice), [zone, type, maxPrice])
  const whatsappPrefill = `${whatsappLink}%20(${active?.location ?? 'propiedad'})`

  return <div className="min-h-screen bg-black text-white font-sans">
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" style={{ transform: `scale(${1 + Math.min(scrollY * 0.00012, 0.08)})` }} src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" autoPlay loop muted playsInline />
      <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: `blur(${Math.min(scrollY / 400, 1.2)}px)` }} />
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="px-6 md:px-12 lg:px-16 pt-6"><nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between"><div className="text-2xl font-semibold tracking-tight">SF Inmobiliaria</div><div className="hidden md:flex items-center gap-8 text-sm">{[['Inicio', '#inicio'], ['Propiedades', '#propiedades'], ['Nosotros', '#nosotros'], ['Contacto', '#contacto']].map(([i, h]) => <a key={i} href={h} className="hover:text-gray-300 transition-colors">{i}</a>)}</div><a href="#contacto" className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Consultar</a></nav></div>
        <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16"><div className="lg:grid lg:grid-cols-2 lg:items-end gap-8"><div><AnimatedHeading text={'Encontrá tu próximo hogar\nen Santa Fe.'} /><FadeIn delay={800}><p className="text-base md:text-lg text-gray-300 mb-5 max-w-2xl">Propiedades exclusivas y oportunidades únicas para vivir o invertir.</p></FadeIn><FadeIn delay={1200}><div className="flex flex-wrap gap-4"><a href="#propiedades" className="bg-white text-black px-8 py-3 rounded-lg font-medium">Ver propiedades</a><a href={whatsappLink} target="_blank" rel="noreferrer" className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">Hablar por WhatsApp</a></div></FadeIn></div><FadeIn delay={1400} className="flex items-end justify-start lg:justify-end mt-6 lg:mt-0"><div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl text-lg md:text-xl lg:text-2xl font-light">Compra. Venta. Inversión.</div></FadeIn></div></div>
      </div>
    </section>

    <section id="propiedades" className="px-6 md:px-12 lg:px-16 py-16 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-normal mb-6">Propiedades disponibles en Santa Fe</h2>
      <div className="grid md:grid-cols-3 gap-3 mb-8 liquid-glass border border-white/20 p-4 rounded-xl">
        <select value={zone} onChange={(e) => setZone(e.target.value)} className="bg-black/40 border border-white/20 rounded-lg px-3 py-2"><option>Todas</option><option>Zona Norte</option><option>Zona Sur</option><option>Zona Centro</option></select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="bg-black/40 border border-white/20 rounded-lg px-3 py-2"><option>Todos</option><option>Casa</option><option>Departamento</option><option>Terreno</option></select>
        <div className="flex items-center gap-3"><span className="text-sm text-gray-300">Hasta USD {maxPrice.toLocaleString()}</span><input type="range" min={50000} max={300000} step={5000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" /></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => <article key={p.id} onClick={() => setActive(p)} className="cursor-pointer liquid-glass border border-white/20 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10"><img src={p.image} alt={p.location} className="w-full h-52 object-cover transition-transform duration-700 hover:scale-110" /><div className="p-5 space-y-2"><p className="text-xs text-gray-300 uppercase tracking-wide">{p.type} · {p.zone}</p><p className="text-xl font-medium">USD {p.price.toLocaleString()}</p><p className="text-gray-300">{p.location}</p><p className="text-sm text-gray-300">{p.description}</p></div></article>)}
      </div>
    </section>

    <section className="px-6 md:px-12 lg:px-16 py-10"><h2 className="text-3xl font-normal mb-6">Cómo funciona</h2><div className="grid md:grid-cols-3 gap-6">{['1. Contanos qué buscás', '2. Seleccionamos oportunidades', '3. Cerramos tu operación'].map((t) => <div key={t} className="liquid-glass border border-white/20 rounded-xl p-6">{t}</div>)}</div></section>
    <section className="px-6 md:px-12 lg:px-16 py-10"><h2 className="text-3xl font-normal mb-6">Estadísticas</h2><div className="grid md:grid-cols-3 gap-6">{[['+450', 'Operaciones'], ['98%', 'Clientes satisfechos'], ['+12', 'Años en el mercado']].map(([n, l]) => <div key={n} className="liquid-glass border border-white/20 rounded-xl p-6 text-center"><p className="text-4xl font-light">{n}</p><p className="text-gray-300">{l}</p></div>)}</div></section>
    <section id="nosotros" className="px-6 md:px-12 lg:px-16 py-10 scroll-mt-24"><div className="liquid-glass border border-white/20 rounded-xl p-8 max-w-4xl"><h2 className="text-3xl font-normal mb-4">Quiénes somos</h2><p className="text-gray-300 leading-relaxed">En SF Inmobiliaria brindamos asesoramiento integral para clientes que buscan vivir mejor o invertir con seguridad en Santa Fe y Rosario.</p></div></section>
    <section className="px-6 md:px-12 lg:px-16 py-10"><h2 className="text-3xl font-normal mb-6">Opiniones de clientes</h2><div className="grid md:grid-cols-3 gap-6">{['“Vendimos rápido y al mejor precio.”', '“Muy profesionales y cercanos.”', '“Excelente experiencia de inversión.”'].map((t) => <blockquote key={t} className="liquid-glass border border-white/20 rounded-xl p-6 text-gray-300">{t}</blockquote>)}</div></section>
    <section id="contacto" className="px-6 md:px-12 lg:px-16 py-10 pb-24 scroll-mt-24"><div className="grid lg:grid-cols-2 gap-6"><div className="liquid-glass border border-white/20 rounded-xl p-8"><h2 className="text-3xl font-normal mb-6">Contacto</h2><form className="space-y-4"><input className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3" placeholder="Nombre" /><input className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3" placeholder="Email" type="email" /><textarea className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3 min-h-28" placeholder="Mensaje" /><a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium">Enviar por WhatsApp</a></form></div><div className="liquid-glass border border-white/20 rounded-xl overflow-hidden min-h-[420px]"><iframe title="Mapa Santa Fe" src="https://www.google.com/maps?q=Santa+Fe,+Argentina&output=embed" className="w-full h-full min-h-[420px]" loading="lazy" /></div></div></section>

    {active && <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActive(null)}><div className="liquid-glass border border-white/20 rounded-2xl max-w-4xl w-full p-6" onClick={(e) => e.stopPropagation()}><div className="grid md:grid-cols-2 gap-6"><div className="space-y-3">{active.gallery.map((img) => <img key={img} src={img} className="w-full h-44 object-cover rounded-xl" />)}</div><div><h3 className="text-2xl mb-2">{active.type} · {active.location}</h3><p className="text-3xl font-light mb-3">USD {active.price.toLocaleString()}</p><p className="text-gray-300 mb-5">{active.fullDescription}</p><a href={whatsappPrefill} target="_blank" rel="noreferrer" className="bg-white text-black px-6 py-3 rounded-lg font-medium inline-block">Consultar por WhatsApp</a></div></div></div></div>}

    <a href="https://wa.me/549XXXXXXXXXX?text=Hola%20soy%20nuevo%20en%20la%20web%20y%20quiero%20asesoramiento%20inicial" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-full font-medium shadow-lg hover:bg-gray-100 transition-all animate-pulse">WhatsApp</a>
  </div>
}
