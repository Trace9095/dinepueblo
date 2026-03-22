import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog-data'
import { BlogCard } from '@/components/blog/BlogCard'

export const metadata: Metadata = {
  title: 'Pueblo Food Blog — Guides, Stories & Local Secrets',
  description: 'Stories, guides, and local insights about dining in Pueblo, Colorado. Pueblo Slopper history, best restaurant guides, food festival coverage.',
  alternates: { canonical: 'https://dinepueblo.com/blog' },
  openGraph: { title: 'Pueblo Food Blog | Dine Pueblo', url: 'https://dinepueblo.com/blog', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Pueblo Food Blog', images: ['/opengraph-image'] },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#E6EDF3] mb-2">Pueblo Food Stories</h1>
        <p className="text-[#8B949E]">Guides, histories, and local insights about dining in Pueblo, Colorado</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(p => <BlogCard key={p.slug} post={p} />)}
      </div>
    </div>
  )
}
