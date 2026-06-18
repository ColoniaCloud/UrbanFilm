import Image from 'next/image'
import Link from 'next/link'

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
            Especialistas en láminas de polarizado para vehículos. Protección, privacidad y estilo.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/usuarios" className="btn btn-tertiary text-xs py-2 px-4 justify-start">
              Para usuarios
            </Link>
            <Link href="/instaladores" className="btn btn-tertiary text-xs py-2 px-4 justify-start">
              Para instaladores
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link href="/laminas" className="hover:text-white transition-colors">Láminas</Link></li>
            <li><Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <a href="mailto:ventas@urbanfil.net" className="hover:text-white transition-colors">
                ventas@urbanfil.net
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-white/40 py-4">
        {new Date().getFullYear()} Urban Film. Todos los derechos reservados.
      </div>
    </footer>
  )
}
