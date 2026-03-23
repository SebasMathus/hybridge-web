import React from 'react'
import { SplitContentBlock } from '@/components/blocks/SplitContentBlock'

/** Ilustración distinta a «Comunidad»; sustituir por captura de la app si la suben al CDN. */
const APP_SECTION_IMAGE_URL = 'https://hybridge.education/wp-content/uploads/2024/11/SDFGB@2x.jpg'

/** TODO: enlazar tiendas reales cuando existan las URLs públicas. */
const APP_STORE_URL = 'https://hybridge.education/'
const PLAY_STORE_URL = 'https://hybridge.education/'

const APP_STORE_BADGE =
  'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-mx?size=250x83'
const PLAY_BADGE = 'https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png'

const hybridgeAppBlock = {
  blockType: 'splitContent' as const,
  eyebrow: '',
  heading: 'HYBRIDGE APP',
  body: [
    'Hybridge cuenta con un ecosistema digital diseñado para que puedas aprender desde cualquier lugar.',
    'Puedes estudiar desde tu computadora o directamente desde tu celular.',
    'Avanza en tus actividades, revisa tus clases y mantente conectado con tu carrera donde quiera que estés.',
    'En Hybridge, el aprendizaje se adapta a ti y a tus hábitos. Así se ve estudiar de forma innovadora y flexible.',
  ].join('\n\n'),
  bulletPoints: [],
  buttons: [],
  image: null,
  imageUrl: APP_SECTION_IMAGE_URL,
  /** Comunidad Hybridge usa `left`; aquí va al lado opuesto (texto izquierda, imagen derecha). */
  imagePosition: 'right' as const,
  backgroundColor: 'cream' as const,
}

function StoreBadges() {
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
        Disponible para iOS y Android
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0, display: 'flex', alignItems: 'center', height: 40 }}>
          <img src={APP_STORE_BADGE} alt="Descargar en el App Store" height={40} style={{ width: 'auto', display: 'block' }} />
        </a>
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0, display: 'flex', alignItems: 'center', height: 40 }}>
          {/* El asset de Google trae más padding; misma altura visual que App Store */}
          <img
            src={PLAY_BADGE}
            alt="Disponible en Google Play"
            style={{ height: 40, width: 'auto', maxHeight: 40, display: 'block', objectFit: 'contain' }}
          />
        </a>
      </div>
    </div>
  )
}

type Props = { locale: string }

/**
 * Después del bloque «Comunidad / Hybridge» en Ingeniería en Software.
 * Misma base que `SplitContentBlock`, imagen en el lado opuesto al bloque Comunidad.
 */
export function HybridgeAppSection({ locale }: Props) {
  return <SplitContentBlock block={hybridgeAppBlock} locale={locale} footer={<StoreBadges />} />
}
