'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MapPin, Search } from 'lucide-react'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/categories/pueblo-slopper', label: 'Slopper Trail' },
  { href: '/categories/breweries', label: 'Breweries' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'List Your Restaurant' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Dine Pueblo home">
            <Logo className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-[#D4A853]'
                    : 'text-[#8B949E] hover:text-[#E6EDF3]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/restaurants"
              className="flex items-center gap-1.5 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors min-h-[44px] px-2"
            >
              <Search size={16} />
              Search
            </Link>
            <Link
              href="/request-listing"
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors min-h-[44px]"
              style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
            >
              <MapPin size={15} />
              Add Restaurant
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="lg:hidden border-t"
          style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}
        >
          <nav className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-3 py-3 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-[#D4A853]'
                    : 'text-[#8B949E] hover:text-[#E6EDF3]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-listing"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold min-h-[44px]"
              style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
            >
              <MapPin size={15} />
              Add Your Restaurant
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
