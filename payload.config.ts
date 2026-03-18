import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Forms } from './src/collections/Forms'
import { FormSubmissions } from './src/collections/FormSubmissions'
import { FechasInicio } from './src/collections/FechasInicio'
import { PlanesEstudio } from './src/collections/PlanesEstudio'
import { Testimonios } from './src/collections/Testimonios'
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
  collections: [Users, Media, Pages, Forms, FormSubmissions, FechasInicio, PlanesEstudio, Testimonios],
  globals: [HeaderGlobal, FooterGlobal],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Con push: true, al arrancar el servidor Payload crea/actualiza las tablas (testimonios, etc.).
    // Si aparece un prompt en la terminal, elige "create table" y acepta. Luego puedes poner push: false
    // para que no pregunte en los próximos arranques.
    push: true,
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
