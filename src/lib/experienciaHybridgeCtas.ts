/**
 * CTAs «Habla con un asesor» en Experiencia Hybridge: misma URL que barras/flotante
 * (`resolveWhatsAppHrefForPageKey` → wa-cta `experiencia-hybridge` + fechas si aplica).
 */
export function injectExperienciaHybridgeAsesorCtas(blocks: any[], waUrl: string): any[] {
  let hubPillarsInjected = false
  return blocks.map((b) => {
    if (
      b?.blockType === 'pillarsGrid' &&
      !hubPillarsInjected &&
      Array.isArray(b.pillars) &&
      b.pillars.some((p: any) => String(p?.title || '').includes('Hybridge Meet'))
    ) {
      hubPillarsInjected = true
      return {
        ...b,
        buttons: [
          {
            label: 'Habla con un asesor',
            url: waUrl,
            variant: 'primary',
            trackId: 'exp-hub-pillars-asesor',
          },
        ],
      }
    }
    if (b?.blockType === 'splitContent') {
      const eyebrow = String(b.eyebrow || '').toLowerCase()
      if (eyebrow.includes('pilares de nuestra experiencia')) {
        return {
          ...b,
          buttons: [
            {
              label: 'Habla con un asesor',
              url: waUrl,
              variant: 'primary',
              trackId: 'exp-pilares-texto-asesor',
            },
          ],
        }
      }
      if (Array.isArray(b.buttons) && b.buttons.length) {
        return {
          ...b,
          buttons: b.buttons.map((btn: any) => {
            const label = String(btn.label || '').toLowerCase()
            if (label.includes('asesor')) return { ...btn, url: waUrl }
            return btn
          }),
        }
      }
    }
    return b
  })
}
