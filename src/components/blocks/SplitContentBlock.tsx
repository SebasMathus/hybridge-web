import Link from 'next/link'
import { getBlockImage, btnStyles } from '@/lib/utils'

type Props = { block: any; locale: string }

export const SplitContentBlock = ({ block, locale }: Props) => {
  const imgSrc = getBlockImage(block.image, block.imageUrl)
  const imgRight = block.imagePosition !== 'left'
  const bg = block.backgroundColor === 'cream' ? 'var(--color-hb-bg-alt)' : 'var(--color-hb-bg)'

  const textEl = (
    <div>
      {block.eyebrow && <p style={{ color: 'var(--color-hb-text)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '8px' }}>{block.eyebrow}</p>}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 900, marginBottom: '20px', color: 'var(--color-hb-text)' }}>{block.heading}</h2>
      {(block.body || '').split('\n').filter((p: string) => p.trim()).map((p: string, i: number) => (
        <p key={i} style={{ color: 'var(--color-hb-text)', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, marginBottom: '16px' }}>{p}</p>
      ))}
      {block.bulletPoints?.length > 0 && (
        (() => {
          // If bullets already include leading emoji (e.g. "👩‍🏫 ..."), we want the emoji to act as the bullet
          // (so we remove the browser's default "disc" marker). For normal text bullets, keep "disc".
          const bulletTexts: string[] = block.bulletPoints.map((bp: any) => String(bp?.text || '').trim())
          const hasEmojiBullet = bulletTexts.length > 0 && bulletTexts.every(t => /^\p{Extended_Pictographic}/u.test(t))

          return (
            <ul
              style={{
                paddingLeft: hasEmojiBullet ? 0 : '20px',
                marginLeft: hasEmojiBullet ? 0 : undefined,
                color: 'var(--color-hb-text)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 2.2,
                listStyle: hasEmojiBullet ? 'none' : 'disc',
                marginBottom: '16px',
              }}
            >
              {block.bulletPoints.map((bp: any, i: number) => <li key={i}>{bp.text}</li>)}
            </ul>
          )
        })()
      )}
      {block.buttons?.length > 0 && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
          {block.buttons.map((btn: any, i: number) => (
            <Link key={i} href={btn.url.startsWith('/') ? `/${locale}${btn.url}` : btn.url} data-track-id={btn.trackId || ''} style={btnStyles[btn.variant || 'primary']}>{btn.label}</Link>
          ))}
        </div>
      )}
    </div>
  )

  const imgEl = imgSrc ? (
    <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
      <img src={imgSrc} alt={block.heading || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  ) : null

  const hasImage = Boolean(imgSrc)

  return (
    <section className="section-pad" style={{ background: bg }}>
      <div
        className="container-hb"
        style={{
          display: 'grid',
          gridTemplateColumns: hasImage ? '1fr 1fr' : '1fr',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {hasImage ? (imgRight ? <>{textEl}{imgEl}</> : <>{imgEl}{textEl}</>) : textEl}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .container-hb { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
