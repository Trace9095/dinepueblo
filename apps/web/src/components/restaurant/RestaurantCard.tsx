import Link from 'next/link'
import { Star, MapPin, Award } from 'lucide-react'
import type { Restaurant } from '@/db/schema'
import { cn } from '@/lib/utils'

function getCategoryGradient(cuisine: string | null): string {
  const c = (cuisine ?? '').toLowerCase()
  if (c.includes('italian') || c.includes('pizza')) return 'linear-gradient(135deg, #7C1D1D 0%, #C0392B 50%, #922B21 100%)'
  if (c.includes('mexican') || c.includes('new mexican')) return 'linear-gradient(135deg, #145A32 0%, #1E8449 50%, #D4AC0D 100%)'
  if (c.includes('brew') || c.includes('craft')) return 'linear-gradient(135deg, #7D4E00 0%, #B7770D 50%, #5D4037 100%)'
  if (c.includes('fine dining') || c.includes('steakhouse') || c.includes('french')) return 'linear-gradient(135deg, #1a1205 0%, #D4A853 50%, #0D1117 100%)'
  if (c.includes('bbq') || c.includes('smokehouse')) return 'linear-gradient(135deg, #4A1C0A 0%, #B03A0A 50%, #7B2D00 100%)'
  if (c.includes('bakery') || c.includes('coffee')) return 'linear-gradient(135deg, #4B2E0A 0%, #8B5E3C 50%, #C69C6D 100%)'
  if (c.includes('riverwalk') || c.includes('river')) return 'linear-gradient(135deg, #0D3B4F 0%, #1A6B8A 50%, #0A4A6B 100%)'
  if (c.includes('diner') || c.includes('american')) return 'linear-gradient(135deg, #1a0a00 0%, #B8860B 50%, #8B4513 100%)'
  return 'linear-gradient(135deg, #161B22 0%, #D4A853 50%, #0D1117 100%)'
}

interface RestaurantCardProps {
  restaurant: Restaurant
  className?: string
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurants/${restaurant.slug}`}
      className={cn(
        'group block rounded-xl border overflow-hidden transition-all hover:border-[#D4A853]/40',
        className
      )}
      style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}
    >
      {/* Image — CSS gradient as fallback layer; image renders on top if it loads */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: restaurant.imageUrl
              ? `url(${restaurant.imageUrl}), ${getCategoryGradient(restaurant.cuisine)}`
              : getCategoryGradient(restaurant.cuisine),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {restaurant.isPremium && (
            <span
              className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
              style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
            >
              <Award size={11} />
              Featured
            </span>
          )}
          {restaurant.isClaimed && (
            <span
              className="text-xs font-medium px-2 py-1 rounded-full border"
              style={{ borderColor: '#D4A853', color: '#D4A853', backgroundColor: '#D4A85315' }}
            >
              Verified
            </span>
          )}
        </div>
        <div
          className="absolute bottom-3 right-3 text-xs font-semibold px-2 py-1 rounded-full"
          style={{ backgroundColor: '#0D1117CC', color: '#D4A853' }}
        >
          {restaurant.priceRange}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-[#E6EDF3] text-base leading-snug group-hover:text-[#D4A853] transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
        </div>

        {restaurant.cuisine && (
          <p className="text-xs text-[#D4A853] mb-2 font-medium">{restaurant.cuisine}</p>
        )}

        {restaurant.description && (
          <p className="text-sm text-[#8B949E] line-clamp-2 mb-3 leading-relaxed">
            {restaurant.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {restaurant.rating !== null && (
              <>
                <Star size={13} className="fill-[#D4A853] text-[#D4A853]" />
                <span className="text-sm font-semibold text-[#E6EDF3]">{restaurant.rating.toFixed(1)}</span>
                <span className="text-xs text-[#8B949E]">({restaurant.reviewCount})</span>
              </>
            )}
          </div>
          {restaurant.neighborhood && (
            <div className="flex items-center gap-1 text-xs text-[#8B949E]">
              <MapPin size={11} className="flex-shrink-0" />
              <span className="truncate max-w-[120px]">{restaurant.neighborhood}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
