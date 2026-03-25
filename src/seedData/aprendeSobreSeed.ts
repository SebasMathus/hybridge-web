import {
  APRENDE_SOBRE_PROGRAM_KEYS,
  APRENDE_SOBRE_SKILLS_GLOBAL_SLUG,
  type AprendeSobreProgramKey,
} from '@/globals/AprendeSobre'

/** Misma data inicial por programa; editable en Admin (un global con tabla por programa). */
export const APRENDE_SOBRE_SEED_DATA = {
  chips: [
    { label: 'Programación' },
    { label: 'Negocios' },
    { label: 'UI / UX' },
    { label: 'Inteligencia Artificial' },
    { label: 'Desarrollo' },
    { label: 'Datos' },
  ],
  skills: [
    { iconKey: 'javascript' as const, opacity: 0.5, size: 28 },
    { iconKey: 'python' as const, opacity: 0.5, size: 28 },
    { iconKey: 'googlecloud' as const, opacity: 0.5, size: 28 },
    { iconKey: 'cloudflare' as const, opacity: 0.5, size: 28 },
    { iconKey: 'figma' as const, opacity: 0.5, size: 28 },
    { iconKey: 'react' as const, opacity: 0.5, size: 28 },
  ],
}

export { APRENDE_SOBRE_PROGRAM_KEYS, APRENDE_SOBRE_SKILLS_GLOBAL_SLUG }

export const APRENDE_SOBRE_PROGRAMS_SEED = {
  programs: APRENDE_SOBRE_PROGRAM_KEYS.map((programKey: AprendeSobreProgramKey) => ({
    programKey,
    chips: APRENDE_SOBRE_SEED_DATA.chips,
    skills: APRENDE_SOBRE_SEED_DATA.skills,
  })),
}
