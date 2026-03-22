import { db, restaurants, categories, restaurantCategories } from '@/db'
import { eq, desc, inArray } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

export const getAllRestaurants = unstable_cache(
  async () => db.select().from(restaurants).orderBy(desc(restaurants.rating)),
  ['all-restaurants'],
  { revalidate: 3600, tags: ['restaurants'] }
)

export const getFeaturedRestaurants = unstable_cache(
  async () => db.select().from(restaurants).where(eq(restaurants.featured, true)).orderBy(desc(restaurants.rating)).limit(6),
  ['featured-restaurants'],
  { revalidate: 3600, tags: ['restaurants'] }
)

export const getRestaurantBySlug = unstable_cache(
  async (slug: string) => {
    const results = await db.select().from(restaurants).where(eq(restaurants.slug, slug)).limit(1)
    return results[0] ?? null
  },
  ['restaurant-by-slug'],
  { revalidate: 3600, tags: ['restaurants'] }
)

export const getAllCategories = unstable_cache(
  async () => db.select().from(categories).orderBy(categories.sortOrder),
  ['all-categories'],
  { revalidate: 86400, tags: ['categories'] }
)

export const getCategoryBySlug = unstable_cache(
  async (slug: string) => {
    const results = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1)
    return results[0] ?? null
  },
  ['category-by-slug'],
  { revalidate: 86400, tags: ['categories'] }
)

export const getRestaurantsByCategory = unstable_cache(
  async (categorySlug: string) => {
    const cat = await getCategoryBySlug(categorySlug)
    if (!cat) return []
    const links = await db.select().from(restaurantCategories).where(eq(restaurantCategories.categoryId, cat.id))
    if (!links.length) return []
    const ids = links.map(l => l.restaurantId)
    return db.select().from(restaurants).where(inArray(restaurants.id, ids)).orderBy(desc(restaurants.rating))
  },
  ['restaurants-by-category'],
  { revalidate: 3600, tags: ['restaurants', 'categories'] }
)

export const getRestaurantCategories = unstable_cache(
  async (restaurantId: string) => {
    const links = await db.select().from(restaurantCategories).where(eq(restaurantCategories.restaurantId, restaurantId))
    if (!links.length) return []
    const catIds = links.map(l => l.categoryId)
    return db.select().from(categories).where(inArray(categories.id, catIds))
  },
  ['restaurant-categories'],
  { revalidate: 3600, tags: ['restaurants', 'categories'] }
)
