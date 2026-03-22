import { db, listingRequests } from '@/db'
import { desc } from 'drizzle-orm'
import { requireAdmin } from '@/lib/auth'
import { AdminShell } from '@/components/admin/AdminShell'

export default async function AdminRequestsPage() {
  await requireAdmin()
  const all = await db.select().from(listingRequests).orderBy(desc(listingRequests.createdAt))

  return (
    <AdminShell>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Listing Requests</h1>
          <p className="text-[#8B949E] mt-0.5">{all.length} total · {all.filter(r => r.status === 'pending').length} pending</p>
        </div>
        {all.length === 0 ? (
          <div className="rounded-xl border p-12 text-center" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
            <p className="text-[#8B949E]">No requests yet.</p>
          </div>
        ) : (
          <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #30363D' }}>
                    {['Restaurant', 'Contact', 'Cuisine', 'Address', 'Status', 'Date'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#8B949E] uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#30363D' }}>
                  {all.map(req => (
                    <tr key={req.id} className="hover:bg-[#21262D] transition-colors">
                      <td className="px-4 py-3 font-medium text-[#E6EDF3]">{req.restaurantName}</td>
                      <td className="px-4 py-3">
                        <p className="text-[#E6EDF3]">{req.contactName}</p>
                        <p className="text-xs text-[#8B949E]">{req.contactEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-[#8B949E]">{req.cuisine ?? '—'}</td>
                      <td className="px-4 py-3 text-[#8B949E] text-xs max-w-[160px] truncate">{req.address ?? '—'}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: '#D4A85320', color: '#D4A853' }}>{req.status}</span>
                      </td>
                      <td className="px-4 py-3 text-[#8B949E] text-xs whitespace-nowrap">{new Date(req.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
