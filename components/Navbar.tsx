'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-4 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-black/85 backdrop-blur-[8px] text-white rounded-2xl shadow-xl shadow-black/20 border border-white/10 flex items-center justify-between h-16 px-[26px]">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/img/logo-h.png"
              alt="Urban Film"
              width={125}
              height={36}
              priority
              className="w-auto h-auto"
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-gray-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            <span className="block w-6 h-0.5 bg-white mb-1" />
            <span className="block w-6 h-0.5 bg-white mb-1" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>

        {open && (
          <nav className="md:hidden bg-black/85 backdrop-blur-[8px] border border-white/10 rounded-b-2xl mt-2 px-4 pb-4 flex flex-col gap-4 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-gray-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
