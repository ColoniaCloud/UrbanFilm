import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'
import EliminarPostBtn from './_components/EliminarPostBtn'

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogAdminPage() {
  const posts = await db.post.findMany({
    include: { categoria: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link
          href="/blog-admin/nuevo"
          className="bg-black text-white px-5 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          + Nuevo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center text-gray-400">
          No hay posts aún.{' '}
          <Link href="/blog-admin/nuevo" className="text-black underline">
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Imagen</th>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-14 h-10 bg-gray-100 relative overflow-hidden">
                      {p.imagen ? (
                        <Image src={p.imagen} alt={p.titulo} fill className="object-cover" sizes="56px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">◻</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium max-w-xs">
                    <p className="truncate">{p.titulo}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{p.categoria?.nombre ?? '—'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        p.publicado
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {p.publicado ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(p.createdAt).toLocaleDateString('es-UY')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link href={`/blog-admin/${p.id}/editar`} className="text-blue-600 hover:underline">
                        Editar
                      </Link>
                      <EliminarPostBtn id={p.id} titulo={p.titulo} />
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
