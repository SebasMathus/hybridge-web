import React from 'react'
import { SplitContentBlock } from '@/components/blocks/SplitContentBlock'

export const DEFAULT_HYBRIDGE_APP_IMAGE = 'https://hybridge.education/wp-content/uploads/2024/11/SDFGB@2x.jpg'

export const DEFAULT_APP_STORE_BADGE =
  'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83'
export const DEFAULT_PLAY_BADGE =
  'https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png'

export const HYBRIDGE_APP_STORE_URL = 'https://apps.apple.com/us/app/hybridge/id6756441573'
export const HYBRIDGE_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.hybridge.HybridgeAppAndroid'

export type HybridgeAppStoreBadgesProps = {
  storesLabel?: string
  appStoreUrl?: string
  playStoreUrl?: string
  appStoreBadgeUrl?: string
  playBadgeUrl?: string
}

/**
 * Badges App Store / Google Play — misma altura visual (40px).
 */
export function HybridgeAppStoreBadges({
  storesLabel = 'Disponible para iOS y Android',
  appStoreUrl = HYBRIDGE_APP_STORE_URL,
  playStoreUrl = HYBRIDGE_PLAY_STORE_URL,
  appStoreBadgeUrl = DEFAULT_APP_STORE_BADGE,
  playBadgeUrl = DEFAULT_PLAY_BADGE,
}: HybridgeAppStoreBadgesProps) {
  return (
    <div>
      <p
        style={{
          color: 'var(--color-hb-text)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '14px',
          marginTop: '8px',
        }}
      >
        {storesLabel}
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0, display: 'flex', alignItems: 'center', height: 40 }}>
          <img src={appStoreBadgeUrl} alt="Descargar en el App Store" height={40} style={{ width: 'auto', display: 'block' }} />
        </a>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0, display: 'flex', alignItems: 'center', height: 40 }}>
          <img
            src={playBadgeUrl}
            alt="Disponible en Google Play"
            style={{ height: 40, width: 'auto', maxHeight: 40, display: 'block', objectFit: 'contain' }}
          />
        </a>
      </div>
    </div>
  )
}

export type HybridgeAppSectionProps = {
  locale: string
  heading?: string
  body?: string
  image?: unknown
  imageUrl?: string | null
  imagePosition?: 'left' | 'right'
  backgroundColor?: 'white' | 'cream'
  stores?: HybridgeAppStoreBadgesProps
}

const DEFAULT_BODY = [
  'Hybridge cuenta con un ecosistema digital diseñado para que puedas aprender desde cualquier lugar.',
  'Puedes estudiar desde tu computadora o directamente desde tu celular.',
  'Avanza en tus actividades, revisa tus clases y mantente conectado con tu carrera donde quiera que estés.',
  'En Hybridge, el aprendizaje se adapta a ti y a tus hábitos. Así se ve estudiar de forma innovadora y flexible.',
].join('\n\n')

/**
 * Split + badges de tiendas — reutilizable (Ingeniería y otras páginas vía CMS).
 */
export function HybridgeAppSection({
  locale,
  heading = 'HYBRIDGE APP',
  body = DEFAULT_BODY,
  image = null,
  imageUrl,
  imagePosition = 'right',
  backgroundColor = 'cream',
  stores,
}: HybridgeAppSectionProps) {
  const trimmed = typeof imageUrl === 'string' ? imageUrl.trim() : ''
  const resolvedUrl = image ? (trimmed || undefined) : (trimmed || DEFAULT_HYBRIDGE_APP_IMAGE)
  const splitBlock = {
    blockType: 'splitContent' as const,
    eyebrow: '',
    heading,
    body,
    bulletPoints: [] as { text: string }[],
    buttons: [] as any[],
    image,
    imageUrl: resolvedUrl,
    imagePosition,
    backgroundColor,
  }

  return (
    <SplitContentBlock
      block={splitBlock}
      locale={locale}
      footer={<HybridgeAppStoreBadges {...(stores || {})} />}
    />
  )
}
