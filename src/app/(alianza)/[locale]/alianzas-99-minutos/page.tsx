import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { BenefitsHybridgeGrid } from '@/components/BenefitsHybridgeGrid'
import { ActiveStudentsHybridge } from '@/components/ActiveStudentsHybridge'
import { TodosPorProgramasForm } from '@/components/TodosPorProgramasForm'
import { resolveWACtaUrl, type WACtaEntry } from '@/lib/waCta'
import { transformAllianceLandingBlocks } from '@/lib/allianceLandingBlocks'

const ALLIANCE_PAGE_KEY = 'alianzas-99-minutos'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string }> }

export default async function Alianza99MinutosPage({ params }: Props) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'alianzas-99-minutos' } },
      locale: lang,
      limit: 1,
      depth: 2,
    })

    const page = result.docs[0]
    if (!page) return <div className="container-hb section-pad">No se encontró la landing.</div>

    let waCtaEntries: WACtaEntry[] = []
    try {
      const waResult = await payload.find({ collection: 'wa-cta', limit: 100, depth: 0 })
      waCtaEntries = waResult.docs.map((doc: any) => ({
        pageKey: doc?.pageKey ? String(doc.pageKey) : '',
        url: doc?.url ? String(doc.url) : '',
      }))
    } catch (_) {
      waCtaEntries = []
    }

    const allianceWaUrl = resolveWACtaUrl(waCtaEntries, ALLIANCE_PAGE_KEY)
    const blocks = transformAllianceLandingBlocks(
      (page.layout || []).map((b: any) => {
        if (b?.blockType === 'whatsappBar') return { ...b, url: allianceWaUrl }
        if (b?.blockType === 'ctaFechaInicio') return { ...b, allianceWaUrl }
        return b
      }),
    )

    const moveWhatsAppAfterFirstBlock = (arr: any[]) => {
      const wa = arr.find((b: any) => b?.blockType === 'whatsappBar')
      if (!wa || arr.length < 2) return arr
      const withoutWa = arr.filter((b: any) => b?.blockType !== 'whatsappBar')
      if (!withoutWa.length) return [wa]
      return [withoutWa[0], { ...wa, trackId: wa.trackId || 'home-wa-bar-top' }, ...withoutWa.slice(1)]
    }

    const stripAccents = (s: string) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    const pillsTargetIndex = blocks.findIndex((b: any) => {
      if (b?.blockType !== 'pillarsGrid') return false
      const heading = stripAccents(String(b?.heading ?? ''))
      const highlight = stripAccents(String(b?.highlightText ?? ''))
      return heading.toLowerCase().includes('tecnolog') || highlight.toLowerCase().includes('tecnolog')
    })

    const pillarsIndex = pillsTargetIndex === -1 ? blocks.findIndex((b: any) => b?.blockType === 'pillarsGrid') : pillsTargetIndex
    const blocksBeforePillars = pillarsIndex === -1 ? blocks : blocks.slice(0, pillarsIndex)
    const blocksBeforePillarsOrdered = moveWhatsAppAfterFirstBlock(blocksBeforePillars)
    const blocksAfterPillars = pillarsIndex === -1 ? [] : blocks.slice(pillarsIndex)

    const blocksBeforePillarsFirst = blocksBeforePillarsOrdered.slice(0, 1)
    const waBeforeForm =
      blocksBeforePillarsOrdered[1]?.blockType === 'whatsappBar' ? [blocksBeforePillarsOrdered[1]] : []
    const blocksBeforePillarsRest =
      blocksBeforePillarsOrdered[1]?.blockType === 'whatsappBar' ? blocksBeforePillarsOrdered.slice(2) : blocksBeforePillarsOrdered.slice(1)

    return (
      <>
        <RenderBlocks blocks={blocksBeforePillarsFirst} locale={lang} />
        <RenderBlocks blocks={waBeforeForm} locale={lang} />
        <TodosPorProgramasForm locale={lang} sectionAnchorId="alianza-inscripcion" />
        <RenderBlocks blocks={blocksBeforePillarsRest} locale={lang} />
        {lang === 'es' ? <ActiveStudentsHybridge /> : null}
        <RenderBlocks blocks={blocksAfterPillars} locale={lang} />
        <BenefitsHybridgeGrid />
      </>
    )
  } catch (e) {
    return <div className="container-hb section-pad">Ejecuta npm run dev, ve a /admin y luego /api/seed.</div>
  }
}

