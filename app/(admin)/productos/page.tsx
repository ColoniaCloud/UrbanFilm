import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'
import EliminarProductoBtn from './_components/EliminarProductoBtn'

export const metadata: Metadata = { title: 'Productos' }

export default async function ProductosPage() {
  const productos = await db.producto.findMany({
    include: { categoria: true },
    orderBy: [{ categoria: { nombre: 'asc' } }, { orden: 'asc' }],
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link
          href="/productos/nuevo"
          className="bg-black text-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          + Agregar
        </Link>
      </div>

      {productos.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center text-gray-400">
          No hay productos aún.{' '}
          <Link href="/productos/nuevo" className="text-black underline">
            Agregar el primero
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Imagen</th>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-14 h-10 bg-gray-100 relative overflow-hidden">
                      {p.imagen ? (
                        <Image src={p.imagen} alt={p.nombre} fill className="object-cover" sizes="56px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">◻</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{p.nombre}</td>
                  <td className="px-6 py-4 text-gray-500">{p.categoria.nombre}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        p.activo
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {p.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/productos/${p.id}/editar`}
                        className="text-blue-600 hover:underline"
                      >
                        Editar
                      </Link>
                      <EliminarProductoBtn id={p.id} nombre={p.nombre} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
