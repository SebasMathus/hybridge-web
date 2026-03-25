import type { Locale } from '@/lib/utils'

/**
 * Devuelve el string del idioma actual. Payload a veces entrega `{ es, en }` o incluso
 * un string JSON con esa forma en lugar del valor ya resuelto por `locale`.
 */
export function resolveLocalizedString(value: unknown, locale: Locale, fallbackLocale: Locale = 'es'): string {
  if (value == null) return ''

  if (typeof value === 'object' && !Array.isArray(value)) {
    const o = value as Record<string, unknown>
    const pick = (code: string): string => {
      const v = o[code]
      return typeof v === 'string' ? v : ''
    }
    const primary = pick(locale)
    if (primary.trim()) return primary
    const fb = pick(fallbackLocale)
    if (fb.trim()) return fb
    for (const v of Object.values(o)) {
      if (typeof v === 'string' && v.trim()) return v
    }
    return ''
  }

  if (typeof value === 'string') {
    const t = value.trim()
    if (t.startsWith('{') && (t.includes('"es"') || t.includes('"en"'))) {
      try {
        const parsed = JSON.parse(t) as Record<string, unknown>
        return resolveLocalizedString(parsed, locale, fallbackLocale)
      } catch {
        /* seguir como texto plano */
      }
    }
    return value
  }

  return String(value)
}

/** Si el markdown llegó con `\n` literales (p. ej. doble serialización), convierte a saltos reales. */
export function normalizeMarkdownNewlines(markdown: string): string {
  if (!markdown) return ''
  if (!/\\[nrt]/.test(markdown)) return markdown
  return markdown
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\n')
    .replace(/\\t/g, '\t')
}
