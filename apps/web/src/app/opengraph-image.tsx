import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dine Pueblo — Pueblo CO Dining Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'flex-end',
          backgroundColor: '#0D1117',
          padding: '60px 72px',
          backgroundImage: 'radial-gradient(ellipse at 70% 30%, #D4A85318 0%, transparent 60%)',
        }}
      >
        {/* Top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, backgroundColor: '#D4A853' }} />

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {['Pueblo Slopper', 'Craft Breweries', 'Italian', 'Mexican'].map(tag => (
            <div key={tag} style={{
              backgroundColor: '#D4A85318',
              border: '1px solid #D4A85360',
              color: '#D4A853',
              borderRadius: 100,
              padding: '6px 16px',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'system-ui',
            }}>
              {tag}
            </div>
          ))}
        </div>

        {/* Main text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ color: '#D4A853', fontSize: 22, fontWeight: 700, fontFamily: 'system-ui', letterSpacing: 4, textTransform: 'uppercase' }}>
            Pueblo, Colorado
          </div>
          <div style={{ color: '#E6EDF3', fontSize: 64, fontWeight: 800, fontFamily: 'system-ui', lineHeight: 1.1 }}>
            Dine Pueblo
          </div>
          <div style={{ color: '#8B949E', fontSize: 28, fontFamily: 'system-ui', fontWeight: 400 }}>
            Discover the best food in Pueblo, CO
          </div>
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 48, right: 72, color: '#8B949E', fontSize: 18, fontFamily: 'system-ui' }}>
          dinepueblo.com
        </div>
      </div>
    ),
    { ...size }
  )
}
