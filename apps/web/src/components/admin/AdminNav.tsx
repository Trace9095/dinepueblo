'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, UtensilsCrossed, Award, ClipboardList, LogOut, Menu, X } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
  { href: '/admin/claims', label: 'Claims', icon: Award },
  { href: '/admin/requests', label: 'Listing Requests', icon: ClipboardList },
]

export function AdminNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const NavLinks = () => (
    <>
      {NAV.map(({ href, label, icon: Icon, exact }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px]',
            isActive(href, exact)
              ? 'text-[#0D1117] font-semibold'
              : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'
          )}
          style={isActive(href, exact) ? { backgroundColor: '#D4A853' } : {}}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
      <form action="/api/auth/logout" method="POST" className="mt-auto pt-4">
        <button
          type="submit"
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] text-[#8B949E] hover:text-[#F85149] hover:bg-[#21262D]"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </form>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center border"
        style={{ backgroundColor: '#161B22', borderColor: '#30363D', color: '#E6EDF3' }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 border-r z-40 flex flex-col p-4 transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
      >
        <div className="mb-8 pt-2 pl-2">
          <Logo className="h-8 w-auto" />
          <p className="text-xs text-[#8B949E] mt-1 pl-0.5">Admin Dashboard</p>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          <NavLinks />
        </nav>
      </aside>

      {/* Backdrop */}
      {open && <div className="lg:hidden fixed inset-0 z-30 bg-black/60" onClick={() => setOpen(false)} />}
    </>
  )
}
