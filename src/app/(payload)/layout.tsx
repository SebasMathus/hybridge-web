/* Estilos del grupo Payload; el shell del admin (RootProvider) está en admin/layout.tsx para no anidar <html>. */
import '@payloadcms/next/css'
import type { ReactNode } from 'react'
import './custom.scss'

export default function PayloadGroupLayout({ children }: { children: ReactNode }) {
  return children
}
