import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { HeaderGlobal } from './src/globals/Header'
import { FooterGlobal } from './src/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' | Hybridge' },
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, Pages],
  globals: [HeaderGlobal, FooterGlobal],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
  }),
  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'es',
  },
  secret: process.env.PAYLOAD_SECRET || 'default-secret',
  typescript: { outputFile: path.resolve(dirname, 'src/payload-types.ts') },
})
