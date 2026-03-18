'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Route error:', error)
  }, [error])

  return (
    <div className="container-hb section-pad" style={{ textAlign: 'center', minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--color-hb-text)' }}>Algo salió mal</h2>
      <p style={{ color: 'var(--color-hb-text)', marginBottom: '8px' }}>No pudimos cargar esta página.</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          background: 'var(--color-hb-primary)',
          color: '#0D0D0D',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
