import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { BenefitsHybridgeGrid } from '@/components/BenefitsHybridgeGrid'
import { ActiveStudentsHybridge } from '@/components/ActiveStudentsHybridge'
import { StudentsWorkWithSection } from '@/components/StudentsWorkWithSection'
import { resolveWACtaUrl, type WACtaEntry } from '@/lib/waCta'

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
    let studentsWorkWith: any = null
    let waCtaEntries: WACtaEntry[] = []
    try {
      studentsWorkWith = await payload.findGlobal({ slug: 'studentsWorkWith', locale: lang })
    } catch (_) {
      // If global content isn't created yet in DB, keep section hidden
      studentsWorkWith = null
    }
    try {
      const waResult = await payload.find({ collection: 'wa-cta', limit: 100, depth: 0 })
      waCtaEntries = waResult.docs.map((doc: any) => ({
        pageKey: doc?.pageKey ? String(doc.pageKey) : '',
        url: doc?.url ? String(doc.url) : '',
      }))
    } catch (_) {
      waCtaEntries = []
    }
    const page = result.docs[0]
    if (!page) return <div className="container-hb section-pad">Visita <a href="/api/seed">/api/seed</a> para crear las paginas, luego recarga.</div>

    const blocks = (page.layout || []).map((b: any) =>
      b?.blockType === 'whatsappBar'
        ? { ...b, url: resolveWACtaUrl(waCtaEntries, 'home') }
        : b,
    )
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
    const blocksBeforePillarsFirst = blocksBeforePillars.slice(0, 1)
    const blocksBeforePillarsRest = blocksBeforePillars.slice(1)

    return (
      <>
        <RenderBlocks blocks={blocksBeforePillarsFirst} locale={lang} />
        <StudentsWorkWithSection data={studentsWorkWith as any} />
        <RenderBlocks blocks={blocksBeforePillarsRest} locale={lang} />
        {lang === 'es' ? <ActiveStudentsHybridge /> : null}
        <RenderBlocks blocks={blocksAfterPillars} locale={lang} />
        <BenefitsHybridgeGrid />
      </>
    )
  } catch (e) {
    return <div className="container-hb section-pad">Ejecuta npm run dev, ve a /admin para crear tu usuario, luego visita <a href="/api/seed">/api/seed</a></div>
  }
}
