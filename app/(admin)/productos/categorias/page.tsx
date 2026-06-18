import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { crearCategoriaProducto, eliminarCategoriaProducto } from '@/app/actions/productos'
import EliminarCategoriaBtn from './_components/EliminarCategoriaBtn'

export const metadata: Metadata = { title: 'Categorías de Productos' }

export default async function CategoriasProductosPage() {
  const categorias = await db.categoriaProducto.findMany({
    include: { _count: { select: { productos: true } } },
    orderBy: { nombre: 'asc' },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Categorías de Productos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-semibold uppercase tracking-wider text-sm mb-6">Nueva categoría</h2>
          <form action={crearCategoriaProducto} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre *</label>
              <input
                type="text"
                name="nombre"
                required
                className="w-full border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <input
                type="text"
                name="descripcion"
                className="w-full border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Crear categoría
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="bg-white border border-gray-200">
          {categorias.length === 0 ? (
            <p className="text-center text-gray-400 py-12 text-sm">Sin categorías</p>
          ) : (
            <ul>
              {categorias.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium">{cat.nombre}</p>
                    <p className="text-xs text-gray-400">{cat._count.productos} productos</p>
                  </div>
                  <EliminarCategoriaBtn id={cat.id} nombre={cat.nombre} count={cat._count.productos} action={eliminarCategoriaProducto} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
