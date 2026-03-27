import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { StudentsWorkWithSection } from '@/components/StudentsWorkWithSection'
import { FacultyTeamSection } from '@/components/FacultyTeamSection'
import { ActiveStudentsHybridge } from '@/components/ActiveStudentsHybridge'
import { AprendeSobreChipsSection, AprendeSobreSkillsSection } from '@/components/AprendeSobreSection'
import { type WACtaEntry } from '@/lib/waCta'
import { getFechasInicioTexts, resolveWhatsAppHrefForPageKey } from '@/lib/fechaInicioWhatsApp'
import { injectCampaignHeroPrice } from '@/lib/campaignPricing'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string; slug: string; channel: string }>
}

const CAMPAIGN_ALLOWED_SLUGS = new Set([
  'preparatoria',
  'ingenieria-en-software',
  'ingenieria-en-inteligencia-artificial',
  'ingenieria-en-videojuegos',
  'licenciatura-en-mercadotecnia',
])

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

export default async function CampaignProgramPage({ params }: Props) {
  const { locale, slug, channel } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  if ((channel !== 'tk' && channel !== 'yt') || !CAMPAIGN_ALLOWED_SLUGS.has(slug)) return notFound()

  let page: any = null
  let studentsWorkWith: any = null
  let aprendeSobre: any = null
  let waCtaEntries: WACtaEntry[] = []
  let prepaFechaText = ''
  let universidadFechaText = ''

  try {
    const payload = await getPayloadClient()

    const campaignResult = await payload.find({
      collection: 'pages',
      where: {
        and: [
          { pageType: { equals: 'campaign' } },
          { campaignBaseSlug: { equals: slug } },
          { campaignChannel: { equals: channel } },
        ],
      },
      locale: lang,
      limit: 1,
      depth: 2,
    })
    page = campaignResult.docs[0] || null

    if (!page) {
      const fallback = await payload.find({
        collection: 'pages',
        where: { slug: { equals: slug } },
        locale: lang,
        limit: 1,
        depth: 2,
      })
      page = fallback.docs[0] || null
    }

    try {
      studentsWorkWith = await payload.findGlobal({ slug: 'studentsWorkWith', locale: lang })
    } catch (_) {
      studentsWorkWith = null
    }

    try {
      const aprendeGlobal = await payload.findGlobal({ slug: 'aprendeSobreSkills', locale: lang })
      const rows = aprendeGlobal?.programs
      aprendeSobre = Array.isArray(rows)
        ? rows.find((p: { programKey?: string }) => p?.programKey === slug) ?? null
        : null
    } catch (_) {
      aprendeSobre = null
    }

    try {
      const waResult = await payload.find({ collection: 'wa-cta', limit: 100, depth: 0 })
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
      waCtaEntries = []
    }
  } catch (_) {
    return <div className="container-hb section-pad">Error de base de datos. Revisa configuración.</div>
  }

  if (!page) return notFound()

  const stripAccents = (s: string) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const campaignPageKey = `${slug}-${channel}`
  const resolvedWaUrl = resolveWhatsAppHrefForPageKey(
    waCtaEntries,
    campaignPageKey,
    prepaFechaText,
    universidadFechaText,
  )

  const baseBlocks = injectCampaignHeroPrice(
    moveFormBeforeModeloEducativo((page.layout || []) as any[]),
    slug,
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

  const blocksBefore = withCampaignCtaWa.slice(0, 2)
  const blocksAfter = withCampaignCtaWa.slice(2)

  const isUniversidadAboutSplitForChips = (b: any) => {
    if (b?.blockType !== 'splitContent') return false
    const eyebrow = stripAccents(String(b?.eyebrow ?? '')).toLowerCase()
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return (
      eyebrow.includes('sobre nuestra') &&
      (heading.includes('ingenieria en software') ||
        heading.includes('ingenieria en inteligencia artificial') ||
        heading.includes('ingenieria en videojuegos') ||
        heading.includes('licenciatura en administracion e innovacion') ||
        heading.includes('licenciatura en mercadotecnia y negocios digitales'))
    )
  }

  const isPrepaAboutSplit = (b: any) => {
    if (b?.blockType !== 'splitContent') return false
    const eyebrow = stripAccents(String(b?.eyebrow ?? '')).toLowerCase()
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return eyebrow.includes('sobre hybridge prepa') || heading.includes('preparatoria hybridge')
  }

  const isUniversidad3YearsFeaturesGrid = (b: any) => {
    if (b?.blockType !== 'featuresGrid') return false
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return heading.includes('haz tu ingenieria en solo 3 anos') || heading.includes('haz tu licenciatura en solo 3 anos')
  }

  const isPrepaSkillsFeaturesGrid = (b: any) => {
    if (b?.blockType !== 'featuresGrid') return false
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return heading.includes('haz tu prepa')
  }

  const isUniversidadCurriculumPlan = (b: any) =>
    slug !== 'preparatoria' && b?.blockType === 'curriculumPlan'

  const showAprendeChipsAfterBlock = (b: any) =>
    slug === 'preparatoria' ? isPrepaAboutSplit(b) : isUniversidadAboutSplitForChips(b)

  const showAprendeSkillsAfterBlock = (b: any) =>
    slug === 'preparatoria' ? isPrepaSkillsFeaturesGrid(b) : isUniversidad3YearsFeaturesGrid(b)

  return (
    <>
      <RenderBlocks blocks={blocksBefore} locale={lang} />
      <StudentsWorkWithSection data={studentsWorkWith} />
      {blocksAfter.map((b: any, idx: number) => (
        <React.Fragment
          key={`${campaignPageKey}-after-${idx}-${b?.blockType ?? 'block'}-${b?.id != null ? String(b.id) : 'noid'}`}
        >
          <RenderBlocks blocks={[b]} locale={lang} />
          {showAprendeChipsAfterBlock(b) ? <AprendeSobreChipsSection chips={aprendeSobre?.chips} /> : null}
          {showAprendeSkillsAfterBlock(b) ? <AprendeSobreSkillsSection skills={aprendeSobre?.skills} /> : null}
          {isUniversidadCurriculumPlan(b) ? <ActiveStudentsHybridge /> : null}
        </React.Fragment>
      ))}
      {slug === 'preparatoria' ? <FacultyTeamSection program="preparatoria" /> : null}
      {slug === 'ingenieria-en-software' ? <FacultyTeamSection program="ingenieria-en-software" /> : null}
      {slug === 'ingenieria-en-inteligencia-artificial' ? (
        <FacultyTeamSection program="ingenieria-en-inteligencia-artificial" />
      ) : null}
      {slug === 'ingenieria-en-videojuegos' ? <FacultyTeamSection program="ingenieria-en-videojuegos" /> : null}
      {slug === 'licenciatura-en-administracion-e-innovacion' ? (
        <FacultyTeamSection program="licenciatura-en-administracion-e-innovacion" />
      ) : null}
      {slug === 'licenciatura-en-mercadotecnia' ? <FacultyTeamSection program="licenciatura-en-mercadotecnia" /> : null}
    </>
  )
}

