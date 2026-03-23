import React from 'react'

/** Mismo fondo que `BenefitsHybridgeGrid` (.hb-benefits). */
const HB_BENEFITS_LIKE_BACKGROUND = {
  background: `radial-gradient(1200px 500px at 15% 15%, rgba(46, 255, 180, 0.14), transparent 55%),
    radial-gradient(900px 400px at 92% 40%, rgba(76, 161, 255, 0.12), transparent 55%),
    linear-gradient(180deg, #070A0B, #050607)`,
} as const

export const DEFAULT_INDUSTRY_LEADERS = {
  eyebrow: 'APRENDE DE LA MANO DE',
  heading: 'LÍDERES DE LA INDUSTRIA',
  body: 'Con nosotros colaboran expertos de empresas como Amazon, Nu, Cinépolis, Fintual, Scotiabank, Strata Analytics, Deloitte, Buk, Peñafiel, Bank of America, TikTok, Banamex y más. ¡Aprende de ellos!',
}

export type IndustryLeadersSectionProps = {
  eyebrow?: string
  heading?: string
  body?: string
}

/**
 * Texto centrado sobre colaboración con la industria — reutilizable vía CMS.
 */
export function IndustryLeadersSection({
  eyebrow = DEFAULT_INDUSTRY_LEADERS.eyebrow,
  heading = DEFAULT_INDUSTRY_LEADERS.heading,
  body = DEFAULT_INDUSTRY_LEADERS.body,
}: IndustryLeadersSectionProps) {
  return (
    <section className="hb-industry-leaders section-pad" style={HB_BENEFITS_LIKE_BACKGROUND}>
      <div className="container-hb">
        <div className="hb-industry-leaders__inner">
          <p className="hb-industry-leaders__eyebrow">{eyebrow}</p>
          <h2 className="hb-industry-leaders__title">{heading}</h2>
          <p className="hb-industry-leaders__body">{body}</p>
        </div>
      </div>

      <style>{`
        .hb-industry-leaders__inner {
          text-align: center;
          max-width: 920px;
          margin: 0 auto;
        }
        .hb-industry-leaders__eyebrow {
          margin: 0 0 10px 0;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
        }
        .hb-industry-leaders__title {
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #fff;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          margin: 0 0 20px 0;
          line-height: 1.15;
        }
        .hb-industry-leaders__body {
          margin: 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: clamp(1rem, 2.2vw, 1.12rem);
          line-height: 1.65;
        }
      `}</style>
    </section>
  )
}
