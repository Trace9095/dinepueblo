import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight, Flame, Beer, UtensilsCrossed, Sunrise, Trophy, Phone, ExternalLink, Mountain, Waves, Tent } from 'lucide-react'
import { getFeaturedRestaurants, getAllCategories } from '@/lib/db-helpers'

export const dynamic = 'force-dynamic'
import { RestaurantCard } from '@/components/restaurant/RestaurantCard'
import { BlogCard } from '@/components/blog/BlogCard'
import { getAllPosts } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Dine Pueblo | Pueblo CO Dining Guide',
  description: "Pueblo, Colorado's premier dining directory. Discover Pueblo Sloppers, authentic Mexican food, craft breweries, and the best dining in Pueblo CO.",
  alternates: { canonical: 'https://dinepueblo.com' },
  openGraph: {
    title: 'Dine Pueblo | Pueblo CO Dining Guide',
    description: "Pueblo, Colorado's premier dining directory.",
    url: 'https://dinepueblo.com',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Dine Pueblo | Pueblo CO Dining Guide', images: ['/opengraph-image'] },
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'pueblo-slopper': <Flame size={22} className="text-[#D4A853]" />,
  'mexican': <UtensilsCrossed size={22} className="text-[#D4A853]" />,
  'breweries': <Beer size={22} className="text-[#D4A853]" />,
  'italian': <UtensilsCrossed size={22} className="text-[#D4A853]" />,
  'riverwalk': <MapPin size={22} className="text-[#D4A853]" />,
  'bbq': <Flame size={22} className="text-[#D4A853]" />,
  'breakfast': <Sunrise size={22} className="text-[#D4A853]" />,
  'fine-dining': <Trophy size={22} className="text-[#D4A853]" />,
}

