import config from '@payload-config'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import { importMap } from './importMap.js'
import { PayloadAdminBody } from './PayloadAdminBody'

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PayloadAdminBody config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </PayloadAdminBody>
  )
}
