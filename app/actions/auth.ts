'use server'

import { compare } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/lib/session'
import { db } from '@/lib/db'

export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string } | undefined> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos' }
  }

  const usuario = await db.usuario.findUnique({ where: { email } })
  if (!usuario) {
    return { error: 'Credenciales inválidas' }
  }

  const valid = await compare(password, usuario.password)
  if (!valid) {
    return { error: 'Credenciales inválidas' }
  }

  await createSession({ userId: usuario.id, email: usuario.email })
  redirect('/dashboard')
  return undefined
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
