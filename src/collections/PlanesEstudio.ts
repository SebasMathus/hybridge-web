import type { CollectionConfig } from 'payload'

export const PlanesEstudio: CollectionConfig = {
  slug: 'planes-estudio',
  labels: { singular: 'Plan de estudios', plural: 'Planes de estudio' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Planes de estudio por programa. Cada documento tiene semestres y materias. Las páginas muestran uno mediante el bloque "Plan de estudios".',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador único. Ej: prepa, ingenieria-software.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Nombre del programa (ej. Preparatoria, Ingeniería en Software).' },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Plan de estudios',
      admin: { description: 'Título de la sección en la página.' },
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Las materias que cursarás',
    },
    {
      name: 'description',
      type: 'text',
      admin: { description: 'Texto opcional debajo del subtítulo.' },
    },
    {
      name: 'semesters',
      type: 'array',
      required: true,
      admin: { description: 'Cada ítem es un cuatrimestre/semestre con su lista de materias.' },
      fields: [
        { name: 'title', type: 'text', required: true, admin: { description: 'Ej. PRIMER CUATRIMESTRE' } },
        {
          name: 'subjects',
          type: 'array',
          required: true,
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'icon', type: 'upload', relationTo: 'media' },
            { name: 'iconUrl', type: 'text' },
          ],
        },
      ],
    },
  ],
}
