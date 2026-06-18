'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <form action={action} className="space-y-5">
      {state?.error && (
        <p className="text-red-400 text-sm text-center">{state.error}</p>
      )}

      <div>
        <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder-white/30"
          placeholder="admin@urbanfilm.com"
        />
      </div>

      <div>
        <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder-white/30"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-white text-black py-3 font-semibold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {pending ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  )
}
