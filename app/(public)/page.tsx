import Link from 'next/link'
import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ProductosUrban from '@/components/ProductosUrban'
import ConductoresSection from '@/components/ConductoresSection'
import Reviews from '@/components/Reviews'
import { GridVignetteBackground } from '@/components/ui/vignette-grid-background'
import { whatsappUrl } from '@/lib/contact'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
}

const PILARES = [
  {
    titulo: 'Fácil de trabajar',
    texto:
      'Buena adherencia, mínima formación de burbujas y margen de reposicionamiento durante la aplicación. Menos tiempo por vehículo, más vehículos por día.',
  },
  {
    titulo: 'Precio directo de fábrica',
    texto: 'Sin intermediarios. El precio que recibís te permite ser competitivo y ganar más en cada instalación.',
  },
  {
    titulo: 'Respaldo de marca USA',
    texto: 'Urban Film es una marca de origen estadounidense que te diferencia y da confianza al cliente final.',
  },
]

export default function Home() {
  const whatsapp = whatsappUrl('Hola, quiero sumarme como instalador de Urban Film.')

  return (
    <>
      <Hero />

      <ProductosUrban />

      {/* Por qué Urban Film */}
      <section className="relative overflow-hidden bg-ink-900 px-4 py-24 text-white">
        <GridVignetteBackground
          x={50} y={50}
          intensity={100}
          horizontalVignetteSize={80}
          verticalVignetteSize={80}
          size={40}
          className="opacity-30"
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="mb-3 text-center text-xs uppercase tracking-widest text-mist-300">Por qué Urban Film</p>
          <h2 className="heading mb-4 text-center text-3xl font-bold uppercase tracking-widest md:text-4xl">
            Instalá más. Ganás más.
          </h2>
          <p className="body-text mx-auto mb-16 max-w-xl text-center text-sm leading-relaxed text-mist-300">
            Urban Film está pensado para que la instalación sea eficiente y el resultado siempre quede bien. Así podés escalar tu negocio sin complicaciones.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILARES.map(({ titulo, texto }, i) => (
              <div key={titulo} className="surface-outline p-8">
                <span className="heading mb-3 block text-5xl font-black text-white/10">0{i + 1}</span>
                <h3 className="heading mb-3 text-base font-bold uppercase tracking-wide">{titulo}</h3>
                <p className="body-text text-sm leading-relaxed text-mist-300">{texto}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contacto" className="btn btn-tertiary">
              Quiero ser distribuidor
            </Link>
          </div>
        </div>
      </section>

      {/* Para tu cliente */}
      <section className="py-24">
        <div className="mx-auto mb-12 max-w-6xl px-4 text-center">
          <p className="mb-3 text-xs uppercase tracking-widest text-gray-600">Para tu cliente</p>
          <h2 className="heading text-balance text-3xl font-bold uppercase tracking-widest md:text-4xl">
            Lo que tu cliente nota desde el primer día
          </h2>
        </div>
        <ConductoresSection />
      </section>

      <Reviews />

      {/* CTA final */}
      <section className="bg-brand-400 px-4 py-24 text-center text-ink-950">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest">¿Listo para empezar?</p>
        <h2 className="heading mb-4 text-3xl font-bold uppercase tracking-widest md:text-4xl">Contactanos hoy</h2>
        <p className="body-text mx-auto mb-10 max-w-md text-sm leading-relaxed">
          Sumate como instalador y accedé a precios directos de fábrica.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/contacto" className="btn btn-primary">
            Contactar
          </Link>
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              WhatsApp
            </a>
          ) : null}
          <Link href="/nosotros" className="btn btn-secondary">
            Conocer la marca
          </Link>
        </div>
      </section>
    </>
  )
}
