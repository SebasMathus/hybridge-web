import Link from 'next/link'
import { getBlockImage, btnStyles } from '@/lib/utils'

type Props = { block: any; locale: string }

export const HeroBannerBlock = ({ block, locale }: Props) => {
  const imgSrc = getBlockImage(block.image, block.imageUrl)
  const ctaHref = block.ctaUrl?.startsWith('/') ? `/${locale}${block.ctaUrl}` : block.ctaUrl
  return (
    <section style={{ position: 'relative', width: '100%', height: '70vh', minHeight: '400px', maxHeight: '650px', display: 'flex', alignItems: 'center' }}>
      {imgSrc && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
      <div className="container-hb" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', fontWeight: 900, lineHeight: 1.15, color: '#fff', marginBottom: '16px' }}>{block.heading}</h1>
          {block.subheading && <p style={{ fontSize: '1.05rem', fontWeight: 500, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '28px', maxWidth: '500px' }}>{block.subheading}</p>}
          {block.ctaUrl && <Link href={ctaHref || '#'} data-track-id={block.ctaTrackId || ''} style={btnStyles.primary}>{block.ctaLabel || 'Inscríbete ya'}</Link>}
        </div>
      </div>
    </section>
  )
}
