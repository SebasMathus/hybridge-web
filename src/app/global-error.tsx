'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0D0D0D', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Error inesperado</h1>
          <p style={{ marginBottom: '1.5rem', color: '#a0a0a0' }}>Algo falló en la aplicación. Puedes intentar de nuevo.</p>
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              background: '#E2F897',
              color: '#0D0D0D',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  )
}
