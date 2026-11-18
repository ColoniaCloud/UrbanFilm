'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { PRODUCTO_POR_SLUG, opacidadDeLamina } from '@/lib/productos-urban'

// Cada paso del demo muestra un producto Urban real con ese tono.
const PASOS = [
  { vlt: 70, slug: 'security-architecture' },
  { vlt: 65, slug: 'sky-blue' },
  { vlt: 50, slug: 'urban-carbono-50' },
  { vlt: 15, slug: 'urban-carbono-15' },
  { vlt: 5, slug: 'urban-carbono-05' },
] as const

const nombreDelProducto = (vlt: number) => {
  const cercano = PASOS.reduce((a, b) => (Math.abs(b.vlt - vlt) < Math.abs(a.vlt - vlt) ? b : a))
  return PRODUCTO_POR_SLUG[cercano.slug].nombre
}

/**
 * Demo: el visitante oscurece el vidrio. Solo cambia la opacidad de la capa de lámina,
 * así que la animación no toca layout ni paint costoso.
 */
export default function TintDemo() {
  const [vlt, setVlt] = useState(70)
  const rangeId = useId()
  const nombre = nombreDelProducto(vlt)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-56 overflow-hidden rounded-[22px_70px_22px_22px] border-[7px] border-[#0a0d10] bg-black shadow-[0_0_0_1px_rgb(255_255_255/0.12),0_18px_40px_rgb(0_0_0/0.45)] sm:h-72">
        <Image
          src="/img/tint-scene.jpg"
          alt="Camino al atardecer visto a través de la ventanilla de un auto"
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
        />
        <div
          className="tint-film absolute inset-0 bg-[#04070a]"
          style={{ opacity: opacidadDeLamina(vlt) }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-[30%] left-[14%] h-[170%] w-[26%] rotate-[18deg] bg-gradient-to-r from-transparent via-brand-100/20 to-transparent"
          aria-hidden="true"
        />
        <p
          className="absolute bottom-3 left-3 flex items-baseline gap-2 rounded-lg border border-white/15 bg-ink-950/80 px-3 py-1.5 text-white"
          aria-hidden="true"
        >
          <span className="heading text-sm tracking-widest">
            VLT <b className="text-lg text-brand-400">{vlt}%</b>
          </span>
          <span className="text-xs text-mist-300">{nombre}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div role="group" aria-label="Nivel de VLT" className="flex flex-wrap gap-1.5">
          {PASOS.map((paso) => (
            <button
              key={paso.vlt}
              type="button"
              aria-pressed={vlt === paso.vlt}
              onClick={() => setVlt(paso.vlt)}
              className="tint-step rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold tracking-wide text-mist-300 aria-pressed:border-brand-400 aria-pressed:bg-brand-400 aria-pressed:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {paso.vlt}
            </button>
          ))}
        </div>

        <label htmlFor={rangeId} className="sr-only">
          Transmisión de luz visible (VLT)
        </label>
        <input
          id={rangeId}
          type="range"
          min={5}
          max={70}
          step={1}
          value={vlt}
          onChange={(e) => setVlt(Number(e.target.value))}
          aria-valuetext={`${vlt}% de luz visible, ${nombre}`}
          className="h-6 w-full flex-1 cursor-pointer accent-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        />
      </div>

      <p className="text-xs text-mist-300">
        Mové el control: así cambia el vidrio según el tono. Productos Urban reales, de 70% a 5% de luz visible.
      </p>
    </div>
  )
}
