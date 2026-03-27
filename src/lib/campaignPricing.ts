/** Texto de precio para landings de campaña (tk / yt). Solo se aplica en esa ruta, no en páginas principales. */

const PRICE_ING_PREPA = 'Desde $1,999 MXN/mes'
const PRICE_LIC = 'Desde $1,799 MXN/mes'

export function getCampaignHeroPriceLine(programSlug: string): string {
  switch (programSlug) {
    case 'preparatoria':
    case 'ingenieria-en-software':
    case 'ingenieria-en-inteligencia-artificial':
    case 'ingenieria-en-videojuegos':
      return PRICE_ING_PREPA
    case 'licenciatura-en-mercadotecnia':
    case 'licenciatura-en-administracion-e-innovacion':
      return PRICE_LIC
    default:
      return ''
  }
}

export function injectCampaignHeroPrice(blocks: any[], programSlug: string): any[] {
  const line = getCampaignHeroPriceLine(programSlug)
  if (!line) return blocks
  return blocks.map((b) =>
    b?.blockType === 'heroBanner' ? { ...b, campaignPriceLine: line } : b,
  )
}
