import Link from 'next/link'
import { btnStyles } from '@/lib/utils'
import { waInscripcionWithFecha, WA_ASESOR_URL, WA_LLAMADA_URL } from '@/lib/fechaInicioWhatsApp'

const defaultButtons = (prefix: string, dateText: string) => [
  {
    label: '¡Inscríbete ya!',
    url: waInscripcionWithFecha(dateText),
    variant: 'primary' as const,
    trackId: `${prefix}-cta-inscribete`,
  },
  { label: 'Contacta un asesor', url: WA_ASESOR_URL, variant: 'secondary' as const, trackId: `${prefix}-cta-asesor` },
  { label: 'Agenda una llamada', url: WA_LLAMADA_URL, variant: 'outline' as const, trackId: `${prefix}-cta-llamada` },
]

type Props = { block: any; locale: string }

export const CtaFechaInicioBlockComponent = ({ block, locale }: Props) => {
  const fechaInicio = block.fechaInicio
  if (!fechaInicio) return null
  const dateText = typeof fechaInicio === 'object' ? fechaInicio.dateText : null
  if (!dateText) return null

  const prefix = block.trackPrefix || 'cta'
  const allianceUrl =
    typeof block.allianceWaUrl === 'string' && block.allianceWaUrl.trim() ? block.allianceWaUrl.trim() : ''
  const buttons = allianceUrl
    ? [
        {
          label: '¡Inscríbete ya!',
          url: allianceUrl,
          variant: 'primary' as const,
          trackId: `${prefix}-cta-inscribete`,
        },
        {
          label: 'Contacta un asesor',
          url: allianceUrl,
          variant: 'secondary' as const,
          trackId: `${prefix}-cta-asesor`,
        },
        {
          label: 'Agenda una llamada',
          url: allianceUrl,
          variant: 'outline' as const,
          trackId: `${prefix}-cta-llamada`,
        },
      ]
    : defaultButtons(prefix, dateText)

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
