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

export default async function CampaignLocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  let logoSrc = '/Logo_blanco.png'
  let waCtaEntries: WACtaEntry[] = []
  let prepaFechaText = ''
  let universidadFechaText = ''

  try {
    const payload = await getPayloadClient()
    const headerData = (await payload.findGlobal({ slug: 'header', locale: lang })) as Record<string, unknown>
    logoSrc = headerData?.logo ? getMediaUrl(headerData.logo) : '/Logo_blanco.png'
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
          <Link href={`/${lang}`} aria-label="Hybridge inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="Hybridge" style={{ height: 27, width: 'auto' }} />
          </Link>
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

