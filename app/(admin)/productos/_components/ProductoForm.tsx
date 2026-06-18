'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type FormState = { error?: string } | undefined

type Categoria = { id: number; nombre: string }

type DefaultValues = {
  nombre?: string | null
  descripcion?: string | null
  imagen?: string | null
  categoriaId?: number
  activo?: boolean
}

type Props = {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  categorias: Categoria[]
  defaultValues?: DefaultValues
}

export default function ProductoForm({ action, categorias, defaultValues }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined)
  const [preview, setPreview] = useState<string | null>(defaultValues?.imagen ?? null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-6 max-w-2xl">
      {state?.error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
          {state.error}
        </p>
      )}

      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
          Nombre *
        </label>
        <input
          type="text"
          name="nombre"
          required
          defaultValue={defaultValues?.nombre ?? ''}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
          Categoría *
        </label>
        <select
          name="categoriaId"
          required
          defaultValue={defaultValues?.categoriaId ?? ''}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors bg-white"
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
          Descripción
        </label>
        <textarea
          name="descripcion"
          rows={4}
          defaultValue={defaultValues?.descripcion ?? ''}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
          Imagen
        </label>
        {preview && (
          <div className="relative w-48 h-32 mb-3 bg-gray-100">
            <Image src={preview} alt="Preview" fill className="object-cover" sizes="192px" />
          </div>
        )}
        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 px-4 py-3 text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="activo"
          id="activo"
          defaultChecked={defaultValues?.activo ?? true}
          className="w-4 h-4"
        />
        <label htmlFor="activo" className="text-sm font-semibold uppercase tracking-wider">
          Activo (visible en el sitio)
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-black text-white px-8 py-3 font-semibold uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {pending ? 'Guardando...' : 'Guardar'}
        </button>
        <Link
          href="/productos"
          className="px-8 py-3 border border-gray-300 text-sm font-semibold uppercase tracking-wider hover:border-black transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
