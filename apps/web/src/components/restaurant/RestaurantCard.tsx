import Link from 'next/link'
import { Star, MapPin, DollarSign, Award } from 'lucide-react'
import type { Restaurant } from '@/db/schema'
import { cn } from '@/lib/utils'

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
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#21262D]">
        {restaurant.imageUrl ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#30363D]">
            <DollarSign size={40} />
          </div>
        )}
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
