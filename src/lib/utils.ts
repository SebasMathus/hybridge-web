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

export const btnStyles: Record<string, React.CSSProperties> = {
  primary: {
    display: 'inline-block', padding: '12px 28px', background: '#E2F897',
    color: '#0D0D0D', fontFamily: 'var(--font-display)', fontWeight: 700,
    fontSize: '0.9rem', borderRadius: '8px',
  },
  secondary: {
    display: 'inline-block', padding: '12px 28px', background: '#304D6D',
    color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 600,
    fontSize: '0.9rem', borderRadius: '8px',
  },
  outline: {
    display: 'inline-block', padding: '12px 28px', background: 'transparent',
    border: '1.5px solid var(--color-hb-border)', color: 'var(--color-hb-text)',
    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem',
    borderRadius: '8px',
  },
}
