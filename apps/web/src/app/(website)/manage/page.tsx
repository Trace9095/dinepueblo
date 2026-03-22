import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, CheckCircle, Clock, XCircle, Zap, Star, ArrowRight, Mail } from 'lucide-react'
import { getClaimsByEmail } from '@/lib/db-helpers'

export const metadata: Metadata = {
  title: 'Manage Your Listing | Dine Pueblo',
  description: 'Look up your Dine Pueblo restaurant listing, view your current plan, and manage your subscription.',
  alternates: { canonical: 'https://dinepueblo.com/manage' },
}

interface PageProps {
  searchParams: Promise<{ email?: string }>
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'approved') {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: '#1a3a2a', color: '#3fb950' }}>
        <CheckCircle size={12} /> Active
      </span>
    )
  }
  if (status === 'pending') {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: '#2a2a1a', color: '#d29922' }}>
        <Clock size={12} /> Pending Review
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: '#2a1a1a', color: '#f85149' }}>
      <XCircle size={12} /> Rejected
    </span>
  )
}

export default async function ManagePage({ searchParams }: PageProps) {
  const { email } = await searchParams
  const claims = email ? await getClaimsByEmail(email) : []

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">Manage Your Listing</h1>
        <p className="text-[#8B949E]">Enter the email address you used when claiming your listing to view your plan details.</p>
      </div>

      {/* Lookup Form */}
      <form method="GET" action="/manage" className="flex gap-3 mb-10">
        <div className="relative flex-1">
          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B949E]" />
          <input
            name="email"
            type="email"
            defaultValue={email ?? ''}
            placeholder="your@email.com"
            required
            className="w-full rounded-xl border pl-10 pr-4 py-3 text-sm text-[#E6EDF3] placeholder-[#8B949E] outline-none focus:border-[#D4A853] transition-colors min-h-[44px]"
            style={{ backgroundColor: '#21262D', borderColor: '#30363D' }}
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-105 min-h-[44px] flex-shrink-0"
          style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
        >
          <Search size={15} />
          Look Up
        </button>
      </form>

      {/* Results */}
      {email && (
        <>
          {claims.length === 0 ? (
            <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
              <p className="text-[#E6EDF3] font-semibold mb-2">No listings found</p>
              <p className="text-sm text-[#8B949E] mb-6">No active claims found for <span className="text-[#E6EDF3]">{email}</span>. Make sure you use the same email you paid with.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/restaurants"
                  className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold min-h-[44px] transition-all hover:scale-105"
                  style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
                >
                  Find My Restaurant
                  <ArrowRight size={14} />
                </Link>
                <a
                  href="mailto:CEO@epicai.ai?subject=DinePueblo Listing Help"
                  className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border min-h-[44px] transition-colors"
                  style={{ borderColor: '#30363D', color: '#E6EDF3' }}
                >
                  Contact Support
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#8B949E] mb-2">{claims.length} listing{claims.length !== 1 ? 's' : ''} found for <span className="text-[#E6EDF3]">{email}</span></p>
              {claims.map(claim => {
                const renewalDate = claim.paidAt
                  ? new Date(new Date(claim.paidAt).setFullYear(new Date(claim.paidAt).getFullYear() + 1)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : null
                const isPremium = claim.tier === 'premium'

                return (
                  <div
                    key={claim.id}
                    className="rounded-2xl border p-6"
                    style={{ backgroundColor: '#161B22', borderColor: isPremium ? '#D4A85340' : '#30363D' }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-lg font-bold text-[#E6EDF3]">{claim.restaurantName}</h2>
                        <p className="text-sm text-[#8B949E] mt-0.5">{claim.contactName}</p>
                      </div>
                      <StatusBadge status={claim.status} />
                    </div>

                    {/* Plan */}
                    <div className="rounded-xl p-4 border mb-4" style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}>
                      <div className="flex items-center gap-2 mb-1">
                        {isPremium
                          ? <Star size={15} className="text-[#D4A853]" />
                          : <Zap size={15} className="text-[#8B949E]" />
                        }
                        <span className="text-sm font-semibold text-[#E6EDF3]">
                          {isPremium ? 'Premium Listing' : 'Basic Listing'} — {isPremium ? '$199/year' : '$99/year'}
                        </span>
                      </div>
                      {renewalDate && (
                        <p className="text-xs text-[#8B949E] mt-1">Renews {renewalDate}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {claim.restaurantSlug && (
                        <Link
                          href={`/restaurants/${claim.restaurantSlug}`}
                          className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium border min-h-[44px] transition-colors"
                          style={{ borderColor: '#30363D', color: '#E6EDF3' }}
                        >
                          View Listing
                        </Link>
                      )}
                      {!isPremium && claim.status === 'approved' && claim.restaurantSlug && (
                        <Link
                          href={`/claim/${claim.restaurantSlug}?upgrade=true`}
                          className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold min-h-[44px] transition-all hover:scale-105"
                          style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
                        >
                          <Star size={14} />
                          Upgrade to Premium ($199/yr)
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Support */}
              <div className="rounded-xl border p-5 mt-4" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
                <p className="text-sm font-semibold text-[#E6EDF3] mb-1">Need help?</p>
                <p className="text-sm text-[#8B949E] mb-3">To update your restaurant info, cancel, or get support — email us directly.</p>
                <a
                  href="mailto:CEO@epicai.ai?subject=DinePueblo Listing Management"
                  className="inline-flex items-center gap-2 text-sm text-[#D4A853] hover:underline"
                >
                  <Mail size={13} />
                  CEO@epicai.ai
                </a>
              </div>
            </div>
          )}
        </>
      )}

      {!email && (
        <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
          <p className="text-[#8B949E] text-sm">Enter your email above to look up your listing plan.</p>
          <div className="mt-6 pt-6 border-t" style={{ borderColor: '#30363D' }}>
            <p className="text-sm text-[#8B949E] mb-4">Don&apos;t have a listing yet?</p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold min-h-[44px] transition-all hover:scale-105"
              style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
            >
              View Plans — from $99/year
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
