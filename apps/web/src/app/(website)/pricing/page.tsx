import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, Star } from 'lucide-react'
import { CLAIM_TIERS } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'List Your Pueblo Restaurant — Pricing',
  description: 'Get your Pueblo restaurant listed on Dine Pueblo. Basic listings from $99/year. Premium placement and featured spots from $199/year.',
  alternates: { canonical: 'https://dinepueblo.com/pricing' },
  openGraph: { title: 'Restaurant Listing Pricing | Dine Pueblo', url: 'https://dinepueblo.com/pricing', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Restaurant Listing Pricing | Dine Pueblo', images: ['/opengraph-image'] },
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-[#E6EDF3] mb-4">List Your Pueblo Restaurant</h1>
        <p className="text-lg text-[#8B949E] max-w-xl mx-auto">Get found by Pueblo diners and visitors. Choose a plan that fits your restaurant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Basic */}
        <div className="rounded-2xl border p-8" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={20} className="text-[#8B949E]" />
            <h2 className="text-xl font-bold text-[#E6EDF3]">{CLAIM_TIERS.basic.name}</h2>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-[#E6EDF3]">$99</span>
            <span className="text-[#8B949E] ml-1">/year</span>
          </div>
          <ul className="space-y-3 mb-8">
            {CLAIM_TIERS.basic.features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#8B949E]">
                <Check size={16} className="text-[#D4A853] mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/restaurants"
            className="flex items-center justify-center rounded-xl py-3.5 text-sm font-semibold transition-colors border min-h-[44px]"
            style={{ borderColor: '#D4A853', color: '#D4A853' }}
          >
            Find My Restaurant
          </Link>
          <p className="text-xs text-[#8B949E] text-center mt-3">Find your restaurant, then claim it</p>
        </div>

        {/* Premium */}
        <div
          className="rounded-2xl border p-8 relative"
          style={{ backgroundColor: '#161B22', borderColor: '#D4A853' }}
        >
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
          >
            Most Popular
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Star size={20} className="text-[#D4A853]" />
            <h2 className="text-xl font-bold text-[#E6EDF3]">{CLAIM_TIERS.premium.name}</h2>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-[#D4A853]">$199</span>
            <span className="text-[#8B949E] ml-1">/year</span>
          </div>
          <ul className="space-y-3 mb-8">
            {CLAIM_TIERS.premium.features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#8B949E]">
                <Check size={16} className="text-[#D4A853] mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/restaurants"
            className="flex items-center justify-center rounded-xl py-3.5 text-sm font-semibold transition-all hover:scale-105 min-h-[44px]"
            style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
          >
            Find My Restaurant
          </Link>
          <p className="text-xs text-[#8B949E] text-center mt-3">Find your restaurant, then claim it</p>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-[#8B949E] mb-4">Restaurant not listed yet?</p>
        <Link
          href="/request-listing"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium border transition-colors min-h-[44px]"
          style={{ borderColor: '#30363D', color: '#E6EDF3' }}
        >
          Request a Free Listing
        </Link>
      </div>
    </div>
  )
}
