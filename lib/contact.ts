// Número de WhatsApp de ventas, en formato internacional y sin símbolos (ej. 5491112345678).
// Se define con NEXT_PUBLIC_WHATSAPP_NUMBER al construir el sitio. Mientras no exista,
// `whatsappUrl` devuelve null y los botones de WhatsApp no se muestran.
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

export const whatsappUrl = (message: string): string | null =>
  WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : null

export const SALES_EMAIL = 'ventas@urbanfilm.net'
