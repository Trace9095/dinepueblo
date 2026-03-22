'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface FiltersProps {
  cuisines: string[]
  neighborhoods: string[]
}

export function RestaurantFilters({ cuisines, neighborhoods }: FiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentSearch = searchParams.get('q') ?? ''
  const currentCuisine = searchParams.get('cuisine') ?? ''
  const currentNeighborhood = searchParams.get('neighborhood') ?? ''
  const currentPrice = searchParams.get('price') ?? ''

  const [search, setSearch] = useState(currentSearch)

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    startTransition(() => router.push(`${pathname}?${params.toString()}`))
  }

  function clearAll() {
    startTransition(() => router.push(pathname))
    setSearch('')
  }

  const hasFilters = currentSearch || currentCuisine || currentNeighborhood || currentPrice

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            updateParam('q', e.target.value)
          }}
          className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px]"
          style={{ backgroundColor: '#21262D', color: '#E6EDF3', borderColor: '#30363D', border: '1px solid' }}
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-3">
        <select
          value={currentCuisine}
          onChange={e => updateParam('cuisine', e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px] cursor-pointer"
          style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
        >
          <option value="">All Cuisines</option>
          {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={currentNeighborhood}
          onChange={e => updateParam('neighborhood', e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px] cursor-pointer"
          style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
        >
          <option value="">All Neighborhoods</option>
          {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
        </select>

        <select
          value={currentPrice}
          onChange={e => updateParam('price', e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px] cursor-pointer"
          style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
        >
          <option value="">Any Price</option>
          <option value="$">$ Budget</option>
          <option value="$$">$$ Mid-Range</option>
          <option value="$$$">$$$ Upscale</option>
          <option value="$$$$">$$$$ Fine Dining</option>
        </select>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm min-h-[44px] transition-colors text-[#8B949E] hover:text-[#E6EDF3]"
            style={{ border: '1px solid #30363D' }}
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {isPending && (
        <p className="text-xs text-[#8B949E]">Filtering...</p>
      )}
    </div>
  )
}
