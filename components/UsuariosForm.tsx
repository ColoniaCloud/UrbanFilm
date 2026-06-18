'use client'

import { useState } from 'react'

const PAISES = ['Argentina', 'Brasil', 'Chile', 'Uruguay']

const STEPS = [
  { label: 'Datos personales' },
  { label: 'Ubicación' },
  { label: 'Contacto' },
]

type Data = {
  nombre: string
  telefono: string
  direccion: string
  pais: string
  email: string
  condiciones: boolean
}

const initial: Data = {
  nombre: '',
  telefono: '',
  direccion: '',
  pais: '',
  email: '',
  condiciones: false,
}

function canProceed(step: number, d: Data) {
  if (step === 0) return d.nombre.trim() !== '' && d.telefono.trim() !== ''
  if (step === 1) return d.direccion.trim() !== '' && d.pais !== ''
  if (step === 2) return d.email.trim() !== '' && d.condiciones
  return false
}

export default function UsuariosForm() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<Data>(initial)

  const set = (field: keyof Data, value: string | boolean) =>
    setData((d) => ({ ...d, [field]: value }))

  if (done) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center text-white">
        <p className="text-4xl font-black heading mb-3">¡Gracias!</p>
        <p className="text-white/60 body-text text-sm">
          Te respondemos a la brevedad con las opciones disponibles cerca tuyo.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 text-white">
      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < step
                  ? 'bg-white text-black'
                  : i === step
                  ? 'bg-white text-black ring-2 ring-white/30 ring-offset-2 ring-offset-transparent'
                  : 'bg-white/15 text-white/40'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-10 mx-1 transition-colors duration-300 ${
                  i < step ? 'bg-white' : 'bg-white/20'
                }`}
              />
            )}
          </div>
        ))}
        <span className="ml-3 text-xs text-white/40 uppercase tracking-widest body-text">
          {STEPS[step].label}
        </span>
      </div>

      {/* Sliding steps */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          {/* Step 1 */}
          <div className="min-w-full space-y-5 pr-px">
            <Field label="Nombre completo">
              <input
                type="text"
                value={data.nombre}
                onChange={(e) => set('nombre', e.target.value)}
                placeholder="Tu nombre y apellido"
                className={inputCls}
              />
            </Field>
            <Field label="Teléfono">
              <input
                type="tel"
                value={data.telefono}
                onChange={(e) => set('telefono', e.target.value)}
                placeholder="+54 11 0000 0000"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Step 2 */}
          <div className="min-w-full space-y-5 pr-px">
            <Field label="Dirección">
              <input
                type="text"
                value={data.direccion}
                onChange={(e) => set('direccion', e.target.value)}
                placeholder="Calle y número"
                className={inputCls}
              />
            </Field>
            <Field label="País">
              <select
                value={data.pais}
                onChange={(e) => set('pais', e.target.value)}
                className={inputCls}
              >
                <option value="" disabled>Seleccioná tu país</option>
                {PAISES.map((p) => (
                  <option key={p} value={p} className="text-black bg-white">{p}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Step 3 */}
          <div className="min-w-full space-y-5 pr-px">
            <Field label="Email">
              <input
                type="email"
                value={data.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="tu@email.com"
                className={inputCls}
              />
            </Field>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={data.condiciones}
                  onChange={(e) => set('condiciones', e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                    data.condiciones ? 'bg-white border-white' : 'bg-white/10 border-white/30'
                  }`}
                >
                  {data.condiciones && (
                    <svg className="w-3 h-3 text-black" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-white/60 body-text leading-relaxed group-hover:text-white/80 transition-colors">
                Acepto los términos y condiciones de Urban Film
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="btn btn-tertiary text-sm"
          >
            Atrás
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed(step, data)}
            className="btn btn-secondary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={() => setDone(true)}
            disabled={!canProceed(step, data)}
            className="btn btn-secondary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        )}
      </div>
    </div>
  )
}

const inputCls =
  'w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors body-text text-sm'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2 text-white/50 body-text">
        {label}
      </label>
      {children}
    </div>
  )
}
