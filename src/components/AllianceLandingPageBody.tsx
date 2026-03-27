import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { BenefitsHybridgeGrid } from '@/components/BenefitsHybridgeGrid'
import { ActiveStudentsHybridge } from '@/components/ActiveStudentsHybridge'
import { TodosPorProgramasForm } from '@/components/TodosPorProgramasForm'
import { resolveWACtaUrl, type WACtaEntry } from '@/lib/waCta'
import { transformAllianceLandingBlocks } from '@/lib/allianceLandingBlocks'

type Props = {
  page: any
  lang: Locale
  slug: string
  waCtaEntries: WACtaEntry[]
}

/** Cuerpo de landing de alianza (mismo layout CMS que home + transformAllianceLandingBlocks). */
export function AllianceLandingPageBody({ page, lang, slug, waCtaEntries }: Props) {
  const ALLIANCE_PAGE_KEY = slug

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
    blocksBeforePillarsOrdered[1]?.blockType === 'whatsappBar'
      ? blocksBeforePillarsOrdered.slice(2)
      : blocksBeforePillarsOrdered.slice(1)

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
}
