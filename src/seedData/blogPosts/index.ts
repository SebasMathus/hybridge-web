import data from './wpSeed.generated.json'

export type BlogPostSeedRow = {
  slug: string
  titleEs: string
  titleEn: string
  publishedAt: string
  authorName: string
  contentType: 'testimonio' | 'comunidad'
  featured: boolean
  featuredImageUrl: string
  metaDescriptionEs: string
  metaDescriptionEn: string
  bodyMarkdownEs: string
  bodyMarkdownEn: string
}

/** Slugs destacados en carrusel (blog + testimonios). */
export const BLOG_FEATURED_SLUGS = new Set([
  'testimonio-prepa-en-linea-kami',
  'testimonio-universidad-en-linea-javier',
  'testimonio-universidad-en-linea-alexis',
  'testimonio-universidad-en-linea-aura',
  'prepa-en-linea-sofia',
])

/** Clasificación manual: WP los marcó como testimonio pero son contenido de comunidad. */
const FORCE_COMUNIDAD_SLUGS = new Set([
  'dani-mi-testimonio-hybridge',
  'educacion-a-distancia-disenando-experiencias-cuerpo-docente',
])

/** 47 entradas importadas desde WordPress (hybridge.education), con URLs de YouTube en markdown cuando aplica. */
export function loadBlogPostsSeedRows(): BlogPostSeedRow[] {
  return (data as Omit<BlogPostSeedRow, 'featured'>[]).map((row) => ({
    ...row,
    featured: BLOG_FEATURED_SLUGS.has(row.slug),
    contentType: FORCE_COMUNIDAD_SLUGS.has(row.slug) ? 'comunidad' : row.contentType,
  }))
}
