'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, type CSSProperties } from 'react'
import { whatsappUrl } from '@/lib/contact'
import {
  FAMILIAS,
  FAMILIA_POR_ID,
  PRODUCTOS,
  opacidadDeLamina,
  type FamiliaId,
  type ProductoUrban,
} from '@/lib/productos-urban'

type Filtro = FamiliaId | 'todas'

const FILTROS: { id: Filtro; nombre: string; total: number }[] = [
  { id: 'todas', nombre: 'Todos', total: PRODUCTOS.length },
  ...FAMILIAS.map((f) => ({
    id: f.id,
    nombre: f.nombre,
    total: PRODUCTOS.filter((p) => p.familia === f.id).length,
  })),
]

/** Foto del producto o, si el CRM no tiene una propia, la escena del demo con la lámina a su tono. */
function Foto({ producto, sizes }: { producto: ProductoUrban; sizes: string }) {
  if (producto.imagen) {
    return <Image src={producto.imagen} alt={`Muestra de ${producto.nombre}`} fill sizes={sizes} className="object-cover" />
  }

  return (
    <>
      <Image src="/img/tint-scene.jpg" alt="" fill sizes={sizes} className="object-cover" />
      <div
        className="absolute inset-0 bg-[#04070a]"
        style={{ opacity: opacidadDeLamina(producto.vlt ?? 70) }}
        aria-hidden="true"
      />
    </>
  )
}

function Ficha({ producto, onClose }: { producto: ProductoUrban; onClose: () => void }) {
  const familia = FAMILIA_POR_ID[producto.familia]
  const whatsapp = whatsappUrl(`Hola, quiero consultar por ${producto.nombre} de Urban Film.`)

  return (
    <div className="grid md:grid-cols-2">
      <div className="relative aspect-square md:aspect-auto md:min-h-[28rem]">
        <Foto producto={producto} sizes="(min-width: 768px) 448px, 92vw" />
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
              {familia.nombre} · {producto.uso}
            </p>
            <h3 id="ficha-titulo" className="heading mt-2 text-2xl font-bold md:text-3xl">
              {producto.nombre}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha"
            className="btn-icon -mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-mist-300 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {producto.vlt != null ? (
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-mist-300">Luz visible (VLT)</p>
            <p className="heading text-4xl font-bold text-brand-400">{producto.vlt}%</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full rounded-full bg-brand-400" style={{ width: `${producto.vlt}%` }} />
            </div>
            <p className="mt-2 text-xs text-mist-300">Cuanto menor el número, más oscura la lámina.</p>
          </div>
        ) : null}

        <p className="text-sm leading-relaxed text-mist-300">{producto.descripcion ?? familia.resumen}</p>
        <p className="text-xs text-mist-300">Pedí la ficha técnica completa a ventas.</p>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <Link href="/contacto" className="btn btn-brand">
            Consultar
          </Link>
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-tertiary">
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default function ProductosUrban() {
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [seleccionado, setSeleccionado] = useState<ProductoUrban | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  // Tarjeta que abrió la ficha: al cerrar se le devuelve el foco (Safari no enfoca los botones al hacer clic).
  const disparadorRef = useRef<HTMLElement | null>(null)

  const visibles = filtro === 'todas' ? PRODUCTOS : PRODUCTOS.filter((p) => p.familia === filtro)

  const abrir = (producto: ProductoUrban, disparador: HTMLElement) => {
    disparadorRef.current = disparador
    setSeleccionado(producto)
    dialogRef.current?.showModal()
  }

  const alCerrar = () => {
    setSeleccionado(null)
    disparadorRef.current?.focus()
  }

  return (
    <section id="productos" className="scroll-mt-24 bg-paper px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs uppercase tracking-widest text-gray-600">Productos Urban</p>
        <h2 className="heading mb-4 text-center text-3xl font-bold uppercase tracking-widest md:text-4xl">
          Una lámina para cada trabajo
        </h2>
        <p className="body-text mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-gray-600">
          Elegí por tono y por tecnología. Tocá un producto para ver su ficha.
        </p>

        <div role="group" aria-label="Filtrar por familia" className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
              className="chip rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 aria-pressed:border-ink-950 aria-pressed:bg-ink-950 aria-pressed:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {f.nombre} <span className="opacity-60">{f.total}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {visibles.length} productos
        </p>

        <ul key={filtro} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visibles.map((producto, i) => (
            <li key={producto.slug} className="rise-in" style={{ ['--i' as string]: Math.min(i, 7) } as CSSProperties}>
              <button
                type="button"
                onClick={(e) => abrir(producto, e.currentTarget)}
                aria-haspopup="dialog"
                className="surface-card producto-card group flex h-full w-full flex-col overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <div className="relative aspect-square overflow-hidden bg-ink-900">
                  <div className="producto-foto absolute inset-0">
                    <Foto producto={producto} sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw" />
                  </div>
                  {producto.vlt != null ? (
                    <span className="absolute left-3 top-3 rounded-md bg-ink-950/80 px-2 py-1 text-xs font-semibold text-white">
                      VLT {producto.vlt}%
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] uppercase tracking-widest text-gray-600">
                    {FAMILIA_POR_ID[producto.familia].nombre}
                  </p>
                  <h3 className="heading mt-1 text-base font-bold leading-snug text-ink-950">{producto.nombre}</h3>
                  <span className="mt-3 text-sm font-medium text-brand-700">Ver ficha →</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="ficha-titulo"
        onClose={alCerrar}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close()
        }}
        className="ficha m-auto max-h-[90vh] w-[min(92vw,56rem)] overflow-y-auto rounded-2xl border border-white/10 bg-ink-900 p-0 text-white shadow-2xl backdrop:bg-black/70"
      >
        {seleccionado ? <Ficha producto={seleccionado} onClose={() => dialogRef.current?.close()} /> : null}
      </dialog>
    </section>
  )
}
