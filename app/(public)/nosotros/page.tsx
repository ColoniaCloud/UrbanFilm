import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conocé la historia y valores de Urban Film.',
}

export default function NosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-black uppercase tracking-widest mb-4">Nosotros</h1>
      <p className="text-gray-400 text-lg mb-16 uppercase tracking-wider">Urban Film</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Nuestra historia</h2>
          <p className="text-gray-600 leading-relaxed">
            Urban Film nació de la pasión por el detalle automotriz y la búsqueda de los mejores
            materiales para proteger y embellecer tu vehículo. Años de experiencia en el mercado
            nos respaldan como referentes en láminas de polarizado.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Nuestra misión</h2>
          <p className="text-gray-600 leading-relaxed">
            Ofrecemos productos de alta calidad con garantía de durabilidad y rendimiento.
            Cada lámina es seleccionada por nuestros especialistas para garantizar la mejor
            experiencia tanto en instalación como en uso diario.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
        {[
          { valor: '100%', label: 'Productos certificados' },
          { valor: '+5 años', label: 'En el mercado' },
          { valor: 'A+', label: 'Atención al cliente' },
        ].map((item) => (
          <div key={item.label} className="border border-black p-8 text-center">
            <p className="text-4xl font-black mb-2">{item.valor}</p>
            <p className="text-sm text-gray-500 uppercase tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/contacto"
          className="bg-black text-white px-10 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
        >
          Hablemos
        </Link>
      </div>
    </div>
  )
}
