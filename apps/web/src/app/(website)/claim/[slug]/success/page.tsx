import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

interface PageProps { params: Promise<{ slug: string }> }

export default async function ClaimSuccessPage({ params }: PageProps) {
  const { slug } = await params
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle size={56} className="text-[#D4A853] mx-auto mb-5" />
        <h1 className="text-2xl font-bold text-[#E6EDF3] mb-3">Listing Claimed!</h1>
        <p className="text-[#8B949E] mb-8">
          Payment confirmed. Your listing will be activated within 1-2 business days. You&apos;ll receive a confirmation email shortly.
        </p>
        <Link
          href={`/restaurants/${slug}`}
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold min-h-[44px]"
          style={{ backgroundColor: '#D4A853', color: '#0D1117' }}
        >
          View Your Listing <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
