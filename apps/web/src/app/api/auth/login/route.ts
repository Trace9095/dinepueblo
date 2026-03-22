import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, createSessionToken } from '@/lib/auth'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown
    const { email, password } = LoginSchema.parse(body)

    const admin = await verifyAdminCredentials(email, password)
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await createSessionToken(admin.id, admin.email)

    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return res
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[auth/login]', msg)
    return NextResponse.json({ error: 'Server error', detail: msg }, { status: 500 })
  }
}
