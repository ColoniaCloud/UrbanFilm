'use client'

import { eliminarPost } from '@/app/actions/blog'

export default function EliminarPostBtn({ id, titulo }: { id: number; titulo: string }) {
  const handleDelete = async () => {
    if (!confirm(`¿Eliminar "${titulo}"? Esta acción no se puede deshacer.`)) return
    await eliminarPost(id)
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Eliminar
    </button>
  )
}
