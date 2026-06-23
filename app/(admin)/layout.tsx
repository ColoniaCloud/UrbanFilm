import Link from 'next/link'
import { logout } from '@/app/actions/auth'

export const dynamic = 'force-dynamic'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/estadisticas', label: 'Estadísticas' },
  { href: '/productos', label: 'Productos' },
  { href: '/productos/categorias', label: 'Cat. Productos' },
  { href: '/blog-admin', label: 'Blog' },
  { href: '/blog-admin/categorias', label: 'Cat. Blog' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-56 bg-black text-white flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/dashboard" className="text-lg font-black uppercase tracking-widest">
            Urban Film
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin</p>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-sm text-gray-400 hover:text-white transition-colors text-left px-2 py-2"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
