import { db, claims } from '@/db'
import { desc } from 'drizzle-orm'
import { requireAdmin } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'

export default async function AdminClaimsPage() {
  await requireAdmin()
  const all = await db.select().from(claims).orderBy(desc(claims.createdAt))

  const statusColor = (s: string) => {
    if (s === 'approved') return { bg: '#23863620', text: '#3FB950' }
    if (s === 'rejected') return { bg: '#F8514920', text: '#F85149' }
    return { bg: '#D4A85320', text: '#D4A853' }
  }

  return (
    <AdminShell>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Listing Claims</h1>
          <p className="text-[#8B949E] mt-0.5">{all.length} total · {all.filter(c => c.status === 'pending').length} pending</p>
        </div>
        {all.length === 0 ? (
          <div className="rounded-xl border p-12 text-center" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
            <p className="text-[#8B949E]">No claims yet.</p>
          </div>
        ) : (
          <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #30363D' }}>
                    {['Restaurant', 'Contact', 'Tier', 'Status', 'Date'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#8B949E] uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#30363D' }}>
                  {all.map(c => {
                    const sc = statusColor(c.status)
                    return (
                      <tr key={c.id} className="hover:bg-[#21262D] transition-colors">
                        <td className="px-4 py-3 font-medium text-[#E6EDF3]">{c.restaurantName}</td>
                        <td className="px-4 py-3">
                          <p className="text-[#E6EDF3]">{c.contactName}</p>
                          <p className="text-xs text-[#8B949E]">{c.contactEmail}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 rounded-full font-semibold uppercase" style={{ backgroundColor: '#D4A85320', color: '#D4A853' }}>{c.tier}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 rounded-full capitalize font-medium" style={{ backgroundColor: sc.bg, color: sc.text }}>{c.status}</span>
                        </td>
                        <td className="px-4 py-3 text-[#8B949E] text-xs whitespace-nowrap">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
