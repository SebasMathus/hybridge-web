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
        { label: 'Ingeniería en Software', value: 'ingenieria-en-software' },
        { label: 'Ingeniería en Inteligencia Artificial', value: 'ingenieria-en-inteligencia-artificial' },
        { label: 'Ingeniería en Videojuegos', value: 'ingenieria-en-videojuegos' },
        { label: 'Licenciatura en Administración e Innovación', value: 'licenciatura-en-administracion-e-innovacion' },
        { label: 'Licenciatura en Mercadotecnia', value: 'licenciatura-en-mercadotecnia' },
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

