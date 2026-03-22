import {
  pgTable, pgEnum, text, timestamp, boolean,
  integer, real, serial, uuid,
} from 'drizzle-orm/pg-core'

export const priceRangeEnum = pgEnum('price_range', ['$', '$$', '$$$', '$$$$'])
export const claimTierEnum = pgEnum('claim_tier', ['basic', 'premium'])
export const claimStatusEnum = pgEnum('claim_status', ['pending', 'approved', 'rejected'])
export const listingRequestStatusEnum = pgEnum('listing_request_status', ['pending', 'contacted', 'added', 'declined'])

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon').notNull().default('utensils'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const restaurants = pgTable('restaurants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  longDescription: text('long_description'),
  address: text('address'),
  neighborhood: text('neighborhood'),
  phone: text('phone'),
  website: text('website'),
  email: text('email'),
  priceRange: priceRangeEnum('price_range').notNull().default('$$'),
  cuisine: text('cuisine'),
  hours: text('hours'),
  rating: real('rating'),
  reviewCount: integer('review_count').notNull().default(0),
  imageUrl: text('image_url'),
  featured: boolean('featured').notNull().default(false),
  isPremium: boolean('is_premium').notNull().default(false),
  isClaimed: boolean('is_claimed').notNull().default(false),
  claimedByEmail: text('claimed_by_email'),
  claimedAt: timestamp('claimed_at'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  specialties: text('specialties'),
  parkingInfo: text('parking_info'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const restaurantCategories = pgTable('restaurant_categories', {
  id: serial('id').primaryKey(),
  restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
})

export const claims = pgTable('claims', {
  id: uuid('id').defaultRandom().primaryKey(),
  restaurantId: uuid('restaurant_id').notNull().references(() => restaurants.id),
  restaurantName: text('restaurant_name').notNull(),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  tier: claimTierEnum('tier').notNull(),
  stripeSessionId: text('stripe_session_id'),
  stripeCustomerId: text('stripe_customer_id'),
  status: claimStatusEnum('status').notNull().default('pending'),
  paidAt: timestamp('paid_at'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const listingRequests = pgTable('listing_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  restaurantName: text('restaurant_name').notNull(),
  contactName: text('contact_name').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  address: text('address'),
  website: text('website'),
  cuisine: text('cuisine'),
  message: text('message'),
  status: listingRequestStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const admins = pgTable('admins', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('admin'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type Restaurant = typeof restaurants.$inferSelect
export type NewRestaurant = typeof restaurants.$inferInsert
export type Category = typeof categories.$inferSelect
export type Claim = typeof claims.$inferSelect
export type ListingRequest = typeof listingRequests.$inferSelect
export type Admin = typeof admins.$inferSelect
