import { getPayload } from 'payload'
import config from '@payload-config'

let didDropAprendeLegacy = false

export const getPayloadClient = async () => {
  if (!didDropAprendeLegacy && process.env.NODE_ENV === 'development') {
    didDropAprendeLegacy = true
    const { dropLegacyAprendeSobreBeforePayloadInit } = await import('@/lib/dropLegacyAprendeSobreTables')
    await dropLegacyAprendeSobreBeforePayloadInit(process.env.DATABASE_URL || '')
  }
  return getPayload({ config })
}
