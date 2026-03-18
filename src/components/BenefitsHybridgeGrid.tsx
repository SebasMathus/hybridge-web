import React from 'react'
import {
  siApplemusic,
  siApple,
  siAutodesk,
  siFigma,
  siGithub,
  siGithubcopilot,
  siJetbrains,
  siSpotify,
  siYoutube,
} from 'simple-icons/icons'

type Benefit = {
  label: string
  size?: 'sm' | 'md' | 'lg'
  pulse?: 'slow' | 'normal' | 'fast'
}

const BENEFITS: Benefit[] = [
  { label: 'Spotify', size: 'md', pulse: 'normal' },
  { label: 'Apple\nmusic', size: 'sm', pulse: 'slow' },
  { label: 'Apple', size: 'md', pulse: 'fast' },
  { label: 'Bookmate', size: 'sm', pulse: 'normal' },
  { label: 'Microsoft', size: 'md', pulse: 'slow' },
  { label: 'Github\nEducation', size: 'sm', pulse: 'fast' },
  { label: 'Figma\nEducation', size: 'md', pulse: 'normal' },
  { label: 'Copilot', size: 'sm', pulse: 'slow' },
  { label: 'Sixflags', size: 'md', pulse: 'normal' },
  { label: 'Hurricane\nHarbor', size: 'sm', pulse: 'fast' },
  { label: 'Jetbrains', size: 'md', pulse: 'slow' },
  { label: 'Noorns', size: 'sm', pulse: 'normal' },
  { label: 'Youtube', size: 'md', pulse: 'fast' },
  { label: 'Autodesk\nMaya', size: 'sm', pulse: 'slow' },
  { label: 'Tableau', size: 'md', pulse: 'normal' },
  { label: 'Adobe', size: 'sm', pulse: 'fast' },
]

type SimpleIcon = { title: string; hex: string; path: string }

const ICON_BY_LABEL: Record<string, SimpleIcon | undefined> = {
  Spotify: siSpotify,
  'Apple\nmusic': siApplemusic,
  Apple: siApple,
  'Github\nEducation': siGithub,
  'Figma\nEducation': siFigma,
  Copilot: siGithubcopilot,
  Youtube: siYoutube,
  Jetbrains: siJetbrains,
  'Autodesk\nMaya': siAutodesk,
  // Missing in simple-icons (for now): Microsoft, Tableau, Adobe, Sixflags, Bookmate, Noorns, Hurricane Harbor
}

function SimpleIconSvg({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      style={{ color: `#${icon.hex}` }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}

export function BenefitsHybridgeGrid() {
  return (
    <section className="hb-benefits section-pad">
      <div className="container-hb">
        <div className="hb-benefits__header">
          <h2 className="hb-benefits__title">BENEFICIOS HYBRIDGE</h2>
          <p className="hb-benefits__subtitle">
            Ser parte de Hybridge también tiene beneficios. ¡Accede a descuentos exclusivos en plataformas y servicios aliados!
          </p>
        </div>

        <div className="hb-benefits__grid" aria-label="Beneficios Hybridge">
          {BENEFITS.map((b, idx) => (
            <div
              key={`${b.label}-${idx}`}
              className={[
                'hb-benefits__item',
                b.size ? `hb-benefits__item--${b.size}` : '',
                b.pulse ? `hb-benefits__item--pulse-${b.pulse}` : '',
              ].join(' ')}
              style={{ animationDelay: `${(idx % 8) * 120}ms` }}
            >
              <div className="hb-benefits__iconWrap" aria-hidden="true">
                {ICON_BY_LABEL[b.label] ? (
                  <SimpleIconSvg icon={ICON_BY_LABEL[b.label]!} className="hb-benefits__icon" />
                ) : (
                  <SimpleIconSvg icon={siSpotify} className="hb-benefits__icon" />
                )}
              </div>
              <div className="hb-benefits__label">{b.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hb-benefits {
          background: radial-gradient(1200px 500px at 15% 15%, rgba(46, 255, 180, 0.14), transparent 55%),
            radial-gradient(900px 400px at 92% 40%, rgba(76, 161, 255, 0.12), transparent 55%),
            linear-gradient(180deg, #070A0B, #050607);
        }

        .hb-benefits__header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 34px auto;
        }
        .hb-benefits__title {
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #fff;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          margin: 0 0 10px 0;
        }
        .hb-benefits__subtitle {
          color: rgba(255,255,255,0.85);
          margin: 0;
          line-height: 1.55;
          font-size: 1rem;
        }

        .hb-benefits__grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 22px 28px;
          justify-items: center;
          align-items: start;
        }

        .hb-benefits__item {
          width: 100%;
          max-width: 120px;
          text-align: center;
          transform: translateZ(0);
          will-change: transform;
        }

        .hb-benefits__iconWrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          display: grid;
          place-items: center;
          margin: 0 auto 10px auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          backdrop-filter: blur(8px);
        }

        .hb-benefits__icon {
          width: 46px;
          height: 46px;
          display: block;
        }

        .hb-benefits__label {
          color: rgba(255,255,255,0.9);
          font-size: 0.9rem;
          line-height: 1.15;
          white-space: pre-line;
        }

        .hb-benefits__item--sm .hb-benefits__iconWrap { width: 56px; height: 56px; border-radius: 14px; }
        .hb-benefits__item--sm .hb-benefits__icon { width: 40px; height: 40px; }
        .hb-benefits__item--sm { max-width: 110px; }

        .hb-benefits__item--md .hb-benefits__iconWrap { width: 64px; height: 64px; border-radius: 16px; }
        .hb-benefits__item--md .hb-benefits__icon { width: 46px; height: 46px; }

        .hb-benefits__item--lg .hb-benefits__iconWrap { width: 72px; height: 72px; border-radius: 18px; }
        .hb-benefits__item--lg .hb-benefits__icon { width: 52px; height: 52px; }
        .hb-benefits__item--lg { max-width: 132px; }

        @keyframes hbPulse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }
        .hb-benefits__item--pulse-slow { animation: hbPulse 4.6s ease-in-out infinite; }
        .hb-benefits__item--pulse-normal { animation: hbPulse 3.8s ease-in-out infinite; }
        .hb-benefits__item--pulse-fast { animation: hbPulse 3.1s ease-in-out infinite; }

        @media (max-width: 1024px) {
          .hb-benefits__grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
        }
        @media (max-width: 768px) {
          .hb-benefits__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px 18px; }
          .hb-benefits__item { max-width: 100px; }
          .hb-benefits__label { font-size: 0.85rem; }
        }
      `}</style>
    </section>
  )
}

