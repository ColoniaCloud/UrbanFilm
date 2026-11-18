import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroReviewsCarousel from '@/components/HeroReviewsCarousel'
import HeroVideo from '@/components/HeroVideo'

const HEADLINE = 'Aumenta tu margen de ganancias instalando láminas de calidad.'

/** Orden de entrada: --i multiplica los 60 ms de stagger definidos en globals.css. */
const step = (i: number): CSSProperties => ({ ['--i' as string]: i })

export default function Hero() {
  return (
    <section className="relative min-h-[80vh]">
      {/* Decorative layer only: bleeds up behind the floating header (h-16 + top-4 = 5rem).
          El fondo oscuro y el overlay son estáticos: el video nunca se ve sin oscurecer. */}
      <div className="absolute inset-x-0 -top-20 bottom-0 overflow-hidden bg-ink-900">
        <HeroVideo />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content layer: stays within normal document flow, never behind the header */}
      <div className="relative z-10 flex flex-col justify-center gap-16 py-24">
        <div className="w-full px-4">
          <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center gap-8 md:flex-row md:justify-between">
            <div className="w-full md:w-[50%] flex items-center justify-center">
              <div className="max-w-xl text-center md:text-left">
                <h1
                  className="rise-in text-3xl md:text-4xl font-black leading-snug text-white"
                  style={step(1)}
                >
                  {HEADLINE}
                </h1>
                <p
                  className="rise-in mt-6 text-base md:text-lg text-white/75 leading-relaxed body-text"
                  style={step(2)}
                >
                  Instala láminas con estándar americano, ofreciéndole a tus clientes un producto de buena calidad real y aumentá tu margen de ganancias.
                </p>

                <div
                  className="rise-in mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-start"
                  style={step(3)}
                >
                  <Link href="/contacto" className="btn btn-brand w-full sm:w-auto">
                    CONTACTO VENTAS
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[45%] flex items-center justify-center">
              <div className="rise-in" style={step(0)}>
                <Image
                  src="/img/logo-f.png"
                  alt="Urban Film"
                  width={280}
                  height={112}
                  priority
                  className="max-w-full h-auto"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rise-in w-full px-4" style={step(4)}>
          <HeroReviewsCarousel />
        </div>
      </div>
    </section>
  )
}
