import Image from 'next/image'
import Link from 'next/link'

const PAISES = [
  { pais: 'Argentina', ciudad: 'Buenos Aires', svg: '/img/flag-argentina.svg' },
  { pais: 'Brasil', ciudad: 'São Paulo', svg: '/img/flag-brasil.svg' },
  { pais: 'Chile', ciudad: 'Santiago', svg: '/img/flag-chile.svg' },
  { pais: 'Uruguay', ciudad: 'Montevideo', svg: '/img/flag-uruguay.svg' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Image
            src="/img/logo-f.png"
            alt="Urban Film"
            width={120}
            height={48}
            className="h-auto w-auto mb-4"
          />
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Distribución de láminas polarizadas para instaladores profesionales. Origen USA.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/instaladores" className="btn btn-tertiary text-xs py-2 px-4 justify-start">
              Para instaladores
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <a href="mailto:ventas@urbanfilm.net" className="hover:text-white transition-colors">
                ventas@urbanfilm.net
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <p className="mb-4 text-xs uppercase tracking-widest text-white/60">Presentes en 4 países</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {PAISES.map(({ pais, ciudad, svg }) => (
            <li key={pais} className="flex items-center gap-3">
              <Image
                src={svg}
                alt={`Bandera de ${pais}`}
                width={28}
                height={20}
                className="rounded-sm object-cover"
              />
              <span className="text-sm text-white/80">
                {pais} <span className="text-white/60">· {ciudad}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-white/60 py-4">
        {new Date().getFullYear()} Urban Film. Todos los derechos reservados.
      </div>
    </footer>
  )
}
