'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/utils'
import { getMediaUrl } from '@/lib/utils'

type Props = { data: any; locale: Locale }

export const Header = ({ data, locale }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState<number | null>(null)

  const logoSrc = data?.logo ? getMediaUrl(data.logo) : '/Logo_blanco.png'
  const navItems = data?.navItems?.length ? data.navItems : [
    { label: 'Inicio', url: `/${locale}` },
    { label: 'Preparatoria', url: `/${locale}/preparatoria` },
    { label: 'Universidad', url: '#', children: [
      { label: 'Ingeniería en Software', url: `/${locale}/ingenieria-en-software` },
      { label: 'Lic. en Administración e Innovación', url: `/${locale}/licenciatura-en-administracion-e-innovacion` },
      { label: 'Ingeniería en Inteligencia Artificial', url: `/${locale}/ingenieria-en-inteligencia-artificial` },
      { label: 'Lic. en Mercadotecnia y Negocios Digitales', url: `/${locale}/licenciatura-en-mercadotecnia` },
      { label: 'Ing. en Tecnologías Inmersivas y Videojuegos', url: `/${locale}/ingenieria-en-videojuegos` },
    ]},
    { label: 'Blog', url: `/${locale}/blog` },
    { label: 'Experiencia Hybridge', url: `/${locale}/experiencia-hybridge` },
  ]
  const headerCss: React.CSSProperties = { position: 'sticky', top: 0, zIndex: 100, background: '#0D0D0D' }
  const ddCss: React.CSSProperties = { position: 'absolute', top: '100%', right: 0, marginTop: '4px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '8px 0', minWidth: '300px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }
  const mobCss: React.CSSProperties = { position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0, background: '#0D0D0D', padding: '24px', overflowY: 'auto', zIndex: 99 }

  return (
    <>
      <header style={headerCss}>
        <div className="container-hb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          <Link href={`/${locale}`}><img src={logoSrc} alt="Hybridge" style={{ height: '27px', width: 'auto' }} /></Link>
          <nav className="hb-desk" style={{ display: 'flex', alignItems: 'center', gap: '28px', marginLeft: 'auto' }}>
            {navItems.map((item: any, i: number) => (
              <div key={i} style={{ position: 'relative' }} onMouseEnter={() => item.children?.length ? setOpenDrop(i) : null} onMouseLeave={() => setOpenDrop(null)}>
                <Link href={item.url} style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {item.label}
                  {item.children?.length > 0 && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }} aria-hidden>
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  )}
                </Link>
                {item.children?.length > 0 && openDrop === i && (
                  <div style={ddCss}>
                    {item.children.map((c: any, j: number) => (
                      <Link key={j} href={c.url} style={{ display: 'block', padding: '10px 20px', fontSize: '0.85rem', color: '#a0a0a0' }}>{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hb-mob" style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', marginLeft: 'auto' }}>
            {mobileOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
        {mobileOpen && (
          <div style={mobCss}>
            {navItems.map((item: any, i: number) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Link href={item.url} onClick={() => !item.children?.length && setMobileOpen(false)} style={{ color: 'inherit' }}>{item.label}</Link>
                  {item.children?.length > 0 && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }} aria-hidden>
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  )}
                </span>
                {item.children?.map((c: any, j: number) => (
                  <Link key={j} href={c.url} onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '6px 0 6px 16px', fontSize: '0.95rem', color: '#a0a0a0' }}>{c.label}</Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </header>
      <style>{`.hb-mob{display:none!important}@media(max-width:768px){.hb-desk{display:none!important}.hb-mob{display:block!important}}`}</style>
    </>
  )
}
