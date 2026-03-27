/**
 * En Preparatoria (campaña YT/TK y Alianza Prepa) el formulario debe ir **después** de
 * «Nuestros estudiantes trabajan en». Se extrae el `formBlock` y se renderiza en ese punto.
 */
export function partitionPreparatoriaCampaignForStudentsWork(blocks: any[]): {
  beforeStudents: any[]
  formBlock: any | null
  afterStudents: any[]
} {
  const formIdx = blocks.findIndex((b) => b?.blockType === 'formBlock')
  const formBlock = formIdx >= 0 ? blocks[formIdx] : null
  const withoutForm = formIdx >= 0 ? blocks.filter((_, i) => i !== formIdx) : [...blocks]
  return {
    beforeStudents: withoutForm.slice(0, 2),
    formBlock,
    afterStudents: withoutForm.slice(2),
  }
}
