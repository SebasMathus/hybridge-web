import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: { mimeTypes: ['image/*', 'video/*', 'application/pdf'] },
  fields: [
    { name: 'alt', type: 'text', localized: true },
  ],
}
