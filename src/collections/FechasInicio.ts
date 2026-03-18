import type { CollectionConfig } from 'payload'

export const FechasInicio: CollectionConfig = {
  slug: 'fechas-inicio',
  labels: { singular: 'Fecha de inicio', plural: 'Fechas de inicio' },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'dateText', 'updatedAt'],
    description: 'Fechas de próximo inicio por programa. Las páginas consumen una de estas fechas en el bloque "CTA Fecha de inicio". Ej.: Preparatoria y Universidad.',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador único. Usar "prepa" para Preparatoria y "universidad" para programas de Universidad.',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'Nombre para mostrar en el admin (ej. Preparatoria, Universidad).' },
    },
    {
      name: 'dateText',
      type: 'text',
      required: true,
      admin: { description: 'Texto de la fecha que verá el usuario (ej. 13 de abril 2026, 6 de abril 2026).' },
    },
  ],
}
