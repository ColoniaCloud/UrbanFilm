import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { actualizarPost } from '@/app/actions/blog'
import PostForm from '../../_components/PostForm'

export const metadata: Metadata = { title: 'Editar Post' }

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numId = parseInt(id)

  const [post, categorias] = await Promise.all([
    db.post.findUnique({ where: { id: numId } }),
    db.categoriaBlog.findMany({ orderBy: { nombre: 'asc' } }),
  ])

  if (!post) notFound()

  const action = actualizarPost.bind(null, numId)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Editar: {post.titulo}</h1>
      <PostForm action={action} categorias={categorias} defaultValues={post} />
    </div>
  )
}
