import Link from 'next/link'
import { getBlockImage } from '@/lib/utils'

type Props = { block: any; locale: string }

export const TestimonialsRowBlock = ({ block }: Props) => {
  const items = block.testimonials || []
  if (!items.length) return null
  const bg = block.backgroundColor === 'cream' ? 'var(--color-hb-bg-alt)' : 'var(--color-hb-bg)'

  return (
    <section className="section-pad" style={{ background: bg }}>
      <div className="container-hb">
        {block.eyebrow && <p style={{ color: '#E2F897', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>{block.eyebrow}</p>}
        {block.heading && (
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '36px', maxWidth: '650px', color: 'var(--color-hb-text)' }}>{block.heading}</h2>
        )}
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
          {items.map((t: any, i: number) => {
            const imgSrc = getBlockImage(t.image, t.imageUrl)
            return (
              <Link key={i} href={t.videoUrl || '#'} target="_blank" rel="noopener noreferrer"
                style={{ flexShrink: 0, width: '200px', borderRadius: '12px', overflow: 'hidden', aspectRatio: '9/16', background: '#e5e7eb', position: 'relative', display: 'block' }}>
                {imgSrc && <img src={imgSrc} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid #000', marginLeft: '3px' }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{t.name}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
