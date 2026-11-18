import Image from 'next/image'
import type { Metadata } from 'next'
import ContactoForm from '@/components/ContactoForm'
import { SALES_EMAIL, phone, whatsappUrl } from '@/lib/contact'
import { PRODUCTO_POR_SLUG } from '@/lib/productos-urban'

const title = 'Contacto'
const description = 'Contactá a Urban Film para consultas sobre nuestros productos.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contacto' },
  openGraph: { title, description, url: '/contacto' },
  twitter: { title, description },
}

const PAISES = [
  { pais: 'Argentina', ciudad: 'Buenos Aires', svg: '/img/flag-argentina.svg' },
  { pais: 'Brasil', ciudad: 'São Paulo', svg: '/img/flag-brasil.svg' },
  { pais: 'Chile', ciudad: 'Santiago', svg: '/img/flag-chile.svg' },
  { pais: 'Uruguay', ciudad: 'Montevideo', svg: '/img/flag-uruguay.svg' },
]

const enlaceCls = 'text-gray-700 underline-offset-4 transition-colors hover:text-ink-950 hover:underline'

export default async function ContactoPage({ searchParams }: { searchParams: Promise<{ producto?: string }> }) {
  // Si se llega desde la ficha de un producto, el mensaje arranca mencionándolo.
  const { producto } = await searchParams
  const consultado = producto ? PRODUCTO_POR_SLUG[producto] : undefined
  const mensajeInicial = consultado ? `Hola, quiero consultar por ${consultado.nombre}.` : ''

  const whatsapp = whatsappUrl(mensajeInicial || 'Hola, quiero hacer una consulta sobre Urban Film.')

  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <p className="mb-3 text-xs uppercase tracking-widest text-gray-600">Contacto</p>
      <h1 className="heading mb-4 text-4xl font-bold uppercase tracking-widest md:text-5xl">Hablemos</h1>
      <p className="mb-14 max-w-xl text-gray-600">Completá el formulario y te respondemos a la brevedad.</p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr]">
        <ContactoForm mensajeInicial={mensajeInicial} />

        <div className="space-y-10">
          <div>
            <h2 className="heading mb-4 text-sm font-bold uppercase tracking-widest">Escribinos o llamanos</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="block text-xs uppercase tracking-widest text-gray-600">Email</span>
                <a href={`mailto:${SALES_EMAIL}`} className={enlaceCls}>
                  {SALES_EMAIL}
                </a>
              </li>
              {whatsapp ? (
                <li>
                  <span className="block text-xs uppercase tracking-widest text-gray-600">WhatsApp</span>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={enlaceCls}>
                    Escribinos por WhatsApp
                  </a>
                </li>
              ) : null}
              {phone ? (
                <li>
                  <span className="block text-xs uppercase tracking-widest text-gray-600">Teléfono</span>
                  <a href={phone.href} className={enlaceCls}>
                    {phone.display}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h2 className="heading mb-4 text-sm font-bold uppercase tracking-widest">Dónde estamos</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {PAISES.map(({ pais, ciudad, svg }) => (
                <li key={pais} className="surface-card flex items-center gap-3 p-3">
                  <Image
                    src={svg}
                    alt={`Bandera de ${pais}`}
                    width={32}
                    height={22}
                    className="shrink-0 rounded-sm object-cover"
                  />
                  <div>
                    <p className="heading text-xs font-bold uppercase tracking-wide">{pais}</p>
                    <p className="body-text text-xs text-gray-600">{ciudad}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
