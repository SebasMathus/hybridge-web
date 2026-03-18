'use client'

import { useState } from 'react'
import { getBlockImage } from '@/lib/utils'

type Props = { block: any; locale: string }

export const CurriculumTableBlock = ({ block }: Props) => {
  const semesters = block.semesters || []
  const [openIdx, setOpenIdx] = useState<number>(0)
  if (!semesters.length) return null

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {semesters.map((sem: any, i: number) => {
            const isOpen = openIdx === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  style={{
                    width: '100%', padding: '16px 20px', background: isOpen ? '#0D0D0D' : 'var(--color-hb-bg-alt)',
                    color: isOpen ? '#fff' : 'var(--color-hb-text)', border: '1px solid var(--color-hb-border)',
                    borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: '0.95rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  {sem.title}
                  <span style={{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>&#9662;</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px', marginTop: '4px' }}>
                    {(sem.subjects || []).map((subj: any, j: number) => {
                      const iconSrc = getBlockImage(subj.icon, subj.iconUrl)
                      return (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--color-hb-bg-alt)', borderRadius: '8px', border: '1px solid var(--color-hb-border)' }}>
                          {iconSrc && <img src={iconSrc} alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />}
                          <span style={{ fontSize: '0.85rem', color: 'var(--color-hb-text)', fontWeight: 400 }}>{subj.name}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
