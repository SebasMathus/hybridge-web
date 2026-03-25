import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { resolveLocalizedString } from '@/lib/resolveLocalized'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogArticleBody } from '@/components/blog/BlogArticleBody'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string; slug: string }> }

const labels = {
  es: {
    backBlog: '← Volver al blog',
    backTestimonios: '← Volver a testimonios',
    testimonio: 'Testimonio',
    comunidad: 'Comunidad',
  },
  en: {
    backBlog: '← Back to blog',
    backTestimonios: '← Back to testimonials',
    testimonio: 'Testimonial',
    comunidad: 'Community',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const lang = locale === 'en' ? 'en' : 'es'
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug } },
      locale: lang,
      limit: 1,
      depth: 0,
    })
    const doc = res.docs[0]
    if (!doc) return { title: 'Blog | Hybridge' }
    const title = `${resolveLocalizedString(doc.title, lang)} | Hybridge`
    const description = resolveLocalizedString(doc.metaDescription, lang) || undefined
    return {
      title,
      description,
      openGraph: { title, description, type: 'article', publishedTime: doc.publishedAt },
    }
  } catch {
    return { title: 'Blog | Hybridge' }
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale
  const l = labels[lang]

  let post: any = null
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug } },
      locale: lang,
      limit: 1,
      depth: 0,
    })
    post = res.docs[0]
  } catch {
    post = null
  }

  if (!post) return notFound()

  const title = resolveLocalizedString(post.title, lang)
  const authorName = resolveLocalizedString(post.authorName, lang)
  const bodyMarkdown = resolveLocalizedString(post.bodyMarkdown, lang)

  const dateStr = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.publishedAt))

  const badge = post.contentType === 'comunidad' ? l.comunidad : l.testimonio
  const badgeBg = post.contentType === 'comunidad' ? 'var(--color-hb-text-muted)' : 'var(--color-hb-blue)'
  const isTestimonio = post.contentType !== 'comunidad'
  const backHref = isTestimonio ? `/${lang}/blog/testimonios` : `/${lang}/blog`
  const backLabel = isTestimonio ? l.backTestimonios : l.backBlog

  return (
    <article>
      <div style={{ position: 'relative', minHeight: 'min(45vh, 420px)', background: 'var(--color-hb-bg-alt)' }}>
        {post.featuredImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.featuredImageUrl} alt="" style={{ width: '100%', height: 'min(45vh, 420px)', objectFit: 'cover', display: 'block' }} />
        ) : null}
        <div
          style={{
            position: post.featuredImageUrl ? 'absolute' : 'relative',
            inset: post.featuredImageUrl ? 0 : undefined,
            background: post.featuredImageUrl ? 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 55%)' : undefined,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '32px 0',
          }}
        >
          <div className="container-hb" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            <Link href={backHref} style={{ color: post.featuredImageUrl ? '#fff' : 'var(--color-hb-blue)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px', display: 'inline-block' }}>
              {backLabel}
            </Link>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.35rem)', fontWeight: 900, color: post.featuredImageUrl ? '#fff' : 'var(--color-hb-text)', lineHeight: 1.15, maxWidth: '900px' }}>
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-hb section-pad" style={{ paddingTop: '32px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px', alignItems: 'center', marginBottom: '32px', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: badgeBg, color: '#fff', padding: '4px 10px', borderRadius: '999px' }}>{badge}</span>
          <time dateTime={typeof post.publishedAt === 'string' ? post.publishedAt : new Date(post.publishedAt).toISOString()} style={{ fontSize: '0.9rem', color: 'var(--color-hb-text-muted)' }}>
            {dateStr}
          </time>
          {authorName ? <span style={{ fontSize: '0.9rem', color: 'var(--color-hb-text-muted)' }}>{authorName}</span> : null}
        </div>
        <BlogArticleBody markdown={bodyMarkdown} />
      </div>
    </article>
  )
}
