'use client'

import type { Swiper as SwiperInstance } from 'swiper'
import Link from 'next/link'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export type BlogHeroSlide = {
  title: string
  imageUrl: string
  href: string
}

type Props = { slides: BlogHeroSlide[]; readMoreLabel: string }

export function BlogHeroCarousel({ slides, readMoreLabel }: Props) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  if (!slides.length) return null

  const arrowBtnBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '48px',
    height: '48px',
    borderRadius: '9999px',
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid rgba(255,255,255,0.12)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 10,
    cursor: 'pointer',
    color: '#fff',
  }

  return (
    <div style={{ position: 'relative' }}>
      <button type="button" aria-label="Anterior" onClick={() => swiperRef.current?.slidePrev()} style={{ ...arrowBtnBase, left: '16px' }}>
        <span aria-hidden style={{ fontSize: '28px', lineHeight: 1 }}>&lt;</span>
      </button>
      <button type="button" aria-label="Siguiente" onClick={() => swiperRef.current?.slideNext()} style={{ ...arrowBtnBase, right: '16px' }}>
        <span aria-hidden style={{ fontSize: '28px', lineHeight: 1 }}>&gt;</span>
      </button>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={slides.length > 1}
        onSwiper={(s) => {
          swiperRef.current = s
        }}
        style={{ width: '100%', height: 'min(70vh, 560px)', minHeight: '380px' }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {slide.imageUrl ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${slide.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ) : null}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.2) 100%)',
                }}
              />
              <div className="container-hb" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '48px', zIndex: 2 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 3.5vw, 2.1rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, maxWidth: '720px', marginBottom: '16px' }}>
                  {slide.title}
                </h2>
                <Link
                  href={slide.href}
                  style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    background: 'var(--color-hb-yellow)',
                    color: 'var(--color-hb-text)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    padding: '12px 24px',
                    borderRadius: '8px',
                  }}
                >
                  {readMoreLabel}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
