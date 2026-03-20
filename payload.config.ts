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
import { FacultyMembers } from './src/collections/FacultyMembers'
import { HeaderGlobal } from './src/globals/Header'
import { FooterGlobal } from './src/globals/Footer'
import { StudentsWorkWithGlobal } from './src/globals/StudentsWorkWith'
import { AprendeSobreGlobal } from './src/globals/AprendeSobre'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' | Hybridge' },
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, Pages, Forms, FormSubmissions, FechasInicio, PlanesEstudio, Testimonios, FacultyMembers],
  globals: [HeaderGlobal, FooterGlobal, StudentsWorkWithGlobal, AprendeSobreGlobal],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // En desarrollo evitamos prompts interactivos (p. ej. "Accept warnings and push schema?")
    // cuando estamos iterando cambios de esquema. Las tablas suelen existir ya por runs previos/seed.
    //
    // Puedes forzar push en local definiendo:
    //   PAYLOAD_DB_PUSH=true
    // Nota: si desactivamos push y faltan tablas, Payload fallará al consultar.
    push:
      process.env.PAYLOAD_DB_PUSH === 'true' ||
      (process.env.NODE_ENV === 'production' && process.env.PAYLOAD_DB_PUSH !== 'false'),
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
