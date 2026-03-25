import { resolveLocalizedString } from '@/lib/resolveLocalized'
import type { Locale } from '@/lib/utils'
import type { BlogCardPost } from '@/components/blog/BlogPostCard'

export function blogDocToCard(doc: Record<string, unknown>, lang: Locale): BlogCardPost {
  const publishedAt = doc.publishedAt
  const dateIso =
    typeof publishedAt === 'string'
      ? publishedAt
      : publishedAt instanceof Date
        ? publishedAt.toISOString()
        : publishedAt
          ? new Date(publishedAt as string).toISOString()
          : ''
  return {
    slug: String(doc.slug ?? ''),
    title: resolveLocalizedString(doc.title, lang),
    publishedAt: dateIso,
    authorName: resolveLocalizedString(doc.authorName, lang) || 'Hybridge',
    contentType: doc.contentType === 'comunidad' ? 'comunidad' : 'testimonio',
    featuredImageUrl: (doc.featuredImageUrl as string) || undefined,
  }
}
