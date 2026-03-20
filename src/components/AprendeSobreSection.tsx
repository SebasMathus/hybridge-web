import React from 'react'
import {
  siJavascript,
  siPython,
  siGooglecloud,
  siCloudflare,
  siReact,
  siFigma,
} from 'simple-icons/icons'

type LearnChip = { label: string }
type SkillIcon = { label: string; color: string; path: string }
type AprendeSobreIconKey = 'javascript' | 'python' | 'googlecloud' | 'cloudflare' | 'figma' | 'react'

type AprendeSobreSkillEntry = {
  iconKey: AprendeSobreIconKey
  opacity?: number
  size?: number
}

function getSimpleIcon(icon: any): SkillIcon {
  // simple-icons exports { title, hex, path } objects
  return { label: icon.title, color: icon.hex, path: icon.path }
}

function SimpleIconSvg({ icon, size, opacity }: { icon: SkillIcon; size?: number; opacity?: number }) {
  const s = size ?? 28
  const op = opacity ?? 0.55
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.label}
      style={{
        width: s,
        height: s,
        color: `#${icon.color}`,
        display: 'block',
        opacity: op,
        flexShrink: 0,
      }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}

const iconKeyToSimpleIcon: Record<AprendeSobreIconKey, any> = {
  javascript: siJavascript,
  python: siPython,
  googlecloud: siGooglecloud,
  cloudflare: siCloudflare,
  figma: siFigma,
  react: siReact,
}

const defaultChips: LearnChip[] = [
  { label: 'Programación' },
  { label: 'Negocios' },
  { label: 'UI / UX' },
  { label: 'Inteligencia Artificial' },
  { label: 'Desarrollo' },
  { label: 'Datos' },
]

const defaultSkills: AprendeSobreSkillEntry[] = [
  { iconKey: 'javascript' },
  { iconKey: 'python' },
  { iconKey: 'googlecloud' },
  { iconKey: 'cloudflare' },
  { iconKey: 'figma' },
  { iconKey: 'react' },
]

export function AprendeSobreSection(props: { chips?: LearnChip[]; skills?: AprendeSobreSkillEntry[] }) {
  const chips = props.chips?.length ? props.chips : defaultChips
  const skills = props.skills?.length ? props.skills : defaultSkills
  return (
    <div>
      <AprendeSobreChipsSection chips={chips} />
      <AprendeSobreSkillsSection skills={skills} />
    </div>
  )
}

function AprendeSobreChipsSection({ chips }: { chips?: LearnChip[] }) {
  const safeChips = chips?.length ? chips : defaultChips
  return (
    <section
      className="aprende-hb"
      aria-label="Aprende sobre"
      style={{
        padding: '60px 0',
        background:
          'radial-gradient(1000px 500px at 0% 0%, rgba(48,77,109,0.22), transparent 55%), radial-gradient(900px 450px at 100% 35%, rgba(226,248,151,0.10), transparent 60%), linear-gradient(180deg, #0B0F16 0%, #070A0B 100%)',
        color: '#fff',
      }}
    >
      <div className="container-hb">
        <div className="aprende-hb__header">
          <div className="aprende-hb__title">APRENDE SOBRE</div>
        </div>

        <div className="aprende-hb__marquee" aria-label="Aprende sobre carrusel continuo">
          <div className="logos-track aprende-hb__marqueeTrack--chips" style={{ gap: 18 }}>
            {[...safeChips, ...safeChips].map((c, idx) => (
              <div key={`${c.label}-${idx}`} className="aprende-hb__chip">
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .aprende-hb__header{
          margin-bottom: 28px;
          text-align: center;
        }
        .aprende-hb__title{
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.92);
          text-align: center;
        }
        .aprende-hb__marquee{
          width: 100%;
          overflow: hidden;
          padding: 0 4px;
          margin: 6px 0 0 0;
        }
        .aprende-hb__marquee:hover .aprende-hb__marqueeTrack--chips{
          animation-play-state: paused;
        }
        .aprende-hb__chip{
          border-radius: 9999px;
          padding: 12px 20px;
          border: 1px solid rgba(141, 200, 255, 0.35);
          background: rgba(255,255,255,0.02);
          color: rgba(255,255,255,0.95);
          font-weight: 800;
          font-size: 0.9rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          backdrop-filter: blur(10px);
          white-space: nowrap;
        }
        .aprende-hb__divider{
          margin: 30px 0 28px 0;
          border-bottom: 1px dashed rgba(255,255,255,0.28);
        }
      `}</style>
    </section>
  )
}

function AprendeSobreSkillsSection({ skills }: { skills?: AprendeSobreSkillEntry[] }) {
  const safeSkills = skills?.length ? skills : defaultSkills

  const skillsMarqueeBase = safeSkills
    .map((entry) => {
      const simpleIcon = iconKeyToSimpleIcon[entry.iconKey]
      if (!simpleIcon) return null
      const icon = getSimpleIcon(simpleIcon)
      return {
        icon,
        size: entry.size ?? 28,
        opacity: entry.opacity ?? 0.5,
      }
    })
    .filter(Boolean) as Array<{ icon: SkillIcon; size: number; opacity: number }>

  if (!skillsMarqueeBase.length) return null

  // scroll-left en globals.css usa translateX(-50%): hace falta DOS mitades idénticas.
  // Repetimos el set base varias veces dentro de cada mitad para un loop largo y sin saltos.
  const halfStrip = [...skillsMarqueeBase, ...skillsMarqueeBase, ...skillsMarqueeBase]
  const skillsTrackItems = [...halfStrip, ...halfStrip]

  return (
    <section
      className="aprende-hb"
      aria-label="Skills"
      style={{
        padding: '60px 0',
        background:
          'radial-gradient(1000px 500px at 0% 0%, rgba(48,77,109,0.22), transparent 55%), radial-gradient(900px 450px at 100% 35%, rgba(226,248,151,0.10), transparent 60%), linear-gradient(180deg, #0B0F16 0%, #070A0B 100%)',
        color: '#fff',
      }}
    >
      <div className="container-hb">
        <div className="aprende-hb__skills">
          <h3 className="aprende-hb__skillsLabel">SKILLS</h3>
          {/* overflow solo en la fila del carrusel para no recortar el título */}
          <div className="aprende-hb__skillsMarqueeWrap">
            <div
              className="logos-track aprende-hb__marqueeTrack--skills"
              aria-label="Skills carrusel continuo"
              style={{ gap: '48px', alignItems: 'center', width: 'max-content', minWidth: 'max-content' }}
            >
              {skillsTrackItems.map(({ icon, size, opacity }, idx) => (
                <SimpleIconSvg key={`skill-marquee-${idx}`} icon={icon} size={size} opacity={opacity} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .aprende-hb__skills{
          display: grid;
          grid-template-columns: 1fr;
          justify-items: center;
          gap: 14px;
          min-width: 0;
          width: 100%;
        }
        .aprende-hb__skillsMarqueeWrap{
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow: hidden;
        }
        .aprende-hb__marqueeTrack--skills{
          flex-shrink: 0;
          animation-duration: 48s;
        }
        .aprende-hb__skillsLabel{
          width: 100%;
          margin: 0;
          text-align: center;
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 0.92rem;
          color: rgba(255,255,255,0.90);
          position: relative;
          z-index: 1;
        }
        /* Skills: sin wrapper extra para que el loop sea continuo */
      `}</style>
    </section>
  )
}

export { AprendeSobreChipsSection, AprendeSobreSkillsSection }

