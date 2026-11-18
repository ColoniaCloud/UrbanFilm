'use server'

import { headers } from 'next/headers'
import { SALES_EMAIL } from '@/lib/contact'
import { correoConfigurado, enviarCorreo } from '@/lib/mailer'

export type Formulario = 'contacto' | 'instalador' | 'usuario'
export type Envio = { ok: true } | { ok: false; error: string }

type Campo = { clave: string; etiqueta: string; requerido: boolean; max: number }

const PAISES = ['Argentina', 'Brasil', 'Chile', 'Uruguay']

const CAMPOS: Record<Formulario, Campo[]> = {
  contacto: [
    { clave: 'nombre', etiqueta: 'Nombre', requerido: true, max: 100 },
    { clave: 'email', etiqueta: 'Email', requerido: true, max: 150 },
    { clave: 'telefono', etiqueta: 'Teléfono', requerido: false, max: 40 },
    { clave: 'mensaje', etiqueta: 'Mensaje', requerido: true, max: 2000 },
  ],
  instalador: [
    { clave: 'nombre', etiqueta: 'Nombre completo', requerido: true, max: 100 },
    { clave: 'taller', etiqueta: 'Taller o negocio', requerido: true, max: 120 },
    { clave: 'direccion', etiqueta: 'Dirección', requerido: true, max: 200 },
    { clave: 'pais', etiqueta: 'País', requerido: true, max: 20 },
    { clave: 'telefono', etiqueta: 'Teléfono', requerido: true, max: 40 },
    { clave: 'email', etiqueta: 'Email', requerido: true, max: 150 },
  ],
  usuario: [
    { clave: 'nombre', etiqueta: 'Nombre completo', requerido: true, max: 100 },
    { clave: 'telefono', etiqueta: 'Teléfono', requerido: true, max: 40 },
    { clave: 'direccion', etiqueta: 'Dirección', requerido: true, max: 200 },
    { clave: 'pais', etiqueta: 'País', requerido: true, max: 20 },
    { clave: 'email', etiqueta: 'Email', requerido: true, max: 150 },
  ],
}

const ASUNTOS: Record<Formulario, string> = {
  contacto: 'Consulta desde la web',
  instalador: 'Nuevo instalador interesado',
  usuario: 'Nuevo usuario final interesado',
}

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Límite por IP: 5 envíos cada 10 minutos. Vive en la memoria del proceso, alcanza para
// frenar abuso básico; si el sitio escala a varias instancias conviene moverlo a Redis.
const VENTANA_MS = 10 * 60 * 1000
const MAX_ENVIOS = 5
const envios = new Map<string, number[]>()

const superaLimite = (ip: string) => {
  const ahora = Date.now()
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS)
  if (recientes.length >= MAX_ENVIOS) {
    envios.set(ip, recientes)
    return true
  }
  envios.set(ip, [...recientes, ahora])
  return false
}

const falla = (error: string): Envio => ({ ok: false, error })

const MENSAJE_ALTERNATIVO = `Escribinos a ${SALES_EMAIL} y te respondemos a la brevedad.`

export async function enviarFormulario(
  formulario: Formulario,
  datos: Record<string, string | boolean>,
): Promise<Envio> {
  const campos = CAMPOS[formulario]
  if (!campos) return falla('Formulario no válido.')

  // Campo trampa: los bots lo completan, las personas no lo ven. Se responde como si todo
  // hubiera salido bien para no darles pistas.
  if (typeof datos.web === 'string' && datos.web.trim() !== '') return { ok: true }

  const limpio: Record<string, string> = {}
  for (const { clave, etiqueta, requerido, max } of campos) {
    const valor = typeof datos[clave] === 'string' ? (datos[clave] as string).trim() : ''
    if (requerido && valor === '') return falla(`Completá el campo «${etiqueta}».`)
    if (valor.length > max) return falla(`El campo «${etiqueta}» es demasiado largo.`)
    limpio[clave] = valor
  }

  if (!EMAIL_VALIDO.test(limpio.email)) return falla('Revisá el email: no parece válido.')
  if ('pais' in limpio && !PAISES.includes(limpio.pais)) return falla('Elegí un país de la lista.')
  if (formulario === 'usuario' && datos.condiciones !== true) return falla('Tenés que aceptar las condiciones.')

  const cabeceras = await headers()
  const ip = cabeceras.get('x-forwarded-for')?.split(',')[0]?.trim() || cabeceras.get('x-real-ip') || 'desconocida'
  if (superaLimite(ip)) return falla('Enviaste varios mensajes seguidos. Probá de nuevo en unos minutos.')

  if (!correoConfigurado()) {
    console.error('[formularios] Envío de correo no configurado (faltan SMTP_HOST, SMTP_USER o SMTP_PASS).')
    return falla(`Por ahora no podemos recibir el formulario desde la web. ${MENSAJE_ALTERNATIVO}`)
  }

  const texto = [
    ASUNTOS[formulario],
    '',
    ...campos.filter((c) => limpio[c.clave] !== '').map((c) => `${c.etiqueta}: ${limpio[c.clave]}`),
    '',
    `Enviado desde urbanfilm.net el ${new Intl.DateTimeFormat('es-AR', {
      dateStyle: 'short',
      timeStyle: 'short',
      hourCycle: 'h23',
      timeZone: 'America/Argentina/Buenos_Aires',
    }).format(new Date())} (hora de Buenos Aires)`,
  ].join('\n')

  try {
    await enviarCorreo({
      asunto: `[Urban Film] ${ASUNTOS[formulario]}: ${limpio.nombre}`,
      texto,
      responderA: limpio.email,
    })
    return { ok: true }
  } catch (error) {
    // Se registra solo el motivo técnico, nunca los datos de la persona.
    console.error('[formularios] No se pudo enviar el correo:', error instanceof Error ? error.message : error)
    return falla(`No pudimos enviar tu mensaje. ${MENSAJE_ALTERNATIVO}`)
  }
}
