/**
 * Elimina tablas de globals Aprende sobre **antiguos** (un global por programa, etc.) para que
 * Drizzle pueda crear el global unificado sin prompts interactivos.
 *
 * **No** debe borrar tablas del global actual (`aprendeSobreSkills` → prefijo `aprende_sobre_skills`).
 * En SQL, `LIKE` trata `_` como comodín; usamos `~` (regex) para prefijos literales.
 * `import('pg')` es dinámico para no romper el bundle de Next.
 */
const LEGACY_TOP_LEVEL = ['aprende_sobre'] as const

export async function dropLegacyAprendeSobreBeforePayloadInit(connectionString: string): Promise<void> {
  if (!connectionString?.trim()) return
  const { Pool } = await import('pg')
  const pool = new Pool({ connectionString })
  try {
    const { rows } = await pool.query<{ tablename: string }>(
      `SELECT tablename FROM pg_tables
       WHERE schemaname = 'public'
         AND tablename ~ '^aprende_sobre'
         AND tablename !~ '^aprende_sobre_skills'`,
    )
    for (const { tablename } of rows) {
      try {
        await pool.query(`DROP TABLE IF EXISTS "${tablename}" CASCADE`)
      } catch {
        /* ignore */
      }
    }
    for (const t of LEGACY_TOP_LEVEL) {
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
