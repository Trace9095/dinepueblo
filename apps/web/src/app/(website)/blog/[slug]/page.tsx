import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/lib/blog-data'

interface PageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://dinepueblo.com/blog/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `https://dinepueblo.com/blog/${slug}`, images: [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [post.imageUrl] },
  }
}

// Minimal markdown-like rendering (no external dep)
function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) { elements.push(<div key={key++} className="h-4" />); continue }
    if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-xl font-bold text-[#E6EDF3] mt-8 mb-3">{trimmed.slice(3)}</h2>)
    } else if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-lg font-semibold text-[#E6EDF3] mt-6 mb-2">{trimmed.slice(4)}</h3>)
    } else if (trimmed.startsWith('- ')) {
      elements.push(
        <ul key={key++} className="list-disc list-inside text-[#8B949E] mb-2">
          <li>{trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</li>
        </ul>
      )
    } else {
      const html = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#E6EDF3">$1</strong>')
        .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#D4A853;text-decoration:underline">$1</a>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#D4A853;text-decoration:underline">$1</a>')
      elements.push(<p key={key++} className="text-[#8B949E] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: html }} />)
    }
  }
  return elements
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    datePublished: post.publishedAt,
    publisher: { '@type': 'Organization', name: 'Dine Pueblo', url: 'https://dinepueblo.com' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-[#8B949E] mb-6">
          <Link href="/" className="hover:text-[#D4A853] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-[#D4A853] transition-colors">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-[#E6EDF3] truncate max-w-[200px]">{post.title}</span>
        </nav>

        <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ backgroundColor: '#D4A85320', color: '#D4A853' }}>
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#E6EDF3] mt-4 mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-[#8B949E] mb-8">
          <span className="flex items-center gap-1.5"><Calendar size={13} />{date}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime}</span>
        </div>

        <div className="rounded-xl overflow-hidden h-64 sm:h-80 mb-10">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article>{renderContent(post.content)}</article>

        <div className="mt-12 pt-8 border-t" style={{ borderColor: '#30363D' }}>
          <Link href="/blog" className="flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#D4A853] transition-colors min-h-[44px]">
            <ArrowLeft size={14} /> Back to all posts
          </Link>
        </div>
      </div>
    </>
  )
}
