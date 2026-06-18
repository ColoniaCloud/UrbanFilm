import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const [totalProductos, totalCategorias, totalPosts, totalCategoriasB] = await Promise.all([
    db.producto.count(),
    db.categoriaProducto.count(),
    db.post.count(),
    db.categoriaBlog.count(),
  ])

  const stats = [
    { label: 'Productos', value: totalProductos, href: '/productos' },
    { label: 'Categorías', value: totalCategorias, href: '/productos/categorias' },
    { label: 'Posts del blog', value: totalPosts, href: '/blog-admin' },
    { label: 'Cat. Blog', value: totalCategoriasB, href: '/blog-admin/categorias' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white border border-gray-200 p-6 hover:border-black transition-colors"
          >
            <p className="text-4xl font-black mb-2">{s.value}</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-semibold mb-4 uppercase tracking-wider text-sm">Accesos rápidos</h2>
          <div className="space-y-3">
            <Link href="/productos/nuevo" className="block text-sm text-blue-600 hover:underline">
              + Agregar producto
            </Link>
            <Link href="/blog-admin/nuevo" className="block text-sm text-blue-600 hover:underline">
              + Nuevo post
            </Link>
            <Link href="/productos/categorias" className="block text-sm text-blue-600 hover:underline">
              + Gestionar categorías
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h2 className="font-semibold mb-4 uppercase tracking-wider text-sm">Ver sitio</h2>
          <div className="space-y-3">
            <Link href="/" target="_blank" className="block text-sm text-gray-600 hover:underline">
              Inicio →
            </Link>
            <Link href="/laminas" target="_blank" className="block text-sm text-gray-600 hover:underline">
              Láminas →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
