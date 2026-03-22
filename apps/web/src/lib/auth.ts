import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db, admins } from '@/db'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

function getSecret(): Uint8Array {
  const s = process.env['JWT_SECRET']
  if (!s) throw new Error('JWT_SECRET is not set')
  return new TextEncoder().encode(s)
}

export async function verifyAdminCredentials(email: string, password: string) {
  const results = await db.select().from(admins).where(eq(admins.email, email)).limit(1)
  const admin = results[0]
  if (!admin) return null
  const valid = await bcrypt.compare(password, admin.passwordHash)
  if (!valid) return null
  return { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
}

export async function createSessionToken(adminId: string, email: string): Promise<string> {
  return new SignJWT({ sub: adminId, email, type: 'admin-session' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, getSecret())
    if (payload['type'] !== 'admin-session') return null
    return { id: payload.sub as string, email: payload['email'] as string }
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) {
    const { redirect } = await import('next/navigation')
    redirect('/admin/login')
  }
  return session
}
