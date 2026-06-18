'use client'

import { eliminarProducto } from '@/app/actions/productos'

export default function EliminarProductoBtn({ id, nombre }: { id: number; nombre: string }) {
  const handleDelete = async () => {
    if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return
    await eliminarProducto(id)
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Eliminar
    </button>
  )
}
