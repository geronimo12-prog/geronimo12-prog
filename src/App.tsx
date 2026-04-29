import { useEffect, useMemo, useState } from 'react'

type FadeInProps = {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

function FadeIn({ children, delay = 0, duration = 1000, className = '' }: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transition-opacity ${className}`} style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  )
}

function AnimatedHeading({ text, charDelay = 30 }: { text: string; charDelay?: number }) {
  const [visible, setVisible] = useState(false)
  const lines = text.split('\n')

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4" style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {line.split('').map((char, charIndex) => {
            const delay = lineIndex * line.length * charDelay + charIndex * charDelay
            return (
              <span
                key={`${lineIndex}-${charIndex}`}
                className="inline-block"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-18px)',
                  transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            )}
          )}
        </div>
      ))}
    </h1>
  )
}

type Property = { type: string; zone: 'Zona Norte' | 'Zona Sur' | 'Zona Centro'; image: string; price: string; location: string; description: string }

const properties: Property[] = [
  { type: 'Casa', zone: 'Zona Norte', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', price: 'USD 185,000', location: 'Candioti Norte, Santa Fe', description: 'Casa de 3 dormitorios con patio verde y cochera doble.' },
  { type: 'Departamento', zone: 'Zona Norte', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', price: 'ARS 138.000.000', location: 'Guadalupe, Santa Fe', description: 'Unidad moderna con balcón aterrazado y excelente luz natural.' },
  { type: 'Terreno', zone: 'Zona Norte', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', price: 'USD 72,000', location: 'Country Los Molinos', description: 'Lote de 900 m² ideal para vivienda premium.' },
  { type: 'Casa', zone: 'Zona Sur', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', price: 'USD 162,000', location: 'Barrio Sur, Santa Fe', description: 'Diseño contemporáneo, quincho y pileta en lote propio.' },
  { type: 'Departamento', zone: 'Zona Sur', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80', price: 'ARS 119.500.000', location: 'Centro Sur, Rosario', description: '2 ambientes premium con amenities y seguridad 24 hs.' },
  { type: 'Terreno', zone: 'Zona Sur', image: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=1200&q=80', price: 'USD 55,000', location: 'Santo Tomé', description: 'Terreno en esquina con rápida salida a autopista.' },
  { type: 'Casa', zone: 'Zona Centro', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80', price: 'USD 210,000', location: 'Centro, Santa Fe', description: 'Propiedad renovada con 4 dormitorios y terraza equipada.' },
  { type: 'Departamento', zone: 'Zona Centro', image: 'https://images.unsplash.com/photo-1600607687645-c7171b424990?auto=format&fit=crop&w=1200&q=80', price: 'ARS 146.000.000', location: 'Microcentro, Rosario', description: 'Semipiso con vista panorámica y terminaciones premium.' },
  { type: 'Terreno', zone: 'Zona Centro', image: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&w=1200&q=80', price: 'USD 89,000', location: 'Bv. Gálvez, Santa Fe', description: 'Excelente lote para desarrollo inmobiliario en zona estratégica.' },
  { type: 'Casa', zone: 'Zona Norte', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', price: 'USD 240,000', location: 'Funes Hills, Rosario', description: 'Casa a estrenar con jardín, galería y parrillero.' },
  { type: 'Departamento', zone: 'Zona Sur', image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1200&q=80', price: 'ARS 98.000.000', location: 'Barrio Martin, Rosario', description: 'Departamento reciclado con excelente renta potencial.' },
  { type: 'Terreno', zone: 'Zona Centro', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80', price: 'USD 64,000', location: 'Recreo, Santa Fe', description: 'Lote listo para escriturar con servicios completos.' }
]

const whatsappLink = 'https://wa.me/549XXXXXXXXXX?text=Hola%20quiero%20consultar%20por%20una%20propiedad'
const zones = ['Todas', 'Zona Norte', 'Zona Sur', 'Zona Centro'] as const

export default function App() {
  const [zone, setZone] = useState<(typeof zones)[number]>('Todas')

  const filtered = useMemo(() => (zone === 'Todas' ? properties : properties.filter((p) => p.zone === zone)), [zone])

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <section id="inicio" className="relative min-h-screen">
        <video className="absolute inset-0 w-full h-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" autoPlay loop muted playsInline />
        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="px-6 md:px-12 lg:px-16 pt-6">
            <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
              <div className="text-2xl font-semibold tracking-tight">SF Inmobiliaria</div>
              <div className="hidden md:flex items-center gap-8 text-sm">
                {[
                  ['Inicio', '#inicio'],
                  ['Propiedades', '#propiedades'],
                  ['Nosotros', '#nosotros'],
                  ['Contacto', '#contacto']
                ].map(([item, href]) => (
                  <a key={item} href={href} className="hover:text-gray-300 transition-colors">{item}</a>
                ))}
              </div>
              <a href="#contacto" className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">Consultar</a>
            </nav>
          </div>
          <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
            <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
              <div>
                <AnimatedHeading text={'Encontrá tu próximo hogar\nen Santa Fe.'} />
                <FadeIn delay={800} duration={1000}><p className="text-base md:text-lg text-gray-300 mb-5 max-w-2xl">Propiedades exclusivas y oportunidades únicas para vivir o invertir.</p></FadeIn>
                <FadeIn delay={1200} duration={1000}><div className="flex flex-wrap gap-4"><a href="#propiedades" className="bg-white text-black px-8 py-3 rounded-lg font-medium">Ver propiedades</a><a href={whatsappLink} target="_blank" rel="noreferrer" className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">Hablar por WhatsApp</a></div></FadeIn>
              </div>
              <FadeIn delay={1400} duration={1000} className="flex items-end justify-start lg:justify-end mt-6 lg:mt-0"><div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl text-lg md:text-xl lg:text-2xl font-light">Compra. Venta. Inversión.</div></FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section id="propiedades" className="px-6 md:px-12 lg:px-16 py-16 scroll-mt-24">
        <h2 className="text-3xl md:text-4xl font-normal mb-6">Propiedades disponibles en Santa Fe</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {zones.map((z) => <button key={z} onClick={() => setZone(z)} className={`px-4 py-2 rounded-lg border border-white/20 transition-all ${zone === z ? 'bg-white text-black' : 'liquid-glass hover:bg-white hover:text-black'}`}>{z}</button>)}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <article key={`${property.location}-${property.price}`} className="liquid-glass border border-white/20 rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <img src={property.image} alt={property.location} className="w-full h-52 object-cover" />
              <div className="p-5 space-y-3">
                <p className="text-xs text-gray-300 uppercase tracking-wide">{property.type} · {property.zone}</p>
                <p className="text-xl font-medium">{property.price}</p>
                <p className="text-gray-300">{property.location}</p>
                <p className="text-sm text-gray-300">{property.description}</p>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-medium">Consultar por WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-16 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            'Asesoramiento experto en compra, venta e inversión con enfoque en resultados.',
            'Selección curada de propiedades con análisis de valor real de mercado.',
            'Gestión ágil y transparente desde la primera consulta hasta la escritura.'
          ].map((text) => <div key={text} className="liquid-glass border border-white/20 rounded-xl p-6 text-gray-300">{text}</div>)}
        </div>
      </section>

      <section id="nosotros" className="px-6 md:px-12 lg:px-16 py-10 scroll-mt-24">
        <div className="liquid-glass border border-white/20 rounded-xl p-8 max-w-4xl">
          <h2 className="text-3xl font-normal mb-4">Quiénes somos</h2>
          <p className="text-gray-300 leading-relaxed">En SF Inmobiliaria brindamos asesoramiento integral para clientes que buscan vivir mejor o invertir con seguridad en Santa Fe y Rosario. Combinamos experiencia comercial, análisis de mercado y una atención personalizada para lograr operaciones confiables, eficientes y rentables.</p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-16 py-10">
        <h2 className="text-3xl font-normal mb-6">Opiniones de clientes</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            '“Vendimos nuestra casa en menos de 45 días y con excelente valor.” — Familia R.',
            '“Muy profesionales, claros y rápidos en cada paso del proceso.” — Martín G.',
            '“Encontramos una inversión ideal con renta inmediata. Gran equipo.” — Lucía P.'
          ].map((text) => <blockquote key={text} className="liquid-glass border border-white/20 rounded-xl p-6 text-gray-300">{text}</blockquote>)}
        </div>
      </section>

      <section id="contacto" className="px-6 md:px-12 lg:px-16 py-10 pb-24 scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="liquid-glass border border-white/20 rounded-xl p-8">
            <h2 className="text-3xl font-normal mb-6">Contacto</h2>
            <form className="space-y-4"><input className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3" placeholder="Nombre" /><input className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3" placeholder="Email" type="email" /><textarea className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3 min-h-28" placeholder="Mensaje" /><button type="button" className="bg-white text-black px-6 py-3 rounded-lg font-medium">Enviar consulta</button></form>
            <div className="mt-6 text-gray-300 space-y-1 text-sm"><p>Tel: +54 342 456 7890</p><p>Email: contacto@sfinmobiliaria.com.ar</p><p>Dirección: Bv. Gálvez 1450, Santa Fe, Argentina</p></div>
          </div>
          <div className="liquid-glass border border-white/20 rounded-xl overflow-hidden min-h-[420px]"><iframe title="Mapa Santa Fe" src="https://www.google.com/maps?q=Santa+Fe,+Argentina&output=embed" className="w-full h-full min-h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>

      <a href={whatsappLink} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-full font-medium shadow-lg hover:bg-gray-100 transition-all animate-pulse">WhatsApp</a>
    </div>
  )
}
