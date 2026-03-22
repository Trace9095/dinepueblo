import { db, restaurants, claims, listingRequests } from '@/db'
import { eq, count } from 'drizzle-orm'
import { UtensilsCrossed, Award, ClipboardList, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'

export default async function AdminDashboard() {
  await requireAdmin()

  const [totalRest, featuredRest, pendingClaims, pendingRequests] = await Promise.all([
    db.select({ count: count() }).from(restaurants),
    db.select({ count: count() }).from(restaurants).where(eq(restaurants.featured, true)),
    db.select({ count: count() }).from(claims).where(eq(claims.status, 'pending')),
    db.select({ count: count() }).from(listingRequests).where(eq(listingRequests.status, 'pending')),
  ])

  const stats = [
    { label: 'Total Restaurants', value: totalRest[0]?.count ?? 0, icon: UtensilsCrossed, href: '/admin/restaurants' },
    { label: 'Featured Listings', value: featuredRest[0]?.count ?? 0, icon: TrendingUp, href: '/admin/restaurants' },
    { label: 'Pending Claims', value: pendingClaims[0]?.count ?? 0, icon: Award, href: '/admin/claims', urgent: (pendingClaims[0]?.count ?? 0) > 0 },
    { label: 'Listing Requests', value: pendingRequests[0]?.count ?? 0, icon: ClipboardList, href: '/admin/requests', urgent: (pendingRequests[0]?.count ?? 0) > 0 },
  ]

  const recentRestaurants = await db.select().from(restaurants).limit(5)

  return (
    <AdminShell>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Dashboard</h1>
          <p className="text-[#8B949E] mt-1">Dine Pueblo Admin — Pueblo, CO</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, href, urgent }) => (
            <Link
              key={label}
              href={href}
              className="rounded-xl border p-5 transition-all hover:border-[#D4A853]/40 min-h-[44px]"
              style={{ backgroundColor: '#161B22', borderColor: urgent ? '#D4A85360' : '#30363D' }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-[#8B949E] font-medium uppercase tracking-wider">{label}</p>
                <Icon size={16} className={urgent ? 'text-[#D4A853]' : 'text-[#8B949E]'} />
              </div>
              <p className="text-3xl font-bold" style={{ color: urgent ? '#D4A853' : '#E6EDF3' }}>{value}</p>
            </Link>
          ))}
        </div>

        <div className="rounded-xl border" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#30363D' }}>
            <h2 className="text-sm font-semibold text-[#E6EDF3]">Recent Restaurants</h2>
            <Link href="/admin/restaurants" className="text-xs text-[#D4A853] hover:underline">View all</Link>
          </div>
          <div className="divide-y" style={{ borderColor: '#30363D' }}>
            {recentRestaurants.map(r => (
              <div key={r.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-[#E6EDF3]">{r.name}</p>
                  <p className="text-xs text-[#8B949E]">{r.cuisine ?? 'Unknown cuisine'} · {r.neighborhood ?? r.address?.split(',')[0]}</p>
                </div>
                <div className="flex items-center gap-2">
                  {r.isPremium && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#D4A85320', color: '#D4A853' }}>Premium</span>}
                  {r.featured && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#21262D', color: '#8B949E' }}>Featured</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
