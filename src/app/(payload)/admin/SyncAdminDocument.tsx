'use client'

import { useLayoutEffect } from 'react'

/** Payload aplica tema en el documento; al no usar su <html> propio, reflejamos atributos en <html>. */
export function SyncAdminDocument({
  theme,
  lang,
  dir,
}: {
  theme: string
  lang: string
  dir: string
}) {
  useLayoutEffect(() => {
    const el = document.documentElement
    const prevTheme = el.getAttribute('data-theme')
    const prevLang = el.getAttribute('lang')
    const prevDir = el.getAttribute('dir')
    el.setAttribute('data-theme', theme)
    el.setAttribute('lang', lang)
    el.setAttribute('dir', dir)
    return () => {
      if (prevTheme != null) el.setAttribute('data-theme', prevTheme)
      else el.removeAttribute('data-theme')
      if (prevLang != null) el.setAttribute('lang', prevLang)
      else el.setAttribute('lang', 'es')
      if (prevDir != null) el.setAttribute('dir', prevDir)
      else el.removeAttribute('dir')
    }
  }, [theme, lang, dir])

  return null
}
