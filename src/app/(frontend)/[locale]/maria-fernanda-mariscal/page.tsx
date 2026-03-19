import { getPayloadClient } from '@/lib/payload'
import type { Locale } from '@/lib/utils'
import { FacultyMemberLinkedInReplica } from '@/components/FacultyMemberLinkedInReplica'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function MariaFernandaMariscalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const lang = (locale === 'en' ? 'en' : 'es') as Locale

  const slug = 'maria-fernanda-mariscal'

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'faculty-members',
    limit: 1,
    depth: 0,
    where: { slug: { equals: slug } },
  })

  const doc: any = result.docs?.[0]
  if (!doc) return notFound()

  const programs = Array.isArray(doc.programs) ? doc.programs.map((p: any) => p?.program).filter(Boolean) : []

  const backHref = programs.includes('preparatoria')
    ? `/${lang}/preparatoria`
    : programs.includes('ingenieria-en-software')
      ? `/${lang}/ingenieria-en-software`
      : `/${lang}/preparatoria`

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

