import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '3rem', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>Página no encontrada</h1>
      <p style={{ margin: 0, color: '#666' }}>La página que buscas no existe.</p>
      <Link href="/es" style={{ padding: '12px 24px', background: 'var(--color-hb-black)', color: '#fff', borderRadius: '9999px', fontWeight: 700, textDecoration: 'none' }}>
        Ir al inicio
      </Link>
    </div>
  )
}
