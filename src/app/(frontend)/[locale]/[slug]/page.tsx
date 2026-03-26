import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import React from 'react'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { FacultyTeamSection } from '@/components/FacultyTeamSection'
import { StudentsWorkWithSection } from '@/components/StudentsWorkWithSection'
import { AprendeSobreChipsSection, AprendeSobreSkillsSection } from '@/components/AprendeSobreSection'
import { ActiveStudentsHybridge } from '@/components/ActiveStudentsHybridge'
import { notFound } from 'next/navigation'
import { hybridgeAppBlock } from '@/seedData/pageBlocksMarketing'
import { resolveWACtaUrl, type WACtaEntry } from '@/lib/waCta'

export const dynamic = 'force-dynamic'

const EXPERIENCIA_HUB_VIDEO_URL = 'https://www.youtube.com/watch?v=rwVpq7ibMbk'

const EXPERIENCIA_PILLARS_MEET_APP_CLOUD = [
  {
    title: 'Hybridge Meet',
    description:
      'Conéctate a clases en vivo con expertos de la industria. Participa, pregunta y aprende en tiempo real en sesiones dinámicas que combinan lo mejor de la educación presencial con la flexibilidad digital.',
    icon: '💻',
  },
  {
    title: 'Hybridge App',
    description:
      'Tu experiencia de estudio en la palma de tu mano. Accede a tus clases, actividades y contenidos desde cualquier lugar, en cualquier momento. Estudiar en línea ahora se adapta completamente a tu ritmo y estilo de vida.',
    icon: '📱',
  },
  {
    title: 'Hybridge Cloud',
    description:
      'Nunca pierdes una clase. Todas tus sesiones en vivo se almacenan automáticamente para que puedas repetirlas, repasarlas o estudiarlas cuando quieras, desde donde quieras.',
    icon: '☁️',
  },
]

/** Contenido legacy de Experiencia Hybridge: sin carrusel; video al inicio; textos/pilares; sin split Conoce Hybridge HUB; limpieza demo/blog/CTAs; app móvil tras el grid de pilares. */
function normalizeExperienciaHybridgeLayout(blocks: any[]): any[] {
  let out = blocks.filter((b) => {
    if (b?.blockType === 'formBlock') return false
    if (b?.blockType === 'ctaSection') {
      const h = String(b.heading || '')
      if (h === 'Hablar con un asesor' || h === 'Solicita un demo') return false
    }
    if (b?.blockType === 'splitContent') {
      const eyebrow = String(b.eyebrow || '')
      const heading = String(b.heading || '')
      if (eyebrow.includes('Últimas publicaciones') || heading === 'Blog Hybridge') return false
      if (eyebrow === 'Conoce' && heading === 'Hybridge HUB') return false
    }
    return true
  })

  out = out.filter((b) => b?.blockType !== 'heroCarousel')

  let hubVideo: any = null
  const hubVideoIdx = out.findIndex(
    (b) =>
      b?.blockType === 'videoSection' && String(b.youtubeUrl || '').includes('rwVpq7ibMbk'),
  )
  if (hubVideoIdx >= 0) {
    hubVideo = { ...out[hubVideoIdx] }
    out = [...out.slice(0, hubVideoIdx), ...out.slice(hubVideoIdx + 1)]
  }
  if (!hubVideo) {
    hubVideo = {
      blockType: 'videoSection',
      heading: 'CONOCE NUESTRO HUB',
      subheading: 'Experiencia Hybridge',
      youtubeUrl: EXPERIENCIA_HUB_VIDEO_URL,
      backgroundColor: 'cream',
    }
  }
  out = [hubVideo, ...out]

  out = out.map((b) => {
    if (b?.blockType === 'splitContent') {
      const eb = String(b.eyebrow || '')
      const hd = String(b.heading || '')
      if (
        eb.includes('CONOCE NUESTRO HUB') &&
        (hd.includes('Llevamos tu educación en línea al siguiente nivel') ||
          hd === 'Llevamos estudiar en línea al siguiente nivel')
      ) {
        return {
          ...b,
          heading: 'Llevamos estudiar en línea al siguiente nivel',
          body: 'Estudia prepa y universidad en línea dentro de un ecosistema digital propio: clases en vivo con expertos, contenido disponible siempre y una experiencia que se adapta a ti.',
        }
      }
      if (eb === 'Todo en un' && hd === 'solo lugar') {
        return {
          ...b,
          body: 'Nuestro Hub reúne todo lo que necesitas para estudiar en línea: clases en vivo, contenidos, asesorías y evaluaciones dentro de una sola plataforma.\n\nUna experiencia continua, simple y poderosa para estudiar prepa en línea o universidad en línea sin fricciones.',
        }
      }
    }
    if (b?.blockType === 'pillarsGrid' && Array.isArray(b.pillars)) {
      const hasMeet = b.pillars.some((p: any) => String(p?.title || '').includes('Hybridge Meet'))
      if (hasMeet) {
        return { ...b, pillars: EXPERIENCIA_PILLARS_MEET_APP_CLOUD }
      }
    }
    return b
  })

  if (!out.some((x) => x?.blockType === 'hybridgeApp')) {
    const pillarsIdx = out.findIndex((x) => x?.blockType === 'pillarsGrid')
    const app = hybridgeAppBlock() as any
    if (pillarsIdx >= 0) {
      out = [...out.slice(0, pillarsIdx + 1), app, ...out.slice(pillarsIdx + 1)]
    } else {
      out = [...out, app]
    }
  }

  return out
}

