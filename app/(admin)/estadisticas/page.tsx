import type { Metadata } from 'next'
import { db } from '@/lib/db'

export const metadata: Metadata = { title: 'Estadísticas' }

export default async function EstadisticasPage() {
  const [productosPorCategoria, postsPublicados, postsBorrador] = await Promise.all([
    db.categoriaProducto.findMany({
      include: { _count: { select: { productos: true } } },
      orderBy: { nombre: 'asc' },
    }),
    db.post.count({ where: { publicado: true } }),
    db.post.count({ where: { publicado: false } }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Estadísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-semibold uppercase tracking-wider text-sm mb-6">
            Productos por categoría
          </h2>
          <div className="space-y-4">
            {productosPorCategoria.map((cat) => (
              <div key={cat.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{cat.nombre}</span>
                  <span className="font-semibold">{cat._count.productos}</span>
                </div>
                <div className="h-2 bg-gray-100">
                  <div
                    className="h-2 bg-black transition-all"
                    style={{
                      width: `${Math.max(
                        4,
                        (cat._count.productos /
                          Math.max(1, productosPorCategoria.reduce((a, c) => a + c._count.productos, 0))) *
                          100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-semibold uppercase tracking-wider text-sm mb-6">Blog</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-sm">Posts publicados</span>
              <span className="font-bold text-green-600">{postsPublicados}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-sm">Borradores</span>
              <span className="font-bold text-gray-400">{postsBorrador}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
