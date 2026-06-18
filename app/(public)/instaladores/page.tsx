import Image from 'next/image'
import type { Metadata } from 'next'
import InstaladorForm from '@/components/InstaladorForm'

export const metadata: Metadata = {
  title: 'Para instaladores | Urban Film',
}

export default function InstaladorPage() {
  return (
    <section className="relative min-h-screen -mt-16 flex items-center">
      <Image
        src="/img/karbon.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/72" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="text-white">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4 body-text">
            Para instaladores
          </p>
          <h1
            className="text-4xl md:text-5xl font-black leading-tight mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Comenzá a ganar más con tu trabajo
          </h1>
          <p className="text-white/60 text-base leading-relaxed body-text">
            Las láminas de Urban Film te ofrecen ganancias por todos lados: menos tiempo de instalación, mayor margen de ganancias y respaldo del importador.
          </p>
        </div>

        {/* Right */}
        <InstaladorForm />
      </div>
    </section>
  )
}
