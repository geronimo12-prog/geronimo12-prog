import { useEffect, useState } from 'react'

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
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`
      }}
    >
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
            )
          })}
        </div>
      ))}
    </h1>
  )
}

const properties = [
  {
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    price: 'USD 185,000',
    location: 'Santa Fe Capital',
    description: 'Casa de 3 dormitorios con patio, cochera y excelente iluminación natural.'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    price: 'ARS 145.000.000',
    location: 'Rosario Centro',
    description: 'Departamento premium con balcón amplio, amenities y seguridad 24 hs.'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    price: 'USD 240,000',
    location: 'Santa Fe - Guadalupe',
    description: 'Propiedad moderna lista para habitar, ideal para familia o inversión.'
  }
]

const whatsappLink =
  'https://wa.me/549XXXXXXXXXX?text=Hola%20quiero%20consultar%20por%20una%20propiedad'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <section className="relative min-h-screen">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="px-6 md:px-12 lg:px-16 pt-6">
            <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
              <div className="text-2xl font-semibold tracking-tight">SF Inmobiliaria</div>
              <div className="hidden md:flex items-center gap-8 text-sm">
                {['Inicio', 'Propiedades', 'Nosotros', 'Contacto'].map((item) => (
                  <a key={item} href="#" className="hover:text-gray-300 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
              <a href="#contacto" className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Consultar
              </a>
            </nav>
          </div>

          <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
            <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
              <div>
                <AnimatedHeading text={'Encontrá tu próximo hogar\nen Santa Fe.'} />
                <FadeIn delay={800} duration={1000}>
                  <p className="text-base md:text-lg text-gray-300 mb-5 max-w-2xl">
                    Propiedades exclusivas y oportunidades únicas para vivir o invertir.
                  </p>
                </FadeIn>
                <FadeIn delay={1200} duration={1000}>
                  <div className="flex flex-wrap gap-4">
                    <a href="#propiedades" className="bg-white text-black px-8 py-3 rounded-lg font-medium">
                      Ver propiedades
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
                    >
                      Hablar por WhatsApp
                    </a>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={1400} duration={1000} className="flex items-end justify-start lg:justify-end mt-6 lg:mt-0">
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl text-lg md:text-xl lg:text-2xl font-light">
                  Compra. Venta. Inversión.
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section id="propiedades" className="px-6 md:px-12 lg:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <article key={property.description} className="liquid-glass border border-white/20 rounded-xl overflow-hidden">
              <img src={property.image} alt={property.location} className="w-full h-52 object-cover" />
              <div className="p-5 space-y-3">
                <p className="text-xl font-medium">{property.price}</p>
                <p className="text-gray-300">{property.location}</p>
                <p className="text-sm text-gray-300">{property.description}</p>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-block bg-white text-black px-5 py-2 rounded-lg text-sm font-medium">
                  Consultar por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="nosotros" className="px-6 md:px-12 lg:px-16 py-10">
        <div className="liquid-glass border border-white/20 rounded-xl p-8 max-w-4xl">
          <h2 className="text-3xl font-normal mb-4">Quiénes somos</h2>
          <p className="text-gray-300 leading-relaxed">
            En SF Inmobiliaria acompañamos a cada cliente con asesoramiento estratégico en compra, venta e inversión de propiedades en Santa Fe y Rosario. Nuestro enfoque combina análisis de mercado, atención personalizada y gestión integral para concretar operaciones seguras, ágiles y rentables.
          </p>
        </div>
      </section>

      <section id="contacto" className="px-6 md:px-12 lg:px-16 py-10 pb-24">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="liquid-glass border border-white/20 rounded-xl p-8">
            <h2 className="text-3xl font-normal mb-6">Contacto</h2>
            <form className="space-y-4">
              <input className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3" placeholder="Nombre" />
              <input className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3" placeholder="Email" type="email" />
              <textarea className="w-full liquid-glass border border-white/20 rounded-lg px-4 py-3 min-h-28" placeholder="Mensaje" />
              <button type="button" className="bg-white text-black px-6 py-3 rounded-lg font-medium">Enviar consulta</button>
            </form>
            <div className="mt-6 text-gray-300 space-y-1 text-sm">
              <p>Tel: +54 342 456 7890</p>
              <p>Email: contacto@sfinmobiliaria.com.ar</p>
              <p>Dirección: Bv. Gálvez 1450, Santa Fe, Argentina</p>
            </div>
          </div>
          <div className="liquid-glass border border-white/20 rounded-xl overflow-hidden min-h-[420px]">
            <iframe
              title="Mapa Santa Fe"
              src="https://www.google.com/maps?q=Santa+Fe,+Argentina&output=embed"
              className="w-full h-full min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-full font-medium shadow-lg hover:bg-gray-100 transition-colors"
      >
        WhatsApp
      </a>
    </div>
  )
}
