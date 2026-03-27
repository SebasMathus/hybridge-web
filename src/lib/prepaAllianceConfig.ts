/**
 * Landings «Alianza Prepa»: misma estructura que /preparatoria/yt + logo partner en header.
 * En CMS se guardan como `pageType: main` (slug único); el tipo es lógico por `slug` aquí.
 */

export type PrepaAllianceDef = {
  slug: string
  title: string
  label: string
  partnerAlt: string
}

export const PREPA_ALLIANCE_PAGES: readonly PrepaAllianceDef[] = [
  {
    slug: 'prepa-alianza-domus',
    title: 'Alianza Prepa — Domus',
    label: 'Alianza Prepa (Domus)',
    partnerAlt: 'Domus',
  },
  {
    slug: 'prepa-alianza-teleton',
    title: 'Alianza Prepa — Teletón',
    label: 'Alianza Prepa (Teletón)',
    partnerAlt: 'Teletón',
  },
] as const

export const PREPA_ALLIANCE_SLUGS = PREPA_ALLIANCE_PAGES.map((x) => x.slug)

const LOGO_FILE_BY_SLUG: Record<string, string> = {
  'prepa-alianza-domus': 'domus.png',
  'prepa-alianza-teleton': 'Teleton.png',
}

export function isPrepaAllianceSlug(slug: string): boolean {
  return PREPA_ALLIANCE_SLUGS.includes(slug)
}

export function getPrepaAlliancePartnerLogoSrc(slug: string): string {
  const file = LOGO_FILE_BY_SLUG[slug] ?? 'logotipo.svg'
  return `/api/media/file/${encodeURIComponent(file)}`
}

export function getPrepaAllianceDef(slug: string): PrepaAllianceDef | undefined {
  return PREPA_ALLIANCE_PAGES.find((x) => x.slug === slug)
}

export const PREPA_ALLIANCE_WA_CTA_OPTIONS = PREPA_ALLIANCE_PAGES.map((x) => ({
  label: x.label,
  value: x.slug,
}))
