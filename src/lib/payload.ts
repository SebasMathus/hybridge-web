import { getPayload } from 'payload'
import config from '@payload-config'

let didDropAprendeLegacy = false
let didFixGraduadosOrphans = false

export const getPayloadClient = async () => {
  if (!didFixGraduadosOrphans) {
    didFixGraduadosOrphans = true
    const { fixGraduadosPrepaVersionOrphans } = await import('@/lib/fixGraduadosPrepaVersionOrphans')
    await fixGraduadosPrepaVersionOrphans(process.env.DATABASE_URL || '')
  }
  if (!didDropAprendeLegacy && process.env.NODE_ENV === 'development') {
    didDropAprendeLegacy = true
    const { dropLegacyAprendeSobreBeforePayloadInit } = await import('@/lib/dropLegacyAprendeSobreTables')
    await dropLegacyAprendeSobreBeforePayloadInit(process.env.DATABASE_URL || '')
  }
  return getPayload({ config })
}
