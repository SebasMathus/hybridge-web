import React from 'react'

const LIVE_DOT = '#2EE6A0'

export type ModeloEducativoPillar = {
  icon: string
  title: string
  subtitle: string
  description: string
  showLiveDot?: boolean
}

export const DEFAULT_MODELO_EDUCATIVO_PILLARS: ModeloEducativoPillar[] = [
  {
    icon: '📱',
    title: 'Material',
    subtitle: 'asíncrono',
    description: 'La mejor experiencia de aprendizaje en la plataforma de Hybridge',
    showLiveDot: false,
  },
  {
    icon: '💻',
    title: 'Clases',
    subtitle: 'en vivo',
    description: 'Sesiones en zoom impartidas por expertos de la industria',
    showLiveDot: true,
  },
  {
    icon: '👩‍🏫',
    title: 'Tutorías',
    subtitle: 'Personalizadas 1 a 1',
    description: 'Sesiones en zoom para resolver dudas',
    showLiveDot: false,
  },
]

export type ModeloEducativoSectionProps = {
  sectionTitle?: string
  subtitle?: string
  pillars?: ModeloEducativoPillar[]
}

/**
 * Modelo educativo — reutilizable (Preparatoria, Ingeniería, otras páginas vía CMS).
 */
export function ModeloEducativoSection({
  sectionTitle = 'MODELO EDUCATIVO',
  subtitle = 'Educación en línea de calidad, aprende con:',
  pillars = DEFAULT_MODELO_EDUCATIVO_PILLARS,
}: ModeloEducativoSectionProps) {
  if (!pillars.length) return null

  return (
    <section className="hb-modelo section-pad">
      <div className="container-hb">
        <header className="hb-modelo__header">
          <h2 className="hb-modelo__title">{sectionTitle}</h2>
          <p className="hb-modelo__subtitle">{subtitle}</p>
        </header>

        <div className="hb-modelo__circles" role="list">
          {pillars.map((p, i) => (
            <article
              key={`${p.title}-${i}`}
              className={`hb-modelo__circle hb-modelo__circle--${i}`}
              role="listitem"
              style={{ zIndex: i === 1 ? 3 : i === 0 ? 1 : 2 }}
            >
              <div className="hb-modelo__iconWrap" aria-hidden>
                <span className="hb-modelo__icon">{p.icon}</span>
              </div>
              <h3 className="hb-modelo__circleTitle">
                {p.title}
                {p.showLiveDot ? (
                  <span className="hb-modelo__liveDot" title="En vivo" aria-hidden>
                    <span className="hb-modelo__liveDotInner" />
                  </span>
                ) : null}
              </h3>
              <p className="hb-modelo__circleSubtitle">{p.subtitle}</p>
              <p className="hb-modelo__circleBody">{p.description}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .hb-modelo {
          background: #0a0a0a;
          color: #fff;
          overflow: hidden;
        }
        .hb-modelo__header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 12px;
        }
        .hb-modelo__title {
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.08em;
          font-size: clamp(1.35rem, 2.8vw, 2rem);
          margin: 0 0 10px;
        }
        .hb-modelo__subtitle {
          margin: 0;
          font-size: clamp(0.95rem, 2vw, 1.08rem);
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.45;
        }
        .hb-modelo__circles {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: stretch;
          flex-wrap: nowrap;
          margin-top: 28px;
          padding: 8px 0 24px;
          gap: 0;
        }
        .hb-modelo__circle {
          flex: 0 0 clamp(220px, 26vw, 280px);
          width: clamp(220px, 26vw, 280px);
          max-width: 92vw;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #000;
          border: 2px dashed rgba(255, 255, 255, 0.45);
          box-sizing: border-box;
          padding: clamp(18px, 3vw, 28px) clamp(14px, 2.5vw, 22px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-left: clamp(-52px, -8vw, -36px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }
        .hb-modelo__circle--0 {
          margin-left: 0;
        }
        .hb-modelo__iconWrap {
          margin-bottom: 10px;
        }
        .hb-modelo__icon {
          font-size: clamp(2rem, 5vw, 2.75rem);
          line-height: 1;
          display: block;
        }
        .hb-modelo__circleTitle {
          margin: 0 0 4px;
          font-size: clamp(1rem, 2.2vw, 1.15rem);
          font-weight: 800;
          letter-spacing: 0.02em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .hb-modelo__liveDot {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 10px;
          height: 10px;
          flex-shrink: 0;
        }
        .hb-modelo__liveDotInner {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${LIVE_DOT};
          box-shadow: 0 0 10px ${LIVE_DOT};
        }
        .hb-modelo__circleSubtitle {
          margin: 0 0 10px;
          font-size: clamp(0.78rem, 1.6vw, 0.88rem);
          color: rgba(255, 255, 255, 0.82);
          font-weight: 500;
        }
        .hb-modelo__circleBody {
          margin: 0;
          font-size: clamp(0.72rem, 1.5vw, 0.82rem);
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.88);
          max-width: 18ch;
        }
        @media (max-width: 768px) {
          .hb-modelo__circles {
            flex-direction: column;
            align-items: center;
            padding-bottom: 8px;
          }
          .hb-modelo__circle {
            margin-left: 0 !important;
            margin-top: -18px;
            width: min(300px, 88vw);
            flex: 0 0 auto;
          }
          .hb-modelo__circle--0 {
            margin-top: 0;
          }
          .hb-modelo__circleBody {
            max-width: 24ch;
          }
        }
      `}</style>
    </section>
  )
}
