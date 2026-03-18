import type { CollectionConfig } from 'payload'

export const Testimonios: CollectionConfig = {
  slug: 'testimonios',
  labels: { singular: 'Testimonios', plural: 'Testimonios' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Conjuntos de testimonios (entrevistas en video). Usa "Preparatoria" en la página Prepa y "Universidad" en Home e Ingeniería en Software.',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identificador. Ej: prepa, universidad.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Nombre del conjunto (ej. Testimonios Preparatoria, Testimonios Universidad).' },
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Texto pequeño arriba del título (ej. "Universidad en Línea — Testimonios").' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'Título de la sección en la página.' },
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      admin: { description: 'Cada ítem: nombre y URL de YouTube. La miniatura se toma automáticamente de YouTube.' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Opcional. Si no se sube, se usa la miniatura del video de YouTube.' } },
        { name: 'imageUrl', type: 'text', admin: { description: 'Opcional. Si no se llena, se usa la miniatura de YouTube.' } },
        { name: 'videoUrl', type: 'text', required: true, admin: { description: 'URL del video de YouTube (ej. https://www.youtube.com/watch?v=...).' } },
      ],
    },
  ],
}
