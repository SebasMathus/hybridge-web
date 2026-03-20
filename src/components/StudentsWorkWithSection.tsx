import React from 'react'
import { getBlockImage } from '@/lib/utils'

type StudentsWorkWithLogo = {
  name?: string
  image?: any
  imageUrl?: string | null
}

type StudentsWorkWithData = {
  heading?: string
  logos?: StudentsWorkWithLogo[]
}

export function StudentsWorkWithSection({ data }: { data: StudentsWorkWithData | null | undefined }) {
  const heading = data?.heading || ''
  const logos = data?.logos || []
  if (!logos.length) return null

  const doubled = [...logos, ...logos]

  return (
    <section style={{ padding: '40px 0', borderBottom: '1px solid var(--color-hb-border)', overflow: 'hidden' }}>
      {heading && (
        <h3
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--color-hb-text)',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {heading}
        </h3>
      )}
      <div className="logos-track" style={{ gap: '48px', alignItems: 'center' }}>
        {doubled.map((l: any, i: number) => {
          const src = getBlockImage(l.image, l.imageUrl)
          return src ? (
            <img
              key={i}
              src={src}
              alt={l.name || ''}
              style={{ height: '28px', width: 'auto', opacity: 0.5, flexShrink: 0 }}
            />
          ) : null
        })}
      </div>
    </section>
  )
}

