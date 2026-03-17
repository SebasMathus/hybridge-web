'use client'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { getBlockImage, btnStyles } from '@/lib/utils'

type Props = { block: any; locale: string }

export const HeroCarouselBlock = ({ block }: Props) => {
  const slides = block.slides || []
  if (!slides.length) return null

  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
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
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '4px' }}>{slide.line1}</h2>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#E2F897', marginBottom: '16px' }}>{slide.line2}</h2>
                  {slide.description && <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '24px', lineHeight: 1.6, maxWidth: '450px' }}>{slide.description}</p>}
                  <Link href={slide.ctaUrl || '#'} data-track-id={slide.ctaTrackId || ''} style={btnStyles.primary}>{slide.ctaLabel || 'Inscríbete ya'}</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
