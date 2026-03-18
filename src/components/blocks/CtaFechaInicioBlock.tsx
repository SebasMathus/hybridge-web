import Link from 'next/link'
import { btnStyles } from '@/lib/utils'

const WA_INSC = 'https://wa.me/+525592256413?text=¡Hola!%20Me%20gustaria%20inscribirme'
const WA_ASES = 'https://wa.me/+525592256413?text=¡Hola!%20Quiero%20hablar%20con%20un%20asesor'
const WA_CALL = 'https://wa.me/+525592256413?text=¡Hola!%20Quiero%20agendar%20una%20llamada'

const defaultButtons = (prefix: string) => [
  { label: 'Inscríbete Ya', url: WA_INSC, variant: 'primary' as const, trackId: `${prefix}-cta-inscribete` },
  { label: 'Contacta un asesor', url: WA_ASES, variant: 'secondary' as const, trackId: `${prefix}-cta-asesor` },
  { label: 'Agenda una llamada', url: WA_CALL, variant: 'outline' as const, trackId: `${prefix}-cta-llamada` },
]

type Props = { block: any; locale: string }

export const CtaFechaInicioBlockComponent = ({ block, locale }: Props) => {
  const fechaInicio = block.fechaInicio
  if (!fechaInicio) return null
  const dateText = typeof fechaInicio === 'object' ? fechaInicio.dateText : null
  if (!dateText) return null

  const prefix = block.trackPrefix || 'cta'
  const buttons = defaultButtons(prefix)

  return (
    <section style={{ background: 'var(--color-hb-bg-alt)', padding: '64px 0', textAlign: 'center' }}>
      <div className="container-hb">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 900, marginBottom: '24px', color: 'var(--color-hb-text)' }}>
          Próxima fecha de inicio: {dateText}
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track-id={btn.trackId}
              style={btnStyles[btn.variant]}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
