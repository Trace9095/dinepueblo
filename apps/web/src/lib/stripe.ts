import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env['STRIPE_SECRET_KEY']
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' })
  }
  return _stripe
}

export const CLAIM_TIERS = {
  basic: { name: 'Basic Listing', price: 9900, label: '$99/year', features: ['Verified owner badge', 'Update hours & info', 'Add up to 10 photos', 'Direct contact button'] },
  premium: { name: 'Premium Listing', price: 19900, label: '$199/year', features: ['Everything in Basic', 'Featured placement in search', 'Homepage featured slot', 'Promotional banner', 'Menu showcase section', 'Priority support'] },
} as const

export type ClaimTier = keyof typeof CLAIM_TIERS

export async function createClaimCheckout(opts: {
  tier: ClaimTier
  restaurantSlug: string
  restaurantName: string
  contactEmail: string
  successUrl: string
  cancelUrl: string
}) {
  const stripe = getStripe()
  const tier = CLAIM_TIERS[opts.tier]
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: opts.contactEmail,
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${tier.name} — ${opts.restaurantName}`,
          description: `DinePueblo listing for ${opts.restaurantName}`,
        },
        unit_amount: tier.price,
      },
      quantity: 1,
    }],
    metadata: { restaurantSlug: opts.restaurantSlug, restaurantName: opts.restaurantName, tier: opts.tier },
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
  })
}
