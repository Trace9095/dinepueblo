import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { db, claims, restaurants } from '@/db'
import { eq } from 'drizzle-orm'
import { notifyClaim, sendClaimConfirmation } from '@/lib/email'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET']

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const body = await req.text()
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe/webhook] signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { restaurantSlug, restaurantName, tier } = session.metadata ?? {}

    if (session.id) {
      // Mark claim as paid/approved
      await db
        .update(claims)
        .set({ status: 'approved', paidAt: new Date(), stripeCustomerId: session.customer as string | null })
        .where(eq(claims.stripeSessionId, session.id))

      // Mark restaurant as claimed + premium if premium tier
      if (restaurantSlug) {
        await db
          .update(restaurants)
          .set({
            isClaimed: true,
            claimedByEmail: session.customer_email,
            claimedAt: new Date(),
            isPremium: tier === 'premium',
            featured: tier === 'premium',
          })
          .where(eq(restaurants.slug, restaurantSlug))
      }

      // Email notifications
      try {
        await notifyClaim({
          restaurantName: restaurantName ?? restaurantSlug ?? 'Unknown',
          contactName: session.customer_details?.name ?? 'Unknown',
          contactEmail: session.customer_email ?? '',
          tier: tier ?? 'basic',
          stripeSessionId: session.id,
        })
        if (session.customer_email) {
          await sendClaimConfirmation({
            contactName: session.customer_details?.name ?? 'Owner',
            contactEmail: session.customer_email,
            restaurantName: restaurantName ?? 'Your restaurant',
            tier: tier ?? 'basic',
          })
        }
      } catch (emailErr) {
        console.error('[stripe/webhook] email error:', emailErr)
      }
    }
  }

  return NextResponse.json({ received: true })
}
