import Link from 'next/link'
import ProductoFoto from '@/components/ProductoFoto'
import { FAMILIA_POR_ID, type ProductoUrban } from '@/lib/productos-urban'

/** Tarjeta de producto que lleva a su página (/laminas/[slug]). */
export default function ProductoCard({ producto }: { producto: ProductoUrban }) {
  return (
    <Link
      href={`/laminas/${producto.slug}`}
      className="surface-card producto-card group flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-900">
        <div className="producto-foto absolute inset-0">
          <ProductoFoto producto={producto} sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw" />
        </div>
        {producto.vlt != null ? (
          <span className="absolute left-3 top-3 rounded-md bg-ink-950/80 px-2 py-1 text-xs font-semibold text-white">
            VLT {producto.vlt}%
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] uppercase tracking-widest text-gray-600">{FAMILIA_POR_ID[producto.familia].nombre}</p>
        <h3 className="heading mt-1 text-base font-bold leading-snug text-ink-950">{producto.nombre}</h3>
        <span className="mt-3 text-sm font-medium text-brand-700">Ver producto →</span>
      </div>
    </Link>
  )
}
