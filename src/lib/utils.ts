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
