import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductoCard from '@/components/ProductoCard'
import ProductoFoto from '@/components/ProductoFoto'
import { whatsappUrl } from '@/lib/contact'
import {
  FAMILIA_POR_ID,
  PRODUCTOS,
  PRODUCTO_POR_SLUG,
  opacidadDeLamina,
} from '@/lib/productos-urban'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const producto = PRODUCTO_POR_SLUG[slug]
  if (!producto) return {}

  const familia = FAMILIA_POR_ID[producto.familia]
  const title = producto.nombre
  const description =
    producto.descripcion ??
    `${producto.nombre}: lámina ${familia.nombre.toLowerCase()} Urban${producto.vlt != null ? ` con ${producto.vlt}% de luz visible (VLT)` : ''}. ${familia.resumen}`

  return {
    title,
    description,
    alternates: { canonical: `/laminas/${producto.slug}` },
    openGraph: {
      title,
      description,
      url: `/laminas/${producto.slug}`,
      images: [{ url: producto.imagen ?? '/img/og-image.jpg' }],
    },
    twitter: { title, description },
  }
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params
  const producto = PRODUCTO_POR_SLUG[slug]
  if (!producto) notFound()

  const familia = FAMILIA_POR_ID[producto.familia]
  const parientes = PRODUCTOS.filter((p) => p.familia === producto.familia && p.slug !== producto.slug)
  const whatsapp = whatsappUrl(`Hola, quiero consultar por ${producto.nombre} de Urban Film.`)

  const datos: { etiqueta: string; valor: string }[] = [
    { etiqueta: 'Familia', valor: familia.nombre },
    { etiqueta: 'Uso', valor: producto.uso },
    ...(producto.vlt != null ? [{ etiqueta: 'Luz visible (VLT)', valor: `${producto.vlt}%` }] : []),
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <nav aria-label="Ruta de navegación" className="mb-8 text-xs text-gray-600">
        <Link href="/" className="underline-offset-4 hover:text-ink-950 hover:underline">
          Inicio
        </Link>{' '}
        /{' '}
        <Link href="/laminas" className="underline-offset-4 hover:text-ink-950 hover:underline">
          Láminas
        </Link>{' '}
        / <span aria-current="page">{producto.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        <div className="space-y-4">
          <div className="surface-card relative aspect-square overflow-hidden bg-ink-900">
            <ProductoFoto producto={producto} sizes="(min-width: 768px) 496px, 100vw" priority />
          </div>

          {producto.vlt != null && producto.imagen ? (
            <div className="surface-card flex items-center gap-4 p-3">
              <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-black">
                <Image src="/img/tint-scene.jpg" alt="" fill sizes="128px" className="object-cover" />
                {/* Mitad derecha con lámina, mitad izquierda sin ella: se ve la diferencia. */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2 border-l border-white/60 bg-[#04070a]"
                  style={{ opacity: opacidadDeLamina(producto.vlt) }}
                  aria-hidden="true"
                />
              </div>
              <p className="body-text text-sm leading-relaxed text-gray-600">
                Comparación: vidrio sin lámina (izquierda) y con una lámina de{' '}
                <b className="text-ink-950">{producto.vlt}%</b> de luz visible (derecha).
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            {familia.nombre} · {producto.uso}
          </p>
          <h1 className="heading mt-3 text-3xl font-bold md:text-4xl">{producto.nombre}</h1>

          {producto.vlt != null ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.12em] text-gray-600">Luz visible (VLT)</p>
              <p className="heading text-5xl font-bold text-brand-700">{producto.vlt}%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200" aria-hidden="true">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${producto.vlt}%` }} />
              </div>
              <p className="mt-2 text-xs text-gray-600">Cuanto menor el número, más oscura la lámina.</p>
            </div>
          ) : null}

          <p className="body-text mt-6 leading-relaxed text-gray-700">{producto.descripcion ?? familia.resumen}</p>

          <dl className="mt-6 divide-y divide-gray-200 border-y border-gray-200 text-sm">
            {datos.map(({ etiqueta, valor }) => (
              <div key={etiqueta} className="flex justify-between gap-4 py-3">
                <dt className="text-gray-600">{etiqueta}</dt>
                <dd className="font-medium text-ink-950">{valor}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-xs text-gray-600">Pedí la ficha técnica completa a ventas.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/contacto?producto=${producto.slug}`} className="btn btn-primary">
              Consultar este producto
            </Link>
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {parientes.length > 0 ? (
        <section className="mt-20" aria-labelledby="mas-familia">
          <h2 id="mas-familia" className="heading reveal mb-6 text-xl font-bold uppercase tracking-widest">
            Más de {familia.nombre}
          </h2>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {parientes.map((p) => (
              <li key={p.slug} className="reveal">
                <ProductoCard producto={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
