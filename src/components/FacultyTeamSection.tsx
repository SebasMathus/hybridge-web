import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { FacultyTeamGrid, type FacultyTeamMember } from './FacultyTeamGrid'

export type ProgramKey = 'preparatoria' | 'ingenieria-en-software'

export async function FacultyTeamSection({ program }: { program: ProgramKey }) {
  let members: FacultyTeamMember[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'faculty-members',
      limit: 1000,
      depth: 0,
    })

    members = (result.docs as any[])
      .filter((d) => {
        const progs = Array.isArray(d.programs)
          ? d.programs
              .map((x: any) => (typeof x === 'string' ? x : x?.program))
              .filter(Boolean)
          : []
        return progs.includes(program)
      })
      .map((d) => {
        const subjects = Array.isArray(d.subjects) ? d.subjects.map((s: any) => s?.text).filter(Boolean) : []
        const hobbies = Array.isArray(d.hobbies) ? d.hobbies.map((h: any) => h?.text).filter(Boolean) : []
        return {
          id: String(d.id),
          slug: d.slug ? String(d.slug) : undefined,
          name: String(d.name ?? ''),
          specialization: String(d.specialization ?? ''),
          avatarUrl: d.avatarUrl ? String(d.avatarUrl) : undefined,
          workplaceLogoUrl: d.workplaceLogoUrl ? String(d.workplaceLogoUrl) : undefined,
          linkedInUrl: d.linkedInUrl ? String(d.linkedInUrl) : undefined,
          formation: d.formation ? String(d.formation) : undefined,
          subjects,
          description: d.description ? String(d.description) : undefined,
          hobbies,
        }
      })
  } catch (e) {
    // Si la colección aún no existe o hay un error de esquema, no rompas el sitio.
    console.error('[FacultyTeamSection] failed to load faculty-members', e)
    members = []
  }

  return <FacultyTeamGrid members={members} />
}

