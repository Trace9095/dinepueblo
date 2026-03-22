import type { Metadata } from 'next'
import { Suspense } from 'react'
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
  const [allRestaurants, categories] = await Promise.all([getAllRestaurants(), getAllCategories()])

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
    </div>
  )
}
