'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Locale } from '@/lib/utils'
import type { BlogCardPost } from '@/components/blog/BlogPostCard'
import { BlogPostCard } from '@/components/blog/BlogPostCard'

type Labels = { readMore: string; testimonio: string; comunidad: string; loading: string; end: string }

type Props = {
  locale: Locale
  initialPosts: BlogCardPost[]
  totalDocs: number
  labels: Labels
  /** Filtra por tipo de entrada en la API (paginación coherente con el listado inicial). */
  contentType?: 'testimonio' | 'comunidad'
}

export function BlogInfiniteFeed({ locale, initialPosts, totalDocs, labels, contentType }: Props) {
  const [posts, setPosts] = useState<BlogCardPost[]>(initialPosts)
  const pageRef = useRef(1)
  const loadingRef = useRef(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPosts.length < totalDocs)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)
    try {
      const next = pageRef.current + 1
      const q = new URLSearchParams({ locale, page: String(next), limit: '10' })
      if (contentType) q.set('contentType', contentType)
      const r = await fetch(`/api/blog-posts?${q.toString()}`)
      const j = (await r.json()) as {
        docs?: BlogCardPost[]
        hasNextPage?: boolean
      }
      const nextDocs = j.docs ?? []
      pageRef.current = next
      setPosts((prev) => [...prev, ...nextDocs])
      if (!j.hasNextPage || nextDocs.length === 0) setHasMore(false)
    } catch {
      setHasMore(false)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [hasMore, locale, contentType])

  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore()
      },
      { root: null, rootMargin: '280px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [hasMore, loadMore])

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} locale={locale} labels={{ readMore: labels.readMore, testimonio: labels.testimonio, comunidad: labels.comunidad }} />
        ))}
      </div>
      {hasMore ? <div ref={sentinelRef} style={{ height: '1px', marginTop: '24px' }} aria-hidden /> : null}
      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '28px', color: 'var(--color-hb-text-muted)', fontSize: '0.95rem' }}>{labels.loading}</p>
      ) : null}
      {!hasMore && posts.length > 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--color-hb-text-muted)', fontSize: '0.9rem' }}>{labels.end}</p>
      ) : null}
    </>
  )
}
