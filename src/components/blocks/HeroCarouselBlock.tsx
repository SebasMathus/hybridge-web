'use client'

import type { Swiper as SwiperInstance } from 'swiper'
import Link from 'next/link'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { getBlockImage, btnStyles } from '@/lib/utils'

type Props = { block: any; locale: string }

export const HeroCarouselBlock = ({ block, locale }: Props) => {
  const slides = block.slides || []
  if (!slides.length) return null
  const swiperRef = useRef<SwiperInstance | null>(null)

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
      <button
        type="button"
        aria-label="Carrusel anterior"
        onClick={() => swiperRef.current?.slidePrev()}
        style={{ ...arrowBtnBase, left: '16px' }}
      >
        <span aria-hidden="true" style={{ fontSize: '28px', lineHeight: 1, transform: 'translateX(-1px)' }}>
          &lt;
        </span>
      </button>

      <button
        type="button"
        aria-label="Carrusel siguiente"
        onClick={() => swiperRef.current?.slideNext()}
        style={{ ...arrowBtnBase, right: '16px' }}
      >
        <span aria-hidden="true" style={{ fontSize: '28px', lineHeight: 1, transform: 'translateX(1px)' }}>
          &gt;
        </span>
      </button>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        style={{ width: '100%', height: '85vh', minHeight: '500px', maxHeight: '800px' }}
      >
        {slides.map((slide: any, i: number) => {
          const imgSrc = getBlockImage(slide.image, slide.imageUrl)
          return (
            <SwiperSlide key={i}>
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                {imgSrc && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)' }} />
                <div className="container-hb" style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ maxWidth: '550px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: '4px' }}>{slide.line1}</h2>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: '16px' }}>{slide.line2}</h2>
                    {slide.description && <p style={{ fontSize: '1rem', fontWeight: 400, color: '#fff', marginBottom: '24px', lineHeight: 1.6, maxWidth: '450px' }}>{slide.description}</p>}
                    <Link href={slide.ctaUrl?.startsWith('/') ? `/${locale}${slide.ctaUrl}` : (slide.ctaUrl || '#')} data-track-id={slide.ctaTrackId || ''} style={btnStyles.primary}>{slide.ctaLabel || 'Inscríbete ya'}</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <style>{`
        @media (max-width: 768px) {
          button[aria-label="Carrusel anterior"] { left: 10px !important; width: 42px !important; height: 42px !important; }
          button[aria-label="Carrusel siguiente"] { right: 10px !important; width: 42px !important; height: 42px !important; }
        }
      `}</style>
    </div>
  )
}
