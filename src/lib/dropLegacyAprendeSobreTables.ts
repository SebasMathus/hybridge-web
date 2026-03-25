const LEGACY_TABLES = ['aprende_sobre_skills', 'aprende_sobre_chips', 'aprende_sobre'] as const

/**
 * Elimina tablas del global único `aprendeSobre` para que Drizzle no ofrezca "rename"
 * al crear `aprende_sobre_prepa`, etc. `import('pg')` es dinámico para no romper el bundle de Next (instrumentation).
 */
export async function dropLegacyAprendeSobreBeforePayloadInit(connectionString: string): Promise<void> {
  if (!connectionString?.trim()) return
  const { Pool } = await import('pg')
  const pool = new Pool({ connectionString })
  try {
    for (const t of LEGACY_TABLES) {
      try {
        await pool.query(`DROP TABLE IF EXISTS "${t}" CASCADE`)
      } catch {
        /* ignore */
      }
    }
  } finally {
    await pool.end().catch(() => {})
  }
}
