type Item = {
  icon: string
  text: string
}

type Props = {
  title?: string
  highlight?: string
  subtitle?: string
  items?: Item[]
}

export function OrgulloPrepa({
  title = 'ORGULLO',
  highlight = 'HYBRIDGE',
  subtitle = 'Elementos de la experiencia educativa en Hybridge que nos enorgullecen...',
  items = [
    { icon: '🏆', text: 'Nuestra tasa de retención es de 93%' },
    { icon: '✈️', text: 'Participación estudiantil en concursos internacionales' },
    { icon: '🥇', text: 'Menciones en medios y rankings internacionales' },
    { icon: '🧑‍💻', text: 'Contamos con nuestra propia tecnología' },
    { icon: '🤝', text: 'Nuestras alianzas educativas' },
  ],
}: Props) {
  return (
    <section className="section-pad" style={{ background: '#0D0D0D' }}>
      <div className="container-hb">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.75rem', letterSpacing: '0.02em', color: '#fff', marginBottom: '6px' }}>
            {title}{' '}
            <span style={{ color: '#C07CFF' }}>{highlight}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1rem', fontWeight: 400, maxWidth: 720, margin: '0 auto' }}>{subtitle}</p>
        </div>

        <div
          className="orgullo-prepa-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
            gap: '0px',
            alignItems: 'start',
          }}
        >
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                padding: '18px 18px',
                textAlign: 'center',
                borderLeft: i === 0 ? 'none' : '1px dotted rgba(255,255,255,0.2)',
              }}
            >
              <div style={{ fontSize: '1.4rem', marginBottom: '10px', opacity: 0.9 }}>{it.icon}</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.45, fontWeight: 400, maxWidth: 180, margin: '0 auto' }}>
                {it.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .orgullo-prepa-grid { grid-template-columns: 1fr 1fr !important; }
          .orgullo-prepa-grid > div { border-left: none !important; border-top: 1px dotted rgba(255,255,255,0.18); }
          .orgullo-prepa-grid > div:nth-child(1),
          .orgullo-prepa-grid > div:nth-child(2) { border-top: none; }
        }
        @media (max-width: 520px) {
          .orgullo-prepa-grid { grid-template-columns: 1fr !important; }
          .orgullo-prepa-grid > div:nth-child(2) { border-top: 1px dotted rgba(255,255,255,0.18) !important; }
        }
      `}</style>
    </section>
  )
}

