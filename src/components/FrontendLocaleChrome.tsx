'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton'
import type { WACtaEntry } from '@/lib/waCta'
import type { Locale } from '@/lib/utils'
import {
  getAllianceLandingDef,
  getAlliancePartnerLogoSrc,
  isAllianceSlug,
} from '@/lib/allianceLandingConfig'
import {
  getPrepaAllianceDef,
  getPrepaAlliancePartnerLogoSrc,
  isPrepaAllianceSlug,
} from '@/lib/prepaAllianceConfig'
import type { ReactNode } from 'react'

type Props = {
  locale: Locale
  hybridgeLogoSrc: string
  headerData: Record<string, unknown>
  footerData: Record<string, unknown>
  waCtaEntries: WACtaEntry[]
  prepaFechaText: string
  universidadFechaText: string
  children: ReactNode
}

export function FrontendLocaleChrome({
  locale,
  hybridgeLogoSrc,
  headerData,
  footerData,
  waCtaEntries,
  prepaFechaText,
  universidadFechaText,
  children,
}: Props) {
  const pathname = usePathname() || ''
  const segments = pathname.split('/').filter(Boolean)
  const slug = segments[1]
  const isAlliance = Boolean(slug && isAllianceSlug(slug))
  const isPrepaAlliance = Boolean(slug && isPrepaAllianceSlug(slug))

  const wa = (
    <FloatingWhatsAppButton
      entries={waCtaEntries}
      prepaFechaText={prepaFechaText}
      universidadFechaText={universidadFechaText}
      ariaLabel="WhatsApp Hybridge"
    />
  )

  if ((isAlliance || isPrepaAlliance) && slug) {
    const def = isPrepaAlliance ? getPrepaAllianceDef(slug) : getAllianceLandingDef(slug)
    const partnerAlt = def?.partnerAlt ?? 'Partner'
    const allianceLogoSrc = isPrepaAlliance ? getPrepaAlliancePartnerLogoSrc(slug) : getAlliancePartnerLogoSrc(slug)

    return (
      <>
        <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0D0D0D' }}>
          <div className="container-hb" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 72 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <Link href={`/${locale}`} aria-label="Hybridge inicio" style={{ display: 'inline-flex', alignItems: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={hybridgeLogoSrc} alt="Hybridge" style={{ height: 27, width: 'auto' }} />
              </Link>
              <span aria-hidden="true" style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.35)' }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={allianceLogoSrc}
                alt={partnerAlt}
                style={{ height: 24, width: 'auto', maxWidth: 140, objectFit: 'contain' }}
              />
            </div>
          </div>
        </header>
        <main>{children}</main>
        {wa}
      </>
    )
  }

  return (
    <>
      <Header data={headerData} locale={locale} />
      <main>{children}</main>
      <Footer data={footerData} locale={locale} />
      {wa}
    </>
  )
}
