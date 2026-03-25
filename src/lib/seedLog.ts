/** Logs en consola del servidor al ejecutar `/api/seed` (visible en la terminal de `next dev`). */

const P = '[seed]'

export function seedStart(): void {
  console.log(`\n${P} ▶ Inicio ${new Date().toISOString()}`)
}

export function seedOk(message: string): void {
  console.log(`${P} ✅ ${message}`)
}

export function seedFail(message: string, err?: unknown): void {
  if (err !== undefined) {
    console.error(`${P} ❌ ${message}`, err)
  } else {
    console.error(`${P} ❌ ${message}`)
  }
}

export function seedDone(): void {
  console.log(`${P} ✅ Seed completado ${new Date().toISOString()}\n`)
}
