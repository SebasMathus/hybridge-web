import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import React from 'react'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { FacultyTeamSection } from '@/components/FacultyTeamSection'
import { StudentsWorkWithSection } from '@/components/StudentsWorkWithSection'
import { AprendeSobreChipsSection, AprendeSobreSkillsSection } from '@/components/AprendeSobreSection'
import { ActiveStudentsHybridge } from '@/components/ActiveStudentsHybridge'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function DynamicPage({ params }: Props) {
  const { locale, slug } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  const showStudentsWorkWith = slug === 'preparatoria' || slug === 'ingenieria-en-software'
  const showAprendeSobre = slug === 'ingenieria-en-software'
  let page: any
  let studentsWorkWith: any = null
  let aprendeSobre: any = null
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
        aprendeSobre = await payload.findGlobal({ slug: 'aprendeSobre', locale: lang })
      } catch (_) {
        aprendeSobre = null
      }
    }
  } catch (_) {
    return <div className="container-hb section-pad">Error de base de datos. Configura `DATABASE_URL` en `.env` y vuelve a intentar.</div>
  }

  if (!page) return notFound()

  const rawLayout = (page.layout || []) as any[]
  /* Modelo educativo solo en Ingeniería en Software; no en Preparatoria (CMS o seed antiguo). */
  const blocks =
    slug === 'preparatoria'
      ? rawLayout.filter((b) => b?.blockType !== 'modeloEducativo')
      : rawLayout

  const stripAccents = (s: string) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  /** Ingeniería: barra WhatsApp debe ir justo debajo de “estudiantes trabajan en” (antes de modelo educativo). */
  const moveWhatsappBeforeModeloEducativo = (arr: any[]) => {
    const iWa = arr.findIndex((b) => b?.blockType === 'whatsappBar')
    const iMe = arr.findIndex((b) => b?.blockType === 'modeloEducativo')
    if (iWa === -1 || iMe === -1 || iWa < iMe) return arr
    const out = [...arr]
    const [wa] = out.splice(iWa, 1)
    const newMe = out.findIndex((b) => b?.blockType === 'modeloEducativo')
    out.splice(newMe, 0, wa)
    return out
  }

  const blocksBefore = showStudentsWorkWith ? blocks.slice(0, 1) : blocks
  let blocksAfter = showStudentsWorkWith ? blocks.slice(1) : blocks
  if (slug === 'ingenieria-en-software' && showStudentsWorkWith) {
    blocksAfter = moveWhatsappBeforeModeloEducativo(blocksAfter)
  }

  const isIngenieriaAboutSplit = (b: any) => {
    if (b?.blockType !== 'splitContent') return false
    const eyebrow = stripAccents(String(b?.eyebrow ?? '')).toLowerCase()
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return eyebrow.includes('sobre nuestra') && heading.includes('ingenieria en software')
  }

  const isIngenieriaSkillsFeaturesGrid = (b: any) => {
    if (b?.blockType !== 'featuresGrid') return false
    const heading = stripAccents(String(b?.heading ?? '')).toLowerCase()
    return heading.includes('haz tu ingenieria en solo 3 anos')
  }

  const isIngenieriaCurriculumPlan = (b: any) =>
    slug === 'ingenieria-en-software' && b?.blockType === 'curriculumPlan'

  return (
    <>
      {showStudentsWorkWith ? <RenderBlocks blocks={blocksBefore} locale={lang} /> : <RenderBlocks blocks={blocks} locale={lang} />}
      {showStudentsWorkWith ? <StudentsWorkWithSection data={studentsWorkWith} /> : null}
      {showStudentsWorkWith ? (
        <>
          {showAprendeSobre
            ? blocksAfter.map((b: any, idx: number) => (
                <React.Fragment key={b?.id || idx}>
                  <RenderBlocks blocks={[b]} locale={lang} />
                  {isIngenieriaAboutSplit(b) ? (
                    <AprendeSobreChipsSection chips={aprendeSobre?.chips} />
                  ) : null}
                  {isIngenieriaSkillsFeaturesGrid(b) ? (
                    <AprendeSobreSkillsSection skills={aprendeSobre?.skills} />
                  ) : null}
                  {isIngenieriaCurriculumPlan(b) ? <ActiveStudentsHybridge /> : null}
                </React.Fragment>
              ))
            : <RenderBlocks blocks={blocksAfter} locale={lang} />}
        </>
      ) : null}
      {slug === 'preparatoria' ? <FacultyTeamSection program="preparatoria" /> : null}
      {slug === 'ingenieria-en-software' ? <FacultyTeamSection program="ingenieria-en-software" /> : null}
    </>
  )
}
