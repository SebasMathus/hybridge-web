/**
 * Landings de alianza: mismo layout que home (CMS) + header Hybridge + logo partner.
 * Logos en /media; el seed y el layout usan `/api/media/file/<nombre>`.
 */

export type AllianceLandingDef = {
  slug: string
  /** Título en CMS / <title> */
  title: string
  /** Etiqueta en admin WA CTA */
  label: string
  /** Alt del logo partner junto al logo Hybridge */
  partnerAlt: string
}

/** Orden: 99 Minutos primero, luego el resto en orden de negocio. */
export const ALLIANCE_LANDINGS: readonly AllianceLandingDef[] = [
  {
    slug: 'alianzas-99-minutos',
    title: 'Alianza 99 Minutos',
    label: 'Alianza 99 Minutos',
    partnerAlt: '99 Minutos',
  },
  {
    slug: 'alianza-footballcoaching',
    title: 'Alianza Football Coaching',
    label: 'Alianza Football Coaching',
    partnerAlt: 'Football Coaching',
  },
  {
    slug: 'alianzas-banorte-colaboradores',
    title: 'Alianza Banorte (colaboradores)',
    label: 'Alianza Banorte (colaboradores)',
    partnerAlt: 'Banorte',
  },
  {
    slug: 'alianzas-banorte-tarjetahabientes',
    title: 'Alianza Banorte (tarjetahabientes)',
    label: 'Alianza Banorte (tarjetahabientes)',
    partnerAlt: 'Banorte',
  },
  {
    slug: 'alianzas-bonda',
    title: 'Alianza Bonda',
    label: 'Alianza Bonda',
    partnerAlt: 'Bonda',
  },
  {
    slug: 'alianzas-cei',
    title: 'Alianza CEI',
    label: 'Alianza CEI',
    partnerAlt: 'CEI',
  },
  {
    slug: 'alianzas-diart',
    title: 'Alianza DIART',
    label: 'Alianza DIART',
    partnerAlt: 'DIART',
  },
  {
    slug: 'alianzas-didi-tarjetahabientes',
    title: 'Alianza DiDi (tarjetahabientes)',
    label: 'Alianza DiDi (tarjetahabientes)',
    partnerAlt: 'DiDi',
  },
  {
    slug: 'alianzas-envases',
    title: 'Alianza Envases',
    label: 'Alianza Envases',
    partnerAlt: 'Envases',
  },
  {
    slug: 'alianzas-gointegro',
    title: 'Alianza GoIntegro',
    label: 'Alianza GoIntegro',
    partnerAlt: 'GoIntegro',
  },
  {
    slug: 'alianzas-pranagroup',
    title: 'Alianza Prana Group',
    label: 'Alianza Prana Group',
    partnerAlt: 'Prana Group',
  },
  {
    slug: 'todos-los-programas-tizoncito',
    title: 'Todos los programas — Tizoncito',
    label: 'Todos los programas (Tizoncito)',
    partnerAlt: 'Tizoncito',
  },
  {
    slug: 'universidad-en-linea-sptf',
    title: 'Universidad en línea (Spotify)',
    label: 'Universidad en línea — Spotify',
    partnerAlt: 'Spotify',
  },
  {
    slug: 'universidad-en-linea-sptf-hpt',
    title: 'Universidad en línea Spotify (HPT)',
    label: 'Universidad en línea Spotify (HPT)',
    partnerAlt: 'Spotify',
  },
  {
    slug: 'universidad-en-linea-sptf-ldi',
    title: 'Universidad en línea Spotify (LDI)',
    label: 'Universidad en línea Spotify (LDI)',
    partnerAlt: 'Spotify',
  },
  {
    slug: 'universidad-en-linea-sptf-mf',
    title: 'Universidad en línea Spotify (MF)',
    label: 'Universidad en línea Spotify (MF)',
    partnerAlt: 'Spotify',
  },
  {
    slug: 'universidad-en-linea-sptf-emprendeduros',
    title: 'Universidad en línea Spotify (Emprendeduros)',
    label: 'Universidad en línea Spotify (Emprendeduros)',
    partnerAlt: 'Spotify',
  },
  {
    slug: 'universidad-en-linea-ginia',
    title: 'Universidad en línea Ginia',
    label: 'Universidad en línea Ginia',
    partnerAlt: 'Ginia',
  },
] as const

export const ALLIANCE_SLUGS = ALLIANCE_LANDINGS.map((x) => x.slug)

/** Landings retiradas: el seed debe borrar páginas/WA CTA huérfanas con estos slugs. */
export const ALLIANCE_SLUGS_RETIRED = ['alianzas-muy-saludable', 'programas-universidad-rf'] as const

/** Archivo en /media (servido por Payload). Slugs `sptf` → Spotify. */
const LOGO_FILE_BY_SLUG: Record<string, string> = {
  'alianzas-99-minutos': 'ogo_99minutos.svg',
  'alianza-footballcoaching': 'football.coaching.png',
  'alianzas-banorte-colaboradores': 'banorte.promociones.png',
  'alianzas-banorte-tarjetahabientes': 'banorte.promociones.png',
  'alianzas-bonda': 'bonda.png',
  'alianzas-cei': 'CEI.png',
  'alianzas-diart': 'DIART.png',
  'alianzas-didi-tarjetahabientes': 'didi.png',
  'alianzas-envases': 'envases.png',
  'alianzas-gointegro': 'Go-integro.png',
  'alianzas-pranagroup': 'Prana.png',
  'todos-los-programas-tizoncito': 'tizoncito.png',
  'universidad-en-linea-ginia': 'ginia.png',
}

export function isAllianceSlug(slug: string): boolean {
  return ALLIANCE_SLUGS.includes(slug)
}

export function getAlliancePartnerLogoFilename(slug: string): string {
  if (slug.includes('sptf')) return 'spotify.png'
  return LOGO_FILE_BY_SLUG[slug] ?? 'logotipo.svg'
}

export function getAlliancePartnerLogoSrc(slug: string): string {
  const file = getAlliancePartnerLogoFilename(slug)
  return `/api/media/file/${encodeURIComponent(file)}`
}

export function getAllianceLandingDef(slug: string): AllianceLandingDef | undefined {
  return ALLIANCE_LANDINGS.find((x) => x.slug === slug)
}

export const ALLIANCE_WA_CTA_OPTIONS = ALLIANCE_LANDINGS.map((x) => ({
  label: x.label,
  value: x.slug,
}))
