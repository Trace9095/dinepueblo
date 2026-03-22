import { NextRequest, NextResponse } from 'next/server'
import { db, listingRequests } from '@/db'
import { notifyListingRequest } from '@/lib/email'
import { z } from 'zod'

const RequestSchema = z.object({
  restaurantName: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
  cuisine: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const data = RequestSchema.parse(body)

    await db.insert(listingRequests).values({
      restaurantName: data.restaurantName,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone ?? null,
      address: data.address ?? null,
      website: data.website ?? null,
      cuisine: data.cuisine ?? null,
      message: data.message ?? null,
      status: 'pending',
    })

    try {
      await notifyListingRequest({
        restaurantName: data.restaurantName,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        address: data.address,
        message: data.message,
      })
    } catch (emailErr) {
      console.error('[request-listing] email error:', emailErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    console.error('[request-listing]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
