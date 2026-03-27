import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton'
import type { WACtaEntry } from '@/lib/waCta'
import { getFechasInicioTexts } from '@/lib/fechaInicioWhatsApp'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'
  return {
    title: 'Hybridge Education',
    description: isEn
      ? 'The school and university of the future.'
      : 'La escuela y universidad del futuro.',
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  let headerData = {} as Record<string, unknown>
  let footerData = {} as Record<string, unknown>
  let waCtaEntries: WACtaEntry[] = []
  let prepaFechaText = ''
  let universidadFechaText = ''

  try {
    const payload = await getPayloadClient()
    headerData = (await payload.findGlobal({ slug: 'header', locale: lang })) as Record<string, unknown>
    footerData = (await payload.findGlobal({ slug: 'footer', locale: lang })) as Record<string, unknown>
    const waResult = await payload.find({
      collection: 'wa-cta',
      limit: 100,
      depth: 0,
    })
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
    // Keep empty header/footer so the app still renders
  }

  return (
    <>
      <Header data={headerData} locale={lang} />
      <main>{children}</main>
      <Footer data={footerData} locale={lang} />
      <FloatingWhatsAppButton
        entries={waCtaEntries}
        prepaFechaText={prepaFechaText}
        universidadFechaText={universidadFechaText}
        ariaLabel="WhatsApp Hybridge"
      />
    </>
  )
}
