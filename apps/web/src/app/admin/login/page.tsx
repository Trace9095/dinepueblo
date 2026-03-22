'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('CEO@epicai.ai')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const d = await res.json() as { error?: string }
        setError(d.error ?? 'Invalid credentials')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0D1117' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo className="h-10 w-auto" />
        </div>
        <div className="rounded-2xl border p-8" style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}>
          <div className="flex items-center gap-2 mb-6">
            <Lock size={18} className="text-[#D4A853]" />
            <h1 className="text-lg font-bold text-[#E6EDF3]">Admin Login</h1>
          </div>
          {error && (
            <p className="text-sm text-[#F85149] p-3 rounded-lg mb-4" style={{ backgroundColor: '#F8514910' }}>{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#8B949E] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px]"
                style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
              />
            </div>
            <div>
              <label className="block text-sm text-[#8B949E] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full px-3 py-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#D4A853] min-h-[44px]"
                style={{ backgroundColor: '#21262D', color: '#E6EDF3', border: '1px solid #30363D' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold min-h-[44px] disabled:opacity-50"
              style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
            >
              {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
