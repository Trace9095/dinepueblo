import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Globe, Star, Clock, DollarSign, ArrowLeft, Award, ExternalLink, ChevronRight } from 'lucide-react'
import { getRestaurantBySlug, getAllRestaurants, getRestaurantCategories } from '@/lib/db-helpers'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const restaurants = await getAllRestaurants()
    return restaurants.map(r => ({ slug: r.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) return { title: 'Restaurant Not Found' }
  return {
    title: `${restaurant.name} — Pueblo, CO`,
    description: restaurant.description ?? `${restaurant.name} in Pueblo, Colorado. ${restaurant.cuisine ?? ''} restaurant.`,
    alternates: { canonical: `https://dinepueblo.com/restaurants/${slug}` },
    openGraph: {
      title: restaurant.name,
      description: restaurant.description ?? '',
      url: `https://dinepueblo.com/restaurants/${slug}`,
      images: restaurant.imageUrl ? [{ url: restaurant.imageUrl, width: 1200, height: 630, alt: restaurant.name }] : [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: restaurant.name, images: restaurant.imageUrl ? [restaurant.imageUrl] : ['/opengraph-image'] },
  }
}

function HoursTable({ hours }: { hours: string }) {
  let parsed: Record<string, string> = {}
  try { parsed = JSON.parse(hours) } catch { return null }
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const labels: Record<string, string> = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' }
  const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()]
  return (
    <div className="space-y-2">
      {days.map(d => (
        <div
          key={d}
          className={`flex justify-between text-sm py-1 px-3 rounded ${d === today ? 'ring-1 ring-[#D4A853]' : ''}`}
          style={d === today ? { backgroundColor: '#D4A85310' } : {}}
        >
          <span className={d === today ? 'text-[#D4A853] font-medium' : 'text-[#8B949E]'}>{labels[d]}</span>
          <span className={d === today ? 'text-[#E6EDF3] font-semibold' : 'text-[#8B949E]'}>{parsed[d] ?? 'Hours not available'}</span>
        </div>
      ))}
    </div>
  )
}

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  const restaurantCats = await getRestaurantCategories(restaurant.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    description: restaurant.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address?.split(',')[0],
      addressLocality: 'Pueblo',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    telephone: restaurant.phone,
    url: restaurant.website,
    priceRange: restaurant.priceRange,
    servesCuisine: restaurant.cuisine,
    image: restaurant.imageUrl,
    ...(restaurant.rating !== null && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: restaurant.rating,
        reviewCount: restaurant.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#8B949E] mb-6">
          <Link href="/" className="hover:text-[#D4A853] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/restaurants" className="hover:text-[#D4A853] transition-colors">Restaurants</Link>
          <ChevronRight size={14} />
          <span className="text-[#E6EDF3]">{restaurant.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            {restaurant.imageUrl && (
              <div className="rounded-xl overflow-hidden h-64 sm:h-80 mb-6">
                <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Name + badges */}
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#E6EDF3]">{restaurant.name}</h1>
              {restaurant.isPremium && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#D4A853', color: '#0D1117' }}>
                  <Award size={11} /> Featured
                </span>
              )}
              {restaurant.isClaimed && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full border" style={{ borderColor: '#D4A853', color: '#D4A853' }}>Verified Owner</span>
              )}
            </div>

            {restaurant.cuisine && <p className="text-sm font-medium text-[#D4A853] mb-1">{restaurant.cuisine}</p>}

            {/* Rating */}
            {restaurant.rating !== null && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className={i <= Math.round(restaurant.rating!) ? 'fill-[#D4A853] text-[#D4A853]' : 'text-[#30363D]'} />
                  ))}
                </div>
                <span className="font-semibold text-[#E6EDF3]">{restaurant.rating.toFixed(1)}</span>
                <span className="text-sm text-[#8B949E]">({restaurant.reviewCount} reviews)</span>
              </div>
            )}

            {/* Categories */}
            {restaurantCats.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {restaurantCats.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-[#D4A853] hover:text-[#D4A853] min-h-[32px] flex items-center"
                    style={{ borderColor: '#30363D', color: '#8B949E' }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Description */}
            {(restaurant.longDescription ?? restaurant.description) && (
              <div className="rounded-xl p-5 mb-6 border" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
                <p className="text-[#8B949E] leading-relaxed">{restaurant.longDescription ?? restaurant.description}</p>
              </div>
            )}

            {/* Specialties */}
            {restaurant.specialties && (
              <div className="rounded-xl p-5 mb-6 border" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
                <h2 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider mb-3">Signature Dishes</h2>
                <div className="flex flex-wrap gap-2">
                  {restaurant.specialties.split(',').map((s, i) => (
                    <span key={i} className="text-sm px-3 py-1.5 rounded-full" style={{ backgroundColor: '#21262D', color: '#E6EDF3' }}>{s.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Hours */}
            {restaurant.hours && (
              <div className="rounded-xl p-5 border" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-[#D4A853]" />
                  <h2 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider">Hours</h2>
                </div>
                <HoursTable hours={restaurant.hours} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact Card */}
            <div className="rounded-xl p-5 border" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
              <h2 className="text-sm font-semibold text-[#E6EDF3] uppercase tracking-wider mb-4">Details</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <DollarSign size={15} className="text-[#D4A853] mt-0.5 flex-shrink-0" />
                  <span className="text-[#E6EDF3] font-semibold">{restaurant.priceRange}</span>
                </div>
                {restaurant.address && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin size={15} className="text-[#D4A853] mt-0.5 flex-shrink-0" />
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B949E] hover:text-[#D4A853] transition-colors leading-snug"
                    >
                      {restaurant.address}
                    </a>
                  </div>
                )}
                {restaurant.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={15} className="text-[#D4A853] flex-shrink-0" />
                    <a href={`tel:${restaurant.phone}`} className="text-[#8B949E] hover:text-[#D4A853] transition-colors">{restaurant.phone}</a>
                  </div>
                )}
                {restaurant.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe size={15} className="text-[#D4A853] flex-shrink-0" />
                    <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-[#8B949E] hover:text-[#D4A853] transition-colors flex items-center gap-1">
                      Website <ExternalLink size={11} />
                    </a>
                  </div>
                )}
              </div>
              {restaurant.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-lg py-2.5 text-sm font-medium transition-colors border min-h-[44px]"
                  style={{ borderColor: '#30363D', color: '#E6EDF3' }}
                >
                  <MapPin size={14} className="text-[#D4A853]" />
                  Get Directions
                </a>
              )}
            </div>

            {/* Claim */}
            {!restaurant.isClaimed && (
              <div className="rounded-xl p-5 border" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
                <p className="text-sm font-semibold text-[#E6EDF3] mb-2">Is this your restaurant?</p>
                <p className="text-xs text-[#8B949E] mb-4">Claim your listing to update info, add photos, and get featured.</p>
                <Link
                  href={`/claim/${restaurant.slug}`}
                  className="flex items-center justify-center w-full rounded-lg py-2.5 text-sm font-semibold min-h-[44px] transition-all hover:scale-105"
                  style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
                >
                  Claim This Listing
                </Link>
              </div>
            )}

            {/* Back */}
            <Link
              href="/restaurants"
              className="flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#D4A853] transition-colors min-h-[44px]"
            >
              <ArrowLeft size={14} />
              Back to all restaurants
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
