import type { Field, GlobalConfig } from 'payload'

export const APRENDE_SOBRE_ICON_KEYS = [
  'javascript',
  'python',
  'googlecloud',
  'cloudflare',
  'figma',
  'react',
] as const

export type AprendeSobreIconKey = (typeof APRENDE_SOBRE_ICON_KEYS)[number]

/* `text` en lugar de `select`: varios globals con el mismo select crean enums Postgres distintos
 * y Drizzle pide confirmación interactiva en cada `push`, bloqueando el servidor en dev. */
const aprendeSobreFields: Field[] = [
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

function aprendeSobreGlobal(slug: string, label: string): GlobalConfig {
  return {
    slug,
    label,
    fields: aprendeSobreFields,
  }
}

/** Admin: chips + skills para la página de Preparatoria */
export const AprendeSobrePrepaGlobal = aprendeSobreGlobal(
  'aprendeSobrePrepa',
  'Aprende sobre / Skills — Preparatoria',
)

/** Admin: chips + skills para Ingeniería en Software */
export const AprendeSobreSoftwareGlobal = aprendeSobreGlobal(
  'aprendeSobreSoftware',
  'Aprende sobre / Skills — Ingeniería en Software',
)

/** Admin: chips + skills para Ingeniería en Inteligencia Artificial */
export const AprendeSobreInteligenciaArtificialGlobal = aprendeSobreGlobal(
  'aprendeSobreInteligenciaArtificial',
  'Aprende sobre / Skills — Ingeniería en IA',
)

/** Admin: chips + skills — Ingeniería en Videojuegos y Tecnologías Inmersivas */
export const AprendeSobreVideojuegosGlobal = aprendeSobreGlobal(
  'aprendeSobreVideojuegos',
  'Aprende sobre / Skills — Videojuegos e Inmersivas',
)

/** Admin: chips + skills — Licenciatura en Administración e Innovación */
export const AprendeSobreLicenciaturaAdministracionInnovacionGlobal = aprendeSobreGlobal(
  'aprendeSobreLicenciaturaAdministracionInnovacion',
  'Aprende sobre / Skills — Lic. Administración e Innovación',
)

/** Admin: chips + skills — Licenciatura en Mercadotecnia y Negocios Digitales */
export const AprendeSobreMercadotecniaGlobal = aprendeSobreGlobal(
  'aprendeSobreMercadotecnia',
  'Aprende sobre / Skills — Lic. Mercadotecnia y Negocios Digitales',
)
