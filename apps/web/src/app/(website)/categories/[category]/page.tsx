import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { getCategoryBySlug, getRestaurantsByCategory, getAllCategories } from '@/lib/db-helpers'
import { RestaurantCard } from '@/components/restaurant/RestaurantCard'

export const dynamic = 'force-dynamic'

interface PageProps { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  try {
    const cats = await getAllCategories()
    return cats.map(c => ({ category: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  if (!cat) return { title: 'Category Not Found' }
  return {
    title: `${cat.name} Restaurants in Pueblo, CO`,
    description: `${cat.description ?? cat.name} — the best ${cat.name.toLowerCase()} restaurants in Pueblo, Colorado.`,
    alternates: { canonical: `https://dinepueblo.com/categories/${category}` },
    openGraph: { title: `${cat.name} | Dine Pueblo`, url: `https://dinepueblo.com/categories/${category}`, images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${cat.name} Restaurants in Pueblo, CO`, images: ['/opengraph-image'] },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const [cat, restaurants] = await Promise.all([getCategoryBySlug(category), getRestaurantsByCategory(category)])
  if (!cat) notFound()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-[#8B949E] mb-6">
        <Link href="/" className="hover:text-[#D4A853] transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/restaurants" className="hover:text-[#D4A853] transition-colors">Restaurants</Link>
        <ChevronRight size={14} />
        <span className="text-[#E6EDF3]">{cat.name}</span>
      </nav>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">{cat.name} in Pueblo, CO</h1>
        {cat.description && <p className="text-[#8B949E]">{cat.description}</p>}
        <p className="text-sm text-[#8B949E] mt-1">{restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''}</p>
      </div>
      {restaurants.length === 0 ? (
        <p className="text-[#8B949E]">No restaurants in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
      <div className="mt-8">
        <Link href="/restaurants" className="flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#D4A853] transition-colors min-h-[44px]">
          <ArrowLeft size={14} /> All restaurants
        </Link>
      </div>
    </div>
  )
}
