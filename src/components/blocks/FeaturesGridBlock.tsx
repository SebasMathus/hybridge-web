import { getBlockImage } from '@/lib/utils'

type Props = { block: any; locale: string }

export const FeaturesGridBlock = ({ block }: Props) => {
  const features = block.features || []
  if (!features.length) return null
  const bg = block.backgroundColor === 'cream' ? 'var(--color-hb-bg-alt)' : 'var(--color-hb-bg)'

  return (
    <section className="section-pad" style={{ background: bg }}>
      <div className="container-hb">
        {block.heading && (
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--color-hb-text)', marginBottom: '8px', textAlign: 'center' }}>{block.heading}</h2>
        )}
        {block.subheading && (
          <p style={{ color: 'var(--color-hb-text)', fontSize: '1.05rem', fontWeight: 500, textAlign: 'center', marginBottom: '40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>{block.subheading}</p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(features.length, 4)}, 1fr)`, gap: '20px' }}>
          {features.map((f: any, i: number) => {
            const iconSrc = getBlockImage(f.icon, f.iconUrl)
            return (
              <div key={i} style={{ padding: '32px 24px', background: '#fff', borderRadius: '12px', border: '1px solid var(--color-hb-border)', textAlign: 'center' }}>
                {iconSrc && <img src={iconSrc} alt={f.label} style={{ height: '40px', width: 'auto', marginBottom: '16px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />}
                <p style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-hb-text)', marginBottom: '4px' }}>{f.label}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--color-hb-text)' }}>{f.value}</p>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .container-hb > div[style*="grid"] { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  )
}
