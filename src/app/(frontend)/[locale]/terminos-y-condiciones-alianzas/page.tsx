import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { LegalMarkdown } from '@/components/LegalMarkdown'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Términos y condiciones – alianzas | Hybridge Education',
    description:
      'Términos y condiciones de los beneficios de alianzas Hybridge para colaboradores e instituciones con convenio.',
  }
}

export default async function TerminosYCondicionesAlianzasPage({ params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale
  if (lang !== 'es') return notFound()

  const payload = await getPayloadClient()
  const legal = (await payload.findGlobal({ slug: 'legal', locale: 'es' })) as any
  const title = String(
    legal?.terminosYCondicionesAlianzas?.title ??
      'Términos y Condiciones – Beneficios de alianzas Hybridge',
  )
  const markdown = String(legal?.terminosYCondicionesAlianzas?.markdown ?? '')

  return (
    <main className="container-hb section-pad">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-6 text-center">{title}</h1>
      <LegalMarkdown markdown={markdown} />
    </main>
  )
}
