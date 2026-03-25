import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Entrada de blog', plural: 'Blog' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'contentType', 'publishedAt', 'updatedAt'],
    description: 'Artículos del blog. Slug = ruta sin locale (ej. mi-articulo → /es/blog/mi-articulo).',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'authorName',
      type: 'text',
      defaultValue: 'Hybridge',
      localized: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Si está activo, la entrada puede aparecer en el carrusel de /blog y /blog/testimonios.',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      defaultValue: 'comunidad',
      index: true,
      options: [
        { label: 'Testimonio', value: 'testimonio' },
        { label: 'Comunidad', value: 'comunidad' },
      ],
      admin: { description: 'Testimonio: historia o experiencia de estudiante. Comunidad: el resto.' },
    },
    {
      name: 'featuredImageUrl',
      type: 'text',
      admin: { description: 'URL absoluta de la imagen destacada (p. ej. wp-content en producción).' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      admin: { description: 'Meta description para SEO (150–160 caracteres recomendado).' },
    },
    {
      name: 'bodyMarkdown',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Cuerpo en Markdown (encabezados ## ###, listas, enlaces, párrafos).' },
    },
  ],
}
