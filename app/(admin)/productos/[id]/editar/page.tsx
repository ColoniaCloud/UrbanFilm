import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import { actualizarProducto } from '@/app/actions/productos'
import ProductoForm from '../../_components/ProductoForm'

export const metadata: Metadata = { title: 'Editar Producto' }

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numId = parseInt(id)

  const [producto, categorias] = await Promise.all([
    db.producto.findUnique({ where: { id: numId } }),
    db.categoriaProducto.findMany({ orderBy: { nombre: 'asc' } }),
  ])

  if (!producto) notFound()

  const action = actualizarProducto.bind(null, numId)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Editar: {producto.nombre}</h1>
      <ProductoForm action={action} categorias={categorias} defaultValues={producto} />
    </div>
  )
}
