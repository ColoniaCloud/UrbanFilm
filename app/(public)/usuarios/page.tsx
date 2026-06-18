import Image from 'next/image'
import type { Metadata } from 'next'
import UsuariosForm from '@/components/UsuariosForm'

export const metadata: Metadata = {
  title: 'Para conductores | Urban Film',
}

export default function UsuariosPage() {
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
            Para conductores
          </p>
          <h1
            className="text-4xl md:text-5xl font-black leading-tight mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Comenzá a disfrutar de tu vehículo
          </h1>
          <p className="text-white/60 text-base leading-relaxed body-text">
            Completá el formulario y a la brevedad te responderemos indicándote cuáles son las opciones que tenés más cerca para colocar las láminas de Urban.
          </p>
        </div>

        {/* Right */}
        <UsuariosForm />
      </div>
    </section>
  )
}
