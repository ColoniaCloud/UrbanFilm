'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { toSlug } from '@/lib/slugify'
import { getSession } from '@/lib/session'
import { uploadImage, deleteImage } from '@/lib/cloudinary'

type FormState = { error?: string } | undefined

async function requireAuth() {
  const session = await getSession()
  if (!session) throw new Error('No autorizado')
  return session
}

export async function crearPost(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const titulo = formData.get('titulo') as string
  const resumen = formData.get('resumen') as string
  const contenido = formData.get('contenido') as string
  const categoriaId = formData.get('categoriaId')
    ? parseInt(formData.get('categoriaId') as string)
    : null
  const publicado = formData.get('publicado') === 'on'
  const imagen = formData.get('imagen') as File | null

  let imagenUrl: string | undefined
  let imagenId: string | undefined

  if (imagen && imagen.size > 0) {
    const buffer = Buffer.from(await imagen.arrayBuffer())
    const result = await uploadImage(buffer, 'blog')
    imagenUrl = result.url
    imagenId = result.publicId
  }

  await db.post.create({
    data: {
      titulo,
      slug: toSlug(titulo),
      resumen,
      contenido,
      categoriaId,
      publicado,
      imagen: imagenUrl,
      imagenId,
    },
  })

  revalidatePath('/blog-admin')
  redirect('/blog-admin')
}

export async function actualizarPost(
  id: number,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const titulo = formData.get('titulo') as string
  const resumen = formData.get('resumen') as string
  const contenido = formData.get('contenido') as string
  const categoriaId = formData.get('categoriaId')
    ? parseInt(formData.get('categoriaId') as string)
    : null
  const publicado = formData.get('publicado') === 'on'
  const imagen = formData.get('imagen') as File | null

  const existing = await db.post.findUnique({ where: { id } })
  if (!existing) return { error: 'Post no encontrado' }

  let imagenUrl = existing.imagen ?? undefined
  let imagenId = existing.imagenId ?? undefined

  if (imagen && imagen.size > 0) {
    if (existing.imagenId) await deleteImage(existing.imagenId)
    const buffer = Buffer.from(await imagen.arrayBuffer())
    const result = await uploadImage(buffer, 'blog')
    imagenUrl = result.url
    imagenId = result.publicId
  }

  await db.post.update({
    where: { id },
    data: { titulo, resumen, contenido, categoriaId, publicado, imagen: imagenUrl, imagenId },
  })

  revalidatePath('/blog-admin')
  redirect('/blog-admin')
}

export async function eliminarPost(id: number): Promise<void> {
  await requireAuth()

  const post = await db.post.findUnique({ where: { id } })
  if (!post) return

  if (post.imagenId) await deleteImage(post.imagenId)

  await db.post.delete({ where: { id } })

  revalidatePath('/blog-admin')
}

export async function crearCategoriaBlog(formData: FormData): Promise<void> {
  await requireAuth()

  const nombre = formData.get('nombre') as string
  const descripcion = formData.get('descripcion') as string

  await db.categoriaBlog.create({
    data: { nombre, slug: toSlug(nombre), descripcion },
  })

  revalidatePath('/blog-admin/categorias')
  redirect('/blog-admin/categorias')
}

export async function eliminarCategoriaBlog(id: number): Promise<void> {
  await requireAuth()
  await db.categoriaBlog.delete({ where: { id } })
  revalidatePath('/blog-admin/categorias')
}
