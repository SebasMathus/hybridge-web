import { buildConfig } from 'payload'
import type { PayloadEmailAdapter } from 'payload'
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
import { BlogPosts } from './src/collections/BlogPosts'
import { WACtas } from './src/collections/WACtas'
import { HeaderGlobal } from './src/globals/Header'
import { FooterGlobal } from './src/globals/Footer'
import { StudentsWorkWithGlobal } from './src/globals/StudentsWorkWith'
import { AprendeSobreSkillsGlobal } from './src/globals/AprendeSobre'
import { LegalGlobal } from './src/globals/Legal'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Evita el WARN de Payload al no tener adaptador; en dev solo registramos el intento de envío. */
const consoleEmailAdapter: PayloadEmailAdapter = ({ payload }) => ({
  name: 'console',
  defaultFromAddress: 'noreply@hybridge.education',
  defaultFromName: 'Hybridge',
  sendEmail: async (message) => {
    payload.logger.info(
      { subject: message.subject, to: message.to },
      '[email] console adapter (no SMTP configured)',
    )
  },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Hybridge',
      icons: {
        icon: '/fav_icon.png',
        apple: '/fav_icon.png',
      },
    },
  },
  email: consoleEmailAdapter,
  editor: lexicalEditor({}),
  collections: [Users, Media, Pages, Forms, FormSubmissions, FechasInicio, PlanesEstudio, Testimonios, FacultyMembers, BlogPosts, WACtas],
  globals: [
    HeaderGlobal,
    FooterGlobal,
    StudentsWorkWithGlobal,
    AprendeSobreSkillsGlobal,
    LegalGlobal,
  ],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Desarrollo: push activo salvo PAYLOAD_DB_PUSH=false. El seed elimina tablas legacy
    // `aprende_sobre*` para evitar prompts interactivos de "rename" en Drizzle.
    push:
      process.env.PAYLOAD_DB_PUSH === 'true' ||
      (process.env.NODE_ENV === 'development' && process.env.PAYLOAD_DB_PUSH !== 'false') ||
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
