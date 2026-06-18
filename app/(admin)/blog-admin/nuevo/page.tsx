import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { crearPost } from '@/app/actions/blog'
import PostForm from '../_components/PostForm'

export const metadata: Metadata = { title: 'Nuevo Post' }

export default async function NuevoPostPage() {
  const categorias = await db.categoriaBlog.findMany({ orderBy: { nombre: 'asc' } })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Nuevo Post</h1>
      <PostForm action={crearPost} categorias={categorias} />
    </div>
  )
}
