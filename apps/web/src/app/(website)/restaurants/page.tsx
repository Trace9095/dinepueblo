import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink, Mountain, Waves, Tent } from 'lucide-react'
import { getAllRestaurants, getAllCategories } from '@/lib/db-helpers'

export const dynamic = 'force-dynamic'
import { RestaurantCard } from '@/components/restaurant/RestaurantCard'
import { RestaurantFilters } from '@/components/restaurant/RestaurantFilters'
import type { Restaurant } from '@/db/schema'

export const metadata: Metadata = {
  title: 'All Restaurants in Pueblo, CO',
  description: 'Browse every restaurant in Pueblo, Colorado — filter by cuisine, neighborhood, price range, and more.',
  alternates: { canonical: 'https://dinepueblo.com/restaurants' },
  openGraph: {
    title: 'All Restaurants in Pueblo, CO | Dine Pueblo',
    description: 'Browse every restaurant in Pueblo, Colorado.',
    url: 'https://dinepueblo.com/restaurants',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'All Restaurants in Pueblo, CO', images: ['/opengraph-image'] },
}

interface PageProps {
  searchParams: Promise<{ q?: string; cuisine?: string; neighborhood?: string; price?: string }>
}

function filterRestaurants(restaurants: Restaurant[], params: { q?: string; cuisine?: string; neighborhood?: string; price?: string }): Restaurant[] {
  let filtered = [...restaurants]
  if (params.q) {
    const q = params.q.toLowerCase()
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.cuisine?.toLowerCase().includes(q) ||
      r.neighborhood?.toLowerCase().includes(q) ||
      r.address?.toLowerCase().includes(q)
    )
  }
  if (params.cuisine) filtered = filtered.filter(r => r.cuisine === params.cuisine)
  if (params.neighborhood) filtered = filtered.filter(r => r.neighborhood === params.neighborhood)
  if (params.price) filtered = filtered.filter(r => r.priceRange === params.price)
  return filtered
}

