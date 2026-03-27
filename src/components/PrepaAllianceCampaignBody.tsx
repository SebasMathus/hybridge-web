import React from 'react'
import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { StudentsWorkWithSection } from '@/components/StudentsWorkWithSection'
import { FacultyTeamSection } from '@/components/FacultyTeamSection'
import { AprendeSobreChipsSection, AprendeSobreSkillsSection } from '@/components/AprendeSobreSection'
import type { WACtaEntry } from '@/lib/waCta'
import { getFechasInicioTexts, resolveWhatsAppHrefForPageKey } from '@/lib/fechaInicioWhatsApp'
import { injectCampaignHeroPrice } from '@/lib/campaignPricing'
import { partitionPreparatoriaCampaignForStudentsWork } from '@/lib/preparatoriaCampaignBlockOrder'
import { getPayloadClient } from '@/lib/payload'

/** Igual que `(campaign)/.../preparatoria/yt`: formulario prepa, bloques, Aprende sobre, faculty prepa. */
function moveFormBeforeModeloEducativo(blocks: any[]): any[] {
  const formIdx = blocks.findIndex((b) => b?.blockType === 'formBlock')
  const modeloIdx = blocks.findIndex((b) => b?.blockType === 'modeloEducativo')
  if (formIdx === -1 || modeloIdx === -1 || formIdx < modeloIdx) return blocks
  const form = blocks[formIdx]
  const withoutForm = [...blocks.slice(0, formIdx), ...blocks.slice(formIdx + 1)]
  const targetIdx = withoutForm.findIndex((b) => b?.blockType === 'modeloEducativo')
  if (targetIdx === -1) return blocks
  return [...withoutForm.slice(0, targetIdx), form, ...withoutForm.slice(targetIdx)]
}

type Props = {
  page: any
  lang: Locale
  pageSlug: string
  waCtaEntries: WACtaEntry[]
}

export async function PrepaAllianceCampaignBody({ page, lang, pageSlug, waCtaEntries }: Props) {
  const programSlug = 'preparatoria'
  const campaignPageKey = pageSlug

  let studentsWorkWith: any = null
  let aprendeSobre: any = null
  let prepaFechaText = ''
  let universidadFechaText = ''

  try {
    const payload = await getPayloadClient()
    try {
      studentsWorkWith = await payload.findGlobal({ slug: 'studentsWorkWith', locale: lang })
    } catch (_) {
      studentsWorkWith = null
    }
    try {
      const aprendeGlobal = await payload.findGlobal({ slug: 'aprendeSobreSkills', locale: lang })
      const rows = aprendeGlobal?.programs
      aprendeSobre = Array.isArray(rows)
        ? rows.find((p: { programKey?: string }) => p?.programKey === programSlug) ?? null
        : null
    } catch (_) {
      aprendeSobre = null
    }
    try {
      const fechas = await getFechasInicioTexts(payload)
      prepaFechaText = fechas.prepaText
      universidadFechaText = fechas.universidadText
    } catch (_) {
      /* opcional */
    }
  } catch (_) {
    /* best-effort */
  }

  const resolvedWaUrl = resolveWhatsAppHrefForPageKey(
    waCtaEntries,
    campaignPageKey,
    prepaFechaText,
    universidadFechaText,
  )

  const baseBlocks = injectCampaignHeroPrice(
    moveFormBeforeModeloEducativo((page.layout || []) as any[]),
    programSlug,
  )
  const waTemplate = baseBlocks.find((b) => b?.blockType === 'whatsappBar') || {
    blockType: 'whatsappBar',
    text: 'Quiero más información',
    url: resolvedWaUrl,
  }
  const nonWa = baseBlocks.filter((b) => b?.blockType !== 'whatsappBar')
  const normalizedBlocks = nonWa.length
    ? [
        nonWa[0],
        { ...waTemplate, url: resolvedWaUrl, trackId: `${campaignPageKey}-wa-bar-top` },
        ...nonWa.slice(1),
        { ...waTemplate, url: resolvedWaUrl, trackId: `${campaignPageKey}-wa-bar-bottom` },
      ]
    : [{ ...waTemplate, url: resolvedWaUrl }]

  const withCampaignCtaWa = normalizedBlocks.map((b) =>
    b?.blockType === 'ctaFechaInicio' ? { ...b, allianceWaUrl: resolvedWaUrl } : b,
  )

  const { beforeStudents: blocksBefore, formBlock: formAfterStudents, afterStudents: blocksAfter } =
    partitionPreparatoriaCampaignForStudentsWork(withCampaignCtaWa)

  const stripAccents = (s: string) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const isPrepaAboutSplit = (b: any) => {
    if (b?.blockType !== 'splitContent') return false
    const eyebrow = stripAccents(String(b?.eyebrow ?? '')).toLowerCase()
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return eyebrow.includes('sobre hybridge prepa') || heading.includes('preparatoria hybridge')
  }

  const isPrepaSkillsFeaturesGrid = (b: any) => {
    if (b?.blockType !== 'featuresGrid') return false
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return heading.includes('haz tu prepa')
  }

  const showAprendeChipsAfterBlock = (b: any) => isPrepaAboutSplit(b)
  const showAprendeSkillsAfterBlock = (b: any) => isPrepaSkillsFeaturesGrid(b)

  return (
    <>
      <RenderBlocks blocks={blocksBefore} locale={lang} />
      <StudentsWorkWithSection data={studentsWorkWith} />
      {formAfterStudents ? <RenderBlocks blocks={[formAfterStudents]} locale={lang} /> : null}
      {blocksAfter.map((b: any, idx: number) => (
        <React.Fragment
          key={`${campaignPageKey}-after-${idx}-${b?.blockType ?? 'block'}-${b?.id != null ? String(b.id) : 'noid'}`}
        >
          <RenderBlocks blocks={[b]} locale={lang} />
          {showAprendeChipsAfterBlock(b) ? <AprendeSobreChipsSection chips={aprendeSobre?.chips} /> : null}
          {showAprendeSkillsAfterBlock(b) ? <AprendeSobreSkillsSection skills={aprendeSobre?.skills} /> : null}
        </React.Fragment>
      ))}
      <FacultyTeamSection program="preparatoria" />
    </>
  )
}
