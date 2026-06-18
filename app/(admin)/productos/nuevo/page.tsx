import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { crearProducto } from '@/app/actions/productos'
import ProductoForm from '../_components/ProductoForm'

export const metadata: Metadata = { title: 'Nuevo Producto' }

export default async function NuevoProductoPage() {
  const categorias = await db.categoriaProducto.findMany({ orderBy: { nombre: 'asc' } })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Nuevo Producto</h1>
      <ProductoForm action={crearProducto} categorias={categorias} />
    </div>
  )
}
