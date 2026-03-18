import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

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
    </>
  )
}
