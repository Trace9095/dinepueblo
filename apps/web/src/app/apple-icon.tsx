import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Apple touch icon — fork, southwestern gold (Dine Pueblo brand)
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#0D1117',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '6px solid #D4A853',
        }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
          {/* 3 tines */}
          <rect x="14" y="4" width="10" height="46" rx="5" fill="#D4A853" />
          <rect x="35" y="4" width="10" height="46" rx="5" fill="#D4A853" />
          <rect x="56" y="4" width="10" height="46" rx="5" fill="#D4A853" />
          {/* Bridge */}
          <rect x="14" y="48" width="52" height="8" rx="4" fill="#D4A853" />
          {/* Handle */}
          <rect x="33" y="55" width="14" height="42" rx="7" fill="#D4A853" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
