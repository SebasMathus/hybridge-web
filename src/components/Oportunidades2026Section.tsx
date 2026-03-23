import React from 'react'

export type OportunidadItem = { icon: string; label: string }

export const DEFAULT_OPORTUNIDADES_ITEMS: OportunidadItem[] = [
  { icon: '👩‍💼', label: 'Prácticas profesionales e Internships' },
  { icon: '📁', label: 'Mentorías y talleres especializados' },
  { icon: '🎙️', label: 'Webinars y pláticas' },
  { icon: '🤝', label: 'Vinculación laboral' },
]

export type Oportunidades2026SectionProps = {
  eyebrow?: string
  heading?: string
  items?: OportunidadItem[]
}

/**
 * Grid de oportunidades — reutilizable vía CMS en varias páginas.
 */
export function Oportunidades2026Section({
  eyebrow = 'MUCHO MÁS QUE SOLO ESTUDIAR',
  heading = 'OPORTUNIDADES 2026',
  items = DEFAULT_OPORTUNIDADES_ITEMS,
}: Oportunidades2026SectionProps) {
  if (!items.length) return null

  return (
    <section className="hb-oportunidades section-pad">
      <div className="container-hb">
        <header className="hb-oportunidades__header">
          <p className="hb-oportunidades__eyebrow">{eyebrow}</p>
          <h2 className="hb-oportunidades__title">{heading}</h2>
        </header>

        <div className="hb-oportunidades__grid" role="list">
          {items.map((item, idx) => (
            <article key={`${item.label}-${idx}`} className="hb-oportunidades__card" role="listitem">
              <span className="hb-oportunidades__icon" aria-hidden>
                {item.icon}
              </span>
              <span className="hb-oportunidades__divider" aria-hidden />
              <p className="hb-oportunidades__label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .hb-oportunidades {
          background: #000;
          color: #fff;
        }
        .hb-oportunidades__header {
          text-align: center;
          margin: 0 auto 28px;
          max-width: 760px;
        }
        .hb-oportunidades__eyebrow {
          margin: 0 0 10px;
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          font-weight: 500;
        }
        .hb-oportunidades__title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 2.85rem);
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .hb-oportunidades__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px 18px;
        }
        .hb-oportunidades__card {
          min-height: 108px;
          border-radius: 14px;
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04),
            0 0 26px rgba(175, 222, 255, 0.15),
            inset 0 0 16px rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 18px 22px;
        }
        .hb-oportunidades__icon {
          font-size: 1.75rem;
          line-height: 1;
          flex: 0 0 auto;
          width: 34px;
          text-align: center;
        }
        .hb-oportunidades__divider {
          width: 1px;
          align-self: stretch;
          background: rgba(255, 255, 255, 0.36);
          flex: 0 0 auto;
        }
        .hb-oportunidades__label {
          margin: 0;
          font-size: clamp(1rem, 2.1vw, 1.05rem);
          line-height: 1.35;
          color: #fff;
          max-width: 30ch;
        }
        @media (max-width: 860px) {
          .hb-oportunidades__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
