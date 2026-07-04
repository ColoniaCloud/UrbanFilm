'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link href={href} className="group relative py-1">
      <span className={active ? 'text-white' : 'text-white/80 group-hover:text-white transition-colors'}>
        {label}
      </span>
      <span
        className={
          'absolute left-0 -bottom-0.5 h-px bg-white transition-all duration-300 ease-out ' +
          (active ? 'w-full' : 'w-0 group-hover:w-full')
        }
      />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-4 z-50 h-16">
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-black/85 backdrop-blur-[8px] text-white rounded-2xl shadow-xl shadow-black/20 border border-white/10 flex items-center justify-between h-16 px-[26px]"
        >
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
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative h-6 w-6"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={open}
          >
            <motion.span
              className="absolute left-0 top-1 block h-0.5 w-6 bg-white"
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute left-0 top-2.75 block h-0.5 w-6 bg-white"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute left-0 top-4.75 block h-0.5 w-6 bg-white"
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden absolute left-4 right-4 top-full mt-2 bg-black/85 backdrop-blur-[8px] border border-white/10 rounded-2xl px-4 py-4 flex flex-col gap-4 text-sm font-medium shadow-xl shadow-black/20 origin-top"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
