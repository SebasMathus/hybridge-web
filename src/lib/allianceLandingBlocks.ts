/** Ajustes de CTA solo para landings de alianza (p. ej. alianzas-99-minutos). */

export const ALLIANCE_FORM_HASH = '#alianza-inscripcion'
export const ALLIANCE_PROGRAMS_HASH = '#universidad'

/**
 * Reescribe bloques del layout compartido con home: CTAs al formulario / ancla de programas.
 * No modificar el seed de home; se aplica en runtime en la página de alianza.
 */
export function transformAllianceLandingBlocks(blocks: any[]): any[] {
  return blocks.map((b) => {
    if (b?.blockType === 'heroCarousel') {
      return {
        ...b,
        slides: (b.slides || []).map((s: any) => ({
          ...s,
          ctaLabel: '¡Inscríbete ya!',
          ctaUrl: ALLIANCE_FORM_HASH,
          ctaTrackId: s.ctaTrackId ? `${String(s.ctaTrackId)}-alianza-inscripcion` : 'alianza-hero-inscripcion',
        })),
      }
    }
    if (b?.blockType === 'splitContent' && b.heading === 'Hybridge Education' && String(b.eyebrow || '').trim() === 'Sobre') {
      return {
        ...b,
        buttons: [
          {
            label: 'Ver programas',
            url: ALLIANCE_PROGRAMS_HASH,
            variant: 'primary',
            trackId: 'alianza-ver-programas',
          },
        ],
      }
    }
    if (b?.blockType === 'splitContent' && b.heading === '¿Qué nos mueve?') {
      return {
        ...b,
        buttons: [
          {
            label: '¡Inscríbete ya!',
            url: ALLIANCE_FORM_HASH,
            variant: 'primary',
            trackId: 'alianza-mueve-inscripcion',
          },
        ],
      }
    }
    if (b?.blockType === 'programsGrid') {
      return { ...b, allianceLanding: true }
    }
    return b
  })
}
