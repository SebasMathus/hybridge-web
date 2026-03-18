import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { BenefitsHybridgeGrid } from '@/components/BenefitsHybridgeGrid'
import { FacultyTeamSection } from '@/components/FacultyTeamSection'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function DynamicPage({ params }: Props) {
  const { locale, slug } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale: lang,
    limit: 1,
    depth: 2,
  })

  const page = result.docs[0]
  if (!page) return notFound()
  return (
    <>
      <RenderBlocks blocks={(page.layout || []) as any[]} locale={lang} />
      {slug === 'preparatoria' || slug === 'ingenieria-en-software' ? <BenefitsHybridgeGrid /> : null}
      {slug === 'preparatoria' ? <FacultyTeamSection program="preparatoria" /> : null}
      {slug === 'ingenieria-en-software' ? <FacultyTeamSection program="ingenieria-en-software" /> : null}
    </>
  )
}
