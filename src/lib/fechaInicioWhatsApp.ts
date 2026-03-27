import type { WACtaEntry } from '@/lib/waCta'
import { resolveWACtaUrl } from '@/lib/waCta'
import { isAllianceSlug } from '@/lib/allianceLandingConfig'
import { isPrepaAllianceSlug } from '@/lib/prepaAllianceConfig'

/** Mismo teléfono que los botones del bloque ctaFechaInicio (Inscríbete / asesor / llamada). */
export const WA_PHONE_E164 = '525592256413'

export const waUrlWithText = (text: string) =>
  `https://wa.me/+${WA_PHONE_E164}?text=${encodeURIComponent(text)}`

/** Inscripción con fecha — alineado con el título "Próxima fecha de inicio: …" del bloque. */
export function waInscripcionWithFecha(dateText: string): string {
  const t = (dateText || '').trim()
  if (!t) return waUrlWithText('¡Hola! Me gustaría inscribirme')
  return waUrlWithText(`¡Hola! Me gustaría inscribirme. Próxima fecha de inicio: ${t}.`)
}

export const WA_ASESOR_URL = waUrlWithText('¡Hola! Quiero hablar con un asesor')
export const WA_LLAMADA_URL = waUrlWithText('¡Hola! Quiero agendar una llamada')

/** Home y universidad / preparatoria según slug de página (sin rutas de campaña -tk/-yt; esas usan solo WA CTA). */
export function fechaTipoForPageKey(pageKey: string): 'prepa' | 'universidad' | null {
  if (pageKey === 'home') return 'universidad'
  const base = pageKey.replace(/-(tk|yt)$/, '')
  if (base === 'preparatoria') return 'prepa'
  const uni = new Set([
    'ingenieria-en-software',
    'ingenieria-en-inteligencia-artificial',
    'ingenieria-en-videojuegos',
    'licenciatura-en-administracion-e-innovacion',
    'licenciatura-en-mercadotecnia',
    'experiencia-hybridge',
  ])
  if (uni.has(base)) return 'universidad'
  return null
}

export function resolveWhatsAppHrefForPageKey(
  entries: WACtaEntry[],
  pageKey: string,
  prepaDateText: string,
  universidadDateText: string,
): string {
  /** URLs definidas en Admin → WA CTA (colección wa-cta por pageKey). */
  if (isAllianceSlug(pageKey)) return resolveWACtaUrl(entries, pageKey)
  if (isPrepaAllianceSlug(pageKey)) return resolveWACtaUrl(entries, pageKey)
  /** Landings de campaña (tk/yt): la URL debe ser la de WA CTA, no el mensaje con fecha de inicio. */
  if (/-(tk|yt)$/.test(pageKey)) return resolveWACtaUrl(entries, pageKey)
  const tipo = fechaTipoForPageKey(pageKey)
  const raw = tipo === 'prepa' ? prepaDateText : tipo === 'universidad' ? universidadDateText : ''
  const dateText = (raw || '').trim()
  if (!dateText) return resolveWACtaUrl(entries, pageKey)
  return waInscripcionWithFecha(dateText)
}

export async function getFechasInicioTexts(payload: { find: (args: any) => Promise<any> }): Promise<{
  prepaText: string
  universidadText: string
}> {
  const prepa = await payload.find({
    collection: 'fechas-inicio',
    where: { slug: { equals: 'prepa' } },
    limit: 1,
  })
  const uni = await payload.find({
    collection: 'fechas-inicio',
    where: { slug: { equals: 'universidad' } },
    limit: 1,
  })
  return {
    prepaText: prepa.docs[0]?.dateText ? String(prepa.docs[0].dateText) : '',
    universidadText: uni.docs[0]?.dateText ? String(uni.docs[0].dateText) : '',
  }
}
