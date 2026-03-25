import Link from 'next/link'
import type { Locale } from '@/lib/utils'

export type BlogCardPost = {
  slug: string
  title: string
  publishedAt: string
  authorName?: string
  contentType: 'testimonio' | 'comunidad'
  featuredImageUrl?: string
}

type Props = {
  post: BlogCardPost
  locale: Locale
  labels: { readMore: string; testimonio: string; comunidad: string }
}

export function BlogPostCard({ post, locale, labels }: Props) {
  const dateStr = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.publishedAt))

  const badge = post.contentType === 'testimonio' ? labels.testimonio : labels.comunidad
  const badgeBg = post.contentType === 'testimonio' ? 'var(--color-hb-blue)' : 'var(--color-hb-text-muted)'

  return (
    <article
      style={{
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--color-hb-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Link href={`/${locale}/blog/${post.slug}`} style={{ display: 'block', aspectRatio: '16/9', background: 'var(--color-hb-bg-alt)', position: 'relative' }}>
        {post.featuredImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.featuredImageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        ) : null}
      </Link>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: badgeBg, color: '#fff', padding: '4px 10px', borderRadius: '999px' }}>
            {badge}
          </span>
          <time dateTime={post.publishedAt} style={{ fontSize: '0.8rem', color: 'var(--color-hb-text-muted)' }}>
            {dateStr}
          </time>
        </div>
        <Link href={`/${locale}/blog/${post.slug}`}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.35, color: 'var(--color-hb-text)' }}>{post.title}</h2>
        </Link>
        {post.authorName ? <p style={{ fontSize: '0.85rem', color: 'var(--color-hb-text-muted)' }}>{post.authorName}</p> : null}
        <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
          <Link
            href={`/${locale}/blog/${post.slug}`}
            style={{
              display: 'inline-block',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: 'var(--color-hb-blue)',
              borderBottom: '2px solid var(--color-hb-yellow)',
            }}
          >
            {labels.readMore}
          </Link>
        </div>
      </div>
    </article>
  )
}
