/**
 * Filas huérfanas en la tabla de versión del bloque graduadosPrepa (array abroadUniversities)
 * impiden que Drizzle añada la FK hacia `_pages_v_blocks_graduados_prepa` durante el push.
 * Solo borra filas cuyo `_parent_id` ya no existe en el padre.
 */
export async function fixGraduadosPrepaVersionOrphans(connectionString: string): Promise<void> {
  if (!connectionString?.trim()) return
  const { Pool } = await import('pg')
  const pool = new Pool({ connectionString })
  try {
    await pool.query(`
      DELETE FROM _pages_v_blocks_graduados_prepa_abroad_universities c
      WHERE NOT EXISTS (
        SELECT 1 FROM _pages_v_blocks_graduados_prepa p WHERE p.id = c._parent_id
      )
    `)
  } catch {
    /* Tabla aún no existe o esquema distinto */
  } finally {
    await pool.end().catch(() => {})
  }
}
