'use client'

import { useId, useState, type ChangeEvent } from 'react'
import { enviarFormulario } from '@/app/actions/contacto'

type Props = {
  /** Texto con el que arranca el mensaje (por ejemplo, al llegar desde la ficha de un producto). */
  mensajeInicial?: string
}

const campoCls =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-ink-950 placeholder:text-gray-500 focus-visible:border-brand-600 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-600'

function Campo({ etiqueta, id, opcional, children }: { etiqueta: string; id: string; opcional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold uppercase tracking-wider">
        {etiqueta}
        {opcional ? <span className="ml-2 text-xs font-normal normal-case tracking-normal text-gray-600">(opcional)</span> : null}
      </label>
      {children}
    </div>
  )
}

export default function ContactoForm({ mensajeInicial = '' }: Props) {
  const base = useId()
  const [datos, setDatos] = useState({ nombre: '', email: '', telefono: '', mensaje: mensajeInicial, web: '' })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  const cambiar = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDatos((d) => ({ ...d, [e.target.name]: e.target.value }))

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEnviando(true)
    setError('')
    try {
      const resultado = await enviarFormulario('contacto', datos)
      if (resultado.ok) setEnviado(true)
      else setError(resultado.error)
    } catch {
      setError('No pudimos enviar el mensaje. Probá de nuevo en unos minutos.')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div role="status" className="surface-card p-8 text-center">
        <p className="heading mb-3 text-3xl font-bold">¡Gracias!</p>
        <p className="body-text text-sm leading-relaxed text-gray-600">
          Recibimos tu mensaje. Te respondemos a la brevedad.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="surface-card relative space-y-6 p-6 sm:p-8">
      <Campo etiqueta="Nombre" id={`${base}-nombre`}>
        <input
          id={`${base}-nombre`}
          type="text"
          name="nombre"
          required
          maxLength={100}
          autoComplete="name"
          value={datos.nombre}
          onChange={cambiar}
          placeholder="Tu nombre"
          className={campoCls}
        />
      </Campo>

      <Campo etiqueta="Email" id={`${base}-email`}>
        <input
          id={`${base}-email`}
          type="email"
          name="email"
          required
          maxLength={150}
          autoComplete="email"
          value={datos.email}
          onChange={cambiar}
          placeholder="tu@email.com"
          className={campoCls}
        />
      </Campo>

      <Campo etiqueta="Teléfono" id={`${base}-telefono`} opcional>
        <input
          id={`${base}-telefono`}
          type="tel"
          name="telefono"
          maxLength={40}
          autoComplete="tel"
          value={datos.telefono}
          onChange={cambiar}
          placeholder="+54 11 0000 0000"
          className={campoCls}
        />
      </Campo>

      <Campo etiqueta="Mensaje" id={`${base}-mensaje`}>
        <textarea
          id={`${base}-mensaje`}
          name="mensaje"
          rows={5}
          required
          maxLength={2000}
          value={datos.mensaje}
          onChange={cambiar}
          placeholder="¿En qué podemos ayudarte?"
          className={`${campoCls} resize-none`}
        />
      </Campo>

      {/* Campo trampa para bots: las personas no lo ven. */}
      <input
        type="text"
        name="web"
        value={datos.web}
        onChange={cambiar}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {error ? (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={enviando} className="btn btn-primary w-full disabled:opacity-60">
        {enviando ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
