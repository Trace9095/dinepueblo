import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog-data'

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border overflow-hidden transition-all hover:border-[#D4A853]/40"
      style={{ backgroundColor: '#161B22', borderColor: '#30363D' }}
    >
      <div className="h-48 overflow-hidden bg-[#21262D]">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1a1200 0%, #21262D 100%)' }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#D4A85320', color: '#D4A853' }}
            >
              {post.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <span
          className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ backgroundColor: '#D4A85320', color: '#D4A853' }}
        >
          {post.category}
        </span>
        <h3 className="mt-3 text-base font-semibold text-[#E6EDF3] leading-snug group-hover:text-[#D4A853] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[#8B949E] line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[#8B949E]">
            <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
          </div>
          <ArrowRight size={15} className="text-[#D4A853] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
