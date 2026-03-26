import type { CollectionConfig } from 'payload'

export const WACtas: CollectionConfig = {
  slug: 'wa-cta',
  labels: { singular: 'WA CTA', plural: 'WA CTA' },
  admin: {
    useAsTitle: 'pageKey',
    defaultColumns: ['pageKey', 'url', 'updatedAt'],
    description: 'URLs de WhatsApp por página. "global" se usa como fallback.',
  },
  fields: [
    {
      name: 'pageKey',
      label: 'Página',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Global', value: 'global' },
        { label: 'Inicio (/es)', value: 'home' },
        { label: 'Preparatoria', value: 'preparatoria' },
        { label: 'Preparatoria (TikTok)', value: 'preparatoria-tk' },
        { label: 'Preparatoria (YouTube)', value: 'preparatoria-yt' },
        { label: 'Ingeniería en Software', value: 'ingenieria-en-software' },
        { label: 'Ingeniería en Software (TikTok)', value: 'ingenieria-en-software-tk' },
        { label: 'Ingeniería en Software (YouTube)', value: 'ingenieria-en-software-yt' },
        { label: 'Ingeniería en Inteligencia Artificial', value: 'ingenieria-en-inteligencia-artificial' },
        { label: 'Ingeniería en IA (TikTok)', value: 'ingenieria-en-inteligencia-artificial-tk' },
        { label: 'Ingeniería en IA (YouTube)', value: 'ingenieria-en-inteligencia-artificial-yt' },
        { label: 'Ingeniería en Videojuegos', value: 'ingenieria-en-videojuegos' },
        { label: 'Ingeniería en Videojuegos (TikTok)', value: 'ingenieria-en-videojuegos-tk' },
        { label: 'Ingeniería en Videojuegos (YouTube)', value: 'ingenieria-en-videojuegos-yt' },
        { label: 'Licenciatura en Administración e Innovación', value: 'licenciatura-en-administracion-e-innovacion' },
        { label: 'Lic. Administración e Innovación (TikTok) [legacy]', value: 'licenciatura-en-administracion-e-innovacion-tk' },
        { label: 'Lic. Administración e Innovación (YouTube) [legacy]', value: 'licenciatura-en-administracion-e-innovacion-yt' },
        { label: 'Licenciatura en Mercadotecnia', value: 'licenciatura-en-mercadotecnia' },
        { label: 'Lic. Mercadotecnia (TikTok)', value: 'licenciatura-en-mercadotecnia-tk' },
        { label: 'Lic. Mercadotecnia (YouTube)', value: 'licenciatura-en-mercadotecnia-yt' },
        { label: 'Experiencia Hybridge', value: 'experiencia-hybridge' },
      ],
    },
    {
      name: 'url',
      label: 'URL WhatsApp',
      type: 'text',
      required: true,
    },
  ],
}

