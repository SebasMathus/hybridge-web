import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { BenefitsHybridgeGrid } from '@/components/BenefitsHybridgeGrid'
import { ActiveStudentsHybridge } from '@/components/ActiveStudentsHybridge'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      locale: lang,
      limit: 1,
      depth: 2,
    })
    const page = result.docs[0]
    if (!page) return <div className="container-hb section-pad">Visita <a href="/api/seed">/api/seed</a> para crear las paginas, luego recarga.</div>

    const blocks = page.layout || []
    const stripAccents = (s: string) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Colocamos el bloque justo antes del grid de pilares para "nuestra tecnología educativa".
    // Si no encontramos el heading específico, usamos el primer `pillarsGrid`.
    const pillsTargetIndex = blocks.findIndex((b: any) => {
      if (b?.blockType !== 'pillarsGrid') return false
      const heading = stripAccents(String(b?.heading ?? ''))
      const highlight = stripAccents(String(b?.highlightText ?? ''))
      return heading.toLowerCase().includes('tecnolog') || highlight.toLowerCase().includes('tecnolog')
    })

    const pillarsIndex = pillsTargetIndex === -1 ? blocks.findIndex((b: any) => b?.blockType === 'pillarsGrid') : pillsTargetIndex
    const blocksBeforePillars = pillarsIndex === -1 ? blocks : blocks.slice(0, pillarsIndex)
    const blocksAfterPillars = pillarsIndex === -1 ? [] : blocks.slice(pillarsIndex)

    return (
      <>
        <RenderBlocks blocks={blocksBeforePillars} locale={lang} />
        {lang === 'es' ? <ActiveStudentsHybridge /> : null}
        <RenderBlocks blocks={blocksAfterPillars} locale={lang} />
        <BenefitsHybridgeGrid />
      </>
    )
  } catch (e) {
    return <div className="container-hb section-pad">Ejecuta npm run dev, ve a /admin para crear tu usuario, luego visita <a href="/api/seed">/api/seed</a></div>
  }
}
