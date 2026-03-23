'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, MapPin } from 'lucide-react'

export default function RequestListingPage() {
  const [form, setForm] = useState({ restaurantName: '', contactName: '', contactEmail: '', contactPhone: '', address: '', website: '', cuisine: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.restaurantName || !form.contactName || !form.contactEmail) { setError('Restaurant name, your name, and email are required.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/request-listing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) { setError('Submission failed. Please try again.'); setLoading(false); return }
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={48} className="text-[#D4A853] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#E6EDF3] mb-3">Request Submitted!</h1>
          <p className="text-[#8B949E]">We received your request and will review it shortly. If approved, your restaurant will be added to Dine Pueblo within 1-3 business days.</p>
        </div>
      </div>
    )
  }

  const inputClass = "w-full px-3 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px]"
  const inputStyle = { backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' } as React.CSSProperties

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-12">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={18} className="text-[#D4A853]" />
        <span className="text-sm text-[#D4A853] font-medium">Request a Listing</span>
      </div>
      <h1 className="text-3xl font-bold text-[#E6EDF3] mb-3">Don&apos;t See Your Restaurant?</h1>
      <p className="text-[#8B949E] mb-8">Submit a request and we&apos;ll add it to Dine Pueblo. Basic listings start at $99/mo — upgrade to Premium for $199/mo with featured placement.</p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl p-6 border" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
        {error && <p className="text-sm text-[#F85149] p-3 rounded-lg" style={{ backgroundColor: '#F8514910' }}>{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm text-[#8B949E] mb-1.5">Restaurant Name *</label>
            <input type="text" value={form.restaurantName} onChange={e => update('restaurantName', e.target.value)} required placeholder="e.g. Joe's Diner" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm text-[#8B949E] mb-1.5">Your Name *</label>
            <input type="text" value={form.contactName} onChange={e => update('contactName', e.target.value)} required placeholder="Owner or manager" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm text-[#8B949E] mb-1.5">Your Email *</label>
            <input type="email" value={form.contactEmail} onChange={e => update('contactEmail', e.target.value)} required placeholder="you@restaurant.com" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm text-[#8B949E] mb-1.5">Phone (optional)</label>
            <input type="tel" value={form.contactPhone} onChange={e => update('contactPhone', e.target.value)} placeholder="(719) 555-0100" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm text-[#8B949E] mb-1.5">Cuisine Type</label>
            <input type="text" value={form.cuisine} onChange={e => update('cuisine', e.target.value)} placeholder="e.g. Mexican, Italian" className={inputClass} style={inputStyle} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-[#8B949E] mb-1.5">Address</label>
            <input type="text" value={form.address} onChange={e => update('address', e.target.value)} placeholder="123 Main St, Pueblo, CO" className={inputClass} style={inputStyle} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-[#8B949E] mb-1.5">Website (optional)</label>
            <input type="url" value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://yourrestaurant.com" className={inputClass} style={inputStyle} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-[#8B949E] mb-1.5">Anything else we should know?</label>
            <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Hours, specialties, why your restaurant should be featured..." rows={3} className={inputClass + ' !min-h-[80px] resize-none'} style={inputStyle} />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 min-h-[52px]"
          style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}
