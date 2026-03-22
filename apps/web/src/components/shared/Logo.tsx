export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dine Pueblo"
    >
      {/* Flame / chile icon */}
      <path
        d="M8 32 C8 32 4 26 6 20 C8 14 12 12 12 8 C12 8 14 12 13 16 C16 12 18 8 20 4 C20 4 24 12 22 20 C24 18 26 16 26 16 C26 16 28 22 24 28 C22 32 16 34 12 34 C10 34 8 32 8 32 Z"
        fill="#D4A853"
      />
      <path
        d="M12 28 C12 28 10 24 12 20 C14 22 16 20 16 20 C16 20 16 26 14 28 C13 29 12 28 12 28 Z"
        fill="#0D1117"
        opacity="0.4"
      />
      {/* Text: DINE */}
      <text x="34" y="27" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="18" fill="#E6EDF3" letterSpacing="1">DINE</text>
      {/* Text: PUEBLO */}
      <text x="34" y="37" fontFamily="system-ui, sans-serif" fontWeight="400" fontSize="10" fill="#D4A853" letterSpacing="3">PUEBLO</text>
    </svg>
  )
}