export default async function HomePage() {
  const [featuredResult, categoriesResult] = await Promise.allSettled([
    getFeaturedRestaurants(),
    getAllCategories(),
  ])
  const featured = featuredResult.status === 'fulfilled' ? featuredResult.value : []
  const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : []
  const posts = getAllPosts().slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4A853 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 border"
              style={{ borderColor: '#D4A85340', color: '#D4A853', backgroundColor: '#D4A85310' }}
            >
              <MapPin size={11} />
              Pueblo, Colorado
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E6EDF3] leading-tight mb-6">
              Discover Pueblo&apos;s
              <span style={{ color: '#D4A853' }}> Best Dining</span>
            </h1>
            <p className="text-lg text-[#8B949E] leading-relaxed mb-10 max-w-xl">
              From the legendary Pueblo Slopper to craft breweries, authentic Mexican food, and fine dining along the Arkansas River Riverwalk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/restaurants"
                className="flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all hover:scale-105 min-h-[52px]"
                style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
              >
                Browse All Restaurants
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/categories/pueblo-slopper"
                className="flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-medium transition-colors border min-h-[52px]"
                style={{ borderColor: '#30363D', color: '#E6EDF3' }}
              >
                <Flame size={18} className="text-[#D4A853]" />
                Slopper Trail
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#E6EDF3]">Browse by Category</h2>
            <p className="text-[#8B949E] mt-1">Explore Pueblo&apos;s diverse dining scene</p>
          </div>
          <Link href="/restaurants" className="text-sm text-[#D4A853] hover:text-[#D4A853]/80 transition-colors flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-xl border transition-all hover:border-[#D4A853]/40 hover:scale-105 text-center min-h-[44px]"
              style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4A85315' }}>
                {CATEGORY_ICONS[cat.slug] ?? <UtensilsCrossed size={22} className="text-[#D4A853]" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors leading-snug">{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#E6EDF3]">Featured Restaurants</h2>
            <p className="text-[#8B949E] mt-1">Pueblo&apos;s most beloved dining destinations</p>
          </div>
          <Link href="/restaurants" className="text-sm text-[#D4A853] hover:text-[#D4A853]/80 transition-colors flex items-center gap-1">
            See All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="border-t" style={{ borderColor: '#30363D' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#E6EDF3]">Pueblo Food Stories</h2>
              <p className="text-[#8B949E] mt-1">Guides, histories, and local secrets</p>
            </div>
            <Link href="/blog" className="text-sm text-[#D4A853] hover:text-[#D4A853]/80 transition-colors flex items-center gap-1">
              All Posts <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map(p => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      {/* Featured Partner Dining — Canon City */}
      <section className="border-t" style={{ borderColor: '#30363D' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={14} className="text-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D4A853' }}>Featured Partners</span>
          </div>
          <h2 className="text-2xl font-bold text-[#E6EDF3] mb-1">Dining 45 Minutes North — Canon City, CO</h2>
          <p className="text-[#8B949E] mb-8">Two iconic restaurants just up the highway. Worth the drive.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <a
              href="https://whitewaterbar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:border-[#D4A853]/60"
              style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">WhiteWater Bar &amp; Grill</p>
                  <p className="text-sm text-[#D4A853] mt-0.5">Undefeated Flavors. Legendary Portions.</p>
                </div>
                <ExternalLink size={16} className="text-[#8B949E] mt-1 flex-shrink-0" />
              </div>
              <p className="text-sm text-[#8B949E] leading-relaxed">Downtown Canon City&apos;s premier dining destination. Green chile, craft burgers, and Colorado-inspired dishes served in a lively atmosphere.</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B949E]">
                <span className="flex items-center gap-1"><MapPin size={11} className="text-[#D4A853]" /> Canon City, CO — 45 min north</span>
                <span className="flex items-center gap-1"><Phone size={11} className="text-[#D4A853]" /> 719-451-7241</span>
              </div>
            </a>
            <a
              href="https://wwrooftopsocial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:border-[#D4A853]/60"
              style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">Rooftop Social</p>
                  <p className="text-sm text-[#D4A853] mt-0.5">Canon City&apos;s Rooftop Bar &amp; Restaurant</p>
                </div>
                <ExternalLink size={16} className="text-[#8B949E] mt-1 flex-shrink-0" />
              </div>
              <p className="text-sm text-[#8B949E] leading-relaxed">Rooftop dining and drinks with sweeping views of Canon City. Craft cocktails, elevated pub fare, and the best outdoor deck in the region.</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B949E]">
                <span className="flex items-center gap-1"><MapPin size={11} className="text-[#D4A853]" /> Canon City, CO — 45 min north</span>
                <span className="flex items-center gap-1"><Phone size={11} className="text-[#D4A853]" /> 719-451-7241</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Day Trip Adventures */}
      <section className="border-t" style={{ borderColor: '#30363D', backgroundColor: '#161B22' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-1">
            <Mountain size={14} className="text-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D4A853' }}>Day Trip Adventures</span>
          </div>
          <h2 className="text-2xl font-bold text-[#E6EDF3] mb-1">Royal Gorge Region — 45 Minutes Away</h2>
          <p className="text-[#8B949E] mb-8">Combine great Pueblo dining with world-class outdoor adventure up the Arkansas River corridor.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <a
              href="https://royalgorgerafting.net"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border p-5 transition-all hover:border-[#D4A853]/60"
              style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
            >
              <Waves size={24} className="text-[#D4A853]" />
              <p className="font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">Royal Gorge Rafting</p>
              <p className="text-sm text-[#8B949E]">Class III-V whitewater on the Arkansas River through the Royal Gorge canyon.</p>
              <p className="text-xs text-[#D4A853] flex items-center gap-1"><Phone size={10} /> 719-275-7238</p>
            </a>
            <a
              href="https://royalgorgeziplinetours.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border p-5 transition-all hover:border-[#D4A853]/60"
              style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
            >
              <Mountain size={24} className="text-[#D4A853]" />
              <p className="font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">Royal Gorge Zipline Tours</p>
              <p className="text-sm text-[#8B949E]">Soar above the Royal Gorge on Colorado&apos;s most breathtaking zipline experience.</p>
              <p className="text-xs text-[#D4A853] flex items-center gap-1"><Phone size={10} /> 719-275-7238</p>
            </a>
            <a
              href="https://royalgorgevacationrentals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border p-5 transition-all hover:border-[#D4A853]/60"
              style={{ backgroundColor: '#0D1117', borderColor: '#30363D' }}
            >
              <Tent size={24} className="text-[#D4A853]" />
              <p className="font-bold text-[#E6EDF3] group-hover:text-[#D4A853] transition-colors">Royal Gorge Vacation Rentals</p>
              <p className="text-sm text-[#8B949E]">Yurts, Airstreams, and cabins in the Royal Gorge region. Stay the night.</p>
              <p className="text-xs text-[#D4A853] flex items-center gap-1"><Phone size={10} /> 719-275-7238</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t" style={{ borderColor: '#30363D', backgroundColor: '#0D1117' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E6EDF3] mb-3">Own a Pueblo Restaurant?</h2>
          <p className="text-[#8B949E] mb-8 max-w-lg mx-auto">Claim your listing on Pueblo&apos;s top dining directory. Plans start at $99/year.</p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold min-h-[52px] transition-all hover:scale-105"
            style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
          >
            View Listing Plans
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
