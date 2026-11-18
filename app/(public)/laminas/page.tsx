import type { Metadata } from 'next'
import Link from 'next/link'
import ProductoCard from '@/components/ProductoCard'
import { FAMILIAS, PRODUCTOS } from '@/lib/productos-urban'

const title = 'Láminas Urban'
const description =
  'Toda la línea de láminas Urban: nanocarbono, nanocerámica, security, premium y PPF. Elegí por tono (VLT) y tecnología.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/laminas' },
  openGraph: { title, description, url: '/laminas' },
  twitter: { title, description },
}

export default function LaminasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <nav aria-label="Ruta de navegación" className="mb-8 text-xs text-gray-600">
        <Link href="/" className="underline-offset-4 hover:text-ink-950 hover:underline">
          Inicio
        </Link>{' '}
        / <span aria-current="page">Láminas</span>
      </nav>

      <p className="reveal mb-3 text-xs uppercase tracking-widest text-gray-600">Productos Urban</p>
      <h1 className="heading reveal mb-4 text-4xl font-bold uppercase tracking-widest md:text-5xl">Láminas Urban</h1>
      <p className="reveal mb-12 max-w-2xl text-gray-600">
        Elegí por tono y por tecnología. El VLT indica cuánta luz visible deja pasar la lámina: cuanto menor el
        número, más oscura.
      </p>

      <ul className="mb-14 flex flex-wrap gap-2">
        {FAMILIAS.map((familia) => (
          <li key={familia.id}>
            <a
              href={`#${familia.id}`}
              className="chip inline-block rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:border-ink-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {familia.nombre}
            </a>
          </li>
        ))}
      </ul>

      <div className="space-y-16">
        {FAMILIAS.map((familia) => (
          <section key={familia.id} id={familia.id} aria-labelledby={`h-${familia.id}`} className="scroll-mt-24">
            <h2 id={`h-${familia.id}`} className="heading reveal mb-2 text-2xl font-bold uppercase tracking-widest">
              {familia.nombre}
            </h2>
            <p className="body-text reveal mb-6 max-w-2xl text-sm text-gray-600">{familia.resumen}</p>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {PRODUCTOS.filter((p) => p.familia === familia.id).map((producto) => (
                <li key={producto.slug} className="reveal">
                  <ProductoCard producto={producto} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
