import { ALLIANCE_WA_CTA_OPTIONS, isAllianceSlug } from '@/lib/allianceLandingConfig'
import { PREPA_ALLIANCE_WA_CTA_OPTIONS, isPrepaAllianceSlug } from '@/lib/prepaAllianceConfig'

/** Opciones del select `pageKey` en WA CTA — única fuente para labels y columnas de admin. */
export const WA_CTA_PAGE_KEY_OPTIONS = [
  { label: 'Global', value: 'global' },
  { label: 'Inicio (/es)', value: 'home' },
  { label: 'Preparatoria', value: 'preparatoria' },
  { label: 'Preparatoria (TikTok)', value: 'preparatoria-tk' },
  { label: 'Preparatoria (YouTube)', value: 'preparatoria-yt' },
  { label: 'Ingeniería en Software', value: 'ingenieria-en-software' },
  { label: 'Ingeniería en Software (TikTok)', value: 'ingenieria-en-software-tk' },
  { label: 'Ingeniería en Software (YouTube)', value: 'ingenieria-en-software-yt' },
  { label: 'Ingeniería en Inteligencia Artificial', value: 'ingenieria-en-inteligencia-artificial' },
  { label: 'Ingeniería en IA (TikTok)', value: 'ingenieria-en-inteligencia-artificial-tk' },
  { label: 'Ingeniería en IA (YouTube)', value: 'ingenieria-en-inteligencia-artificial-yt' },
  { label: 'Ingeniería en Videojuegos', value: 'ingenieria-en-videojuegos' },
  { label: 'Ingeniería en Videojuegos (TikTok)', value: 'ingenieria-en-videojuegos-tk' },
  { label: 'Ingeniería en Videojuegos (YouTube)', value: 'ingenieria-en-videojuegos-yt' },
  { label: 'Licenciatura en Administración e Innovación', value: 'licenciatura-en-administracion-e-innovacion' },
  {
    label: 'Lic. Administración e Innovación (TikTok) [legacy]',
    value: 'licenciatura-en-administracion-e-innovacion-tk',
  },
  {
    label: 'Lic. Administración e Innovación (YouTube) [legacy]',
    value: 'licenciatura-en-administracion-e-innovacion-yt',
  },
  { label: 'Licenciatura en Mercadotecnia', value: 'licenciatura-en-mercadotecnia' },
  { label: 'Lic. Mercadotecnia (TikTok)', value: 'licenciatura-en-mercadotecnia-tk' },
  { label: 'Lic. Mercadotecnia (YouTube)', value: 'licenciatura-en-mercadotecnia-yt' },
  { label: 'Experiencia Hybridge', value: 'experiencia-hybridge' },
  ...PREPA_ALLIANCE_WA_CTA_OPTIONS,
  ...ALLIANCE_WA_CTA_OPTIONS,
] as const

export function waCtaPageLabel(pageKey: string): string {
  const o = WA_CTA_PAGE_KEY_OPTIONS.find((x) => x.value === pageKey)
  return o?.label ?? pageKey
}

/** Categoría para la columna «Tipo de página» en el listado de admin. */
export function waCtaPageTipo(pageKey: string): string {
  if (pageKey === 'global') return 'Global'
  if (pageKey === 'home') return 'Inicio'
  if (isPrepaAllianceSlug(pageKey)) return 'Alianza Prepa'
  if (isAllianceSlug(pageKey)) return 'Alianza'
  if (/-(tk|yt)$/.test(pageKey)) return 'Campaña'
  return 'Programa'
}
