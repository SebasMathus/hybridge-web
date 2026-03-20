import type { GlobalConfig } from 'payload'

export const StudentsWorkWithGlobal: GlobalConfig = {
  slug: 'studentsWorkWith',
  label: 'Nuestros estudiantes trabajan en',
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: 'Nuestros estudiantes trabajan en:',
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
  ],
}

