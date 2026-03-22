import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D1117' }}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
