type Props = {
  graduatedCount?: number
  percent?: number
  mexicoUniversities?: string[]
  abroadUniversities?: string[]
}

export function GraduadosPrepa({
  graduatedCount = 220,
  percent = 15,
  mexicoUniversities = ['UNAM', 'IPN', 'UAM', 'ITAM', 'Tec'],
  abroadUniversities = ['McGill', 'Princeton', 'Lake Forest', 'ESMUC', 'Toronto'],
}: Props) {
  return (
    <section className="section-pad" style={{ background: 'var(--color-hb-bg)' }}>
      <div className="container-hb">
        <div
          className="graduados-prepa-grid"
          style={{
            gap: '28px',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              background: '#0D0D0D',
              borderRadius: '18px',
              padding: '34px 28px',
              color: '#fff',
              border: '1px solid #1f2937',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '320px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img src="/Logo_blanco.png" alt="Hybridge" style={{ height: '22px', width: 'auto' }} />
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '4.25rem', lineHeight: 0.95, marginBottom: '10px' }}>
              +{graduatedCount}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.05rem', lineHeight: 1.05, marginBottom: '14px' }}>
              ESTUDIANTES
              <br />
              GRADUADOS
            </div>

            <div style={{ fontSize: '1rem', color: '#e5e7eb', marginBottom: '10px' }}>
              Preparatoria <span style={{ color: 'var(--color-hb-yellow)', fontWeight: 700 }}>Hybridge</span>
            </div>
            <div style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.5, maxWidth: '32ch' }}>
              Nuestros estudiantes estudian en las mejores universidades del mundo.
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1px solid var(--color-hb-border)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              minHeight: '320px',
            }}
          >
            <div
              style={{
                background: 'var(--color-hb-bg-alt)',
                borderRadius: '14px',
                border: '1px solid var(--color-hb-border)',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.95rem', letterSpacing: '0.02em' }}>
                  UNIVERSIDADES EN <span style={{ fontStyle: 'italic' }}>MÉXICO</span>
                </div>
                <div style={{ fontSize: '1.1rem' }} aria-hidden>🇲🇽</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
                {mexicoUniversities.map((u) => (
                  <div key={u} style={{ height: 34, borderRadius: 10, background: '#fff', border: '1px solid var(--color-hb-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--color-hb-text-muted)', fontWeight: 600 }}>
                    {u}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: 'var(--color-hb-bg-alt)',
                borderRadius: '14px',
                border: '1px solid var(--color-hb-border)',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.95rem', letterSpacing: '0.02em' }}>
                  UNIVERSIDADES EN EL <span style={{ fontStyle: 'italic' }}>EXTRANJERO</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', fontSize: '1.1rem' }} aria-hidden>
                  <span>🇺🇸</span>
                  <span>🇪🇸</span>
                  <span>🇨🇦</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px' }}>
                {abroadUniversities.map((u) => (
                  <div key={u} style={{ height: 34, borderRadius: 10, background: '#fff', border: '1px solid var(--color-hb-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--color-hb-text-muted)', fontWeight: 600 }}>
                    {u}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid var(--color-hb-border)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.9rem', lineHeight: 1 }}>{percent}%</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-hb-text-muted)' }}>
                  de nuestros estudiantes eligieron <span style={{ color: 'var(--color-hb-text)', fontWeight: 700 }}>Universidad Hybridge</span> para continuar con sus estudios.
                </div>
              </div>
              <span style={{ fontSize: '1.1rem' }} aria-hidden>🇲🇽</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .graduados-prepa-grid {
          display: grid;
          grid-template-columns: minmax(280px, 420px) 1fr;
        }
        @media (max-width: 900px) {
          .graduados-prepa-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

