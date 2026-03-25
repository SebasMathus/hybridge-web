/** Misma data inicial por programa; editable por separado en Admin (3 globals). */
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

export const APRENDE_SOBRE_GLOBAL_SLUGS = [
  'aprendeSobrePrepa',
  'aprendeSobreSoftware',
  'aprendeSobreInteligenciaArtificial',
  'aprendeSobreVideojuegos',
  'aprendeSobreLicenciaturaAdministracionInnovacion',
  'aprendeSobreMercadotecnia',
] as const
