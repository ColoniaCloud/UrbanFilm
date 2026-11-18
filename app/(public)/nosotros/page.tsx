import type { Metadata } from 'next'
import Link from 'next/link'
import { FAMILIAS, PRODUCTOS } from '@/lib/productos-urban'

const title = 'Nosotros'
const description =
  'Urban Film distribuye láminas de polarizado de origen estadounidense para instaladores profesionales en Argentina, Brasil, Chile y Uruguay.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/nosotros' },
  openGraph: { title, description, url: '/nosotros' },
  twitter: { title, description },
}

// Solo datos que el sitio ya afirma en el resto de sus páginas.
const DATOS = [
  { valor: 'Origen USA', detalle: 'Láminas de una marca estadounidense' },
  { valor: '4 países', detalle: 'Argentina · Brasil · Chile · Uruguay' },
  { valor: 'Precio directo', detalle: 'De fábrica, sin intermediarios' },
]

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <p className="reveal mb-3 text-xs uppercase tracking-widest text-gray-600">Nosotros</p>
      <h1 className="heading reveal mb-6 max-w-3xl text-balance text-4xl font-bold uppercase tracking-widest md:text-5xl">
        Urban Film
      </h1>
      <p className="reveal mb-16 max-w-2xl text-lg leading-relaxed text-gray-600">
        Distribuimos láminas de polarizado de origen estadounidense para instaladores profesionales de Argentina,
        Brasil, Chile y Uruguay.
      </p>

      <ul className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DATOS.map(({ valor, detalle }) => (
          <li key={valor} className="surface-card reveal p-8 text-center">
            <p className="heading mb-2 text-2xl font-bold uppercase tracking-wide">{valor}</p>
            <p className="body-text text-sm text-gray-600">{detalle}</p>
          </li>
        ))}
      </ul>

      <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="reveal">
          <h2 className="heading mb-4 text-xl font-bold uppercase tracking-widest">Qué hacemos</h2>
          <p className="leading-relaxed text-gray-600">
            Ofrecemos al instalador láminas de calidad real para que sus clientes noten la diferencia desde el primer
            día: confort térmico, menos deslumbramiento, privacidad y protección UV.
          </p>
        </div>
        <div className="reveal">
          <h2 className="heading mb-4 text-xl font-bold uppercase tracking-widest">Cómo trabajamos</h2>
          <p className="leading-relaxed text-gray-600">
            Vendemos directo de fábrica, sin intermediarios, para que el instalador pueda ser competitivo y ganar más
            en cada trabajo. Las láminas tienen buena adherencia y dejan margen de reposicionamiento durante la
            aplicación.
          </p>
        </div>
      </div>

      <section className="mb-20" aria-labelledby="linea-urban">
        <h2 id="linea-urban" className="heading reveal mb-6 text-xl font-bold uppercase tracking-widest">
          La línea Urban
        </h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {FAMILIAS.map((familia) => (
            <li key={familia.id} className="surface-card reveal p-5">
              <p className="heading text-base font-bold">{familia.nombre}</p>
              <p className="body-text mt-1 text-sm text-gray-600">
                {PRODUCTOS.filter((p) => p.familia === familia.id).length} productos
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/laminas" className="text-sm font-medium text-brand-700 underline-offset-4 hover:underline">
            Ver todos los productos →
          </Link>
        </p>
      </section>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link href="/contacto" className="btn btn-primary">
          Hablemos
        </Link>
        <Link href="/instaladores" className="btn btn-secondary">
          Quiero ser distribuidor
        </Link>
      </div>
    </div>
  )
}
