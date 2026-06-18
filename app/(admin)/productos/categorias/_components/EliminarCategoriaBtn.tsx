'use client'

type Props = {
  id: number
  nombre: string
  count: number
  action: (id: number) => Promise<void>
}

export default function EliminarCategoriaBtn({ id, nombre, count, action }: Props) {
  const handleDelete = async () => {
    if (count > 0) {
      alert(`No se puede eliminar "${nombre}" porque tiene ${count} producto(s) asociado(s).`)
      return
    }
    if (!confirm(`¿Eliminar la categoría "${nombre}"?`)) return
    await action(id)
  }

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-500 hover:underline"
    >
      Eliminar
    </button>
  )
}
