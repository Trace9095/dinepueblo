export type PriceRange = '$' | '$$' | '$$$' | '$$$$'
export type ClaimTier = 'basic' | 'premium'
export type ClaimStatus = 'pending' | 'approved' | 'rejected'
export type ListingRequestStatus = 'pending' | 'contacted' | 'added' | 'declined'

export interface RestaurantSummary {
  id: string
  name: string
  slug: string
  cuisine: string
  priceRange: PriceRange
  rating: number | null
  reviewCount: number
  address: string
  imageUrl: string | null
  featured: boolean
  isPremium: boolean
}

export interface CategorySummary {
  id: string
  name: string
  slug: string
  icon: string
  restaurantCount: number
}

export const CLAIM_TIERS = {
  basic: {
    name: 'Basic Listing',
    price: 9900,
    priceDisplay: '$99/year',
    features: ['Verified owner badge', 'Update hours & info', 'Add up to 10 photos', 'Direct contact button'],
  },
  premium: {
    name: 'Premium Listing',
    price: 19900,
    priceDisplay: '$199/year',
    features: ['Everything in Basic', 'Featured placement', 'Homepage featured slot', 'Promotional banner', 'Menu showcase', 'Priority support'],
  },
} as const
