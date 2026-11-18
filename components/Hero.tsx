import type { CSSProperties } from 'react'
import Link from 'next/link'
import TintDemo from '@/components/TintDemo'
import { whatsappUrl } from '@/lib/contact'

/** Orden de entrada: --i multiplica los 60 ms de stagger definidos en globals.css. */
const step = (i: number): CSSProperties => ({ ['--i' as string]: i })

const TRUST = [
  { strong: 'Origen USA', rest: '' },
  { strong: '4 países', rest: 'AR · BR · CL · UY' },
  { strong: 'Precio directo', rest: 'de fábrica' },
]

export default function Hero() {
  const whatsapp = whatsappUrl('Hola, quiero hablar con ventas de Urban Film.')

  return (
    <section className="relative">
      {/* Fondo: se extiende detrás del header flotante (h-16 + top-4 = 5rem). Estático, sin video. */}
      <div
        className="absolute inset-x-0 -top-20 bottom-0 bg-ink-950 bg-[radial-gradient(70%_90%_at_80%_40%,#14262d_0%,var(--color-ink-950)_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-16 md:pt-24">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-12">
          <div className="text-center md:text-left">
            <p className="rise-in text-xs font-semibold uppercase tracking-[0.18em] text-brand-400" style={step(0)}>
              Láminas de estándar americano
            </p>
            <h1
              className="rise-in mt-3 text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl"
              style={step(1)}
            >
              Instalá láminas que se <em className="not-italic text-brand-400">notan</em>.
            </h1>
            <p className="rise-in mx-auto mt-5 max-w-md text-base leading-relaxed text-mist-300 md:mx-0 md:text-lg" style={step(2)}>
              Buena adherencia, precio directo de fábrica y una marca que tus clientes reconocen.
            </p>

            <div className="rise-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start" style={step(3)}>
              <Link href="/contacto" className="btn btn-brand w-full whitespace-nowrap sm:w-auto">
                Hablar con ventas
              </Link>
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-tertiary w-full whitespace-nowrap sm:w-auto">
                  WhatsApp
                </a>
              ) : null}
              <a href="#productos" className="btn btn-tertiary w-full whitespace-nowrap sm:w-auto">
                Ver productos
              </a>
            </div>
          </div>

          <div className="rise-in" style={step(2)}>
            <TintDemo />
          </div>
        </div>

        <ul
          className="rise-in mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.08em] text-mist-300 sm:flex-row"
          style={step(4)}
        >
          {TRUST.map(({ strong, rest }) => (
            <li key={strong}>
              <b className="font-semibold text-white">{strong}</b>
              {rest ? <span> · {rest}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
