import Link from 'next/link'
import { getBlockImage } from '@/lib/utils'

type Props = { block: any; locale: string }

export const ProgramsGridBlock = ({ block, locale }: Props) => {
  const items = block.programs || []
  if (!items.length) return null

  return (
    <section id="universidad" className="section-pad">
      {(block.heading || block.highlightText) && (
        <div className="container-hb" style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, textAlign: 'center', color: 'var(--color-hb-text)' }}>
            {block.heading}{' '}
            {block.highlightText && <span style={{ color: '#304D6D' }}>{block.highlightText}</span>}
          </h2>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {items.map((p: any, i: number) => {
          const imgSrc = getBlockImage(p.image, p.imageUrl)
          return (
            <Link key={i} href={`/${locale}/${p.url.replace(/^\//, '')}`} style={{ display: 'block', position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              {imgSrc && <img src={imgSrc} alt={p.type + ' ' + p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', zIndex: 2 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E2F897', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{p.type}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '6px' }}>{p.name}</h3>
                {p.description && <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{p.description}</p>}
                <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.8rem', fontWeight: 600, color: '#E2F897' }}>Conoce más →</span>
              </div>
            </Link>
          )
        })}
      </div>
      <style>{`@media (max-width: 768px) { div[style*="repeat(3"] { grid-template-columns: 1fr !important; } } @media (min-width: 769px) and (max-width: 1024px) { div[style*="repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </section>
  )
}
