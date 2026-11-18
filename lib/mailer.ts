import nodemailer from 'nodemailer'

// Configuración por variables de entorno (nunca en el código):
//   SMTP_HOST, SMTP_PORT (465 por defecto), SMTP_USER, SMTP_PASS
//   MAIL_TO   destinatario de los formularios (ventas@urbanfilm.net por defecto)
//   MAIL_FROM remitente (por defecto, SMTP_USER)
type SmtpConfig = {
  host: string
  port: number
  user: string
  pass: string
  to: string
  from: string
}

const leerConfig = (): SmtpConfig | null => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: MAIL_TO || 'ventas@urbanfilm.net',
    from: MAIL_FROM || SMTP_USER,
  }
}

export const correoConfigurado = () => leerConfig() !== null

type Correo = {
  asunto: string
  texto: string
  /** Dirección de quien escribió: al responder, el mensaje va a esa persona. */
  responderA?: string
}

// Los saltos de línea en asunto o direcciones permitirían inyectar cabeceras.
const sinSaltos = (valor: string) => valor.replace(/[\r\n]+/g, ' ').trim()

export async function enviarCorreo({ asunto, texto, responderA }: Correo): Promise<void> {
  const config = leerConfig()
  if (!config) throw new Error('SMTP no configurado')

  const transporte = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  })

  await transporte.sendMail({
    from: config.from,
    to: config.to,
    replyTo: responderA ? sinSaltos(responderA) : undefined,
    subject: sinSaltos(asunto),
    text: texto,
  })
}
