import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>

let _db: DrizzleDb | null = null

function getDbInstance(): DrizzleDb {
  if (_db) return _db
  const url = process.env['DATABASE_URL']
  if (!url) throw new Error('DATABASE_URL is not set')
  _db = drizzle(neon(url), { schema })
  return _db
}

// Lazy proxy — module import succeeds even without DATABASE_URL.
// Throws only when a query is actually executed.
export const db = new Proxy({} as DrizzleDb, {
  get(_t, prop) {
    return (getDbInstance() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export * from './schema'
