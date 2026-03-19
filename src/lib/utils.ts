export type Locale = 'es' | 'en'

export const getMediaUrl = (media: any): string => {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (media.url?.startsWith('http')) return media.url
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
  return `${serverUrl}${media.url}`
}

export function getBlockImage(image: any, imageUrl?: string | null): string {
  if (imageUrl) return imageUrl
  if (image) return getMediaUrl(image)
  return ''
}

const YOUTUBE_ID_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/

/** Extrae el ID de un video de YouTube. */
export function getYouTubeVideoId(videoUrl: string | null | undefined): string {
  if (!videoUrl || typeof videoUrl !== 'string') return ''
  return videoUrl.match(YOUTUBE_ID_REGEX)?.[1] ?? ''
}

/** URL de la miniatura de YouTube. */
export function getYouTubeThumbnail(videoUrl: string | null | undefined): string {
  const id = getYouTubeVideoId(videoUrl)
  if (!id) return ''
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

/** URL para embeber el video en el sitio (iframe). */
export function getYouTubeEmbedUrl(videoUrl: string | null | undefined, autoplay = true): string {
  const id = getYouTubeVideoId(videoUrl)
  if (!id) return ''
  return `https://www.youtube.com/embed/${id}${autoplay ? '?autoplay=1' : ''}`
}

// Emojis por materia — se calculan en el front para no depender del esquema en Payload
const SUBJECT_EMOJI_MAP: { match: RegExp; emoji: string }[] = [
  { match: /cneyt|ciencias naturales|física|química|energ[ií]a/i, emoji: '🧪' },
  { match: /ciencias sociales|espacio y sociedad|conciencia hist[oó]rica/i, emoji: '🌍' },
  { match: /cultura digital|tecnolog[ií]a|computaci[oó]n/i, emoji: '💻' },
  { match: /pensamiento matem[aá]tico|matem[aá]ticas|c[aá]lculo|[áa]lgebra|estad[ií]stica/i, emoji: '📐' },
  { match: /lengua y comunicaci[oó]n|comunicaci[oó]n oral|pensamiento literario|redacci[oó]n/i, emoji: '📖' },
  { match: /ingl[eé]s/i, emoji: '🗣️' },
  { match: /humanidades|filosof[ií]a|psicolog[ií]a/i, emoji: '🏛️' },
  { match: /laboratorio|investigaci[oó]n|taller de ciencias/i, emoji: '🔬' },
  { match: /administraci[oó]n|econom[ií]a|finanzas|negocios/i, emoji: '📊' },
  { match: /ingenier[ií]a en software|programaci[oó]n|algoritmos|c[oó]digo|desarrollo web/i, emoji: '💻' },
  { match: /datos|ciencia de datos|machine learning|aprendizaje de m[aá]quina/i, emoji: '📊' },
  { match: /inteligencia artificial|ia/i, emoji: '🤖' },
  { match: /videojuegos|realidad virtual|inmersivas/i, emoji: '🎮' },
]

/** Devuelve un emoji para una materia dado su nombre. */
export function getEmojiForSubject(name: string | undefined | null, fallbackIndex = 0): string {
  if (!name) return ['📚', '✨', '⭐'][fallbackIndex % 3]
  for (const rule of SUBJECT_EMOJI_MAP) {
    if (rule.match.test(name)) return rule.emoji
  }
  const fallback = ['📚', '✨', '⭐', '🎓', '🧠']
  return fallback[fallbackIndex % fallback.length]
}

/** Devuelve un arreglo de materias con un campo `emoji` calculado. No modifica el arreglo original. */
export function resolveEmojisForSubjects<T extends { name?: string; emoji?: string }>(subjects: T[]): (T & { emoji: string })[] {
  return subjects.map((subj, index) => ({
    ...subj,
    emoji: subj.emoji || getEmojiForSubject(subj.name, index),
  }))
}

export const btnStyles: Record<string, React.CSSProperties> = {
  primary: {
    display: 'inline-block', padding: '12px 28px', background: 'var(--color-hb-black)',
    color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700,
    fontSize: '0.9rem', borderRadius: '9999px', textDecoration: 'none',
  },
  secondary: {
    display: 'inline-block', padding: '12px 28px', background: 'transparent',
    border: '1.5px solid var(--color-hb-black)', color: 'var(--color-hb-black)',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
    borderRadius: '9999px', textDecoration: 'none',
  },
  tertiary: {
    display: 'inline-block', padding: '12px 28px', background: 'transparent',
    border: '1.5px solid var(--color-hb-black)', color: 'var(--color-hb-black)',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
    borderRadius: '9999px', textDecoration: 'none',
  },
  outline: {
    display: 'inline-block', padding: '12px 28px', background: 'transparent',
    border: '1.5px solid var(--color-hb-black)', color: 'var(--color-hb-black)',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
    borderRadius: '9999px', textDecoration: 'none',
  },
  /** Botón para covers/heros: borde blanco, fondo transparente, texto blanco */
  cover: {
    display: 'inline-block', padding: '12px 28px', background: 'transparent',
    border: '1.5px solid #fff', color: '#fff',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
    borderRadius: '9999px', textDecoration: 'none', letterSpacing: '0.04em',
  },
}
