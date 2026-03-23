import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Fork favicon — southwestern gold on dark bg (Dine Pueblo brand)
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0D1117',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid #D4A853',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* 3 tines */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <div style={{ width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
            <div style={{ width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
            <div style={{ width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
          </div>
          {/* Bridge connecting tines to handle */}
          <div style={{ width: 17, height: 3, background: '#D4A853', borderRadius: 1 }} />
          {/* Handle */}
          <div style={{ width: 6, height: 13, background: '#D4A853', borderRadius: 3 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
