import type { Field, GlobalConfig } from 'payload'

export const APRENDE_SOBRE_PROGRAM_KEYS = [
  'preparatoria',
  'ingenieria-en-software',
  'ingenieria-en-inteligencia-artificial',
  'ingenieria-en-videojuegos',
  'licenciatura-en-administracion-e-innovacion',
  'licenciatura-en-mercadotecnia',
] as const

export type AprendeSobreProgramKey = (typeof APRENDE_SOBRE_PROGRAM_KEYS)[number]

export const APRENDE_SOBRE_SKILLS_GLOBAL_SLUG = 'aprendeSobreSkills'

export const APRENDE_SOBRE_ICON_KEYS = [
  'javascript',
  'python',
  'googlecloud',
  'cloudflare',
  'figma',
  'react',
] as const

export type AprendeSobreIconKey = (typeof APRENDE_SOBRE_ICON_KEYS)[number]

const programRowFields: Field[] = [
  {
    name: 'programKey',
    type: 'select',
    required: true,
    admin: {
      description: 'Debe coincidir con el slug de la página del programa.',
    },
    options: APRENDE_SOBRE_PROGRAM_KEYS.map((value) => ({
      label: value,
      value,
    })),
  },
  {
    name: 'chips',
    type: 'array',
    minRows: 1,
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'skills',
    type: 'array',
    minRows: 1,
    fields: [
      {
        name: 'iconKey',
        type: 'text',
        required: true,
        validate: (val: unknown) => {
          const s = typeof val === 'string' ? val : ''
          if ((APRENDE_SOBRE_ICON_KEYS as readonly string[]).includes(s)) return true
          return `Usa una clave: ${APRENDE_SOBRE_ICON_KEYS.join(', ')}`
        },
        admin: {
          description:
            'Icono: javascript, python, googlecloud, cloudflare, figma, react (mismo set que en front).',
        },
      },
      {
        name: 'opacity',
        type: 'number',
        defaultValue: 0.5,
      },
      {
        name: 'size',
        type: 'number',
        defaultValue: 28,
      },
    ],
  },
]

/** Un solo global en Admin: tabla de programas (chips + skills por fila). */
export const AprendeSobreSkillsGlobal: GlobalConfig = {
  slug: APRENDE_SOBRE_SKILLS_GLOBAL_SLUG,
  label: 'Aprende sobre / Skills',
  fields: [
    {
      name: 'programs',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Programa', plural: 'Programas' },
      admin: {
        description: 'Una fila por programa; el slug de la página debe coincidir con «Programa».',
      },
      fields: programRowFields,
    },
  ],
}