type Props = { params: Promise<{ locale: string; slug: string }> }

const UNIVERSIDAD_STUDENTS_WORK_SLUGS = new Set([
  'preparatoria',
  'ingenieria-en-software',
  'ingenieria-en-inteligencia-artificial',
  'ingenieria-en-videojuegos',
  'licenciatura-en-administracion-e-innovacion',
  'licenciatura-en-mercadotecnia',
])

const WHATSAPP_LAYOUT_SLUGS = new Set([...UNIVERSIDAD_STUDENTS_WORK_SLUGS, 'experiencia-hybridge'])

export default async function DynamicPage({ params }: Props) {
  const { locale, slug } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  const showStudentsWorkWith = UNIVERSIDAD_STUDENTS_WORK_SLUGS.has(slug)
  const showAprendeSobre = UNIVERSIDAD_STUDENTS_WORK_SLUGS.has(slug)

  let page: any
  let studentsWorkWith: any = null
  let aprendeSobre: any = null
  let waCtaEntries: WACtaEntry[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      locale: lang,
      limit: 1,
      depth: 2,
    })

    page = result.docs[0]

    if (showStudentsWorkWith) {
      try {
        studentsWorkWith = await payload.findGlobal({ slug: 'studentsWorkWith', locale: lang })
      } catch (_) {
        studentsWorkWith = null
      }
    }

    if (showAprendeSobre) {
      try {
        const aprendeGlobal = await payload.findGlobal({ slug: 'aprendeSobreSkills', locale: lang })
        const rows = aprendeGlobal?.programs
        aprendeSobre = Array.isArray(rows)
          ? rows.find((p: { programKey?: string }) => p?.programKey === slug) ?? null
          : null
      } catch (_) {
        aprendeSobre = null
      }
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
  } catch (_) {
    return <div className="container-hb section-pad">Error de base de datos. Configura `DATABASE_URL` en `.env` y vuelve a intentar.</div>
  }

  if (!page) return notFound()

  const rawLayout = (page.layout || []) as any[]
  /* Modelo educativo para ingenierías; se oculta en Preparatoria (CMS o seed antiguo). */
  let blocks =
    slug === 'preparatoria'
      ? rawLayout.filter((b) => b?.blockType !== 'modeloEducativo')
      : rawLayout
  if (slug === 'experiencia-hybridge') blocks = normalizeExperienciaHybridgeLayout(blocks)

  const stripAccents = (s: string) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const enforceTopAndBottomWhatsapp = (arr: any[]) => {
    const resolvedWaUrl = resolveWACtaUrl(waCtaEntries, slug)
    if (!WHATSAPP_LAYOUT_SLUGS.has(slug)) {
      return arr.map((b) =>
        b?.blockType === 'whatsappBar'
          ? { ...b, url: resolvedWaUrl }
          : b,
      )
    }

    const waTemplate = arr.find((b) => b?.blockType === 'whatsappBar') || {
      blockType: 'whatsappBar',
      text: 'Quiero más información',
      url: resolvedWaUrl,
    }
    waTemplate.url = resolvedWaUrl
    const nonWa = arr.filter((b) => b?.blockType !== 'whatsappBar')
    if (!nonWa.length) return [waTemplate, { ...waTemplate }]

    const topWa = { ...waTemplate, trackId: waTemplate.trackId || `${slug}-wa-bar-top` }
    const bottomWa = { ...waTemplate, trackId: `${slug}-wa-bar-bottom` }
    return [nonWa[0], topWa, ...nonWa.slice(1), bottomWa]
  }

  const normalizedBlocks = enforceTopAndBottomWhatsapp(blocks)
  const blocksBeforeCount =
    showStudentsWorkWith && normalizedBlocks[1]?.blockType === 'whatsappBar' ? 2 : 1
  const blocksBefore = showStudentsWorkWith ? normalizedBlocks.slice(0, blocksBeforeCount) : normalizedBlocks
  const blocksAfter = showStudentsWorkWith ? normalizedBlocks.slice(blocksBeforeCount) : normalizedBlocks

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
    return (
      heading.includes('haz tu ingenieria en solo 3 anos') ||
      heading.includes('haz tu licenciatura en solo 3 anos')
    )
  }

  const isPrepaSkillsFeaturesGrid = (b: any) => {
    if (b?.blockType !== 'featuresGrid') return false
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return heading.includes('haz tu prepa')
  }

  const isUniversidadCurriculumPlan = (b: any) =>
    (slug === 'ingenieria-en-software' ||
      slug === 'ingenieria-en-inteligencia-artificial' ||
      slug === 'ingenieria-en-videojuegos' ||
      slug === 'licenciatura-en-administracion-e-innovacion' ||
      slug === 'licenciatura-en-mercadotecnia') &&
    b?.blockType === 'curriculumPlan'

  const showAprendeChipsAfterBlock = (b: any) =>
    slug === 'preparatoria' ? isPrepaAboutSplit(b) : isUniversidadAboutSplitForChips(b)

  const showAprendeSkillsAfterBlock = (b: any) =>
    slug === 'preparatoria' ? isPrepaSkillsFeaturesGrid(b) : isUniversidad3YearsFeaturesGrid(b)

  return (
    <>
      {showStudentsWorkWith ? <RenderBlocks blocks={blocksBefore} locale={lang} /> : <RenderBlocks blocks={blocks} locale={lang} />}
      {showStudentsWorkWith ? <StudentsWorkWithSection data={studentsWorkWith} /> : null}
      {showStudentsWorkWith ? (
        <>
          {showAprendeSobre
            ? blocksAfter.map((b: any, idx: number) => (
                <React.Fragment
                  key={`${slug}-after-${idx}-${b?.blockType ?? 'block'}-${b?.id != null ? String(b.id) : 'noid'}`}
                >
                  <RenderBlocks blocks={[b]} locale={lang} />
                  {showAprendeChipsAfterBlock(b) ? (
                    <AprendeSobreChipsSection chips={aprendeSobre?.chips} />
                  ) : null}
                  {showAprendeSkillsAfterBlock(b) ? (
                    <AprendeSobreSkillsSection skills={aprendeSobre?.skills} />
                  ) : null}
                  {isUniversidadCurriculumPlan(b) ? <ActiveStudentsHybridge /> : null}
                </React.Fragment>
              ))
            : <RenderBlocks blocks={blocksAfter} locale={lang} />}
        </>
      ) : null}
      {slug === 'preparatoria' ? <FacultyTeamSection program="preparatoria" /> : null}
      {slug === 'ingenieria-en-software' ? <FacultyTeamSection program="ingenieria-en-software" /> : null}
      {slug === 'ingenieria-en-inteligencia-artificial' ? (
        <FacultyTeamSection program="ingenieria-en-inteligencia-artificial" />
      ) : null}
      {slug === 'ingenieria-en-videojuegos' ? (
        <FacultyTeamSection program="ingenieria-en-videojuegos" />
      ) : null}
      {slug === 'licenciatura-en-administracion-e-innovacion' ? (
        <FacultyTeamSection program="licenciatura-en-administracion-e-innovacion" />
      ) : null}
      {slug === 'licenciatura-en-mercadotecnia' ? (
        <FacultyTeamSection program="licenciatura-en-mercadotecnia" />
      ) : null}
    </>
  )
}
