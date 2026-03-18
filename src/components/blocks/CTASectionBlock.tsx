import Link from 'next/link'
import { btnStyles } from '@/lib/utils'

type Props = { block: any; locale: string }

export const CTASectionBlock = ({ block, locale }: Props) => {
  const bg = block.backgroundColor === 'cream' ? 'var(--color-hb-bg-alt)' : 'var(--color-hb-bg)'
  const buttons = block.buttons || []

  return (
    <section style={{ background: bg, padding: '64px 0', textAlign: 'center' }}>
      <div className="container-hb">
        {block.eyebrow && <p style={{ color: 'var(--color-hb-text)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '8px' }}>{block.eyebrow}</p>}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 900, marginBottom: '24px', color: 'var(--color-hb-text)' }}>
          {block.heading}{' '}
          {block.highlightText && <span style={{ color: 'var(--color-hb-text)' }}>{block.highlightText}</span>}
        </h2>
        {buttons.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {buttons.map((btn: any, i: number) => {
              const href = btn.url.startsWith('http') ? btn.url : (btn.url.startsWith('/') ? `/${locale}${btn.url}` : btn.url)
              return (
                <Link key={i} href={href} target={btn.url.startsWith('http') ? '_blank' : undefined} rel={btn.url.startsWith('http') ? 'noopener noreferrer' : undefined} data-track-id={btn.trackId || ''} style={btnStyles[btn.variant || 'primary']}>
                  {btn.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
