'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Award, Check, Zap, Star, Loader2 } from 'lucide-react'
import { CLAIM_TIERS, type ClaimTier } from '@/lib/stripe'

interface PageProps { params: Promise<{ slug: string }> }

export default function ClaimPage({ params }: PageProps) {
  const { slug } = use(params)
  const [tier, setTier] = useState<ClaimTier>('basic')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) { setError('Name and email are required'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantSlug: slug, contactName: name, contactEmail: email, contactPhone: phone, tier }),
      })
      const data = await res.json() as { url?: string; error?: string }
      if (!res.ok || !data.url) { setError(data.error ?? 'Something went wrong'); setLoading(false); return }
      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  const selectedTier = CLAIM_TIERS[tier]

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <Link href={`/restaurants/${slug}`} className="flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#D4A853] mb-8 transition-colors min-h-[44px]">
        <ArrowLeft size={14} /> Back to restaurant
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#E6EDF3] mb-3">Claim This Listing</h1>
        <p className="text-[#8B949E]">Verify ownership and get more visibility for your restaurant on Dine Pueblo.</p>
      </div>

      {/* Tier Selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {(['basic', 'premium'] as ClaimTier[]).map(t => {
          const tc = CLAIM_TIERS[t]
          const selected = tier === t
          return (
            <button
              key={t}
              onClick={() => setTier(t)}
              className="text-left rounded-xl p-5 border transition-all min-h-[44px]"
              style={{
                backgroundColor: '#161B22',
                borderColor: selected ? '#D4A853' : '#30363D',
                boxShadow: selected ? '0 0 0 1px #D4A853' : undefined,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                {t === 'premium' ? <Star size={16} className="text-[#D4A853]" /> : <Zap size={16} className="text-[#8B949E]" />}
                <span className="text-sm font-semibold text-[#E6EDF3]">{tc.name}</span>
              </div>
              <p className="text-xl font-bold" style={{ color: selected ? '#D4A853' : '#E6EDF3' }}>
                {t === 'basic' ? '$99' : '$199'}<span className="text-sm font-normal text-[#8B949E]">/yr</span>
              </p>
              <ul className="mt-3 space-y-1.5">
                {tc.features.slice(0, 3).map(f => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-[#8B949E]">
                    <Check size={11} className="text-[#D4A853] mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-xl p-6 border space-y-4" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
        <h2 className="text-base font-semibold text-[#E6EDF3] mb-2">Your Contact Info</h2>
        {error && <p className="text-sm text-[#F85149] p-3 rounded-lg" style={{ backgroundColor: '#F8514910' }}>{error}</p>}
        <div>
          <label className="block text-sm text-[#8B949E] mb-1.5">Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full px-3 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px]"
            style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
          />
        </div>
        <div>
          <label className="block text-sm text-[#8B949E] mb-1.5">Business Email *</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@yourrestaurant.com"
            required
            className="w-full px-3 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px]"
            style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
          />
        </div>
        <div>
          <label className="block text-sm text-[#8B949E] mb-1.5">Phone (optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="(719) 555-0100"
            className="w-full px-3 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px]"
            style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 min-h-[52px]"
          style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : `Pay ${selectedTier.label} — Proceed to Checkout`}
        </button>
        <p className="text-xs text-[#8B949E] text-center">Secure payment via Stripe. No subscription — one-time annual fee.</p>
      </form>
    </div>
  )
}
