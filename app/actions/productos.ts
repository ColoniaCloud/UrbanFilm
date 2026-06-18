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

export async function crearProducto(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const nombre = formData.get('nombre') as string
  const descripcion = formData.get('descripcion') as string
  const categoriaId = parseInt(formData.get('categoriaId') as string)
  const activo = formData.get('activo') === 'on'
  const imagen = formData.get('imagen') as File | null

  let imagenUrl: string | undefined
  let imagenId: string | undefined

  if (imagen && imagen.size > 0) {
    const buffer = Buffer.from(await imagen.arrayBuffer())
    const result = await uploadImage(buffer, 'productos')
    imagenUrl = result.url
    imagenId = result.publicId
  }

  const slug = toSlug(nombre)

  await db.producto.create({
    data: { nombre, slug, descripcion, categoriaId, activo, imagen: imagenUrl, imagenId },
  })

  revalidatePath('/productos')
  revalidatePath('/laminas')
  redirect('/productos')
}

export async function actualizarProducto(
  id: number,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAuth()

  const nombre = formData.get('nombre') as string
  const descripcion = formData.get('descripcion') as string
  const categoriaId = parseInt(formData.get('categoriaId') as string)
  const activo = formData.get('activo') === 'on'
  const imagen = formData.get('imagen') as File | null

  const existing = await db.producto.findUnique({ where: { id } })
  if (!existing) return { error: 'Producto no encontrado' }

  let imagenUrl = existing.imagen ?? undefined
  let imagenId = existing.imagenId ?? undefined

  if (imagen && imagen.size > 0) {
    if (existing.imagenId) await deleteImage(existing.imagenId)
    const buffer = Buffer.from(await imagen.arrayBuffer())
    const result = await uploadImage(buffer, 'productos')
    imagenUrl = result.url
    imagenId = result.publicId
  }

  await db.producto.update({
    where: { id },
    data: { nombre, descripcion, categoriaId, activo, imagen: imagenUrl, imagenId },
  })

  revalidatePath('/productos')
  revalidatePath('/laminas')
  redirect('/productos')
}

export async function eliminarProducto(id: number): Promise<void> {
  await requireAuth()

  const producto = await db.producto.findUnique({ where: { id } })
  if (!producto) return

  if (producto.imagenId) await deleteImage(producto.imagenId)

  await db.producto.delete({ where: { id } })

  revalidatePath('/productos')
  revalidatePath('/laminas')
}

export async function crearCategoriaProducto(formData: FormData): Promise<void> {
  await requireAuth()

  const nombre = formData.get('nombre') as string
  const descripcion = formData.get('descripcion') as string

  await db.categoriaProducto.create({
    data: { nombre, slug: toSlug(nombre), descripcion },
  })

  revalidatePath('/productos/categorias')
  redirect('/productos/categorias')
}

export async function eliminarCategoriaProducto(id: number): Promise<void> {
  await requireAuth()
  await db.categoriaProducto.delete({ where: { id } })
  revalidatePath('/productos/categorias')
}
