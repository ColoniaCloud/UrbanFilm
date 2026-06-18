import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactá a Urban Film para consultas sobre nuestros productos.',
}

export default function ContactoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black uppercase tracking-widest mb-4">Contacto</h1>
      <p className="text-gray-500 mb-16">
        Completá el formulario y te respondemos a la brevedad.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider mb-2">
              Mensaje
            </label>
            <textarea
              name="mensaje"
              rows={5}
              required
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-semibold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
          >
            Enviar mensaje
          </button>
        </form>

        <div className="space-y-8">
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-3 text-sm">Email</h3>
            <a
              href="mailto:ventas@urbanfil.net"
              className="text-gray-600 hover:text-black transition-colors"
            >
              ventas@urbanfil.net
            </a>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest mb-4 text-sm">Dónde estamos</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { pais: 'Argentina', ciudad: 'Buenos Aires', svg: '/img/flag-argentina.svg' },
                { pais: 'Brasil', ciudad: 'São Paulo', svg: '/img/flag-brasil.svg' },
                { pais: 'Chile', ciudad: 'Santiago', svg: '/img/flag-chile.svg' },
                { pais: 'Uruguay', ciudad: 'Montevideo', svg: '/img/flag-uruguay.svg' },
              ].map(({ pais, ciudad, svg }) => (
                <div key={pais} className="flex items-center gap-3 border border-gray-100 rounded-lg p-3">
                  <Image
                    src={svg}
                    alt={`Bandera de ${pais}`}
                    width={32}
                    height={22}
                    className="rounded shadow-sm object-cover shrink-0"
                  />
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wide heading">{pais}</p>
                    <p className="text-xs text-gray-400 body-text">{ciudad}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
