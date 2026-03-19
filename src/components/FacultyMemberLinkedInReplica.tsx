import React from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/utils'

export type ProgramKey = 'preparatoria' | 'ingenieria-en-software'

export type FacultyMemberLinkedInReplicaMember = {
  name: string
  specialization: string
  avatarUrl?: string
  workplaceLogoUrl?: string
  linkedInUrl?: string
  formation?: string
  description?: string
  hobbies?: string[]
  programs?: ProgramKey[]
}

function formatSpecialization(spec: string) {
  const trimmed = (spec || '').trim()
  if (!trimmed) return 'Especialista por confirmar'

  // Evita duplicar "Especialista" si ya viene en el texto.
  if (/^Especialista\b/i.test(trimmed)) return trimmed
  return `Especialista ${trimmed}`
}

function programMeta(program: ProgramKey): { label: string; href: string } {
  switch (program) {
    case 'preparatoria':
      return { label: 'Prepa en Línea', href: '/preparatoria' }
    case 'ingenieria-en-software':
      return { label: 'Ingeniería en Software', href: '/ingenieria-en-software' }
    default:
      return { label: program, href: '/' }
  }
}

export function FacultyMemberLinkedInReplica({
  member,
  locale,
}: {
  member: FacultyMemberLinkedInReplicaMember
  locale: Locale
}) {
  const avatarUrl = member.avatarUrl || '/Logo_blanco.png'
  const workplaceLogoUrl = member.workplaceLogoUrl || '/Logo_blanco.png'
  const hobbies = Array.isArray(member.hobbies) ? member.hobbies : []
  const programs = Array.isArray(member.programs) ? member.programs : []

  const formationText = member.formation || 'Formación por definir'
  const descriptionText =
    member.description ||
    'En Hybridge Education acompaño a los estudiantes con una guía práctica y seguimiento cercano para que avancen con confianza en su proceso de aprendizaje.'

  const specializationText = formatSpecialization(member.specialization)
  const linkedHref = member.linkedInUrl || '#'

  return (
    <section className="section-pad hb-li-replica" style={{ background: 'transparent', paddingTop: 10 }}>
      <div className="hb-li-replica__wrap">
        <div className="hb-li-replica__cover" aria-hidden="true">
          <img className="hb-li-replica__coverLogo" src="/Logo_blanco.png" alt="" />

          <div className="hb-li-replica__avatarWrap">
            <img className="hb-li-replica__avatar" src={avatarUrl} alt={member.name} />
          </div>
        </div>

        <div className="hb-li-replica__mainCard">
          <div className="hb-li-replica__topRow">
            <div className="hb-li-replica__left">
              <h1 className="hb-li-replica__name">{member.name}</h1>
              <div className="hb-li-replica__specialization">{specializationText}</div>
            </div>

            <div className="hb-li-replica__right">
              <div className="hb-li-replica__formationLabel">Formación</div>
              <div className="hb-li-replica__formationText">
                <span aria-hidden="true">🎓</span> {formationText}
              </div>
            </div>
          </div>

          <div className="hb-li-replica__actionsRow">
            <Link
              className="hb-li-replica__btnPrimary"
              href={linkedHref}
              target="_blank"
              rel="noreferrer"
              prefetch={false}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 8 }}>
                <path d="M3 3h18v18H3V3zm4.85 14.2V10.7H5.95v6.5h1.9zM6.9 9.5c.66 0 1.2-.54 1.2-1.2S7.56 7.1 6.9 7.1c-.67 0-1.2.54-1.2 1.2s.53 1.2 1.2 1.2zM18.1 13.2c0-1.33-.71-2.3-2.05-2.3-.95 0-1.56.52-1.83 1v-.85h-1.9v6.5h1.9v-3.5c0-.92.35-1.4 1.05-1.4.68 0 1 .48 1 1.4v3.5h1.83v-3.9z" />
              </svg>
              Visitar LinkedIn
            </Link>
          </div>

          <div className="hb-li-replica__card">
            <div className="hb-li-replica__cardTitle">Acerca de</div>
            <div className="hb-li-replica__aboutText">{descriptionText}</div>
          </div>

          {hobbies.length ? (
            <div className="hb-li-replica__card">
              <div className="hb-li-replica__cardTitle">Hobbies</div>
              <ul className="hb-li-replica__hobbies">
                {hobbies.map((h, i) => (
                  <li key={`${h}-${i}`}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {programs.length ? (
            <div className="hb-li-replica__card">
              <div className="hb-li-replica__cardTitle">Programas relacionados</div>
              <div className="hb-li-replica__programs">
                {programs.map((p) => {
                  const meta = programMeta(p)
                  const href = `/${locale}${meta.href}`
                  return (
                    <Link key={p} className="hb-li-replica__programLink" href={href} prefetch={false}>
                      {meta.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style>{`
        .hb-li-replica__wrap{
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          position: relative;
        }

        .hb-li-replica__cover{
          height: 150px;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
          background: radial-gradient(1200px 500px at 15% 15%, rgba(46, 255, 180, 0.14), transparent 55%),
            radial-gradient(900px 400px at 92% 40%, rgba(76, 161, 255, 0.12), transparent 55%),
            linear-gradient(180deg, #070A0B, #050607);
          position: relative;
          overflow: visible; /* Important: keeps avatar above main container */
        }

        .hb-li-replica__coverLogo{
          height: 28px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.95;
          z-index: 3;
        }

        .hb-li-replica__avatarWrap{
          width: 108px;
          height: 108px;
          border-radius: 999px;
          overflow: hidden;
          position: absolute;
          left: 22px;
          bottom: -54px;
          border: 4px solid #fff;
          background: #fff;
          z-index: 5;
        }

        .hb-li-replica__avatar{
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hb-li-replica__mainCard{
          background: #fff;
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 78px 18px 18px;
        }

        .hb-li-replica__topRow{
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 18px;
          align-items: start;
        }

        .hb-li-replica__name{
          margin: 0;
          font-size: 28px;
          line-height: 1.1;
          font-weight: 900;
          font-family: var(--font-display);
          color: #111;
        }

        .hb-li-replica__specialization{
          margin-top: 3px;
          color: #111;
          font-weight: 500;
          font-size: 14px;
        }

        .hb-li-replica__formationLabel{
          margin-top: 22px;
          color: #111;
          font-size: 13px;
          font-weight: 900;
        }

        .hb-li-replica__formationText{
          margin-top: 6px;
          color: #111;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.25;
        }

        .hb-li-replica__actionsRow{
          margin-top: 8px;
        }

        .hb-li-replica__btnPrimary{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #1b6fdc;
          color: #fff;
          text-decoration: none;
          padding: 10px 16px;
          border-radius: 999px;
          font-weight: 900;
        }

        .hb-li-replica__card{
          margin-top: 16px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.08);
          padding: 16px 18px;
        }

        .hb-li-replica__cardTitle{
          font-weight: 900;
          color: #111;
          font-size: 16px;
        }

        .hb-li-replica__aboutText{
          margin-top: 10px;
          color: #111;
          line-height: 1.7;
          font-size: 13px;
          white-space: pre-line;
        }

        .hb-li-replica__hobbies{
          margin: 10px 0 0;
          padding-left: 18px;
          color: #111;
          line-height: 1.8;
          font-size: 13px;
          list-style: disc;
        }

        .hb-li-replica__programs{
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hb-li-replica__programLink{
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.08);
          padding: 8px 12px;
          border-radius: 999px;
          text-decoration: none;
          color: rgba(0,0,0,0.75);
          font-weight: 800;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .hb-li-replica__topRow{ grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

