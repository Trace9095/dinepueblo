/**
 * fix-images.ts
 *
 * Clears image_url for all non-sister-business restaurants in the live DB.
 * Only these 6 sister-business slugs may retain an imageUrl:
 *   royal-gorge-rafting, royal-gorge-zipline-tours, royal-gorge-vacation-rentals,
 *   royal-gorge-epic-adventures, whitewater-bar-grill, rooftop-social
 *
 * Usage:
 *   DATABASE_URL=<neon-connection-string> npx tsx scripts/fix-images.ts
 */

import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { ne, notInArray, isNotNull } from 'drizzle-orm'
import * as schema from '../src/db/schema'

const SISTER_SLUGS = [
  'royal-gorge-rafting',
  'royal-gorge-zipline-tours',
  'royal-gorge-vacation-rentals',
  'royal-gorge-epic-adventures',
  'whitewater-bar-grill',
  'rooftop-social',
]

async function main() {
  const url = process.env['DATABASE_URL']
  if (!url) throw new Error('DATABASE_URL is required')

  const sql = neon(url)
  const db = drizzle(sql, { schema })

  console.log('Checking for restaurants with imageUrl that are not sister businesses...')

  // First: find which rows would be updated
  const toFix = await db
    .select({ id: schema.restaurants.id, name: schema.restaurants.name, slug: schema.restaurants.slug, imageUrl: schema.restaurants.imageUrl })
    .from(schema.restaurants)
    .where(
      // Has an imageUrl AND is not in the sister slugs list
      isNotNull(schema.restaurants.imageUrl)
    )

  const nonSister = toFix.filter(r => !SISTER_SLUGS.includes(r.slug))

  if (nonSister.length === 0) {
    console.log('No non-sister restaurants with imageUrl found. Nothing to update.')
    return
  }

  console.log(`Found ${nonSister.length} restaurants to clear:`)
  for (const r of nonSister) {
    console.log(`  - [${r.slug}] ${r.name} — imageUrl was: ${r.imageUrl}`)
  }

  // Run the UPDATE
  const updated = await db
    .update(schema.restaurants)
    .set({ imageUrl: null })
    .where(notInArray(schema.restaurants.slug, SISTER_SLUGS))
    .returning({ id: schema.restaurants.id, slug: schema.restaurants.slug })

  console.log(`\nUpdated ${updated.length} rows — image_url cleared for all non-sister restaurants.`)
  console.log('Done.')
}

main().catch(err => {
  console.error('fix-images failed:', err)
  process.exit(1)
})
