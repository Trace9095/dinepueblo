import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight, Flame, Beer, UtensilsCrossed, Sunrise, Trophy, ExternalLink } from 'lucide-react'
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

      {/* Day Trips from Pueblo */}
      <section className="border-t" style={{ borderColor: '#30363D' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl border p-5" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={13} className="text-[#D4A853]" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#D4A853' }}>45 Min North</span>
            </div>
            <h2 className="text-base font-bold text-[#E6EDF3] mb-1">Royal Gorge Region Day Trips</h2>
            <p className="text-sm text-[#8B949E] mb-4">Pair great Pueblo dining with a day trip up the Arkansas River corridor — world-class rafting, ziplines, and dining in Canon City.</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://whitewaterbar.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#8B949E] hover:text-[#D4A853] transition-colors flex items-center gap-1"><ExternalLink size={11} />WhiteWater Bar &amp; Grill</a>
              <a href="https://wwrooftopsocial.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#8B949E] hover:text-[#D4A853] transition-colors flex items-center gap-1"><ExternalLink size={11} />Rooftop Social</a>
              <a href="https://royalgorgerafting.net" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#8B949E] hover:text-[#D4A853] transition-colors flex items-center gap-1"><ExternalLink size={11} />Royal Gorge Rafting</a>
              <a href="https://royalgorgeziplinetours.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#8B949E] hover:text-[#D4A853] transition-colors flex items-center gap-1"><ExternalLink size={11} />Royal Gorge Zipline Tours</a>
              <a href="https://royalgorgevacationrentals.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#8B949E] hover:text-[#D4A853] transition-colors flex items-center gap-1"><ExternalLink size={11} />Royal Gorge Vacation Rentals</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t" style={{ borderColor: '#30363D', backgroundColor: '#0D1117' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E6EDF3] mb-3">Own a Pueblo Restaurant?</h2>
          <p className="text-[#8B949E] mb-8 max-w-lg mx-auto">Claim your listing on Pueblo&apos;s top dining directory. Plans start at $99/mo.</p>
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
