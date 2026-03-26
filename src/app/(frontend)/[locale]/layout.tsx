import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton'
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
  const whatsappHref =
    'https://api.whatsapp.com/send/?phone=5215528875759&text=folio_3514a8%3A+%C2%A1Hola%21+%C2%A1Quiero+estudiar+en+Hybridge%21&type=phone_number&app_absent=0'

  let headerData = {} as Record<string, unknown>
  let footerData = {} as Record<string, unknown>

  try {
    const payload = await getPayloadClient()
    headerData = (await payload.findGlobal({ slug: 'header', locale: lang })) as Record<string, unknown>
    footerData = (await payload.findGlobal({ slug: 'footer', locale: lang })) as Record<string, unknown>
  } catch (_) {
    // Keep empty header/footer so the app still renders
  }

  return (
    <>
      <Header data={headerData} locale={lang} />
      <main>{children}</main>
      <Footer data={footerData} locale={lang} />
      <FloatingWhatsAppButton href={whatsappHref} ariaLabel="WhatsApp Hybridge" />
    </>
  )
}
