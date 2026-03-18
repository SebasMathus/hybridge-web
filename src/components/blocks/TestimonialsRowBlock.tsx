'use client'

import { useState } from 'react'
import { getBlockImage, getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/utils'

type Props = { block: any; locale: string }

export const TestimonialsRowBlock = ({ block }: Props) => {
  const items = block.testimonials || []
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  if (!items.length) return null
  const bg = block.backgroundColor === 'cream' ? 'var(--color-hb-bg-alt)' : 'var(--color-hb-bg)'

  return (
    <section className="section-pad" style={{ background: bg }}>
      <div className="container-hb">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          {block.eyebrow && <p style={{ color: 'var(--color-hb-text)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>{block.eyebrow}</p>}
          {block.heading && (
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 900, maxWidth: '650px', margin: '0 auto', color: 'var(--color-hb-text)' }}>{block.heading}</h2>
          )}
        </div>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
          {items.map((t: any, i: number) => {
            const imgSrc = getBlockImage(t.image, t.imageUrl) || getYouTubeThumbnail(t.videoUrl)
            const hasVideo = t.videoUrl && getYouTubeEmbedUrl(t.videoUrl)
            const isPlaying = playingIndex === i
            const embedUrl = isPlaying && hasVideo ? getYouTubeEmbedUrl(t.videoUrl, true) : ''

            return (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: '200px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '9/16',
                  background: '#000',
                  position: 'relative',
                }}
              >
                {isPlaying ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setPlayingIndex(null)}
                      aria-label="Cerrar video"
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        zIndex: 10,
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        lineHeight: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      ×
                    </button>
                    <iframe
                      src={embedUrl}
                      title={`Video: ${t.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => hasVideo && setPlayingIndex(i)}
                    style={{
                      width: '100%',
                      height: '100%',
                      padding: 0,
                      border: 'none',
                      background: '#e5e7eb',
                      cursor: hasVideo ? 'pointer' : 'default',
                      position: 'relative',
                      display: 'block',
                      textAlign: 'left',
                    }}
                  >
                    {imgSrc && <img src={imgSrc} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.15)' }}>
                      {hasVideo && (
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid #000', marginLeft: '3px' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{t.name}</p>
                    </div>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
