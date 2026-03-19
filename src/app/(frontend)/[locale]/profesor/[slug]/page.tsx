import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { FacultyMemberLinkedInReplica } from '@/components/FacultyMemberLinkedInReplica'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function FacultyProfessorPage({ params }: Props) {
  const { locale, slug } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  let doc: any | null = null

  try {
    const payload = await getPayloadClient()

    // 1) Buscar por slug (lo esperado)
    const bySlug = await payload.find({
      collection: 'faculty-members',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })

    doc = bySlug.docs?.[0] ?? null

    // 2) Fallback: si por alguna razón el slug no existe en la DB,
    //    intentar resolverlo como ID.
    if (!doc) {
      const maybeId = Number(slug)
      if (!Number.isNaN(maybeId)) {
        const byId = await payload.findByID({
          collection: 'faculty-members',
          id: maybeId,
          depth: 0,
        })
        doc = byId ?? null
      }
    }

    // 3) Último fallback: revisar docs (evita edge-cases raros)
    if (!doc) {
      const result = await payload.find({
        collection: 'faculty-members',
        limit: 1000,
        depth: 0,
      })
      doc = result.docs?.find((d: any) => String(d?.slug ?? '') === slug || String(d?.id) === slug) ?? null
    }
  } catch (e) {
    console.error('[FacultyProfessorPage] failed to load faculty member', e)
    return notFound()
  }

  if (!doc) return notFound()

  const programs = Array.isArray(doc.programs) ? doc.programs.map((p: any) => p?.program).filter(Boolean) : []

  const member = {
    id: String(doc.id),
    slug: doc.slug ? String(doc.slug) : undefined,
    name: String(doc.name ?? ''),
    specialization: String(doc.specialization ?? ''),
    avatarUrl: doc.avatarUrl ? String(doc.avatarUrl) : undefined,
    workplaceLogoUrl: doc.workplaceLogoUrl ? String(doc.workplaceLogoUrl) : undefined,
    linkedInUrl: doc.linkedInUrl ? String(doc.linkedInUrl) : undefined,
    formation: doc.formation ? String(doc.formation) : undefined,
    subjects: Array.isArray(doc.subjects) ? doc.subjects.map((s: any) => s?.text).filter(Boolean) : [],
    description: doc.description ? String(doc.description) : undefined,
    hobbies: Array.isArray(doc.hobbies) ? doc.hobbies.map((h: any) => h?.text).filter(Boolean) : [],
  }

  return (
    <main>
      <FacultyMemberLinkedInReplica
        locale={lang}
        member={{
          ...member,
          programs: programs as any,
        }}
      />
    </main>
  )
}

