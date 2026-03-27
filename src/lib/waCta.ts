export const WA_CTA_HOME_URL =
  'https://api.whatsapp.com/send/?phone=5215528875759&text=folio_3514a8%3A+%C2%A1Hola%21+%C2%A1Quiero+estudiar+en+Hybridge%21&type=phone_number&app_absent=0'

export const WA_CTA_PROGRAMS_URL = 'https://wa.me/message/RNYDE2HK3NGNG1'

/** Landing alianza 99 Minutos — todos los CTAs WhatsApp de esa página. */
export const WA_CTA_ALIANZA_99_MINUTOS_URL = 'https://wa.me/message/NBAZURLGSWMYH1'

export type WACtaEntry = {
  pageKey?: string
  url?: string
}

export function resolveWACtaUrl(entries: WACtaEntry[], pageKey: string): string {
  const exact = entries.find((e) => e?.pageKey === pageKey && e?.url)
  if (exact?.url) return exact.url
  const global = entries.find((e) => e?.pageKey === 'global' && e?.url)
  return global?.url || WA_CTA_HOME_URL
}

export function pageKeyFromPath(pathname: string): string {
  const clean = pathname.split('?')[0].replace(/\/+$/, '') || '/'
  const seg = clean.split('/').filter(Boolean)
  if (seg.length === 1 && (seg[0] === 'es' || seg[0] === 'en')) return 'home'
  const maybeSlug = seg.length >= 2 ? seg[1] : ''
  if (maybeSlug.startsWith('alianzas-')) return maybeSlug
  const maybeChannel = seg.length >= 3 ? seg[2] : ''
  const known = new Set([
    'preparatoria',
    'ingenieria-en-software',
    'ingenieria-en-inteligencia-artificial',
    'ingenieria-en-videojuegos',
    'licenciatura-en-administracion-e-innovacion',
    'licenciatura-en-mercadotecnia',
    'experiencia-hybridge',
  ])
  if ((maybeChannel === 'tk' || maybeChannel === 'yt') && known.has(maybeSlug)) {
    return `${maybeSlug}-${maybeChannel}`
  }
  return known.has(maybeSlug) ? maybeSlug : 'global'
}

