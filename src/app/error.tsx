'use client'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Algo salió mal</h2>
      <p style={{ margin: 0, color: '#666' }}>No se pudo cargar la página.</p>
      <button
        onClick={() => reset()}
        style={{ padding: '10px 20px', background: '#E2F897', color: '#0D0D0D', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
