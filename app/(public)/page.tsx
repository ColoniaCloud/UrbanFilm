import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import ConductoresSection from '@/components/ConductoresSection'
import { GridVignetteBackground } from '@/components/ui/vignette-grid-background'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Beneficios para conductores */}
      <section className="py-24">
        <ConductoresSection />
      </section>

      {/* Para instaladores */}
      <section className="relative overflow-hidden bg-[#111] text-white py-24 px-4">
        <GridVignetteBackground
          x={50} y={50}
          intensity={100}
          horizontalVignetteSize={80}
          verticalVignetteSize={80}
          size={40}
          className="opacity-30"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-500 text-center mb-3">
            Para instaladores
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase tracking-widest heading">
            Instalá más. Ganás más.
          </h2>
          <p className="text-center text-gray-400 max-w-xl mx-auto mb-16 body-text text-sm leading-relaxed">
            Urban Film está pensado para que la instalación sea eficiente y el resultado siempre quede bien. Así podés escalar tu negocio sin complicaciones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/10 p-8 rounded-xl hover:border-white/25 transition-colors">
              <span className="block text-5xl font-black text-white/10 mb-3 heading">01</span>
              <h3 className="text-base font-bold uppercase tracking-wide mb-3 heading">Fácil de trabajar</h3>
              <p className="text-sm text-gray-400 leading-relaxed body-text">
                Buena adherencia, mínima formación de burbujas y margen de reposicionamiento durante la aplicación. Menos tiempo por vehículo, más vehículos por día.
              </p>
            </div>

            <div className="border border-white/10 p-8 rounded-xl hover:border-white/25 transition-colors">
              <span className="block text-5xl font-black text-white/10 mb-3 heading">02</span>
              <h3 className="text-base font-bold uppercase tracking-wide mb-3 heading">Precio directo de fábrica</h3>
              <p className="text-sm text-gray-400 leading-relaxed body-text">
                Sin intermediarios. El precio que recibís te permite ser competitivo y ganar más en cada instalación.
              </p>
            </div>

            <div className="border border-white/10 p-8 rounded-xl hover:border-white/25 transition-colors">
              <span className="block text-5xl font-black text-white/10 mb-3 heading">03</span>
              <h3 className="text-base font-bold uppercase tracking-wide mb-3 heading">Respaldo de marca USA</h3>
              <p className="text-sm text-gray-400 leading-relaxed body-text">
                Urban Film es una marca de origen estadounidense que te diferencia y da confianza al cliente final.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contacto" className="btn btn-tertiary">
              Quiero ser distribuidor
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden"
        style={{
          background: 'radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)',
        }}
      >
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">¿Listo para empezar?</p>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4 heading text-slate-900">
            Contactanos hoy
          </h2>
          <p className="text-slate-600 mb-10 max-w-md mx-auto body-text text-sm leading-relaxed">
            Sumate como instalador y accedé a precios directos de fábrica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn btn-primary">
              Contactar
            </Link>
            <Link href="/nosotros" className="btn btn-secondary">
              Conocer la marca
            </Link>
          </div>
        </div>
      </section>

      {/* Presencia regional */}
      <section className="bg-white border-y border-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center mb-3">
            Cobertura regional
          </p>
          <h2 className="text-2xl font-bold text-center mb-10 uppercase tracking-widest heading">
            Presentes en 4 países
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { pais: 'Argentina', ciudad: 'Buenos Aires', svg: '/img/flag-argentina.svg' },
              { pais: 'Brasil', ciudad: 'São Paulo', svg: '/img/flag-brasil.svg' },
              { pais: 'Chile', ciudad: 'Santiago', svg: '/img/flag-chile.svg' },
              { pais: 'Uruguay', ciudad: 'Montevideo', svg: '/img/flag-uruguay.svg' },
            ].map(({ pais, ciudad, svg }) => (
              <div key={pais} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <Image
                    src={svg}
                    alt={`Bandera de ${pais}`}
                    width={56}
                    height={40}
                    className="rounded shadow-sm object-cover"
                  />
                </div>
                <p className="font-bold text-base uppercase tracking-wide heading">{pais}</p>
                <p className="text-sm text-gray-400 mt-1 body-text">{ciudad}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