export default async function RestaurantsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const [restaurantsResult, categoriesResult] = await Promise.allSettled([getAllRestaurants(), getAllCategories()])
  const allRestaurants = restaurantsResult.status === 'fulfilled' ? restaurantsResult.value : []
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : []

  const cuisines = [...new Set(allRestaurants.map(r => r.cuisine).filter(Boolean) as string[])].sort()
  const neighborhoods = [...new Set(allRestaurants.map(r => r.neighborhood).filter(Boolean) as string[])].sort()

  const filtered = filterRestaurants(allRestaurants, params)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">Restaurants in Pueblo, CO</h1>
        <p className="text-[#8B949E]">{allRestaurants.length} restaurants &middot; Filter to find exactly what you want</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <a
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="text-xs font-medium px-3 py-2 rounded-full border transition-colors hover:border-[#D4A853] hover:text-[#D4A853] min-h-[36px] flex items-center"
            style={{ borderColor: '#30363D', color: '#8B949E' }}
          >
            {cat.name}
          </a>
        ))}
      </div>

      <Suspense>
        <RestaurantFilters cuisines={cuisines} neighborhoods={neighborhoods} />
      </Suspense>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#8B949E] text-lg">No restaurants match your search.</p>
            <a href="/restaurants" className="mt-4 inline-block text-sm text-[#D4A853] hover:underline">Clear filters</a>
          </div>
        ) : (
          <>
            {(params.q || params.cuisine || params.neighborhood || params.price) && (
              <p className="text-sm text-[#8B949E] mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
            </div>
          </>
        )}
      </div>

      {/* Featured Partner Dining — Canon City */}
      <section className="mt-16 rounded-2xl border p-8" style={{ backgroundColor: '#161B22', borderColor: '#D4A85340' }}>
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={14} className="text-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D4A853' }}>Featured Partners</span>
        </div>
        <h2 className="text-xl font-bold text-[#E6EDF3] mb-1">Dining 45 Minutes North — Canon City, CO</h2>
        <p className="text-sm text-[#8B949E] mb-6">Two iconic restaurants just up the highway. Worth the drive.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://whitewaterbar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border p-5 transition-all hover:border-[#D4A853]/60"
            style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">WhiteWater Bar &amp; Grill</p>
                <p className="text-xs text-[#D4A853] mt-0.5">Undefeated Flavors. Legendary Portions.</p>
              </div>
              <ExternalLink size={14} className="text-[#8B949E] mt-1 flex-shrink-0" />
            </div>
            <p className="text-sm text-[#8B949E] leading-relaxed">Downtown Canon City&apos;s premier dining destination. Green chile, craft burgers, and Colorado-inspired dishes.</p>
            <div className="flex items-center gap-4 text-xs text-[#8B949E]">
              <span className="flex items-center gap-1"><MapPin size={11} className="text-[#D4A853]" /> Canon City, CO — 45 min north</span>
              <span className="flex items-center gap-1"><Phone size={11} className="text-[#D4A853]" /> 719-451-7241</span>
            </div>
          </a>
          <a
            href="https://wwrooftopsocial.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border p-5 transition-all hover:border-[#D4A853]/60"
            style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">Rooftop Social</p>
                <p className="text-xs text-[#D4A853] mt-0.5">Canon City&apos;s Rooftop Bar &amp; Restaurant</p>
              </div>
              <ExternalLink size={14} className="text-[#8B949E] mt-1 flex-shrink-0" />
            </div>
            <p className="text-sm text-[#8B949E] leading-relaxed">Rooftop dining and drinks with sweeping views of Canon City and the Royal Gorge region.</p>
            <div className="flex items-center gap-4 text-xs text-[#8B949E]">
              <span className="flex items-center gap-1"><MapPin size={11} className="text-[#D4A853]" /> Canon City, CO — 45 min north</span>
              <span className="flex items-center gap-1"><Phone size={11} className="text-[#D4A853]" /> 719-451-7241</span>
            </div>
          </a>
        </div>
      </section>

      {/* Day Trip Adventures — Royal Gorge */}
      <section className="mt-8 rounded-2xl border p-8" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
        <div className="flex items-center gap-2 mb-1">
          <Mountain size={14} className="text-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D4A853' }}>Day Trip Adventures</span>
        </div>
        <h2 className="text-xl font-bold text-[#E6EDF3] mb-1">Royal Gorge Region — 45 Minutes from Pueblo</h2>
        <p className="text-sm text-[#8B949E] mb-6">Combine great Pueblo dining with world-class outdoor adventure just up the Arkansas River corridor.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://royalgorgerafting.net"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border p-4 transition-all hover:border-[#D4A853]/60"
            style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
          >
            <div className="flex items-start justify-between">
              <Waves size={18} className="text-[#D4A853]" />
              <ExternalLink size={12} className="text-[#8B949E]" />
            </div>
            <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors text-sm">Royal Gorge Rafting</p>
            <p className="text-xs text-[#8B949E]">Class III-V whitewater on the Arkansas River through the Royal Gorge.</p>
            <p className="text-xs text-[#D4A853]">719-275-7238</p>
          </a>
          <a
            href="https://royalgorgeziplinetours.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border p-4 transition-all hover:border-[#D4A853]/60"
            style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
          >
            <div className="flex items-start justify-between">
              <Mountain size={18} className="text-[#D4A853]" />
              <ExternalLink size={12} className="text-[#8B949E]" />
            </div>
            <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors text-sm">Royal Gorge Zipline Tours</p>
            <p className="text-xs text-[#8B949E]">Soar above the Royal Gorge on Colorado&apos;s most thrilling zipline course.</p>
            <p className="text-xs text-[#D4A853]">719-275-7238</p>
          </a>
          <a
            href="https://royalgorgevacationrentals.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border p-4 transition-all hover:border-[#D4A853]/60"
            style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
          >
            <div className="flex items-start justify-between">
              <Tent size={18} className="text-[#D4A853]" />
              <ExternalLink size={12} className="text-[#8B949E]" />
            </div>
            <p className="font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors text-sm">Royal Gorge Vacation Rentals</p>
            <p className="text-xs text-[#8B949E]">Yurts, Airstreams, and cabins in the Royal Gorge region. Stay overnight.</p>
            <p className="text-xs text-[#D4A853]">719-275-7238</p>
          </a>
        </div>
      </section>
    </div>
  )
}
