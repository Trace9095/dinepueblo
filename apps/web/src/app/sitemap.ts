import type { MetadataRoute } from 'next'
import { getAllRestaurants, getAllCategories } from '@/lib/db-helpers'
import { getAllPosts } from '@/lib/blog-data'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [restaurants, categories] = await Promise.allSettled([getAllRestaurants(), getAllCategories()])
  const posts = getAllPosts()

  const base = 'https://dinepueblo.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/restaurants`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/request-listing`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/manage`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.4 },
  ]

  const restaurantPages: MetadataRoute.Sitemap = restaurants.status === 'fulfilled'
    ? restaurants.value.map(r => ({
        url: `${base}/restaurants/${r.slug}`,
        lastModified: r.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: r.featured ? 0.9 : 0.8,
      }))
    : []

  const categoryPages: MetadataRoute.Sitemap = categories.status === 'fulfilled'
    ? categories.value.map(c => ({
        url: `${base}/categories/${c.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
    : []

  const blogPages: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...restaurantPages, ...categoryPages, ...blogPages]
}
