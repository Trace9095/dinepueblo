import Link from 'next/link'
import { MapPin, ExternalLink } from 'lucide-react'
import { Logo } from './Logo'

const CATEGORIES = [
  { href: '/categories/pueblo-slopper', label: 'Pueblo Slopper' },
  { href: '/categories/mexican', label: 'Mexican & New Mexican' },
  { href: '/categories/breweries', label: 'Craft Breweries' },
  { href: '/categories/italian', label: 'Italian' },
  { href: '/categories/riverwalk', label: 'Riverwalk Dining' },
  { href: '/categories/bbq', label: 'BBQ & Smokehouse' },
  { href: '/categories/breakfast', label: 'Breakfast & Brunch' },
  { href: '/categories/fine-dining', label: 'Fine Dining' },
]

const QUICK_LINKS = [
  { href: '/restaurants', label: 'All Restaurants' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'List Your Restaurant' },
  { href: '/manage', label: 'Manage My Listing' },
]

const SISTER_SITES = [
  { href: 'https://whitewaterbar.com', label: 'WhiteWater Bar & Grill, Canon City' },
  { href: 'https://wwrooftopsocial.com', label: 'Rooftop Social, Canon City' },
  { href: 'https://royalgorgerafting.net', label: 'Royal Gorge Rafting' },
]

export function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="h-10 w-auto mb-4" />
            <p className="text-sm text-[#8B949E] leading-relaxed mb-4">
              Pueblo, Colorado's premier dining directory. From the legendary Slopper to craft breweries and fine dining.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-[#8B949E]">
              <MapPin size={14} className="text-[#D4A853] flex-shrink-0" />
              Pueblo, Colorado
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-[#8B949E] hover:text-[#D4A853] transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#8B949E] hover:text-[#D4A853] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider mb-4 mt-8">Nearby Dining</h3>
            <ul className="space-y-2">
              {SISTER_SITES.map(s => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8B949E] hover:text-[#D4A853] transition-colors flex items-center gap-1"
                  >
                    {s.label}
                    <ExternalLink size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Listed */}
          <div>
            <h3 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider mb-4">Own a Restaurant?</h3>
            <p className="text-sm text-[#8B949E] mb-4">Get your Pueblo restaurant in front of local diners and visitors. Plans from $99/mo.</p>
            <Link
              href="/pricing"
              className="block text-center rounded-lg px-4 py-3 text-sm font-semibold transition-colors min-h-[44px] flex items-center justify-center"
              style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
            >
              View Listing Plans
            </Link>
            <Link
              href="/manage"
              className="block text-center rounded-lg px-4 py-3 text-sm font-medium transition-colors mt-2 border min-h-[44px] flex items-center justify-center"
              style={{ borderColor: '#30363D', color: '#8B949E' }}
            >
              Manage My Listing
            </Link>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: '#30363D' }}
        >
          <p className="text-sm text-[#8B949E]">
            &copy; {new Date().getFullYear()} Dine Pueblo. Pueblo, Colorado's dining guide.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#8B949E]">
            <Link href="/blog" className="hover:text-[#D4A853] transition-colors">Blog</Link>
            <Link href="/manage" className="hover:text-[#D4A853] transition-colors">Manage Listing</Link>
            <Link href="/pricing" className="hover:text-[#D4A853] transition-colors">List Your Restaurant</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
