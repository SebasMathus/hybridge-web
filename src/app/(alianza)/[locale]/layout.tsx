import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { getMediaUrl, type Locale } from '@/lib/utils'
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton'
import type { WACtaEntry } from '@/lib/waCta'
import { getFechasInicioTexts } from '@/lib/fechaInicioWhatsApp'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function AllianceLocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  let logoSrc = '/Logo_blanco.png'
  let allianceLogoSrc = '/api/media/file/logo_99minutos.svg'
  let waCtaEntries: WACtaEntry[] = []
  let prepaFechaText = ''
  let universidadFechaText = ''

  try {
    const payload = await getPayloadClient()
    const headerData = (await payload.findGlobal({ slug: 'header', locale: lang })) as Record<string, unknown>
    logoSrc = headerData?.logo ? getMediaUrl(headerData.logo) : '/Logo_blanco.png'

    try {
      const media = await payload.findByID({ collection: 'media', id: 1 })
      if (media) {
        const url = getMediaUrl(media)
        if (url) allianceLogoSrc = url
      }
    } catch {
      // best-effort
    }

    const waResult = await payload.find({ collection: 'wa-cta', limit: 100, depth: 0 })
    waCtaEntries = waResult.docs.map((doc: any) => ({
      pageKey: doc?.pageKey ? String(doc.pageKey) : '',
      url: doc?.url ? String(doc.url) : '',
    }))
    try {
      const fechas = await getFechasInicioTexts(payload)
      prepaFechaText = fechas.prepaText
      universidadFechaText = fechas.universidadText
    } catch (_) {
      /* fechas-inicio opcional */
    }
  } catch (_) {
    // fail-safe defaults
  }

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#0D0D0D' }}>
        <div className="container-hb" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <Link href={`/${lang}`} aria-label="Hybridge inicio" style={{ display: 'inline-flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt="Hybridge" style={{ height: 27, width: 'auto' }} />
            </Link>
            <span aria-hidden="true" style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.35)' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={allianceLogoSrc}
              alt="99 Minutos"
              style={{ height: 24, width: 'auto' }}
            />
          </div>
        </div>
      </header>

      <main>{children}</main>
      <FloatingWhatsAppButton
        entries={waCtaEntries}
        prepaFechaText={prepaFechaText}
        universidadFechaText={universidadFechaText}
        ariaLabel="WhatsApp Hybridge"
      />
    </>
  )
}

