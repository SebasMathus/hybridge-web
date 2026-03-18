'use client'

import { useMemo } from 'react'
import { getBlockImage, resolveEmojisForSubjects } from '@/lib/utils'

type Props = { block: any; locale: string }

export const CurriculumTableBlock = ({ block }: Props) => {
  const semestersRaw = Array.isArray(block.semesters) ? block.semesters : []
  if (!semestersRaw.length) return null

  const semesters = useMemo(
    () =>
      semestersRaw.map((sem: any) => ({
        ...sem,
        subjects: resolveEmojisForSubjects(sem.subjects || []),
      })),
    [semestersRaw],
  )

  return (
    <section className="section-pad" style={{ background: 'var(--color-hb-bg)' }}>
      <div className="container-hb">
        {block.heading && (
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: 'var(--color-hb-text)', textAlign: 'center', marginBottom: '8px' }}>{block.heading}</h2>
        )}
        {block.subheading && (
          <p style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--color-hb-text)', textAlign: 'center', marginBottom: '8px' }}>{block.subheading}</p>
        )}
        {block.description && (
          <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--color-hb-text)', textAlign: 'center', marginBottom: '40px' }}>{block.description}</p>
        )}

        {/* Carrusel horizontal: todas las tarjetas visibles según ancho, scroll a la derecha */}
        <div
          className="curriculum-cards-scroll"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingBottom: '12px',
            marginLeft: '-24px',
            marginRight: '-24px',
            paddingLeft: '24px',
            paddingRight: '24px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {semesters.map((sem: any, i: number) => (
            <div
              key={i}
              style={{
                flex: '0 0 auto',
                minWidth: '280px',
                maxWidth: '320px',
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid var(--color-hb-border)',
                padding: '20px 18px 16px',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  color: 'var(--color-hb-text)',
                  marginBottom: '12px',
                }}
              >
                {sem.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {(sem.subjects || []).map((subj: any, j: number) => {
                  const iconSrc = getBlockImage(subj.icon, subj.iconUrl)
                  return (
                    <div
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 0',
                        borderBottom: '1px solid rgba(229, 231, 235, 0.9)',
                      }}
                    >
                      {iconSrc ? (
                        <img src={iconSrc} alt="" style={{ width: '26px', height: '26px', objectFit: 'contain', borderRadius: '50%' }} />
                      ) : (
                        <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{subj.emoji}</span>
                      )}
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-hb-text)', fontWeight: 400 }}>{subj.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .curriculum-cards-scroll::-webkit-scrollbar { height: 6px; }
        .curriculum-cards-scroll::-webkit-scrollbar-track { background: var(--color-hb-bg-alt); border-radius: 3px; }
        .curriculum-cards-scroll::-webkit-scrollbar-thumb { background: var(--color-hb-border); border-radius: 3px; }
        @media (max-width: 768px) {
          .curriculum-cards-scroll { margin-left: -16px; margin-right: -16px; padding-left: 16px; padding-right: 16px; }
          .curriculum-cards-scroll > div { min-width: 260px; max-width: 280px; }
        }
      `}</style>
    </section>
  )
}
