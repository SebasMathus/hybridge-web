import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import type { Where } from 'payload'
import { resolveLocalizedString } from '@/lib/resolveLocalized'
import { blogDocToCard } from '@/lib/blogSerialize'
import type { Metadata } from 'next'
import { BlogHeroCarousel } from '@/components/blog/BlogHeroCarousel'
import { BlogInfiniteFeed } from '@/components/blog/BlogInfiniteFeed'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

const testimonioWhere = { contentType: { equals: 'testimonio' as const } }

const heroTestimoniosWhere: Where = {
  and: [{ contentType: { equals: 'testimonio' } }, { featured: { equals: true } }],
}

const copy = {
  es: {
    title: 'Testimonios',
    subtitle: 'Te compartimos la historia de nuestros estudiantes.',
    readMore: 'Leer más',
    testimonio: 'Testimonio',
    comunidad: 'Comunidad',
    metaTitle: 'Testimonios | Hybridge',
    metaDescription: 'Historias reales de estudiantes en Hybridge: prepa y universidad en línea.',
    loadingMore: 'Cargando más testimonios…',
    allLoaded: 'Has visto todos los testimonios.',
  },
  en: {
    title: 'Testimonials',
    subtitle: 'We share our students’ stories with you.',
    readMore: 'Read more',
    testimonio: 'Testimonial',
    comunidad: 'Community',
    metaTitle: 'Testimonials | Hybridge',
    metaDescription: 'Real student stories at Hybridge: online high school and university.',
    loadingMore: 'Loading more testimonials…',
    allLoaded: "You've seen all testimonials.",
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = locale === 'en' ? 'en' : 'es'
  const c = copy[lang]
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    openGraph: { title: c.metaTitle, description: c.metaDescription },
  }
}

export default async function BlogTestimoniosPage({ params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale
  const c = copy[lang]

  let heroDocs: any[] = []
  let firstPageDocs: any[] = []
  let totalDocs = 0
  try {
    const payload = await getPayloadClient()
    const [heroRes, gridRes] = await Promise.all([
      payload.find({
        collection: 'blog-posts',
        locale: lang,
        where: heroTestimoniosWhere,
        sort: '-publishedAt',
        limit: 5,
        page: 1,
        depth: 0,
      }),
      payload.find({
        collection: 'blog-posts',
        locale: lang,
        where: testimonioWhere,
        sort: '-publishedAt',
        limit: 10,
        page: 1,
        depth: 0,
      }),
    ])
    heroDocs = heroRes.docs
    firstPageDocs = gridRes.docs
    totalDocs = typeof gridRes.totalDocs === 'number' ? gridRes.totalDocs : gridRes.docs.length
  } catch (_) {
    heroDocs = []
    firstPageDocs = []
    totalDocs = 0
  }

  const heroSlides = heroDocs.map((p) => ({
    title: resolveLocalizedString(p.title, lang),
    imageUrl: p.featuredImageUrl || '',
    href: `/${lang}/blog/${p.slug}`,
  }))

  const initialCards = firstPageDocs.map((p) => blogDocToCard(p as Record<string, unknown>, lang))

  return (
    <>
      <BlogHeroCarousel slides={heroSlides} readMoreLabel={c.readMore} />
      <section className="section-pad" style={{ background: 'var(--color-hb-bg-alt)' }}>
        <div className="container-hb">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '12px', textAlign: 'center' }}>
            {c.title}
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--color-hb-text-muted)', maxWidth: '640px', margin: '0 auto 48px', fontSize: '1.05rem' }}>{c.subtitle}</p>
          {initialCards.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-hb-text-muted)' }}>
              {lang === 'en' ? 'No testimonials yet. Run the seed.' : 'Aún no hay testimonios. Ejecuta el seed.'}
            </p>
          ) : (
            <BlogInfiniteFeed
              key={`${lang}-testimonios`}
              locale={lang}
              initialPosts={initialCards}
              totalDocs={totalDocs}
              contentType="testimonio"
              labels={{
                readMore: c.readMore,
                testimonio: c.testimonio,
                comunidad: c.comunidad,
                loading: c.loadingMore,
                end: c.allLoaded,
              }}
            />
          )}
        </div>
      </section>
    </>
  )
}
