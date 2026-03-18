'use client'

import Link from 'next/link'
import type { Locale } from '@/lib/utils'
import { getMediaUrl } from '@/lib/utils'

type Props = { data: any; locale: Locale }

const defaultCols: Record<string, any[]> = {
  es: [
    { title: 'Enlaces de interés', links: [{ label: 'Blog', url: '/blog/' }, { label: 'Eventos', url: '/eventos-hybridge/' }, { label: 'Tecnología Educativa', url: '/tecnologia-educativa/' }] },
    { title: 'Programas', links: [{ label: 'Preparatoria', url: '/preparatoria/' }, { label: 'Ingeniería en Software', url: '/ingenieria-en-software/' }, { label: 'Lic. en Administración e Innovación', url: '/licenciatura-en-administracion-e-innovacion/' }, { label: 'Ingeniería en Inteligencia Artificial', url: '/ingenieria-en-inteligencia-artificial/' }, { label: 'Lic. en Mercadotecnia y Negocios Digitales', url: '/licenciatura-en-mercadotecnia/' }, { label: 'Ing. en Tecnologías Inmersivas y Videojuegos', url: '/ingenieria-en-videojuegos/' }] },
    { title: 'Más información', links: [{ label: 'Aviso de privacidad', url: '/aviso-de-privacidad/' }, { label: 'Reconocimientos de Validez Oficial', url: '/reconocimientos-validez-oficial-hybridge/' }, { label: 'Términos y condiciones', url: '/terms-and-conditions/' }] },
  ],
  en: [
    { title: 'Links', links: [{ label: 'Blog', url: '/blog/' }, { label: 'Events', url: '/eventos-hybridge/' }] },
    { title: 'Programs', links: [{ label: 'High School', url: '/preparatoria/' }, { label: 'Software Engineering', url: '/ingenieria-en-software/' }, { label: 'AI Engineering', url: '/ingenieria-en-inteligencia-artificial/' }] },
    { title: 'More info', links: [{ label: 'Privacy Policy', url: '/aviso-de-privacidad/' }, { label: 'Terms', url: '/terms-and-conditions/' }] },
  ],
}

export const Footer = ({ data, locale }: Props) => {
  const logoSrc = data?.logo ? getMediaUrl(data.logo) : '/Logo_blanco.png'
  const columns = data?.columns?.length ? data.columns : defaultCols[locale]
  const socials = data?.socialLinks?.length ? data.socialLinks : [
    { platform: 'whatsapp', url: 'https://wa.link/22wtjy' },
    { platform: 'instagram', url: 'https://www.instagram.com/hybridge.education' },
    { platform: 'tiktok', url: 'https://www.tiktok.com/@hybridge.education' },
  ]
  const phone = data?.contact?.phone || '(55) 2887 5759'
  const email = data?.contact?.email || 'sebastian@hybridge.education'
  const tagline = data?.tagline || 'Empieza a aprender de nuestros expertos y mejora tus habilidades'
  const copyright = data?.copyright || '\u00A9 Copyright 2026 by Hybridge'
  const icons: Record<string, string> = { whatsapp: 'Wa', instagram: 'Ig', tiktok: 'Tk', facebook: 'Fb', twitter: 'X' }

  return (
    <footer style={{ background: '#0D0D0D', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container-hb">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          <div>
            <img src={logoSrc} alt="Hybridge" style={{ height: '27px', width: 'auto', marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 900, marginBottom: '12px', lineHeight: 1.4, color: '#fff' }}>{tagline}</h3>
            <div style={{ marginTop: '20px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.85rem', marginBottom: '8px', color: '#fff' }}>{locale === 'es' ? 'Contacto' : 'Contact'}</p>
              <Link href={`tel:${phone.replace(/[^0-9+]/g, '')}`} style={{ display: 'block', color: '#a0a0a0', fontSize: '0.85rem', marginBottom: '4px' }}>{phone}</Link>
              <Link href={`mailto:${email}`} style={{ display: 'block', color: '#a0a0a0', fontSize: '0.85rem' }}>{email}</Link>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {socials.map((s: any, i: number) => (
                <Link key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#a0a0a0' }}>
                  {icons[s.platform || ''] || '?'}
                </Link>
              ))}
            </div>
          </div>
          {columns.map((col: any, i: number) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '0.85rem', marginBottom: '16px', color: '#fff' }}>{col.title}</p>
              {col.links?.map((link: any, j: number) => (
                <Link key={j} href={`/${locale}${link.url}`} style={{ display: 'block', color: '#a0a0a0', fontSize: '0.85rem', lineHeight: 2.2 }}>{link.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
