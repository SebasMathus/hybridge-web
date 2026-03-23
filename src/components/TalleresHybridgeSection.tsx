import React from 'react'

const ACCENT = '#FF2D92'

export type TalleresWorkshop = { icon: string; label: string }

export const DEFAULT_TALLERES_WORKSHOPS: TalleresWorkshop[] = [
  { icon: '🧠', label: 'IA Y TECNOLOGÍA' },
  { icon: '📱', label: 'PRODUCTIVIDAD Y HERRAMIENTAS' },
  { icon: '📈', label: 'NEGOCIOS Y MARKETING' },
  { icon: '📁', label: 'DESARROLLO PROFESIONAL' },
]

export type TalleresHybridgeSectionProps = {
  heading?: string
  subheading?: string
  descriptionBefore?: string
  accentWord1?: string
  descriptionMiddle?: string
  accentWord2?: string
  descriptionAfter?: string
  workshops?: TalleresWorkshop[]
}

/**
 * Talleres Hybridge — sección oscura con cards — reutilizable vía CMS.
 */
export function TalleresHybridgeSection({
  heading = 'TALLERES HYBRIDGE',
  subheading = 'TU HUB DE APRENDIZAJE',
  descriptionBefore = 'Además de tus materias, accede a talleres gratuitos y ',
  accentWord1 = 'exclusivos',
  descriptionMiddle = ' para la comunidad Hybridge. Adquiere ',
  accentWord2 = 'certificaciones',
  descriptionAfter = ' mientras estudias tu carrera.',
  workshops = DEFAULT_TALLERES_WORKSHOPS,
}: TalleresHybridgeSectionProps) {
  if (!workshops.length) return null

  return (
    <section className="hb-talleres section-pad">
      <div className="container-hb">
        <header className="hb-talleres__header">
          <h2 className="hb-talleres__title">{heading}</h2>
          <p className="hb-talleres__subtitle">{subheading}</p>
          <p className="hb-talleres__desc">
            {descriptionBefore}
            <span className="hb-talleres__accent">{accentWord1}</span>
            {descriptionMiddle}
            <span className="hb-talleres__accent">{accentWord2}</span>
            {descriptionAfter}
          </p>
        </header>

        <div className="hb-talleres__grid" role="list">
          {workshops.map((w, idx) => (
            <article key={`${w.label}-${idx}`} className="hb-talleres__card" role="listitem">
              <div className="hb-talleres__iconWrap" aria-hidden>
                <span className="hb-talleres__icon">{w.icon}</span>
              </div>
              <h3 className="hb-talleres__cardTitle">{w.label}</h3>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .hb-talleres {
          background: #000;
          color: #fff;
        }
        .hb-talleres__header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 40px;
        }
        .hb-talleres__title {
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.06em;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          margin: 0 0 8px;
          line-height: 1.15;
        }
        .hb-talleres__subtitle {
          margin: 0 0 18px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
        }
        .hb-talleres__desc {
          margin: 0;
          font-size: clamp(0.95rem, 2vw, 1.05rem);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.88);
        }
        .hb-talleres__accent {
          color: ${ACCENT};
          font-weight: 700;
        }
        .hb-talleres__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          align-items: stretch;
        }
        .hb-talleres__card {
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 16px;
          padding: 28px 16px 24px;
          text-align: center;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04),
            0 12px 40px rgba(0, 0, 0, 0.65),
            0 0 60px rgba(255, 255, 255, 0.04);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .hb-talleres__card:hover {
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow:
            0 0 0 1px rgba(255, 45, 146, 0.15),
            0 16px 48px rgba(0, 0, 0, 0.7),
            0 0 80px rgba(255, 45, 146, 0.08);
        }
        .hb-talleres__iconWrap {
          width: 72px;
          height: 72px;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: #fff;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }
        .hb-talleres__icon {
          font-size: 2rem;
          line-height: 1;
        }
        .hb-talleres__cardTitle {
          margin: 0;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          line-height: 1.35;
          text-transform: uppercase;
          color: #fff;
        }
        @media (max-width: 1024px) {
          .hb-talleres__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 520px) {
          .hb-talleres__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
