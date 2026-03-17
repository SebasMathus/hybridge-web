type Props = { block: any; locale: string }

export const PillarsGridBlock = ({ block }: Props) => {
  const pillars = block.pillars || []
  if (!pillars.length) return null
  const bg = block.backgroundColor === 'cream' ? 'var(--color-hb-bg-alt)' : 'var(--color-hb-bg)'

  return (
    <section className="section-pad" style={{ background: bg }}>
      <div className="container-hb">
        {(block.heading || block.highlightText) && (
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, marginBottom: '36px', textAlign: 'center', color: 'var(--color-hb-text)' }}>
            {block.heading}{' '}
            {block.highlightText && <span style={{ color: '#304D6D' }}>{block.highlightText}</span>}
          </h2>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(pillars.length, 4)}, 1fr)`, gap: '16px' }}>
          {pillars.map((p: any, i: number) => (
            <div key={i} style={{ padding: '36px 24px', background: '#fff', borderRadius: '12px', border: '1px solid var(--color-hb-border)', textAlign: 'center' }}>
              {p.icon && <span style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}>{p.icon}</span>}
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-hb-text)', marginBottom: p.description ? '8px' : 0 }}>{p.title}</h3>
              {p.description && <p style={{ fontSize: '0.85rem', color: 'var(--color-hb-text-muted)', lineHeight: 1.5 }}>{p.description}</p>}
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .container-hb > div[style*="grid"] { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  )
}
