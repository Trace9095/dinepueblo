import { db, restaurants } from '@/db'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { Star, Award, Globe } from 'lucide-react'
import { requireAdmin } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'

export default async function AdminRestaurantsPage() {
  await requireAdmin()
  const all = await db.select().from(restaurants).orderBy(desc(restaurants.createdAt))

  return (
    <AdminShell>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#E6EDF3]">Restaurants</h1>
            <p className="text-[#8B949E] mt-0.5">{all.length} total listings</p>
          </div>
        </div>
        <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #30363D' }}>
                  {['Restaurant', 'Cuisine', 'Price', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#8B949E] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#30363D' }}>
                {all.map(r => (
                  <tr key={r.id} className="hover:bg-[#21262D] transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-[#E6EDF3]">{r.name}</p>
                        <p className="text-xs text-[#8B949E] mt-0.5">{r.neighborhood ?? r.address?.split(',')[0]}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#8B949E]">{r.cuisine ?? '—'}</td>
                    <td className="px-4 py-3 text-[#D4A853] font-mono">{r.priceRange}</td>
                    <td className="px-4 py-3">
                      {r.rating !== null ? (
                        <span className="flex items-center gap-1 text-[#E6EDF3]">
                          <Star size={12} className="text-[#D4A853] fill-[#D4A853]" />{r.rating.toFixed(1)}
                        </span>
                      ) : <span className="text-[#8B949E]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {r.featured && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#D4A85320', color: '#D4A853' }}>Featured</span>}
                        {r.isPremium && <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5" style={{ backgroundColor: '#D4A85340', color: '#D4A853' }}><Award size={9} />Premium</span>}
                        {r.isClaimed && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#21262D', color: '#8B949E' }}>Claimed</span>}
                        {!r.featured && !r.isPremium && !r.isClaimed && <span className="text-xs text-[#8B949E]">Standard</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/restaurants/${r.slug}`}
                        target="_blank"
                        className="flex items-center gap-1 text-xs text-[#D4A853] hover:underline"
                      >
                        <Globe size={11} /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
