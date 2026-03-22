import { NextRequest, NextResponse } from 'next/server'
import { createClaimCheckout, type ClaimTier } from '@/lib/stripe'
import { getRestaurantBySlug } from '@/lib/db-helpers'
import { db, claims } from '@/db'
import { z } from 'zod'

const CheckoutSchema = z.object({
  restaurantSlug: z.string(),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  tier: z.enum(['basic', 'premium']),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const { restaurantSlug, contactName, contactEmail, contactPhone, tier } = CheckoutSchema.parse(body)

    const restaurant = await getRestaurantBySlug(restaurantSlug)
    if (!restaurant) return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })

    const appUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000'

    const session = await createClaimCheckout({
      tier: tier as ClaimTier,
      restaurantSlug,
      restaurantName: restaurant.name,
      contactEmail,
      successUrl: `${appUrl}/claim/${restaurantSlug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/claim/${restaurantSlug}`,
    })

    // Pre-create claim record
    await db.insert(claims).values({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      contactName,
      contactEmail,
      contactPhone: contactPhone ?? null,
      tier: tier as 'basic' | 'premium',
      stripeSessionId: session.id,
      status: 'pending',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    console.error('[checkout]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
